import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ElementaryGeometrySummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/elemi-geometria/ElementaryGeometrySummaryTheory';
import { ElementaryGeometrySummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/elemi-geometria/ElementaryGeometrySummaryQuiz';
import { ElementaryGeometrySummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/elemi-geometria/ElementaryGeometrySummaryMatcher';
import { ElementaryGeometrySummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/elemi-geometria/ElementaryGeometrySummarySorter';
import {
  DistanceTypesSvg,
  AnglePairsSvg,
  CircumIncircleSvg,
  OrthoCentroidSvg,
  QuadrilateralFamilySvg,
  RightTriangleBisectorSvg,
  PolygonDiagonalsSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/elemi-geometria/ElementaryGeometrySummaryFigures';

describe("Grade 12 Topic IV - 7. Elemi geometria (összefoglalás) - Components", () => {
  it('renders ElementaryGeometrySummaryTheory without throwing', () => {
    const { container } = render(<ElementaryGeometrySummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ElementaryGeometrySummaryQuiz without throwing', () => {
    const { container } = render(<ElementaryGeometrySummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ElementaryGeometrySummaryMatcher without throwing', () => {
    const { container } = render(<ElementaryGeometrySummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ElementaryGeometrySummarySorter without throwing', () => {
    const { container } = render(<ElementaryGeometrySummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DistanceTypesSvg, AnglePairsSvg, CircumIncircleSvg, OrthoCentroidSvg, QuadrilateralFamilySvg, RightTriangleBisectorSvg, PolygonDiagonalsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
