import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { HalfLifeTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeTheory';
import { HalfLifeQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeQuiz';
import { HalfLifeMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeMatcher';
import { HalfLifeSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeSorter';
import {
  HalfLifeCarbonSvg,
  HalfLifeDrugSvg,
  HalfLifeGraphSvg,
  HalfLifeIsotopeSvg,
  HalfLifeTableSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/felezesi-ido/HalfLifeFigures';

describe('Grade 11 Topic III - 34. Felezési idő - Components', () => {
  it('renders HalfLifeTheory without throwing', () => {
    const { container } = render(<HalfLifeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders HalfLifeQuiz without throwing', () => {
    const { container } = render(<HalfLifeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders HalfLifeMatcher without throwing', () => {
    const { container } = render(<HalfLifeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders HalfLifeSorter without throwing', () => {
    const { container } = render(<HalfLifeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [HalfLifeDrugSvg, HalfLifeTableSvg, HalfLifeGraphSvg, HalfLifeCarbonSvg, HalfLifeIsotopeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
