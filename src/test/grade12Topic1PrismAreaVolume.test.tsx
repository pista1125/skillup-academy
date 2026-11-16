import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PrismAreaVolumeTheory } from '@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeTheory';
import { PrismAreaVolumeQuiz } from '@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeQuiz';
import { PrismAreaVolumeMatcher } from '@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeMatcher';
import { PrismAreaVolumeSorter } from '@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeSorter';
import {
  HammerHeadSvg,
  PrismNetSvg,
  OctaBaseAreaSvg,
  IBeamSvg,
  DrainSvg,
  CardDeckSvg
} from '@/components/math/grade-12/tergeometria/a-hasab-felszine-es-terfogata/PrismAreaVolumeFigures';

describe('Grade 12 Topic I - 3. A hasáb felszíne és térfogata - Components', () => {
  it('renders PrismAreaVolumeTheory without throwing', () => {
    const { container } = render(<PrismAreaVolumeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PrismAreaVolumeQuiz without throwing', () => {
    const { container } = render(<PrismAreaVolumeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PrismAreaVolumeMatcher without throwing', () => {
    const { container } = render(<PrismAreaVolumeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PrismAreaVolumeSorter without throwing', () => {
    const { container } = render(<PrismAreaVolumeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [HammerHeadSvg, PrismNetSvg, OctaBaseAreaSvg, IBeamSvg, DrainSvg, CardDeckSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
