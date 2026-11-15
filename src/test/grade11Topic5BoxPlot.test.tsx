import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { BoxPlotTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/a-dobozdiagram/BoxPlotTheory';
import { BoxPlotQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/a-dobozdiagram/BoxPlotQuiz';
import { BoxPlotMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/a-dobozdiagram/BoxPlotMatcher';
import { BoxPlotSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/a-dobozdiagram/BoxPlotSorter';
import {
  BoxPlotSpeedsSvg,
  BoxPlotAnatomySvg,
  BoxPlotExampleSvg,
  BoxPlotFrequencySvg,
  BoxPlotOutlierSvg,
  BoxPlotRubikSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/a-dobozdiagram/BoxPlotFigures';

describe('Grade 11 Topic V - 3. A dobozdiagram - Components', () => {
  it('renders BoxPlotTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<BoxPlotTheory />);
    expect(container).toBeTruthy();
  });

  it('renders BoxPlotQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<BoxPlotQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders BoxPlotMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<BoxPlotMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders BoxPlotSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<BoxPlotSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', { timeout: 20000 }, () => {
    const figures = [BoxPlotSpeedsSvg, BoxPlotAnatomySvg, BoxPlotExampleSvg, BoxPlotFrequencySvg, BoxPlotOutlierSvg, BoxPlotRubikSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
