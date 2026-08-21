import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import cors from "cors";
import nodemailer from "nodemailer";
import * as admin from "firebase-admin";
import Stripe from "stripe";

if (!admin.apps.length) {
  admin.initializeApp();
}

const corsHandler = cors({ origin: true });

function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY || "sk-placeholder";
  return new OpenAI({ apiKey });
}

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY || "";
  return new Stripe(key);
}


// 1. generatePuzzle Cloud Function
export const generatePuzzle = onRequest({ cors: true }, async (req, res) => {
  try {
    const { topic, questionCount = 10, hiddenWord = '' } = req.body || {};
    if (!topic) {
      res.status(400).json({ error: 'Topic is required' });
      return;
    }

    let hiddenWordInstructions = '';
    if (hiddenWord) {
      const cleanWord = hiddenWord.trim().toUpperCase().replace(/\s+/g, '');
      hiddenWordInstructions = `\nA keresztrejtvény VÁRT fő megfejtése: "${cleanWord}". Generálj pontosan ${cleanWord.length} db kérdést!`;
    } else {
      hiddenWordInstructions = `A JSON válasz tartalmazza a "question" és "answer" mezőket. "offset" 0, "highlightIndex" -1.`;
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Te egy oktatási rejtvénykészítő vagy. Generálj ${questionCount} db kérdést és választ JSON formátumban: {"title": "Cím", "questions": [{"question": "...", "answer": "...", "highlightIndex": -1, "offset": 0}]}. CSAK nyers JSON!` + hiddenWordInstructions
        },
        { role: "user", content: `Témakör: ${topic}` }
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
export const generateToto = onRequest({ cors: true }, async (req, res) => {
  try {
    const { topic, questionCount = 13 } = req.body || {};
    if (!topic) {
      res.status(400).json({ error: 'Topic is required' });
      return;
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Te egy oktatási totó generáló vagy. Generálj ${questionCount} db kérdést. JSON formátum: {"title": "Cím", "questions": [{"question": "...", "options": ["Helyes válasz", "Rossz válasz 1", "Rossz válasz 2"], "correctAnswerIndex": 0}]}. CSAK nyers JSON!`
        },
        { role: "user", content: `Témakör: ${topic}` }
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
export const generateMatchingPairs = onRequest({ cors: true }, async (req, res) => {
  try {
    const { topic, pairCount = 5, groupSize = 2 } = req.body || {};
    if (!topic) {
      res.status(400).json({ error: 'Topic is required' });
      return;
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Te egy párosító feladat készítő vagy. Generálj ${pairCount} db ${groupSize} elemű csoportot JSON formátumban: {"title": "Cím", "groups": [{"elements": [{"content": "...", "type": "text"}]}]}. CSAK nyers JSON!`
        },
        { role: "user", content: `Témakör: ${topic}` }
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
export const mathAiAssistant = onRequest({ cors: true }, async (req, res) => {
  try {
    const { messages = [], context = {} } = req.body || {};
    const { examType, topicTitle, subtopicTitle, levelOrGrade } = context;
    const examName = examType === 'graduation' ? 'Magyar Érettségi Felkészítő' : 'Középiskolai Felvételi Felkészítő';

    const systemPrompt = `Te a SkillUp Akadémia barátságos, türelmes AI Matematika Korrepetitora vagy. KONTEXTUS: ${examName}, ${topicTitle || 'Matematika'}. FORMÁZÁS: Használj $ jelet sorközi LaTeX képletekhez ($x^2 = 4$)!`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
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
export const aiWhiteboardRecognizer = onRequest({ cors: true }, async (req, res) => {
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
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu',
      pass: process.env.GMAIL_APP_PASSWORD || '',
    },
  });

  const amountFormatted = `${Number(data.amount || 5000).toLocaleString('hu-HU')} Ft`;
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
            <td style="padding: 6px 0; color: #0f172a;">Online Korrepetálás (${data.topic || 'Matematika'})</td>
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
    subject: `🧾 Elektronikus Számla: DiákZóna Online Korrepetálás (Számlaszám: ${data.invoiceId})`,
    html: htmlContent,
  });
}

// 6. sendBookingEmail Cloud Function
export const sendBookingEmail = onRequest({ cors: true }, async (req, res) => {
  try {
    const { toEmail, studentName, studentPhone, gradeLevel, topic, notes, date, timeSlot, meetLink, amount = 5000 } = req.body || {};

    if (!toEmail || !studentName || !date || !timeSlot) {
      res.status(400).json({ error: 'Missing required booking fields (toEmail, studentName, date, timeSlot)' });
      return;
    }

    logger.info(`Sending booking confirmation email to ${toEmail} for appointment on ${date} at ${timeSlot}`);

    await sendBookingEmailInternal({
      toEmail,
      studentName,
      studentPhone,
      gradeLevel,
      topic,
      notes,
      date,
      timeSlot,
      meetLink,
      amount: Number(amount) || 5000,
    });

    res.json({
      success: true,
      message: 'Booking confirmation email delivered successfully via Gmail SMTP',
    });
  } catch (err: any) {
    logger.error('sendBookingEmail error:', err);
    res.status(500).json({ error: err.message });
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
  date: string;
  timeSlot: string;
  amount: number;
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
        subject: `Számla: Online Korrepetálás - ${data.topic}`,
        message: 'Köszönjük a foglalást és a fizetést a DiákZóna Akadémián!',
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
      label: `Online Matematika Korrepetálás - ${data.topic} (${data.date} ${data.timeSlot})`,
      quantity: 1,
      unit: 'óra',
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

  try {
    if (endpointSecret && sig) {
      event = getStripe().webhooks.constructEvent(req.rawBody || (req as any).body, sig, endpointSecret);
    } else {
      event = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Stripe.Event;
    }
  } catch (err: any) {
    logger.error(`Webhook signature verification failed:`, err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
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

      // 2. Mentés Firestore adatbázisba
      try {
        const bookingsRef = admin.firestore().collection('tutoring_bookings');
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


