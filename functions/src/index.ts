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

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(STRIPE_SECRET_KEY);


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

    const completion = await openai.chat.completions.create({
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

    const completion = await openai.chat.completions.create({
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

    const completion = await openai.chat.completions.create({
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

    const completion = await openai.chat.completions.create({
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

// 6. sendBookingEmail Cloud Function
export const sendBookingEmail = onRequest({ cors: true }, async (req, res) => {
  try {
    const { toEmail, studentName, studentPhone, gradeLevel, topic, notes, date, timeSlot, meetLink } = req.body || {};

    if (!toEmail || !studentName || !date || !timeSlot) {
      res.status(400).json({ error: 'Missing required booking fields (toEmail, studentName, date, timeSlot)' });
      return;
    }

    logger.info(`Sending booking confirmation email to ${toEmail} for appointment on ${date} at ${timeSlot}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu',
        pass: process.env.GMAIL_APP_PASSWORD || 'oboiairinricsurq',
      },
    });

    const actualMeetLink = meetLink || 'https://meet.google.com/gqy-sazd-yuz';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #6366f1; margin-top: 0;">Sikeres Online Korrepetálás Foglalás! 🎉</h2>
        <p>Kedves <strong>${studentName}</strong>!</p>
        <p>Sikeresen rögzítettük az online korrepetálási időpontodat a DiákZóna Akadémián.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <h3 style="margin-top: 0; color: #1e293b; font-size: 16px;">Foglalás Részletei:</h3>
          <p style="margin: 5px 0;"><strong>Oktató:</strong> Orsós István (kapcsolat@diakzona.hu)</p>
          <p style="margin: 5px 0;"><strong>Dátum:</strong> ${date}</p>
          <p style="margin: 5px 0;"><strong>Idősáv:</strong> ${timeSlot}</p>
          <p style="margin: 5px 0;"><strong>Évfolyam / Szint:</strong> ${gradeLevel}</p>
          <p style="margin: 5px 0;"><strong>Témakör:</strong> ${topic}</p>
          <p style="margin: 5px 0;"><strong>Telefonszám:</strong> ${studentPhone}</p>
          ${notes ? `<p style="margin: 5px 0;"><strong>Megjegyzés:</strong> ${notes}</p>` : ''}
        </div>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${actualMeetLink}" target="_blank" style="background-color: #00832d; color: #ffffff; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 10px; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px rgba(0,131,45,0.2);">
            🎥 Csatlakozás a Google Meet Órához
          </a>
          <p style="font-size: 12px; color: #64748b; margin-top: 8px;">Kattints a fenti gombra az óra kezdete előtt 5 perccel!</p>
        </div>

        <p style="font-size: 13px; color: #64748b; background-color: #fffbeb; border: 1px solid #fef3c7; padding: 12px; border-radius: 8px;">
          📌 <strong>Fizetési információ:</strong> A fizetés közvetlenül az óra előtt / átutalással történik.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">DiákZóna Akadémia © 2026 | kapcsolat@diakzona.hu</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"DiákZóna Akadémia" <kapcsolat@diakzona.hu>',
      to: [toEmail, 'kapcsolat@diakzona.hu', 'pista1125@gmail.com'],
      subject: `Visszaigazolás: Online Korrepetálás - ${date} (${timeSlot})`,
      html: htmlContent,
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
 * 7. Helper: Számlázz.hu E-számla generálása (Számlázz Agent XML API)
 */
async function createSzamlazzInvoice(data: {
  studentName: string;
  studentEmail: string;
  topic: string;
  date: string;
  timeSlot: string;
  amount: number;
}) {
  const agentToken = process.env.SZAMLAZZ_AGENT_TOKEN || 'DEMO';
  const today = new Date().toISOString().split('T')[0];

  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<xmlszamla xmlns="http://www.szamlazz.hu/xmlszamla" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <beallitasok>
    <szamlaagentkulcs>${agentToken}</szamlaagentkulcs>
    <eszamla>true</eszamla>
    <kulsoSzamlaszam></kulsoSzamlaszam>
    <offline>false</offline>
    <autokilepes>true</autokilepes>
  </beallitasok>
  <fejlec>
    <kelt>${today}</kelt>
    <teljesites>${today}</teljesites>
    <fizetesiHatarido>${today}</fizetesiHatarido>
    <fizmod>Bankkártya</fizmod>
    <penznem>HUF</penznem>
    <szamlaNyelve>hu</szamlaNyelve>
    <megjegyzes>Stripe fizetéssel teljesítve (DiákZóna Akadémia)</megjegyzes>
  </fejlec>
  <elado></elado>
  <vevo>
    <nev>${data.studentName}</nev>
    <email>${data.studentEmail}</email>
    <sendEmail>true</sendEmail>
  </vevo>
  <tetelek>
    <tetel>
      <megnevezes>Online Matematika Korrepetálás - ${data.topic} (${data.date} ${data.timeSlot})</megnevezes>
      <mennyiseg>1.0</mennyiseg>
      <mennyisegiEgyseg>óra</mennyisegiEgyseg>
      <egysegar>${data.amount}</egysegar>
      <adokulcs>AAM</adokulcs>
      <nettoErtek>${data.amount}</nettoErtek>
      <afaErtek>0</afaErtek>
      <bruttoErtek>${data.amount}</bruttoErtek>
    </tetel>
  </tetelek>
</xmlszamla>`;

  try {
    const formData = new URLSearchParams();
    formData.append('action-xmlagentxml', xmlBody);

    const response = await fetch('https://www.szamlazz.hu/szamla/', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const textResult = await response.text();
    logger.info('Számlázz.hu API response:', textResult);
    return { success: true, textResult };
  } catch (err: any) {
    logger.error('Számlázz.hu invoice generation error:', err);
    return { success: false, error: err.message };
  }
}

// 8. createStripeCheckoutSession Cloud Function
export const createStripeCheckoutSession = onRequest({ cors: true }, async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      studentPhone,
      gradeLevel,
      topic,
      notes = '',
      date,
      timeSlot,
      amount = 6000,
    } = req.body || {};

    if (!studentEmail || !studentName || !date || !timeSlot) {
      res.status(400).json({ error: 'Missing required booking fields (studentEmail, studentName, date, timeSlot)' });
      return;
    }

    const origin = req.headers.origin || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: studentEmail,
      line_items: [
        {
          price_data: {
            currency: 'huf',
            product_data: {
              name: `Online Korrepetálás - ${topic || 'Matematika'}`,
              description: `Dátum: ${date}, Idősáv: ${timeSlot} | Oktató: Orsós István`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/korrepetalas?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/korrepetalas?payment=cancelled`,
      metadata: {
        studentName,
        studentEmail,
        studentPhone: studentPhone || '',
        gradeLevel: gradeLevel || '',
        topic: topic || '',
        notes: notes || '',
        date,
        timeSlot,
        amount: String(amount),
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err: any) {
    logger.error('createStripeCheckoutSession error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 9. stripeWebhook Cloud Function (Handles successful payments & invoice triggering)
export const stripeWebhook = onRequest({ cors: true }, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(req.rawBody || (req as any).body, sig, endpointSecret);
    } else {
      event = req.body;
    }
  } catch (err: any) {
    logger.error(`Webhook signature verification failed:`, err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    logger.info('Stripe Payment Succeeded for session:', session.id, metadata);

    const {
      studentName,
      studentEmail,
      studentPhone,
      gradeLevel,
      topic,
      notes,
      date,
      timeSlot,
      amount,
    } = metadata;

    if (studentEmail && date && timeSlot) {
      // 1. Mentés Firestore adatbázisba
      try {
        const bookingsRef = admin.firestore().collection('tutoring_bookings');
        await bookingsRef.add({
          studentName,
          studentEmail,
          studentPhone,
          gradeLevel,
          topic,
          notes,
          date,
          timeSlot,
          meetLink: 'https://meet.google.com/gqy-sazd-yuz',
          status: 'confirmed',
          paid: true,
          stripeSessionId: session.id,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        logger.info('Booking saved to Firestore successfully from Webhook');
      } catch (dbErr) {
        logger.error('Firestore save error in webhook:', dbErr);
      }

      // 2. Számlázz.hu e-számla kiállítása
      try {
        await createSzamlazzInvoice({
          studentName: studentName || 'Diák',
          studentEmail,
          topic: topic || 'Matematika',
          date,
          timeSlot,
          amount: Number(amount) || 6000,
        });
      } catch (szamlazzErr) {
        logger.error('Számlázz.hu invoice error:', szamlazzErr);
      }
    }
  }

  res.json({ received: true });
});


