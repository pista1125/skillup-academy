import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ExponentialInequalitiesTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesTheory';
import { ExponentialInequalitiesQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesQuiz';
import { ExponentialInequalitiesMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesMatcher';
import { ExponentialInequalitiesSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesSorter';
import {
  StockModelSvg,
  MonotonicityRuleSvg,
  GraphReadingSvg,
  AgeDistributionSvg,
  TigerDeclineSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-egyenlotlensegek/ExponentialInequalitiesFigures';

describe('Grade 11 Topic III - 14. Exponenciális egyenlőtlenségek - Components', () => {
  it('renders ExponentialInequalitiesTheory without throwing', () => {
    const { container } = render(<ExponentialInequalitiesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialInequalitiesQuiz without throwing', () => {
    const { container } = render(<ExponentialInequalitiesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialInequalitiesMatcher without throwing', () => {
    const { container } = render(<ExponentialInequalitiesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialInequalitiesSorter without throwing', () => {
    const { container } = render(<ExponentialInequalitiesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [StockModelSvg, MonotonicityRuleSvg, GraphReadingSvg, AgeDistributionSvg, TigerDeclineSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
