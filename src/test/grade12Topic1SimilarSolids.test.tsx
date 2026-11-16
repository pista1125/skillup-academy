import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SimilarSolidsTheory } from '@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsTheory';
import { SimilarSolidsQuiz } from '@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsQuiz';
import { SimilarSolidsMatcher } from '@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsMatcher';
import { SimilarSolidsSorter } from '@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsSorter';
import {
  RubikCubesSvg,
  RatioPowersSvg,
  CylinderScaleSvg,
  ConcreteCubeSvg,
  BonbonSvg,
  MinyonSvg
} from '@/components/math/grade-12/tergeometria/hasonlo-testek-felszine-terfogata/SimilarSolidsFigures';

describe('Grade 12 Topic I - 8. Hasonló testek felszíne, térfogata - Components', () => {
  it('renders SimilarSolidsTheory without throwing', () => {
    const { container } = render(<SimilarSolidsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarSolidsQuiz without throwing', () => {
    const { container } = render(<SimilarSolidsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarSolidsMatcher without throwing', () => {
    const { container } = render(<SimilarSolidsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarSolidsSorter without throwing', () => {
    const { container } = render(<SimilarSolidsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RubikCubesSvg, RatioPowersSvg, CylinderScaleSvg, ConcreteCubeSvg, BonbonSvg, MinyonSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
