import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CoordGroupPracticeTheory } from '@/components/math/grade-11/koordinatageometria/gyakorlas-csoportban/CoordGroupPracticeTheory';
import { CoordGroupPracticeQuiz } from '@/components/math/grade-11/koordinatageometria/gyakorlas-csoportban/CoordGroupPracticeQuiz';
import { CoordGroupPracticeMatcher } from '@/components/math/grade-11/koordinatageometria/gyakorlas-csoportban/CoordGroupPracticeMatcher';
import { CoordGroupPracticeSorter } from '@/components/math/grade-11/koordinatageometria/gyakorlas-csoportban/CoordGroupPracticeSorter';
import {
  GroupParallelogramSvg,
  RotatedVectorsSquareSvg,
  SquareFromCenterSvg,
  ParallelogramThreeCasesSvg,
  VarignonSvg,
  OctagonWellSvg
} from '@/components/math/grade-11/koordinatageometria/gyakorlas-csoportban/CoordGroupPracticeFigures';

describe('Grade 11 Topic VI - 8. Gyakorlás csoportban - Components', () => {
  it('renders CoordGroupPracticeTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordGroupPracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CoordGroupPracticeQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordGroupPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CoordGroupPracticeMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordGroupPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CoordGroupPracticeSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordGroupPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      GroupParallelogramSvg,
      RotatedVectorsSquareSvg,
      SquareFromCenterSvg,
      ParallelogramThreeCasesSvg,
      VarignonSvg,
      OctagonWellSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
