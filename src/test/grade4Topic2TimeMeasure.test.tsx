import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TimeMeasureTheory } from '@/components/math/grade-4/meresek/az-ido-merese/TimeMeasureTheory';
import { TimeMeasureQuiz } from '@/components/math/grade-4/meresek/az-ido-merese/TimeMeasureQuiz';
import { TimeMeasureMatcher } from '@/components/math/grade-4/meresek/az-ido-merese/TimeMeasureMatcher';
import { TimeMeasureSorter } from '@/components/math/grade-4/meresek/az-ido-merese/TimeMeasureSorter';
import {
  ClockReadingsSvg,
  TimeUnitsSvg,
  DayPartsSvg,
  BusTimetableSvg,
  HannaRouteSvg
} from '@/components/math/grade-4/meresek/az-ido-merese/TimeMeasureFigures';

describe('Grade 4 Topic II - 6. Az idő mérése - Components', () => {
  it('renders TimeMeasureTheory without throwing', () => {
    const { container } = render(<TimeMeasureTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TimeMeasureQuiz without throwing', () => {
    const { container } = render(<TimeMeasureQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TimeMeasureMatcher without throwing', () => {
    const { container } = render(<TimeMeasureMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TimeMeasureSorter without throwing', () => {
    const { container } = render(<TimeMeasureSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ClockReadingsSvg, TimeUnitsSvg, DayPartsSvg, BusTimetableSvg, HannaRouteSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
