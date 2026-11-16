import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatProbSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/statisztika-valoszinusegszamitas/StatProbSummaryTheory';
import { StatProbSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/statisztika-valoszinusegszamitas/StatProbSummaryQuiz';
import { StatProbSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/statisztika-valoszinusegszamitas/StatProbSummaryMatcher';
import { StatProbSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/statisztika-valoszinusegszamitas/StatProbSummarySorter';
import {
  BoxPlotSvg,
  ClassHistogramSvg,
  DiceMaxTableSvg,
  SamplingCompareSvg,
  EventVennSvg,
  BinomialBarsSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/statisztika-valoszinusegszamitas/StatProbSummaryFigures';

describe("Grade 12 Topic IV - 10. Statisztika, valószínűségszámítás (összefoglalás) - Components", () => {
  it('renders StatProbSummaryTheory without throwing', () => {
    const { container } = render(<StatProbSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbSummaryQuiz without throwing', () => {
    const { container } = render(<StatProbSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbSummaryMatcher without throwing', () => {
    const { container } = render(<StatProbSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbSummarySorter without throwing', () => {
    const { container } = render(<StatProbSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [BoxPlotSvg, ClassHistogramSvg, DiceMaxTableSvg, SamplingCompareSvg, EventVennSvg, BinomialBarsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
