import { onRequest, onCall, HttpsError } from "firebase-functions/v2/https";
import { onDocumentUpdated, onDocumentWritten } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import cors from "cors";
import nodemailer from "nodemailer";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import Stripe from "stripe";
import {
  TRIAL_DAYS,
  parseGrade,
  gradeSlug,
  subscriptionDocId,
  pickOrigin,
  isLiveStatus,
  subscriptionPeriodEnd,
  invoiceSubscriptionId,
  shouldOverwriteSubscription,
  hufFromStripeAmount,
  isIsoDate,
  MAX_TEACHER_SEATS,
  teacherApprovalUntilMs,
  isApprovedTeacherProfile,
  grantIsLive,
  classesContainStudent,
  classStudentIds,
  subscriptionInvoiceLabel,
} from "./billing";

if (!admin.apps.length) {
  admin.initializeApp();
}

function getDb() {
  return getFirestore("databasediakzona");
}

const ALLOWED_ORIGINS = [
  "https://diakzona.hu",
  "https://www.diakzona.hu",
  "https://pista1125.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "sk-placeholder") {
    throw new Error("Az OPENAI_API_KEY nincs beállítva a Firebase Cloud Functions környezetben!");
  }
  return new OpenAI({ apiKey });
}

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("A STRIPE_SECRET_KEY nincs beállítva a functions/.env fájlban vagy a környezetben!");
  }
  return new Stripe(key);
}


// 1. generatePuzzle Cloud Function
export const generatePuzzle = onRequest({ cors: ALLOWED_ORIGINS }, async (req, res) => {
  try {
    const { topic, questionCount = 10, hiddenWord = '' } = req.body || {};
    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ error: 'Érvényes téma megadása kötelező!' });
      return;
    }

    const cleanTopic = topic.trim().slice(0, 120);
    const safeCount = Math.max(5, Math.min(15, Number(questionCount) || 10));

    let hiddenWordInstructions = '';
    if (hiddenWord && typeof hiddenWord === 'string') {
      const cleanWord = hiddenWord.trim().toUpperCase().replace(/\s+/g, '').slice(0, 20);
      hiddenWordInstructions = `\nA keresztrejtvény VÁRT fő megfejtése: "${cleanWord}". Generálj pontosan ${cleanWord.length} db kérdést!`;
    } else {
      hiddenWordInstructions = `A JSON válasz tartalmazza a "question" és "answer" mezőket. "offset" 0, "highlightIndex" -1.`;
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Te egy oktatási rejtvénykészítő vagy. Generálj ${safeCount} db kérdést és választ JSON formátumban: {"title": "Cím", "questions": [{"question": "...", "answer": "...", "highlightIndex": -1, "offset": 0}]}. CSAK nyers JSON!` + hiddenWordInstructions
        },
        { role: "user", content: `Témakör: ${cleanTopic}` }
      ],
      temperature: 0.7
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (err: any) {
    logger.error('generatePuzzle error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 2. generateToto Cloud Function
export const generateToto = onRequest({ cors: ALLOWED_ORIGINS }, async (req, res) => {
  try {
    const { topic, questionCount = 13 } = req.body || {};
    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ error: 'Érvényes téma megadása kötelező!' });
      return;
    }

    const cleanTopic = topic.trim().slice(0, 120);
    const safeCount = Math.max(5, Math.min(14, Number(questionCount) || 13));

    const systemPrompt = `Te egy profi magyar oktatási totó (13+1 kvíz) generáló tanár vagy.
Generálj pontosan ${safeCount} db minőségi kérdést és válaszlehetőséget JSON formátumban.
JSON formátum:
{
  "title": "Kreatív Cím a témához",
  "questions": [
    {
      "question": "Mennyi a(z) $5^2 \\cdot 5^3$ művelet eredménye?",
      "options": ["$5^5$", "$5^6$", "$5^7$"],
      "correctAnswerIndex": 0
    }
  ]
}

FONTOS MATEMATIKAI ÉS FORMÁZÁSI SZABÁLYOK:
1. Ha a témakör matematikai (pl. hatványozás, algebra, műveletek, törtek, egyenletek, mértékegységek), a matematikai kifejezéseket, hatványokat, törteket, egyenleteket MINDIG KaTeX/LaTeX szintaxissal zárd $ ... $ jelek közé! (Pl. $5^2 \\cdot 5^3$, $(3^4)^2$, $5^7$, $\\frac{3}{4}$, $x^2 - 4x + 4 = 0$, $2^3 = 8$).
2. Szorzásjelhez használj \\cdot jelet a csillag (*) helyett!
3. Minden kérdésnél pontosan 3 db opció ("options") legyen! Az egyik a helyes válasz, a másik kettő tipikus tévesztésen alapuló jó disztraktor. A "correctAnswerIndex" mindig 0, 1 vagy 2 (a helyes opció indexe).
4. Csak érvényes nyers JSON-t adj vissza, markdown kódblokkok nélkül!`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        { role: "user", content: `Témakör: ${cleanTopic}` }
      ],
      temperature: 0.7
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (err: any) {
    logger.error('generateToto error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 3. generateMatchingPairs Cloud Function
export const generateMatchingPairs = onRequest({ cors: ALLOWED_ORIGINS }, async (req, res) => {
  try {
    const { topic, pairCount = 5, groupSize = 2 } = req.body || {};
    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ error: 'Érvényes téma megadása kötelező!' });
      return;
    }

    const cleanTopic = topic.trim().slice(0, 120);
    const safePairs = Math.max(3, Math.min(10, Number(pairCount) || 5));
    const safeGroupSize = Math.max(2, Math.min(3, Number(groupSize) || 2));

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Te egy párosító feladat készítő vagy. Generálj ${safePairs} db ${safeGroupSize} elemű csoportot JSON formátumban: {"title": "Cím", "groups": [{"elements": [{"content": "...", "type": "text"}]}]}. CSAK nyers JSON!`
        },
        { role: "user", content: `Témakör: ${cleanTopic}` }
      ],
      temperature: 0.7
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (err: any) {
    logger.error('generateMatchingPairs error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. mathAiAssistant Cloud Function
export const mathAiAssistant = onRequest({ cors: ALLOWED_ORIGINS }, async (req, res) => {
  try {
    const { messages = [], context = {} } = req.body || {};
    const { examType, topicTitle, subtopicTitle } = context || {};
    const examName = examType === 'graduation' ? 'Magyar Érettségi Felkészítő' : 'Középiskolai Felvételi Felkészítő';

    const safeTopic = String(topicTitle || 'Matematika').slice(0, 80);
    const safeSubtopic = String(subtopicTitle || '').slice(0, 80);

    const systemPrompt = `Te a SkillUp Akadémia barátságos, türelmes AI Matematika Korrepetitora vagy. KONTEXTUS: ${examName}, ${safeTopic} ${safeSubtopic ? `(${safeSubtopic})` : ''}. FORMÁZÁS: Használj $ jelet sorközi LaTeX képletekhez ($x^2 = 4$)!`;

    // Limit conversation history to latest 8 messages and clamp length to avoid token abuse
    const safeMessages = (Array.isArray(messages) ? messages : []).slice(-8).map((m: any) => {
      if (typeof m.content === 'string') {
        return { role: m.role || 'user', content: m.content.slice(0, 1000) };
      }
      return m;
    });

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...safeMessages],
      temperature: 0.7
    });

    const replyText = completion.choices[0]?.message?.content || "Sajnálom, nem tudtam választ generálni.";
    res.json({ reply: replyText });
  } catch (err: any) {
    logger.error('mathAiAssistant error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5. aiWhiteboardRecognizer Cloud Function
export const aiWhiteboardRecognizer = onRequest({ cors: ALLOWED_ORIGINS }, async (req, res) => {
  try {
    const { action, expression } = req.body || {};

    if (action === 'solve-equation') {
      const solutionText = `Egyenlet: ${expression || '2x^2 - 8 = 0'}\n1. Lépés: Átrendezés -> 2x^2 = 8\n2. Lépés: Osztás 2-vel -> x^2 = 4\n3. Lépés: Négyzetgyökvonás -> x = ±2\nMegoldáshalmaz: M = {-2, 2}`;
      res.json({ success: true, solutionText });
      return;
    }

    res.json({
      success: true,
      shape: expression ? 'function' : 'cube',
      shapeName: expression ? 'Függvényábrázolás' : '3D Kocka',
      boundingBox: { x: 200, y: 150, width: 260, height: 260 }
    });
  } catch (err: any) {
    logger.error('aiWhiteboardRecognizer error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Shared Helper 1: Időpont Visszaigazoló e-mail küldése (Google Meet linkkel)
 */
async function sendBookingEmailInternal(data: {
  toEmail: string;
  studentName: string;
  studentPhone?: string;
  gradeLevel?: string;
  topic?: string;
  notes?: string;
  date: string;
  timeSlot: string;
  meetLink?: string;
  amount?: number;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu',
      pass: process.env.GMAIL_APP_PASSWORD || '',
    },
  });

  const actualMeetLink = data.meetLink || 'https://meet.google.com/gqy-sazd-yuz';
  const amountFormatted = data.amount ? `${Number(data.amount).toLocaleString('hu-HU')} Ft` : '5 000 Ft';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
      <h2 style="color: #4f46e5; margin-top: 0; font-size: 20px;">📅 Sikeres Online Korrepetálás Időpontfoglalás!</h2>
      <p style="font-size: 15px;">Kedves <strong>${data.studentName}</strong>!</p>
      <p style="font-size: 14px; line-height: 1.5;">Örömmel értesítünk, hogy a(z) <strong>${data.topic || 'Matematika'}</strong> online foglalkozásra a foglalásod és a befizetésed (${amountFormatted}) sikeresen megtörtént.</p>
      
      <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 16px; margin: 20px 0; border-radius: 6px;">
        <h3 style="margin-top: 0; color: #0f172a; font-size: 15px;">Óra Részletei:</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Oktató:</strong> Orsós István (kapcsolat@diakzona.hu)</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Dátum:</strong> ${data.date}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Idősáv:</strong> ${data.timeSlot}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Témakör:</strong> ${data.topic || 'Matematika'}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Évfolyam:</strong> ${data.gradeLevel || 'Általános'}</p>
        ${data.studentPhone ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Telefonszám:</strong> ${data.studentPhone}</p>` : ''}
        ${data.notes ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Megjegyzés:</strong> ${data.notes}</p>` : ''}
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${actualMeetLink}" target="_blank" style="background-color: #00832d; color: #ffffff; padding: 15px 30px; font-weight: bold; text-decoration: none; border-radius: 10px; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(0,131,45,0.25);">
          🎥 Csatlakozás a Google Meet Órához
        </a>
        <p style="font-size: 12px; color: #64748b; margin-top: 10px;">Kérlek, csatlakozz az óra kezdete előtt legalább 5 perccel!</p>
      </div>

      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin: 20px 0;">
        <p style="margin: 0; font-size: 13px; color: #166534;">
          💳 <strong>Fizetés & Számlázás:</strong> A bankkártyás fizetés sikeresen lezajlott. A hivatalos Számlázz.hu elektronikus számlát egy külön e-mailben küldtük el a részedre.
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 0;">DiákZóna Akadémia © 2026 | kapcsolat@diakzona.hu</p>
    </div>
  `;

  await transporter.sendMail({
    from: '"DiákZóna Akadémia" <kapcsolat@diakzona.hu>',
    to: [data.toEmail, 'kapcsolat@diakzona.hu', 'pista1125@gmail.com'],
    subject: `📅 Időpont Visszaigazolás: Online Korrepetálás - ${data.date} (${data.timeSlot})`,
    html: htmlContent,
  });
}

/**
 * Shared Helper 2: Külön Számla E-mail küldése (Közvetlen Számlázz.hu linkkel, PDF nélkül)
 */
async function sendInvoiceEmailInternal(data: {
  toEmail: string;
  studentName: string;
  invoiceId: string;
  invoiceUrl?: string;
  amount: number;
  topic?: string;
  date?: string;
  billingAddressString?: string;
  /** Ha meg van adva, ez jelenik meg szolgáltatásként (pl. előfizetésnél) a korrepetálás helyett. */
  productLabel?: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu',
      pass: process.env.GMAIL_APP_PASSWORD || '',
    },
  });

  const amountFormatted = `${Number(data.amount ?? 5000).toLocaleString('hu-HU')} Ft`;
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 9999px; margin-bottom: 8px;">
          ✓ FIZETVE / KIEGYENLÍTVE
        </span>
        <h2 style="color: #0f172a; margin: 4px 0 0 0; font-size: 20px;">Elektronikus Számla & Bizonylat</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">DiákZóna Akadémia</p>
      </div>

      <p style="font-size: 14px;">Kedves <strong>${data.studentName}</strong>!</p>
      <p style="font-size: 14px; line-height: 1.5;">Köszönjük a fizetésedet! Az online korrepetálásról kiállított hivatalos e-számla adatai az alábbiakban találhatók.</p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 45%;">Számlaszám:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${data.invoiceId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Kibocsátó:</td>
            <td style="padding: 6px 0; color: #0f172a;">Orsós István E.V. (DiákZóna)</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Vevő neve:</td>
            <td style="padding: 6px 0; color: #0f172a;">${data.studentName}</td>
          </tr>
          ${data.billingAddressString ? `
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Számlázási cím:</td>
            <td style="padding: 6px 0; color: #0f172a;">${data.billingAddressString}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Tétel:</td>
            <td style="padding: 6px 0; color: #0f172a;">${data.productLabel || `Online Korrepetálás (${data.topic || 'Matematika'})`}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Fizetés módja:</td>
            <td style="padding: 6px 0; color: #16a34a; font-weight: bold;">Bankkártya (Stripe) - Fizetve</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Teljesítés dátuma:</td>
            <td style="padding: 6px 0; color: #0f172a;">${today}</td>
          </tr>
          <tr style="border-top: 1px solid #cbd5e1;">
            <td style="padding: 10px 0 0 0; font-size: 15px; font-weight: bold; color: #0f172a;">Bruttó összeg:</td>
            <td style="padding: 10px 0 0 0; font-size: 16px; font-weight: bold; color: #4f46e5;">${amountFormatted} (AAM)</td>
          </tr>
        </table>
      </div>

      ${data.invoiceUrl ? `
        <div style="text-align: center; margin: 28px 0;">
          <a href="${data.invoiceUrl}" target="_blank" style="background-color: #16a34a; color: #ffffff; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 10px; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px rgba(22,163,74,0.25);">
            📄 E-Számla Megtekintése & Letöltése (Számlázz.hu)
          </a>
          <p style="font-size: 12px; color: #64748b; margin-top: 10px;">A számla a Számlázz.hu hivatalos, biztonságos oldalán tekinthető meg és nyomtatható ki.</p>
        </div>
      ` : ''}

      <div style="background-color: #f1f5f9; border-radius: 8px; padding: 12px; margin: 20px 0;">
        <p style="margin: 0; font-size: 12px; color: #475569; text-align: center;">
          🔒 <strong>Biztonsági tájékoztató:</strong> A hiteles e-számlát a Számlázz.hu felhőrendszere tárolja, a levél biztonsági okokból nem tartalmaz csatolt fájlt.
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 0;">DiákZóna Akadémia © 2026 | kapcsolat@diakzona.hu</p>
    </div>
  `;

  await transporter.sendMail({
    from: '"DiákZóna Számlázás" <kapcsolat@diakzona.hu>',
    to: [data.toEmail, 'kapcsolat@diakzona.hu', 'pista1125@gmail.com'],
    subject: `🧾 Elektronikus Számla: ${data.productLabel ? 'DiákZóna előfizetés' : 'DiákZóna Online Korrepetálás'} (Számlaszám: ${data.invoiceId})`,
    html: htmlContent,
  });
}

// 6. sendBookingEmail Cloud Function — LEZÁRVA
// Korábban bárki tetszőleges címzettnek küldhetett vele levelet a kapcsolat@diakzona.hu címről
// (nyílt levélküldő). A visszaigazoló levelet a stripeWebhook küldi a sendBookingEmailInternal-lal,
// a kliens ezt a végpontot nem használja.
export const sendBookingEmail = onRequest({ cors: ALLOWED_ORIGINS }, async (_req, res) => {
  res.status(410).json({ error: 'Ez a végpont megszűnt. A visszaigazoló e-mailt a fizetés után a rendszer automatikusan küldi.' });
});

// 6/b. getBookedSlots — a foglalási naptárhoz csak a foglalt idősávokat adja vissza
// (a tutoring_bookings személyes adatait a kliens nem olvashatja).
export const getBookedSlots = onRequest({ cors: ALLOWED_ORIGINS }, async (req, res) => {
  const date = String(req.query.date || '');
  if (!isIsoDate(date)) {
    res.status(400).json({ error: 'Hibás dátum (YYYY-MM-DD formátum kell).' });
    return;
  }
  try {
    const snap = await getDb().collection('tutoring_bookings').where('date', '==', date).get();
    const slots = new Set<string>();
    snap.forEach((d) => {
      const data = d.data();
      if (typeof data.timeSlot === 'string' && data.status !== 'cancelled') slots.add(data.timeSlot);
    });
    res.set('Cache-Control', 'no-store');
    res.json({ slots: Array.from(slots) });
  } catch (err: any) {
    logger.error('getBookedSlots error:', err);
    res.status(500).json({ error: 'Nem sikerült lekérni a foglalt időpontokat.' });
  }
});

/**
 * 7. Helper: Számlázz.hu E-számla generálása (szamlazz.js modul)
 * Megjelölve: paid: true (Fizetve / Kiegyenlítve a "Fizetésre vár" helyett)
 */
async function createSzamlazzInvoice(data: {
  studentName: string;
  studentEmail: string;
  topic: string;
  date?: string;
  timeSlot?: string;
  amount: number;
  /** Előfizetésnél: a tétel neve és mértékegysége (alapból a korrepetálásé). */
  itemLabel?: string;
  unit?: string;
  address?: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    postal_code?: string | null;
    country?: string | null;
  };
}): Promise<{ success: boolean; invoiceId?: string; invoiceUrl?: string; error?: string }> {
  const agentToken = process.env.SZAMLAZZ_AGENT_TOKEN || 'DEMO';
  if (!agentToken || agentToken === 'DEMO') {
    logger.warn('No valid Számlázz.hu agent token found, skipping actual invoice issuance.');
    return { success: false, error: 'Missing agent token' };
  }

  try {
    const szamlazz = require('szamlazz.js');

    const szamlaClient = new szamlazz.Client({
      authToken: agentToken,
      eInvoice: true,
      requestInvoiceDownload: false, // Ne PDF letöltés legyen, hanem közvetlen link
      responseVersion: 1,
    });

    const seller = new szamlazz.Seller({
      bank: {
        name: 'OTP Bank',
        accountNumber: '11773000-00000000',
      },
      email: {
        replyToAddress: 'kapcsolat@diakzona.hu',
        subject: data.itemLabel ? `Számla: ${data.itemLabel}` : `Számla: Online Korrepetálás - ${data.topic}`,
        message: data.itemLabel
          ? 'Köszönjük, hogy a DiákZónával tanulsz!'
          : 'Köszönjük a foglalást és a fizetést a DiákZóna Akadémián!',
      },
      issuerName: 'Orsós István',
    });

    const streetAddress = [data.address?.line1, data.address?.line2].filter(Boolean).join(' ') || 'Fő utca 1.';
    const countryName = data.address?.country === 'HU' ? 'Magyarország' : (data.address?.country || 'Magyarország');

    const buyer = new szamlazz.Buyer({
      name: data.studentName,
      country: countryName,
      zip: data.address?.postal_code || '1000',
      city: data.address?.city || 'Budapest',
      address: streetAddress,
      email: data.studentEmail,
      sendEmail: false, // Nem a Számlázz.hu küld alapértelmezett levelet, hanem a mi saját, külön Számla e-mailünk megy ki közvetlen linkkel!
    });

    const item = new szamlazz.Item({
      label: data.itemLabel || `Online Matematika Korrepetálás - ${data.topic} (${data.date} ${data.timeSlot})`,
      quantity: 1,
      unit: data.unit || 'óra',
      vat: 'AAM',
      grossUnitPrice: data.amount,
    });

    const invoice = new szamlazz.Invoice({
      paymentMethod: szamlazz.PaymentMethod.BankCard,
      currency: szamlazz.Currency.Ft,
      language: szamlazz.Language.Hungarian,
      paid: true, // <fizetve>true</fizetve> -> A számlán a státusz FIZETVE / KIEGYENLÍTVE lesz a "Fizetésre vár" helyett!
      seller: seller,
      buyer: buyer,
      items: [item],
      comment: 'Stripe bankkártyás fizetéssel kiegyenlítve (DiákZóna Akadémia)',
    });

    const result = await szamlaClient.issueInvoice(invoice);
    logger.info('Számlázz.hu invoice issued successfully with paid: true ->', result);

    const invoiceUrl = result.customerAccountUrl ? decodeURIComponent(result.customerAccountUrl) : undefined;

    return {
      success: true,
      invoiceId: result.invoiceId,
      invoiceUrl: invoiceUrl,
    };
  } catch (err: any) {
    logger.error('Számlázz.hu invoice generation error:', err);
    return { success: false, error: err.message };
  }
}

// 8. createStripeCheckoutSession Cloud Function
export const createStripeCheckoutSession = onRequest({ cors: true }, async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      studentEmail,
      studentPhone,
      gradeLevel,
      topic,
      notes = '',
      date,
      timeSlot,
      amount = 5000,
    } = req.body || {};

    if (!studentEmail || !studentName || !date || !timeSlot) {
      res.status(400).json({ error: 'Missing required booking fields (studentEmail, studentName, date, timeSlot)' });
      return;
    }

    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'https://diakzona.hu';
    const amountNum = Number(amount) || 5000;

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer_email: studentEmail,
      line_items: [
        {
          price_data: {
            currency: 'huf',
            product_data: {
              name: `Online Korrepetálás - ${topic || 'Matematika'}`,
              description: `Dátum: ${date}, Idősáv: ${timeSlot} | Oktató: Orsós István (Google Meet)`,
            },
            unit_amount: amountNum * 100, // Stripe expects subunit (fillér): 5000 HUF = 500000
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/korrepetalas?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/korrepetalas?payment=cancelled`,
      metadata: {
        studentId: studentId || '',
        studentName,
        studentEmail,
        studentPhone: studentPhone || '',
        gradeLevel: gradeLevel || '',
        topic: topic || '',
        notes: notes || '',
        date,
        timeSlot,
        amount: String(amountNum),
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err: any) {
    logger.error('createStripeCheckoutSession error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 9. stripeWebhook Cloud Function (Handles incoming raw JSON Stripe events & signature verification)
export const stripeWebhook = onRequest({ cors: true }, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  // Aláírás nélküli kérést SOHA nem fogadunk el: különben bárki hamis „fizetve” eseményt küldhetne.
  if (!endpointSecret) {
    logger.error('STRIPE_WEBHOOK_SECRET nincs beállítva – a webhook nem dolgoz fel eseményt.');
    res.status(500).send('Webhook secret not configured');
    return;
  }
  if (!sig || !req.rawBody) {
    res.status(400).send('Missing Stripe signature');
    return;
  }

  try {
    event = getStripe().webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err: any) {
    logger.error(`Webhook signature verification failed:`, err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Évfolyam-előfizetés események. Hiba esetén 500 → a Stripe később újraküldi.
  try {
    if (await handleSubscriptionEvent(event)) {
      res.json({ received: true });
      return;
    }
  } catch (subErr: any) {
    logger.error('Subscription webhook handling failed:', event.type, event.id, subErr);
    res.status(500).send('Subscription handling failed');
    return;
  }

  if (event.type === 'checkout.session.completed' && (event.data.object as Stripe.Checkout.Session).mode !== 'subscription') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const customerDetails = session.customer_details;
    const billingAddress = customerDetails?.address;

    logger.info('Stripe Payment Succeeded for session:', session.id, metadata, customerDetails);

    const {
      studentId,
      studentName,
      studentEmail,
      studentPhone,
      gradeLevel,
      topic,
      notes,
      date,
      timeSlot,
      amount = '5000',
    } = metadata;

    const emailToUse = studentEmail || customerDetails?.email || '';
    const nameToUse = studentName || customerDetails?.name || 'Diák';

    if (emailToUse && date && timeSlot) {
      let issuedInvoiceId: string | undefined;
      let issuedInvoiceUrl: string | undefined;

      const billingAddressString = billingAddress ? [
        billingAddress.postal_code,
        billingAddress.city,
        billingAddress.line1,
        billingAddress.line2,
        billingAddress.country || 'HU',
      ].filter(Boolean).join(', ') : undefined;

      // 1. Számlázz.hu e-számla kiállítása (paid: true beállítással, hogy FIZETVE státuszú legyen!)
      try {
        const invoiceResult = await createSzamlazzInvoice({
          studentName: nameToUse,
          studentEmail: emailToUse,
          topic: topic || 'Matematika',
          date,
          timeSlot,
          amount: Number(amount) || 5000,
          address: billingAddress || undefined,
        });

        if (invoiceResult.success) {
          issuedInvoiceId = invoiceResult.invoiceId;
          issuedInvoiceUrl = invoiceResult.invoiceUrl;
          logger.info('Számlázz.hu invoice created with paid=true:', issuedInvoiceId, issuedInvoiceUrl);
        }
      } catch (szamlazzErr) {
        logger.error('Számlázz.hu invoice error:', szamlazzErr);
      }

      // 2. Mentés Firestore adatbázisba (databasediakzona)
      try {
        const bookingsRef = getDb().collection('tutoring_bookings');
        await bookingsRef.add({
          studentId: studentId || null,
          studentName: nameToUse,
          studentEmail: emailToUse,
          studentPhone: studentPhone || customerDetails?.phone || '',
          billingAddress: billingAddress ? {
            line1: billingAddress.line1 || '',
            line2: billingAddress.line2 || '',
            city: billingAddress.city || '',
            postalCode: billingAddress.postal_code || '',
            state: billingAddress.state || '',
            country: billingAddress.country || 'HU',
          } : null,
          gradeLevel: gradeLevel || '',
          topic: topic || 'Matematika korrepetálás',
          notes: notes || '',
          date,
          timeSlot,
          meetLink: 'https://meet.google.com/gqy-sazd-yuz',
          status: 'confirmed',
          paid: true,
          amount: Number(amount) || 5000,
          invoiceId: issuedInvoiceId || null,
          invoiceUrl: issuedInvoiceUrl || null,
          stripeSessionId: session.id,
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : '',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        logger.info('Booking saved to Firestore successfully from Webhook');
      } catch (dbErr) {
        logger.error('Firestore save error in webhook:', dbErr);
      }

      // 3. E-mail 1 küldése: Időpontfoglalási visszaigazolás & Google Meet link
      try {
        await sendBookingEmailInternal({
          toEmail: emailToUse,
          studentName: nameToUse,
          studentPhone,
          gradeLevel,
          topic,
          notes,
          date,
          timeSlot,
          meetLink: 'https://meet.google.com/gqy-sazd-yuz',
          amount: Number(amount) || 5000,
        });
        logger.info('Booking confirmation email sent successfully');
      } catch (emailErr) {
        logger.error('Booking confirmation email send error:', emailErr);
      }

      // 4. E-mail 2 küldése: Külön Számla E-mail (Számlázz.hu közvetlen linkkel, PDF csatolmány nélkül)
      if (issuedInvoiceId) {
        try {
          await sendInvoiceEmailInternal({
            toEmail: emailToUse,
            studentName: nameToUse,
            invoiceId: issuedInvoiceId,
            invoiceUrl: issuedInvoiceUrl,
            amount: Number(amount) || 5000,
            topic: topic || 'Matematika',
            date,
            billingAddressString,
          });
          logger.info('Dedicated invoice email sent successfully');
        } catch (invoiceEmailErr) {
          logger.error('Invoice email send error:', invoiceEmailErr);
        }
      }
    }
  }

  res.json({ received: true });
});



// 10. syncStudentNameToClasses — ha a diák módosítja a nevét vagy avatárját a profiljában,
// frissítjük a tanári osztálylistákban (teacher_classes.students[]) is.
// Korábban ezt a kliens végezte, de a Firestore-szabályok szerint a diák nem írhat a tanár dokumentumába.
export const syncStudentNameToClasses = onDocumentUpdated(
  { document: 'profiles/{uid}', database: 'databasediakzona' },
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;

    const newName = typeof after.full_name === 'string' ? after.full_name.trim() : '';
    const newAvatar = typeof after.avatar_url === 'string' ? after.avatar_url : '';
    if (before.full_name === after.full_name && before.avatar_url === after.avatar_url) return;
    if (!newName && !newAvatar) return;

    const uid = event.params.uid;
    const db = getDb();
    const snap = await db.collection('teacher_classes').get();
    const batch = db.batch();
    let changedDocs = 0;

    snap.forEach((docSnap) => {
      const students = docSnap.get('students');
      if (!Array.isArray(students) || !students.some((s: any) => s?.userId === uid)) return;
      let changed = false;
      const updated = students.map((s: any) => {
        if (s?.userId !== uid) return s;
        const next = { ...s };
        if (newName && s.name !== newName) { next.name = newName; changed = true; }
        if (newAvatar && s.avatarUrl !== newAvatar) { next.avatarUrl = newAvatar; changed = true; }
        return next;
      });
      if (changed) {
        updated.sort((a: any, b: any) => String(a?.name || '').localeCompare(String(b?.name || ''), 'hu'));
        batch.update(docSnap.ref, { students: updated });
        changedDocs++;
      }
    });

    if (changedDocs > 0) {
      await batch.commit();
      logger.info(`syncStudentNameToClasses: ${uid} frissítve ${changedDocs} osztályban.`);
    }
  }
);

// ===========================================================================
// 11. Évfolyam-előfizetés (990 Ft/hó, 7 nap próbaidő fiókonként egyszer)
// ===========================================================================
// Adatmodell (csak ezek a function-ök írják, a kliens csak olvas – lásd firestore.rules):
//   subscriptions/{uid}_{grade}  – az évfolyam-előfizetés állapota
//   stripeCustomers/{uid}        – Stripe customer azonosító + trialUsed
//   stripeInvoices/{invoiceId}   – a havi számlák feldolgozásának nyoma (idempotencia)

function getSubscriptionPriceId(): string {
  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
  if (!priceId) {
    throw new HttpsError('failed-precondition', 'Az előfizetés ára nincs beállítva (STRIPE_SUBSCRIPTION_PRICE_ID).');
  }
  return priceId;
}

async function getOrCreateStripeCustomer(uid: string, email?: string, name?: string): Promise<string> {
  const ref = getDb().doc(`stripeCustomers/${uid}`);
  const snap = await ref.get();
  const existing = snap.get('stripeCustomerId');
  if (typeof existing === 'string' && existing) return existing;

  const customer = await getStripe().customers.create({
    email: email || undefined,
    name: name || undefined,
    metadata: { uid },
  });
  await ref.set({
    stripeCustomerId: customer.id,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
  return customer.id;
}

const tsFromUnix = (sec: number | null | undefined) =>
  typeof sec === 'number' ? admin.firestore.Timestamp.fromMillis(sec * 1000) : null;

/** Az előfizetést frissen lekéri a Stripe-tól, és beírja a Firestore-ba. */
async function syncSubscriptionFromStripe(subscriptionId: string): Promise<{ uid: string; grade: number } | null> {
  const sub = await getStripe().subscriptions.retrieve(subscriptionId);
  const uid = sub.metadata?.uid;
  const grade = parseGrade(sub.metadata?.grade);
  if (!uid || !grade) {
    logger.warn('Subscription without uid/grade metadata, skipping:', subscriptionId);
    return null;
  }

  const db = getDb();
  const ref = db.doc(`subscriptions/${subscriptionDocId(uid, grade)}`);
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const priceId = sub.items?.data?.[0]?.price?.id || null;

  await db.runTransaction(async (tx) => {
    const cur = await tx.get(ref);
    const existing = cur.exists ? { id: cur.get('stripeSubscriptionId'), status: cur.get('status') } : null;
    if (!shouldOverwriteSubscription(existing, { id: sub.id, status: sub.status })) {
      logger.info(`Subscription ${sub.id} (${sub.status}) nem írja felül az élő ${existing?.id} előfizetést.`);
      return;
    }
    tx.set(ref, {
      uid,
      grade,
      status: sub.status,
      currentPeriodEnd: tsFromUnix(subscriptionPeriodEnd(sub as any)),
      trialEnd: tsFromUnix(sub.trial_end),
      cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end || sub.cancel_at),
      cancelAt: tsFromUnix(sub.cancel_at),
      stripeSubscriptionId: sub.id,
      stripeCustomerId: customerId,
      priceId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  // A próbaidő fiókonként egyszer jár: ha ez az előfizetés próbaidővel indult, megjelöljük.
  if (sub.trial_start) {
    await db.doc(`stripeCustomers/${uid}`).set({ stripeCustomerId: customerId, trialUsed: true }, { merge: true });
  }
  return { uid, grade };
}

/**
 * Számlázz.hu számla a kifizetett havi díjról. A próbaidő indulásakor (billing_reason: subscription_create)
 * 0 Ft-os számla is készül, hogy a vásárlónak legyen bizonylata; egyéb 0 Ft-os számlát nem állítunk ki.
 */
async function issueSubscriptionInvoice(invoice: Stripe.Invoice, grade: number): Promise<void> {
  if (!invoice.id) return;
  const paid = invoice.amount_paid || 0;
  if (paid <= 0 && invoice.billing_reason !== 'subscription_create') return;

  const ref = getDb().doc(`stripeInvoices/${invoice.id}`);
  try {
    await ref.create({ status: 'processing', grade, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  } catch (e: any) {
    // Már feldolgoztuk (a Stripe ugyanazt az eseményt többször is küldheti).
    if (e?.code === 6 || /already exists/i.test(String(e?.message))) return;
    throw e;
  }

  const line = invoice.lines?.data?.[0];
  const label = paid > 0
    ? subscriptionInvoiceLabel(grade, line?.period?.start, line?.period?.end)
    : subscriptionInvoiceLabel(grade, line?.period?.start, line?.period?.end).replace('havi előfizetés', `${TRIAL_DAYS} napos ingyenes próbaidő`);
  const amount = hufFromStripeAmount(invoice.amount_paid);
  const email = invoice.customer_email || '';
  const name = invoice.customer_name || email || 'Előfizető';
  const address = invoice.customer_address || undefined;

  const result = await createSzamlazzInvoice({
    studentName: name,
    studentEmail: email,
    topic: label,
    amount,
    address,
    itemLabel: label,
    unit: 'hó',
  });

  await ref.set({
    status: result.success ? 'issued' : 'failed',
    szamlazzInvoiceId: result.invoiceId || null,
    error: result.error || null,
    amount,
  }, { merge: true });

  if (result.success && result.invoiceId && email) {
    try {
      await sendInvoiceEmailInternal({
        toEmail: email,
        studentName: name,
        invoiceId: result.invoiceId,
        invoiceUrl: result.invoiceUrl,
        amount,
        productLabel: label,
        billingAddressString: address
          ? [address.postal_code, address.city, address.line1, address.line2, address.country || 'HU'].filter(Boolean).join(', ')
          : undefined,
      });
    } catch (mailErr) {
      logger.error('Subscription invoice email error:', mailErr);
    }
  }
}

/** true, ha az eseményt az előfizetés-kezelés feldolgozta (a foglalási ág ekkor nem fut). */
async function handleSubscriptionEvent(event: Stripe.Event): Promise<boolean> {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== 'subscription') return false;
      const subId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
      if (subId) await syncSubscriptionFromStripe(subId);
      return true;
    }
    case 'customer.subscription.created': {
      const sub = event.data.object as Stripe.Subscription;
      await syncSubscriptionFromStripe(sub.id);
      await sendSubscriptionWelcomeEmail(sub.id);
      return true;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.subscription.paused':
    case 'customer.subscription.resumed': {
      const sub = event.data.object as Stripe.Subscription;
      await syncSubscriptionFromStripe(sub.id);
      return true;
    }
    case 'invoice.paid':
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = invoiceSubscriptionId(invoice as any);
      if (!subId) return true; // nem előfizetéses számla – nincs teendő
      const synced = await syncSubscriptionFromStripe(subId);
      if (event.type === 'invoice.paid' && synced) {
        await issueSubscriptionInvoice(invoice, synced.grade);
      }
      return true;
    }
    default:
      return false;
  }
}

// 11/a. createSubscriptionCheckout — Stripe Checkout indítása egy évfolyam előfizetéséhez.
export const createSubscriptionCheckout = onCall({ cors: ALLOWED_ORIGINS }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Az előfizetéshez előbb jelentkezz be!');
  }
  const uid = request.auth.uid;
  const grade = parseGrade(request.data?.grade);
  if (!grade) {
    throw new HttpsError('invalid-argument', 'Érvénytelen évfolyam (1–12).');
  }
  const priceId = getSubscriptionPriceId();
  const db = getDb();

  const subSnap = await db.doc(`subscriptions/${subscriptionDocId(uid, grade)}`).get();
  if (subSnap.exists && isLiveStatus(subSnap.get('status'))) {
    throw new HttpsError('already-exists', `A(z) ${grade}. osztályra már van előfizetésed.`);
  }

  const email = typeof request.auth.token.email === 'string' ? request.auth.token.email : undefined;
  const name = typeof request.auth.token.name === 'string' ? request.auth.token.name : undefined;
  const customerId = await getOrCreateStripeCustomer(uid, email, name);

  // A webhook késhet: a Stripe-ban is ellenőrizzük, nincs-e már élő előfizetés erre az évfolyamra.
  const existing = await getStripe().subscriptions.list({ customer: customerId, status: 'all', limit: 50 });
  if (existing.data.some((s) => parseGrade(s.metadata?.grade) === grade && isLiveStatus(s.status))) {
    throw new HttpsError('already-exists', `A(z) ${grade}. osztályra már van előfizetésed.`);
  }

  const trialUsed = (await db.doc(`stripeCustomers/${uid}`).get()).get('trialUsed') === true;
  const origin = pickOrigin(request.rawRequest?.headers?.origin, ALLOWED_ORIGINS);
  const slug = gradeSlug(grade);

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    customer_update: { address: 'auto', name: 'auto' },
    client_reference_id: uid,
    line_items: [{ price: priceId, quantity: 1 }],
    billing_address_collection: 'required',
    locale: 'hu',
    subscription_data: {
      description: `DiákZóna ${grade}. osztály`,
      metadata: { uid, grade: String(grade) },
      ...(trialUsed ? {} : { trial_period_days: TRIAL_DAYS }),
    },
    metadata: { kind: 'grade_subscription', uid, grade: String(grade) },
    success_url: `${origin}/${slug}?subscribed=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${slug}?subscribed=cancelled`,
  });

  if (!session.url) {
    throw new HttpsError('internal', 'Nem sikerült elindítani a fizetést.');
  }
  return { url: session.url, trial: !trialUsed };
});

// 11/b. createPortalSession — Stripe ügyfélportál (lemondás, kártyacsere, számlák).
export const createPortalSession = onCall({ cors: ALLOWED_ORIGINS }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Előbb jelentkezz be!');
  }
  const snap = await getDb().doc(`stripeCustomers/${request.auth.uid}`).get();
  const customerId = snap.get('stripeCustomerId');
  if (typeof customerId !== 'string' || !customerId) {
    throw new HttpsError('not-found', 'Még nincs előfizetésed.');
  }
  const origin = pickOrigin(request.rawRequest?.headers?.origin, ALLOWED_ORIGINS);
  const portal = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/profil?tab=subscriptions`,
    locale: 'hu',
  });
  return { url: portal.url };
});

// ===========================================================================
// 12. Tanári licenc: a jóváhagyott tanár max. 100 diákjának 1-1 évfolyamot nyit meg
// ===========================================================================
// teacherGrants/{studentUid}: { studentUid, teacherId, teacherName, grade, active, validUntil }
// – diákonként egy dokumentum, így egy diák egyszerre csak egy tanártól kaphat licencet;
// – a licenc a tanár jóváhagyásával együtt (aug. 31.) lejár, a tanár egy kattintással megújíthatja.

function isAdminToken(token: Record<string, unknown> | undefined): boolean {
  return token?.email === 'pista1125@gmail.com' && token?.email_verified === true;
}

/** Következő aug. 31. 23:59:59 (Budapest); augusztusban már a következő évé (= src/lib/teacherApproval.ts). */
function nextAug31Ms(now = new Date()): number {
  const year = now.getUTCMonth() >= 7 ? now.getUTCFullYear() + 1 : now.getUTCFullYear();
  return Date.UTC(year, 7, 31, 21, 59, 59);
}

const grantLive = (d: FirebaseFirestore.DocumentSnapshot | FirebaseFirestore.QueryDocumentSnapshot, nowMs: number) =>
  d.exists && grantIsLive({ active: d.get('active'), validUntilMs: d.get('validUntil')?.toMillis?.() ?? null }, nowMs);

/** A hívó tanár adatai; ha nem jóváhagyott tanár (és nem admin), hibát dob. */
async function requireTeacher(request: { auth?: { uid: string; token: Record<string, unknown> } }) {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Előbb jelentkezz be!');
  const teacherId = request.auth.uid;
  const profile = (await getDb().doc(`profiles/${teacherId}`).get()).data() as any;
  const admin = isAdminToken(request.auth.token);
  const approved = isApprovedTeacherProfile(profile);
  if (!approved && !admin) {
    throw new HttpsError('permission-denied', 'Ehhez érvényes tanári jóváhagyás kell (a tanári státusz minden év aug. 31-én lejár).');
  }
  return {
    teacherId,
    teacherName: (profile?.full_name as string) || (request.auth.token.name as string) || 'Tanár',
    validUntilMs: approved ? teacherApprovalUntilMs(profile) : nextAug31Ms(),
  };
}

async function teacherClassDocs(teacherId: string) {
  const snap = await getDb().collection('teacher_classes').where('teacherId', '==', teacherId).get();
  return snap.docs.map((d) => d.data() as { students?: Array<{ userId?: string }> });
}

// 12/a. grantStudentAccess — évfolyam megnyitása (vagy átállítása) egy diáknak.
export const grantStudentAccess = onCall({ cors: ALLOWED_ORIGINS }, async (request) => {
  const { teacherId, teacherName, validUntilMs } = await requireTeacher(request as any);
  const studentUid = typeof request.data?.studentUid === 'string' ? request.data.studentUid : '';
  const grade = parseGrade(request.data?.grade);
  if (!studentUid || !grade) throw new HttpsError('invalid-argument', 'Hiányzó diák vagy érvénytelen évfolyam (1–12).');
  if (studentUid === teacherId) throw new HttpsError('invalid-argument', 'Saját magadnak nem adhatsz licencet.');

  if (!classesContainStudent(await teacherClassDocs(teacherId), studentUid)) {
    throw new HttpsError('failed-precondition', 'Ez a diák nincs benne egyik osztályodban sem.');
  }

  const db = getDb();
  const ref = db.doc(`teacherGrants/${studentUid}`);
  const result = await db.runTransaction(async (tx) => {
    const now = Date.now();
    const cur = await tx.get(ref);
    const curLive = grantLive(cur, now);
    if (curLive && cur.get('teacherId') !== teacherId) {
      throw new HttpsError('already-exists', 'Ezt a diákot már egy másik tanár licence nyitja meg.');
    }
    const sameTeacher = curLive && cur.get('teacherId') === teacherId;
    let used = 0;
    if (!sameTeacher) {
      const mine = await tx.get(db.collection('teacherGrants').where('teacherId', '==', teacherId));
      used = mine.docs.filter((d) => grantLive(d, now)).length;
      if (used >= MAX_TEACHER_SEATS) {
        throw new HttpsError('resource-exhausted', `Elérted a ${MAX_TEACHER_SEATS} diákos korlátot. Előbb vonj vissza egy licencet.`);
      }
    }
    tx.set(ref, {
      studentUid,
      teacherId,
      teacherName,
      grade,
      active: true,
      validUntil: admin.firestore.Timestamp.fromMillis(validUntilMs),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...(sameTeacher ? {} : { createdAt: admin.firestore.FieldValue.serverTimestamp() }),
    });
    return { kind: sameTeacher ? 'updated' : 'created', usedSeats: sameTeacher ? undefined : used + 1 };
  });
  return { ok: true, ...result };
});

// 12/b. revokeStudentAccess — a tanár visszavonja a licencet (a hely felszabadul).
export const revokeStudentAccess = onCall({ cors: ALLOWED_ORIGINS }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Előbb jelentkezz be!');
  const studentUid = typeof request.data?.studentUid === 'string' ? request.data.studentUid : '';
  if (!studentUid) throw new HttpsError('invalid-argument', 'Hiányzó diák.');
  const ref = getDb().doc(`teacherGrants/${studentUid}`);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError('not-found', 'Ennek a diáknak nincs tanári licence.');
  if (snap.get('teacherId') !== request.auth.uid && !isAdminToken(request.auth.token)) {
    throw new HttpsError('permission-denied', 'Ezt a licencet nem te adtad ki.');
  }
  await ref.delete();
  return { ok: true };
});

// 12/c. renewTeacherGrants — új tanévben (újbóli jóváhagyás után) a meglévő licencek megújítása
// az aktuális jóváhagyás lejáratáig; az osztályokból már kikerült diákok licence törlődik.
export const renewTeacherGrants = onCall({ cors: ALLOWED_ORIGINS }, async (request) => {
  const { teacherId, teacherName, validUntilMs } = await requireTeacher(request as any);
  const db = getDb();
  const classes = await teacherClassDocs(teacherId);
  const grants = await db.collection('teacherGrants').where('teacherId', '==', teacherId).get();
  const batch = db.batch();
  let renewed = 0;
  let removed = 0;
  let skipped = 0;
  for (const d of grants.docs) {
    if (!classesContainStudent(classes, d.id)) {
      batch.delete(d.ref);
      removed++;
    } else if (renewed < MAX_TEACHER_SEATS) {
      batch.update(d.ref, {
        active: true,
        teacherName,
        validUntil: admin.firestore.Timestamp.fromMillis(validUntilMs),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      renewed++;
    } else {
      skipped++;
    }
  }
  await batch.commit();
  return { ok: true, renewed, removed, skipped };
});

// 12/d. Ha a tanár eltávolít egy diákot (és az már egyik osztályában sincs), a licenc megszűnik.
export const revokeGrantsOnClassChange = onDocumentWritten(
  { document: 'teacher_classes/{classId}', database: 'databasediakzona' },
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    const teacherId = (after?.teacherId || before?.teacherId) as string | undefined;
    if (!teacherId) return;
    const afterIds = classStudentIds(after);
    const removedIds = [...classStudentIds(before)].filter((id) => !afterIds.has(id));
    if (removedIds.length === 0) return;

    const db = getDb();
    const classes = await teacherClassDocs(teacherId);
    for (const studentUid of removedIds) {
      if (classesContainStudent(classes, studentUid)) continue;
      const ref = db.doc(`teacherGrants/${studentUid}`);
      const snap = await ref.get();
      if (snap.exists && snap.get('teacherId') === teacherId) {
        await ref.delete();
        logger.info(`Licenc visszavonva: ${studentUid} kikerült ${teacherId} osztályaiból.`);
      }
    }
  }
);

// 12/e. Ha az admin visszavonja a tanár jóváhagyását, a tanár összes licence megszűnik.
export const revokeGrantsOnTeacherDemotion = onDocumentUpdated(
  { document: 'profiles/{uid}', database: 'databasediakzona' },
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (before?.teacher_status !== 'approved' || after?.teacher_status === 'approved') return;
    const db = getDb();
    const grants = await db.collection('teacherGrants').where('teacherId', '==', event.params.uid).get();
    if (grants.empty) return;
    const batch = db.batch();
    grants.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    logger.info(`${grants.size} licenc visszavonva (${event.params.uid} tanári státusza megszűnt).`);
  }
);

// ===========================================================================
// 13. Visszaigazoló e-mail új évfolyam-előfizetéskor (kapcsolat@diakzona.hu)
// ===========================================================================

function huDateFromUnix(sec: number | null | undefined): string {
  return typeof sec === 'number'
    ? new Intl.DateTimeFormat('hu-HU', { timeZone: 'Europe/Budapest', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(sec * 1000))
    : '';
}

/** Egyszer (előfizetésenként) elküldi a visszaigazolást a vásárlónak, másolatban a kapcsolat@diakzona.hu-nak. */
async function sendSubscriptionWelcomeEmail(subscriptionId: string): Promise<void> {
  const marker = getDb().doc(`subscriptionEmails/welcome_${subscriptionId}`);
  try {
    await marker.create({ createdAt: admin.firestore.FieldValue.serverTimestamp() });
  } catch (e: any) {
    if (e?.code === 6 || /already exists/i.test(String(e?.message))) return; // már elküldtük
    throw e;
  }

  try {
    const sub = await getStripe().subscriptions.retrieve(subscriptionId, { expand: ['customer'] });
    const customer = sub.customer as Stripe.Customer | Stripe.DeletedCustomer;
    const email = 'deleted' in customer && customer.deleted ? null : (customer as Stripe.Customer).email;
    const grade = parseGrade(sub.metadata?.grade);
    if (!email || !grade) {
      logger.warn('Welcome email skipped (no email/grade):', subscriptionId);
      return;
    }
    const name = (customer as Stripe.Customer).name || '';
    const trialing = sub.status === 'trialing' && sub.trial_end;
    const periodEnd = subscriptionPeriodEnd(sub as any);
    const site = 'https://diakzona.hu';

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 9999px;">✓ SIKERES ELŐFIZETÉS</span>
        <h2 style="color: #4f46e5; margin: 10px 0 0 0; font-size: 22px;">DiákZóna – ${grade}. osztály</h2>
      </div>
      <p style="font-size: 15px;">Kedves ${name || 'Előfizetőnk'}!</p>
      <p style="font-size: 15px; line-height: 1.6;">
        Köszönjük, hogy a DiákZónát választottad! Mostantól a <b>${grade}. osztály teljes matematika anyaga</b> – minden témakör
        tananyaga, kvízei, gyakorló feladatai és tudáspróbái – elérhető a fiókodban.
      </p>
      <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin: 16px 0; background: #f8fafc; border-radius: 10px;">
        <tr><td style="padding: 8px 12px; color: #64748b;">Előfizetés</td><td style="padding: 8px 12px; font-weight: bold;">${grade}. osztály – havi előfizetés</td></tr>
        <tr><td style="padding: 8px 12px; color: #64748b;">Díj</td><td style="padding: 8px 12px; font-weight: bold;">990 Ft / hó (alanyi adómentes)</td></tr>
        ${trialing ? `
        <tr><td style="padding: 8px 12px; color: #64748b;">Ingyenes próbaidő</td><td style="padding: 8px 12px; font-weight: bold;">${huDateFromUnix(sub.trial_end)}-ig</td></tr>
        <tr><td style="padding: 8px 12px; color: #64748b;">Első terhelés</td><td style="padding: 8px 12px; font-weight: bold;">${huDateFromUnix(sub.trial_end)} (990 Ft)</td></tr>` : `
        <tr><td style="padding: 8px 12px; color: #64748b;">Következő terhelés</td><td style="padding: 8px 12px; font-weight: bold;">${huDateFromUnix(periodEnd)} (990 Ft)</td></tr>`}
      </table>
      ${trialing ? `<p style="font-size: 14px; line-height: 1.6; background: #ecfdf5; padding: 12px; border-radius: 10px;">
        A próbaidő alatt semmit nem terhelünk. Ha a próbaidő vége előtt lemondod, nem fizetsz semmit; ellenkező esetben
        utána havonta 990 Ft-ot vonunk le a megadott kártyáról.</p>` : ''}
      <p style="font-size: 14px; line-height: 1.6;">
        Az előfizetésedet bármikor lemondhatod a <b>Profil → Előfizetéseim → „Előfizetés kezelése”</b> menüpontban.
        Lemondás után a kifizetett időszak végéig megmarad a hozzáférés. Minden terhelésről elektronikus számlát küldünk.
      </p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="${site}/${gradeSlug(grade)}" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 10px; display: inline-block;">Irány a ${grade}. osztály!</a>
      </div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-bottom: 0;">
        DiákZóna © 2026 | kapcsolat@diakzona.hu<br/>Kérdés esetén válaszolj erre a levélre.
      </p>
    </div>`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu', pass: process.env.GMAIL_APP_PASSWORD || '' },
    });
    await transporter.sendMail({
      from: '"DiákZóna" <kapcsolat@diakzona.hu>',
      replyTo: 'kapcsolat@diakzona.hu',
      to: email,
      bcc: ['kapcsolat@diakzona.hu'],
      subject: trialing
        ? `✅ Elindult a 7 napos ingyenes próbád – DiákZóna ${grade}. osztály`
        : `✅ Sikeres előfizetés – DiákZóna ${grade}. osztály`,
      html,
    });
    await marker.set({ sentTo: email, grade, sentAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    logger.info(`Welcome email elküldve: ${subscriptionId} → ${email}`);
  } catch (err) {
    // A jelölőt töröljük, hogy a Stripe újraküldésekor újra próbálkozzunk.
    await marker.delete().catch(() => undefined);
    throw err;
  }
}
