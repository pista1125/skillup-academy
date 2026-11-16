import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CombinatoricsGraphsSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/kombinatorika-grafok/CombinatoricsGraphsSummaryTheory';
import { CombinatoricsGraphsSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/kombinatorika-grafok/CombinatoricsGraphsSummaryQuiz';
import { CombinatoricsGraphsSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/kombinatorika-grafok/CombinatoricsGraphsSummaryMatcher';
import { CombinatoricsGraphsSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/kombinatorika-grafok/CombinatoricsGraphsSummarySorter';
import {
  CountingBoxesSvg,
  PascalTriangleSvg,
  HandshakeGraphSvg,
  DegreeSumSvg,
  DescendingDigitsSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/kombinatorika-grafok/CombinatoricsGraphsSummaryFigures';

describe("Grade 12 Topic IV - 2. Kombinatorika, gráfok - Components", () => {
  it('renders CombinatoricsGraphsSummaryTheory without throwing', () => {
    const { container } = render(<CombinatoricsGraphsSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsGraphsSummaryQuiz without throwing', () => {
    const { container } = render(<CombinatoricsGraphsSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsGraphsSummaryMatcher without throwing', () => {
    const { container } = render(<CombinatoricsGraphsSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsGraphsSummarySorter without throwing', () => {
    const { container } = render(<CombinatoricsGraphsSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CountingBoxesSvg, PascalTriangleSvg, HandshakeGraphSvg, DegreeSumSvg, DescendingDigitsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
