import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TrigPracticeExamTheory } from '@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamTheory';
import { TrigPracticeExamQuiz } from '@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamQuiz';
import { TrigPracticeExamMatcher } from '@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamMatcher';
import { TrigPracticeExamSorter } from '@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamSorter';
import {
  TangentsCircleSvg,
  QuadDiagonalSvg,
  BucketForcesSvg,
  AtticCrossSectionSvg,
  MedianTriangleSvg,
  PentagonStoneSvg
} from '@/components/math/grade-11/trigonometria/gyakorlas-tudasproba/TrigPracticeExamFigures';

describe('Grade 11 Topic I - 15. Gyakorlás, tudáspróba - Components', () => {
  it('renders TrigPracticeExamTheory without throwing', () => {
    const { container } = render(<TrigPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TrigPracticeExamQuiz without throwing', () => {
    const { container } = render(<TrigPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TrigPracticeExamMatcher without throwing', () => {
    const { container } = render(<TrigPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TrigPracticeExamSorter without throwing', () => {
    const { container } = render(<TrigPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TangentsCircleSvg, QuadDiagonalSvg, BucketForcesSvg, AtticCrossSectionSvg, MedianTriangleSvg, PentagonStoneSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
