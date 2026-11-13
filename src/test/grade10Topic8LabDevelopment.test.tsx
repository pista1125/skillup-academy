import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LabDevelopmentTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentTheory';
import { LabDevelopmentQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentQuiz';
import { LabDevelopmentMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentMatcher';
import { LabDevelopmentSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentSorter';
import {
  MixingBeakersSvg,
  ParallelFlowTubesSvg,
  DilutionStepsSvg,
  TechnicalFormulaBridgeSvg,
  LabBalanceBeakerSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/laboratoriumi-fejlesztesek/LabDevelopmentFigures';

describe('Grade 10 Topic VIII - Laboratóriumi fejlesztések - Components', () => {
  it('renders LabDevelopmentTheory without throwing', () => {
    const { container } = render(<LabDevelopmentTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Laboratóriumi fejlesztések');
  });

  it('renders LabDevelopmentQuiz without throwing', () => {
    const { container } = render(<LabDevelopmentQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders LabDevelopmentMatcher without throwing', () => {
    const { container } = render(<LabDevelopmentMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders LabDevelopmentSorter without throwing', () => {
    const { container } = render(<LabDevelopmentSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<MixingBeakersSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ParallelFlowTubesSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<DilutionStepsSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<TechnicalFormulaBridgeSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<LabBalanceBeakerSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

