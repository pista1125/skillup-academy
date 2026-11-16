import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GeometricSequenceTheory } from '@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceTheory';
import { GeometricSequenceQuiz } from '@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceQuiz';
import { GeometricSequenceMatcher } from '@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceMatcher';
import { GeometricSequenceSorter } from '@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceSorter';
import {
  NestedSquaresSvg,
  GeometricChainSvg,
  QuotientTypesSvg,
  TwoSolutionsSvg,
  ForestDeclineSvg
} from '@/components/math/grade-12/sorozatok/mertani-sorozatok/GeometricSequenceFigures';

describe("Grade 12 Topic II - 5. Mértani sorozatok - Components", () => {
  it('renders GeometricSequenceTheory without throwing', () => {
    const { container } = render(<GeometricSequenceTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricSequenceQuiz without throwing', () => {
    const { container } = render(<GeometricSequenceQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricSequenceMatcher without throwing', () => {
    const { container } = render(<GeometricSequenceMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricSequenceSorter without throwing', () => {
    const { container } = render(<GeometricSequenceSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NestedSquaresSvg, GeometricChainSvg, QuotientTypesSvg, TwoSolutionsSvg, ForestDeclineSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
