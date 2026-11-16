import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AlgebraSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/algebra/AlgebraSummaryTheory';
import { AlgebraSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/algebra/AlgebraSummaryQuiz';
import { AlgebraSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/algebra/AlgebraSummaryMatcher';
import { AlgebraSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/algebra/AlgebraSummarySorter';
import {
  SquareIdentitySvg,
  FactoringSvg,
  ParabolaSignSvg,
  RootEquationSvg,
  LinearSystemSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/algebra/AlgebraSummaryFigures';

describe("Grade 12 Topic IV - 4. Algebra - Components", () => {
  it('renders AlgebraSummaryTheory without throwing', () => {
    const { container } = render(<AlgebraSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders AlgebraSummaryQuiz without throwing', () => {
    const { container } = render(<AlgebraSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders AlgebraSummaryMatcher without throwing', () => {
    const { container } = render(<AlgebraSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders AlgebraSummarySorter without throwing', () => {
    const { container } = render(<AlgebraSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SquareIdentitySvg, FactoringSvg, ParabolaSignSvg, RootEquationSvg, LinearSystemSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
