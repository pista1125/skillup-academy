import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { VectorsCoordinatesSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/vektorok-koordinatageometria/VectorsCoordinatesSummaryTheory';
import { VectorsCoordinatesSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/vektorok-koordinatageometria/VectorsCoordinatesSummaryQuiz';
import { VectorsCoordinatesSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/vektorok-koordinatageometria/VectorsCoordinatesSummaryMatcher';
import { VectorsCoordinatesSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/vektorok-koordinatageometria/VectorsCoordinatesSummarySorter';
import {
  VectorOpsSvg,
  VectorCoordsSvg,
  LineSlopeSvg,
  TriangleMedianSvg,
  LinesThalesSvg,
  CircleEquationSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/vektorok-koordinatageometria/VectorsCoordinatesSummaryFigures';

describe("Grade 12 Topic IV - 9. Vektorok, koordinátageometria (összefoglalás) - Components", () => {
  it('renders VectorsCoordinatesSummaryTheory without throwing', () => {
    const { container } = render(<VectorsCoordinatesSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders VectorsCoordinatesSummaryQuiz without throwing', () => {
    const { container } = render(<VectorsCoordinatesSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders VectorsCoordinatesSummaryMatcher without throwing', () => {
    const { container } = render(<VectorsCoordinatesSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders VectorsCoordinatesSummarySorter without throwing', () => {
    const { container } = render(<VectorsCoordinatesSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [VectorOpsSvg, VectorCoordsSvg, LineSlopeSvg, TriangleMedianSvg, LinesThalesSvg, CircleEquationSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
