import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DistancePerimeterAreaTheory } from '@/components/math/grade-11/koordinatageometria/tavolsag-kerulet-terulet/DistancePerimeterAreaTheory';
import {
  DistancePerimeterAreaQuiz,
  DISTANCE_PERIMETER_AREA_QUESTIONS
} from '@/components/math/grade-11/koordinatageometria/tavolsag-kerulet-terulet/DistancePerimeterAreaQuiz';
import { DistancePerimeterAreaMatcher } from '@/components/math/grade-11/koordinatageometria/tavolsag-kerulet-terulet/DistancePerimeterAreaMatcher';
import { DistancePerimeterAreaSorter } from '@/components/math/grade-11/koordinatageometria/tavolsag-kerulet-terulet/DistancePerimeterAreaSorter';
import {
  BermudaTriangleSvg,
  BoundingRectangleSvg,
  DistanceFormulaSvg,
  TriangleABDSvg,
  QuadrilateralAreaSvg
} from '@/components/math/grade-11/koordinatageometria/tavolsag-kerulet-terulet/DistancePerimeterAreaFigures';

describe('Grade 11 Topic VI - 6. Távolság, kerület, terület - Components', () => {
  it('renders DistancePerimeterAreaTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DistancePerimeterAreaTheory />);
    expect(container).toBeTruthy();
  });

  it('renders DistancePerimeterAreaQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DistancePerimeterAreaQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with explanation and badge', () => {
    expect(DISTANCE_PERIMETER_AREA_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((lvl) => {
      expect(DISTANCE_PERIMETER_AREA_QUESTIONS.filter((q) => q.level === lvl)).toHaveLength(10);
    });
    DISTANCE_PERIMETER_AREA_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation.length).toBeGreaterThan(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders all quiz figures without throwing', () => {
    DISTANCE_PERIMETER_AREA_QUESTIONS.filter((q) => q.figure).forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('renders DistancePerimeterAreaMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DistancePerimeterAreaMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders DistancePerimeterAreaSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DistancePerimeterAreaSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      BermudaTriangleSvg,
      BoundingRectangleSvg,
      DistanceFormulaSvg,
      TriangleABDSvg,
      QuadrilateralAreaSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
