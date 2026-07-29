const apiKey = "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I";

async function run() {
  console.log("Signing in with DiakZona2026! to update password to Lukas1125...");
  const signInResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'pista1125@gmail.com',
      password: 'DiakZona2026!',
      returnSecureToken: true
    })
  });

  const signInData = await signInResp.json();
  if (signInResp.ok && signInData.idToken) {
    console.log("✅ Signed in! Updating password to Lukas1125...");
    const updateResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: signInData.idToken,
        password: 'Lukas1125',
        returnSecureToken: true
      })
    });
    const updateData = await updateResp.json();
    if (updateResp.ok) {
      console.log("🎉 SUCCESS! Password for pista1125@gmail.com is NOW CHANGED TO: Lukas1125");
    } else {
      console.error("Update failed:", updateData);
    }
  } else {
    console.error("Sign in failed with DiakZona2026!:", signInData);
  }
}

run();
