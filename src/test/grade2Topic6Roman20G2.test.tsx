import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Roman20G2Theory } from '@/components/math/grade-2/romai-szamok/romai-szamok-11-20-ig/Roman20G2Theory';
import { Roman20G2Quiz, ROMAN20_G2_QUESTIONS } from '@/components/math/grade-2/romai-szamok/romai-szamok-11-20-ig/Roman20G2Quiz';
import { Roman20G2Matcher, ROMAN20_G2_MATCHER_LEVELS } from '@/components/math/grade-2/romai-szamok/romai-szamok-11-20-ig/Roman20G2Matcher';
import { Roman20G2Sorter, ROMAN20_G2_SORTER_LEVELS } from '@/components/math/grade-2/romai-szamok/romai-szamok-11-20-ig/Roman20G2Sorter';
import {
  TenPlusPatternSvg,
  XPlusSticksSvg,
  RomanLine20Svg,
  CompareTwentySvg,
  ClockElevenTwelveSvg
} from '@/components/math/grade-2/romai-szamok/romai-szamok-11-20-ig/Roman20G2Figures';
import { makeLineTarget, makeOrderTask } from '@/components/math/grade-2/romai-szamok/romai-szamok-11-20-ig/Roman20G2Parts';
import { toRoman } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Parts';

describe('Grade 2 Topic VI - 3. Római számok 11-től 20-ig - Components', () => {
  it('renders Roman20G2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Roman20G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Roman20G2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Roman20G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(ROMAN20_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROMAN20_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROMAN20_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      // csak I, V, X jelek
      q.options.forEach((o) => {
        if (/^[IVXLCDM]+$/.test(String(o))) expect(String(o)).toMatch(/^[IVX]+$/);
      });
    });
    expect(new Set(ROMAN20_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(ROMAN20_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('lab tasks stay in 1–20', () => {
    for (let i = 0; i < 200; i++) {
      const t = makeLineTarget(i % 20);
      expect(t).toBeGreaterThanOrEqual(1);
      expect(t).toBeLessThanOrEqual(20);
      expect(toRoman(t)).toMatch(/^[IVX]+$/);
      const cards = makeOrderTask();
      expect(cards).toHaveLength(4);
      expect(new Set(cards).size).toBe(4);
      cards.forEach((c) => {
        expect(c).toBeGreaterThanOrEqual(1);
        expect(c).toBeLessThanOrEqual(20);
      });
    }
  });

  it('renders Roman20G2Matcher without throwing', () => {
    const { container } = render(<Roman20G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Roman20G2Sorter without throwing', () => {
    const { container } = render(<Roman20G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [TenPlusPatternSvg, XPlusSticksSvg, RomanLine20Svg, CompareTwentySvg, ClockElevenTwelveSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = ROMAN20_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = ROMAN20_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
