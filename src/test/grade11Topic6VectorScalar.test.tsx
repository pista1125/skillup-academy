import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { VectorScalarTheory } from '@/components/math/grade-11/koordinatageometria/vektorok-szamszorosa/VectorScalarTheory';
import { VectorScalarQuiz, VECTOR_SCALAR_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/vektorok-szamszorosa/VectorScalarQuiz';
import { VectorScalarMatcher } from '@/components/math/grade-11/koordinatageometria/vektorok-szamszorosa/VectorScalarMatcher';
import { VectorScalarSorter } from '@/components/math/grade-11/koordinatageometria/vektorok-szamszorosa/VectorScalarSorter';
import {
  ScalarMultiplesSvg,
  UnitVectorsGridSvg,
  HexagonDiagonalSvg,
  ParallelogramCenterSvg,
  CubeVectorsSvg,
  PerpendicularCombinationSvg
} from '@/components/math/grade-11/koordinatageometria/vektorok-szamszorosa/VectorScalarFigures';

describe('Grade 11 Topic VI - 3. Vektorok számszorosa - Components', () => {
  it('renders VectorScalarTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorScalarTheory />);
    expect(container).toBeTruthy();
  });

  it('renders VectorScalarQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorScalarQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level', () => {
    expect(VECTOR_SCALAR_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(VECTOR_SCALAR_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
  });

  it('renders VectorScalarMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorScalarMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders VectorScalarSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorScalarSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ScalarMultiplesSvg, UnitVectorsGridSvg, HexagonDiagonalSvg, ParallelogramCenterSvg, CubeVectorsSvg, PerpendicularCombinationSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
