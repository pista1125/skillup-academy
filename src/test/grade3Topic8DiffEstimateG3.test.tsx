import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DiffEstimateG3Theory } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-becslese/DiffEstimateG3Theory';
import { DiffEstimateG3Quiz, DIFF_ESTIMATE_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-becslese/DiffEstimateG3Quiz';
import { DiffEstimateG3Matcher, DIFF_ESTIMATE_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-becslese/DiffEstimateG3Matcher';
import { DiffEstimateG3Sorter, DIFF_ESTIMATE_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-becslese/DiffEstimateG3Sorter';
import { RoundHundredsSvg, RoundTensSvg, CompareEstimatesSvg, EstimateStripSvg, ShopEstimateSvg, EstimateCheckSvg } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-becslese/DiffEstimateG3Figures';

describe('Grade 3 Topic VIII - 2. A különbség becslése - Components', () => {
  it('renders DiffEstimateG3Theory without throwing', () => {
    const { container } = render(<DiffEstimateG3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<DiffEstimateG3Theory />);
    expect(getAllByText(/VIII. ÍRÁSBELI KIVONÁS/).length).toBeGreaterThan(0);
  });

  it('renders DiffEstimateG3Quiz without throwing', () => {
    const { container } = render(<DiffEstimateG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(DIFF_ESTIMATE_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(DIFF_ESTIMATE_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(DIFF_ESTIMATE_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    DIFF_ESTIMATE_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = DIFF_ESTIMATE_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = DIFF_ESTIMATE_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders DiffEstimateG3Matcher without throwing', () => {
    const { container } = render(<DiffEstimateG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders DiffEstimateG3Sorter without throwing', () => {
    const { container } = render(<DiffEstimateG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RoundHundredsSvg, RoundTensSvg, CompareEstimatesSvg, EstimateStripSvg, ShopEstimateSvg, EstimateCheckSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
