import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PolygonTrigTheory } from '@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigTheory';
import { PolygonTrigQuiz } from '@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigQuiz';
import { PolygonTrigMatcher } from '@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigMatcher';
import { PolygonTrigSorter } from '@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigSorter';
import {
  IsoscelesSplitSvg,
  EmbankmentSvg,
  HungaryTriangleSvg,
  ObtuseTangentSvg,
  TriangulationSvg
} from '@/components/math/grade-11/trigonometria/sokszogek-es-szogfuggvenyek/PolygonTrigFigures';

describe('Grade 11 Topic I - 12. Sokszögek és szögfüggvények - Components', () => {
  it('renders PolygonTrigTheory without throwing', () => {
    const { container } = render(<PolygonTrigTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonTrigQuiz without throwing', () => {
    const { container } = render(<PolygonTrigQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonTrigMatcher without throwing', () => {
    const { container } = render(<PolygonTrigMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonTrigSorter without throwing', () => {
    const { container } = render(<PolygonTrigSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [IsoscelesSplitSvg, EmbankmentSvg, HungaryTriangleSvg, ObtuseTangentSvg, TriangulationSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
