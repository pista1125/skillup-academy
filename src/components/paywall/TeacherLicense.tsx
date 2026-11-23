import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { KeyRound, Loader2, RefreshCw, Unlock, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { toDateOrNull } from '@/lib/teacherApproval';
import { TeacherGrantRecord, teacherGrantActive } from '@/lib/access';
import { grantStudentAccess, renewTeacherGrants, revokeStudentAccess } from '@/services/teacherLicenseService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const MAX_TEACHER_SEATS = 100;

interface TeacherGrantsState {
  loading: boolean;
  /** Diák uid → a tanár által kiadott licenc. */
  byStudent: Map<string, TeacherGrantRecord>;
  usedSeats: number;
  expiredCount: number;
}

const Ctx = createContext<TeacherGrantsState>({ loading: true, byStudent: new Map(), usedSeats: 0, expiredCount: 0 });

/** A bejelentkezett tanár által kiadott licencek valós időben (teacherGrants, teacherId == uid). */
export function TeacherGrantsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [grants, setGrants] = useState<Map<string, TeacherGrantRecord> | null>(null);

  useEffect(() => {
    if (!user) return;
    return onSnapshot(
      query(collection(db, 'teacherGrants'), where('teacherId', '==', user.uid)),
      (snap) => {
        const m = new Map<string, TeacherGrantRecord>();
        snap.forEach((d) => {
          const data = d.data();
          m.set(d.id, {
            grade: Number(data.grade),
            teacherId: String(data.teacherId),
            teacherName: data.teacherName,
            active: data.active !== false,
            validUntilMs: toDateOrNull(data.validUntil)?.getTime() ?? null,
          });
        });
        setGrants(m);
      },
      (err) => {
        console.warn('Tanári licencek olvasási hiba:', err);
        setGrants(new Map());
      }
    );
  }, [user]);

  const value = useMemo<TeacherGrantsState>(() => {
    const m = grants ?? new Map();
    let used = 0;
    let expired = 0;
    m.forEach((g) => (teacherGrantActive(g) ? used++ : expired++));
    return { loading: grants === null, byStudent: m, usedSeats: used, expiredCount: expired };
  }, [grants]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTeacherGrants = () => useContext(Ctx);

/** „Tanári licenc: 37 / 100” sáv, lejárt licencek megújítása. */
export function TeacherLicenseBar() {
  const { loading, usedSeats, expiredCount } = useTeacherGrants();
  const [renewing, setRenewing] = useState(false);
  const pct = Math.min(100, Math.round((usedSeats / MAX_TEACHER_SEATS) * 100));

  const handleRenew = async () => {
    setRenewing(true);
    try {
      const r = await renewTeacherGrants();
      toast.success(`${r.renewed} licenc megújítva${r.removed ? `, ${r.removed} törölve (már nincs az osztályaidban)` : ''}.`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setRenewing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/30 p-4 space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <KeyRound className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
        <div className="flex-1 min-w-[12rem]">
          <p className="text-sm font-black text-emerald-900 dark:text-emerald-100">
            Tanári licenc: {loading ? '…' : usedSeats} / {MAX_TEACHER_SEATS} diák
          </p>
          <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
            Minden diákodnak egy évfolyam teljes anyagát nyithatod meg ingyen. A licencek a tanári jogosultságoddal együtt aug. 31-én lejárnak.
          </p>
        </div>
        {expiredCount > 0 && (
          <button
            type="button"
            onClick={handleRenew}
            disabled={renewing}
            className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
          >
            {renewing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            {expiredCount} lejárt licenc megújítása
          </button>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 overflow-hidden">
        <div className={cn('h-full rounded-full', pct >= 90 ? 'bg-amber-500' : 'bg-emerald-500')} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Az osztály nevéből kitalált évfolyam (pl. „6.a” → 6, „11. B” → 11). */
// eslint-disable-next-line react-refresh/only-export-components
export function gradeFromClassName(name: string | undefined): number | null {
  const m = /(^|\D)(1[0-2]|[1-9])\s*\./.exec(name || '') || /(^|\D)(1[0-2]|[1-9])(\D|$)/.exec(name || '');
  return m ? Number(m[2]) : null;
}

/** Diák kártyáján: évfolyam megnyitása / átállítása / visszavonása. */
export function StudentGrantControl({ studentUid, defaultGrade }: { studentUid: string; defaultGrade: number | null }) {
  const { byStudent, usedSeats } = useTeacherGrants();
  const grant = byStudent.get(studentUid);
  const live = teacherGrantActive(grant);
  const [grade, setGrade] = useState<number>(grant?.grade ?? defaultGrade ?? 1);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (grant?.grade) setGrade(grant.grade);
  }, [grant?.grade]);

  const full = !live && usedSeats >= MAX_TEACHER_SEATS;

  const handleGrant = async () => {
    setBusy(true);
    try {
      await grantStudentAccess(studentUid, grade);
      toast.success(live ? `Átállítva: ${grade}. osztály.` : `Megnyitva: ${grade}. osztály.`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleRevoke = async () => {
    setBusy(true);
    try {
      await revokeStudentAccess(studentUid);
      toast.success('Licenc visszavonva, a hely felszabadult.');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      <select
        value={grade}
        onChange={(e) => setGrade(Number(e.target.value))}
        disabled={busy}
        aria-label="Megnyitandó évfolyam"
        className="h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold px-1.5"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
          <option key={g} value={g}>{g}. osztály</option>
        ))}
      </select>
      {live && grant?.grade === grade ? (
        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-400">
          <Unlock className="w-3.5 h-3.5" /> Megnyitva
        </span>
      ) : (
        <button
          type="button"
          onClick={handleGrant}
          disabled={busy || full}
          title={full ? `Elérted a ${MAX_TEACHER_SEATS} diákos korlátot` : undefined}
          className="inline-flex items-center gap-1 h-7 text-[11px] font-black px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
        >
          {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Unlock className="w-3 h-3" />}
          {live ? 'Átállítás' : 'Megnyitás'}
        </button>
      )}
      {live && (
        <button
          type="button"
          onClick={handleRevoke}
          disabled={busy}
          title="Licenc visszavonása"
          className="inline-flex items-center h-7 px-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      {grant && !live && <span className="text-[11px] font-bold text-amber-600">Lejárt</span>}
    </div>
  );
}
