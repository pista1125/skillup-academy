import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { PerpendicularParallelTheory } from '@/components/math/grade-11/koordinatageometria/meroleges-parhuzamos-egyenesek/PerpendicularParallelTheory';
import { PerpendicularParallelQuiz, PERPENDICULAR_PARALLEL_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/meroleges-parhuzamos-egyenesek/PerpendicularParallelQuiz';
import { PerpendicularParallelMatcher } from '@/components/math/grade-11/koordinatageometria/meroleges-parhuzamos-egyenesek/PerpendicularParallelMatcher';
import { PerpendicularParallelSorter } from '@/components/math/grade-11/koordinatageometria/meroleges-parhuzamos-egyenesek/PerpendicularParallelSorter';
import {
  PerpendicularParallelMeteorsSvg,
  PerpendicularParallelRotationSvg,
  PerpendicularParallelSlopeTrianglesSvg,
  PerpendicularParallelRhombusSvg,
  PerpendicularParallelDistanceSvg
} from '@/components/math/grade-11/koordinatageometria/meroleges-parhuzamos-egyenesek/PerpendicularParallelFigures';

describe('Grade 11 Topic VI - 15. Merőleges, párhuzamos egyenesek - Components', () => {
  it('renders PerpendicularParallelTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<PerpendicularParallelTheory />);
    expect(container).toBeTruthy();
  });

  it('slope lab shows m1 * m2 = -1 and the vertical case', { timeout: 20000 }, () => {
    const { getByTestId } = render(<PerpendicularParallelTheory />);
expect(getByTestId('pp-product').textContent).toMatch(/· m.?2 = −1/);
    fireEvent.click(getByTestId('pp-m1-preset-5'));
    expect(getByTestId('pp-product').textContent).toContain('x = 0');
  });

  it('distance lab computes the textbook example', { timeout: 20000 }, () => {
    const { getByTestId } = render(<PerpendicularParallelTheory />);
    const txt = getByTestId('pp-distance').textContent || '';
    expect(txt).toContain('T(−2; 3)');
    expect(txt).toContain('1,414');
  });

  it('renders PerpendicularParallelQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<PerpendicularParallelQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with explanation and badge', () => {
    expect(PERPENDICULAR_PARALLEL_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(PERPENDICULAR_PARALLEL_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    PERPENDICULAR_PARALLEL_QUESTIONS.forEach((q) => {
      expect(q.explanation).toBeTruthy();
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders PerpendicularParallelMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<PerpendicularParallelMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PerpendicularParallelSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<PerpendicularParallelSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      PerpendicularParallelMeteorsSvg,
      PerpendicularParallelRotationSvg,
      PerpendicularParallelSlopeTrianglesSvg,
      PerpendicularParallelRhombusSvg,
      PerpendicularParallelDistanceSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
