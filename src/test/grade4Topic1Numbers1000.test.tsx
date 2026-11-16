import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Numbers1000Theory, numberToHungarianWords } from '@/components/math/grade-4/szamolas-10000-ig/szamok-0-tol-1000-ig/Numbers1000Theory';
import { Numbers1000Quiz } from '@/components/math/grade-4/szamolas-10000-ig/szamok-0-tol-1000-ig/Numbers1000Quiz';
import { Numbers1000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/szamok-0-tol-1000-ig/Numbers1000Matcher';
import { Numbers1000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/szamok-0-tol-1000-ig/Numbers1000Sorter';
import {
  AbacusSvg,
  PlaceValueTableSvg,
  NumberLine1000Svg,
  RoundingLineSvg,
  TissueBoxesSvg,
  HundredGridSvg
} from '@/components/math/grade-4/szamolas-10000-ig/szamok-0-tol-1000-ig/Numbers1000Figures';

describe('Grade 4 Topic I - 1. Számok 0-tól 1000-ig - Components', () => {
  it('renders Numbers1000Theory without throwing', () => {
    const { container } = render(<Numbers1000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers1000Quiz without throwing', () => {
    const { container } = render(<Numbers1000Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers1000Matcher without throwing', () => {
    const { container } = render(<Numbers1000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers1000Sorter without throwing', () => {
    const { container } = render(<Numbers1000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [AbacusSvg, PlaceValueTableSvg, NumberLine1000Svg, RoundingLineSvg, TissueBoxesSvg, HundredGridSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('writes numbers in Hungarian words', () => {
    expect(numberToHungarianWords(641)).toBe('hatszáznegyvenegy');
    expect(numberToHungarianWords(226)).toBe('kétszázhuszonhat');
    expect(numberToHungarianWords(406)).toBe('négyszázhat');
    expect(numberToHungarianWords(65)).toBe('hatvanöt');
  });
});
