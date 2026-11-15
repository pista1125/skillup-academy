import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SineLawTheory } from '@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawTheory';
import { SineLawQuiz } from '@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawQuiz';
import { SineLawMatcher } from '@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawMatcher';
import { SineLawSorter } from '@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawSorter';
import {
  NewBridgeSvg,
  BridgeCablesSvg,
  SineLawProofSvg,
  ShipDistanceSvg,
  SideSumTriangleSvg
} from '@/components/math/grade-11/trigonometria/a-szinusztetel/SineLawFigures';

describe('Grade 11 Topic I - 8. A szinusztétel - Components', () => {
  it('renders SineLawTheory without throwing', () => {
    const { container } = render(<SineLawTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SineLawQuiz without throwing', () => {
    const { container } = render(<SineLawQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SineLawMatcher without throwing', () => {
    const { container } = render(<SineLawMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SineLawSorter without throwing', () => {
    const { container } = render(<SineLawSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      NewBridgeSvg,
      BridgeCablesSvg,
      SineLawProofSvg,
      ShipDistanceSvg,
      SideSumTriangleSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
