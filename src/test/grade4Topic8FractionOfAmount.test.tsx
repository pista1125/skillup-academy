import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionOfAmountTheory, DISC_TASKS, STEP_TASKS } from '@/components/math/grade-4/tortszamok/tortresz-szamitasa/FractionOfAmountTheory';
import { FractionOfAmountQuiz, FRACTION_OF_AMOUNT_QUESTIONS } from '@/components/math/grade-4/tortszamok/tortresz-szamitasa/FractionOfAmountQuiz';
import { FractionOfAmountMatcher, FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/tortresz-szamitasa/FractionOfAmountMatcher';
import { FractionOfAmountSorter, FRACTION_OF_AMOUNT_SORTER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/tortresz-szamitasa/FractionOfAmountSorter';
import {
  TwoStepDiscsSvg,
  PriceBarsSvg,
  CarCollectionSvg,
  MeterTapeSvg,
  ClockPartsSvg,
  SyrupSvg,
  PRICE_CARDS,
  CAR_GROUPS,
  partOf,
  partOfSteps
} from '@/components/math/grade-4/tortszamok/tortresz-szamitasa/FractionOfAmountFigures';

const D: Record<string, number> = { fele: 2, harmada: 3, negyede: 4, ötöde: 5, hatoda: 6, tizede: 10, tizenkettede: 12 };

describe('Grade 4 Topic VIII - 5. Törtrész kiszámítása, szöveges feladatok - Components', () => {
  it('renders FractionOfAmountTheory without throwing', () => {
    const { container } = render(<FractionOfAmountTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FractionOfAmountQuiz without throwing', () => {
    const { container } = render(<FractionOfAmountQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FractionOfAmountMatcher without throwing', () => {
    const { container } = render(<FractionOfAmountMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FractionOfAmountSorter without throwing', () => {
    const { container } = render(<FractionOfAmountSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TwoStepDiscsSvg, PriceBarsSvg, CarCollectionSvg, MeterTapeSvg, ClockPartsSvg, SyrupSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge, explanation and 4 distinct options', () => {
    expect(FRACTION_OF_AMOUNT_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(FRACTION_OF_AMOUNT_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(FRACTION_OF_AMOUNT_QUESTIONS.map((q) => q.id)).size).toBe(30);
    FRACTION_OF_AMOUNT_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
    expect(FRACTION_OF_AMOUNT_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(12);
  });

  it('computes fractional parts like the book', () => {
    expect(partOf(12, 3, 4)).toBe(9);
    expect(partOfSteps(12, 3, 4)).toEqual(['12 : 4 = 3', '3 · 3 = 9']);
    expect(partOf(4000, 3, 4)).toBe(3000);
    expect(partOf(4000, 2, 8)).toBe(1000);
    expect(partOf(100, 3, 4)).toBe(75);
    expect(partOf(60, 3, 4)).toBe(45);
    expect(partOf(400, 6, 10)).toBe(240);
    PRICE_CARDS.forEach((c) => expect(partOf(300, c.n, c.d)).toBe(c.price));
    CAR_GROUPS.forEach((g) => expect(partOf(60, g.n, g.d)).toBe(g.count));
    expect(60 - CAR_GROUPS.reduce((s, g) => s + g.count, 0)).toBe(9);
    [...DISC_TASKS.map((t) => [t.total, t.d]), ...STEP_TASKS.map((t) => [t.amount, t.d])].forEach(([a, d]) => expect(a % d).toBe(0));
  });

  it('sorter and matcher are consistent', () => {
    const [l1, l2, l3] = FRACTION_OF_AMOUNT_SORTER_LEVELS_LIST;
    l1.items.forEach((it) => {
      const [a, w] = it.text.split(' ');
      expect(it.categoryId).toBe(`r${Number(a) / D[w]}`);
    });
    const m = (t: string) => {
      const mm = t.match(/(?:(\d+) )?(fele|negyede|ötöde|tizede)$/)!;
      return partOf(100, Number(mm[1] ?? 1), D[mm[2]]);
    };
    l2.items.forEach((it) => {
      const v = m(it.text);
      expect(it.categoryId).toBe(v < 50 ? 'lt' : v === 50 ? 'eq' : 'gt');
    });
    const timeVals: Record<string, number> = { m15: 15, m30: 30, m45: 45 };
    l3.items.forEach((it) => {
      const mm = it.text.match(/^1 óra (\d+) (negyede|tizede|hatoda|tizenkettede)$/);
      if (mm) expect(partOf(60, Number(mm[1]), D[mm[2]])).toBe(timeVals[it.categoryId]);
    });
    FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST.forEach((l) => {
      expect(l.pairs).toHaveLength(8);
      expect(new Set(l.pairs.map((p) => String(p.right))).size).toBe(8);
    });
    FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST[0].pairs.forEach((p) => {
      const [a, w] = String(p.left).split(' ');
      expect(String(Number(a) / D[w])).toBe(String(p.right));
    });
  });
});
