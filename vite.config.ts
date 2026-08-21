import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

import nodemailer from "nodemailer";

const emailApiPlugin = () => ({
  name: 'email-api-plugin',
  configureServer(server: any) {
    server.middlewares.use('/api/send-email', async (req: any, res: any) => {
      if (req.method !== 'POST') {
        res.statusCode = 455;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      let body = '';
      req.on('data', (chunk: any) => { body += chunk; });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body || '{}');
          const { toEmail, studentName, studentPhone, gradeLevel, topic, notes, date, timeSlot, meetLink } = data;

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu',
              pass: process.env.GMAIL_APP_PASSWORD || '',
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

          const mailOptions = {
            from: '"DiákZóna Akadémia" <kapcsolat@diakzona.hu>',
            to: [toEmail, 'kapcsolat@diakzona.hu', 'pista1125@gmail.com'],
            subject: `Visszaigazolás: Online Korrepetálás - ${date} (${timeSlot})`,
            html: htmlContent,
          };

          await transporter.sendMail(mailOptions);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, message: 'Email sent successfully via Gmail SMTP' }));
        } catch (err: any) {
          console.error('Vite email API error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), emailApiPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "three": path.resolve(__dirname, "node_modules/three")
    },
  },
  logLevel: 'info',
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    force: true
  },
}));
