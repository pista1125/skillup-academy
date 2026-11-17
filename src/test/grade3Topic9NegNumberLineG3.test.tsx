import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NegNumberLineG3Theory } from '@/components/math/grade-3/negativ-szamok/szamegyenes-es-a-nulla/NegNumberLineG3Theory';
import { NegNumberLineG3Quiz, NEG_NUMBERLINE_G3_QUESTIONS } from '@/components/math/grade-3/negativ-szamok/szamegyenes-es-a-nulla/NegNumberLineG3Quiz';
import { NegNumberLineG3Matcher, NEG_NUMBERLINE_G3_MATCHER_LEVELS } from '@/components/math/grade-3/negativ-szamok/szamegyenes-es-a-nulla/NegNumberLineG3Matcher';
import { NegNumberLineG3Sorter, NEG_NUMBERLINE_G3_SORTER_LEVELS } from '@/components/math/grade-3/negativ-szamok/szamegyenes-es-a-nulla/NegNumberLineG3Sorter';
import { TwoSidesSvg, StepsFromZeroSvg, ThermoIsLineSvg, SameDistanceSvg, ReadBetweenSvg } from '@/components/math/grade-3/negativ-szamok/szamegyenes-es-a-nulla/NegNumberLineG3Figures';
import { fmt, fmtC } from '@/components/math/grade-3/negativ-szamok/szamegyenes-es-a-nulla/NegNumberLineG3Parts';

describe('Grade 3 Topic IX - 2. A számegyenes és a nulla - Components', () => {
  it('renders NegNumberLineG3Theory without throwing', () => {
    const { container } = render(<NegNumberLineG3Theory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG');
  });

  it('renders NegNumberLineG3Quiz without throwing', () => {
    const { container } = render(<NegNumberLineG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(NEG_NUMBERLINE_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NEG_NUMBERLINE_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    NEG_NUMBERLINE_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(NEG_NUMBERLINE_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('uses the textbook minus sign (en dash), never a hyphen before a number', () => {
    NEG_NUMBERLINE_G3_QUESTIONS.forEach((q) => {
      [q.question, q.explanation, ...q.options.map(String)].forEach((s) => expect(String(s)).not.toMatch(/(^|\s)-\d/));
    });
    expect(fmt(-3)).toBe('–3');
    expect(fmtC(-3)).toBe('–3 °C');
    expect(fmt(0)).toBe('0');
  });

  it('matcher has 3 levels x 8 pairs with distinct values, sorter 3 levels x 3 categories x 9 items', () => {
    [1, 2, 3].forEach((l) => {
      const m = NEG_NUMBERLINE_G3_MATCHER_LEVELS[l as 1 | 2 | 3];
      expect(m.pairs).toHaveLength(8);
      const rights = m.pairs.map((p: any) => p.right).filter((r: any) => r);
      expect(new Set(rights).size).toBe(rights.length);
      expect(m.pairs.filter((p: any) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const s = NEG_NUMBERLINE_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => {
        const its = s.items.filter((it: any) => it.categoryId === c.id);
        expect(its).toHaveLength(9);
        expect(its.filter((it: any) => it.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('renders NegNumberLineG3Matcher without throwing', () => {
    const { container } = render(<NegNumberLineG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders NegNumberLineG3Sorter without throwing', () => {
    const { container } = render(<NegNumberLineG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TwoSidesSvg, StepsFromZeroSvg, ThermoIsLineSvg, SameDistanceSvg, ReadBetweenSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
