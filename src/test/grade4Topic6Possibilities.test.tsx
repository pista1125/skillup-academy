import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { PossibilitiesTheory, ORDER_TASKS, orderCount, countProduct } from '@/components/math/grade-4/valogatasok-csoportositasok/hanyfele-lehetoseg-van/PossibilitiesTheory';
import { PossibilitiesQuiz, POSSIBILITIES_QUESTIONS } from '@/components/math/grade-4/valogatasok-csoportositasok/hanyfele-lehetoseg-van/PossibilitiesQuiz';
import { PossibilitiesMatcher } from '@/components/math/grade-4/valogatasok-csoportositasok/hanyfele-lehetoseg-van/PossibilitiesMatcher';
import { PossibilitiesSorter } from '@/components/math/grade-4/valogatasok-csoportositasok/hanyfele-lehetoseg-van/PossibilitiesSorter';
import {
  RunnersTreeSvg,
  PodiumSvg,
  PairsSvg,
  NapkinsSvg,
  NumberCardsSvg,
  BranchProductSvg,
  permutations,
  pairsOf,
  choose
} from '@/components/math/grade-4/valogatasok-csoportositasok/hanyfele-lehetoseg-van/PossibilitiesFigures';

describe('Grade 4 Topic VI - 3. Hányféle lehetőség van? - Components', () => {
  it('renders PossibilitiesTheory without throwing', () => {
    const { container } = render(<PossibilitiesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PossibilitiesQuiz without throwing', () => {
    const { container } = render(<PossibilitiesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PossibilitiesMatcher without throwing', () => {
    const { container } = render(<PossibilitiesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PossibilitiesSorter without throwing', () => {
    const { container } = render(<PossibilitiesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RunnersTreeSvg, PodiumSvg, PairsSvg, NapkinsSvg, NumberCardsSvg, BranchProductSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 4 Topic VI - 3. Hányféle lehetőség van? - Logic', () => {
  it('has 30 questions, 10 per level, correct answer first, badge everywhere', () => {
    expect(POSSIBILITIES_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(POSSIBILITIES_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    POSSIBILITIES_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('counting helpers give the textbook results', () => {
    expect(permutations(['A', 'B', 'C'])).toHaveLength(6);
    expect(permutations(['A', 'B', 'Cs', 'D'])).toHaveLength(24);
    expect(pairsOf(['A', 'B', 'C', 'D', 'E'])).toHaveLength(10);
    expect(choose(['S', 'P', 'K', 'Z', 'F'], 3)).toHaveLength(10);
    const p4 = permutations(['A', 'B', 'Cs', 'D']);
    expect(p4.filter((p) => p.indexOf('A') < p.indexOf('B') && p.indexOf('A') < p.indexOf('Cs'))).toHaveLength(8);
    expect(p4.filter((p) => p[1] === 'Cs' && p.indexOf('D') < p.indexOf('B'))).toHaveLength(3);
    expect(permutations(['0', '5', '7']).filter((p) => p[0] !== '0')).toHaveLength(4);
    ORDER_TASKS.forEach((t) => expect(orderCount(t)).toBe(6));
    expect(countProduct(2, 3, false)).toBe(6);
    expect(countProduct(4, 4, true)).toBe(32);
  });

  it('lab I records a new order and rejects a duplicate', () => {
    const { getByLabelText, getByText } = render(<PossibilitiesTheory />);
    const fill = () => ['A', 'B', 'C'].forEach((n) => fireEvent.click(getByLabelText(`név ${n}`)));
    fill();
    fireEvent.click(getByText(/Felírom/));
    expect(getByText(/Felírt sorrendek: 1 \/ 6/)).toBeTruthy();
    fill();
    fireEvent.click(getByText(/Felírom/));
    expect(getByText(/már felírtad/)).toBeTruthy();
  });
});
