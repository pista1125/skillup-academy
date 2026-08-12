import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { BookingData } from './bookingService';

export interface EmailResult {
  success: boolean;
  message: string;
}

/**
 * Send booking confirmation email.
 * Supports EmailJS (from kapcsolat@diakzona.hu), Web3Forms, Resend, and Firestore mail trigger.
 */
export async function sendBookingConfirmationEmail(booking: BookingData): Promise<EmailResult> {
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

Fizetési információ:
A fizetés közvetlenül az óra előtt / átutalással történik. A csatlakozási linket és a részleteket e-mailben/telefonon egyeztetjük.

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

      <p style="font-size: 13px; color: #64748b; background-color: #fffbeb; border: 1px solid #fef3c7; padding: 12px; border-radius: 8px;">
        📌 <strong>Fizetési információ:</strong> A fizetés közvetlenül az óra előtt / átutalással történik. A csatlakozási linket és a részleteket e-mailben/telefonon egyeztetjük.
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
          meetLink: booking.meetLink,
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

    // 2. EmailJS Integration (sending FROM kapcsolat@diakzona.hu)
    const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            to_email: booking.studentEmail,
            student_name: booking.studentName,
            student_phone: booking.studentPhone,
            grade_level: booking.gradeLevel,
            topic: booking.topic,
            date: booking.date,
            time_slot: booking.timeSlot,
            notes: booking.notes || 'Nincs',
            admin_email: 'kapcsolat@diakzona.hu',
          },
        }),
      }).catch((e) => console.warn('EmailJS send error:', e));
    }

    // 3. Web3Forms Integration
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (web3FormsKey) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: subjectStr,
          from_name: 'DiákZóna Akadémia (kapcsolat@diakzona.hu)',
          to_email: booking.studentEmail,
          email: booking.studentEmail,
          message: textContent,
        }),
      }).catch((e) => console.warn('Web3Forms dispatch error:', e));
    }

    // 4. Resend Integration
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'DiákZóna Akadémia <kapcsolat@diakzona.hu>',
          to: [booking.studentEmail, 'kapcsolat@diakzona.hu'],
          subject: subjectStr,
          html: htmlContent,
        }),
      }).catch((e) => console.warn('Resend API dispatch error:', e));
    }

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
