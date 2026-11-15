import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SimultaneousDrawTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ket-vagy-tobb-elem-egyszerre/SimultaneousDrawTheory';
import { SimultaneousDrawQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ket-vagy-tobb-elem-egyszerre/SimultaneousDrawQuiz';
import { SimultaneousDrawMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ket-vagy-tobb-elem-egyszerre/SimultaneousDrawMatcher';
import { SimultaneousDrawSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ket-vagy-tobb-elem-egyszerre/SimultaneousDrawSorter';
import {
  SimultaneousDrawLottoSvg,
  SimultaneousDrawGroupsSvg,
  SimultaneousDrawBinomialPairsSvg,
  SimultaneousDrawBookshelfSvg,
  SimultaneousDrawOlympicsSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ket-vagy-tobb-elem-egyszerre/SimultaneousDrawFigures';

describe('Grade 11 Topic V - 10. Két vagy több elemet húzunk egyszerre - Components', () => {
  it('renders SimultaneousDrawTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SimultaneousDrawTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SimultaneousDrawQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SimultaneousDrawQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SimultaneousDrawMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SimultaneousDrawMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SimultaneousDrawSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SimultaneousDrawSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SimultaneousDrawLottoSvg, SimultaneousDrawGroupsSvg, SimultaneousDrawBinomialPairsSvg, SimultaneousDrawBookshelfSvg, SimultaneousDrawOlympicsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
