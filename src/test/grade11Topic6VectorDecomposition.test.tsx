import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { VectorDecompositionTheory } from '@/components/math/grade-11/koordinatageometria/vektor-felbontasa-osszetevokre/VectorDecompositionTheory';
import {
  VectorDecompositionQuiz,
  VECTOR_DECOMPOSITION_QUESTIONS
} from '@/components/math/grade-11/koordinatageometria/vektor-felbontasa-osszetevokre/VectorDecompositionQuiz';
import { VectorDecompositionMatcher } from '@/components/math/grade-11/koordinatageometria/vektor-felbontasa-osszetevokre/VectorDecompositionMatcher';
import { VectorDecompositionSorter } from '@/components/math/grade-11/koordinatageometria/vektor-felbontasa-osszetevokre/VectorDecompositionSorter';
import {
  CatamaranLakeSvg,
  CatamaranComponentsSvg,
  DecompositionStepsSvg,
  HangingWeightSvg,
  InclineForcesSvg,
  GridDecompositionSvg
} from '@/components/math/grade-11/koordinatageometria/vektor-felbontasa-osszetevokre/VectorDecompositionFigures';

describe('Grade 11 Topic VI - 4. Ráadás – Vektor felbontása összetevőkre - Components', () => {
  it('renders VectorDecompositionTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorDecompositionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders VectorDecompositionQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorDecompositionQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with explanation and badge', () => {
    expect(VECTOR_DECOMPOSITION_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((lvl) => {
      expect(VECTOR_DECOMPOSITION_QUESTIONS.filter((q) => q.level === lvl)).toHaveLength(10);
    });
    VECTOR_DECOMPOSITION_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation.length).toBeGreaterThan(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders all quiz figures without throwing', () => {
    VECTOR_DECOMPOSITION_QUESTIONS.filter((q) => q.figure).forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('renders VectorDecompositionMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorDecompositionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders VectorDecompositionSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<VectorDecompositionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      CatamaranLakeSvg,
      CatamaranComponentsSvg,
      DecompositionStepsSvg,
      HangingWeightSvg,
      InclineForcesSvg,
      GridDecompositionSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
