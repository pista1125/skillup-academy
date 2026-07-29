import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I",
    authDomain: "diakzona.firebaseapp.com",
    projectId: "diakzona",
    storageBucket: "diakzona.firebasestorage.app",
    messagingSenderId: "333898018800",
    appId: "1:333898018800:web:59fbecb1b5fa825ff9b735"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'databasediakzona');
const auth = getAuth(app);

const friends = [
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

const matches = [
  {"id":"6300b5bf-464c-498f-82f0-dfa82dd17076","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"131c3d32-32c0-41db-a250-01347a640d62","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 17:33:13.406934+00","updated_at":"2026-03-13 17:33:13.406934+00"},
  {"id":"4b44d8cc-e5a2-444d-8bad-d45221fd8947","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 17:34:19.701846+00","updated_at":"2026-03-13 17:34:19.701846+00"},
  {"id":"9be2ceb1-4275-4b63-893e-7a5629cb0f48","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"131c3d32-32c0-41db-a250-01347a640d62","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 17:39:21.078498+00","updated_at":"2026-03-13 17:39:21.078498+00"},
  {"id":"7d5ac5e8-186f-450e-b9ea-604a06b786ba","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 17:48:48.473159+00","updated_at":"2026-03-13 17:48:48.473159+00"},
  {"id":"7983a819-ce9e-4bd3-adc4-80a52044c9a2","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-13 18:00:03.203705+00","updated_at":"2026-03-13 18:00:03.203705+00"},
  {"id":"2f85eb2c-5664-46df-8fb6-5d08aebe54b3","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"131c3d32-32c0-41db-a250-01347a640d62","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"active","winner_id":null,"created_at":"2026-03-13 18:00:49.60651+00","updated_at":"2026-03-13 18:00:49.60651+00"},
  {"id":"ba1e3f1e-2ec9-449d-a80c-45607cfd74e6","white_id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","black_id":"b0304811-ee64-4331-abe8-852e6b676699","fen":"rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1h3","status":"active","winner_id":null,"created_at":"2026-03-23 07:20:53.092661+00","updated_at":"2026-03-23 07:21:01.476+00"},
  {"id":"577c3d3c-4bd8-4fcb-8f31-5fd000ce80b1","white_id":"fe0e3aa9-8a65-457e-b9db-81dfff37bbae","black_id":"894f95e9-7e05-4c8e-8ed4-a7c83202d522","fen":"rnbqkbnr/pppp1ppp/8/4p3/8/1P6/P1PPPPPP/RNBQKBNR w KQkq - 0 2","last_move":"e7e5","status":"active","winner_id":null,"created_at":"2026-04-13 12:14:57.977726+00","updated_at":"2026-04-13 12:16:45.336+00"},
  {"id":"b5e633ac-bd72-4ebb-b0eb-f3c89d597a49","white_id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","black_id":"e758b2d1-b80e-4fbe-88f9-5521e0be0941","fen":"rn2kb1r/p1q4p/4p3/1p1p4/6P1/5P2/PPPP4/RNBQK3 w Qkq - 0 17","last_move":"c6d5","status":"active","winner_id":null,"created_at":"2026-03-23 07:13:20.007588+00","updated_at":"2026-03-23 07:17:14.158+00"},
  {"id":"55d07412-0377-4bf6-a721-bf37461482db","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1h3","status":"active","winner_id":null,"created_at":"2026-05-05 12:21:26.205554+00","updated_at":"2026-05-05 12:21:42.807+00"},
  {"id":"861c6047-2e71-4c6e-b88b-7267c0b72d00","white_id":"7e385ff5-a2ea-4f8d-a98e-04b95520344a","black_id":"5e1a6113-6936-4bd6-ab6f-75c43659ef5a","fen":"rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1","last_move":"f2f4","status":"active","winner_id":null,"created_at":"2026-03-25 10:44:45.239602+00","updated_at":"2026-05-06 10:09:50.484+00"},
  {"id":"48e942fa-16c4-40f6-aec2-f282f80e82b0","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"e9d6522d-4691-4a16-b201-187ac4c7285b","fen":"r2q1b1r/ppn1pk1p/5np1/1Bpp2p1/6bP/1PN1P1P1/P1PP1P2/R1B1K2R w KQ - 5 13","last_move":"a6c7","status":"active","winner_id":null,"created_at":"2026-04-29 13:24:00.651418+00","updated_at":"2026-04-29 13:27:47.974+00"},
  {"id":"cf0c3ed2-23d7-4f4e-a9a8-560373aec6d4","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"r4rk1/2p2ppR/8/p2p1B2/1p6/1P1PPn2/P1P5/RNBKq3 w - - 1 26","last_move":"f2e1","status":"active","winner_id":null,"created_at":"2026-04-30 10:42:34.296424+00","updated_at":"2026-04-30 10:47:20.138+00"},
  {"id":"5da0923c-7270-4b2f-8449-10c8de556b84","white_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1f3","status":"active","winner_id":null,"created_at":"2026-04-30 10:48:11.639542+00","updated_at":"2026-04-30 10:48:16.978+00"},
  {"id":"c76e8991-8de5-4222-9104-a812909587b9","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","fen":"r1b1kb1r/pppp1p1p/8/6p1/1PB1p1P1/4P3/P1PP1PPB/RN2K2R b KQkq - 0 11","last_move":"e5h2","status":"active","winner_id":null,"created_at":"2026-03-24 09:19:58.147209+00","updated_at":"2026-03-24 09:22:44.469+00"},
  {"id":"9a814d9f-4805-4ef7-852c-655f9716263b","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"7f653f3d-5a0e-467d-ad5a-3f6866f62d45","fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","last_move":"e2e4","status":"active","winner_id":null,"created_at":"2026-03-13 18:45:34.681058+00","updated_at":"2026-03-13 18:57:20.846+00"},
  {"id":"4ce391f5-3110-4e3f-9871-8a16b65a279b","white_id":"b0304811-ee64-4331-abe8-852e6b676699","black_id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","fen":"rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1","last_move":"h2h3","status":"active","winner_id":null,"created_at":"2026-03-23 07:20:49.495711+00","updated_at":"2026-03-23 07:22:03.977+00"},
  {"id":"8d6558cc-dd5a-47ce-9c84-5767d56d4dfe","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","fen":"rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1","last_move":"f2f3","status":"active","winner_id":null,"created_at":"2026-03-24 14:32:28.657035+00","updated_at":"2026-03-24 14:32:37.023+00"},
  {"id":"0f22f081-c972-41e1-97ef-321ecb84f624","white_id":"0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-06-05 13:37:51.383151+00","updated_at":"2026-06-05 13:37:51.383151+00"},
  {"id":"fc21f1a8-c381-4ba3-bf29-6fffba3ce7da","white_id":"131c3d32-32c0-41db-a250-01347a640d62","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","last_move":"e2e4","status":"active","winner_id":null,"created_at":"2026-03-13 18:32:34.556103+00","updated_at":"2026-03-13 18:39:34.233+00"},
  {"id":"b7d2dc5e-1125-4b19-b557-11549def79e2","white_id":"7e385ff5-a2ea-4f8d-a98e-04b95520344a","black_id":"5e1a6113-6936-4bd6-ab6f-75c43659ef5a","fen":"3k4/7p/3K1P1P/7B/8/1b6/3b4/7r b - - 2 48","last_move":"f7h5","status":"active","winner_id":null,"created_at":"2026-03-23 07:13:15.763919+00","updated_at":"2026-03-23 07:26:04.178+00"},
  {"id":"329e1fd3-0645-47c6-9e89-4a6b64418745","white_id":"0dae30a5-056d-40fa-9234-709c9ceef5b9","black_id":"e758b2d1-b80e-4fbe-88f9-5521e0be0941","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","last_move":null,"status":"waiting","winner_id":null,"created_at":"2026-03-23 07:20:06.884486+00","updated_at":"2026-03-23 07:20:06.884486+00"},
  {"id":"c2c55fb1-93d4-4630-8cb6-1e4ab9564201","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","fen":"r1bqkb1r/p1pppBpp/1p6/6N1/1n2P1n1/8/PPPP1PPP/RNBQ1RK1 b kq - 0 6","last_move":"c4f7","status":"active","winner_id":null,"created_at":"2026-06-11 07:27:08.940461+00","updated_at":"2026-06-11 07:28:05.781+00"},
  {"id":"7f505366-2591-4fc0-b036-9c914e35783b","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"r5k1/ppp2ppp/8/8/5Qb1/2n4q/PP1P1PKP/RNB1r2R w - - 6 16","last_move":"d3h3","status":"active","winner_id":null,"created_at":"2026-04-30 10:38:31.221414+00","updated_at":"2026-04-30 10:41:36.504+00"},
  {"id":"a57b48d5-bc59-4eec-9ee5-a25c9f0d20c4","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1f3","status":"active","winner_id":null,"created_at":"2026-04-30 10:42:00.561411+00","updated_at":"2026-04-30 10:42:07.317+00"},
  {"id":"c1a0f559-9106-4777-a552-c73da0ddbd51","white_id":"0a6436b9-b4ea-4c0c-bd79-3bb58ef376fd","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"8/p1n4p/1pk5/3N4/1nP3p1/8/PP2K1PP/R1B3NR w - - 0 34","last_move":"b5c7","status":"active","winner_id":null,"created_at":"2026-04-30 11:05:51.538985+00","updated_at":"2026-04-30 11:14:40.435+00"},
  {"id":"68b1a9f0-85e0-465f-9b45-015d06f0471d","white_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","black_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","fen":"2rr4/1kp1R3/3p1p2/1p1P4/p4P1p/R7/PPP2P1P/2K1B3 w - - 0 32","last_move":"h5h4","status":"active","winner_id":null,"created_at":"2026-03-24 14:33:04.788247+00","updated_at":"2026-03-24 14:40:39.354+00"},
  {"id":"ba04c84e-92b9-472a-b033-5d65b029bd5d","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1","last_move":"h2h3","status":"active","winner_id":null,"created_at":"2026-05-05 12:18:43.210216+00","updated_at":"2026-05-05 12:18:51.312+00"},
  {"id":"f288cbaa-bdfa-4c90-adee-31adbe0d5725","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","fen":"rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1","last_move":"h2h3","status":"active","winner_id":null,"created_at":"2026-05-05 12:19:24.417721+00","updated_at":"2026-05-05 12:19:33.15+00"},
  {"id":"41d03e19-4b93-4fb9-9695-be6e6fa9fc29","white_id":"353a8347-f0f4-4b5b-b22c-38e5ad2f8bec","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"5K2/5q2/5k2/8/8/8/8/8 w - - 16 74","last_move":"c7f7","status":"active","winner_id":null,"created_at":"2026-04-30 10:48:47.941482+00","updated_at":"2026-04-30 10:59:54.326+00"},
  {"id":"f247ed50-3818-48a8-a948-2d5f0f5c65ad","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1f3","status":"active","winner_id":null,"created_at":"2026-05-05 12:19:48.892642+00","updated_at":"2026-05-05 12:20:02.382+00"},
  {"id":"d2fcd6c7-cc1d-44f3-8f9b-afcbd9c95da5","white_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","black_id":"e9d6522d-4691-4a16-b201-187ac4c7285b","fen":"rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1","last_move":"g1h3","status":"active","winner_id":null,"created_at":"2026-05-05 12:20:15.01439+00","updated_at":"2026-05-05 12:20:26.04+00"},
  {"id":"6025b6ae-7c14-4b6e-b51d-387b14e56e9d","white_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","black_id":"e8ea4ea9-464a-4585-9410-db13bc2f6ed9","fen":"rq3k1r/p1ppppbp/Rp3Bp1/8/2PPP3/5N2/1P2BPPP/1N1Q1RK1 b - - 0 11","last_move":"d3d4","status":"active","winner_id":null,"created_at":"2026-06-11 07:28:36.314746+00","updated_at":"2026-06-11 07:30:10.041+00"},
  {"id":"867f9223-e196-4ddd-8d94-c4dcdc218b8a","white_id":"9b0d8015-885a-4396-8486-ee7417897e3e","black_id":"fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0","fen":"8/8/8/5B2/8/6K1/8/R5k1 b - - 24 54","last_move":"a8a1","status":"active","winner_id":null,"created_at":"2026-06-12 08:21:22.739601+00","updated_at":"2026-06-12 08:30:28.958+00"}
];

async function seed() {
  console.log('Signing in as pista1125@gmail.com...');
  await signInWithEmailAndPassword(auth, 'pista1125@gmail.com', 'DiakZona2026!');
  console.log(`Seeding ${friends.length} friends and ${matches.length} chess matches into Firestore databasediakzona...`);

  for (const f of friends) {
    await setDoc(doc(db, 'friends', f.id), f, { merge: true });
  }

  for (const m of matches) {
    await setDoc(doc(db, 'chess_matches', m.id), m, { merge: true });
  }

  console.log('🎉 Successfully seeded all friends and chess matches into Firestore!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
