import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SphereAreaVolumeTheory } from '@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeTheory';
import { SphereAreaVolumeQuiz } from '@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeQuiz';
import { SphereAreaVolumeMatcher } from '@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeMatcher';
import { SphereAreaVolumeSorter } from '@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeSorter';
import {
  SphereFormulaSvg,
  MelonMassSvg,
  LeadShotSvg,
  MelonRindSvg,
  ArchimedesSvg,
  BoilerSvg
} from '@/components/math/grade-12/tergeometria/a-gomb-felszine-es-terfogata/SphereAreaVolumeFigures';

describe('Grade 12 Topic I - 7. A gömb felszíne és térfogata - Components', () => {
  it('renders SphereAreaVolumeTheory without throwing', () => {
    const { container } = render(<SphereAreaVolumeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SphereAreaVolumeQuiz without throwing', () => {
    const { container } = render(<SphereAreaVolumeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SphereAreaVolumeMatcher without throwing', () => {
    const { container } = render(<SphereAreaVolumeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SphereAreaVolumeSorter without throwing', () => {
    const { container } = render(<SphereAreaVolumeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SphereFormulaSvg, MelonMassSvg, LeadShotSvg, MelonRindSvg, ArchimedesSvg, BoilerSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
