import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SineLawApplicationsTheory } from '@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsTheory';
import { SineLawApplicationsQuiz } from '@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsQuiz';
import { SineLawApplicationsMatcher } from '@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsMatcher';
import { SineLawApplicationsSorter } from '@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsSorter';
import {
  AirplaneBeaconSvg,
  AmbiguousCaseSvg,
  MountainHeightSvg,
  ConstructibilitySvg,
  PisaTowerSvg
} from '@/components/math/grade-11/trigonometria/alkalmazasok-szinusztetel/SineLawApplicationsFigures';

describe('Grade 11 Topic I - 9. Alkalmazások (szinusztétel) - Components', () => {
  it('renders SineLawApplicationsTheory without throwing', () => {
    const { container } = render(<SineLawApplicationsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SineLawApplicationsQuiz without throwing', () => {
    const { container } = render(<SineLawApplicationsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SineLawApplicationsMatcher without throwing', () => {
    const { container } = render(<SineLawApplicationsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SineLawApplicationsSorter without throwing', () => {
    const { container } = render(<SineLawApplicationsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      AirplaneBeaconSvg,
      AmbiguousCaseSvg,
      MountainHeightSvg,
      ConstructibilitySvg,
      PisaTowerSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
