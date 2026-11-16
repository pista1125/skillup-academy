import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ImproperFractionsTheory, PARTY_TASKS, PARTY_DENOMS, LINE_TASKS } from '@/components/math/grade-4/tortszamok/egynel-nagyobb-tortek/ImproperFractionsTheory';
import { ImproperFractionsQuiz, IMPROPER_FRACTIONS_QUESTIONS } from '@/components/math/grade-4/tortszamok/egynel-nagyobb-tortek/ImproperFractionsQuiz';
import { ImproperFractionsMatcher, IMPROPER_FRACTIONS_MATCHER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/egynel-nagyobb-tortek/ImproperFractionsMatcher';
import { ImproperFractionsSorter, IMPROPER_FRACTIONS_SORTER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/egynel-nagyobb-tortek/ImproperFractionsSorter';
import {
  WholeEqualsSvg,
  TapeMeasureSvg,
  TankSvg,
  RecipeSvg,
  MorePizzaSvg,
  HourQuartersSvg,
  FractionNumberLineSvg,
  toWholes,
  compareToOne
} from '@/components/math/grade-4/tortszamok/egynel-nagyobb-tortek/ImproperFractionsFigures';

describe('Grade 4 Topic VIII - 3. Az 1 egész és az egynél nagyobb törtek - Components', () => {
  it('renders ImproperFractionsTheory without throwing', () => {
    const { container } = render(<ImproperFractionsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ImproperFractionsQuiz without throwing', () => {
    const { container } = render(<ImproperFractionsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ImproperFractionsMatcher without throwing', () => {
    const { container } = render(<ImproperFractionsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ImproperFractionsSorter without throwing', () => {
    const { container } = render(<ImproperFractionsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WholeEqualsSvg, TapeMeasureSvg, TankSvg, RecipeSvg, MorePizzaSvg, HourQuartersSvg, FractionNumberLineSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge and 4 distinct options', () => {
    expect(IMPROPER_FRACTIONS_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(IMPROPER_FRACTIONS_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(IMPROPER_FRACTIONS_QUESTIONS.map((q) => q.id)).size).toBe(30);
    IMPROPER_FRACTIONS_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
    expect(IMPROPER_FRACTIONS_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(12);
  });

  it('matcher has 3 × 8 unique pairs and sorter 3 × 3 categories × 9 items', () => {
    IMPROPER_FRACTIONS_MATCHER_LEVELS_LIST.forEach((l) => {
      expect(l.pairs).toHaveLength(8);
      expect(new Set(l.pairs.map((p) => p.right)).size).toBe(8);
    });
    IMPROPER_FRACTIONS_SORTER_LEVELS_LIST.forEach((l) => {
      expect(l.categories).toHaveLength(3);
      expect(l.items).toHaveLength(9);
      l.categories.forEach((c) => expect(l.items.filter((i) => i.categoryId === c.id)).toHaveLength(3));
    });
  });

  it('converts fractions to wholes and parts correctly', () => {
    expect(toWholes(5, 4)).toBe('1 egész és 1 negyed');
    expect(toWholes(4, 4)).toBe('1 egész');
    expect(toWholes(3, 2)).toBe('1 és fél');
    expect(toWholes(7, 3)).toBe('2 egész és 1 harmad');
    expect(toWholes(8, 4)).toBe('2 egész');
    expect(toWholes(3, 4)).toBe('3 negyed');
    expect(compareToOne(3, 4)).toBe('kisebb');
    expect(compareToOne(10, 10)).toBe('egyenlő');
    expect(compareToOne(5, 4)).toBe('nagyobb');
    PARTY_TASKS.forEach((t) => {
      expect(PARTY_DENOMS).toContain(t.d);
      expect(t.k).toBeLessThanOrEqual(3 * t.d);
    });
    LINE_TASKS.forEach((t) => expect(t.k).toBeLessThanOrEqual(2 * t.d));
    // sorter 3. szint: a kategória egészszáma
    const wholesOf: Record<string, number> = { one: 1, two: 2, three: 3 };
    const denom: Record<string, number> = { ketted: 2, harmad: 3, negyed: 4, hatod: 6, tized: 10 };
    IMPROPER_FRACTIONS_SORTER_LEVELS_LIST[2].items.forEach((it) => {
      const [k, name] = it.text.split(' ');
      expect(Number(k) / denom[name]).toBe(wholesOf[it.categoryId]);
    });
  });
});
