import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MassMeasureTheory } from '@/components/math/grade-4/meresek/a-tomeg-merese/MassMeasureTheory';
import { MassMeasureQuiz } from '@/components/math/grade-4/meresek/a-tomeg-merese/MassMeasureQuiz';
import { MassMeasureMatcher } from '@/components/math/grade-4/meresek/a-tomeg-merese/MassMeasureMatcher';
import { MassMeasureSorter } from '@/components/math/grade-4/meresek/a-tomeg-merese/MassMeasureSorter';
import {
  BalanceScaleSvg,
  MassUnitLadderSvg,
  HarvestChartSvg,
  ContainersSvg,
  KitchenScalesSvg
} from '@/components/math/grade-4/meresek/a-tomeg-merese/MassMeasureFigures';

describe('Grade 4 Topic II - 4. A tömeg mérése - Components', () => {
  it('renders MassMeasureTheory without throwing', () => {
    const { container } = render(<MassMeasureTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MassMeasureQuiz without throwing', () => {
    const { container } = render(<MassMeasureQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MassMeasureMatcher without throwing', () => {
    const { container } = render(<MassMeasureMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MassMeasureSorter without throwing', () => {
    const { container } = render(<MassMeasureSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [BalanceScaleSvg, MassUnitLadderSvg, HarvestChartSvg, ContainersSvg, KitchenScalesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
