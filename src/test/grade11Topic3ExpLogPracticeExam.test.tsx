import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ExpLogPracticeExamTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamTheory';
import { ExpLogPracticeExamQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamQuiz';
import { ExpLogPracticeExamMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamMatcher';
import { ExpLogPracticeExamSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamSorter';
import {
  ChapterMapSvg,
  TownGrowthSvg,
  IsotopeRaceSvg,
  EcoliCylinderSvg,
  InvestmentCompareSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-tudasproba/ExpLogPracticeExamFigures';

describe('Grade 11 Topic III - 16. Gyakorlás, tudáspróba - Components', () => {
  it('renders ExpLogPracticeExamTheory without throwing', () => {
    const { container } = render(<ExpLogPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ExpLogPracticeExamQuiz without throwing', () => {
    const { container } = render(<ExpLogPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ExpLogPracticeExamMatcher without throwing', () => {
    const { container } = render(<ExpLogPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ExpLogPracticeExamSorter without throwing', () => {
    const { container } = render(<ExpLogPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, TownGrowthSvg, IsotopeRaceSvg, EcoliCylinderSvg, InvestmentCompareSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
