const apiKey = "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I";

async function setPassword() {
  console.log("Updating password for pista1125@gmail.com to Lukas1125...");

  // 1. Sign in with current known password DiakZona2026!
  let signInResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'pista1125@gmail.com',
      password: 'DiakZona2026!',
      returnSecureToken: true
    })
  });

  let data = await signInResp.json();

  if (!signInResp.ok || !data.idToken) {
    // Try fallback password 123456
    signInResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'pista1125@gmail.com',
        password: '123456',
        returnSecureToken: true
      })
    });
    data = await signInResp.json();
  }

  if (data.idToken) {
    // 2. Update password to Lukas1125
    const updateResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: data.idToken,
        password: 'Lukas1125',
        returnSecureToken: true
      })
    });

    const updateData = await updateResp.json();
    if (updateResp.ok) {
      console.log("🎉 Successfully updated password for pista1125@gmail.com to Lukas1125!");
    } else {
      console.error("Failed to update password:", updateData);
    }
  } else {
    console.error("Could not sign in to update password:", data);
  }
}

setPassword();
