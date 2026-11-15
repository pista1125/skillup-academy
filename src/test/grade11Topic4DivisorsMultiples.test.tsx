import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { G11DivisorsMultiplesTheory } from '@/components/math/grade-11/szamelmelet/oszto-tobbszoros/G11DivisorsMultiplesTheory';
import { G11DivisorsMultiplesQuiz } from '@/components/math/grade-11/szamelmelet/oszto-tobbszoros/G11DivisorsMultiplesQuiz';
import { G11DivisorsMultiplesMatcher } from '@/components/math/grade-11/szamelmelet/oszto-tobbszoros/G11DivisorsMultiplesMatcher';
import { G11DivisorsMultiplesSorter } from '@/components/math/grade-11/szamelmelet/oszto-tobbszoros/G11DivisorsMultiplesSorter';
import {
  DivisorPairsSvg,
  FactorTreeSvg,
  DivisionLadderSvg,
  DivisorCountBarsSvg,
  PrimeTestSvg
} from '@/components/math/grade-11/szamelmelet/oszto-tobbszoros/G11DivisorsMultiplesFigures';

describe('Grade 11 Topic IV - 43. Osztó, többszörös - Components', () => {
  it('renders G11DivisorsMultiplesTheory without throwing', () => {
    const { container } = render(<G11DivisorsMultiplesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders G11DivisorsMultiplesQuiz without throwing', () => {
    const { container } = render(<G11DivisorsMultiplesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders G11DivisorsMultiplesMatcher without throwing', () => {
    const { container } = render(<G11DivisorsMultiplesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders G11DivisorsMultiplesSorter without throwing', () => {
    const { container } = render(<G11DivisorsMultiplesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DivisorPairsSvg, FactorTreeSvg, DivisionLadderSvg, DivisorCountBarsSvg, PrimeTestSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
