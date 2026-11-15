import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TowerHeightTrigTheory } from '@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigTheory';
import { TowerHeightTrigQuiz } from '@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigQuiz';
import { TowerHeightTrigMatcher } from '@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigMatcher';
import { TowerHeightTrigSorter } from '@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigSorter';
import {
  TowerPerspectiveSvg,
  TowerTwoTrianglesSvg,
  TowerFromLSvg,
  LedLampSvg,
  PyramidRoofSvg,
  CubeDiagonalSvg
} from '@/components/math/grade-11/trigonometria/milyen-magas-a-torony/TowerHeightTrigFigures';

describe('Grade 11 Topic I - Ráadás: Milyen magas a torony? - Components', () => {
  it('renders TowerHeightTrigTheory without throwing', () => {
    const { container } = render(<TowerHeightTrigTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TowerHeightTrigQuiz without throwing', () => {
    const { container } = render(<TowerHeightTrigQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TowerHeightTrigMatcher without throwing', () => {
    const { container } = render(<TowerHeightTrigMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TowerHeightTrigSorter without throwing', () => {
    const { container } = render(<TowerHeightTrigSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TowerPerspectiveSvg, TowerTwoTrianglesSvg, TowerFromLSvg, LedLampSvg, PyramidRoofSvg, CubeDiagonalSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
