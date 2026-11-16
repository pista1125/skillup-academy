import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  SetSortingTheory,
  region2,
  blockRegion,
  VENN_TASKS,
  LOGIC_LAB_BLOCKS
} from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-halmazokba/SetSortingTheory';
import { SetSortingQuiz, SET_SORTING_QUESTIONS } from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-halmazokba/SetSortingQuiz';
import { SetSortingMatcher } from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-halmazokba/SetSortingMatcher';
import { SetSortingSorter } from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-halmazokba/SetSortingSorter';
import {
  OtterBoatSvg,
  AnimalVennSvg,
  NestedSetsSvg,
  NumberSetsSvg,
  LogicBlocksVennSvg,
  LogicBlocksRowSvg,
  OddOneOutSvg,
  logicRegion,
  venn3RegionAt,
  VENN3,
  LOGIC_BLOCKS_TK
} from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-halmazokba/SetSortingFigures';

describe('Grade 4 Topic VI - 1. Válogatások halmazokba - Components', () => {
  it('renders SetSortingTheory without throwing', () => {
    const { container } = render(<SetSortingTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SetSortingQuiz without throwing', () => {
    const { container } = render(<SetSortingQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SetSortingMatcher without throwing', () => {
    const { container } = render(<SetSortingMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SetSortingSorter without throwing', () => {
    const { container } = render(<SetSortingSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OtterBoatSvg, AnimalVennSvg, NestedSetsSvg, NumberSetsSvg, LogicBlocksVennSvg, LogicBlocksRowSvg, OddOneOutSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 4 Topic VI - 1. Válogatások halmazokba - Logic', () => {
  it('has 30 questions, 10 per level, correct answer first, badge everywhere', () => {
    expect(SET_SORTING_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SET_SORTING_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SET_SORTING_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('places the textbook logic blocks into the right regions (TK 134/8.)', () => {
    const expected: Record<string, number> = { A: 6, B: 4, C: 8, D: 1, E: 3, F: 2, G: 5, H: 7 };
    LOGIC_BLOCKS_TK.forEach((b) => expect(logicRegion(b.color === 'kék', b.holed, b.shape === 'háromszög')).toBe(expected[b.id]));
    expect(LOGIC_LAB_BLOCKS.map(blockRegion)).toEqual([1, 6, 5, 8, 3, 2, 7, 4, 3, 8]);
  });

  it('region numbers of the 3-ring diagram lie in their own region', () => {
    Object.entries(VENN3.numbers).forEach(([n, [x, y]]) => expect(venn3RegionAt(x, y)).toBe(Number(n)));
  });

  it('two-ring tasks use the right membership', () => {
    expect(region2(true, true)).toBe('AB');
    expect(region2(false, false)).toBe('O');
    const nums = VENN_TASKS[1].items;
    nums.forEach((it) => {
      const n = Number(it.t);
      expect(it.inA).toBe(n % 50 === 0);
      expect(it.inB).toBe(n % 20 === 0);
    });
    VENN_TASKS[2].items.forEach((it) => {
      const n = Number(it.t);
      expect(it.inA).toBe(n % 2 === 0);
      expect(it.inB).toBe(n >= 1000 && n <= 9999);
    });
  });

  it('lab I accepts a placement by buttons', () => {
    const { getByRole, getByText } = render(<SetSortingTheory />);
    fireEvent.click(getByRole('button', { name: '🦩 flamingó' }));
    fireEvent.click(getByText('Csak: Madár'));
    expect(getByText(/Még 7 kártya/)).toBeTruthy();
  });
});
