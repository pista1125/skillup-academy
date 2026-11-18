// Közös ellenőrzések az 1. osztályos mesés leckék tesztjeihez.
import { expect } from 'vitest';
import type { MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '@/components/math/grade-1/shared/MeseQuiz';
import { optionKey } from '@/components/math/grade-1/shared/MeseKit';

export function checkMeseLesson(
  questions: MeseQuestion[],
  pairs: Record<MeseLevel, MesePairsLevel>,
  sort: Record<MeseLevel, MeseSortLevel>,
  { perLevel = 8 }: { perLevel?: number } = {}
) {
  expect(questions).toHaveLength(perLevel * 3);
  ([1, 2, 3] as const).forEach((l) => expect(questions.filter((q) => q.level === l)).toHaveLength(perLevel));
  expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  questions.forEach((q) => {
    expect(q.ask.length).toBeGreaterThan(0);
    expect(q.ask.length).toBeLessThanOrEqual(60);
    expect(q.badge).toBeTruthy();
    expect(q.options.length).toBeGreaterThanOrEqual(2);
    expect(q.options.length).toBeLessThanOrEqual(4);
    expect(new Set(q.options.map(optionKey)).size).toBe(q.options.length);
  });
  ([1, 2, 3] as const).forEach((l) => {
    const p = pairs[l];
    expect(p.pairs.length).toBeGreaterThanOrEqual(3);
    expect(p.pairs.length).toBeLessThanOrEqual(6);
    const s = sort[l];
    expect(s.bins.length).toBeGreaterThanOrEqual(2);
    expect(s.bins.length).toBeLessThanOrEqual(3);
    expect(s.items.length).toBeGreaterThanOrEqual(5);
    expect(s.items.length).toBeLessThanOrEqual(10);
    s.items.forEach((it) => expect(it.bin).toBeLessThan(s.bins.length));
  });
}
