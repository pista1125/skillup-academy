import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '@/lib/firebase';

const functions = getFunctions(app, 'us-central1');

function friendly(err: unknown): Error {
  const e = err as { code?: string; message?: string };
  if (e?.code === 'functions/internal' || !e?.message) return new Error('Hiba történt. Próbáld újra később!');
  return new Error(e.message);
}

async function call<TReq, TRes>(name: string, data: TReq): Promise<TRes> {
  try {
    const { data: res } = await httpsCallable<TReq, TRes>(functions, name)(data);
    return res;
  } catch (err) {
    throw friendly(err);
  }
}

/** Évfolyam megnyitása (vagy átállítása) egy diáknak a tanári licencből. */
export const grantStudentAccess = (studentUid: string, grade: number) =>
  call<{ studentUid: string; grade: number }, { ok: boolean; kind: 'created' | 'updated'; usedSeats?: number }>(
    'grantStudentAccess', { studentUid, grade });

/** A licenc visszavonása (a hely felszabadul). */
export const revokeStudentAccess = (studentUid: string) =>
  call<{ studentUid: string }, { ok: boolean }>('revokeStudentAccess', { studentUid });

/** Új tanévben: a meglévő licencek megújítása az új jóváhagyás lejáratáig. */
export const renewTeacherGrants = () =>
  call<Record<string, never>, { ok: boolean; renewed: number; removed: number; skipped: number }>('renewTeacherGrants', {});
