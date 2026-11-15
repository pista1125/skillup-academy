import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumberTheoryPracticeExamTheory } from '@/components/math/grade-11/szamelmelet/gyakorlas-tudasproba/NumberTheoryPracticeExamTheory';
import { NumberTheoryPracticeExamQuiz } from '@/components/math/grade-11/szamelmelet/gyakorlas-tudasproba/NumberTheoryPracticeExamQuiz';
import { NumberTheoryPracticeExamMatcher } from '@/components/math/grade-11/szamelmelet/gyakorlas-tudasproba/NumberTheoryPracticeExamMatcher';
import { NumberTheoryPracticeExamSorter } from '@/components/math/grade-11/szamelmelet/gyakorlas-tudasproba/NumberTheoryPracticeExamSorter';
import {
  NumberTheoryExamExponentTableSvg,
  NumberTheoryExamDigitsSvg,
  NumberTheoryExamCalendarSvg,
  NumberTheoryExamBaseConversionSvg,
  NumberTheoryExamNumberSetsSvg,
  NumberTheoryExamTheodorusSvg
} from '@/components/math/grade-11/szamelmelet/gyakorlas-tudasproba/NumberTheoryPracticeExamFigures';

describe('Grade 11 Topic IV - 11. Gyakorlás, tudáspróba - Components', () => {
  it('renders NumberTheoryPracticeExamTheory without throwing', () => {
    const { container } = render(<NumberTheoryPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NumberTheoryPracticeExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<NumberTheoryPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NumberTheoryPracticeExamMatcher without throwing', () => {
    const { container } = render(<NumberTheoryPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumberTheoryPracticeExamSorter without throwing', () => {
    const { container } = render(<NumberTheoryPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      NumberTheoryExamExponentTableSvg,
      NumberTheoryExamDigitsSvg,
      NumberTheoryExamCalendarSvg,
      NumberTheoryExamBaseConversionSvg,
      NumberTheoryExamNumberSetsSvg,
      NumberTheoryExamTheodorusSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
