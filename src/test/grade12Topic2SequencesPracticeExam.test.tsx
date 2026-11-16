import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SequencesPracticeExamTheory } from '@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamTheory';
import { SequencesPracticeExamQuiz } from '@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamQuiz';
import { SequencesPracticeExamMatcher } from '@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamMatcher';
import { SequencesPracticeExamSorter } from '@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamSorter';
import {
  ChapterMapSvg,
  StairsFibonacciSvg,
  HorseshoeNailsSvg,
  InheritanceSvg,
  SalaryOffersSvg,
  RabbitsSvg
} from '@/components/math/grade-12/sorozatok/gyakorlas-tudasproba/SequencesPracticeExamFigures';

describe('Grade 12 Topic II - 10. Gyakorlás, tudáspróba - Components', () => {
  it('renders SequencesPracticeExamTheory without throwing', () => {
    const { container } = render(<SequencesPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SequencesPracticeExamQuiz without throwing', () => {
    const { container } = render(<SequencesPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SequencesPracticeExamMatcher without throwing', () => {
    const { container } = render(<SequencesPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SequencesPracticeExamSorter without throwing', () => {
    const { container } = render(<SequencesPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, StairsFibonacciSvg, HorseshoeNailsSvg, InheritanceSvg, SalaryOffersSvg, RabbitsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
