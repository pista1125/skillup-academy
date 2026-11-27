import { db, auth } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toMillis } from './chessRules';

/**
 * Becsült eltérés a diák gépének órája és a Firestore-szerver órája között.
 * A diákgépek órája perceket is csúszhat – a bajnoki órák ezért szerveridőt használnak.
 *
 * A szinkronhoz egy saját, játszmának nem számító dokumentumot írunk a chess_matches
 * gyűjteménybe (`clock_sync_<uid>`), mert oda minden bejelentkezett felhasználó írhat;
 * white_id/black_id üres, így egyetlen játszmalistában sem jelenik meg.
 */
let offsetMs = 0;
let synced = false;
let lastSyncAt = 0;
let inflight: Promise<void> | null = null;

const RESYNC_MS = 5 * 60 * 1000;

async function doSync(): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const ref = doc(db, 'chess_matches', `clock_sync_${uid}`);
  const t0 = Date.now();
  await setDoc(ref, { kind: 'clock_sync', white_id: null, black_id: null, status: 'sync', sync_at: serverTimestamp() });
  const t1 = Date.now();
  const snap = await getDoc(ref);
  const serverMs = toMillis(snap.data()?.sync_at);
  if (serverMs !== null) {
    offsetMs = serverMs - (t0 + t1) / 2;
    synced = true;
    lastSyncAt = Date.now();
  }
}

export const ServerClock = {
  now(): number {
    return Date.now() + offsetMs;
  },
  isSynced(): boolean {
    return synced;
  },
  /** Szinkronizál, ha még nem tette, vagy régi az utolsó mérés. Hibát nem dob. */
  ensureSynced(): Promise<void> {
    if (synced && Date.now() - lastSyncAt < RESYNC_MS) return Promise.resolve();
    if (!inflight) {
      inflight = doSync()
        .catch((e) => console.warn('Szerveridő-szinkron sikertelen', e))
        .finally(() => {
          inflight = null;
        });
    }
    return inflight;
  },
};
