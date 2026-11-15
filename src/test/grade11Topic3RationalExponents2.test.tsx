import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RationalExponents2Theory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Theory';
import { RationalExponents2Quiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Quiz';
import { RationalExponents2Matcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Matcher';
import { RationalExponents2Sorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Sorter';
import {
  PopulationTwoThirdsSvg,
  TwoPathsSvg,
  NegativeFractionalSvg,
  IdentityTableSvg,
  RootIndexReduceSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-2/RationalExponents2Figures';

describe('Grade 11 Topic III - 4. Racionális számok a kitevőben II. - Components', () => {
  it('renders RationalExponents2Theory without throwing', () => {
    const { container } = render(<RationalExponents2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RationalExponents2Quiz without throwing', () => {
    const { container } = render(<RationalExponents2Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders RationalExponents2Matcher without throwing', () => {
    const { container } = render(<RationalExponents2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RationalExponents2Sorter without throwing', () => {
    const { container } = render(<RationalExponents2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PopulationTwoThirdsSvg, TwoPathsSvg, NegativeFractionalSvg, IdentityTableSvg, RootIndexReduceSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
