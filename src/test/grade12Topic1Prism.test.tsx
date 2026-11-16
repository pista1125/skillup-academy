import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PrismTheory } from '@/components/math/grade-12/tergeometria/a-hasab/PrismTheory';
import { PrismQuiz } from '@/components/math/grade-12/tergeometria/a-hasab/PrismQuiz';
import { PrismMatcher } from '@/components/math/grade-12/tergeometria/a-hasab/PrismMatcher';
import { PrismSorter } from '@/components/math/grade-12/tergeometria/a-hasab/PrismSorter';
import {
  RubikOctaPrismSvg,
  PrismAnatomySvg,
  PrismTypesSvg,
  HexPrismDiagonalsSvg,
  TriPrismBillboardSvg
} from '@/components/math/grade-12/tergeometria/a-hasab/PrismFigures';

describe('Grade 12 Topic I - 2. A hasáb - Components', () => {
  it('renders PrismTheory without throwing', () => {
    const { container } = render(<PrismTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PrismQuiz without throwing', () => {
    const { container } = render(<PrismQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PrismMatcher without throwing', () => {
    const { container } = render(<PrismMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PrismSorter without throwing', () => {
    const { container } = render(<PrismSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RubikOctaPrismSvg, PrismAnatomySvg, PrismTypesSvg, HexPrismDiagonalsSvg, TriPrismBillboardSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
