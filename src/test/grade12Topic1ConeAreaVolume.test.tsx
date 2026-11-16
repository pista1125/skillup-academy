import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ConeAreaVolumeTheory } from '@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeTheory';
import { ConeAreaVolumeQuiz } from '@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeQuiz';
import { ConeAreaVolumeMatcher } from '@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeMatcher';
import { ConeAreaVolumeSorter } from '@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeSorter';
import {
  ArchimedesSvg,
  ConeNetSvg,
  SectorSvg,
  GravelPileSvg,
  PartyHatSvg,
  ConeVsCylinderSvg
} from '@/components/math/grade-12/tergeometria/a-forgaskup-felszine-es-terfogata/ConeAreaVolumeFigures';

describe('Grade 12 Topic I - 13. A forgáskúp felszíne és térfogata - Components', () => {
  it('renders ConeAreaVolumeTheory without throwing', () => {
    const { container } = render(<ConeAreaVolumeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ConeAreaVolumeQuiz without throwing', () => {
    const { container } = render(<ConeAreaVolumeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ConeAreaVolumeMatcher without throwing', () => {
    const { container } = render(<ConeAreaVolumeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ConeAreaVolumeSorter without throwing', () => {
    const { container } = render(<ConeAreaVolumeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ArchimedesSvg, ConeNetSvg, SectorSvg, GravelPileSvg, PartyHatSvg, ConeVsCylinderSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
