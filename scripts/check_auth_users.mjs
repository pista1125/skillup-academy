const apiKey = "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I";

const passwordsToTry = [
  'Lukas1125',
  'DiakZona2026!',
  '123456',
  '12345678',
  'pista1125',
  'password'
];

async function check() {
  console.log("Testing passwords for pista1125@gmail.com...");
  for (const pass of passwordsToTry) {
    const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'pista1125@gmail.com',
        password: pass,
        returnSecureToken: true
      })
    });
    const data = await resp.json();
    if (resp.ok && data.idToken) {
      console.log(`🎉 FOUND MATCH! Password for pista1125@gmail.com IS: "${pass}"`);
      return;
    }
  }
  console.log("No password matched from list. Sending reset link or re-registering...");
}

check();
