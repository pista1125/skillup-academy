import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionIntro4Theory, readPizza, CUTTER_TASKS, CUTTER_PARTS, ROD_CHOICES } from '@/components/math/grade-4/tortszamok/tortresz-tortek-ertelmezese/FractionIntro4Theory';
import { FractionIntro4Quiz, FRACTION_INTRO4_QUESTIONS } from '@/components/math/grade-4/tortszamok/tortresz-tortek-ertelmezese/FractionIntro4Quiz';
import { FractionIntro4Matcher, FRACTION_INTRO4_MATCHER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/tortresz-tortek-ertelmezese/FractionIntro4Matcher';
import { FractionIntro4Sorter, FRACTION_INTRO4_SORTER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/tortresz-tortek-ertelmezese/FractionIntro4Sorter';
import {
  FlagsSvg,
  FractionNamesSvg,
  EqualPartsSvg,
  NapkinFoldSvg,
  RectanglePartsSvg,
  ColourRodsSvg,
  BonbonShareSvg,
  fracWord,
  fracOfWord,
  ROD_COLORS
} from '@/components/math/grade-4/tortszamok/tortresz-tortek-ertelmezese/FractionIntro4Figures';

describe('Grade 4 Topic VIII - 1. A törtrész és a törtek értelmezése - Components', () => {
  it('renders FractionIntro4Theory without throwing', () => {
    const { container } = render(<FractionIntro4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders FractionIntro4Quiz without throwing', () => {
    const { container } = render(<FractionIntro4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders FractionIntro4Matcher without throwing', () => {
    const { container } = render(<FractionIntro4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders FractionIntro4Sorter without throwing', () => {
    const { container } = render(<FractionIntro4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FlagsSvg, FractionNamesSvg, EqualPartsSvg, NapkinFoldSvg, RectanglePartsSvg, ColourRodsSvg, BonbonShareSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge and 4 distinct options', () => {
    expect(FRACTION_INTRO4_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(FRACTION_INTRO4_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(FRACTION_INTRO4_QUESTIONS.map((q) => q.id)).size).toBe(30);
    FRACTION_INTRO4_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
    expect(FRACTION_INTRO4_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(12);
  });

  it('matcher has 3 × 8 unique pairs and sorter 3 × 3 categories × 9 items', () => {
    FRACTION_INTRO4_MATCHER_LEVELS_LIST.forEach((l) => {
      expect(l.pairs).toHaveLength(8);
      expect(new Set(l.pairs.map((p) => p.right)).size).toBe(8);
    });
    FRACTION_INTRO4_SORTER_LEVELS_LIST.forEach((l) => {
      expect(l.categories).toHaveLength(3);
      expect(l.items).toHaveLength(9);
      l.categories.forEach((c) => expect(l.items.filter((i) => i.categoryId === c.id)).toHaveLength(3));
    });
  });

  it('uses the textbook words for fractions and consistent rod lengths', () => {
    expect(fracWord(3, 4)).toBe('3 negyed');
    expect(fracOfWord(1, 3)).toBe('1 harmada');
    expect(readPizza(1, 2)).toBe('fél pizza (1 ketted)');
    expect(readPizza(4, 4)).toBe('4 negyed = 1 egész pizza');
    CUTTER_TASKS.forEach((t) => expect(CUTTER_PARTS).toContain(t.parts));
    // zöld = 2 lila = 3 piros = 4 világoskék = 6 rózsaszín = 12 fehér; bordó = 4 rózsaszín
    expect(ROD_COLORS.zöld.len).toBe(2 * ROD_COLORS.lila.len);
    expect(ROD_COLORS.zöld.len).toBe(3 * ROD_COLORS.piros.len);
    expect(ROD_COLORS.zöld.len).toBe(4 * ROD_COLORS.világoskék.len);
    expect(ROD_COLORS.bordó.len).toBe(4 * ROD_COLORS.rózsaszín.len);
    expect(ROD_CHOICES).toHaveLength(6);
  });
});
