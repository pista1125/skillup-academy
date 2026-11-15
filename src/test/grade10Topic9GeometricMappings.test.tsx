import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GeometricMappingsTheory } from '@/components/math/grade-10/hasonlosag/geometriai-hozzarendelesek/GeometricMappingsTheory';
import { GeometricMappingsQuiz } from '@/components/math/grade-10/hasonlosag/geometriai-hozzarendelesek/GeometricMappingsQuiz';
import { GeometricMappingsMatcher } from '@/components/math/grade-10/hasonlosag/geometriai-hozzarendelesek/GeometricMappingsMatcher';
import { GeometricMappingsSorter } from '@/components/math/grade-10/hasonlosag/geometriai-hozzarendelesek/GeometricMappingsSorter';
import {
  TransformationHierarchySvg,
  OrthogonalProjectionSvg,
  SundialProjectionSvg,
  TechnicalDrawingViewsSvg,
  VectorWorkProjectionSvg
} from '@/components/math/grade-10/hasonlosag/geometriai-hozzarendelesek/GeometricMappingsFigures';

describe('Grade 10 Topic IX - 3. Geometriai hozzárendelések - Components', () => {
  it('renders GeometricMappingsTheory without throwing', () => {
    const { container } = render(<GeometricMappingsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricMappingsQuiz without throwing', () => {
    const { container } = render(<GeometricMappingsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricMappingsMatcher without throwing', () => {
    const { container } = render(<GeometricMappingsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricMappingsSorter without throwing', () => {
    const { container } = render(<GeometricMappingsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<TransformationHierarchySvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<OrthogonalProjectionSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<SundialProjectionSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<TechnicalDrawingViewsSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<VectorWorkProjectionSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

