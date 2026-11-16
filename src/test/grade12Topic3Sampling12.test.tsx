import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Sampling12Theory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/mintavetelek/Sampling12Theory';
import { Sampling12Quiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/mintavetelek/Sampling12Quiz';
import { Sampling12Matcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/mintavetelek/Sampling12Matcher';
import { Sampling12Sorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/mintavetelek/Sampling12Sorter';
import {
  LottoSplitSvg,
  HypergeometricSvg,
  TwoClassesSvg,
  SideEffectBinomialSvg,
  PizzaPieSvg,
  FairnessBarsSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/mintavetelek/Sampling12Figures';

describe('Grade 12 Topic III - 10. Mintavételek - Components', () => {
  it('renders Sampling12Theory without throwing', () => {
    const { container } = render(<Sampling12Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Sampling12Quiz without throwing', () => {
    const { container } = render(<Sampling12Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Sampling12Matcher without throwing', () => {
    const { container } = render(<Sampling12Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Sampling12Sorter without throwing', () => {
    const { container } = render(<Sampling12Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LottoSplitSvg, HypergeometricSvg, TwoClassesSvg, SideEffectBinomialSvg, PizzaPieSvg, FairnessBarsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
