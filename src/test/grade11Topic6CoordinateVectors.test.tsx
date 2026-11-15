import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CoordinateVectorsTheory } from '@/components/math/grade-11/koordinatageometria/vektorok-a-koordinata-rendszerben/CoordinateVectorsTheory';
import {
  CoordinateVectorsQuiz,
  COORDINATE_VECTORS_QUESTIONS
} from '@/components/math/grade-11/koordinatageometria/vektorok-a-koordinata-rendszerben/CoordinateVectorsQuiz';
import { CoordinateVectorsMatcher } from '@/components/math/grade-11/koordinatageometria/vektorok-a-koordinata-rendszerben/CoordinateVectorsMatcher';
import { CoordinateVectorsSorter } from '@/components/math/grade-11/koordinatageometria/vektorok-a-koordinata-rendszerben/CoordinateVectorsSorter';
import {
  BasisVectorsIntroSvg,
  GridVectorsReadingSvg,
  EqualPositionVectorsSvg,
  CoordinateOperationsSvg,
  VectorRotationSvg,
  VectorLengthSvg
} from '@/components/math/grade-11/koordinatageometria/vektorok-a-koordinata-rendszerben/CoordinateVectorsFigures';

describe('Grade 11 Topic VI - 5. Vektorok a koordináta-rendszerben - Components', () => {
  it('renders CoordinateVectorsTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordinateVectorsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CoordinateVectorsQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordinateVectorsQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with explanation and badge', () => {
    expect(COORDINATE_VECTORS_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((lvl) => {
      expect(COORDINATE_VECTORS_QUESTIONS.filter((q) => q.level === lvl)).toHaveLength(10);
    });
    COORDINATE_VECTORS_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation.length).toBeGreaterThan(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders all quiz figures without throwing', () => {
    COORDINATE_VECTORS_QUESTIONS.filter((q) => q.figure).forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('renders CoordinateVectorsMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordinateVectorsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CoordinateVectorsSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordinateVectorsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      BasisVectorsIntroSvg,
      GridVectorsReadingSvg,
      EqualPositionVectorsSvg,
      CoordinateOperationsSvg,
      VectorRotationSvg,
      VectorLengthSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
