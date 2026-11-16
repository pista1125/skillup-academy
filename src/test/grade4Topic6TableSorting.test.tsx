import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  TableSortingTheory,
  cellOf,
  TABLE_TASKS,
  LINK_NUMBERS,
  isFourDigit
} from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-tablazatokba/TableSortingTheory';
import { TableSortingQuiz, TABLE_SORTING_QUESTIONS } from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-tablazatokba/TableSortingQuiz';
import { TableSortingMatcher } from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-tablazatokba/TableSortingMatcher';
import { TableSortingSorter } from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-tablazatokba/TableSortingSorter';
import {
  PencilTreeSvg,
  PencilTableSvg,
  PencilVennSvg,
  LineTypesSvg,
  AnimalTableSvg,
  ThreeWaysSvg,
  TK_PENCILS,
  WATER_ANIMALS
} from '@/components/math/grade-4/valogatasok-csoportositasok/valogatasok-tablazatokba/TableSortingFigures';

describe('Grade 4 Topic VI - 2. Válogatások táblázatokba - Components', () => {
  it('renders TableSortingTheory without throwing', () => {
    const { container } = render(<TableSortingTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TableSortingQuiz without throwing', () => {
    const { container } = render(<TableSortingQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TableSortingMatcher without throwing', () => {
    const { container } = render(<TableSortingMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TableSortingSorter without throwing', () => {
    const { container } = render(<TableSortingSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PencilTreeSvg, PencilTableSvg, PencilVennSvg, LineTypesSvg, AnimalTableSvg, ThreeWaysSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 4 Topic VI - 2. Válogatások táblázatokba - Logic', () => {
  it('has 30 questions, 10 per level, correct answer first, badge everywhere', () => {
    expect(TABLE_SORTING_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(TABLE_SORTING_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    TABLE_SORTING_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('textbook pencil counts (TK 133/4.)', () => {
    const count = (r: boolean, c: boolean) => TK_PENCILS.filter((p) => cellOf(p.eraser, p.color === 'kék') === cellOf(r, c)).length;
    expect([count(true, true), count(true, false), count(false, true), count(false, false)]).toEqual([2, 5, 3, 1]);
    expect(TK_PENCILS).toHaveLength(11);
  });

  it('water animals: hal–emlős cell is empty, 5 in nem hal–nem emlős', () => {
    expect(WATER_ANIMALS.filter((a) => a.hal && a.emlos)).toHaveLength(0);
    expect(WATER_ANIMALS.filter((a) => !a.hal && !a.emlos)).toHaveLength(5);
  });

  it('every table task item lands in exactly one cell', () => {
    TABLE_TASKS.forEach((t) => t.items.forEach((it) => expect(['YY', 'YN', 'NY', 'NN']).toContain(cellOf(it.row, it.col))));
    expect(LINK_NUMBERS.filter((n) => n % 2 && !isFourDigit(n))).toEqual([475, 33, 77, 423]);
  });

  it('lab II accepts the right cell for 1246', () => {
    const { getByLabelText, getByText } = render(<TableSortingTheory />);
    fireEvent.click(getByLabelText('Páros – Négyjegyű'));
    expect(getByText(/Következő szám/)).toBeTruthy();
  });
});
