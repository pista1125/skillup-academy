import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Mult10G2Theory } from '@/components/math/grade-2/szorzas/szorzas-10-zel/Mult10G2Theory';
import { Mult10G2Quiz, MULT10_G2_QUESTIONS } from '@/components/math/grade-2/szorzas/szorzas-10-zel/Mult10G2Quiz';
import { Mult10G2Matcher, MULT10_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szorzas/szorzas-10-zel/Mult10G2Matcher';
import { Mult10G2Sorter, MULT10_G2_SORTER_LEVELS } from '@/components/math/grade-2/szorzas/szorzas-10-zel/Mult10G2Sorter';
import {
  TenRodsSvg,
  TenJumpsSvg,
  FiveTenLinkSvg,
  CoinsTenSvg,
  EggBoxesSvg,
} from '@/components/math/grade-2/szorzas/szorzas-10-zel/Mult10G2Figures';

describe('Grade 2 Topic IV - 9. Szorzás 10-zel - Components', () => {
  it('renders Mult10G2Theory without throwing', () => {
    const { container } = render(<Mult10G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Mult10G2Quiz without throwing', () => {
    const { container } = render(<Mult10G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(MULT10_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MULT10_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MULT10_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MULT10_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(MULT10_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders Mult10G2Matcher without throwing', () => {
    const { container } = render(<Mult10G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Mult10G2Sorter without throwing', () => {
    const { container } = render(<Mult10G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TenRodsSvg, TenJumpsSvg, FiveTenLinkSvg, CoinsTenSvg, EggBoxesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('renders every quiz figure without throwing', () => {
    MULT10_G2_QUESTIONS.filter((q) => q.figure).forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = MULT10_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);

      const items = MULT10_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
