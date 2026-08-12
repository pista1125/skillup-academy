import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'kapcsolat@diakzona.hu',
    pass: process.env.GMAIL_APP_PASSWORD || 'oboiairinricsurq',
  },
});

async function sendTest() {
  console.log('🚀 Sending test email from kapcsolat@diakzona.hu...');
  try {
    const info = await transporter.sendMail({
      from: '"DiákZóna Akadémia" <kapcsolat@diakzona.hu>',
      to: ['pista1125@gmail.com'],
      subject: 'Próba e-mail: DiákZóna Akadémia Online Korrepetálás',
      text: 'Sikeres teszt! A kapcsolat@diakzona.hu fiókból az e-mail küldés hibátlanul működik!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #6366f1; border-radius: 12px;">
          <h2 style="color: #6366f1;">Sikeres E-mail Teszt! 🎉</h2>
          <p>Ez egy tesztüzenet a <strong>kapcsolat@diakzona.hu</strong> fiókból.</p>
          <p>Az online korrepetálási foglalási rendszer mostantól automatikusan küldi a visszaigazoló leveleket erről a címről!</p>
        </div>
      `,
    });
    console.log('✅ Email successfully delivered! Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending test email:', error);
  }
}

sendTest();
