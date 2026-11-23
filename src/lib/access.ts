/**
 * Fizetőfal — ki mit láthat az 1–12. évfolyam tananyagából.
 *
 * Szabályok (2026-11-23-i döntés):
 * - „Tananyagok és Könyvek” (materials), eszközök, játékok, felvételi, érettségi, kompetencia: nyitott.
 * - Minden évfolyam I. témaköre: bejelentkezés után ingyenes.
 * - A többi témakör: aktív előfizetés vagy tanári licenc az adott évfolyamra.
 * - Admin és érvényes jóváhagyású tanár: minden.
 * - Ha a fizetőfal ki van kapcsolva (config/app.paywallEnabled !== true): minden nyitott, mint eddig.
 *
 * A lecke-szintű döntés a lecke azonosítójából (g6-…) olvassa ki az évfolyamot, nem az URL-ből,
 * és az I. témakör leckéit fehérlistával ismeri fel: ami nincs rajta, az fizetős.
 * Ezt a src/test/accessFreeLessons.test.ts őrzi (átfedés más témakörökkel tilos).
 */
import type { GradeLevel } from '@/types/education';

export const SUBSCRIPTION_PRICE_HUF = 990;
export const TRIAL_DAYS = 7;
const PAST_DUE_GRACE_MS = 3 * 24 * 60 * 60 * 1000;

interface FreeTopicSpec {
  /** Az I. témakör azonosítója (gradeSectionsConfig / mathTopics). */
  topicId: string;
  /** A témakör leckéinek közös előtagjai. */
  lessonPrefixes?: string[];
  /** Ha az előtag nem egyértelmű: a leckék pontos listája. */
  lessonIds?: string[];
}

const pairs = (...bases: string[]) => bases.flatMap((b) => [`${b}-theory`, `${b}-quiz`]);

export const FREE_TOPICS: Record<number, FreeTopicSpec> = {
  1: { topicId: 'g1-prep-period', lessonPrefixes: ['g1-prep-'] },
  2: { topicId: 'g2-numbers-to-20', lessonPrefixes: ['g2-c20-'] },
  3: { topicId: 'g3-count-100', lessonPrefixes: ['g3-c100-'] },
  4: { topicId: 'g4-count-10k', lessonPrefixes: ['g4-count-'] },
  5: {
    topicId: 'g5-integers',
    lessonIds: pairs(
      'g5-roman-numerals', 'g5-place-value', 'g5-number-reading', 'g5-number-spelling', 'g5-number-systems',
      'g5-number-line', 'g5-rounding', 'g5-addition', 'g5-subtraction', 'g5-multiplication', 'g5-division',
      'g5-order-of-operations', 'g5-negative-numbers', 'g5-opposite-absolute', 'g5-integer-addition-subtraction',
      'g5-chapter1-summary',
    ),
  },
  6: { topicId: 'g6-integers-divisibility', lessonPrefixes: ['g6-integers-'] },
  7: { topicId: 'g7-logic', lessonPrefixes: ['g7-logic-'] },
  8: {
    topicId: 'g8-numbers-letters',
    lessonIds: pairs(
      'g8-logic', 'g8-set-basics', 'g8-set-operations', 'g8-rational-set', 'g8-rational-operations', 'g8-powers',
      'g8-sqrt-concept', 'g8-square-roots', 'g8-algebra-intro', 'g8-polynomial-mult', 'g8-factoring',
      'g8-chapter1-summary',
    ),
  },
  9: { topicId: 'g9-kombinatorika-halmazok', lessonPrefixes: ['g9-komb-'] },
  10: { topicId: 'g10-logika', lessonPrefixes: ['g10-logic-'] },
  11: { topicId: 'g11-trigonometria', lessonPrefixes: ['g11-trig-'] },
  12: { topicId: 'g12-tergeometria', lessonPrefixes: ['g12-ter-'] },
};

/** Az alkalmazás évfolyam-értékéből (1–8, 'high-1'…'high-4', 9–12) 1–12 közötti szám. */
export function gradeNumberFromLevel(level: GradeLevel | number | string | null | undefined): number | null {
  if (typeof level === 'number') return level >= 1 && level <= 12 && Number.isInteger(level) ? level : null;
  if (typeof level === 'string') {
    const m = /^high-([1-4])$/.exec(level);
    if (m) return 8 + Number(m[1]);
  }
  return null;
}

/** A lecke évfolyama az azonosítójából (pl. "g6-integers-gcd-quiz" → 6), különben null. */
export function lessonGrade(activityType: string | null | undefined): number | null {
  const m = /^g(\d{1,2})-/.exec(activityType || '');
  if (!m) return null;
  const g = Number(m[1]);
  return g >= 1 && g <= 12 ? g : null;
}

export function isFreeTopic(grade: number, topicId: string): boolean {
  return FREE_TOPICS[grade]?.topicId === topicId;
}

export function isFreeLesson(grade: number, activityType: string): boolean {
  const spec = FREE_TOPICS[grade];
  if (!spec) return false;
  if (activityType === spec.topicId) return true;
  if (spec.lessonIds?.includes(activityType)) return true;
  return Boolean(spec.lessonPrefixes?.some((p) => activityType.startsWith(p)));
}

// ---------- Jogosultságok ----------

export interface SubscriptionRecord {
  grade: number;
  status: string;
  currentPeriodEndMs: number | null;
  trialEndMs: number | null;
  cancelAtPeriodEnd: boolean;
}

export interface TeacherGrantRecord {
  grade: number;
  teacherId: string;
  teacherName?: string;
  active: boolean;
  validUntilMs: number | null;
}

export function subscriptionGrantsAccess(sub: Pick<SubscriptionRecord, 'status' | 'currentPeriodEndMs'>, nowMs = Date.now()): boolean {
  const end = sub.currentPeriodEndMs;
  if (typeof end !== 'number') return false;
  if (sub.status === 'trialing' || sub.status === 'active') return nowMs < end;
  if (sub.status === 'past_due') return nowMs < end + PAST_DUE_GRACE_MS;
  return false;
}

export function teacherGrantActive(grant: TeacherGrantRecord | null | undefined, nowMs = Date.now()): boolean {
  if (!grant || !grant.active) return false;
  return grant.validUntilMs === null || nowMs < grant.validUntilMs;
}

export interface AccessContext {
  /** A fizetőfal be van-e kapcsolva (config/app.paywallEnabled). */
  paywallEnabled: boolean;
  signedIn: boolean;
  /** Admin vagy érvényes jóváhagyású tanár. */
  fullAccess: boolean;
  /** Azok az évfolyamok, amelyekhez előfizetés vagy tanári licenc ad hozzáférést. */
  grades: ReadonlySet<number>;
}

export type AccessDecision =
  | { allowed: true }
  | { allowed: false; reason: 'login' | 'subscribe'; grade: number };

const ALLOWED: AccessDecision = { allowed: true };

function decide(grade: number, free: boolean, ctx: AccessContext): AccessDecision {
  if (!ctx.paywallEnabled) return ALLOWED;
  if (!ctx.signedIn) return { allowed: false, reason: 'login', grade };
  if (free || ctx.fullAccess || ctx.grades.has(grade)) return ALLOWED;
  return { allowed: false, reason: 'subscribe', grade };
}

/** Témakör-nézet (az évfolyam oldalán egy témakör tartalma). */
export function decideTopicAccess(gradeLevel: GradeLevel | number | string | null | undefined, topicId: string, ctx: AccessContext): AccessDecision {
  const grade = gradeNumberFromLevel(gradeLevel);
  if (!grade || topicId === 'materials') return ALLOWED;
  // Csak az évfolyam saját témakörei (g6-…) zártak; az egyéb (pl. kompetencia) nézetek nyitottak.
  if (!topicId.startsWith(`g${grade}-`)) return ALLOWED;
  return decide(grade, isFreeTopic(grade, topicId), ctx);
}

/** Egy lecke vagy kvíz megnyitása. Az évfolyamot a lecke azonosítója adja. */
export function decideLessonAccess(activityType: string | null | undefined, ctx: AccessContext): AccessDecision {
  const grade = lessonGrade(activityType);
  if (!grade || !activityType) return ALLOWED; // eszközök, játékok, régi általános modulok
  return decide(grade, isFreeLesson(grade, activityType), ctx);
}
