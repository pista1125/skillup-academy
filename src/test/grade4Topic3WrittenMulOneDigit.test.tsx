import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenMulOneDigitTheory, mulSteps } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-szorzas-egyjegyu-szammal/WrittenMulOneDigitTheory';
import { WrittenMulOneDigitQuiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-szorzas-egyjegyu-szammal/WrittenMulOneDigitQuiz';
import { WrittenMulOneDigitMatcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-szorzas-egyjegyu-szammal/WrittenMulOneDigitMatcher';
import { WrittenMulOneDigitSorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-szorzas-egyjegyu-szammal/WrittenMulOneDigitSorter';
import {
  MulStepsSvg,
  MulCarrySvg,
  PlaceValueMulSvg,
  MulCheckSvg,
  FunicularPricesSvg
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-szorzas-egyjegyu-szammal/WrittenMulOneDigitFigures';

describe('Grade 4 Topic III - 2. Írásbeli szorzás egyjegyű számmal - Components', () => {
  it('renders WrittenMulOneDigitTheory without throwing', () => {
    const { container } = render(<WrittenMulOneDigitTheory />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMulOneDigitQuiz without throwing', () => {
    const { container } = render(<WrittenMulOneDigitQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMulOneDigitMatcher without throwing', () => {
    const { container } = render(<WrittenMulOneDigitMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMulOneDigitSorter without throwing', () => {
    const { container } = render(<WrittenMulOneDigitSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MulStepsSvg, MulCarrySvg, PlaceValueMulSvg, MulCheckSvg, FunicularPricesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes written multiplication digits and carries correctly', () => {
    expect(mulSteps(1623, 2).map((s) => s.digit)).toEqual([6, 4, 2, 3]);
    expect(mulSteps(2549, 3).map((s) => s.digit)).toEqual([7, 4, 6, 7]);
    expect(mulSteps(2549, 3).map((s) => s.carryOut)).toEqual([2, 1, 1, 0]);
    expect(mulSteps(1356, 6).map((s) => s.digit)).toEqual([6, 3, 1, 8]);
  });
});
