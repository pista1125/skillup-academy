import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LinesInPlaneTheory } from '@/components/math/grade-11/koordinatageometria/egyenesek-a-koordinata-rendszerben/LinesInPlaneTheory';
import { LinesInPlaneQuiz } from '@/components/math/grade-11/koordinatageometria/egyenesek-a-koordinata-rendszerben/LinesInPlaneQuiz';
import { LinesInPlaneMatcher } from '@/components/math/grade-11/koordinatageometria/egyenesek-a-koordinata-rendszerben/LinesInPlaneMatcher';
import { LinesInPlaneSorter } from '@/components/math/grade-11/koordinatageometria/egyenesek-a-koordinata-rendszerben/LinesInPlaneSorter';
import {
  IntroLinesSvg,
  AxisParallelLinesSvg,
  GeneralLineSvg,
  TranslatedLineSvg,
  PointOnLineSvg,
  DirectionNormalSvg
} from '@/components/math/grade-11/koordinatageometria/egyenesek-a-koordinata-rendszerben/LinesInPlaneFigures';

describe('Grade 11 Topic VI - 9. Egyenesek a koordináta-rendszerben - Components', () => {
  it('renders LinesInPlaneTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LinesInPlaneTheory />);
    expect(container).toBeTruthy();
  });

  it('renders LinesInPlaneQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LinesInPlaneQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders LinesInPlaneMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LinesInPlaneMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders LinesInPlaneSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LinesInPlaneSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [IntroLinesSvg, AxisParallelLinesSvg, GeneralLineSvg, TranslatedLineSvg, PointOnLineSvg, DirectionNormalSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
