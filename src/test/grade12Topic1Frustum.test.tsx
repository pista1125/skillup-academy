import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FrustumTheory } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumTheory';
import { FrustumQuiz } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumQuiz';
import { FrustumMatcher } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumMatcher';
import { FrustumSorter } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumSorter';
import {
  FrustumPartsSvg,
  PyramidCutSvg,
  TrapezoidRotationSvg,
  BonbonSvg,
  RightTrapezoidSvg,
  SkirtPatternSvg
} from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup/FrustumFigures';

describe('Grade 12 Topic I - 14. A csonkagúla és a csonkakúp - Components', () => {
  it('renders FrustumTheory without throwing', () => {
    const { container } = render(<FrustumTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumQuiz without throwing', () => {
    const { container } = render(<FrustumQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumMatcher without throwing', () => {
    const { container } = render(<FrustumMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumSorter without throwing', () => {
    const { container } = render(<FrustumSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FrustumPartsSvg, PyramidCutSvg, TrapezoidRotationSvg, BonbonSvg, RightTrapezoidSvg, SkirtPatternSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
