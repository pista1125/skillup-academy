import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Perimeter4Theory } from '@/components/math/grade-4/meresek/a-kerulet-merese/Perimeter4Theory';
import { Perimeter4Quiz } from '@/components/math/grade-4/meresek/a-kerulet-merese/Perimeter4Quiz';
import { Perimeter4Matcher } from '@/components/math/grade-4/meresek/a-kerulet-merese/Perimeter4Matcher';
import { Perimeter4Sorter } from '@/components/math/grade-4/meresek/a-kerulet-merese/Perimeter4Sorter';
import {
  WalkAroundRectSvg,
  StickPolygonsSvg,
  SwimmingPoolSvg,
  GardenPlanSvg,
  GridPerimeterSvg
} from '@/components/math/grade-4/meresek/a-kerulet-merese/Perimeter4Figures';

describe('Grade 4 Topic II - 2. A kerület mérése - Components', () => {
  it('renders Perimeter4Theory without throwing', () => {
    const { container } = render(<Perimeter4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Perimeter4Quiz without throwing', () => {
    const { container } = render(<Perimeter4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Perimeter4Matcher without throwing', () => {
    const { container } = render(<Perimeter4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Perimeter4Sorter without throwing', () => {
    const { container } = render(<Perimeter4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WalkAroundRectSvg, StickPolygonsSvg, SwimmingPoolSvg, GardenPlanSvg, GridPerimeterSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
