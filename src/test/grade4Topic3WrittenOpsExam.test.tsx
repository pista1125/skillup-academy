import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  WrittenOpsExamTheory,
  makeTask,
  lcg,
  DIGIT_PUZZLES,
  puzzleHolds,
  MixedKind
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/gyakorlas-tudasproba/WrittenOpsExamTheory';
import { WrittenOpsExamQuiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/gyakorlas-tudasproba/WrittenOpsExamQuiz';
import { WrittenOpsExamMatcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/gyakorlas-tudasproba/WrittenOpsExamMatcher';
import { WrittenOpsExamSorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/gyakorlas-tudasproba/WrittenOpsExamSorter';
import {
  ChapterStationsSvg,
  ColumnAddSvg,
  ColumnSubSvg,
  ShortDivSvg,
  MultiplesVennSvg,
  SolvingStepsSvg,
  shortDivRows
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/gyakorlas-tudasproba/WrittenOpsExamFigures';

describe('Grade 4 Topic III - 8. Gyakorlás, tudáspróba - Components', () => {
  it('renders WrittenOpsExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOpsExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenOpsExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOpsExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenOpsExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOpsExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenOpsExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOpsExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterStationsSvg, ColumnAddSvg, ColumnSubSvg, ShortDivSvg, MultiplesVennSvg, SolvingStepsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('short division rows follow the textbook (2872 : 2, 224 : 3)', () => {
    const a = shortDivRows(2872, 2);
    expect(a.quotient).toBe(1436);
    expect(a.rows.map((r) => r.text)).toEqual(['08', '07', '12', '0']);
    const b = shortDivRows(224, 3);
    expect(b.quotient).toBe(74);
    expect(b.remainder).toBe(2);
    expect(b.start).toBe(1);
  });

  it('mixed task generator stays in the 10 000 range with correct answers', () => {
    const kinds: MixedKind[] = ['add', 'sub', 'mul', 'div', 'order'];
    const r = lcg(12345);
    for (let i = 0; i < 200; i++) {
      const t = makeTask(kinds[i % 5], r);
      expect(t.answer).toBeGreaterThanOrEqual(0);
      expect(t.answer).toBeLessThanOrEqual(9999);
      expect(Number.isInteger(t.answer)).toBe(true);
    }
  });

  it('digit puzzles have the textbook solutions', () => {
    expect(puzzleHolds(DIGIT_PUZZLES[0], { a: 3, b: 9, c: 9 })).toBe(true);
    expect(puzzleHolds(DIGIT_PUZZLES[1], { a: 7, b: 1, c: 6, d: 0 })).toBe(true);
    expect(puzzleHolds(DIGIT_PUZZLES[2], { a: 8, b: 2, c: 1, d: 6 })).toBe(true);
    expect(puzzleHolds(DIGIT_PUZZLES[3], { a: 1, b: 3, c: 8 })).toBe(true);
    expect(puzzleHolds(DIGIT_PUZZLES[3], { a: 2, b: 3, c: 8 })).toBe(false);
  });
});
