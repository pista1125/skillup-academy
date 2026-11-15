import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PowerRootLogTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogTheory';
import { PowerRootLogQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogQuiz';
import { PowerRootLogMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogMatcher';
import { PowerRootLogSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogSorter';
import {
  BseBarChartSvg,
  BseModelCurveSvg,
  LogSolveStepsSvg,
  MobileCallsSvg,
  GrowthFactorSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvany-gyok-es-logaritmus/PowerRootLogFigures';

describe('Grade 11 Topic III - 12. Hatvány, gyök, logaritmus - Components', () => {
  it('renders PowerRootLogTheory without throwing', () => {
    const { container } = render(<PowerRootLogTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PowerRootLogQuiz without throwing', () => {
    const { container } = render(<PowerRootLogQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PowerRootLogMatcher without throwing', () => {
    const { container } = render(<PowerRootLogMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PowerRootLogSorter without throwing', () => {
    const { container } = render(<PowerRootLogSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [BseBarChartSvg, BseModelCurveSvg, LogSolveStepsSvg, MobileCallsSvg, GrowthFactorSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
