import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ArithmeticSumTheory } from '@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumTheory';
import { ArithmeticSumQuiz } from '@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumQuiz';
import { ArithmeticSumMatcher } from '@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumMatcher';
import { ArithmeticSumSorter } from '@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumSorter';
import {
  PavingRowsSvg,
  GaussPairsSvg,
  ReverseSumSvg,
  CanPyramidSvg,
  StaircaseRectangleSvg
} from '@/components/math/grade-12/sorozatok/a-szamtani-sorozat-elso-n-tagjanak-osszege/ArithmeticSumFigures';

describe("Grade 12 Topic II - 4. A számtani sorozat első n tagjának összege - Components", () => {
  it('renders ArithmeticSumTheory without throwing', () => {
    const { container } = render(<ArithmeticSumTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSumQuiz without throwing', () => {
    const { container } = render(<ArithmeticSumQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSumMatcher without throwing', () => {
    const { container } = render(<ArithmeticSumMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSumSorter without throwing', () => {
    const { container } = render(<ArithmeticSumSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PavingRowsSvg, GaussPairsSvg, ReverseSumSvg, CanPyramidSvg, StaircaseRectangleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
