import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CircleProblemsTheory } from '@/components/math/grade-11/koordinatageometria/korrel-kapcsolatos-feladatok/CircleProblemsTheory';
import { CircleProblemsQuiz, CIRCLE_PROBLEMS_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/korrel-kapcsolatos-feladatok/CircleProblemsQuiz';
import { CircleProblemsMatcher } from '@/components/math/grade-11/koordinatageometria/korrel-kapcsolatos-feladatok/CircleProblemsMatcher';
import { CircleProblemsSorter } from '@/components/math/grade-11/koordinatageometria/korrel-kapcsolatos-feladatok/CircleProblemsSorter';
import {
  VerticalLineCircleSvg,
  RightTriangleCircumcircleSvg,
  BridgeArcSvg,
  TangentCountSvg,
  LineCirclePositionsSvg,
  RadioRangeSvg
} from '@/components/math/grade-11/koordinatageometria/korrel-kapcsolatos-feladatok/CircleProblemsFigures';

describe('Grade 11 Topic VI - 12. Körrel kapcsolatos feladatok - Components', () => {
  it('renders CircleProblemsTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CircleProblemsTheory />);
    expect(container.innerHTML).not.toContain('NaN');
    expect(container).toBeTruthy();
  });

  it('renders CircleProblemsQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CircleProblemsQuiz />);
    expect(container.innerHTML).not.toContain('NaN');
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and explanation', () => {
    expect(CIRCLE_PROBLEMS_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(CIRCLE_PROBLEMS_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    CIRCLE_PROBLEMS_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
    });
  });

  it('renders CircleProblemsMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CircleProblemsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CircleProblemsSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CircleProblemsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [VerticalLineCircleSvg, RightTriangleCircumcircleSvg, BridgeArcSvg, TangentCountSvg, LineCirclePositionsSvg, RadioRangeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.innerHTML).not.toContain('NaN');
    });
  });

  it('renders every quiz figure as a valid SVG', () => {
    const withFig = CIRCLE_PROBLEMS_QUESTIONS.filter((q) => q.figure);
    expect(withFig.length).toBeGreaterThanOrEqual(10);
    withFig.forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.innerHTML).not.toContain('NaN');
    });
  });
});
