import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ExternalLink, GraduationCap, Loader2, Sparkles, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEntitlements } from '@/contexts/EntitlementsContext';
import { SUBSCRIPTION_PRICE_HUF, SubscriptionRecord, subscriptionGrantsAccess, teacherGrantActive } from '@/lib/access';
import { openSubscriptionPortal } from '@/services/subscriptionService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const huDate = (msValue: number | null) => (msValue ? new Date(msValue).toLocaleDateString('hu-HU') : '—');

function statusInfo(sub: SubscriptionRecord): { label: string; tone: string; detail: string } {
  const active = subscriptionGrantsAccess(sub);
  if (sub.status === 'trialing' && active) {
    return {
      label: sub.cancelAtPeriodEnd ? 'Próbaidő – lemondva' : 'Próbaidő',
      tone: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      detail: sub.cancelAtPeriodEnd
        ? `A hozzáférés ${huDate(sub.trialEndMs ?? sub.currentPeriodEndMs)}-ig tart, nem terhelünk.`
        : `Ingyenes ${huDate(sub.trialEndMs ?? sub.currentPeriodEndMs)}-ig, utána ${SUBSCRIPTION_PRICE_HUF} Ft/hó.`,
    };
  }
  if (sub.status === 'active' && active) {
    return {
      label: sub.cancelAtPeriodEnd ? 'Lemondva' : 'Aktív',
      tone: sub.cancelAtPeriodEnd
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      detail: sub.cancelAtPeriodEnd
        ? `A hozzáférés ${huDate(sub.currentPeriodEndMs)}-ig megmarad, utána nem terhelünk.`
        : `Következő terhelés: ${huDate(sub.currentPeriodEndMs)} (${SUBSCRIPTION_PRICE_HUF} Ft).`,
    };
  }
  if (sub.status === 'past_due' && active) {
    return {
      label: 'Fizetési hiba',
      tone: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
      detail: 'A legutóbbi terhelés nem sikerült. Frissítsd a kártyádat, különben néhány napon belül lezárul a hozzáférés.',
    };
  }
  return {
    label: 'Lejárt',
    tone: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    detail: 'Ez az előfizetés már nem aktív.',
  };
}

export function MySubscriptions() {
  const { subscriptions, teacherGrant, fullAccess, loading } = useEntitlements();
  const [opening, setOpening] = useState(false);

  const handlePortal = async () => {
    setOpening(true);
    try {
      await openSubscriptionPortal();
    } catch (err) {
      toast.error((err as Error).message);
      setOpening(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const grantActive = teacherGrantActive(teacherGrant);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Előfizetéseim</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Évfolyamonként külön előfizetés, {SUBSCRIPTION_PRICE_HUF} Ft/hó. Minden évfolyam I. témaköre ingyenes.
        </p>
      </div>

      {fullAccess && (
        <div className="flex items-start gap-3 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-4 text-sm text-indigo-900 dark:text-indigo-100">
          <GraduationCap className="w-5 h-5 shrink-0" />
          <span>Tanári (vagy adminisztrátori) fiókoddal minden évfolyam teljes anyaga ingyenesen elérhető.</span>
        </div>
      )}

      {teacherGrant && (
        <div className={cn(
          'flex items-start gap-3 rounded-2xl border p-4 text-sm',
          grantActive
            ? 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
        )}>
          <School className="w-5 h-5 shrink-0" />
          <span>
            {grantActive
              ? <>A <b>{teacherGrant.grade}. osztály</b> teljes anyagát {teacherGrant.teacherName ? <b>{teacherGrant.teacherName}</b> : 'a tanárod'} nyitotta meg számodra{teacherGrant.validUntilMs ? ` (${huDate(teacherGrant.validUntilMs)}-ig)` : ''}.</>
              : <>A tanári hozzáférésed ({teacherGrant.grade}. osztály) lejárt vagy visszavonták.</>}
          </span>
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center space-y-3">
          <Sparkles className="w-8 h-8 mx-auto text-indigo-500" />
          <p className="font-bold text-slate-700 dark:text-slate-200">Még nincs előfizetésed.</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Válaszd ki az évfolyamodat, és nyiss meg egy zárt témakört – ott indíthatod a 7 napos ingyenes próbát.
          </p>
          <Button asChild variant="outline" className="rounded-xl font-bold">
            <Link to="/">Évfolyamok</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {subscriptions.map((sub) => {
            const info = statusInfo(sub);
            return (
              <div key={sub.grade} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-wrap items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg font-black shrink-0">
                  {sub.grade}.
                </div>
                <div className="flex-1 min-w-[12rem]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-black text-slate-800 dark:text-slate-100">{sub.grade}. osztály</h3>
                    <span className={cn('text-[11px] font-black px-2 py-0.5 rounded-full', info.tone)}>{info.label}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{info.detail}</p>
                </div>
              </div>
            );
          })}

          <Button onClick={handlePortal} disabled={opening} className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white">
            {opening ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CreditCard className="w-4 h-4 mr-2" />}
            Előfizetés kezelése (lemondás, kártya, számlák)
            <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
          </Button>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A kezelés a Stripe biztonságos ügyfélportálján történik. Lemondás után a kifizetett időszak végéig megmarad a hozzáférés.
          </p>
        </div>
      )}
    </div>
  );
}
