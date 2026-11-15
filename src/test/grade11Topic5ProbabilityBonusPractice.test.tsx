import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ProbabilityBonusPracticeTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/raadas-gyakorlas/ProbabilityBonusPracticeTheory';
import { ProbabilityBonusPracticeQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/raadas-gyakorlas/ProbabilityBonusPracticeQuiz';
import { ProbabilityBonusPracticeMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/raadas-gyakorlas/ProbabilityBonusPracticeMatcher';
import { ProbabilityBonusPracticeSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/raadas-gyakorlas/ProbabilityBonusPracticeSorter';
import {
  ProbabilityBonusPracticeFencersSvg,
  ProbabilityBonusPracticeMaxTableSvg,
  ProbabilityBonusPracticeDominoSvg,
  ProbabilityBonusPracticeLineupSvg,
  ProbabilityBonusPracticeKeysTreeSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/raadas-gyakorlas/ProbabilityBonusPracticeFigures';

describe('Grade 11 Topic V - 8. Ráadás – Gyakorlás - Components', () => {
  it('renders ProbabilityBonusPracticeTheory and throws darts', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<ProbabilityBonusPracticeTheory />);
    expect(container).toBeTruthy();
    fireEvent.click(getAllByText('+100 lövés')[0]);
    expect(container.textContent).toContain('lövések száma: 100');
  });

  it('renders ProbabilityBonusPracticeQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityBonusPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityBonusPracticeMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityBonusPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ProbabilityBonusPracticeSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ProbabilityBonusPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ProbabilityBonusPracticeFencersSvg,
      ProbabilityBonusPracticeMaxTableSvg,
      ProbabilityBonusPracticeDominoSvg,
      ProbabilityBonusPracticeLineupSvg,
      ProbabilityBonusPracticeKeysTreeSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
