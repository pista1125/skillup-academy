import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TrigGroupCompetitionTheory } from '@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionTheory';
import { TrigGroupCompetitionQuiz } from '@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionQuiz';
import { TrigGroupCompetitionMatcher } from '@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionMatcher';
import { TrigGroupCompetitionSorter } from '@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionSorter';
import {
  ParallelogramDiagonalsSvg,
  ParallelogramAreaSvg,
  TowerTriangleSvg,
  AmbiguousTrianglesSvg,
  Segment110Svg,
  SineCurveSvg
} from '@/components/math/grade-11/trigonometria/csoportverseny/TrigGroupCompetitionFigures';

describe('Grade 11 Topic I - 14. Csoportverseny - Components', () => {
  it('renders TrigGroupCompetitionTheory without throwing', () => {
    const { container } = render(<TrigGroupCompetitionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TrigGroupCompetitionQuiz without throwing', () => {
    const { container } = render(<TrigGroupCompetitionQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TrigGroupCompetitionMatcher without throwing', () => {
    const { container } = render(<TrigGroupCompetitionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TrigGroupCompetitionSorter without throwing', () => {
    const { container } = render(<TrigGroupCompetitionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ParallelogramDiagonalsSvg, ParallelogramAreaSvg, TowerTriangleSvg, AmbiguousTrianglesSvg, Segment110Svg, SineCurveSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
