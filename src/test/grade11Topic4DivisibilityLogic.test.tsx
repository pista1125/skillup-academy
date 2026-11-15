import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DivisibilityLogicTheory } from '@/components/math/grade-11/szamelmelet/oszthatosag-es-logika/DivisibilityLogicTheory';
import { DivisibilityLogicQuiz, DIVISIBILITY_LOGIC_QUESTIONS } from '@/components/math/grade-11/szamelmelet/oszthatosag-es-logika/DivisibilityLogicQuiz';
import { DivisibilityLogicMatcher } from '@/components/math/grade-11/szamelmelet/oszthatosag-es-logika/DivisibilityLogicMatcher';
import { DivisibilityLogicSorter } from '@/components/math/grade-11/szamelmelet/oszthatosag-es-logika/DivisibilityLogicSorter';
import {
  DivisibilityVennSvg,
  LogicOperationsTableSvg,
  QuantifierNegationSvg,
  ImplicationConverseSvg,
  ThreeSetVennSvg
} from '@/components/math/grade-11/szamelmelet/oszthatosag-es-logika/DivisibilityLogicFigures';

describe('Grade 11 Topic IV - 46. Oszthatóság és logika - Components', () => {
  it('renders DivisibilityLogicTheory without throwing', () => {
    const { container } = render(<DivisibilityLogicTheory />);
    expect(container).toBeTruthy();
  });

  it('renders DivisibilityLogicQuiz without throwing', () => {
    const { container } = render(<DivisibilityLogicQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 10 questions on each of the 3 levels', () => {
    const qs = DIVISIBILITY_LOGIC_QUESTIONS;
    expect(qs).toHaveLength(30);
    [1, 2, 3].forEach((lvl) => expect(qs.filter((q) => q.level === lvl)).toHaveLength(10));
    qs.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders DivisibilityLogicMatcher without throwing', () => {
    const { container } = render(<DivisibilityLogicMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders DivisibilityLogicSorter without throwing', () => {
    const { container } = render(<DivisibilityLogicSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DivisibilityVennSvg, LogicOperationsTableSvg, QuantifierNegationSvg, ImplicationConverseSvg, ThreeSetVennSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
