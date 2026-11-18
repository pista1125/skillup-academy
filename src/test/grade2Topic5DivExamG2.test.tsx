import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DivExamG2Theory } from '@/components/math/grade-2/osztas/gyakorlas-tudasproba/DivExamG2Theory';
import { DivExamG2Quiz, DIV_EXAM_G2_QUESTIONS } from '@/components/math/grade-2/osztas/gyakorlas-tudasproba/DivExamG2Quiz';
import { DivExamG2Matcher, DIV_EXAM_G2_MATCHER_LEVELS } from '@/components/math/grade-2/osztas/gyakorlas-tudasproba/DivExamG2Matcher';
import { DivExamG2Sorter, DIV_EXAM_G2_SORTER_LEVELS } from '@/components/math/grade-2/osztas/gyakorlas-tudasproba/DivExamG2Sorter';
import {
  GroupingSvg,
  SharingSvg,
  FamilySvg,
  PartsSvg,
  RemainderSvg,
  RoundUpSvg,
} from '@/components/math/grade-2/osztas/gyakorlas-tudasproba/DivExamG2Figures';
import { DIV_KINDS, makeDivTask, makeRemTask } from '@/components/math/grade-2/osztas/gyakorlas-tudasproba/DivExamG2Parts';

describe('Grade 2 Topic V - 10. Gyakorlás, tudáspróba (osztás)', () => {
  it('renders DivExamG2Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<DivExamG2Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('2. OSZTÁLY • V. OSZTÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders DivExamG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DivExamG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0, distinct options, book remainder notation, >= 54 figures', () => {
    expect(DIV_EXAM_G2_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(DIV_EXAM_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(DIV_EXAM_G2_QUESTIONS.map((q) => q.id)).size).toBe(90);
    DIV_EXAM_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.options.length).toBeLessThanOrEqual(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      const text = `${q.question} ${q.options.join(' ')} ${q.explanation}`;
      // never „43 : 8 = 5 maradék 3”
      expect(text).not.toMatch(/\d : \d+ = \d+,? (maradék|marad)/);
      (String(q.question).match(/\d+/g) || []).map(Number).forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(100);
      });
    });
    expect(DIV_EXAM_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(54);
  });

  it('Labor I generator is exact and within 100', () => {
    [0, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((d) => {
      DIV_KINDS.forEach(({ id }) => {
        for (let i = 0; i < 80; i++) {
          const t = makeDivTask(id, d);
          expect(t.text).toBeTruthy();
          expect(Number.isInteger(t.answer)).toBe(true);
          expect(t.answer).toBeGreaterThanOrEqual(1);
          expect(t.answer).toBeLessThanOrEqual(100);
          (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(100));
          t.mistakes.forEach((m) => expect(m.value).not.toBe(t.answer));
          const m = t.text.match(/^(\d+) : (\d+) = \?$/);
          if (m) expect(Number(m[1]) / Number(m[2])).toBe(t.answer);
        }
      });
    });
  });

  it('Labor II remainder tasks: remainder between 1 and d − 1, n ≤ 60', () => {
    let prev = 0;
    for (let i = 0; i < 300; i++) {
      const t = makeRemTask(prev);
      expect(t.n).not.toBe(prev);
      expect(t.q * t.d + t.r).toBe(t.n);
      expect(t.r).toBeGreaterThanOrEqual(1);
      expect(t.r).toBeLessThan(t.d);
      expect(t.n).toBeLessThanOrEqual(60);
      expect(t.q).toBeGreaterThanOrEqual(1);
      prev = t.n;
    }
  });

  it('renders DivExamG2Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DivExamG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders DivExamG2Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<DivExamG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all Theory figure SVGs without throwing', () => {
    [GroupingSvg, SharingSvg, FamilySvg, PartsSvg, RemainderSvg, RoundUpSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = DIV_EXAM_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);

      const items = DIV_EXAM_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
