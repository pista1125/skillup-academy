import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MeasurementsOutlookTheory } from '@/components/math/grade-4/meresek/kitekinto/MeasurementsOutlookTheory';
import { MeasurementsOutlookQuiz } from '@/components/math/grade-4/meresek/kitekinto/MeasurementsOutlookQuiz';
import { MeasurementsOutlookMatcher } from '@/components/math/grade-4/meresek/kitekinto/MeasurementsOutlookMatcher';
import { MeasurementsOutlookSorter } from '@/components/math/grade-4/meresek/kitekinto/MeasurementsOutlookSorter';
import {
  TankChartSvg,
  GrapeJuiceJugsSvg,
  FrogJumpsSvg,
  MarketTradeSvg,
  MarbleBoxSvg
} from '@/components/math/grade-4/meresek/kitekinto/MeasurementsOutlookFigures';

describe('Grade 4 Topic II - 8. Kitekintő - Components', () => {
  it('renders MeasurementsOutlookTheory without throwing', () => {
    const { container } = render(<MeasurementsOutlookTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsOutlookQuiz without throwing', () => {
    const { container } = render(<MeasurementsOutlookQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsOutlookMatcher without throwing', () => {
    const { container } = render(<MeasurementsOutlookMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsOutlookSorter without throwing', () => {
    const { container } = render(<MeasurementsOutlookSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TankChartSvg, GrapeJuiceJugsSvg, FrogJumpsSvg, MarketTradeSvg, MarbleBoxSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
