import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NegativeChangesTheory, wealth, tempDiff, sortTemps, ORDER_SETS, FABATKA_TARGETS } from '@/components/math/grade-4/negativ-szamok/osszehasonlitas-es-valtozasok/NegativeChangesTheory';
import { NegativeChangesQuiz, NEGATIVE_CHANGES_QUESTIONS } from '@/components/math/grade-4/negativ-szamok/osszehasonlitas-es-valtozasok/NegativeChangesQuiz';
import { NegativeChangesMatcher } from '@/components/math/grade-4/negativ-szamok/osszehasonlitas-es-valtozasok/NegativeChangesMatcher';
import { NegativeChangesSorter } from '@/components/math/grade-4/negativ-szamok/osszehasonlitas-es-valtozasok/NegativeChangesSorter';
import {
  CompareLineSvg,
  TempChangeSvg,
  FabatkaSvg,
  DebtSlipSvg,
  WealthChangeSvg,
  WEALTH_CHANGES
} from '@/components/math/grade-4/negativ-szamok/osszehasonlitas-es-valtozasok/NegativeChangesFigures';

describe('Grade 4 Topic IV - 3. Összehasonlítás és változások - Components', () => {
  it('renders NegativeChangesTheory without throwing', () => {
    const { container } = render(<NegativeChangesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NegativeChangesQuiz without throwing', () => {
    const { container } = render(<NegativeChangesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NegativeChangesMatcher without throwing', () => {
    const { container } = render(<NegativeChangesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NegativeChangesSorter without throwing', () => {
    const { container } = render(<NegativeChangesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CompareLineSvg, TempChangeSvg, FabatkaSvg, DebtSlipSvg, WealthChangeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge and 4 distinct options', () => {
    expect(NEGATIVE_CHANGES_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NEGATIVE_CHANGES_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(NEGATIVE_CHANGES_QUESTIONS.map((q) => q.id)).size).toBe(30);
    NEGATIVE_CHANGES_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
  });

  it('computes wealth, temperature changes and orderings like the book', () => {
    expect(wealth(7, 2)).toBe(5);
    expect(wealth(9, 10)).toBe(-1);
    expect(wealth(9, 13)).toBe(-4);
    expect(wealth(6, 3)).toBe(3);
    expect(tempDiff(-4, -19)).toBe(15);
    expect(tempDiff(-8, -36)).toBe(28);
    expect(tempDiff(-19, -45)).toBe(26);
    expect(tempDiff(-5, 2)).toBe(7);
    expect(tempDiff(-11, 3)).toBe(14);
    expect(sortTemps([-2, -7, -5, 0, -17, 13], 'asc')).toEqual([-17, -7, -5, -2, 0, 13]);
    expect(sortTemps([25, -4, 1, -8, 6, -10], 'desc')).toEqual([25, 6, 1, -4, -8, -10]);
    ORDER_SETS.forEach((s) => expect(new Set(s.list).size).toBe(s.list.length));
    expect(FABATKA_TARGETS.length).toBeGreaterThan(3);
    expect(WEALTH_CHANGES.map(([a, b]) => b - a)).toEqual([500, -700, -1500, -7500, 3500, -3500]);
  });
});
