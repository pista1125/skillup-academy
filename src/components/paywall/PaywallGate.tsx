import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogIn, Sparkles, Check, Loader2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthModal } from '@/components/auth/AuthModal';
import { useEntitlements } from '@/contexts/EntitlementsContext';
import { AccessContext, AccessDecision, FREE_TOPICS, SUBSCRIPTION_PRICE_HUF, TRIAL_DAYS } from '@/lib/access';
import { startGradeSubscription } from '@/services/subscriptionService';
import { toast } from 'sonner';

interface GatedContentProps {
  /** A döntés a jogosultságokból (a gate maga hívja, hogy töltés közben ne villanjon fel tartalom). */
  decide: (ctx: AccessContext) => AccessDecision;
  children: React.ReactNode;
  /** A zárt témakör neve és alfejezetei (a fizetőfalon kedvcsinálónak). */
  topicTitle?: string;
  topicItems?: string[];
}

/**
 * Zárt tartalom: ha van hozzáférés, a gyerekeket mutatja; ha nincs, a bejelentkezést vagy az
 * előfizetést kérő kártyát. Amíg a jogosultságok töltődnek, a zárható tartalom helyén töltés látszik.
 */
export function GatedContent({ decide, children, topicTitle, topicItems }: GatedContentProps) {
  const ent = useEntitlements();

  if (ent.loading) {
    // Ha a tartalom bekapcsolt fizetőfal mellett is szabad (pl. nyitott nézet), nem kell várni.
    const pessimistic = decide({ ...ent, paywallEnabled: true });
    if (pessimistic.allowed) return <>{children}</>;
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const decision = decide(ent);
  // (a projekt strict: false módban fordul, ezért 'in'-nel szűkítünk)
  if (!('reason' in decision)) return <>{children}</>;
  return <PaywallCard reason={decision.reason} grade={decision.grade} topicTitle={topicTitle} topicItems={topicItems} />;
}

interface PaywallCardProps {
  reason: 'login' | 'subscribe';
  grade: number;
  topicTitle?: string;
  topicItems?: string[];
}

export function PaywallCard({ reason, grade, topicTitle, topicItems }: PaywallCardProps) {
  const { trialUsed } = useEntitlements();
  const [authOpen, setAuthOpen] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptImmediate, setAcceptImmediate] = useState(false);
  const [starting, setStarting] = useState(false);

  const canStart = acceptTerms && acceptImmediate && !starting;
  const freeTopicNote = FREE_TOPICS[grade] ? 'Az évfolyam I. témaköre bejelentkezés után ingyenes.' : '';

  const handleSubscribe = async () => {
    if (!canStart) return;
    setStarting(true);
    try {
      await startGradeSubscription(grade);
      // sikeres indításkor a böngésző átirányul a Stripe fizetési oldalára
    } catch (err) {
      toast.error((err as Error).message);
      setStarting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/60 bg-gradient-to-br from-white to-indigo-50/60 dark:from-slate-900 dark:to-indigo-950/30 shadow-sm p-6 sm:p-8 text-left">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
          {reason === 'login' ? <LogIn className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            {reason === 'login'
              ? 'Jelentkezz be a folytatáshoz!'
              : `A ${grade}. osztály teljes anyaga előfizetéssel érhető el`}
          </h3>
          {topicTitle && (
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mt-1">{topicTitle}</p>
          )}
        </div>
      </div>

      {reason === 'login' ? (
        <div className="mt-5 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A tananyagokat és kvízeket bejelentkezve érheted el. Minden évfolyam I. témaköre ingyenes,
            a regisztráció pedig mindössze egy perc.
          </p>
          <Button onClick={() => setAuthOpen(true)} className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white">
            <LogIn className="w-4 h-4 mr-2" />
            Bejelentkezés / Regisztráció
          </Button>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {topicItems && topicItems.length > 0 && (
            <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Ebben a témakörben</p>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                {topicItems.slice(0, 12).map((item) => (
                  <li key={item} className="text-sm text-slate-700 dark:text-slate-300 truncate">{item}</li>
                ))}
              </ul>
              {topicItems.length > 12 && (
                <p className="text-xs text-slate-400 mt-2">…és még {topicItems.length - 12} lecke</p>
              )}
            </div>
          )}

          <ul className="space-y-1.5">
            {[
              `Az összes ${grade}. osztályos témakör: tananyag, kvízek, gyakorlás, tudáspróbák`,
              'Évfolyamonként külön előfizetés, bármikor lemondható',
              freeTopicNote,
            ].filter(Boolean).map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{SUBSCRIPTION_PRICE_HUF} Ft</span>
            <span className="text-sm font-semibold text-slate-500 pb-1">/ hó / évfolyam</span>
            {!trialUsed && (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                {TRIAL_DAYS} nap ingyen
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 -mt-3">
            {trialUsed
              ? 'A díjat a fizetéskor, majd havonta automatikusan terheljük. Alanyi adómentes, a 990 Ft a teljes ár.'
              : `Az első ${TRIAL_DAYS} nap ingyenes – ha addig lemondod, nem fizetsz semmit. Utána havonta 990 Ft (alanyi adómentes).`}
          </p>

          <div className="space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4">
            <label className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              <Checkbox checked={acceptTerms} onCheckedChange={(v) => setAcceptTerms(v === true)} className="mt-0.5" />
              <span>
                Elfogadom a{' '}
                <Link to="/felhasznalasi-feltetelek" target="_blank" className="font-bold text-indigo-600 underline">Felhasználási feltételeket</Link>{' '}
                és az{' '}
                <Link to="/adatkezeles" target="_blank" className="font-bold text-indigo-600 underline">Adatkezelési tájékoztatót</Link>.
                Kiskorú esetén a fizetést szülő vagy gondviselő végzi.
              </span>
            </label>
            <label className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              <Checkbox checked={acceptImmediate} onCheckedChange={(v) => setAcceptImmediate(v === true)} className="mt-0.5" />
              <span>
                Kérem, hogy a digitális tartalom elérése azonnal megkezdődjön, és tudomásul veszem, hogy ezzel
                a 14 napos elállási jogomat elveszítem. Az előfizetést bármikor lemondhatom, ekkor a kifizetett
                hónap végéig megmarad a hozzáférés.
              </span>
            </label>
          </div>

          <Button
            onClick={handleSubscribe}
            disabled={!canStart}
            className="w-full sm:w-auto rounded-xl font-black bg-indigo-600 hover:bg-indigo-700 text-white h-11 px-6"
          >
            {starting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {trialUsed ? `Előfizetek a ${grade}. osztályra` : `${TRIAL_DAYS} napos ingyenes próba indítása`}
          </Button>

          <p className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
            <GraduationCap className="w-4 h-4 shrink-0" />
            Ha a tanárod felvett az osztályába, ő ingyen megnyithatja számodra az évfolyamot.
            Tanár vagy? A jóváhagyott tanári fiókkal minden évfolyam ingyenesen elérhető.
          </p>
        </div>
      )}

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab="register" />
    </div>
  );
}
