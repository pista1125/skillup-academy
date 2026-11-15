import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DivisibilityProblemsTheory } from '@/components/math/grade-11/szamelmelet/oszthatosagi-feladatok/DivisibilityProblemsTheory';
import { DivisibilityProblemsQuiz, DIVISIBILITY_PROBLEMS_QUESTIONS } from '@/components/math/grade-11/szamelmelet/oszthatosagi-feladatok/DivisibilityProblemsQuiz';
import { DivisibilityProblemsMatcher } from '@/components/math/grade-11/szamelmelet/oszthatosagi-feladatok/DivisibilityProblemsMatcher';
import { DivisibilityProblemsSorter } from '@/components/math/grade-11/szamelmelet/oszthatosagi-feladatok/DivisibilityProblemsSorter';
import {
  CompositeRuleVennSvg,
  DivisorTable1260Svg,
  ElectionTimelineSvg,
  BusScheduleSvg,
  BonbonBoxSvg
} from '@/components/math/grade-11/szamelmelet/oszthatosagi-feladatok/DivisibilityProblemsFigures';

describe('Grade 11 Topic IV - 47. Oszthatósági feladatok - Components', () => {
  it('renders DivisibilityProblemsTheory without throwing', () => {
    const { container } = render(<DivisibilityProblemsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders DivisibilityProblemsQuiz without throwing', () => {
    const { container } = render(<DivisibilityProblemsQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 10 questions on each of the 3 levels', () => {
    const qs = DIVISIBILITY_PROBLEMS_QUESTIONS;
    expect(qs).toHaveLength(30);
    [1, 2, 3].forEach((lvl) => expect(qs.filter((q) => q.level === lvl)).toHaveLength(10));
    qs.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders DivisibilityProblemsMatcher without throwing', () => {
    const { container } = render(<DivisibilityProblemsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders DivisibilityProblemsSorter without throwing', () => {
    const { container } = render(<DivisibilityProblemsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CompositeRuleVennSvg, DivisorTable1260Svg, ElectionTimelineSvg, BusScheduleSvg, BonbonBoxSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
