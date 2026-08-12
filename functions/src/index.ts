import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import cors from "cors";
import nodemailer from "nodemailer";

const corsHandler = cors({ origin: true });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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

    const actualMeetLink = meetLink || `https://meet.google.com/lookup/diakzona-${(date || '').replace(/-/g, '')}`;

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

