import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenOps1000ExamG3Theory } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/megallo/WrittenOps1000ExamG3Theory';
import { WrittenOps1000ExamG3Quiz, WRITTEN_OPS_1000_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/megallo/WrittenOps1000ExamG3Quiz';
import { WrittenOps1000ExamG3Matcher, WRITTEN_OPS_1000_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/megallo/WrittenOps1000ExamG3Matcher';
import { WrittenOps1000ExamG3Sorter, WRITTEN_OPS_1000_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/megallo/WrittenOps1000ExamG3Sorter';
import {
  WrittenOps1000ExamMapSvg,
  WrittenOps1000ExamAddSvg,
  WrittenOps1000ExamSubSvg,
  WrittenOps1000ExamOrderSvg,
  WrittenOps1000ExamPlanSvg
} from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/megallo/WrittenOps1000ExamG3Figures';
import { genWritten, genCheck, addNoCarry, subNoCarry, subSwap, subExplain } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/megallo/WrittenOps1000ExamG3Parts';

describe('Grade 3 Topic XII - 5. Megálló – tudáspróba - Components', () => {
  it('renders WrittenOps1000ExamG3Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOps1000ExamG3Theory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • TANANYAG');
  });

  it('renders WrittenOps1000ExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOps1000ExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    const Q = WRITTEN_OPS_1000_EXAM_G3_QUESTIONS;
    expect(Q).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(Q.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(Q.map((q) => q.id)).size).toBe(90);
    Q.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(Q.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('every number in the questions stays within 1000', () => {
    WRITTEN_OPS_1000_EXAM_G3_QUESTIONS.forEach((q) => {
      const nums = `${q.question} ${q.options.join(' ')}`.match(/\d+/g) ?? [];
      nums.forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000));
    });
  });

  it('lab task generators produce consistent tasks', () => {
    for (let i = 0; i < 200; i++) {
      const t = genWritten();
      const r = t.op === '+' ? t.nums.reduce((s, n) => s + n, 0) : t.nums[0] - t.nums[1];
      expect(t.answer).toBe(r);
      expect(t.answer).toBeGreaterThanOrEqual(0);
      expect(t.answer).toBeLessThanOrEqual(1000);
      t.nums.forEach((n) => expect(n).toBeLessThanOrEqual(1000));
      const c = genCheck();
      const real = c.op === '+' ? c.nums[0] + c.nums[1] : c.nums[0] - c.nums[1];
      expect(c.correct).toBe(real);
      expect(c.shown === c.correct).toBe(c.err === 'ok');
    }
    expect(addNoCarry([563, 278])).toBe(731);
    expect(subNoCarry(832, 457)).toBe(485);
    expect(subSwap(702, 345)).toBe(443);
    expect(subExplain(1000, 496)).toContain('6-hoz 4, az 10');
  });

  it('matcher and sorter levels have the right size', () => {
    [1, 2, 3].forEach((l) => {
      const m = WRITTEN_OPS_1000_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3];
      expect(m.pairs).toHaveLength(8);
      expect(new Set(m.pairs.map((p) => p.right)).size).toBe(8);
      expect(m.pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const s = WRITTEN_OPS_1000_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c) => expect(s.items.filter((it) => it.categoryId === c.id)).toHaveLength(9));
      expect(s.items.filter((it) => it.figure).length).toBeGreaterThanOrEqual(11);
    });
  });

  it('renders WrittenOps1000ExamG3Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOps1000ExamG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenOps1000ExamG3Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenOps1000ExamG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [WrittenOps1000ExamMapSvg, WrittenOps1000ExamAddSvg, WrittenOps1000ExamSubSvg, WrittenOps1000ExamOrderSvg, WrittenOps1000ExamPlanSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
