import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ProbabilityPracticeTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-valoszinuseg/ProbabilityPracticeTheory';
import { ProbabilityPracticeQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-valoszinuseg/ProbabilityPracticeQuiz';
import { ProbabilityPracticeMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-valoszinuseg/ProbabilityPracticeMatcher';
import { ProbabilityPracticeSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-valoszinuseg/ProbabilityPracticeSorter';
import {
  ProbabilityPracticeAtLeastAtMostSvg,
  ProbabilityPracticeBoxPlotSvg,
  ProbabilityPracticeToastSvg,
  ProbabilityPracticeVirusSvg,
  ProbabilityPracticePlanetsSvg,
  ProbabilityPracticeModelMapSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-valoszinuseg/ProbabilityPracticeFigures';

describe('Grade 11 Topic V - 14. Gyakorlás - Components', () => {
  it('renders ProbabilityPracticeTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityPracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityPracticeQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityPracticeMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityPracticeSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', { timeout: 20000 }, () => {
    const figures = [ProbabilityPracticeAtLeastAtMostSvg, ProbabilityPracticeBoxPlotSvg, ProbabilityPracticeToastSvg, ProbabilityPracticeVirusSvg, ProbabilityPracticePlanetsSvg, ProbabilityPracticeModelMapSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
