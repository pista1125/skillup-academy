import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SpatialAnglesTheory } from '@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesTheory';
import { SpatialAnglesQuiz } from '@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesQuiz';
import { SpatialAnglesMatcher } from '@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesMatcher';
import { SpatialAnglesSorter } from '@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesSorter';
import {
  CrateDiagonalsSvg,
  DiagonalBaseAngleSvg,
  LineLineAngleSvg,
  LinePlaneAngleSvg,
  PlanePlaneAngleSvg,
  SquarePrismPlaneSvg
} from '@/components/math/grade-12/tergeometria/terelemek-hajlasszoge/SpatialAnglesFigures';

describe('Grade 12 Topic I - 9. Térelemek hajlásszöge - Components', () => {
  it('renders SpatialAnglesTheory without throwing', () => {
    const { container } = render(<SpatialAnglesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SpatialAnglesQuiz without throwing', () => {
    const { container } = render(<SpatialAnglesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SpatialAnglesMatcher without throwing', () => {
    const { container } = render(<SpatialAnglesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SpatialAnglesSorter without throwing', () => {
    const { container } = render(<SpatialAnglesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CrateDiagonalsSvg, DiagonalBaseAngleSvg, LineLineAngleSvg, LinePlaneAngleSvg, PlanePlaneAngleSvg, SquarePrismPlaneSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
