import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '@/lib/firebase';

const functions = getFunctions(app, 'us-central1');

const ERROR_MESSAGES: Record<string, string> = {
  'functions/unauthenticated': 'Az előfizetéshez előbb jelentkezz be!',
  'functions/already-exists': 'Erre az évfolyamra már van előfizetésed.',
  'functions/not-found': 'Még nincs előfizetésed.',
  'functions/invalid-argument': 'Érvénytelen évfolyam.',
};

function friendlyError(err: unknown): Error {
  const e = err as { code?: string; message?: string };
  const msg = (e?.code && ERROR_MESSAGES[e.code]) || e?.message || 'Ismeretlen hiba történt. Próbáld újra később!';
  return new Error(msg);
}

/** Stripe fizetési oldal indítása egy évfolyam előfizetéséhez; a böngésző átirányul. */
export async function startGradeSubscription(grade: number): Promise<void> {
  try {
    const call = httpsCallable<{ grade: number }, { url: string; trial: boolean }>(functions, 'createSubscriptionCheckout');
    const { data } = await call({ grade });
    window.location.assign(data.url);
  } catch (err) {
    throw friendlyError(err);
  }
}

/** Stripe ügyfélportál (lemondás, kártyacsere, számlák); a böngésző átirányul. */
export async function openSubscriptionPortal(): Promise<void> {
  try {
    const call = httpsCallable<Record<string, never>, { url: string }>(functions, 'createPortalSession');
    const { data } = await call({});
    window.location.assign(data.url);
  } catch (err) {
    throw friendlyError(err);
  }
}
