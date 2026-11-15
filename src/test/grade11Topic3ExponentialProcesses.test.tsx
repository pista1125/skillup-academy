import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ExponentialProcessesTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesTheory';
import { ExponentialProcessesQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesQuiz';
import { ExponentialProcessesMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesMatcher';
import { ExponentialProcessesSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesSorter';
import {
  ExponentialProcessesBacteriaSvg,
  ExponentialProcessesBankSvg,
  ExponentialProcessesCitySvg,
  ExponentialProcessesGrowthDecaySvg,
  ExponentialProcessesPopulationSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-folyamatok/ExponentialProcessesFigures';

describe('Grade 11 Topic III - 8. Exponenciális folyamatok - Components', () => {
  it('renders ExponentialProcessesTheory without throwing', () => {
    const { container } = render(<ExponentialProcessesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialProcessesQuiz without throwing', () => {
    const { container } = render(<ExponentialProcessesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialProcessesMatcher without throwing', () => {
    const { container } = render(<ExponentialProcessesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialProcessesSorter without throwing', () => {
    const { container } = render(<ExponentialProcessesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ExponentialProcessesBacteriaSvg,
      ExponentialProcessesBankSvg,
      ExponentialProcessesCitySvg,
      ExponentialProcessesGrowthDecaySvg,
      ExponentialProcessesPopulationSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
