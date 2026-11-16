import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ConeTheory } from '@/components/math/grade-12/tergeometria/a-forgaskup/ConeTheory';
import { ConeQuiz } from '@/components/math/grade-12/tergeometria/a-forgaskup/ConeQuiz';
import { ConeMatcher } from '@/components/math/grade-12/tergeometria/a-forgaskup/ConeMatcher';
import { ConeSorter } from '@/components/math/grade-12/tergeometria/a-forgaskup/ConeSorter';
import {
  ConePartsSvg,
  ConeFromTriangleSvg,
  RightTriangleConeSvg,
  TriangulumSvg,
  ConicSectionsSvg,
  DoubleConeSvg
} from '@/components/math/grade-12/tergeometria/a-forgaskup/ConeFigures';

describe('Grade 12 Topic I - 12. A forgáskúp - Components', () => {
  it('renders ConeTheory without throwing', () => {
    const { container } = render(<ConeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ConeQuiz without throwing', () => {
    const { container } = render(<ConeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ConeMatcher without throwing', () => {
    const { container } = render(<ConeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ConeSorter without throwing', () => {
    const { container } = render(<ConeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ConePartsSvg, ConeFromTriangleSvg, RightTriangleConeSvg, TriangulumSvg, ConicSectionsSvg, DoubleConeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
