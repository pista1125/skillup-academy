import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PyramidAreaVolumeTheory } from '@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeTheory';
import { PyramidAreaVolumeQuiz } from '@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeQuiz';
import { PyramidAreaVolumeMatcher } from '@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeMatcher';
import { PyramidAreaVolumeSorter } from '@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeSorter';
import {
  MilkTetraSvg,
  PyramidNetSvg,
  PrismVsPyramidSvg,
  CubeTetraSvg,
  RoofSvg,
  CubeThreePyramidsSvg
} from '@/components/math/grade-12/tergeometria/a-gula-felszine-es-terfogata/PyramidAreaVolumeFigures';

describe('Grade 12 Topic I - 11. A gúla felszíne és térfogata - Components', () => {
  it('renders PyramidAreaVolumeTheory without throwing', () => {
    const { container } = render(<PyramidAreaVolumeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PyramidAreaVolumeQuiz without throwing', () => {
    const { container } = render(<PyramidAreaVolumeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PyramidAreaVolumeMatcher without throwing', () => {
    const { container } = render(<PyramidAreaVolumeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PyramidAreaVolumeSorter without throwing', () => {
    const { container } = render(<PyramidAreaVolumeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MilkTetraSvg, PyramidNetSvg, PrismVsPyramidSvg, CubeTetraSvg, RoofSvg, CubeThreePyramidsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
