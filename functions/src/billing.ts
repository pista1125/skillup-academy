/**
 * Évfolyam-előfizetés — tiszta (mellékhatás nélküli) segédfüggvények.
 * A Stripe- és Firestore-hívások az index.ts-ben vannak; ezek itt tesztelhetők (functions/test).
 */

export const MIN_GRADE = 1;
export const MAX_GRADE = 12;
export const TRIAL_DAYS = 7;
/** Sikertelen fizetés után ennyi ideig marad meg a hozzáférés (past_due). */
export const PAST_DUE_GRACE_MS = 3 * 24 * 60 * 60 * 1000;

/** Azok a Stripe-státuszok, amelyeknél az előfizetés „él” (nem kell újat kötni). */
export const LIVE_STATUSES = ['trialing', 'active', 'past_due'] as const;

export function isLiveStatus(status: unknown): boolean {
  return typeof status === 'string' && (LIVE_STATUSES as readonly string[]).includes(status);
}

/** 1–12 közötti egész évfolyam, különben null. */
export function parseGrade(value: unknown): number | null {
  const n = typeof value === 'string' ? Number(value.trim()) : value;
  if (typeof n !== 'number' || !Number.isInteger(n)) return null;
  return n >= MIN_GRADE && n <= MAX_GRADE ? n : null;
}

/** Az évfolyam URL-része a frontendben (pl. 6 → "6-osztaly", 9 → "9-osztaly"). */
export function gradeSlug(grade: number): string {
  return `${grade}-osztaly`;
}

export function subscriptionDocId(uid: string, grade: number): string {
  return `${uid}_${grade}`;
}

type Matcher = string | RegExp;

/** A kérés Origin fejléce, ha engedélyezett; különben az éles domain. */
export function pickOrigin(origin: unknown, allowed: Matcher[], fallback = 'https://diakzona.hu'): string {
  if (typeof origin !== 'string' || !origin) return fallback;
  const ok = allowed.some((m) => (typeof m === 'string' ? m === origin : m.test(origin)));
  return ok ? origin.replace(/\/$/, '') : fallback;
}

/**
 * Az aktuális számlázási időszak vége (Unix mp).
 * Az újabb Stripe API-ban ez a tételeken van (items.data[].current_period_end),
 * a régiben az előfizetésen — mindkettőt kezeljük.
 */
export function subscriptionPeriodEnd(sub: {
  items?: { data?: Array<{ current_period_end?: number | null }> };
  current_period_end?: number | null;
}): number | null {
  const itemEnds = (sub.items?.data || [])
    .map((i) => i.current_period_end)
    .filter((v): v is number => typeof v === 'number');
  if (itemEnds.length > 0) return Math.max(...itemEnds);
  return typeof sub.current_period_end === 'number' ? sub.current_period_end : null;
}

/** A számlához tartozó előfizetés azonosítója (új és régi API-alak). */
export function invoiceSubscriptionId(invoice: {
  parent?: { subscription_details?: { subscription?: string | { id: string } | null } | null } | null;
  subscription?: string | { id: string } | null;
}): string | null {
  const fromParent = invoice.parent?.subscription_details?.subscription;
  const raw = fromParent ?? invoice.subscription ?? null;
  if (!raw) return null;
  return typeof raw === 'string' ? raw : raw.id || null;
}

/**
 * Felülírhatja-e a beérkező előfizetés-állapot a Firestore-ban tároltat ugyanarra az évfolyamra.
 * Ha valakinek (pl. dupla fizetés miatt) két előfizetése lenne ugyanarra az évfolyamra,
 * egy lemondott régi nem írhatja felül az élő újat.
 */
export function shouldOverwriteSubscription(
  existing: { id?: string | null; status?: string | null } | null,
  incoming: { id: string; status: string }
): boolean {
  if (!existing || !existing.id || existing.id === incoming.id) return true;
  if (isLiveStatus(incoming.status)) return true;
  return !isLiveStatus(existing.status);
}

/**
 * Ad-e hozzáférést egy tárolt előfizetés most.
 * trialing / active: az időszak végéig; past_due: még 3 napig az időszak vége után.
 */
export function subscriptionGrantsAccess(
  doc: { status?: string | null; currentPeriodEndMs?: number | null },
  nowMs: number = Date.now()
): boolean {
  const end = doc.currentPeriodEndMs;
  if (typeof end !== 'number') return false;
  if (doc.status === 'trialing' || doc.status === 'active') return nowMs < end;
  if (doc.status === 'past_due') return nowMs < end + PAST_DUE_GRACE_MS;
  return false;
}

/** Forintösszeg a Stripe egységből (a HUF-ot a Stripe fillérben, 2 tizedessel kezeli). */
export function hufFromStripeAmount(amount: number): number {
  return Math.round(amount) / 100;
}

/** "2026.11.23." formátumú dátum Budapest szerint. */
export function huDate(unixSeconds: number): string {
  return new Intl.DateTimeFormat('hu-HU', {
    timeZone: 'Europe/Budapest',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(unixSeconds * 1000));
}

/** A havi számla tételneve. */
export function subscriptionInvoiceLabel(grade: number, periodStart?: number | null, periodEnd?: number | null): string {
  const period = periodStart && periodEnd ? ` (${huDate(periodStart)} – ${huDate(periodEnd)})` : '';
  return `DiákZóna ${grade}. osztály – havi előfizetés${period}`;
}

/** "YYYY-MM-DD" formátumú dátum-e (a foglalási naptárhoz). */
export function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}
