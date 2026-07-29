import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  setDoc,
  updateDoc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';

export interface ChessMatch {
  id: string;
  white_id: string | null;
  black_id: string | null;
  fen: string;
  last_move: string | null;
  status: 'active' | 'finished' | 'waiting';
  winner_id: string | null;
  created_at: string;
  updated_at: string;
  white_profile?: { full_name: string };
  black_profile?: { full_name: string };
}

export const ChessService = {
  async searchProfiles(searchQuery: string) {
    const allStudentProfiles = [
      { id: "1034f35e-7ae4-4943-80cf-84495c6ca07a", full_name: "Jakab Kiss", username: "tikepek", email: "tikepek@gmail.com", role: "student" },
      { id: "794441b2-d962-42d6-b1e3-244a0581b50a", full_name: "Orsos Istvan", username: "proba", email: "proba@gmail.com", role: "student" },
      { id: "f38db41a-a78b-4f37-ab53-badecb530ff2", full_name: "péter", username: "eper", email: "eper@gmail.com", role: "student" },
      { id: "3318feb0-8c81-42bd-bd26-1773be0628e7", full_name: "Bagó laura", username: "laurabago10", email: "laurabago10@gmail.com", role: "student" },
      { id: "aacbe1cb-6241-4c03-a356-c4dd7da63d9e", full_name: "Zsolt Balogh", username: "baloghzsolt9876", email: "baloghzsolt9876@gmail.com", role: "student" },
      { id: "b042f6c4-55ce-4ec5-a931-b28f8966a7a2", full_name: "dela", username: "dela6767", email: "dela6767@gmail.com", role: "student" },
      { id: "e9d6522d-4691-4a16-b201-187ac4c7285b", full_name: "Pokember", username: "analo4444", email: "analo4444@gmail.com", role: "student" },
      { id: "8f31a1e6-ffcf-4bf6-a3d7-aa48b5821f8a", full_name: "kerekes alexandra", username: "ponipaci", email: "ponipaci@gmail.com", role: "student", avatar_url: "🎓" },
      { id: "353a8347-f0f4-4b5b-b22c-38e5ad2f8bec", full_name: "nem mondom", username: "oewnjcregh", email: "oewnjcregh@gmail.com", role: "student", avatar_url: "⚽" },
      { id: "0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd", full_name: "Kovács édua lora", username: "kedua.0510", email: "kedua.0510@gmail.com", role: "student", avatar_url: "🧩" },
      { id: "e8ea4ea9-464a-4585-9410-db13bc2f6ed9", full_name: "Bacsó Dániel", username: "xixo", email: "xixo@diakzona.com", role: "student" },
      { id: "8b4b7891-c01a-4cf4-af7b-88931fbd4823", full_name: "Mihály Orsós", username: "ormraat.pte", email: "ormraat.pte@gmail.com", role: "student" },
      { id: "7bf5ef90-6811-44f0-a714-30ad69ec9d60", full_name: "Virág Vanda", username: "vandavirag2015", email: "vandavirag2015@gmail.com", role: "student" },
      { id: "fe0e3aa9-8a65-457e-b9db-81dfff37bbae", full_name: "Várdai Erik", username: "vardaierik2015", email: "vardaierik2015@gmail.com", role: "student" },
      { id: "131c3d32-32c0-41db-a250-01347a640d62", full_name: "Virág Vanda", username: "eper12", email: "eper12@gmail.com", role: "student" },
      { id: "6cca2a1d-a814-4f1e-b082-ea56c2e5d62d", full_name: "Matev", username: "mateb30", email: "mateb30@gmail.com", role: "student", avatar_url: "🎓" },
      { id: "f3e5eeb2-b930-472c-94e5-33635c405dd1", full_name: "lAKATOS DZSULIO MATE", username: "nemvagyokkiskobold", email: "nemvagyokkiskobold@gmail.com", role: "student" },
      { id: "dad78504-89be-4793-8916-2f6ceb3eb6b6", full_name: "KKevin", username: "kkevin", email: "kkevin@gmail.com", role: "student" },
      { id: "7f653f3d-5a0e-467d-ad5a-3f6866f62d45", full_name: "Péter Végvári", username: "vegvaripeterke94", email: "vegvaripeterke94@gmail.com", role: "student" },
      { id: "3c1ddcd2-c277-474c-be8f-1de569764be9", full_name: "Major Kinga Viktória", username: "kinga1023", email: "kinga1023@gmail.com", role: "student" },
      { id: "9b0d8015-885a-4396-8486-ee7417897e3e", full_name: "varga dzseni", username: "vargadzseni", email: "vargadzseni@gmail.com", role: "student" },
      { id: "4c37d83c-a22f-4a2e-b2eb-59df499a7d21", full_name: "valaki", username: "vagyokakivagyok", email: "vagyokakivagyok@gmail.com", role: "student" },
      { id: "b3cd61af-1117-4fcd-85a0-54fbfedc34a7", full_name: "Kovács Amanda", username: "kovacs2610", email: "kovacs2610@icloud.com", role: "student" },
      { id: "8c011ba8-c282-4c1f-944a-e17ce7eabfff", full_name: "Bihari Diána Zselyke", username: "biharidiana14", email: "biharidiana14@gmail.com", role: "student" },
      { id: "08f09968-c0be-47e5-90c2-dd91b45cd69a", full_name: "martin", username: "martin0629", email: "martin0629@gmail.com", role: "student" },
      { id: "5e1a6113-6936-4bd6-ab6f-75c43659ef5a", full_name: "balogh richard", username: "ricsibalogh985", email: "ricsibalogh985@gmail.com", role: "student" },
      { id: "7e385ff5-a2ea-4f8d-a98e-04b95520344a", full_name: "Beni", username: "benikemegyesi", email: "benikemegyesi@gmail.com", role: "student", avatar_url: "🎓" },
      { id: "dc21a343-7116-49fe-a847-d9a579183f67", full_name: "Laczó Hanna", username: "laczohanna", email: "laczohanna@gmail.com", role: "student" },
      { id: "0dae30a5-056d-40fa-9234-709c9ceef5b9", full_name: "Kovács Dezső", username: "dezsoke1200", email: "dezsoke1200@gmail.com", role: "student" },
      { id: "8ef7fa9a-da02-4b98-aef7-360c6b239f91", full_name: "Győri Anna", username: "gyorianna25", email: "gyorianna25@gmail.com", role: "student" },
      { id: "3075b78e-785f-4a51-a055-9137de52e54a", full_name: "Noelka", username: "takacsnoel37", email: "takacsnoel37@gmail.com", role: "student" },
      { id: "b0304811-ee64-4331-abe8-852e6b676699", full_name: "juhász Richárd", username: "juhaszr2014", email: "juhaszr2014@gmail.com", role: "student" },
      { id: "ea6d405b-47d3-47f2-adc6-b64ceb3afb59", full_name: "Schvarcz Márk", username: "schvarczmark65", email: "schvarczmark65@gmail.com", role: "student" },
      { id: "81c94f48-2090-414a-a81c-1499f34d5865", full_name: "H.Lucika", username: "hirtluca20140411", email: "hirtluca20140411@gmail.com", role: "student" },
      { id: "b54b62b8-3672-436d-a1e6-24b3543b6d3b", full_name: "Fónai Korina Zamfira", username: "korisulisa26", email: "korisulisa26@gmail.com", role: "student" },
      { id: "c3d225d1-d4e2-40f9-9f70-4c214e42f3c0", full_name: "Bacsó Renáta Julianna", username: "reni.sulisa", email: "reni.sulisa@gmail.com", role: "student" },
      { id: "e758b2d1-b80e-4fbe-88f9-5521e0be0941", full_name: "Kozma Levente", username: "kozmalevi14", email: "kozmalevi14@gmail.com", role: "student", avatar_url: "⚽" },
      { id: "0704bd5d-d60c-424b-90bf-c736f2393a39", full_name: "Juhász Kira", username: "kira", email: "kira@gmail.com", role: "student", avatar_url: "🎒" },
      { id: "62e3ab1d-43dc-439c-bd70-dd4bb3753029", full_name: "Lovász Adrienn", username: "lovaszadri2", email: "lovaszadri2@gmail.com", role: "student" },
      { id: "894f95e9-7e05-4c8e-8ed4-a7c83202d522", full_name: "Martin Pucher", username: "puchermartin2015", email: "puchermartin2015@gmail.com", role: "student" },
      { id: "015a5c5c-69b3-42b9-bd43-41517294263d", full_name: "Lovász Adrienn", username: "12lovaszadri2", email: "12lovaszadri2@gmail.com", role: "student" },
      { id: "b1048cd0-e872-4385-918e-a843fe698616", full_name: "lukacs bence ", username: "lukacszoltika", email: "lukacszoltika@gmail.com", role: "student" },
      { id: "637bfe09-d5ed-4e76-a8c6-a5a5efab586c", full_name: "Simon Fanni", username: "simonfanni201307", email: "simonfanni201307@gmail.com", role: "student" },
      { id: "56a37612-c365-494b-90cd-166f976c19cf", full_name: "Bencze Barbara", username: "barbarabencze3", email: "barbarabencze3@gmail.com", role: "student" }
    ];

    const q = query(collection(db, 'profiles'));
    const snapshot = await getDocs(q);
    const resultsMap = new Map<string, any>();
    const lowerQuery = searchQuery.toLowerCase();

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (
        (data.full_name && data.full_name.toLowerCase().includes(lowerQuery)) ||
        (data.username && data.username.toLowerCase().includes(lowerQuery)) ||
        (data.email && data.email.toLowerCase().includes(lowerQuery))
      ) {
        resultsMap.set(docSnap.id, { id: docSnap.id, ...data });
      }
    });

    for (const p of allStudentProfiles) {
      if (
        (p.full_name && p.full_name.toLowerCase().includes(lowerQuery)) ||
        (p.username && p.username.toLowerCase().includes(lowerQuery)) ||
        (p.email && p.email.toLowerCase().includes(lowerQuery))
      ) {
        if (!resultsMap.has(p.id)) {
          resultsMap.set(p.id, p);
        }
      }
    }

    return Array.from(resultsMap.values());
  },

  async sendFriendRequest(friendId: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    await addDoc(collection(db, 'friends'), {
      user_id: user.uid,
      friend_id: friendId,
      status: 'pending',
      created_at: new Date().toISOString()
    });
  },

  async getFriendRequests() {
    const user = auth.currentUser;
    if (!user) return [];

    try {
      const q = query(
        collection(db, 'friends'),
        where('friend_id', '==', user.uid),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);
      const requests: any[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        let profileName = 'Ismeretlen diák';

        if (data.user_id) {
          profileName = await this.getProfileName(data.user_id);
        }

        requests.push({
          id: docSnap.id,
          ...data,
          profiles: { full_name: profileName }
        });
      }

      return requests;
    } catch (e) {
      console.warn('getFriendRequests failed:', e);
      return [];
    }
  },

  async respondFriendRequest(requestId: string, status: 'accepted' | 'rejected') {
    await updateDoc(doc(db, 'friends', requestId), { status });
  },

  async getProfileName(uid: string): Promise<string> {
    const allStudentProfiles = [
      { id: "1034f35e-7ae4-4943-80cf-84495c6ca07a", full_name: "Jakab Kiss" },
      { id: "794441b2-d962-42d6-b1e3-244a0581b50a", full_name: "Orsos Istvan" },
      { id: "f38db41a-a78b-4f37-ab53-badecb530ff2", full_name: "péter" },
      { id: "3318feb0-8c81-42bd-bd26-1773be0628e7", full_name: "Bagó laura" },
      { id: "aacbe1cb-6241-4c03-a356-c4dd7da63d9e", full_name: "Zsolt Balogh" },
      { id: "b042f6c4-55ce-4ec5-a931-b28f8966a7a2", full_name: "dela" },
      { id: "e9d6522d-4691-4a16-b201-187ac4c7285b", full_name: "Pokember" },
      { id: "8f31a1e6-ffcf-4bf6-a3d7-aa48b5821f8a", full_name: "kerekes alexandra" },
      { id: "353a8347-f0f4-4b5b-b22c-38e5ad2f8bec", full_name: "nem mondom" },
      { id: "0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd", full_name: "Kovács édua lora" },
      { id: "e8ea4ea9-464a-4585-9410-db13bc2f6ed9", full_name: "Bacsó Dániel" },
      { id: "8b4b7891-c01a-4cf4-af7b-88931fbd4823", full_name: "Mihály Orsós" },
      { id: "7bf5ef90-6811-44f0-a714-30ad69ec9d60", full_name: "Virág Vanda" },
      { id: "fe0e3aa9-8a65-457e-b9db-81dfff37bbae", full_name: "Várdai Erik" },
      { id: "131c3d32-32c0-41db-a250-01347a640d62", full_name: "Virág Vanda" },
      { id: "6cca2a1d-a814-4f1e-b082-ea56c2e5d62d", full_name: "Matev" },
      { id: "f3e5eeb2-b930-472c-94e5-33635c405dd1", full_name: "lAKATOS DZSULIO MATE" },
      { id: "dad78504-89be-4793-8916-2f6ceb3eb6b6", full_name: "KKevin" },
      { id: "7f653f3d-5a0e-467d-ad5a-3f6866f62d45", full_name: "Péter Végvári" },
      { id: "3c1ddcd2-c277-474c-be8f-1de569764be9", full_name: "Major Kinga Viktória" },
      { id: "9b0d8015-885a-4396-8486-ee7417897e3e", full_name: "varga dzseni" },
      { id: "4c37d83c-a22f-4a2e-b2eb-59df499a7d21", full_name: "valaki" },
      { id: "b3cd61af-1117-4fcd-85a0-54fbfedc34a7", full_name: "Kovács Amanda" },
      { id: "8c011ba8-c282-4c1f-944a-e17ce7eabfff", full_name: "Bihari Diána Zselyke" },
      { id: "08f09968-c0be-47e5-90c2-dd91b45cd69a", full_name: "martin" },
      { id: "5e1a6113-6936-4bd6-ab6f-75c43659ef5a", full_name: "balogh richard" },
      { id: "7e385ff5-a2ea-4f8d-a98e-04b95520344a", full_name: "Beni" },
      { id: "dc21a343-7116-49fe-a847-d9a579183f67", full_name: "Laczó Hanna" },
      { id: "0dae30a5-056d-40fa-9234-709c9ceef5b9", full_name: "Kovács Dezső" },
      { id: "8ef7fa9a-da02-4b98-aef7-360c6b239f91", full_name: "Győri Anna" },
      { id: "3075b78e-785f-4a51-a055-9137de52e54a", full_name: "Noelka" },
      { id: "b0304811-ee64-4331-abe8-852e6b676699", full_name: "juhász Richárd" },
      { id: "ea6d405b-47d3-47f2-adc6-b64ceb3afb59", full_name: "Schvarcz Márk" },
      { id: "81c94f48-2090-414a-a81c-1499f34d5865", full_name: "H.Lucika" },
      { id: "b54b62b8-3672-436d-a1e6-24b3543b6d3b", full_name: "Fónai Korina Zamfira" },
      { id: "c3d225d1-d4e2-40f9-9f70-4c214e42f3c0", full_name: "Bacsó Renáta Julianna" },
      { id: "e758b2d1-b80e-4fbe-88f9-5521e0be0941", full_name: "Kozma Levente" },
      { id: "0704bd5d-d60c-424b-90bf-c736f2393a39", full_name: "Juhász Kira" },
      { id: "62e3ab1d-43dc-439c-bd70-dd4bb3753029", full_name: "Lovász Adrienn" },
      { id: "894f95e9-7e05-4c8e-8ed4-a7c83202d522", full_name: "Martin Pucher" },
      { id: "015a5c5c-69b3-42b9-bd43-41517294263d", full_name: "Lovász Adrienn" },
      { id: "b1048cd0-e872-4385-918e-a843fe698616", full_name: "lukacs bence " },
      { id: "637bfe09-d5ed-4e76-a8c6-a5a5efab586c", full_name: "Simon Fanni" },
      { id: "56a37612-c365-494b-90cd-166f976c19cf", full_name: "Bencze Barbara" }
    ];

    try {
      const pSnap = await getDoc(doc(db, 'profiles', uid));
      if (pSnap.exists() && pSnap.data().full_name) {
        return pSnap.data().full_name;
      }
    } catch (e) {}

    const found = allStudentProfiles.find((p: any) => p.id === uid);
    if (found) return found.full_name;
    if (uid === 'fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0') return 'Orsós István';

    return 'Barát';
  },

  getUserUids(user: any): string[] {
    if (!user) return [];
    const set = new Set<string>([user.uid]);
    if (user.email === 'pista1125@gmail.com' || user.uid === 'JudyvLL9XON87rQfdwhE4dstrlD2' || user.uid === 'fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0') {
      set.add('fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0');
      set.add('JudyvLL9XON87rQfdwhE4dstrlD2');
    }
    return Array.from(set);
  },

  async getFriends() {
    const user = auth.currentUser;
    if (!user) return [];

    const userUids = this.getUserUids(user);

    try {
      const q1 = query(collection(db, 'friends'), where('user_id', 'in', userUids), where('status', '==', 'accepted'));
      const q2 = query(collection(db, 'friends'), where('friend_id', 'in', userUids), where('status', '==', 'accepted'));

      let [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

      if (snap1.empty && snap2.empty) {
        const initialFriends = [
          {"id":"da1b24a9-956b-453f-9c15-f039ed9fb41d","user_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","friend_id":"50ddff0a-ae87-46a3-8d43-38224d7a1b80","status":"pending","created_at":"2026-03-13 17:23:14.299668+00"},
          {"id":"0521b7e2-3b54-4903-b8c8-7fc238bfafd8","user_id":"131c3d32-32c0-41db-a250-01347a640d62","friend_id":"794441b2-d962-42d6-b1e3-244a0581b50a","status":"pending","created_at":"2026-03-13 17:26:32.60515+00"},
          {"id":"966d9610-b958-4400-aa77-4bdea9f8d9a5","user_id":"131c3d32-32c0-41db-a250-01347a640d62","friend_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","status":"accepted","created_at":"2026-03-13 17:26:31.178228+00"},
          {"id":"35e554d9-dfdf-4973-b861-61f7543b09f9","user_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","friend_id":"131c3d32-32c0-41db-a250-01347a640d62","status":"accepted","created_at":"2026-03-13 17:26:56.61257+00"},
          {"id":"da531007-2113-4c3e-8bd9-bbff366d2763","user_id":"131c3d32-32c0-41db-a250-01347a640d62","friend_id":"7f653f3d-5a0e-467d-ad5a-3f6866f62d45","status":"accepted","created_at":"2026-03-13 18:45:20.983381+00"},
          {"id":"025a69b3-dbc6-48ea-98b7-fbd88fb21379","user_id":"e758b2d1-b80e-4fbe-88f9-5521e0be0941","friend_id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","status":"accepted","created_at":"2026-03-23 07:12:24.077108+00"},
          {"id":"ea5f7307-ec6d-40d3-a359-92f5d8c61c55","user_id":"e758b2d1-b80e-4fbe-88f9-5521e0be0941","friend_id":"7e385ff5-a2ea-4f8d-a98e-04b95520344a","status":"accepted","created_at":"2026-03-23 07:12:53.014359+00"},
          {"id":"a2da7593-9cb9-4ecb-b45b-21ccbdc54af6","user_id":"5e1a6113-6936-4bd6-ab6f-75c43659ef5a","friend_id":"7e385ff5-a2ea-4f8d-a98e-04b95520344a","status":"accepted","created_at":"2026-03-23 07:13:10.043566+00"},
          {"id":"c5303090-9129-455c-bc2f-88cbffbba452","user_id":"b0304811-ee64-4331-abe8-852e6b676699","friend_id":"3075b78e-785f-4a51-a055-9137de52e54a","status":"pending","created_at":"2026-03-23 07:19:29.295491+00"},
          {"id":"6fd8c2d5-299a-4649-84f7-1a426fab3d19","user_id":"b0304811-ee64-4331-abe8-852e6b676699","friend_id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","status":"accepted","created_at":"2026-03-23 07:20:45.778738+00"},
          {"id":"cdbbf8eb-7ae7-4d08-8660-63d1bcd73012","user_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","friend_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","status":"accepted","created_at":"2026-03-24 09:19:49.32885+00"},
          {"id":"734c8ff8-c715-4573-86ba-49c72eea364d","user_id":"fe0e3aa9-8a65-457e-b9db-81dfff37bbae","friend_id":"894f95e9-7e05-4c8e-8ed4-a7c83202d522","status":"accepted","created_at":"2026-04-13 12:14:51.424654+00"},
          {"id":"d226259f-cafd-45e7-b47e-3ad1fe052ed9","user_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","friend_id":"e9d6522d-4691-4a16-b201-187ac4c7285b","status":"accepted","created_at":"2026-04-29 13:23:49.533531+00"},
          {"id":"7151a288-18b5-43fc-a80f-10234df7b571","user_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","friend_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","status":"accepted","created_at":"2026-04-30 10:38:22.952244+00"},
          {"id":"b076e13c-37cd-45c0-ade2-dcb07bade627","user_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","friend_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","status":"accepted","created_at":"2026-04-30 10:48:06.765546+00"},
          {"id":"a525c5d4-4257-445f-ab29-c31233c51407","user_id":"0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd","friend_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","status":"accepted","created_at":"2026-04-30 11:05:34.372217+00"},
          {"id":"218e5d7e-d523-4b8a-9a7d-50f898004490","user_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","friend_id":"9b0d8015-885a-4396-8486-ee7417897e3e","status":"accepted","created_at":"2026-06-12 08:20:47.160527+00"}
        ];

        for (const f of initialFriends) {
          if (userUids.includes(f.user_id) || userUids.includes(f.friend_id)) {
            await setDoc(doc(db, 'friends', f.id), f, { merge: true });
          }
        }
        [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      }

      const friendsList: any[] = [];
      const addedIds = new Set<string>();

      for (const docSnap of snap1.docs) {
        const targetId = docSnap.data().friend_id;
        if (!userUids.includes(targetId) && !addedIds.has(targetId)) {
          addedIds.add(targetId);
          const name = await this.getProfileName(targetId);
          friendsList.push({ id: targetId, full_name: name });
        }
      }

      for (const docSnap of snap2.docs) {
        const targetId = docSnap.data().user_id;
        if (!userUids.includes(targetId) && !addedIds.has(targetId)) {
          addedIds.add(targetId);
          const name = await this.getProfileName(targetId);
          friendsList.push({ id: targetId, full_name: name });
        }
      }

      return friendsList;
    } catch (e) {
      console.warn('getFriends failed:', e);
      return [];
    }
  },

  async createMatch(opponentId: string | null, isWhite: boolean = true) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const now = new Date().toISOString();
    const matchData = {
      white_id: isWhite ? user.uid : opponentId,
      black_id: isWhite ? opponentId : user.uid,
      status: opponentId ? 'waiting' : 'active',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      last_move: null,
      winner_id: null,
      created_at: now,
      updated_at: now,
    };

    const docRef = await addDoc(collection(db, 'chess_matches'), matchData);
    return { id: docRef.id, ...matchData };
  },

  async getMatches() {
    const user = auth.currentUser;
    if (!user) return [];

    const userUids = this.getUserUids(user);

    try {
      const q1 = query(collection(db, 'chess_matches'), where('white_id', 'in', userUids));
      const q2 = query(collection(db, 'chess_matches'), where('black_id', 'in', userUids));

      let [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

      if (snap1.empty && snap2.empty) {
        const initialMatches = [
          {"id":"6300b5bf-464c-498f-82f0-dfa82dd17076","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"131c3d32-32c0-41db-a250-01347a640d62","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 17:33:13.406934+00","updated_at":"2026-03-13 17:33:13.406934+00"},
          {"id":"4b44d8cc-e5a2-444d-8bad-d45221fd8947","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 17:34:19.701846+00","updated_at":"2026-03-13 17:34:19.701846+00"},
          {"id":"2f85eb2c-5664-46df-8fb6-5d08aebe54b3","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"131c3d32-32c0-41db-a250-01347a640d62","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"active","winner_id":null,"created_at":"2026-03-13 18:00:49.60651+00","updated_at":"2026-03-13 18:00:49.60651+00"},
          {"id":"55d07412-0377-4bf6-a721-bf37461482db","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1h3","status":"active","winner_id":null,"created_at":"2026-05-05 12:21:26.205554+00","updated_at":"2026-05-05 12:21:42.807+00"},
          {"id":"cf0c3ed2-23d7-4f4e-a9a8-560373aec6d4","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"r4rk1/2p2ppR/8/p2p1B2/1p6/1P1PPn2/P1P5/RNBKq3 w - - 1 26","last_move":"f2e1","status":"active","winner_id":null,"created_at":"2026-04-30 10:42:34.296424+00","updated_at":"2026-04-30 10:47:20.138+00"},
          {"id":"5da0923c-7270-4b2f-8449-10c8de556b84","white_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1f3","status":"active","winner_id":null,"created_at":"2026-04-30 10:48:11.639542+00","updated_at":"2026-04-30 10:48:16.978+00"},
          {"id":"0f22f081-c972-41e1-97ef-321ecb84f624","white_id":"0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-06-05 13:37:51.383151+00","updated_at":"2026-06-05 13:37:51.383151+00"},
          {"id":"fc21f1a8-c381-4ba3-bf29-6fffba3ce7da","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","last_move":"e2e4","status":"active","winner_id":null,"created_at":"2026-03-13 18:32:34.556103+00","updated_at":"2026-03-13 18:39:34.233+00"},
          {"id":"c2c55fb1-93d4-4630-8cb6-1e4ab9564201","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","fen":"r1bqkb1r/p1pppBpp/1p6/6N1/1n2P1n1/8/PPPP1PPP/RNBQ1RK1 b kq - 0 6","last_move":"c4f7","status":"active","winner_id":null,"created_at":"2026-06-11 07:27:08.940461+00","updated_at":"2026-06-11 07:28:05.781+00"},
          {"id":"7f505366-2591-4fc0-b036-9c914e35783b","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"r5k1/ppp2ppp/8/8/5Qb1/2n4q/PP1P1PKP/RNB1r2R w - - 6 16","last_move":"d3h3","status":"active","winner_id":null,"created_at":"2026-04-30 10:38:31.221414+00","updated_at":"2026-04-30 10:41:36.504+00"},
          {"id":"c1a0f559-9106-4777-a552-c73da0ddbd51","white_id":"0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"8/p1n4p/1pk5/3N4/1nP3p1/8/PP2K1PP/R1B3NR w - - 0 34","last_move":"b5c7","status":"active","winner_id":null,"created_at":"2026-04-30 11:05:51.538985+00","updated_at":"2026-04-30 11:14:40.435+00"},
          {"id":"ba04c84e-92b9-472a-b033-5d65b029bd5d","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1","last_move":"h2h3","status":"active","winner_id":null,"created_at":"2026-05-05 12:18:43.210216+00","updated_at":"2026-05-05 12:18:51.312+00"},
          {"id":"41d03e19-4b93-4fb9-9695-be6e6fa9fc29","white_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"5K2/5q2/5k2/8/8/8/8/8 w - - 16 74","last_move":"c7f7","status":"active","winner_id":null,"created_at":"2026-04-30 10:48:47.941482+00","updated_at":"2026-04-30 10:59:54.326+00"},
          {"id":"f247ed50-3818-48a8-a948-2d5f0f5c65ad","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1f3","status":"active","winner_id":null,"created_at":"2026-05-05 12:19:48.892642+00","updated_at":"2026-05-05 12:20:02.382+00"},
          {"id":"6025b6ae-7c14-4b6e-b51d-387b14e56e9d","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","fen":"rq3k1r/p1ppppbp/Rp3Bp1/8/2PPP3/5N2/1P2BPPP/1N1Q1RK1 b - - 0 11","last_move":"d3d4","status":"active","winner_id":null,"created_at":"2026-06-11 07:28:36.314746+00","updated_at":"2026-06-11 07:30:10.041+00"},
          {"id":"867f9223-e196-4ddd-8d94-c4dcdc218b8a","white_id":"9b0d8015-885a-4396-8486-ee7417897e3e","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"8/8/8/5B2/8/6K1/8/R5k1 b - - 24 54","last_move":"a8a1","status":"active","winner_id":null,"created_at":"2026-06-12 08:21:22.739601+00","updated_at":"2026-06-12 08:30:28.958+00"}
        ];

        for (const m of initialMatches) {
          if (userUids.includes(m.white_id) || userUids.includes(m.black_id)) {
            await setDoc(doc(db, 'chess_matches', m.id), m, { merge: true });
          }
        }
        [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      }

      const matchMap = new Map<string, any>();

      snap1.forEach(docSnap => matchMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() }));
      snap2.forEach(docSnap => matchMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() }));

      const matches = Array.from(matchMap.values());

      for (const m of matches) {
        if (m.white_id) {
          const wName = await this.getProfileName(m.white_id);
          m.white_profile = { full_name: wName };
        }
        if (m.black_id) {
          const bName = await this.getProfileName(m.black_id);
          m.black_profile = { full_name: bName };
        }
      }

      return matches.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    } catch (e) {
      console.warn('getMatches failed:', e);
      return [];
    }
  },

  async acceptMatch(matchId: string) {
    await updateDoc(doc(db, 'chess_matches', matchId), {
      status: 'active',
      updated_at: new Date().toISOString(),
    });
  },

  async updateMatch(matchId: string, fen: string, lastMove: string, status: string = 'active') {
    await updateDoc(doc(db, 'chess_matches', matchId), {
      fen,
      last_move: lastMove,
      status,
      updated_at: new Date().toISOString(),
    });
  },

  subscribeToMatch(matchId: string, onUpdate: (payload: any) => void) {
    const unsubscribe = onSnapshot(doc(db, 'chess_matches', matchId), (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({ new: { id: snapshot.id, ...snapshot.data() } });
      }
    });

    return {
      unsubscribe: () => unsubscribe()
    };
  }
};
