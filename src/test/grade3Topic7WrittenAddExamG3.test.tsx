import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  WrittenAddExamG3Theory,
  makeExamTask,
  makeDigitTask,
  digitRows,
  digitHint,
  EXAM_KINDS
} from '@/components/math/grade-3/irasbeli-osszeadas/megallo/WrittenAddExamG3Theory';
import { WrittenAddExamG3Quiz, WRITTEN_ADD_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-osszeadas/megallo/WrittenAddExamG3Quiz';
import { WrittenAddExamG3Matcher, WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/megallo/WrittenAddExamG3Matcher';
import { WrittenAddExamG3Sorter, WRITTEN_ADD_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/megallo/WrittenAddExamG3Sorter';
import { speakAdd } from '@/components/math/grade-3/irasbeli-osszeadas/megallo/WrittenAddExamG3Parts';
import {
  ExamOverviewSvg,
  ExamColumnSvg,
  ExamThreeSvg,
  ExamDigitsSvg,
  ExamEstimateSvg,
  ExamChangesSvg
} from '@/components/math/grade-3/irasbeli-osszeadas/megallo/WrittenAddExamG3Figures';

describe('Grade 3 Topic VII - 6. Megálló – tudáspróba', () => {
  it('renders the theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<WrittenAddExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders the quiz without throwing', { timeout: 20000 }, () => {
    expect(render(<WrittenAddExamG3Quiz />).container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0 and distinct options', () => {
    expect(WRITTEN_ADD_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(WRITTEN_ADD_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(WRITTEN_ADD_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    WRITTEN_ADD_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(WRITTEN_ADD_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('no number above 1000 in questions and options', () => {
    WRITTEN_ADD_EXAM_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000)));
    });
  });

  it('column questions: the first option is the sum shown in the explanation', () => {
    WRITTEN_ADD_EXAM_G3_QUESTIONS.filter((q) => q.question === 'Számold ki írásban!').forEach((q) => {
      const m = q.explanation.match(/Az összeg (\d+)\./);
      expect(m).toBeTruthy();
      expect(String(q.options[0]).startsWith(m![1])).toBe(true);
    });
  });

  it('speakAdd says the steps like the textbook', () => {
    expect(speakAdd([278, 145])).toBe('8 meg 5 az 13, leírom a 3-at, maradt 1. 7 meg 4 az 11, meg 1 az 12, leírom a 2-t, maradt 1. 2 meg 1 az 3, meg 1 az 4. Az összeg 423.');
    expect(speakAdd([358, 64])).toBe('8 meg 4 az 12, leírom a 2-t, maradt 1. 5 meg 6 az 11, meg 1 az 12, leírom a 2-t, maradt 1. 3 meg 1 az 4. Az összeg 422.');
    expect(speakAdd([214, 143])).toBe('4 meg 3 az 7. 1 meg 4 az 5. 2 meg 1 az 3. Az összeg 357.');
  });

  it('exam lab: every kind gives consistent tasks within 0–1000', () => {
    EXAM_KINDS.forEach((k) => {
      for (let i = 0; i < 300; i++) {
        const t = makeExamTask(k);
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        t.options.forEach((v) => {
          expect(Number.isInteger(v)).toBe(true);
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual(1000);
          if (v !== t.answer) expect(t.hints[v]).toBeTruthy();
        });
        expect(t.hints[t.answer]).toBeUndefined();
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000));
        if (t.column) expect(t.column.reduce((s, n) => s + n, 0)).toBe(t.answer);
      }
    });
  });

  it('digit lab: hidden digits are consistent, one per column, right to left', () => {
    for (let i = 0; i < 500; i++) {
      const t = makeDigitTask();
      expect(t.a + t.b).toBe(t.c);
      expect(t.c).toBeLessThanOrEqual(999);
      expect(t.hidden.length).toBeGreaterThanOrEqual(2);
      const cols = t.hidden.map((h) => h.col);
      expect(new Set(cols).size).toBe(cols.length);
      expect([...cols].sort()).toEqual(cols);
      t.hidden.forEach((h) => expect(h.digit).toBe(Math.floor([t.a, t.b, t.c][h.row] / 10 ** h.col) % 10));
      const rows = digitRows(t, 0);
      expect(rows.join('').split('?').length - 1).toBe(t.hidden.length);
      expect(digitRows(t, t.hidden.length).join('')).not.toContain('?');
      t.hidden.forEach((_, k) => expect(digitHint(t, k)).toContain('?'));
    }
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = WRITTEN_ADD_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<WrittenAddExamG3Matcher />).container).toBeTruthy();
    expect(render(<WrittenAddExamG3Sorter />).container).toBeTruthy();
    [ExamOverviewSvg, ExamColumnSvg, ExamThreeSvg, ExamDigitsSvg, ExamEstimateSvg, ExamChangesSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });
});
