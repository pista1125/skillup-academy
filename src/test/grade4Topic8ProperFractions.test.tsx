import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ProperFractionsTheory, readParts, STRIP_TASKS, STRIP_PARTS, BEAD_TASKS } from '@/components/math/grade-4/tortszamok/egynel-kisebb-tortek/ProperFractionsTheory';
import { ProperFractionsQuiz, PROPER_FRACTIONS_QUESTIONS } from '@/components/math/grade-4/tortszamok/egynel-kisebb-tortek/ProperFractionsQuiz';
import { ProperFractionsMatcher, PROPER_FRACTIONS_MATCHER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/egynel-kisebb-tortek/ProperFractionsMatcher';
import { ProperFractionsSorter, PROPER_FRACTIONS_SORTER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/egynel-kisebb-tortek/ProperFractionsSorter';
import {
  ThreeQuartersSvg,
  GridColorsSvg,
  CupsSvg,
  CountryFlagsSvg,
  BeadsSvg,
  ArcherySvg,
  CheeseSvg,
  ParkingSvg,
  ARCHERY_HITS,
  PARKING
} from '@/components/math/grade-4/tortszamok/egynel-kisebb-tortek/ProperFractionsFigures';

describe('Grade 4 Topic VIII - 2. Egynél kisebb törtek - Components', () => {
  it('renders ProperFractionsTheory without throwing', () => {
    const { container } = render(<ProperFractionsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ProperFractionsQuiz without throwing', () => {
    const { container } = render(<ProperFractionsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ProperFractionsMatcher without throwing', () => {
    const { container } = render(<ProperFractionsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ProperFractionsSorter without throwing', () => {
    const { container } = render(<ProperFractionsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ThreeQuartersSvg, GridColorsSvg, CupsSvg, CountryFlagsSvg, BeadsSvg, ArcherySvg, CheeseSvg, ParkingSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge and 4 distinct options', () => {
    expect(PROPER_FRACTIONS_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(PROPER_FRACTIONS_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(PROPER_FRACTIONS_QUESTIONS.map((q) => q.id)).size).toBe(30);
    PROPER_FRACTIONS_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
    expect(PROPER_FRACTIONS_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(12);
  });

  it('matcher has 3 × 8 unique pairs and sorter 3 × 3 categories × 9 items', () => {
    PROPER_FRACTIONS_MATCHER_LEVELS_LIST.forEach((l) => {
      expect(l.pairs).toHaveLength(8);
      expect(new Set(l.pairs.map((p) => p.right)).size).toBe(8);
    });
    PROPER_FRACTIONS_SORTER_LEVELS_LIST.forEach((l) => {
      expect(l.categories).toHaveLength(3);
      expect(l.items).toHaveLength(9);
      l.categories.forEach((c) => expect(l.items.filter((i) => i.categoryId === c.id)).toHaveLength(3));
    });
  });

  it('reads coloured and white parts, data match the textbook tasks', () => {
    expect(readParts(3, 4)).toEqual({ colored: '3 negyed', white: '1 negyed' });
    expect(readParts(0, 5)).toEqual({ colored: 'semmi', white: '5 ötöd' });
    STRIP_TASKS.forEach((t) => {
      expect(STRIP_PARTS).toContain(t.parts);
      expect(t.colored).toBeLessThan(t.parts);
    });
    BEAD_TASKS.forEach((t) => expect(t.red).toBeLessThan(t.n));
    // céltábla: 10 lövés, 2 mellé (a tábla sugara 66)
    expect(ARCHERY_HITS).toHaveLength(10);
    expect(ARCHERY_HITS.filter(([x, y]) => Math.hypot(x, y) > 66)).toHaveLength(2);
    expect(ARCHERY_HITS.filter(([x, y]) => Math.hypot(x, y) > 66 * 0.72 && Math.hypot(x, y) <= 66)).toHaveLength(3);
    // parkoló: 12 autó
    expect(PARKING).toHaveLength(12);
  });
});
