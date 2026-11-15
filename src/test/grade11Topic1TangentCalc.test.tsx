import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TangentCalcTheory } from '@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcTheory';
import { TangentCalcQuiz } from '@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcQuiz';
import { TangentCalcMatcher } from '@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcMatcher';
import { TangentCalcSorter } from '@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcSorter';
import {
  CalculatorKeysSvg,
  TowerMeasurementRangeSvg,
  SlopePercentSvg,
  GardenRectangleSvg,
  InterpolationTableSvg
} from '@/components/math/grade-11/trigonometria/szamolas-szogek-tangensevel/TangentCalcFigures';

describe('Grade 11 Topic I - 2. Számolás szögek tangensével - Components', () => {
  it('renders TangentCalcTheory without throwing', () => {
    const { container } = render(<TangentCalcTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TangentCalcQuiz without throwing', () => {
    const { container } = render(<TangentCalcQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TangentCalcMatcher without throwing', () => {
    const { container } = render(<TangentCalcMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TangentCalcSorter without throwing', () => {
    const { container } = render(<TangentCalcSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CalculatorKeysSvg, TowerMeasurementRangeSvg, SlopePercentSvg, GardenRectangleSvg, InterpolationTableSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
