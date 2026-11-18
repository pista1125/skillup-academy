import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Mult4G2Theory } from '@/components/math/grade-2/szorzas/szorzas-4-gyel/Mult4G2Theory';
import { Mult4G2Quiz, MULT4_G2_QUESTIONS } from '@/components/math/grade-2/szorzas/szorzas-4-gyel/Mult4G2Quiz';
import { Mult4G2Matcher, MULT4_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szorzas/szorzas-4-gyel/Mult4G2Matcher';
import { Mult4G2Sorter, MULT4_G2_SORTER_LEVELS } from '@/components/math/grade-2/szorzas/szorzas-4-gyel/Mult4G2Sorter';
import {
  CloverGroupsSvg,
  FourTableArraySvg,
  KangarooFrogLineSvg,
  DoubleDoubleSvg,
  CommuteArraySvg,
} from '@/components/math/grade-2/szorzas/szorzas-4-gyel/Mult4G2Figures';

describe('Grade 2 Topic IV - 3. Szorzás 4-gyel - Components', () => {
  it('renders Mult4G2Theory without throwing', () => {
    const { container } = render(<Mult4G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Mult4G2Quiz without throwing', () => {
    const { container } = render(<Mult4G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(MULT4_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MULT4_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MULT4_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      expect(String(q.question)).not.toContain(':');
    });
    expect(new Set(MULT4_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(MULT4_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders Mult4G2Matcher without throwing', () => {
    const { container } = render(<Mult4G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Mult4G2Sorter without throwing', () => {
    const { container } = render(<Mult4G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CloverGroupsSvg, FourTableArraySvg, KangarooFrogLineSvg, DoubleDoubleSvg, CommuteArraySvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = MULT4_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = MULT4_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
