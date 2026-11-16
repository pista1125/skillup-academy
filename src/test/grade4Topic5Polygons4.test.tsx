import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Polygons4Theory } from '@/components/math/grade-4/sikidomok-testek/sikidomok-sokszogek/Polygons4Theory';
import { Polygons4Quiz } from '@/components/math/grade-4/sikidomok-testek/sikidomok-sokszogek/Polygons4Quiz';
import { Polygons4Matcher } from '@/components/math/grade-4/sikidomok-testek/sikidomok-sokszogek/Polygons4Matcher';
import { Polygons4Sorter } from '@/components/math/grade-4/sikidomok-testek/sikidomok-sokszogek/Polygons4Sorter';
import {
  PlaneShapesSvg,
  ParallelLinesSvg,
  AngleTypesSvg,
  RectSquareSvg,
  PolygonPartsSvg,
  DentShapesSvg
} from '@/components/math/grade-4/sikidomok-testek/sikidomok-sokszogek/Polygons4Figures';

describe('Grade 4 Topic V - 1. Síkidomok, sokszögek - Components', () => {
  it('renders Polygons4Theory without throwing', () => {
    const { container } = render(<Polygons4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Polygons4Quiz without throwing', () => {
    const { container } = render(<Polygons4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Polygons4Matcher without throwing', () => {
    const { container } = render(<Polygons4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Polygons4Sorter without throwing', () => {
    const { container } = render(<Polygons4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PlaneShapesSvg, ParallelLinesSvg, AngleTypesSvg, RectSquareSvg, PolygonPartsSvg, DentShapesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
