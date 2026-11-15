import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LineEquationTheory } from '@/components/math/grade-11/koordinatageometria/az-egyenes-egyenlete/LineEquationTheory';
import { LineEquationQuiz, LINE_EQUATION_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/az-egyenes-egyenlete/LineEquationQuiz';
import { LineEquationMatcher } from '@/components/math/grade-11/koordinatageometria/az-egyenes-egyenlete/LineEquationMatcher';
import { LineEquationSorter } from '@/components/math/grade-11/koordinatageometria/az-egyenes-egyenlete/LineEquationSorter';
import {
  LadderWallSvg,
  LadderCoordinateSvg,
  LadderCasesSvg,
  LineFormsSvg,
  TwoPointLineSvg,
  AxisInterceptsSvg
} from '@/components/math/grade-11/koordinatageometria/az-egyenes-egyenlete/LineEquationFigures';

describe('Grade 11 Topic VI - 10. Az egyenes egyenlete - Components', () => {
  it('renders LineEquationTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineEquationTheory />);
    expect(container.innerHTML).not.toContain('NaN');
    expect(container).toBeTruthy();
  });

  it('renders LineEquationQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineEquationQuiz />);
    expect(container.innerHTML).not.toContain('NaN');
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and explanation', () => {
    expect(LINE_EQUATION_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(LINE_EQUATION_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    LINE_EQUATION_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
    });
  });

  it('renders LineEquationMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineEquationMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders LineEquationSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineEquationSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LadderWallSvg, LadderCoordinateSvg, LadderCasesSvg, LineFormsSvg, TwoPointLineSvg, AxisInterceptsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.innerHTML).not.toContain('NaN');
    });
  });

  it('renders every quiz figure as a valid SVG', () => {
    const withFig = LINE_EQUATION_QUESTIONS.filter((q) => q.figure);
    expect(withFig.length).toBeGreaterThanOrEqual(10);
    withFig.forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.innerHTML).not.toContain('NaN');
    });
  });
});
