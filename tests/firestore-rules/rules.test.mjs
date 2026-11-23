// A firestore.rules tesztjei. Futtatás (Java 11+ kell):
//   cd tests/firestore-rules && npm install && npm test
import { readFileSync } from 'node:fs';
import { test, before, after, beforeEach } from 'node:test';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, collection, Timestamp } from 'firebase/firestore';

const ADMIN = { email: 'pista1125@gmail.com', email_verified: true };
const FUTURE = Timestamp.fromDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 200));
const PAST = Timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 60 * 24));

let env;

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-diakzona',
    firestore: {
      rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8'),
      host: '127.0.0.1',
      port: 8085,
    },
  });
});

after(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'profiles/student1'), { id: 'student1', role: 'student', teacher_status: 'none', full_name: 'Diák Egy', user_code: '111111' });
    await setDoc(doc(db, 'profiles/student2'), { id: 'student2', role: 'student', full_name: 'Diák Kettő' });
    await setDoc(doc(db, 'profiles/teacherOk'), { id: 'teacherOk', role: 'teacher', teacher_status: 'approved', teacher_approved_until: FUTURE });
    await setDoc(doc(db, 'profiles/teacherExpired'), { id: 'teacherExpired', role: 'teacher', teacher_status: 'approved', teacher_approved_until: PAST });
    await setDoc(doc(db, 'profiles/teacherLegacy'), { id: 'teacherLegacy', role: 'teacher', teacher_status: 'approved' });
    await setDoc(doc(db, 'profiles/pending1'), { id: 'pending1', role: 'student', teacher_status: 'pending' });
    await setDoc(doc(db, 'teacher_classes/class1'), { teacherId: 'teacherOk', name: '6.a', students: [{ userId: 'student1', name: 'Diák Egy' }] });
    await setDoc(doc(db, 'subscriptions/student1_6'), { uid: 'student1', grade: 6, status: 'active' });
    await setDoc(doc(db, 'teacherGrants/student1'), { studentUid: 'student1', teacherId: 'teacherOk', grade: 6 });
    await setDoc(doc(db, 'stripeCustomers/student1'), { stripeCustomerId: 'cus_1', trialUsed: true });
    await setDoc(doc(db, 'config/app'), { paywallEnabled: false });
    await setDoc(doc(db, 'tutoring_bookings/b1'), { date: '2026-12-01', timeSlot: '14:00 - 14:45', studentEmail: 'x@y.hu' });
    await setDoc(doc(db, 'quiz_progress/student1__q1'), { userId: 'student1', quizId: 'q1', bestScore: 3 });
    await setDoc(doc(db, 'competency_test_submissions/s1'), { userId: 'student1', status: 'in_progress' });
    await setDoc(doc(db, 'snake_leaderboard/e1'), { userId: null, score: 10 });
  });
});

const as = (uid, token = {}) => env.authenticatedContext(uid, token).firestore();
const guest = () => env.unauthenticatedContext().firestore();
const admin = () => as('adminUid', ADMIN);

// ---------- Profilok ----------

test('profil: vendég nem olvashat profilt', async () => {
  await assertFails(getDoc(doc(guest(), 'profiles/student1')));
});

test('profil: belépett felhasználó olvashat profilt (kódkeresés)', async () => {
  await assertSucceeds(getDoc(doc(as('student2'), 'profiles/student1')));
});

test('profil: saját diákprofil létrehozása engedélyezett', async () => {
  await assertSucceeds(setDoc(doc(as('newUser'), 'profiles/newUser'), { id: 'newUser', role: 'student', user_code: '222222' }));
});

test('profil: regisztráció tanári kérelemmel (pending) engedélyezett', async () => {
  await assertSucceeds(setDoc(doc(as('newUser'), 'profiles/newUser'), { id: 'newUser', role: 'student', teacher_status: 'pending' }));
});

test('profil: nem hozhat létre magának tanári szerepkört', async () => {
  await assertFails(setDoc(doc(as('newUser'), 'profiles/newUser'), { id: 'newUser', role: 'teacher' }));
});

test('profil: nem hozhat létre magának jóváhagyott státuszt', async () => {
  await assertFails(setDoc(doc(as('newUser'), 'profiles/newUser'), { id: 'newUser', role: 'student', teacher_status: 'approved' }));
});

test('profil: más nevében nem hozhat létre profilt', async () => {
  await assertFails(setDoc(doc(as('newUser'), 'profiles/other'), { id: 'other', role: 'student' }));
});

test('profil: saját név módosítása engedélyezett', async () => {
  await assertSucceeds(updateDoc(doc(as('student1'), 'profiles/student1'), { full_name: 'Új Név', avatar_url: '🦊' }));
});

test('profil: más profilját nem módosíthatja', async () => {
  await assertFails(updateDoc(doc(as('student2'), 'profiles/student1'), { full_name: 'Feltört' }));
});

test('profil: nem hagyhatja jóvá saját magát', async () => {
  await assertFails(updateDoc(doc(as('student1'), 'profiles/student1'), { teacher_status: 'approved' }));
});

test('profil: nem állíthatja magát tanárra jóváhagyás nélkül', async () => {
  await assertFails(updateDoc(doc(as('student1'), 'profiles/student1'), { role: 'teacher' }));
});

test('profil: nem írhatja át a lejárati dátumot', async () => {
  await assertFails(updateDoc(doc(as('teacherExpired'), 'profiles/teacherExpired'), { teacher_approved_until: FUTURE }));
});

test('profil: tanári kérelem beadása és visszavonása', async () => {
  const db = as('student1');
  await assertSucceeds(updateDoc(doc(db, 'profiles/student1'), { teacher_status: 'pending', school_name: 'Iskola' }));
  await assertSucceeds(updateDoc(doc(db, 'profiles/student1'), { teacher_status: 'none' }));
});

test('profil: elutasított kérelem nem állítható vissza none-ra (csak újra pending)', async () => {
  await env.withSecurityRulesDisabled((ctx) => updateDoc(doc(ctx.firestore(), 'profiles/student1'), { teacher_status: 'rejected' }));
  await assertFails(updateDoc(doc(as('student1'), 'profiles/student1'), { teacher_status: 'none' }));
  await assertSucceeds(updateDoc(doc(as('student1'), 'profiles/student1'), { teacher_status: 'pending' }));
});

test('profil: érvényes tanár beállíthatja a tanári szerepkört', async () => {
  await env.withSecurityRulesDisabled((ctx) => updateDoc(doc(ctx.firestore(), 'profiles/teacherOk'), { role: 'student' }));
  await assertSucceeds(updateDoc(doc(as('teacherOk'), 'profiles/teacherOk'), { role: 'teacher' }));
});

test('profil: érvényes tanár nem kérhet új kérelmet (nem írhatja felül pendingre)', async () => {
  await assertFails(updateDoc(doc(as('teacherOk'), 'profiles/teacherOk'), { teacher_status: 'pending' }));
});

test('profil: lejárt (aug. 31.) tanár újra kérheti a jogosultságot', async () => {
  await assertSucceeds(updateDoc(doc(as('teacherExpired'), 'profiles/teacherExpired'), { teacher_status: 'pending' }));
});

test('profil: lejárt tanár nem állíthatja magát tanárra', async () => {
  await env.withSecurityRulesDisabled((ctx) => updateDoc(doc(ctx.firestore(), 'profiles/teacherExpired'), { role: 'student' }));
  await assertFails(updateDoc(doc(as('teacherExpired'), 'profiles/teacherExpired'), { role: 'teacher' }));
});

test('profil: user_code egyszer beállítható, utána nem változtatható', async () => {
  await assertSucceeds(updateDoc(doc(as('student2'), 'profiles/student2'), { user_code: '333333' }));
  await assertFails(updateDoc(doc(as('student1'), 'profiles/student1'), { user_code: '999999' }));
});

test('profil: admin jóváhagyhat tanárt', async () => {
  await assertSucceeds(updateDoc(doc(admin(), 'profiles/pending1'), { role: 'teacher', teacher_status: 'approved', teacher_approved_until: FUTURE }));
});

test('profil: nem megerősített admin e-mail nem admin', async () => {
  const fake = as('fakeAdmin', { email: 'pista1125@gmail.com', email_verified: false });
  await assertFails(updateDoc(doc(fake, 'profiles/pending1'), { teacher_status: 'approved' }));
});

// ---------- Tanári osztályok ----------

test('osztály: érvényes tanár létrehozhat osztályt', async () => {
  await assertSucceeds(addDoc(collection(as('teacherOk'), 'teacher_classes'), { teacherId: 'teacherOk', name: '7.b', students: [] }));
});

test('osztály: legacy (dátum nélküli) jóváhagyott tanár létrehozhat osztályt', async () => {
  await assertSucceeds(addDoc(collection(as('teacherLegacy'), 'teacher_classes'), { teacherId: 'teacherLegacy', name: '5.a', students: [] }));
});

test('osztály: diák és lejárt tanár nem hozhat létre osztályt', async () => {
  await assertFails(addDoc(collection(as('student1'), 'teacher_classes'), { teacherId: 'student1', name: 'x', students: [] }));
  await assertFails(addDoc(collection(as('teacherExpired'), 'teacher_classes'), { teacherId: 'teacherExpired', name: 'x', students: [] }));
});

test('osztály: más nevében nem hozható létre osztály', async () => {
  await assertFails(addDoc(collection(as('teacherOk'), 'teacher_classes'), { teacherId: 'teacherLegacy', name: 'x', students: [] }));
});

test('osztály: tulajdonos módosíthatja, de a teacherId nem változhat', async () => {
  const db = as('teacherOk');
  await assertSucceeds(updateDoc(doc(db, 'teacher_classes/class1'), { name: '6.b' }));
  await assertFails(updateDoc(doc(db, 'teacher_classes/class1'), { teacherId: 'teacherLegacy' }));
});

test('osztály: diák nem írhat a tanár osztályába', async () => {
  await assertFails(updateDoc(doc(as('student1'), 'teacher_classes/class1'), { students: [{ userId: 'student1', name: 'Hack' }] }));
  await assertFails(deleteDoc(doc(as('student1'), 'teacher_classes/class1')));
});

// ---------- Előfizetés, licenc, beállítások ----------

test('előfizetés: saját olvasható, másé nem', async () => {
  await assertSucceeds(getDoc(doc(as('student1'), 'subscriptions/student1_6')));
  await assertFails(getDoc(doc(as('student2'), 'subscriptions/student1_6')));
});

test('előfizetés: kliens nem írhatja (saját magának sem)', async () => {
  await assertFails(setDoc(doc(as('student2'), 'subscriptions/student2_6'), { uid: 'student2', grade: 6, status: 'active' }));
  await assertFails(updateDoc(doc(as('student1'), 'subscriptions/student1_6'), { status: 'active' }));
  await assertFails(setDoc(doc(admin(), 'subscriptions/x_1'), { uid: 'x', grade: 1, status: 'active' }));
});

test('stripeCustomers: saját olvasható, írni senki nem tud', async () => {
  await assertSucceeds(getDoc(doc(as('student1'), 'stripeCustomers/student1')));
  await assertFails(getDoc(doc(as('student2'), 'stripeCustomers/student1')));
  await assertFails(updateDoc(doc(as('student1'), 'stripeCustomers/student1'), { trialUsed: false }));
});

test('tanári licenc: a diák és a kiadó tanár olvassa, más nem; írni senki', async () => {
  await assertSucceeds(getDoc(doc(as('student1'), 'teacherGrants/student1')));
  await assertSucceeds(getDoc(doc(as('teacherOk'), 'teacherGrants/student1')));
  await assertFails(getDoc(doc(as('student2'), 'teacherGrants/student1')));
  await assertFails(setDoc(doc(as('teacherOk'), 'teacherGrants/student2'), { studentUid: 'student2', teacherId: 'teacherOk', grade: 5 }));
  await assertFails(setDoc(doc(as('student2'), 'teacherGrants/student2'), { studentUid: 'student2', teacherId: 'teacherOk', grade: 5 }));
});

test('config: vendég olvashatja, csak admin írja', async () => {
  await assertSucceeds(getDoc(doc(guest(), 'config/app')));
  await assertFails(setDoc(doc(as('student1'), 'config/app'), { paywallEnabled: false }));
  await assertSucceeds(setDoc(doc(admin(), 'config/app'), { paywallEnabled: true }));
});

// ---------- Korrepetálás, mail ----------

test('foglalások: csak admin olvashatja, kliens nem írhatja', async () => {
  await assertFails(getDoc(doc(guest(), 'tutoring_bookings/b1')));
  await assertFails(getDoc(doc(as('student1'), 'tutoring_bookings/b1')));
  await assertSucceeds(getDoc(doc(admin(), 'tutoring_bookings/b1')));
  await assertFails(addDoc(collection(as('student1'), 'tutoring_bookings'), { date: '2026-12-01', timeSlot: '15:00 - 15:45' }));
});

test('mail: kliens nem küldhet levelet', async () => {
  await assertFails(addDoc(collection(guest(), 'mail'), { to: 'a@b.hu', message: {} }));
  await assertFails(addDoc(collection(as('student1'), 'mail'), { to: 'a@b.hu', message: {} }));
});

// ---------- Haladás, kompetencia ----------

test('quiz_progress: saját haladás írható, másé nem', async () => {
  await assertSucceeds(setDoc(doc(as('student1'), 'quiz_progress/student1__q2'), { userId: 'student1', quizId: 'q2' }));
  await assertSucceeds(setDoc(doc(as('student1'), 'quiz_progress/student1__q1'), { userId: 'student1', quizId: 'q1', bestScore: 5 }, { merge: true }));
  await assertFails(setDoc(doc(as('student2'), 'quiz_progress/student1__q3'), { userId: 'student1', quizId: 'q3' }));
  await assertFails(setDoc(doc(as('student2'), 'quiz_progress/student2__q4'), { userId: 'student1', quizId: 'q4' }));
  await assertFails(updateDoc(doc(as('student2'), 'quiz_progress/student1__q1'), { bestScore: 0 }));
  await assertFails(getDoc(doc(guest(), 'quiz_progress/student1__q1')));
});

test('kompetencia: saját beküldés, tanár törölhet', async () => {
  await assertSucceeds(addDoc(collection(as('student2'), 'competency_test_submissions'), { userId: 'student2', status: 'in_progress' }));
  await assertFails(addDoc(collection(as('student2'), 'competency_test_submissions'), { userId: 'student1', status: 'completed' }));
  await assertSucceeds(updateDoc(doc(as('student1'), 'competency_test_submissions/s1'), { status: 'completed' }));
  await assertFails(updateDoc(doc(as('student2'), 'competency_test_submissions/s1'), { status: 'completed' }));
  await assertSucceeds(deleteDoc(doc(as('teacherOk'), 'competency_test_submissions/s1')));
});

// ---------- Ranglisták ----------

test('ranglista: vendég beküldhet userId nélkül, de más nevében nem', async () => {
  await assertSucceeds(addDoc(collection(guest(), 'snake_leaderboard'), { userId: null, studentName: 'Vendég', score: 5 }));
  await assertSucceeds(addDoc(collection(guest(), 'matcher_leaderboard'), { studentName: 'Vendég', time: 30 }));
  await assertFails(addDoc(collection(guest(), 'sorter_leaderboard'), { userId: 'student1', studentName: 'Hamis', time: 1 }));
  await assertSucceeds(addDoc(collection(as('student1'), 'sorter_leaderboard'), { userId: 'student1', studentName: 'Diák Egy', time: 20 }));
  await assertSucceeds(getDoc(doc(guest(), 'snake_leaderboard/e1')));
  await assertFails(updateDoc(doc(as('student1'), 'snake_leaderboard/e1'), { score: 9999 }));
});

// ---------- Játékok, eszközök, alapértelmezett tiltás ----------

test('játékok/eszközök: belépve igen, vendégként nem', async () => {
  await assertSucceeds(addDoc(collection(as('student1'), 'chess_matches'), { p1: 'student1' }));
  await assertFails(addDoc(collection(guest(), 'chess_matches'), { p1: 'x' }));
  await assertSucceeds(addDoc(collection(as('student1'), 'feedback_survey_responses'), { a: 1 }));
  await assertFails(getDoc(doc(guest(), 'feedback_sessions/x')));
});

test('ismeretlen gyűjtemény: alapból tiltott', async () => {
  await assertFails(setDoc(doc(as('student1'), 'valami_uj/x'), { a: 1 }));
  await assertFails(getDoc(doc(as('student1'), 'valami_uj/x')));
});
