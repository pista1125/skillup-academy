import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CapacityMeasureTheory } from '@/components/math/grade-4/meresek/az-urtartalom-merese/CapacityMeasureTheory';
import { CapacityMeasureQuiz } from '@/components/math/grade-4/meresek/az-urtartalom-merese/CapacityMeasureQuiz';
import { CapacityMeasureMatcher } from '@/components/math/grade-4/meresek/az-urtartalom-merese/CapacityMeasureMatcher';
import { CapacityMeasureSorter } from '@/components/math/grade-4/meresek/az-urtartalom-merese/CapacityMeasureSorter';
import {
  MeasuringCupsSvg,
  CapacityUnitLadderSvg,
  AquariumsSvg,
  MeasuringVesselsSvg,
  PondPumpChartSvg
} from '@/components/math/grade-4/meresek/az-urtartalom-merese/CapacityMeasureFigures';

describe('Grade 4 Topic II - 5. Az űrtartalom mérése - Components', () => {
  it('renders CapacityMeasureTheory without throwing', () => {
    const { container } = render(<CapacityMeasureTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CapacityMeasureQuiz without throwing', () => {
    const { container } = render(<CapacityMeasureQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CapacityMeasureMatcher without throwing', () => {
    const { container } = render(<CapacityMeasureMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CapacityMeasureSorter without throwing', () => {
    const { container } = render(<CapacityMeasureSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MeasuringCupsSvg, CapacityUnitLadderSvg, AquariumsSvg, MeasuringVesselsSvg, PondPumpChartSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
