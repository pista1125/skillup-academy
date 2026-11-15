import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SlopeTangentTheory } from '@/components/math/grade-11/koordinatageometria/meredekseg-iranytangens/SlopeTangentTheory';
import { SlopeTangentQuiz, SLOPE_TANGENT_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/meredekseg-iranytangens/SlopeTangentQuiz';
import { SlopeTangentMatcher } from '@/components/math/grade-11/koordinatageometria/meredekseg-iranytangens/SlopeTangentMatcher';
import { SlopeTangentSorter } from '@/components/math/grade-11/koordinatageometria/meredekseg-iranytangens/SlopeTangentSorter';
import {
  SlopeTangentRoadSignSvg,
  SlopeTangentRiseRunSvg,
  SlopeTangentWorkedAngleSvg,
  SlopeTangentInclinationSvg,
  SlopeTangentSignsSvg,
  SlopeTangentLaddersSvg
} from '@/components/math/grade-11/koordinatageometria/meredekseg-iranytangens/SlopeTangentFigures';

describe('Grade 11 Topic VI - 13. Meredekség, iránytangens - Components', () => {
  it('renders SlopeTangentTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SlopeTangentTheory />);
    expect(container).toBeTruthy();
  });

  it('two-point lab reports a vertical line', { timeout: 20000 }, () => {
    const { getByLabelText, getByTestId } = render(<SlopeTangentTheory />);
    fireEvent.change(getByLabelText('x₂'), { target: { value: '-2' } });
    expect(getByTestId('st-two-point-result').textContent).toContain('nincs meredekség');
  });

  it('renders SlopeTangentQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SlopeTangentQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with explanation and badge', () => {
    expect(SLOPE_TANGENT_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SLOPE_TANGENT_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SLOPE_TANGENT_QUESTIONS.forEach((q) => {
      expect(q.explanation).toBeTruthy();
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders SlopeTangentMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SlopeTangentMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SlopeTangentSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SlopeTangentSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SlopeTangentRoadSignSvg, SlopeTangentRiseRunSvg, SlopeTangentWorkedAngleSvg, SlopeTangentInclinationSvg, SlopeTangentSignsSvg, SlopeTangentLaddersSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
