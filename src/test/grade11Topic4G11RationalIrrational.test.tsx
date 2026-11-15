import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { G11RationalIrrationalTheory } from '@/components/math/grade-11/szamelmelet/racionalis-irracionalis-szamok/G11RationalIrrationalTheory';
import { G11RationalIrrationalQuiz } from '@/components/math/grade-11/szamelmelet/racionalis-irracionalis-szamok/G11RationalIrrationalQuiz';
import { G11RationalIrrationalMatcher } from '@/components/math/grade-11/szamelmelet/racionalis-irracionalis-szamok/G11RationalIrrationalMatcher';
import { G11RationalIrrationalSorter } from '@/components/math/grade-11/szamelmelet/racionalis-irracionalis-szamok/G11RationalIrrationalSorter';
import {
  NumberSetsVennSvg,
  UnitSquareDiagonalSvg,
  Sqrt5ConstructionSvg,
  TheodorusSpiralSvg,
  DecimalKindsSvg
} from '@/components/math/grade-11/szamelmelet/racionalis-irracionalis-szamok/G11RationalIrrationalFigures';

describe('Grade 11 Topic IV - 51. Racionális számok, irracionális számok - Components', () => {
  it('renders G11RationalIrrationalTheory without throwing', () => {
    const { container } = render(<G11RationalIrrationalTheory />);
    expect(container).toBeTruthy();
  });

  it('renders G11RationalIrrationalQuiz without throwing', () => {
    const { container } = render(<G11RationalIrrationalQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders G11RationalIrrationalMatcher without throwing', () => {
    const { container } = render(<G11RationalIrrationalMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders G11RationalIrrationalSorter without throwing', () => {
    const { container } = render(<G11RationalIrrationalSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NumberSetsVennSvg, UnitSquareDiagonalSvg, Sqrt5ConstructionSvg, TheodorusSpiralSvg, DecimalKindsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
