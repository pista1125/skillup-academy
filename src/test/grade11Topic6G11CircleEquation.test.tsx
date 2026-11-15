import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { G11CircleEquationTheory } from '@/components/math/grade-11/koordinatageometria/a-kor-egyenlete/G11CircleEquationTheory';
import { G11CircleEquationQuiz, G11_CIRCLE_EQUATION_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/a-kor-egyenlete/G11CircleEquationQuiz';
import { G11CircleEquationMatcher } from '@/components/math/grade-11/koordinatageometria/a-kor-egyenlete/G11CircleEquationMatcher';
import { G11CircleEquationSorter } from '@/components/math/grade-11/koordinatageometria/a-kor-egyenlete/G11CircleEquationSorter';
import {
  KickoffCircleSvg,
  RadiusFivePointsSvg,
  TranslatedCircleSvg,
  CircleEquationDerivationSvg,
  DiameterSquareSvg,
  CompletingSquareSvg
} from '@/components/math/grade-11/koordinatageometria/a-kor-egyenlete/G11CircleEquationFigures';

describe('Grade 11 Topic VI - 11. A kör egyenlete - Components', () => {
  it('renders G11CircleEquationTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11CircleEquationTheory />);
    expect(container.innerHTML).not.toContain('NaN');
    expect(container).toBeTruthy();
  });

  it('renders G11CircleEquationQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11CircleEquationQuiz />);
    expect(container.innerHTML).not.toContain('NaN');
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and explanation', () => {
    expect(G11_CIRCLE_EQUATION_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(G11_CIRCLE_EQUATION_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    G11_CIRCLE_EQUATION_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
    });
  });

  it('renders G11CircleEquationMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11CircleEquationMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders G11CircleEquationSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<G11CircleEquationSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [KickoffCircleSvg, RadiusFivePointsSvg, TranslatedCircleSvg, CircleEquationDerivationSvg, DiameterSquareSvg, CompletingSquareSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.innerHTML).not.toContain('NaN');
    });
  });

  it('renders every quiz figure as a valid SVG', () => {
    const withFig = G11_CIRCLE_EQUATION_QUESTIONS.filter((q) => q.figure);
    expect(withFig.length).toBeGreaterThanOrEqual(10);
    withFig.forEach((q) => {
      const { container } = render(<>{q.figure}</>);
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.innerHTML).not.toContain('NaN');
    });
  });
});
