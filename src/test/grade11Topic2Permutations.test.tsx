import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PermutationsTheory } from '@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsTheory';
import { PermutationsQuiz } from '@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsQuiz';
import { PermutationsMatcher } from '@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsMatcher';
import { PermutationsSorter } from '@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsSorter';
import {
  CircusParadeSvg,
  AdjacentBlockSvg,
  CircularParadeSvg,
  AlternatingSeatsSvg,
  FactorialGrowthSvg
} from '@/components/math/grade-11/kombinatorika-grafok/sorba-rendezes/PermutationsFigures';

describe('Grade 11 Topic II - 17. Sorba rendezés - Components', () => {
  it('renders PermutationsTheory without throwing', () => {
    const { container } = render(<PermutationsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PermutationsQuiz without throwing', () => {
    const { container } = render(<PermutationsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PermutationsMatcher without throwing', () => {
    const { container } = render(<PermutationsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PermutationsSorter without throwing', () => {
    const { container } = render(<PermutationsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CircusParadeSvg, AdjacentBlockSvg, CircularParadeSvg, AlternatingSeatsSvg, FactorialGrowthSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
