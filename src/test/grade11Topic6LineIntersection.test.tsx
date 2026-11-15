import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { LineIntersectionTheory } from '@/components/math/grade-11/koordinatageometria/egyenesek-metszespontja/LineIntersectionTheory';
import { LineIntersectionQuiz, LINE_INTERSECTION_QUESTIONS } from '@/components/math/grade-11/koordinatageometria/egyenesek-metszespontja/LineIntersectionQuiz';
import { LineIntersectionMatcher } from '@/components/math/grade-11/koordinatageometria/egyenesek-metszespontja/LineIntersectionMatcher';
import { LineIntersectionSorter } from '@/components/math/grade-11/koordinatageometria/egyenesek-metszespontja/LineIntersectionSorter';
import {
  LineIntersectionShipsSvg,
  LineIntersectionExampleSvg,
  LineIntersectionCasesSvg,
  LineIntersectionMedianSvg
} from '@/components/math/grade-11/koordinatageometria/egyenesek-metszespontja/LineIntersectionFigures';

describe('Grade 11 Topic VI - 14. Egyenesek metszéspontja - Components', () => {
  it('renders LineIntersectionTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineIntersectionTheory />);
    expect(container).toBeTruthy();
  });

  it('system lab solves the default system and detects parallel lines', { timeout: 20000 }, () => {
    const { getByLabelText, getByTestId, getByText } = render(<LineIntersectionTheory />);
    expect(getByTestId('li-system-result').textContent).toContain('x = −2, y = 5');
    fireEvent.click(getByText('Elmélet 2. (∅)'));
    expect(getByTestId('li-system-result').textContent).toContain('párhuzamos');
    fireEvent.change(getByLabelText('f c'), { target: { value: '129' } });
    expect(getByTestId('li-system-result').textContent).toContain('egybeeső');
  });

  it('point-check lab finds the ships intersection', { timeout: 20000 }, () => {
    const { getByRole, getByTestId } = render(<LineIntersectionTheory />);
    fireEvent.click(getByRole('button', { name: 'B(3; −2)' }));
    expect(getByTestId('li-point-check').textContent).toContain('metszéspont');
  });

  it('renders LineIntersectionQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineIntersectionQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with explanation and badge', () => {
    expect(LINE_INTERSECTION_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(LINE_INTERSECTION_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    LINE_INTERSECTION_QUESTIONS.forEach((q) => {
      expect(q.explanation).toBeTruthy();
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders LineIntersectionMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineIntersectionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders LineIntersectionSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<LineIntersectionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LineIntersectionShipsSvg, LineIntersectionExampleSvg, LineIntersectionCasesSvg, LineIntersectionMedianSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
