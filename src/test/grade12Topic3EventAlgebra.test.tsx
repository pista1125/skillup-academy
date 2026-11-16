import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { EventAlgebraTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemenyek-osszege-es-szorzata/EventAlgebraTheory';
import { EventAlgebraQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemenyek-osszege-es-szorzata/EventAlgebraQuiz';
import { EventAlgebraMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemenyek-osszege-es-szorzata/EventAlgebraMatcher';
import { EventAlgebraSorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemenyek-osszege-es-szorzata/EventAlgebraSorter';
import {
  CoinEventsVennSvg,
  SumProductVennSvg,
  WeatherWeekSvg,
  SwitchCircuitSvg,
  CountBoundsSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemenyek-osszege-es-szorzata/EventAlgebraFigures';

describe('Grade 12 Topic III - 6. Események összege és szorzata - Components', () => {
  it('renders EventAlgebraTheory without throwing', () => {
    const { container } = render(<EventAlgebraTheory />);
    expect(container).toBeTruthy();
  });

  it('renders EventAlgebraQuiz without throwing', () => {
    const { container } = render(<EventAlgebraQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders EventAlgebraMatcher without throwing', () => {
    const { container } = render(<EventAlgebraMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders EventAlgebraSorter without throwing', () => {
    const { container } = render(<EventAlgebraSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CoinEventsVennSvg, SumProductVennSvg, WeatherWeekSvg, SwitchCircuitSvg, CountBoundsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
