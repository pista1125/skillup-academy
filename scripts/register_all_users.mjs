import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I",
    authDomain: "diakzona.firebaseapp.com",
    projectId: "diakzona",
    storageBucket: "diakzona.firebasestorage.app",
    messagingSenderId: "333898018800",
    appId: "1:333898018800:web:59fbecb1b5fa825ff9b735"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const users = [
  {"id":"50ddff0a-ae87-46a3-8d43-38224d7a1b80","email":"test1772996445525@example.com","full_name":"Teszt Elek","role":"student","avatar_url":null},
  {"id":"1034f35e-7ae4-4943-80cf-84495c6ca07a","email":"tikepek@gmail.com","full_name":"Jakab Kiss","role":"student","avatar_url":null},
  {"id":"794441b2-d962-42d6-b1e3-244a0581b50a","email":"proba@gmail.com","full_name":"Orsos Istvan","role":"student","avatar_url":null},
  {"id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","email":"pista1125@gmail.com","full_name":"Orsós István","role":"teacher","avatar_url":"https://lh3.googleusercontent.com/a/ACg8ocJorvvXA3wmmQQWj0mkuGxRKnGauWttSJ_eUnd7Pz_74DqkD4BD9Q=s96-c"},
  {"id":"f38db41a-a78b-4f37-ab53-badecb530ff2","email":"eper@gmail.com","full_name":"péter","role":"student","avatar_url":null},
  {"id":"3318feb0-8c81-42bd-bd26-1773be0628e7","email":"laurabago10@gmail.com","full_name":"Bagó laura","role":"student","avatar_url":null},
  {"id":"aacbe1cb-6241-4c03-a356-c4dd7da63d9e","email":"baloghzsolt9876@gmail.com","full_name":"Zsolt Balogh","role":"student","avatar_url":null},
  {"id":"b042f6c4-55ce-4ec5-a931-b28f8966a7a2","email":"dela6767@gmail.com","full_name":"dela","role":"student","avatar_url":null},
  {"id":"e9d6522d-4691-4a16-b201-187ac4c7285b","email":"analo4444@gmail.com","full_name":"Pokember","role":"student","avatar_url":null},
  {"id":"8f31a1e6-ffcf-4bf6-a3d7-aa48b5821f8a","email":"ponipaci@gmail.com","full_name":"kerekes alexandra","role":"student","avatar_url":"🎓"},
  {"id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","email":"oewnjcregh@gmail.com","full_name":"nem mondom","role":"student","avatar_url":"⚽"},
  {"id":"0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd","email":"kedua.0510@gmail.com","full_name":"Kovács édua lora","role":"student","avatar_url":"🧩"},
  {"id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","email":"xixo@diakzona.com","full_name":"Bacsó Dániel","role":"student","avatar_url":null},
  {"id":"8b4b7891-c01a-4cf4-af7b-88931fbd4823","email":"ormraat.pte@gmail.com","full_name":"Mihály Orsós","role":"student","avatar_url":null},
  {"id":"7bf5ef90-6811-44f0-a714-30ad69ec9d60","email":"vandavirag2015@gmail.com","full_name":"Virág Vanda","role":"student","avatar_url":null},
  {"id":"fe0e3aa9-8a65-457e-b9db-81dfff37bbae","email":"vardaierik2015@gmail.com","full_name":"Várdai Erik","role":"student","avatar_url":null},
  {"id":"131c3d32-32c0-41db-a250-01347a640d62","email":"eper12@gmail.com","full_name":"Virág Vanda","role":"student","avatar_url":""},
  {"id":"6cca2a1d-a814-4f1e-b082-ea56c2e5d62d","email":"mateb30@gmail.com","full_name":"Matev","role":"student","avatar_url":"🎓"},
  {"id":"f3e5eeb2-b930-472c-94e5-33635c405dd1","email":"nemvagyokkiskobold@gmail.com","full_name":"lAKATOS DZSULIO MATE","role":"student","avatar_url":""},
  {"id":"dad78504-89be-4793-8916-2f6ceb3eb6b6","email":"kkevin@gmail.com","full_name":"KKevin","role":"student","avatar_url":null},
  {"id":"7f653f3d-5a0e-467d-ad5a-3f6866f62d45","email":"vegvaripeterke94@gmail.com","full_name":"Péter Végvári","role":"student","avatar_url":null},
  {"id":"3c1ddcd2-c277-474c-be8f-1de569764be9","email":"kinga1023@gmail.com","full_name":"Major Kinga Viktória","role":"student","avatar_url":null},
  {"id":"9b0d8015-885a-4396-8486-ee7417897e3e","email":"vargadzseni@gmail.com","full_name":"varga dzseni","role":"student","avatar_url":null},
  {"id":"4c37d83c-a22f-4a2e-b2eb-59df499a7d21","email":"vagyokakivagyok@gmail.com","full_name":"valaki","role":"student","avatar_url":null},
  {"id":"b3cd61af-1117-4fcd-85a0-54fbfedc34a7","email":"kovacs2610@icloud.com","full_name":"Kovács Amanda","role":"student","avatar_url":null},
  {"id":"8c011ba8-c282-4c1f-944a-e17ce7eabfff","email":"biharidiana14@gmail.com","full_name":"Bihari Diána Zselyke","role":"student","avatar_url":null},
  {"id":"08f09968-c0be-47e5-90c2-dd91b45cd69a","email":"martin0629@gmail.com","full_name":"martin","role":"student","avatar_url":null},
  {"id":"5e1a6113-6936-4bd6-ab6f-75c43659ef5a","email":"ricsibalogh985@gmail.com","full_name":"balogh richard","role":"student","avatar_url":""},
  {"id":"7e385ff5-a2ea-4f8d-a98e-04b95520344a","email":"benikemegyesi@gmail.com","full_name":"Beni","role":"student","avatar_url":"🎓"},
  {"id":"dc21a343-7116-49fe-a847-d9a579183f67","email":"laczohanna@gmail.com","full_name":"Laczó Hanna","role":"student","avatar_url":null},
  {"id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","email":"dezsoke1200@gmail.com","full_name":"Kovács Dezső","role":"student","avatar_url":null},
  {"id":"8ef7fa9a-da02-4b98-aef7-360c6b239f91","email":"gyorianna25@gmail.com","full_name":"Győri Anna","role":"student","avatar_url":null},
  {"id":"3075b78e-785f-4a51-a055-9137de52e54a","email":"takacsnoel37@gmail.com","full_name":"Noelka","role":"student","avatar_url":null},
  {"id":"b0304811-ee64-4331-abe8-852e6b676699","email":"juhaszr2014@gmail.com","full_name":"juhász Richárd","role":"student","avatar_url":null},
  {"id":"ea6d405b-47d3-47f2-adc6-b64ceb3afb59","email":"schvarczmark65@gmail.com","full_name":"Schvarcz Márk","role":"student","avatar_url":null},
  {"id":"81c94f48-2090-414a-a81c-1499f34d5865","email":"hirtluca20140411@gmail.com","full_name":"H.Lucika","role":"student","avatar_url":null},
  {"id":"b54b62b8-3672-436d-a1e6-24b3543b6d3b","email":"korisulisa26@gmail.com","full_name":"Fónai Korina Zamfira","role":"student","avatar_url":null},
  {"id":"c3d225d1-d4e2-40f9-9f70-4c214e42f3c0","email":"reni.sulisa@gmail.com","full_name":"Bacsó Renáta Julianna","role":"student","avatar_url":null},
  {"id":"e758b2d1-b80e-4fbe-88f9-5521e0be0941","email":"kozmalevi14@gmail.com","full_name":"Kozma Levente","role":"student","avatar_url":"⚽"},
  {"id":"0704bd5d-d60c-424b-90bf-c736f2393a39","email":"kira@gmail.com","full_name":"Juhász Kira","role":"student","avatar_url":"🎒"},
  {"id":"62e3ab1d-43dc-439c-bd70-dd4bb3753029","email":"lovaszadri2@gmail.com","full_name":"Lovász Adrienn","role":"student","avatar_url":null},
  {"id":"894f95e9-7e05-4c8e-8ed4-a7c83202d522","email":"puchermartin2015@gmail.com","full_name":"Martin Pucher","role":"student","avatar_url":null},
  {"id":"015a5c5c-69b3-42b9-bd43-41517294263d","email":"12lovaszadri2@gmail.com","full_name":"Lovász Adrienn","role":"student","avatar_url":null},
  {"id":"b1048cd0-e872-4385-918e-a843fe698616","email":"lukacszoltika@gmail.com","full_name":"lukacs bence ","role":"student","avatar_url":null},
  {"id":"637bfe09-d5ed-4e76-a8c6-a5a5efab586c","email":"simonfanni201307@gmail.com","full_name":"Simon Fanni","role":"student","avatar_url":null},
  {"id":"56a37612-c365-494b-90cd-166f976c19cf","email":"barbarabencze3@gmail.com","full_name":"Bencze Barbara","role":"student","avatar_url":null}
];

async function importUsers() {
  console.log(`Importing ${users.length} users to Firebase Auth and Firestore...`);
  let successCount = 0;

  for (const u of users) {
    try {
      let firebaseUid = u.id;
      try {
        const cred = await createUserWithEmailAndPassword(auth, u.email, "DiakZona2026!");
        firebaseUid = cred.user.uid;
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          console.log(`User ${u.email} already exists in Firebase Auth.`);
        } else {
          console.warn(`Auth creation note for ${u.email}:`, err.message);
        }
      }

      // Write profile to Firestore with Supabase ID and Firebase UID mapping
      const profileData = {
        id: firebaseUid,
        legacy_supabase_id: u.id,
        full_name: u.full_name,
        username: u.email.split('@')[0],
        role: u.role,
        avatar_url: u.avatar_url,
        email: u.email,
        updated_at: new Date().toISOString()
      };

      await setDoc(doc(db, 'profiles', firebaseUid), profileData, { merge: true });
      await setDoc(doc(db, 'profiles', u.id), profileData, { merge: true });

      successCount++;
      console.log(`[${successCount}/${users.length}] Successfully created profile for: ${u.full_name} (${u.email})`);
    } catch (e) {
      console.error(`Error processing ${u.email}:`, e.message);
    }
  }

  console.log(`Finished importing ${successCount} user profiles into Firebase!`);
  process.exit(0);
}

importUsers().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
