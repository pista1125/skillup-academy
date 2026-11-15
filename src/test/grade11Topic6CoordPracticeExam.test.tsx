import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CoordPracticeExamTheory } from '@/components/math/grade-11/koordinatageometria/gyakorlas-tudasproba/CoordPracticeExamTheory';
import { CoordPracticeExamQuiz } from '@/components/math/grade-11/koordinatageometria/gyakorlas-tudasproba/CoordPracticeExamQuiz';
import { CoordPracticeExamMatcher } from '@/components/math/grade-11/koordinatageometria/gyakorlas-tudasproba/CoordPracticeExamMatcher';
import { CoordPracticeExamSorter } from '@/components/math/grade-11/koordinatageometria/gyakorlas-tudasproba/CoordPracticeExamSorter';
import {
  CoordPracticeExamPerpLinesSvg,
  CoordPracticeExamTriangleSvg,
  CoordPracticeExamCircleAxisSvg,
  CoordPracticeExamVectorSumSvg,
  CoordPracticeExamRhombusSvg,
  CoordPracticeExamRightTriangleSvg
} from '@/components/math/grade-11/koordinatageometria/gyakorlas-tudasproba/CoordPracticeExamFigures';

describe('Grade 11 Topic VI - 17. Gyakorlás, tudáspróba - Components', () => {
  it('renders CoordPracticeExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CoordPracticeExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CoordPracticeExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CoordPracticeExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      CoordPracticeExamPerpLinesSvg,
      CoordPracticeExamTriangleSvg,
      CoordPracticeExamCircleAxisSvg,
      CoordPracticeExamVectorSumSvg,
      CoordPracticeExamRhombusSvg,
      CoordPracticeExamRightTriangleSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
