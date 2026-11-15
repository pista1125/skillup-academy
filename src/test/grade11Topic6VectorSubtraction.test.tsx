import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { VectorSubtractionTheory } from '@/components/math/grade-11/koordinatageometria/ket-vektor-kulonbsege/VectorSubtractionTheory';
import { VectorSubtractionQuiz, VECTOR_SUBTRACTION_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/ket-vektor-kulonbsege/VectorSubtractionQuiz';
import { VectorSubtractionMatcher } from '@/components/math/grade-11/koordinatageometria/ket-vektor-kulonbsege/VectorSubtractionMatcher';
import { VectorSubtractionSorter } from '@/components/math/grade-11/koordinatageometria/ket-vektor-kulonbsege/VectorSubtractionSorter';
import {
  PilotCompensationSvg,
  DifferenceConstructionSvg,
  ParallelogramDiagonalsSvg,
  OppositeDifferenceSvg,
  DisplacementChangeSvg,
  KiteVectorsSvg
} from '@/components/math/grade-11/koordinatageometria/ket-vektor-kulonbsege/VectorSubtractionFigures';

describe('Grade 11 Topic VI - 2. Két vektor különbsége - Components', () => {
  it('renders VectorSubtractionTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorSubtractionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders VectorSubtractionQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorSubtractionQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level', () => {
    expect(VECTOR_SUBTRACTION_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(VECTOR_SUBTRACTION_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
  });

  it('renders VectorSubtractionMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorSubtractionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders VectorSubtractionSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorSubtractionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PilotCompensationSvg, DifferenceConstructionSvg, ParallelogramDiagonalsSvg, OppositeDifferenceSvg, DisplacementChangeSvg, KiteVectorsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
