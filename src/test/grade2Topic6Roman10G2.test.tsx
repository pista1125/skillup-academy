import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Roman10G2Theory } from '@/components/math/grade-2/romai-szamok/romai-szamok-0-10-ig/Roman10G2Theory';
import { Roman10G2Quiz, ROMAN10_G2_QUESTIONS } from '@/components/math/grade-2/romai-szamok/romai-szamok-0-10-ig/Roman10G2Quiz';
import { Roman10G2Matcher, ROMAN10_G2_MATCHER_LEVELS } from '@/components/math/grade-2/romai-szamok/romai-szamok-0-10-ig/Roman10G2Matcher';
import { Roman10G2Sorter, ROMAN10_G2_SORTER_LEVELS } from '@/components/math/grade-2/romai-szamok/romai-szamok-0-10-ig/Roman10G2Sorter';
import {
  Roman1To10TableSvg,
  FiveFamilySvg,
  OneMissingSvg,
  RomanLine10Svg,
  RomanClockSevenSvg
} from '@/components/math/grade-2/romai-szamok/romai-szamok-0-10-ig/Roman10G2Figures';
import { makeConvertTask } from '@/components/math/grade-2/romai-szamok/romai-szamok-0-10-ig/Roman10G2Parts';
import { toRoman } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Parts';

describe('Grade 2 Topic VI - 2. Római számok 1-től 10-ig - Components', () => {
  it('renders Roman10G2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Roman10G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Roman10G2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Roman10G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(ROMAN10_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROMAN10_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROMAN10_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      // csak I, V, X jelek
      q.options.forEach((o) => {
        if (/^[IVXLCDM]+$/.test(String(o))) expect(String(o)).toMatch(/^[IVX]+$/);
      });
    });
    expect(new Set(ROMAN10_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(ROMAN10_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('converter lab tasks stay in 1–10 with 4 distinct options and one right answer', () => {
    for (let i = 0; i < 200; i++) {
      const t = makeConvertTask(1, 10);
      expect(t.n).toBeGreaterThanOrEqual(1);
      expect(t.n).toBeLessThanOrEqual(10);
      expect(t.options).toHaveLength(4);
      expect(new Set(t.options).size).toBe(4);
      const right = t.dir === 'toRoman' ? toRoman(t.n) : String(t.n);
      expect(t.options.filter((o) => o === right)).toHaveLength(1);
    }
  });

  it('renders Roman10G2Matcher without throwing', () => {
    const { container } = render(<Roman10G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Roman10G2Sorter without throwing', () => {
    const { container } = render(<Roman10G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [Roman1To10TableSvg, FiveFamilySvg, OneMissingSvg, RomanLine10Svg, RomanClockSevenSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = ROMAN10_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = ROMAN10_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
