import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FrustumVolumeTheory } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeTheory';
import { FrustumVolumeQuiz } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeQuiz';
import { FrustumVolumeMatcher } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeMatcher';
import { FrustumVolumeSorter } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeSorter';
import {
  FrustumVolumeCheeseSvg,
  FrustumVolumeHeightTriangleSvg,
  FrustumVolumeFormulasSvg,
  FrustumVolumeConeCutsSvg,
  FrustumVolumeComplementSvg,
  FrustumVolumeDifferenceSvg
} from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-terfogata/FrustumVolumeFigures';

describe('Grade 12 Topic I - 16. A csonkagúla és a csonkakúp térfogata - Components', () => {
  it('renders FrustumVolumeTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumVolumeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumVolumeQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumVolumeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumVolumeMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumVolumeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumVolumeSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumVolumeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FrustumVolumeCheeseSvg, FrustumVolumeHeightTriangleSvg, FrustumVolumeFormulasSvg, FrustumVolumeConeCutsSvg, FrustumVolumeComplementSvg, FrustumVolumeDifferenceSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
