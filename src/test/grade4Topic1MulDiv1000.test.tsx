import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulDiv1000Theory, multSteps } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-1000-ig/MulDiv1000Theory';
import { MulDiv1000Quiz } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-1000-ig/MulDiv1000Quiz';
import { MulDiv1000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-1000-ig/MulDiv1000Matcher';
import { MulDiv1000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-1000-ig/MulDiv1000Sorter';
import {
  LadybugLegsSvg,
  RemainderFlowerSvg,
  RoundTensSvg,
  WrittenMultSvg,
  CoinsSvg,
  TrainDivisionSvg
} from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-1000-ig/MulDiv1000Figures';

describe('Grade 4 Topic I - 3. Szorzás és osztás 1000-ig - Components', () => {
  it('renders MulDiv1000Theory without throwing', () => {
    const { container } = render(<MulDiv1000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv1000Quiz without throwing', () => {
    const { container } = render(<MulDiv1000Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv1000Matcher without throwing', () => {
    const { container } = render(<MulDiv1000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv1000Sorter without throwing', () => {
    const { container } = render(<MulDiv1000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LadybugLegsSvg, RemainderFlowerSvg, RoundTensSvg, WrittenMultSvg, CoinsSvg, TrainDivisionSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes written multiplication digits correctly', () => {
    expect(multSteps(214, 3).map((s) => s.digit)).toEqual([2, 4, 6]);
    expect(multSteps(148, 6).map((s) => s.digit)).toEqual([8, 8, 8]);
    expect(multSteps(92, 7).map((s) => s.digit)).toEqual([4, 4, 6]);
  });
});
