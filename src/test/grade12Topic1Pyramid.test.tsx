import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PyramidTheory } from '@/components/math/grade-12/tergeometria/a-gula/PyramidTheory';
import { PyramidQuiz } from '@/components/math/grade-12/tergeometria/a-gula/PyramidQuiz';
import { PyramidMatcher } from '@/components/math/grade-12/tergeometria/a-gula/PyramidMatcher';
import { PyramidSorter } from '@/components/math/grade-12/tergeometria/a-gula/PyramidSorter';
import {
  PyramidPartsSvg,
  PyramidTypesSvg,
  CheopsSvg,
  PyramidRightTrianglesSvg,
  HexPyramidSvg,
  TetraDihedralSvg
} from '@/components/math/grade-12/tergeometria/a-gula/PyramidFigures';

describe('Grade 12 Topic I - 10. A gúla - Components', () => {
  it('renders PyramidTheory without throwing', () => {
    const { container } = render(<PyramidTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PyramidQuiz without throwing', () => {
    const { container } = render(<PyramidQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PyramidMatcher without throwing', () => {
    const { container } = render(<PyramidMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PyramidSorter without throwing', () => {
    const { container } = render(<PyramidSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PyramidPartsSvg, PyramidTypesSvg, CheopsSvg, PyramidRightTrianglesSvg, HexPyramidSvg, TetraDihedralSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
