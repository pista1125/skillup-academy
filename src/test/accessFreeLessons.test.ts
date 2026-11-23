import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  AccessContext,
  FREE_TOPICS,
  decideLessonAccess,
  decideTopicAccess,
  gradeNumberFromLevel,
  isFreeLesson,
  lessonGrade,
  subscriptionGrantsAccess,
  teacherGrantActive,
} from '@/lib/access';
import { getGradeSubsections } from '@/components/math/views/gradeSectionsConfig';
import { mathTopics } from '@/data/mathTopics';

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 'high-1', 'high-2', 'high-3', 'high-4'] as const;

const ctx = (over: Partial<AccessContext> = {}): AccessContext => ({
  paywallEnabled: true,
  signedIn: true,
  fullAccess: false,
  grades: new Set<number>(),
  ...over,
});

describe('fizetőfal – döntési logika', () => {
  it('évfolyam-szint átalakítás', () => {
    expect(gradeNumberFromLevel(6)).toBe(6);
    expect(gradeNumberFromLevel('high-1')).toBe(9);
    expect(gradeNumberFromLevel('high-4')).toBe(12);
    expect(gradeNumberFromLevel('graduation')).toBeNull();
    expect(gradeNumberFromLevel(null)).toBeNull();
    expect(lessonGrade('g11-trig-tangens-fogalma-quiz')).toBe(11);
    expect(lessonGrade('chess-game')).toBeNull();
  });

  it('kikapcsolt fizetőfal mellett minden nyitott, bejelentkezés nélkül is', () => {
    const off = ctx({ paywallEnabled: false, signedIn: false });
    expect(decideTopicAccess(6, 'g6-fractions', off).allowed).toBe(true);
    expect(decideLessonAccess('g6-fraction-div-quiz', off).allowed).toBe(true);
  });

  it('tananyagok fül és eszközök bejelentkezés nélkül is nyitottak', () => {
    const guest = ctx({ signedIn: false });
    expect(decideTopicAccess(6, 'materials', guest).allowed).toBe(true);
    expect(decideTopicAccess('graduation', 'g12-sorozatok', guest).allowed).toBe(true);
    expect(decideLessonAccess('chess-game', guest).allowed).toBe(true);
    expect(decideLessonAccess('perimeter-area', guest).allowed).toBe(true);
  });

  it('az I. témakör bejelentkezést kér, utána ingyenes', () => {
    expect(decideTopicAccess(6, 'g6-integers-divisibility', ctx({ signedIn: false }))).toEqual({ allowed: false, reason: 'login', grade: 6 });
    expect(decideTopicAccess(6, 'g6-integers-divisibility', ctx()).allowed).toBe(true);
    expect(decideLessonAccess('g6-integers-gcd-quiz', ctx()).allowed).toBe(true);
    expect(decideLessonAccess('g1-prep-valogatasok-matcher', ctx()).allowed).toBe(true);
  });

  it('a többi témakör előfizetést kér', () => {
    expect(decideTopicAccess(6, 'g6-fractions', ctx())).toEqual({ allowed: false, reason: 'subscribe', grade: 6 });
    expect(decideLessonAccess('g6-fraction-div-quiz', ctx())).toEqual({ allowed: false, reason: 'subscribe', grade: 6 });
    expect(decideTopicAccess('high-3', 'g11-szamelmelet', ctx())).toEqual({ allowed: false, reason: 'subscribe', grade: 11 });
  });

  it('az előfizetés csak a saját évfolyamát nyitja', () => {
    const sixth = ctx({ grades: new Set([6]) });
    expect(decideLessonAccess('g6-fraction-div-quiz', sixth).allowed).toBe(true);
    expect(decideLessonAccess('g7-equations-quiz', sixth).allowed).toBe(false);
  });

  it('a lecke évfolyamát az azonosító adja, nem az URL', () => {
    // pl. /6-osztaly/g6-integers-divisibility/g7-... – a 7. osztályos lecke 7. osztályos előfizetést kér
    expect(decideLessonAccess('g7-percent-quiz', ctx({ grades: new Set([6]) }))).toEqual({ allowed: false, reason: 'subscribe', grade: 7 });
  });

  it('tanár és admin mindent lát', () => {
    expect(decideLessonAccess('g12-sorozatok-quiz', ctx({ fullAccess: true })).allowed).toBe(true);
  });

  it('előfizetés-státuszok és tanári licenc érvényessége', () => {
    const now = Date.UTC(2026, 10, 23);
    const day = 86_400_000;
    expect(subscriptionGrantsAccess({ status: 'trialing', currentPeriodEndMs: now + day }, now)).toBe(true);
    expect(subscriptionGrantsAccess({ status: 'past_due', currentPeriodEndMs: now - 2 * day }, now)).toBe(true);
    expect(subscriptionGrantsAccess({ status: 'past_due', currentPeriodEndMs: now - 4 * day }, now)).toBe(false);
    expect(subscriptionGrantsAccess({ status: 'canceled', currentPeriodEndMs: now + day }, now)).toBe(false);
    expect(teacherGrantActive({ grade: 6, teacherId: 't', active: true, validUntilMs: now + day }, now)).toBe(true);
    expect(teacherGrantActive({ grade: 6, teacherId: 't', active: true, validUntilMs: now - 1 }, now)).toBe(false);
    expect(teacherGrantActive({ grade: 6, teacherId: 't', active: false, validUntilMs: null }, now)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Őrteszt: az ingyenes I. témakör fehérlistája pontosan az I. témakör leckéit fedi le.
// ---------------------------------------------------------------------------

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

/** A nézetfájlból témakörönként a leckeazonosítók (statikus és sablonos alap-azonosítók). */
function lessonsByTopic(grade: number): Map<string, Set<string>> {
  const view = read(`src/components/math/views/Grade${grade}View.tsx`);
  const re = /topicId\s*===\s*['"]([a-z0-9-]+)['"]|['"`](g\d+-[a-z0-9-]+?)(?:['"`]|-?\$\{)/g;
  const topics = new Set<string>();
  const map = new Map<string, Set<string>>();
  let cur: string | null = null;
  for (const m of view.matchAll(re)) {
    if (m[1]) { cur = m[1]; topics.add(cur); continue; }
    const id = m[2];
    if (!cur || !id || topics.has(id) || /-sec-/.test(id)) continue;
    if (!map.has(cur)) map.set(cur, new Set());
    map.get(cur)!.add(id);
  }
  return map;
}

function routerIds(grade: number): string[] {
  const src = read(`src/components/math/activities/Grade${grade}Activities.tsx`);
  return [...new Set([...src.matchAll(/activityType\s*===\s*['"](g\d+-[a-z0-9-]+)['"]/g)].map((m) => m[1]))];
}

describe('fizetőfal – ingyenes I. témakör fehérlistája', () => {
  it.each(LEVELS.map((l) => [l]))('%s: a FREE_TOPICS az évfolyam első témakörére mutat', (level) => {
    const grade = gradeNumberFromLevel(level)!;
    const first = getGradeSubsections(level, mathTopics).filter((t) => t.id !== 'materials')[0];
    expect(FREE_TOPICS[grade].topicId).toBe(first.id);
  });

  it.each(LEVELS.map((l) => [gradeNumberFromLevel(l)!]))('%i. évfolyam: az I. témakör minden leckéje ingyenes', (grade) => {
    const first = lessonsByTopic(grade).get(FREE_TOPICS[grade].topicId);
    expect(first && first.size).toBeGreaterThan(0);
    // Sablonos alap-azonosító (pl. `${'g8-logic'}-theory`) nem valódi lecke: azt a belőle képzett
    // router-azonosítókon ellenőrizzük (routerMissing).
    const routes = routerIds(grade);
    const missing = [...first!].filter((id) => !isFreeLesson(grade, id) && !routes.some((r) => r.startsWith(`${id}-`)));
    // Az alap-azonosítókból képzett leckék (pl. …-matcher) is ingyenesek legyenek:
    const routerMissing = routerIds(grade).filter((r) => [...first!].some((id) => r.startsWith(`${id}-`) || r === id) && !isFreeLesson(grade, r));
    expect(missing).toEqual([]);
    expect(routerMissing).toEqual([]);
  });

  it.each(LEVELS.map((l) => [gradeNumberFromLevel(l)!]))('%i. évfolyam: más témakör leckéje nem lehet ingyenes', (grade) => {
    const byTopic = lessonsByTopic(grade);
    const leaks: string[] = [];
    for (const [topicId, ids] of byTopic) {
      if (topicId === FREE_TOPICS[grade].topicId) continue;
      for (const id of ids) if (isFreeLesson(grade, id)) leaks.push(`${topicId}: ${id}`);
    }
    // A routerben is: ami ingyenes, annak az I. témakörhöz kell tartoznia (más témakör alap-azonosítójával nem kezdődhet).
    for (const r of routerIds(grade).filter((id) => isFreeLesson(grade, id))) {
      for (const [topicId, ids] of byTopic) {
        if (topicId === FREE_TOPICS[grade].topicId) continue;
        if ([...ids].some((id) => r === id || r.startsWith(`${id}-`))) leaks.push(`router ${r} ↔ ${topicId}`);
      }
    }
    expect(leaks).toEqual([]);
  });
});
