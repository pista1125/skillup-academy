import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CylinderAreaVolumeTheory } from '@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeTheory';
import { CylinderAreaVolumeQuiz } from '@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeQuiz';
import { CylinderAreaVolumeMatcher } from '@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeMatcher';
import { CylinderAreaVolumeSorter } from '@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeSorter';
import {
  TwoCansSvg,
  CylinderNetSvg,
  CardboardCutSvg,
  PaintRollerSvg,
  ConcertHallSvg
} from '@/components/math/grade-12/tergeometria/a-henger-felszine-es-terfogata/CylinderAreaVolumeFigures';

describe('Grade 12 Topic I - 5. A henger felszíne és térfogata - Components', () => {
  it('renders CylinderAreaVolumeTheory without throwing', () => {
    const { container } = render(<CylinderAreaVolumeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CylinderAreaVolumeQuiz without throwing', () => {
    const { container } = render(<CylinderAreaVolumeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CylinderAreaVolumeMatcher without throwing', () => {
    const { container } = render(<CylinderAreaVolumeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CylinderAreaVolumeSorter without throwing', () => {
    const { container } = render(<CylinderAreaVolumeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TwoCansSvg, CylinderNetSvg, CardboardCutSvg, PaintRollerSvg, ConcertHallSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
