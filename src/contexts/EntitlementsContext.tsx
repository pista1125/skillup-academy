import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { toDateOrNull } from '@/lib/teacherApproval';
import {
  AccessContext,
  SubscriptionRecord,
  TeacherGrantRecord,
  subscriptionGrantsAccess,
  teacherGrantActive,
} from '@/lib/access';

interface EntitlementsState extends AccessContext {
  /** Amíg az első adatok nem érkeztek meg, a zárt tartalom helyén töltés látszik. */
  loading: boolean;
  subscriptions: SubscriptionRecord[];
  teacherGrant: TeacherGrantRecord | null;
  /** Használta-e már a fiók a 7 napos próbaidőt. */
  trialUsed: boolean;
}

const EMPTY: EntitlementsState = {
  loading: true,
  paywallEnabled: false,
  signedIn: false,
  fullAccess: false,
  grades: new Set(),
  subscriptions: [],
  teacherGrant: null,
  trialUsed: false,
};

const EntitlementsContext = createContext<EntitlementsState>(EMPTY);

const ms = (v: unknown): number | null => toDateOrNull(v as never)?.getTime() ?? null;

export const EntitlementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const uid = user?.uid ?? null;

  const [paywallEnabled, setPaywallEnabled] = useState<boolean | null>(null);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[] | null>(null);
  const [teacherGrant, setTeacherGrant] = useState<TeacherGrantRecord | null | undefined>(undefined);
  const [trialUsed, setTrialUsed] = useState(false);
  // Percenként újraszámoljuk az időfüggő jogosultságokat (próbaidő vége, türelmi idő).
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  // Fizetőfal kapcsoló (mindenki olvashatja). Hiba esetén nyitva hagyjuk az oldalt.
  useEffect(() => {
    return onSnapshot(
      doc(db, 'config', 'app'),
      (snap) => setPaywallEnabled(snap.exists() && snap.data().paywallEnabled === true),
      (err) => {
        console.warn('config/app olvasási hiba, a fizetőfal kikapcsolva marad:', err);
        setPaywallEnabled(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!uid) {
      setSubscriptions([]);
      setTeacherGrant(null);
      setTrialUsed(false);
      return;
    }
    setSubscriptions(null);
    setTeacherGrant(undefined);

    const unsubSubs = onSnapshot(
      query(collection(db, 'subscriptions'), where('uid', '==', uid)),
      (snap) => {
        setSubscriptions(snap.docs.map((d) => {
          const data = d.data();
          return {
            grade: Number(data.grade),
            status: String(data.status || ''),
            currentPeriodEndMs: ms(data.currentPeriodEnd),
            trialEndMs: ms(data.trialEnd),
            cancelAtPeriodEnd: data.cancelAtPeriodEnd === true,
          };
        }).sort((a, b) => a.grade - b.grade));
      },
      (err) => {
        console.warn('Előfizetések olvasási hiba:', err);
        setSubscriptions([]);
      }
    );

    const unsubGrant = onSnapshot(
      doc(db, 'teacherGrants', uid),
      (snap) => {
        if (!snap.exists()) return setTeacherGrant(null);
        const data = snap.data();
        setTeacherGrant({
          grade: Number(data.grade),
          teacherId: String(data.teacherId || ''),
          teacherName: typeof data.teacherName === 'string' ? data.teacherName : undefined,
          active: data.active !== false,
          validUntilMs: ms(data.validUntil),
        });
      },
      () => setTeacherGrant(null)
    );

    const unsubCustomer = onSnapshot(
      doc(db, 'stripeCustomers', uid),
      (snap) => setTrialUsed(snap.exists() && snap.data().trialUsed === true),
      () => setTrialUsed(false)
    );

    return () => {
      unsubSubs();
      unsubGrant();
      unsubCustomer();
    };
  }, [uid]);

  const value = useMemo<EntitlementsState>(() => {
    const subs = subscriptions ?? [];
    const grades = new Set<number>();
    subs.forEach((s) => { if (subscriptionGrantsAccess(s, now)) grades.add(s.grade); });
    if (teacherGrant && teacherGrantActive(teacherGrant, now)) grades.add(teacherGrant.grade);

    const fullAccess = isAdmin || profile?.teacher_status === 'approved';
    const loading = authLoading || paywallEnabled === null || (Boolean(uid) && (subscriptions === null || teacherGrant === undefined));

    return {
      loading,
      paywallEnabled: paywallEnabled === true,
      signedIn: Boolean(uid),
      fullAccess,
      grades,
      subscriptions: subs,
      teacherGrant: teacherGrant ?? null,
      trialUsed,
    };
  }, [authLoading, isAdmin, now, paywallEnabled, profile?.teacher_status, subscriptions, teacherGrant, trialUsed, uid]);

  return <EntitlementsContext.Provider value={value}>{children}</EntitlementsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEntitlements = () => useContext(EntitlementsContext);
