import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WordProblems100G3Theory } from '@/components/math/grade-3/szamolas-100-ig/szoveges-feladatok/WordProblems100G3Theory';
import { WordProblems100G3Quiz, WORD_PROBLEMS_100_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/szoveges-feladatok/WordProblems100G3Quiz';
import { WordProblems100G3Matcher } from '@/components/math/grade-3/szamolas-100-ig/szoveges-feladatok/WordProblems100G3Matcher';
import { WordProblems100G3Sorter } from '@/components/math/grade-3/szamolas-100-ig/szoveges-feladatok/WordProblems100G3Sorter';
import {
  FiveStepsSvg,
  MoreThanSvg,
  SegmentModelSvg,
  TreeDiagramSvg,
  TryTableSvg,
  ClockTripSvg
} from '@/components/math/grade-3/szamolas-100-ig/szoveges-feladatok/WordProblems100G3Figures';

describe('Grade 3 Topic I - 5. Szöveges feladatok - Components', () => {
  it('renders WordProblems100G3Theory without throwing', () => {
    const { container } = render(<WordProblems100G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems100G3Quiz without throwing', () => {
    const { container } = render(<WordProblems100G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(WORD_PROBLEMS_100_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WORD_PROBLEMS_100_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    WORD_PROBLEMS_100_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(WORD_PROBLEMS_100_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders WordProblems100G3Matcher without throwing', () => {
    const { container } = render(<WordProblems100G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems100G3Sorter without throwing', () => {
    const { container } = render(<WordProblems100G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FiveStepsSvg, MoreThanSvg, SegmentModelSvg, TreeDiagramSvg, TryTableSvg, ClockTripSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
