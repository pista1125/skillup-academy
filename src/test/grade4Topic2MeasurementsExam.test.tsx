import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MeasurementsExamTheory } from '@/components/math/grade-4/meresek/megallo/MeasurementsExamTheory';
import { MeasurementsExamQuiz } from '@/components/math/grade-4/meresek/megallo/MeasurementsExamQuiz';
import { MeasurementsExamMatcher } from '@/components/math/grade-4/meresek/megallo/MeasurementsExamMatcher';
import { MeasurementsExamSorter } from '@/components/math/grade-4/meresek/megallo/MeasurementsExamSorter';
import {
  ChapterUnitsSvg,
  MotorwayChartSvg,
  AnimalWaterSvg,
  BalloonMassSvg,
  UnitBoardGameSvg
} from '@/components/math/grade-4/meresek/megallo/MeasurementsExamFigures';

describe('Grade 4 Topic II - 7. Megálló – tudáspróba - Components', () => {
  it('renders MeasurementsExamTheory without throwing', () => {
    const { container } = render(<MeasurementsExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsExamQuiz without throwing', () => {
    const { container } = render(<MeasurementsExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsExamMatcher without throwing', () => {
    const { container } = render(<MeasurementsExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsExamSorter without throwing', () => {
    const { container } = render(<MeasurementsExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterUnitsSvg, MotorwayChartSvg, AnimalWaterSvg, BalloonMassSvg, UnitBoardGameSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
