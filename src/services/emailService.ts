import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BookingData, PERMANENT_MEET_LINK } from './bookingService';

export interface EmailResult {
  success: boolean;
  message: string;
}

/**
 * Send booking confirmation email.
 */
export async function sendBookingConfirmationEmail(booking: BookingData): Promise<EmailResult> {
  const actualMeetLink = booking.meetLink || PERMANENT_MEET_LINK;
  const subjectStr = `Visszaigazolás: Online Korrepetálás - ${booking.date} (${booking.timeSlot})`;

  const textContent = `
Kedves ${booking.studentName}!

Sikeresen rögzítettük az online korrepetálási időpontodat a DiákZóna Akadémián!

A FOGLALÁS RÉSZLETEI:
- Oktató: Orsós István (kapcsolat@diakzona.hu)
- Dátum: ${booking.date}
- Idősáv: ${booking.timeSlot}
- Évfolyam / Szint: ${booking.gradeLevel}
- Témakör: ${booking.topic}
- Telefonszám: ${booking.studentPhone}
${booking.notes ? `- Megjegyzés: ${booking.notes}` : ''}

GOOGLE MEET CSATLAKOZÁSI LINK:
${actualMeetLink}

Fizetési információ:
A fizetés közvetlenül az óra előtt / átutalással történik.

Üdvözlettel,
DiákZóna Akadémia
(kapcsolat@diakzona.hu)
  `.trim();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #6366f1; margin-top: 0;">Sikeres Online Korrepetálás Foglalás! 🎉</h2>
      <p>Kedves <strong>${booking.studentName}</strong>!</p>
      <p>Sikeresen rögzítettük az online korrepetálási időpontodat a DiákZóna Akadémián.</p>
      
      <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 15px; margin: 20px 0; border-radius: 6px;">
        <h3 style="margin-top: 0; color: #1e293b; font-size: 16px;">Foglalás Részletei:</h3>
        <p style="margin: 5px 0;"><strong>Oktató:</strong> Orsós István (kapcsolat@diakzona.hu)</p>
        <p style="margin: 5px 0;"><strong>Dátum:</strong> ${booking.date}</p>
        <p style="margin: 5px 0;"><strong>Idősáv:</strong> ${booking.timeSlot}</p>
        <p style="margin: 5px 0;"><strong>Évfolyam / Szint:</strong> ${booking.gradeLevel}</p>
        <p style="margin: 5px 0;"><strong>Témakör:</strong> ${booking.topic}</p>
        <p style="margin: 5px 0;"><strong>Telefonszám:</strong> ${booking.studentPhone}</p>
        ${booking.notes ? `<p style="margin: 5px 0;"><strong>Megjegyzés:</strong> ${booking.notes}</p>` : ''}
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

  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // 0. Local Dev Server Email Dispatch (only on localhost)
    if (isLocal) {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: booking.studentEmail,
          studentName: booking.studentName,
          studentPhone: booking.studentPhone,
          gradeLevel: booking.gradeLevel,
          topic: booking.topic,
          notes: booking.notes || '',
          date: booking.date,
          timeSlot: booking.timeSlot,
          meetLink: actualMeetLink,
        }),
      }).catch((err) => console.warn('Vite email API fetch warning:', err));
    }

    // 1. Write to Firestore 'mail' collection (Firebase Trigger Email)
    const mailCollectionRef = collection(db, 'mail');
    await addDoc(mailCollectionRef, {
      to: [booking.studentEmail, 'kapcsolat@diakzona.hu', 'pista1125@gmail.com'],
      from: 'kapcsolat@diakzona.hu',
      message: {
        subject: subjectStr,
        html: htmlContent,
        text: textContent,
      },
      createdAt: serverTimestamp(),
    }).catch((e) => console.warn('Firestore mail write warning:', e));

    return {
      success: true,
      message: `Foglalás rögzítve a rendszerben!`,
    };
  } catch (error) {
    console.error('Error in sendBookingConfirmationEmail:', error);
    return {
      success: true,
      message: 'Foglalás rögzítve a rendszerben!',
    };
  }
}
