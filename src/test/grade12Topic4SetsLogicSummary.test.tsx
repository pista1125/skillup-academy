import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SetsLogicSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/halmazok-logika/SetsLogicSummaryTheory';
import { SetsLogicSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/halmazok-logika/SetsLogicSummaryQuiz';
import { SetsLogicSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/halmazok-logika/SetsLogicSummaryMatcher';
import { SetsLogicSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/halmazok-logika/SetsLogicSummarySorter';
import {
  SubsetSvg,
  SetOperationsSvg,
  SieveFormulaSvg,
  MovieVennSvg,
  TruthTablesSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/halmazok-logika/SetsLogicSummaryFigures';

describe("Grade 12 Topic IV - 1. Halmazok, logika - Components", () => {
  it('renders SetsLogicSummaryTheory without throwing', () => {
    const { container } = render(<SetsLogicSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SetsLogicSummaryQuiz without throwing', () => {
    const { container } = render(<SetsLogicSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SetsLogicSummaryMatcher without throwing', () => {
    const { container } = render(<SetsLogicSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SetsLogicSummarySorter without throwing', () => {
    const { container } = render(<SetsLogicSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SubsetSvg, SetOperationsSvg, SieveFormulaSvg, MovieVennSvg, TruthTablesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
