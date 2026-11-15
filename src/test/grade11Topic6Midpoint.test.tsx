import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MidpointTheory } from '@/components/math/grade-11/koordinatageometria/felezopont/MidpointTheory';
import { MidpointQuiz } from '@/components/math/grade-11/koordinatageometria/felezopont/MidpointQuiz';
import { MidpointMatcher } from '@/components/math/grade-11/koordinatageometria/felezopont/MidpointMatcher';
import { MidpointSorter } from '@/components/math/grade-11/koordinatageometria/felezopont/MidpointSorter';
import {
  EscalatorMidpointSvg,
  MidpointParallelogramSvg,
  MidpointFormulaSvg,
  QuarterPointsSvg,
  CentroidSvg,
  VerticesFromMidpointsSvg
} from '@/components/math/grade-11/koordinatageometria/felezopont/MidpointFigures';

describe('Grade 11 Topic VI - 7. Felezőpont - Components', () => {
  it('renders MidpointTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MidpointTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MidpointQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MidpointQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MidpointMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MidpointMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MidpointSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MidpointSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      EscalatorMidpointSvg,
      MidpointParallelogramSvg,
      MidpointFormulaSvg,
      QuarterPointsSvg,
      CentroidSvg,
      VerticesFromMidpointsSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
