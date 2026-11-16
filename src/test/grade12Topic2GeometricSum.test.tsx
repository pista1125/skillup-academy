import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GeometricSumTheory } from '@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumTheory';
import { GeometricSumQuiz } from '@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumQuiz';
import { GeometricSumMatcher } from '@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumMatcher';
import { GeometricSumSorter } from '@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumSorter';
import {
  EpidemicBarsSvg,
  SumDerivationSvg,
  ChessboardWheatSvg,
  FamilyTreeSvg,
  ScarfGrowthSvg
} from '@/components/math/grade-12/sorozatok/a-mertani-sorozat-elso-n-tagjanak-osszege/GeometricSumFigures';

describe('Grade 12 Topic II - 6. A mértani sorozat első n tagjának összege - Components', () => {
  it('renders GeometricSumTheory without throwing', () => {
    const { container } = render(<GeometricSumTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricSumQuiz without throwing', () => {
    const { container } = render(<GeometricSumQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricSumMatcher without throwing', () => {
    const { container } = render(<GeometricSumMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricSumSorter without throwing', () => {
    const { container } = render(<GeometricSumSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [EpidemicBarsSvg, SumDerivationSvg, ChessboardWheatSvg, FamilyTreeSvg, ScarfGrowthSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
