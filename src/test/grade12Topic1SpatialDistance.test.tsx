import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SpatialDistanceTheory } from '@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceTheory';
import { SpatialDistanceQuiz } from '@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceQuiz';
import { SpatialDistanceMatcher } from '@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceMatcher';
import { SpatialDistanceSorter } from '@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceSorter';
import {
  ShipsTetrahedronSvg,
  SpiderBoxSvg,
  SpiderNetsSvg,
  DistanceTypesSvg,
  CubeDiagonalsSvg
} from '@/components/math/grade-12/tergeometria/terelemek-tavolsaga-ismetles/SpatialDistanceFigures';

describe('Grade 12 Topic I - 1. Térelemek távolsága (ismétlés) - Components', () => {
  it('renders SpatialDistanceTheory without throwing', () => {
    const { container } = render(<SpatialDistanceTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SpatialDistanceQuiz without throwing', () => {
    const { container } = render(<SpatialDistanceQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SpatialDistanceMatcher without throwing', () => {
    const { container } = render(<SpatialDistanceMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SpatialDistanceSorter without throwing', () => {
    const { container } = render(<SpatialDistanceSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ShipsTetrahedronSvg, SpiderBoxSvg, SpiderNetsSvg, DistanceTypesSvg, CubeDiagonalsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
