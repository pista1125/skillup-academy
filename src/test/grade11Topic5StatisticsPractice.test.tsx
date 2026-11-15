import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatisticsPracticeTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-statisztika/StatisticsPracticeTheory';
import { StatisticsPracticeQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-statisztika/StatisticsPracticeQuiz';
import { StatisticsPracticeMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-statisztika/StatisticsPracticeMatcher';
import { StatisticsPracticeSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-statisztika/StatisticsPracticeSorter';
import {
  StatisticsPracticeAgePieSvg,
  StatisticsPracticeAgeBoxPlotSvg,
  StatisticsPracticeTwelveNumbersSvg,
  StatisticsPracticeSplitTimesSvg,
  StatisticsPracticeMissingDataSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-statisztika/StatisticsPracticeFigures';

describe('Grade 11 Topic V - 6. Gyakorlás - Components', () => {
  it('renders StatisticsPracticeTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatisticsPracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatisticsPracticeQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatisticsPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatisticsPracticeMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatisticsPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatisticsPracticeSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatisticsPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      StatisticsPracticeAgePieSvg,
      StatisticsPracticeAgeBoxPlotSvg,
      StatisticsPracticeTwelveNumbersSvg,
      StatisticsPracticeSplitTimesSvg,
      StatisticsPracticeMissingDataSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
