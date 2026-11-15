import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatChartsTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/diagramok/StatChartsTheory';
import { StatChartsQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/diagramok/StatChartsQuiz';
import { StatChartsMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/diagramok/StatChartsMatcher';
import { StatChartsSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/diagramok/StatChartsSorter';
import {
  StatChartsOrchestraSvg,
  StatChartsTheaterSvg,
  StatChartsTypesSvg,
  StatChartsGradesBandSvg,
  StatChartsInternetPieSvg,
  StatChartsPyramidSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/diagramok/StatChartsFigures';

describe('Grade 11 Topic V - 2. Diagramok - Components', () => {
  it('renders StatChartsTheory without throwing', () => {
    const { container } = render(<StatChartsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatChartsQuiz without throwing', () => {
    const { container } = render(<StatChartsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatChartsMatcher without throwing', () => {
    const { container } = render(<StatChartsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatChartsSorter without throwing', () => {
    const { container } = render(<StatChartsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [StatChartsOrchestraSvg, StatChartsTheaterSvg, StatChartsTypesSvg, StatChartsGradesBandSvg, StatChartsInternetPieSvg, StatChartsPyramidSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
