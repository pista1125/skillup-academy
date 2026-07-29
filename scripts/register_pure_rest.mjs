const apiKey = "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I";

const users = [
  {"email":"test1772996445525@example.com","name":"Teszt Elek"},
  {"email":"tikepek@gmail.com","name":"Jakab Kiss"},
  {"email":"proba@gmail.com","name":"Orsos Istvan"},
  {"email":"pista1125@gmail.com","name":"Orsós István"},
  {"email":"eper@gmail.com","name":"péter"},
  {"email":"laurabago10@gmail.com","name":"Bagó laura"},
  {"email":"baloghzsolt9876@gmail.com","name":"Zsolt Balogh"},
  {"email":"dela6767@gmail.com","name":"dela"},
  {"email":"analo4444@gmail.com","name":"Pokember"},
  {"email":"ponipaci@gmail.com","name":"kerekes alexandra"},
  {"email":"oewnjcregh@gmail.com","name":"nem mondom"},
  {"email":"kedua.0510@gmail.com","name":"Kovács édua lora"},
  {"email":"xixo@diakzona.com","name":"Bacsó Dániel"},
  {"email":"ormraat.pte@gmail.com","name":"Mihály Orsós"},
  {"email":"vandavirag2015@gmail.com","name":"Virág Vanda"},
  {"email":"vardaierik2015@gmail.com","name":"Várdai Erik"},
  {"email":"eper12@gmail.com","name":"Virág Vanda"},
  {"email":"mateb30@gmail.com","name":"Matev"},
  {"email":"nemvagyokkiskobold@gmail.com","name":"lAKATOS DZSULIO MATE"},
  {"email":"kkevin@gmail.com","name":"KKevin"},
  {"email":"vegvaripeterke94@gmail.com","name":"Péter Végvári"},
  {"email":"kinga1023@gmail.com","name":"Major Kinga Viktória"},
  {"email":"vargadzseni@gmail.com","name":"varga dzseni"},
  {"email":"vagyokakivagyok@gmail.com","name":"valaki"},
  {"email":"kovacs2610@icloud.com","name":"Kovács Amanda"},
  {"email":"biharidiana14@gmail.com","name":"Bihari Diána Zselyke"},
  {"email":"martin0629@gmail.com","name":"martin"},
  {"email":"ricsibalogh985@gmail.com","name":"balogh richard"},
  {"email":"benikemegyesi@gmail.com","name":"Beni"},
  {"email":"laczohanna@gmail.com","name":"Laczó Hanna"},
  {"email":"dezsoke1200@gmail.com","name":"Kovács Dezső"},
  {"email":"gyorianna25@gmail.com","name":"Győri Anna"},
  {"email":"takacsnoel37@gmail.com","name":"Noelka"},
  {"email":"juhaszr2014@gmail.com","name":"juhász Richárd"},
  {"email":"schvarczmark65@gmail.com","name":"Schvarcz Márk"},
  {"email":"hirtluca20140411@gmail.com","name":"H.Lucika"},
  {"email":"korisulisa26@gmail.com","name":"Fónai Korina Zamfira"},
  {"email":"reni.sulisa@gmail.com","name":"Bacsó Renáta Julianna"},
  {"email":"kozmalevi14@gmail.com","name":"Kozma Levente"},
  {"email":"kira@gmail.com","name":"Juhász Kira"},
  {"email":"lovaszadri2@gmail.com","name":"Lovász Adrienn"},
  {"email":"puchermartin2015@gmail.com","name":"Martin Pucher"},
  {"email":"12lovaszadri2@gmail.com","name":"Lovász Adrienn"},
  {"email":"lukacszoltika@gmail.com","name":"lukacs bence "},
  {"email":"simonfanni201307@gmail.com","name":"Simon Fanni"},
  {"email":"barbarabencze3@gmail.com","name":"Bencze Barbara"}
];

async function run() {
  console.log(`Starting pure REST batch creation for ${users.length} users...`);
  let created = 0;
  let existing = 0;

  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    try {
      const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: u.email,
          password: 'DiakZona2026!',
          displayName: u.name,
          returnSecureToken: true
        })
      });

      const res = await resp.json();
      if (resp.ok && res.localId) {
        created++;
        console.log(`[${i + 1}/${users.length}] ✅ Created: ${u.email} (${u.name})`);
      } else if (res.error && res.error.message.includes('EMAIL_EXISTS')) {
        existing++;
        console.log(`[${i + 1}/${users.length}] ℹ️ Already exists: ${u.email}`);
      } else {
        console.warn(`[${i + 1}/${users.length}] ⚠️ ${u.email}:`, res.error?.message || res);
      }
    } catch (e) {
      console.error(`Error with ${u.email}:`, e.message);
    }
  }

  console.log(`\n🎉 Success! Total registered: ${created + existing} (New: ${created}, Existing: ${existing})`);
}

run();
