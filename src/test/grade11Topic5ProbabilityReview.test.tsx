import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ProbabilityReviewTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/valoszinuseg-ismetles/ProbabilityReviewTheory';
import { ProbabilityReviewQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/valoszinuseg-ismetles/ProbabilityReviewQuiz';
import { ProbabilityReviewMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/valoszinuseg-ismetles/ProbabilityReviewMatcher';
import { ProbabilityReviewSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/valoszinuseg-ismetles/ProbabilityReviewSorter';
import {
  ProbabilityReviewDieEventsSvg,
  ProbabilityReviewCarlsenPiesSvg,
  ProbabilityReviewProductTableSvg,
  ProbabilityReviewDivisorsVennSvg,
  ProbabilityReviewSeatsSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/valoszinuseg-ismetles/ProbabilityReviewFigures';

describe('Grade 11 Topic V - 7. Valószínűség – ismétlés - Components', () => {
  it('renders ProbabilityReviewTheory and runs the simulator', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<ProbabilityReviewTheory />);
    expect(container).toBeTruthy();
    fireEvent.click(getAllByText('+100 dobás')[0]);
    expect(container.textContent).toContain('kísérletek száma: 100');
  });

  it('renders ProbabilityReviewQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityReviewQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityReviewMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityReviewMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityReviewSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityReviewSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ProbabilityReviewDieEventsSvg,
      ProbabilityReviewCarlsenPiesSvg,
      ProbabilityReviewProductTableSvg,
      ProbabilityReviewDivisorsVennSvg,
      ProbabilityReviewSeatsSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
