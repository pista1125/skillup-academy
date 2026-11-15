import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DataStatisticsTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatrendezes-statisztikai-jellemzok/DataStatisticsTheory';
import { DataStatisticsQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatrendezes-statisztikai-jellemzok/DataStatisticsQuiz';
import { DataStatisticsMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatrendezes-statisztikai-jellemzok/DataStatisticsMatcher';
import { DataStatisticsSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatrendezes-statisztikai-jellemzok/DataStatisticsSorter';
import {
  DataStatsFireAlarmSvg,
  DataStatsClassSizeChartSvg,
  DataStatsMeasuresSvg,
  DataStatsGradesSvg,
  DataStatsWeightedMeanSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatrendezes-statisztikai-jellemzok/DataStatisticsFigures';

describe('Grade 11 Topic V - 1. Adatrendezés – statisztikai jellemzők - Components', () => {
  it('renders DataStatisticsTheory without throwing', () => {
    const { container } = render(<DataStatisticsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders DataStatisticsQuiz without throwing', () => {
    const { container } = render(<DataStatisticsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders DataStatisticsMatcher without throwing', () => {
    const { container } = render(<DataStatisticsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders DataStatisticsSorter without throwing', () => {
    const { container } = render(<DataStatisticsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DataStatsFireAlarmSvg, DataStatsClassSizeChartSvg, DataStatsMeasuresSvg, DataStatsGradesSvg, DataStatsWeightedMeanSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
