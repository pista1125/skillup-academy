import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenMulExamG3Theory } from '@/components/math/grade-3/irasbeli-szorzas/megallo/WrittenMulExamG3Theory';
import { WrittenMulExamG3Quiz, WRITTEN_MUL_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-szorzas/megallo/WrittenMulExamG3Quiz';
import { WrittenMulExamG3Matcher, WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/megallo/WrittenMulExamG3Matcher';
import { WrittenMulExamG3Sorter, WRITTEN_MUL_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/megallo/WrittenMulExamG3Sorter';
import { makeTask, mulSteps, mulNoCarry, mulCarryBefore, genMulPair, evalStr } from '@/components/math/grade-3/irasbeli-szorzas/megallo/WrittenMulExamG3Parts';
import {
  ChapterMapMulSvg,
  MulNamesSvg,
  EstimateMulSvg,
  ChainMulSvg,
  MuseumMulSvg
} from '@/components/math/grade-3/irasbeli-szorzas/megallo/WrittenMulExamG3Figures';

describe('Grade 3 Topic XIII - 6. Megálló – tudáspróba', () => {
  it('renders WrittenMulExamG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<WrittenMulExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders WrittenMulExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenMulExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(WRITTEN_MUL_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(WRITTEN_MUL_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(WRITTEN_MUL_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    WRITTEN_MUL_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(WRITTEN_MUL_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('written multiplication helpers are correct', () => {
    expect(mulNoCarry(214, 3)).toBe(632);
    expect(mulCarryBefore(216, 4)).toBe(1224);
    expect(mulSteps(157, 2).map((s) => s.write)).toEqual([4, 1, 3]);
    expect(evalStr('2 · (180 + 95)')).toBe(550);
    for (let i = 0; i < 200; i++) {
      const { a, d } = genMulPair(1);
      expect(a * d).toBeLessThanOrEqual(999);
      const st = mulSteps(a, d);
      expect(Number(st.map((s) => s.write).reverse().join(''))).toBe(a * d);
    }
  });

  it('lab task generator produces consistent tasks within 1000', () => {
    (['fejben', 'becsles', 'irasbeli', 'sorrend', 'kovetkeztetes'] as const).forEach((k) => {
      for (let i = 0; i < 50; i++) {
        const t = makeTask(k);
        expect(t.text).toBeTruthy();
        expect(t.answer).toBeGreaterThan(0);
        expect(t.answer).toBeLessThanOrEqual(1000);
        t.traps.forEach((tr) => expect(tr.v).not.toBe(t.answer));
      }
    });
  });

  it('renders matcher and sorter, with card figures on every level', { timeout: 20000 }, () => {
    expect(render(<WrittenMulExamG3Matcher />).container).toBeTruthy();
    expect(render(<WrittenMulExamG3Sorter />).container).toBeTruthy();
    ([1, 2, 3] as const).forEach((l) => {
      expect(WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(WRITTEN_MUL_EXAM_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(WRITTEN_MUL_EXAM_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
    // 1. szint párosító: szöveges szorzások
    WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS[1].pairs
      .filter((p) => p.left)
      .forEach((p) => expect(evalStr(p.left as string)).toBe(Number(p.right)));
    // csoportosító 1. szint: a szorzat nagysága
    WRITTEN_MUL_EXAM_G3_SORTER_LEVELS[1].items.forEach((i) => {
      const v = evalStr(i.text as string);
      expect(v < 500 ? 'lt500' : v <= 800 ? 'mid' : 'gt800').toBe(i.categoryId);
    });
  });

  it('renders all figure SVGs without throwing', () => {
    [ChapterMapMulSvg, MulNamesSvg, EstimateMulSvg, ChainMulSvg, MuseumMulSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
