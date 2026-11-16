import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ArithmeticSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/szamtan/ArithmeticSummaryTheory';
import { ArithmeticSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/szamtan/ArithmeticSummaryQuiz';
import { ArithmeticSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/szamtan/ArithmeticSummaryMatcher';
import { ArithmeticSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/szamtan/ArithmeticSummarySorter';
import {
  NumberSetsSvg,
  IntervalsSvg,
  GcdLcmSvg,
  PowerRootLogSvg,
  NumberBaseSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/szamtan/ArithmeticSummaryFigures';

describe("Grade 12 Topic IV - 3. Számtan - Components", () => {
  it('renders ArithmeticSummaryTheory without throwing', () => {
    const { container } = render(<ArithmeticSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSummaryQuiz without throwing', () => {
    const { container } = render(<ArithmeticSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSummaryMatcher without throwing', () => {
    const { container } = render(<ArithmeticSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSummarySorter without throwing', () => {
    const { container } = render(<ArithmeticSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NumberSetsSvg, IntervalsSvg, GcdLcmSvg, PowerRootLogSvg, NumberBaseSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
