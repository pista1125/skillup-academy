import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GcdLcmTheory } from '@/components/math/grade-11/szamelmelet/lnko-lkkt/GcdLcmTheory';
import { GcdLcmQuiz } from '@/components/math/grade-11/szamelmelet/lnko-lkkt/GcdLcmQuiz';
import { GcdLcmMatcher } from '@/components/math/grade-11/szamelmelet/lnko-lkkt/GcdLcmMatcher';
import { GcdLcmSorter } from '@/components/math/grade-11/szamelmelet/lnko-lkkt/GcdLcmSorter';
import {
  WallpaperStripsSvg,
  PrimeVennSvg,
  CommonMultiplesSvg,
  SquareTilingSvg,
  EuclidRectangleSvg
} from '@/components/math/grade-11/szamelmelet/lnko-lkkt/GcdLcmFigures';

describe('Grade 11 Topic IV - 44. Legnagyobb közös osztó, legkisebb közös többszörös - Components', () => {
  it('renders GcdLcmTheory without throwing', () => {
    const { container } = render(<GcdLcmTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GcdLcmQuiz without throwing', () => {
    const { container } = render(<GcdLcmQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GcdLcmMatcher without throwing', () => {
    const { container } = render(<GcdLcmMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GcdLcmSorter without throwing', () => {
    const { container } = render(<GcdLcmSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WallpaperStripsSvg, PrimeVennSvg, CommonMultiplesSvg, SquareTilingSvg, EuclidRectangleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
