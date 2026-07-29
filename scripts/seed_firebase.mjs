import { initializeApp } from 'firebase/app';
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

let db;
try {
    db = getFirestore(app, 'diakzona');
} catch (e) {
    db = getFirestore(app);
}

const profiles = [
  { id: "50ddff0a-ae87-46a3-8d43-38224d7a1b80", full_name: "Teszt Elek", username: "test1772996445525", role: "student", avatar_url: null },
  { id: "1034f35e-7ae4-4943-80cf-84495c6ca07a", full_name: "Jakab Kiss", username: "tikepek", role: "student", avatar_url: null },
  { id: "794441b2-d962-42d6-b1e3-244a0581b50a", full_name: "Orsos Istvan", username: "proba", role: "student", avatar_url: null },
  { id: "fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0", full_name: "Orsós István", username: "pista1125", role: "teacher", avatar_url: "https://lh3.googleusercontent.com/a/ACg8ocJorvvXA3wmmQQWj0mkuGxRKnGauWttSJ_eUnd7Pz_74DqkD4BD9Q=s96-c" },
  { id: "f38db41a-a78b-4f37-ab53-badecb530ff2", full_name: "péter", username: "eper", role: "student", avatar_url: null },
  { id: "3318feb0-8c81-42bd-bd26-1773be0628e7", full_name: "Bagó laura", username: "laurabago10", role: "student", avatar_url: null },
  { id: "aacbe1cb-6241-4c03-a356-c4dd7da63d9e", full_name: "Zsolt Balogh", username: "baloghzsolt9876", role: "student", avatar_url: null },
  { id: "b042f6c4-55ce-4ec5-a931-b28f8966a7a2", full_name: "dela", username: "dela6767", role: "student", avatar_url: null },
  { id: "e9d6522d-4691-4a16-b201-187ac4c7285b", full_name: "Pokember", username: "analo4444", role: "student", avatar_url: null },
  { id: "8f31a1e6-ffcf-4bf6-a3d7-aa48b5821f8a", full_name: "kerekes alexandra", username: "ponipaci", role: "student", avatar_url: "🎓" },
  { id: "353a8347-f0f4-4b5b-b22c-38e5ad2f8bec", full_name: "nem mondom", username: "oewnjcregh", role: "student", avatar_url: "⚽" },
  { id: "0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd", full_name: "Kovács édua lora", username: "kedua.0510", role: "student", avatar_url: "🧩" },
  { id: "e8ea4ea9-464a-4585-9410-db13bc2f6ed9", full_name: "Bacsó Dániel", username: "xixo", role: "student", avatar_url: null },
  { id: "8b4b7891-c01a-4cf4-af7b-88931fbd4823", full_name: "Mihály Orsós", username: "ormraat.pte", role: "student", avatar_url: null },
  { id: "7bf5ef90-6811-44f0-a714-30ad69ec9d60", full_name: "Virág Vanda", username: "vandavirag2015", role: "student", avatar_url: null },
  { id: "fe0e3aa9-8a65-457e-b9db-81dfff37bbae", full_name: "Várdai Erik", username: "vardaierik2015", role: "student", avatar_url: null },
  { id: "131c3d32-32c0-41db-a250-01347a640d62", full_name: "Virág Vanda", username: "eper12", role: "student", avatar_url: "" },
  { id: "6cca2a1d-a814-4f1e-b082-ea56c2e5d62d", full_name: "Matev", username: "mateb30", role: "student", avatar_url: "🎓" },
  { id: "f3e5eeb2-b930-472c-94e5-33635c405dd1", full_name: "lAKATOS DZSULIO MATE", username: "nemvagyokkiskobold", role: "student", avatar_url: "" },
  { id: "dad78504-89be-4793-8916-2f6ceb3eb6b6", full_name: "KKevin", username: "kkevin", role: "student", avatar_url: null },
  { id: "7f653f3d-5a0e-467d-ad5a-3f6866f62d45", full_name: "Péter Végvári", username: "vegvaripeterke94", role: "student", avatar_url: null },
  { id: "3c1ddcd2-c277-474c-be8f-1de569764be9", full_name: "Major Kinga Viktória", username: "kinga1023", role: "student", avatar_url: null },
  { id: "9b0d8015-885a-4396-8486-ee7417897e3e", full_name: "varga dzseni", username: "vargadzseni", role: "student", avatar_url: null },
  { id: "4c37d83c-a22f-4a2e-b2eb-59df499a7d21", full_name: "valaki", username: "vagyokakivagyok", role: "student", avatar_url: null },
  { id: "b3cd61af-1117-4fcd-85a0-54fbfedc34a7", full_name: "Kovács Amanda", username: "kovacs2610", role: "student", avatar_url: null },
  { id: "8c011ba8-c282-4c1f-944a-e17ce7eabfff", full_name: "Bihari Diána Zselyke", username: "biharidiana14", role: "student", avatar_url: null },
  { id: "08f09968-c0be-47e5-90c2-dd91b45cd69a", full_name: "martin", username: "martin0629", role: "student", avatar_url: null },
  { id: "5e1a6113-6936-4bd6-ab6f-75c43659ef5a", full_name: "balogh richard", username: "ricsibalogh985", role: "student", avatar_url: "" },
  { id: "7e385ff5-a2ea-4f8d-a98e-04b95520344a", full_name: "Beni", username: "benikemegyesi", role: "student", avatar_url: "🎓" },
  { id: "dc21a343-7116-49fe-a847-d9a579183f67", full_name: "Laczó Hanna", username: "laczohanna", role: "student", avatar_url: null },
  { id: "0dae30a5-056d-40fa-9234-709c9ceef5b9", full_name: "Kovács Dezső", username: "dezsoke1200", role: "student", avatar_url: null },
  { id: "8ef7fa9a-da02-4b98-aef7-360c6b239f91", full_name: "Győri Anna", username: "gyorianna25", role: "student", avatar_url: null },
  { id: "3075b78e-785f-4a51-a055-9137de52e54a", full_name: "Noelka", username: "takacsnoel37", role: "student", avatar_url: null },
  { id: "b0304811-ee64-4331-abe8-852e6b676699", full_name: "juhász Richárd", username: "juhaszr2014", role: "student", avatar_url: null },
  { id: "ea6d405b-47d3-47f2-adc6-b64ceb3afb59", full_name: "Schvarcz Márk", username: "schvarczmark65", role: "student", avatar_url: null },
  { id: "81c94f48-2090-414a-a81c-1499f34d5865", full_name: "H.Lucika", username: "hirtluca20140411", role: "student", avatar_url: null },
  { id: "b54b62b8-3672-436d-a1e6-24b3543b6d3b", full_name: "Fónai Korina Zamfira", username: "korisulisa26", role: "student", avatar_url: null },
  { id: "c3d225d1-d4e2-40f9-9f70-4c214e42f3c0", full_name: "Bacsó Renáta Julianna", username: "reni.sulisa", role: "student", avatar_url: null },
  { id: "e758b2d1-b80e-4fbe-88f9-5521e0be0941", full_name: "Kozma Levente", username: "kozmalevi14", role: "student", avatar_url: "⚽" },
  { id: "0704bd5d-d60c-424b-90bf-c736f2393a39", full_name: "Juhász Kira", username: "kira", role: "student", avatar_url: "🎒" },
  { id: "62e3ab1d-43dc-439c-bd70-dd4bb3753029", full_name: "Lovász Adrienn", username: "lovaszadri2", role: "student", avatar_url: null },
  { id: "894f95e9-7e05-4c8e-8ed4-a7c83202d522", full_name: "Martin Pucher", username: "puchermartin2015", role: "student", avatar_url: null },
  { id: "015a5c5c-69b3-42b9-bd43-41517294263d", full_name: "Lovász Adrienn", username: "12lovaszadri2", role: "student", avatar_url: null },
  { id: "b1048cd0-e872-4385-918e-a843fe698616", full_name: "lukacs bence ", username: "lukacszoltika", role: "student", avatar_url: null },
  { id: "637bfe09-d5ed-4e76-a8c6-a5a5efab586c", full_name: "Simon Fanni", username: "simonfanni201307", role: "student", avatar_url: null },
  { id: "56a37612-c365-494b-90cd-166f976c19cf", full_name: "Bencze Barbara", username: "barbarabencze3", role: "student", avatar_url: null }
];

const classes = [
  { id: "69105b6b-37a9-4c72-9d6e-8f3fdf29223f", teacher_id: "fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0", name: "5. Osztály", created_at: "2026-03-11T15:02:48.799Z" },
  { id: "702c446a-caa3-4db9-b12b-757f59125e7d", teacher_id: "8b4b7891-c01a-4cf4-af7b-88931fbd4823", name: "elso", created_at: "2026-03-11T15:52:45.244Z" },
  { id: "043536d6-0c76-46b7-a0df-3511f834741f", teacher_id: "fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0", name: "6. osztály", created_at: "2026-03-11T17:18:14.743Z" },
  { id: "c89b6e63-c425-49c0-9d2c-f81cd1274f06", teacher_id: "fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0", name: "7. osztály", created_at: "2026-03-16T07:24:03.214Z" },
  { id: "ea9afb85-8af2-42d7-9aa1-0368ee263962", teacher_id: "fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0", name: "4. osztály", created_at: "2026-03-17T10:18:30.542Z" }
];

async function seed() {
  console.log('Seeding profiles...');
  for (const p of profiles) {
    await setDoc(doc(db, 'profiles', p.id), {
      id: p.id,
      full_name: p.full_name,
      username: p.username,
      role: p.role,
      avatar_url: p.avatar_url,
      updated_at: new Date().toISOString()
    }, { merge: true });
  }

  console.log('Seeding feedback_classes...');
  for (const c of classes) {
    await setDoc(doc(db, 'feedback_classes', c.id), c, { merge: true });
  }

  console.log('Successfully seeded all data into Cloud Firestore!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
