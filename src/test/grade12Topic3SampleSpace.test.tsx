import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SampleSpaceTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/az-esemenyter/SampleSpaceTheory';
import { SampleSpaceQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/az-esemenyter/SampleSpaceQuiz';
import { SampleSpaceMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/az-esemenyter/SampleSpaceMatcher';
import { SampleSpaceSorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/az-esemenyter/SampleSpaceSorter';
import {
  ThreeCoinsTreeSvg,
  SampleSpaceVennSvg,
  DiceTableSvg,
  ComplementExclusiveSvg,
  TwoGamesStarterSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/az-esemenyter/SampleSpaceFigures';

describe('Grade 12 Topic III - 5. Az eseménytér - Components', () => {
  it('renders SampleSpaceTheory without throwing', () => {
    const { container } = render(<SampleSpaceTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SampleSpaceQuiz without throwing', () => {
    const { container } = render(<SampleSpaceQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SampleSpaceMatcher without throwing', () => {
    const { container } = render(<SampleSpaceMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SampleSpaceSorter without throwing', () => {
    const { container } = render(<SampleSpaceSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ThreeCoinsTreeSvg, SampleSpaceVennSvg, DiceTableSvg, ComplementExclusiveSvg, TwoGamesStarterSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
