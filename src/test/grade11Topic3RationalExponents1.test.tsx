import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RationalExponents1Theory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Theory';
import { RationalExponents1Quiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Quiz';
import { RationalExponents1Matcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Matcher';
import { RationalExponents1Sorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Sorter';
import {
  PopulationThirdsSvg,
  RootPowerBridgeSvg,
  WaterLilyGrowthSvg,
  SemitoneOctaveSvg,
  RootCycleSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/racionalis-szamok-kitevoben-1/RationalExponents1Figures';

describe('Grade 11 Topic III - 3. Racionális számok a kitevőben I. - Components', () => {
  it('renders RationalExponents1Theory without throwing', () => {
    const { container } = render(<RationalExponents1Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RationalExponents1Quiz without throwing', () => {
    const { container } = render(<RationalExponents1Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders RationalExponents1Matcher without throwing', () => {
    const { container } = render(<RationalExponents1Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RationalExponents1Sorter without throwing', () => {
    const { container } = render(<RationalExponents1Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PopulationThirdsSvg, RootPowerBridgeSvg, WaterLilyGrowthSvg, SemitoneOctaveSvg, RootCycleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
