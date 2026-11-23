import React, { useEffect, useMemo, useState } from 'react';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { AlertTriangle, CreditCard, KeyRound, Loader2, Lock, LockOpen, Sparkles } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useEntitlements } from '@/contexts/EntitlementsContext';
import { toDateOrNull } from '@/lib/teacherApproval';
import { subscriptionGrantsAccess, teacherGrantActive } from '@/lib/access';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface SubRow { grade: number; status: string; currentPeriodEndMs: number | null }

/** Admin: fizetőfal kapcsoló és áttekintés (előfizetők, próbaidő, tanári licencek, hibás számlák). */
export function AdminPaywallPanel() {
  const { paywallEnabled } = useEntitlements();
  const [saving, setSaving] = useState(false);
  const [subs, setSubs] = useState<SubRow[] | null>(null);
  const [grants, setGrants] = useState<{ active: boolean; validUntilMs: number | null; grade: number }[] | null>(null);
  const [failedInvoices, setFailedInvoices] = useState<{ id: string; error: string; grade: number }[]>([]);

  useEffect(() => {
    const u1 = onSnapshot(collection(db, 'subscriptions'), (snap) => {
      setSubs(snap.docs.map((d) => ({
        grade: Number(d.get('grade')),
        status: String(d.get('status') || ''),
        currentPeriodEndMs: toDateOrNull(d.get('currentPeriodEnd'))?.getTime() ?? null,
      })));
    }, () => setSubs([]));
    const u2 = onSnapshot(collection(db, 'teacherGrants'), (snap) => {
      setGrants(snap.docs.map((d) => ({
        active: d.get('active') !== false,
        validUntilMs: toDateOrNull(d.get('validUntil'))?.getTime() ?? null,
        grade: Number(d.get('grade')),
      })));
    }, () => setGrants([]));
    const u3 = onSnapshot(query(collection(db, 'stripeInvoices'), where('status', '==', 'failed')), (snap) => {
      setFailedInvoices(snap.docs.map((d) => ({ id: d.id, error: String(d.get('error') || ''), grade: Number(d.get('grade')) })));
    }, () => setFailedInvoices([]));
    return () => { u1(); u2(); u3(); };
  }, []);

  const stats = useMemo(() => {
    const live = (subs || []).filter((s) => subscriptionGrantsAccess(s));
    const perGrade = new Map<number, number>();
    live.forEach((s) => perGrade.set(s.grade, (perGrade.get(s.grade) || 0) + 1));
    return {
      active: live.filter((s) => s.status === 'active').length,
      trialing: live.filter((s) => s.status === 'trialing').length,
      pastDue: live.filter((s) => s.status === 'past_due').length,
      grants: (grants || []).filter((g) => teacherGrantActive({ ...g, teacherId: '' })).length,
      perGrade: [...perGrade.entries()].sort((a, b) => a[0] - b[0]),
    };
  }, [subs, grants]);

  const toggle = async (next: boolean) => {
    if (next && !window.confirm('Bekapcsolod a fizetőfalat? Ezután a II. témakörtől az anyagok csak előfizetéssel érhetők el.')) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'config', 'app'), { paywallEnabled: next, updatedAt: new Date().toISOString() }, { merge: true });
      toast.success(next ? 'Fizetőfal bekapcsolva.' : 'Fizetőfal kikapcsolva – minden anyag nyitott.');
    } catch (err) {
      toast.error((err as Error).message || 'Nem sikerült menteni.');
    } finally {
      setSaving(false);
    }
  };

  const loading = subs === null || grants === null;

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${paywallEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
          {paywallEnabled ? <Lock className="w-5 h-5" /> : <LockOpen className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-[12rem]">
          <h4 className="font-black text-lg text-slate-800 dark:text-slate-100">Fizetőfal</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {paywallEnabled
              ? 'BEKAPCSOLVA – az I. témakör belépve ingyenes, a többi előfizetéssel / tanári licenccel érhető el.'
              : 'KIKAPCSOLVA – minden tananyag nyitott, bejelentkezés nélkül is (mint eddig).'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saving && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
          <Switch checked={paywallEnabled} onCheckedChange={toggle} disabled={saving} aria-label="Fizetőfal be/ki" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-6 text-slate-400"><Loader2 className="w-5 h-5 animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Fizető előfizető', value: stats.active, icon: <CreditCard className="w-4 h-4" /> },
              { label: 'Próbaidőben', value: stats.trialing, icon: <Sparkles className="w-4 h-4" /> },
              { label: 'Fizetési hiba', value: stats.pastDue, icon: <AlertTriangle className="w-4 h-4" /> },
              { label: 'Tanári licenc', value: stats.grants, icon: <KeyRound className="w-4 h-4" /> },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">{s.icon}{s.label}</div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{s.value}</div>
              </div>
            ))}
          </div>
          {stats.perGrade.length > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Évfolyamonként (előfizetés): {stats.perGrade.map(([g, n]) => `${g}. o.: ${n}`).join(' · ')}
            </p>
          )}
          {failedInvoices.length > 0 && (
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 p-3 text-xs text-rose-800 dark:text-rose-200">
              <p className="font-black mb-1">Sikertelen számlázz.hu számlák ({failedInvoices.length}) – kézzel kell kiállítani:</p>
              <ul className="space-y-0.5 font-mono">
                {failedInvoices.slice(0, 10).map((f) => <li key={f.id}>{f.id} · {f.grade}. o. · {f.error}</li>)}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
