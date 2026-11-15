import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { BinomialCoefficientsTheory } from '@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsTheory';
import { BinomialCoefficientsQuiz } from '@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsQuiz';
import { BinomialCoefficientsMatcher } from '@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsMatcher';
import { BinomialCoefficientsSorter } from '@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsSorter';
import {
  ScarfPatternSvg,
  TwoColorRowSvg,
  CircleChordsSvg,
  SubsetCountsSvg,
  MuseumVisitorsSvg
} from '@/components/math/grade-11/kombinatorika-grafok/binomialis-egyutthatok/BinomialCoefficientsFigures';

describe('Grade 11 Topic II - 19. Binomiális együtthatók - Components', () => {
  it('renders BinomialCoefficientsTheory without throwing', () => {
    const { container } = render(<BinomialCoefficientsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders BinomialCoefficientsQuiz without throwing', () => {
    const { container } = render(<BinomialCoefficientsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders BinomialCoefficientsMatcher without throwing', () => {
    const { container } = render(<BinomialCoefficientsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders BinomialCoefficientsSorter without throwing', () => {
    const { container } = render(<BinomialCoefficientsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ScarfPatternSvg, TwoColorRowSvg, CircleChordsSvg, SubsetCountsSvg, MuseumVisitorsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
