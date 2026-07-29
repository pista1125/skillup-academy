const apiKey = "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I";

async function recreatePista() {
  console.log("Setting password for pista1125@gmail.com to Lukas1125...");

  // Send password reset email
  const resetResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requestType: "PASSWORD_RESET",
      email: 'pista1125@gmail.com'
    })
  });

  const resetData = await resetResp.json();
  console.log("Password reset email sent:", resetData);
}

recreatePista();
