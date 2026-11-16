import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulTwoDigitTheory, roundTensSteps } from '@/components/math/grade-4/irasbeli-szorzas/szorzas-ketjegyu-szorzoval/MulTwoDigitTheory';
import { MulTwoDigitQuiz } from '@/components/math/grade-4/irasbeli-szorzas/szorzas-ketjegyu-szorzoval/MulTwoDigitQuiz';
import { MulTwoDigitMatcher } from '@/components/math/grade-4/irasbeli-szorzas/szorzas-ketjegyu-szorzoval/MulTwoDigitMatcher';
import { MulTwoDigitSorter } from '@/components/math/grade-4/irasbeli-szorzas/szorzas-ketjegyu-szorzoval/MulTwoDigitSorter';
import {
  CoinGroupsSvg,
  TimesTenTableSvg,
  FactorChainSvg,
  RoundTensSvg,
  SplitMulSvg
} from '@/components/math/grade-4/irasbeli-szorzas/szorzas-ketjegyu-szorzoval/MulTwoDigitFigures';

describe('Grade 4 Topic VII - 1. Szorzás kétjegyű szorzóval - Components', () => {
  it('renders MulTwoDigitTheory without throwing', () => {
    const { container } = render(<MulTwoDigitTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MulTwoDigitQuiz without throwing', () => {
    const { container } = render(<MulTwoDigitQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MulTwoDigitMatcher without throwing', () => {
    const { container } = render(<MulTwoDigitMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MulTwoDigitSorter without throwing', () => {
    const { container } = render(<MulTwoDigitSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CoinGroupsSvg, TimesTenTableSvg, FactorChainSvg, RoundTensSvg, SplitMulSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes multiplication by round tens correctly', () => {
    expect(roundTensSteps(23, 50)).toEqual({ d: 5, first: 115, product: 1150 });
    expect(roundTensSteps(43, 40).product).toBe(1720);
    expect(roundTensSteps(130, 60).product).toBe(7800);
  });
});
