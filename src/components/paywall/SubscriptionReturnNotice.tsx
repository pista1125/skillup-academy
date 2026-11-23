import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, X, Info } from 'lucide-react';
import { useEntitlements } from '@/contexts/EntitlementsContext';

/**
 * A Stripe-ról visszatérve (?subscribed=success|cancelled) tájékoztat a fizetés eredményéről.
 * Sikeres fizetés után megvárja, amíg a webhook beírja az előfizetést (általában pár másodperc).
 */
export function SubscriptionReturnNotice({ grade }: { grade: number | null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { grades, subscriptions } = useEntitlements();
  const status = new URLSearchParams(location.search).get('subscribed');
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (status !== 'success') return;
    setSlow(false);
    const t = window.setTimeout(() => setSlow(true), 20_000);
    return () => window.clearTimeout(t);
  }, [status]);

  if (status !== 'success' && status !== 'cancelled') return null;

  const dismiss = () => {
    const params = new URLSearchParams(location.search);
    params.delete('subscribed');
    params.delete('session_id');
    const qs = params.toString();
    navigate({ pathname: location.pathname, search: qs ? `?${qs}` : '' }, { replace: true });
  };

  const active = grade !== null && grades.has(grade);
  const sub = subscriptions.find((s) => s.grade === grade);
  const trialEnd = sub?.status === 'trialing' && sub.trialEndMs ? new Date(sub.trialEndMs).toLocaleDateString('hu-HU') : null;

  let tone = 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-100';
  let icon = <Info className="w-5 h-5 shrink-0" />;
  let text: React.ReactNode = 'A fizetés megszakadt, nem terheltünk semmit. Bármikor újrakezdheted.';

  if (status === 'success' && active) {
    tone = 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-100';
    icon = <CheckCircle2 className="w-5 h-5 shrink-0" />;
    text = (
      <>
        <b>Köszönjük!</b> A {grade}. osztály teljes anyaga elérhető számodra
        {trialEnd ? `, a próbaidő ${trialEnd}-ig tart.` : '.'} Az előfizetést a profilodban kezelheted.
      </>
    );
  } else if (status === 'success') {
    icon = <Loader2 className="w-5 h-5 shrink-0 animate-spin" />;
    text = slow
      ? 'A fizetés sikeres volt, de az aktiválás a vártnál tovább tart. Frissítsd az oldalt pár perc múlva; ha továbbra sem nyílik meg, írj a kapcsolat@diakzona.hu címre.'
      : 'Sikeres fizetés – az előfizetésed aktiválása folyamatban, ez csak néhány másodperc…';
  }

  return (
    <div className={`mb-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${tone}`} role="status">
      {icon}
      <div className="flex-1">{text}</div>
      <button type="button" onClick={dismiss} aria-label="Bezárás" className="opacity-60 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
