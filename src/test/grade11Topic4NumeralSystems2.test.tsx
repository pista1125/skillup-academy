import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumeralSystems2Theory } from '@/components/math/grade-11/szamelmelet/szamrendszerek-2/NumeralSystems2Theory';
import { NumeralSystems2Quiz } from '@/components/math/grade-11/szamelmelet/szamrendszerek-2/NumeralSystems2Quiz';
import { NumeralSystems2Matcher } from '@/components/math/grade-11/szamelmelet/szamrendszerek-2/NumeralSystems2Matcher';
import { NumeralSystems2Sorter } from '@/components/math/grade-11/szamelmelet/szamrendszerek-2/NumeralSystems2Sorter';
import {
  EggPackingSvg,
  DivisionChainSvg,
  BinaryToQuaternarySvg,
  BinOctHexSvg,
  BinaryAdditionSvg,
  NumberCardsSvg
} from '@/components/math/grade-11/szamelmelet/szamrendszerek-2/NumeralSystems2Figures';

describe('Grade 11 Topic IV - 49. Számrendszerek II. - Components', () => {
  it('renders NumeralSystems2Theory without throwing', () => {
    const { container } = render(<NumeralSystems2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders NumeralSystems2Quiz without throwing', () => {
    const { container } = render(<NumeralSystems2Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders NumeralSystems2Matcher without throwing', () => {
    const { container } = render(<NumeralSystems2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumeralSystems2Sorter without throwing', () => {
    const { container } = render(<NumeralSystems2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [EggPackingSvg, DivisionChainSvg, BinaryToQuaternarySvg, BinOctHexSvg, BinaryAdditionSvg, NumberCardsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
