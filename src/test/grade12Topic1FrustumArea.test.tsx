import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FrustumAreaTheory } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaTheory';
import { FrustumAreaQuiz } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaQuiz';
import { FrustumAreaMatcher } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaMatcher';
import { FrustumAreaSorter } from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaSorter';
import {
  FrustumAreaCollarSvg,
  FrustumAreaNetSvg,
  FrustumAreaAntalSvg,
  FrustumAreaBandiSvg,
  FrustumAreaSquareSvg,
  FrustumAreaTrapezoidAnalogySvg
} from '@/components/math/grade-12/tergeometria/a-csonkagula-es-a-csonkakup-felszine/FrustumAreaFigures';

describe('Grade 12 Topic I - 15. A csonkagúla és a csonkakúp felszíne - Components', () => {
  it('renders FrustumAreaTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumAreaTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumAreaQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumAreaQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumAreaMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumAreaMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FrustumAreaSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FrustumAreaSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FrustumAreaCollarSvg, FrustumAreaNetSvg, FrustumAreaAntalSvg, FrustumAreaBandiSvg, FrustumAreaSquareSvg, FrustumAreaTrapezoidAnalogySvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
