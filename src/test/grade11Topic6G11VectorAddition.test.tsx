import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { G11VectorAdditionTheory } from '@/components/math/grade-11/koordinatageometria/vektorok-osszeadasa/G11VectorAdditionTheory';
import { G11VectorAdditionQuiz, G11_VECTOR_ADDITION_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/vektorok-osszeadasa/G11VectorAdditionQuiz';
import { G11VectorAdditionMatcher } from '@/components/math/grade-11/koordinatageometria/vektorok-osszeadasa/G11VectorAdditionMatcher';
import { G11VectorAdditionSorter } from '@/components/math/grade-11/koordinatageometria/vektorok-osszeadasa/G11VectorAdditionSorter';
import {
  VectorConceptSvg,
  CrosswindLandingSvg,
  ChainMethodSvg,
  ParallelogramMethodSvg,
  GridSumCommutativeSvg,
  TrapezoidVectorSumSvg
} from '@/components/math/grade-11/koordinatageometria/vektorok-osszeadasa/G11VectorAdditionFigures';

describe('Grade 11 Topic VI - 1. Vektorok összeadása - Components', () => {
  it('renders G11VectorAdditionTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11VectorAdditionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders G11VectorAdditionQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11VectorAdditionQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level', () => {
    expect(G11_VECTOR_ADDITION_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(G11_VECTOR_ADDITION_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
  });

  it('renders G11VectorAdditionMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11VectorAdditionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders G11VectorAdditionSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11VectorAdditionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [VectorConceptSvg, CrosswindLandingSvg, ChainMethodSvg, ParallelogramMethodSvg, GridSumCommutativeSvg, TrapezoidVectorSumSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
