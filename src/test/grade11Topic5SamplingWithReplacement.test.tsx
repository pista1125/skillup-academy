import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SamplingWithReplacementTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateveses-mintavetel/SamplingWithReplacementTheory';
import { SamplingWithReplacementQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateveses-mintavetel/SamplingWithReplacementQuiz';
import { SamplingWithReplacementMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateveses-mintavetel/SamplingWithReplacementMatcher';
import { SamplingWithReplacementSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateveses-mintavetel/SamplingWithReplacementSorter';
import {
  SamplingWithReplacementUrnSvg,
  SamplingWithReplacementArrangementsSvg,
  SamplingWithReplacementFormulaSvg,
  SamplingWithReplacementFerkoChartSvg,
  SamplingWithReplacementCoinTenSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateveses-mintavetel/SamplingWithReplacementFigures';

describe('Grade 11 Topic V - 13. Visszatevéses mintavétel - Components', () => {
  it('renders SamplingWithReplacementTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithReplacementTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SamplingWithReplacementQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithReplacementQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SamplingWithReplacementMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithReplacementMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SamplingWithReplacementSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithReplacementSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', { timeout: 20000 }, () => {
    const figures = [SamplingWithReplacementUrnSvg, SamplingWithReplacementArrangementsSvg, SamplingWithReplacementFormulaSvg, SamplingWithReplacementFerkoChartSvg, SamplingWithReplacementCoinTenSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
