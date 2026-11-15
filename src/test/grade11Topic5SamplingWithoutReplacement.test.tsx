import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SamplingWithoutReplacementTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateves-nelkuli-mintavetel/SamplingWithoutReplacementTheory';
import { SamplingWithoutReplacementQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateves-nelkuli-mintavetel/SamplingWithoutReplacementQuiz';
import { SamplingWithoutReplacementMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateves-nelkuli-mintavetel/SamplingWithoutReplacementMatcher';
import { SamplingWithoutReplacementSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateves-nelkuli-mintavetel/SamplingWithoutReplacementSorter';
import {
  SamplingWithoutReplacementUrnSvg,
  SamplingWithoutReplacementModelSvg,
  SamplingWithoutReplacementTreeSvg,
  SamplingWithoutReplacementOrchestraSvg,
  SamplingWithoutReplacementGoalsSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszateves-nelkuli-mintavetel/SamplingWithoutReplacementFigures';

describe('Grade 11 Topic V - 11. Visszatevés nélküli mintavétel - Components', () => {
  it('renders SamplingWithoutReplacementTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithoutReplacementTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SamplingWithoutReplacementQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithoutReplacementQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SamplingWithoutReplacementMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithoutReplacementMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SamplingWithoutReplacementSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SamplingWithoutReplacementSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      SamplingWithoutReplacementUrnSvg,
      SamplingWithoutReplacementModelSvg,
      SamplingWithoutReplacementTreeSvg,
      SamplingWithoutReplacementOrchestraSvg,
      SamplingWithoutReplacementGoalsSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
