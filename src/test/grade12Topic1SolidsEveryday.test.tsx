import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SolidsEverydayTheory } from '@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydayTheory';
import { SolidsEverydayQuiz } from '@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydayQuiz';
import { SolidsEverydayMatcher } from '@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydayMatcher';
import { SolidsEverydaySorter } from '@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydaySorter';
import {
  SolidsEverydayGateSvg,
  SolidsEverydayCakeSvg,
  SolidsEverydayCandleSvg,
  SolidsEverydayHatSvg,
  SolidsEverydayGearSvg,
  SolidsEverydayTankSvg
} from '@/components/math/grade-12/tergeometria/tergeometria-a-hetkoznapi-eletben/SolidsEverydayFigures';

describe('Grade 12 Topic I - 17. Térgeometria a hétköznapi életben - Components', () => {
  it('renders SolidsEverydayTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsEverydayTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsEverydayQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsEverydayQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsEverydayMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsEverydayMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsEverydaySorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsEverydaySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SolidsEverydayGateSvg, SolidsEverydayCakeSvg, SolidsEverydayCandleSvg, SolidsEverydayHatSvg, SolidsEverydayGearSvg, SolidsEverydayTankSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
