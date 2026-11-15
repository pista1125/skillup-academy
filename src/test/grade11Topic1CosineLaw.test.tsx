import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CosineLawTheory } from '@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawTheory';
import { CosineLawQuiz } from '@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawQuiz';
import { CosineLawMatcher } from '@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawMatcher';
import { CosineLawSorter } from '@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawSorter';
import {
  FlightMapSvg,
  CosineLawDerivationSvg,
  CosineLawGeneralSvg,
  WaterMoleculeSvg,
  ParallelogramDiagonalsSvg
} from '@/components/math/grade-11/trigonometria/a-koszinusztetel/CosineLawFigures';

describe('Grade 11 Topic I - 11. A koszinusztétel - Components', () => {
  it('renders CosineLawTheory without throwing', () => {
    const { container } = render(<CosineLawTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CosineLawQuiz without throwing', () => {
    const { container } = render(<CosineLawQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CosineLawMatcher without throwing', () => {
    const { container } = render(<CosineLawMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CosineLawSorter without throwing', () => {
    const { container } = render(<CosineLawSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FlightMapSvg, CosineLawDerivationSvg, CosineLawGeneralSvg, WaterMoleculeSvg, ParallelogramDiagonalsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
