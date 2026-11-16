import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LengthMeasureTheory } from '@/components/math/grade-4/meresek/a-hosszusag-merese/LengthMeasureTheory';
import { LengthMeasureQuiz } from '@/components/math/grade-4/meresek/a-hosszusag-merese/LengthMeasureQuiz';
import { LengthMeasureMatcher } from '@/components/math/grade-4/meresek/a-hosszusag-merese/LengthMeasureMatcher';
import { LengthMeasureSorter } from '@/components/math/grade-4/meresek/a-hosszusag-merese/LengthMeasureSorter';
import {
  LengthUnitLadderSvg,
  RulerReadingSvg,
  RoziMapSvg,
  WalkingTwinsSvg,
  FlightAltitudeSvg,
  RunningTrackSvg
} from '@/components/math/grade-4/meresek/a-hosszusag-merese/LengthMeasureFigures';

describe('Grade 4 Topic II - 1. A hosszúság mérése - Components', () => {
  it('renders LengthMeasureTheory without throwing', () => {
    const { container } = render(<LengthMeasureTheory />);
    expect(container).toBeTruthy();
  });

  it('renders LengthMeasureQuiz without throwing', () => {
    const { container } = render(<LengthMeasureQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders LengthMeasureMatcher without throwing', () => {
    const { container } = render(<LengthMeasureMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders LengthMeasureSorter without throwing', () => {
    const { container } = render(<LengthMeasureSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LengthUnitLadderSvg, RulerReadingSvg, RoziMapSvg, WalkingTwinsSvg, FlightAltitudeSvg, RunningTrackSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
