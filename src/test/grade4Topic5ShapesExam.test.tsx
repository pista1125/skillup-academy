import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ShapesExamTheory } from '@/components/math/grade-4/sikidomok-testek/gyakorlas-tudasproba/ShapesExamTheory';
import { ShapesExamQuiz } from '@/components/math/grade-4/sikidomok-testek/gyakorlas-tudasproba/ShapesExamQuiz';
import { ShapesExamMatcher } from '@/components/math/grade-4/sikidomok-testek/gyakorlas-tudasproba/ShapesExamMatcher';
import { ShapesExamSorter } from '@/components/math/grade-4/sikidomok-testek/gyakorlas-tudasproba/ShapesExamSorter';
import {
  AngleGroupsSvg,
  SolidsVsShapesSvg,
  PolygonVennSvg,
  ShapePropertiesSvg,
  MovesOverviewSvg,
  BuildingPlanSvg
} from '@/components/math/grade-4/sikidomok-testek/gyakorlas-tudasproba/ShapesExamFigures';

describe('Grade 4 Topic V - 9. Gyakorlás, tudáspróba - Components', () => {
  it('renders ShapesExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ShapesExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ShapesExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ShapesExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ShapesExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ShapesExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ShapesExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ShapesExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [AngleGroupsSvg, SolidsVsShapesSvg, PolygonVennSvg, ShapePropertiesSvg, MovesOverviewSvg, BuildingPlanSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
