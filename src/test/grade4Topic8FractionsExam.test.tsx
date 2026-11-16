import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionsExamTheory, makeMixedTask } from '@/components/math/grade-4/tortszamok/gyakorlas-tudasproba/FractionsExamTheory';
import { FractionsExamQuiz, FRACTIONS_EXAM_QUESTIONS } from '@/components/math/grade-4/tortszamok/gyakorlas-tudasproba/FractionsExamQuiz';
import { FractionsExamMatcher, FRACTIONS_EXAM_MATCHER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/gyakorlas-tudasproba/FractionsExamMatcher';
import { FractionsExamSorter, FRACTIONS_EXAM_SORTER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/gyakorlas-tudasproba/FractionsExamSorter';
import {
  ChapterSummarySvg,
  PartNamesSvg,
  ShapePartsSvg,
  RectValueSvg,
  SameHalfCirclesSvg,
  CampSvg,
  BoardGameSvg,
  BOARD_FIELDS,
  boardFieldValue,
  RECT_VALUES,
  SHAPE_PARTS
} from '@/components/math/grade-4/tortszamok/gyakorlas-tudasproba/FractionsExamFigures';
import { compareFractions, nak, az, vel } from '@/components/math/grade-4/tortszamok/tortek-osszehasonlitasa/FractionCompare4Figures';

const D: Record<string, number> = { ketted: 2, harmad: 3, negyed: 4, ötöd: 5, hatod: 6, nyolcad: 8, tized: 10 };
const parse = (s: string): [number, number] => {
  const m = s.match(/^(\d+) (ketted|harmad|negyed|ötöd|hatod|nyolcad|tized)$/);
  if (!m) throw new Error(s);
  return [Number(m[1]), D[m[2]]];
};

describe('Grade 4 Topic VIII - 6. Gyakorlás, tudáspróba - Components', () => {
  it('renders FractionsExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionsExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FractionsExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionsExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FractionsExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionsExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FractionsExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionsExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterSummarySvg, PartNamesSvg, ShapePartsSvg, RectValueSvg, SameHalfCirclesSvg, CampSvg, BoardGameSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 90 questions, 30 per level, with badges, explanations and distinct options', () => {
    expect(FRACTIONS_EXAM_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(FRACTIONS_EXAM_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(FRACTIONS_EXAM_QUESTIONS.map((q) => q.id)).size).toBe(90);
    FRACTIONS_EXAM_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(FRACTIONS_EXAM_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(36);
  });

  it('board game fields and workbook values are correct', () => {
    expect(BOARD_FIELDS).toHaveLength(18);
    BOARD_FIELDS.forEach((_, i) => expect(Number.isInteger(boardFieldValue(i))).toBe(true));
    expect(boardFieldValue(0)).toBe(1600);
    expect(boardFieldValue(3)).toBe(1800);
    expect(boardFieldValue(16)).toBe(60);
    expect(boardFieldValue(17)).toBe(320);
    expect(RECT_VALUES.map((r) => r.value)).toEqual([1200, 800, 200, 600]);
    const expected = [3, 4, 5, 2];
    SHAPE_PARTS.forEach((s, i) => expect((s.rows * s.cols) / expected[i]).toBe(s.filled.length));
  });

  it('mixed task generator gives valid tasks', () => {
    for (let s = 1; s < 300; s++) {
      const t = makeMixedTask(s * 7919);
      if (t.kind === 'name') {
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        expect(t.n).toBeLessThan(t.d);
      } else if (t.kind === 'compare') {
        expect(t.answer).toBe(compareFractions(t.a[0], t.a[1], t.b[0], t.b[1]));
      } else {
        expect(Number.isInteger(t.answer)).toBe(true);
        expect(t.answer).toBeLessThan(t.amount);
      }
    }
  });

  it('sorter and matcher are consistent', () => {
    const [l1, l2] = FRACTIONS_EXAM_SORTER_LEVELS_LIST;
    l1.items.forEach((it) => {
      const [n, d] = parse(it.text);
      expect(it.categoryId).toBe(n < d ? 'lt1' : n === d ? 'eq1' : 'gt1');
    });
    l2.items.forEach((it) => {
      const [n, d] = parse(it.text);
      const r = compareFractions(n, d, 1, 2);
      expect(it.categoryId).toBe(r === '<' ? 'lt' : r === '=' ? 'eq' : 'gt');
    });
    FRACTIONS_EXAM_MATCHER_LEVELS_LIST.forEach((l) => {
      expect(l.pairs).toHaveLength(8);
      expect(new Set(l.pairs.map((p) => String(p.right))).size).toBe(8);
    });
  });

  it('Hungarian suffix helpers', () => {
    expect(nak(12)).toBe('12-nek');
    expect(nak(300)).toBe('300-nak');
    expect(nak(4000)).toBe('4000-nek');
    expect(nak(2400)).toBe('2400-nak');
    expect(nak(60)).toBe('60-nak');
    expect(az(1)).toBe('az');
    expect(az(5)).toBe('az');
    expect(az(3)).toBe('a');
    expect(vel(4)).toBe('4-gyel');
    expect(vel(10)).toBe('10-zel');
  });
});
