import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ProductEstimateG3Theory } from '@/components/math/grade-3/irasbeli-szorzas/a-szorzat-becslese/ProductEstimateG3Theory';
import { ProductEstimateG3Quiz, PRODUCT_ESTIMATE_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-szorzas/a-szorzat-becslese/ProductEstimateG3Quiz';
import { ProductEstimateG3Matcher, PRODUCT_ESTIMATE_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/a-szorzat-becslese/ProductEstimateG3Matcher';
import { ProductEstimateG3Sorter, PRODUCT_ESTIMATE_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/a-szorzat-becslese/ProductEstimateG3Sorter';
import { roundTo, roundH, roundT } from '@/components/math/grade-3/irasbeli-szorzas/a-szorzat-becslese/ProductEstimateG3Parts';
import {
  RoundLinesSvg,
  TwoEstimatesSvg,
  UpDownSvg,
  EnoughMoneySvg
} from '@/components/math/grade-3/irasbeli-szorzas/a-szorzat-becslese/ProductEstimateG3Figures';

describe('Grade 3 Topic XIII - 2. A szorzat becslése', () => {
  it('renders ProductEstimateG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<ProductEstimateG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders ProductEstimateG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProductEstimateG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(PRODUCT_ESTIMATE_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(PRODUCT_ESTIMATE_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    PRODUCT_ESTIMATE_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(PRODUCT_ESTIMATE_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(PRODUCT_ESTIMATE_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders ProductEstimateG3Matcher and ProductEstimateG3Sorter without throwing', () => {
    expect(render(<ProductEstimateG3Matcher />).container).toBeTruthy();
    expect(render(<ProductEstimateG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [RoundLinesSvg, TwoEstimatesSvg, UpDownSvg, EnoughMoneySvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(PRODUCT_ESTIMATE_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(PRODUCT_ESTIMATE_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(PRODUCT_ESTIMATE_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(PRODUCT_ESTIMATE_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(PRODUCT_ESTIMATE_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('rounds half up (5-től felfelé)', () => {
    expect(roundT(345)).toBe(350);
    expect(roundT(344)).toBe(340);
    expect(roundT(125)).toBe(130);
    expect(roundH(250)).toBe(300);
    expect(roundH(249)).toBe(200);
    expect(roundTo(187, 100)).toBe(200);
  });
});
