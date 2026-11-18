import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanIntroG2Theory } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Theory';
import { RomanIntroG2Quiz, ROMAN_INTRO_G2_QUESTIONS } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Quiz';
import { RomanIntroG2Matcher, ROMAN_INTRO_G2_MATCHER_LEVELS } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Matcher';
import { RomanIntroG2Sorter, ROMAN_INTRO_G2_SORTER_LEVELS } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Sorter';
import {
  WhereWeMeetRomanSvg,
  ThreeSignsSticksSvg,
  MaxThreeSignsSvg,
  LeftRightRuleSvg,
  NoZeroRomanSvg
} from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Figures';
import {
  toRoman,
  fromRoman,
  isValidRoman,
  romanProblem,
  makeLeftRightTask
} from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Parts';

describe('Grade 2 Topic VI - 1. Római számok értelmezése - Components', () => {
  it('renders RomanIntroG2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanIntroG2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RomanIntroG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanIntroG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(ROMAN_INTRO_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROMAN_INTRO_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROMAN_INTRO_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      // csak I, V, X jelek
      q.options.forEach((o) => {
        if (/^[IVXLCDM]+$/.test(String(o))) expect(String(o)).toMatch(/^[IVX]+$/);
      });
    });
    expect(new Set(ROMAN_INTRO_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(ROMAN_INTRO_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('roman helpers work for 1–20 only', () => {
    for (let n = 1; n <= 20; n++) {
      expect(fromRoman(toRoman(n))).toBe(n);
      expect(toRoman(n)).toMatch(/^[IVX]+$/);
    }
    expect(toRoman(0)).toBe('');
    expect(toRoman(21)).toBe('');
    ['IIII', 'VV', 'IIX', 'VX', 'XXX', 'IXI'].forEach((s) => {
      expect(isValidRoman(s)).toBe(false);
      expect(romanProblem(s)).toBeTruthy();
    });
    for (let i = 0; i < 100; i++) {
      const t = makeLeftRightTask();
      expect(t.target).toBeGreaterThanOrEqual(1);
      expect(t.target).toBeLessThanOrEqual(20);
    }
  });

  it('renders RomanIntroG2Matcher without throwing', () => {
    const { container } = render(<RomanIntroG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanIntroG2Sorter without throwing', () => {
    const { container } = render(<RomanIntroG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [WhereWeMeetRomanSvg, ThreeSignsSticksSvg, MaxThreeSignsSvg, LeftRightRuleSvg, NoZeroRomanSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = ROMAN_INTRO_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = ROMAN_INTRO_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
