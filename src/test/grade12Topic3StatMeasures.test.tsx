import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatMeasuresTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-jellemzok/StatMeasuresTheory';
import { StatMeasuresQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-jellemzok/StatMeasuresQuiz';
import { StatMeasuresMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-jellemzok/StatMeasuresMatcher';
import { StatMeasuresSorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-jellemzok/StatMeasuresSorter';
import {
  StockPricesSvg,
  ReturnsBarSvg,
  DeviationTableSvg,
  StdDevStepsSvg,
  VolleyballHeightsSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-jellemzok/StatMeasuresFigures';

describe('Grade 12 Topic III - 2. Statisztikai jellemzők - Components', () => {
  it('renders StatMeasuresTheory without throwing', () => {
    const { container } = render(<StatMeasuresTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatMeasuresQuiz without throwing', () => {
    const { container } = render(<StatMeasuresQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatMeasuresMatcher without throwing', () => {
    const { container } = render(<StatMeasuresMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatMeasuresSorter without throwing', () => {
    const { container } = render(<StatMeasuresSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [StockPricesSvg, ReturnsBarSvg, DeviationTableSvg, StdDevStepsSvg, VolleyballHeightsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
