import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Count1000ExamG3Theory } from '@/components/math/grade-3/szamolas-1000-ig/megallo/Count1000ExamG3Theory';
import { makeCount1000Task, makeBackTask, numberWord, roundTen, roundHundred, COUNT1000_KINDS } from '@/components/math/grade-3/szamolas-1000-ig/megallo/Count1000ExamG3Parts';
import { Count1000ExamG3Quiz, COUNT1000_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-1000-ig/megallo/Count1000ExamG3Quiz';
import { Count1000ExamG3Matcher, COUNT1000_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-1000-ig/megallo/Count1000ExamG3Matcher';
import { Count1000ExamG3Sorter, COUNT1000_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-1000-ig/megallo/Count1000ExamG3Sorter';
import {
  Count1000BlocksSvg,
  Count1000NumberLineSvg,
  Count1000RoundingSvg,
  Count1000AddSubSvg,
  Count1000MulDivSvg,
  Count1000BackSvg
} from '@/components/math/grade-3/szamolas-1000-ig/megallo/Count1000ExamG3Figures';

describe('Grade 3 Topic XI - 5. Megálló – tudáspróba (1000-ig) - Components', () => {
  it('renders Count1000ExamG3Theory without throwing', () => {
    const { container } = render(<Count1000ExamG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Count1000ExamG3Quiz without throwing', () => {
    const { container } = render(<Count1000ExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(COUNT1000_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNT1000_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNT1000_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNT1000_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('no number above 1000 in questions and options; at least 54 figures', () => {
    COUNT1000_EXAM_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000)));
    });
    expect(COUNT1000_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = COUNT1000_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = COUNT1000_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher, sorter and all figure SVGs without throwing', () => {
    expect(render(<Count1000ExamG3Matcher />).container).toBeTruthy();
    expect(render(<Count1000ExamG3Sorter />).container).toBeTruthy();
    [Count1000BlocksSvg, Count1000NumberLineSvg, Count1000RoundingSvg, Count1000AddSubSvg, Count1000MulDivSvg, Count1000BackSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('theory shows the chapter badge', () => {
    const { getAllByText } = render(<Count1000ExamG3Theory />);
    expect(getAllByText('3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('number words and rounding helpers', () => {
    expect(numberWord(705)).toBe('hétszázöt');
    expect(numberWord(222)).toBe('kétszázhuszonkettő');
    expect(numberWord(910)).toBe('kilencszáztíz');
    expect(numberWord(1000)).toBe('ezer');
    expect(numberWord(115)).toBe('száztizenöt');
    expect(roundTen(645)).toBe(650);
    expect(roundHundred(649)).toBe(600);
    expect(roundHundred(950)).toBe(1000);
  });

  it('lab generators are consistent and stay within 0–1000', () => {
    for (let i = 0; i < 200; i++) {
      COUNT1000_KINDS.forEach((k) => {
        const t = makeCount1000Task(k);
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        t.options.forEach((v) => { expect(v).toBeGreaterThan(0); expect(v).toBeLessThanOrEqual(1000); });
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000));
        const m = t.text.match(/^(\d+) ([+−·:]) (\d+) = \?$/);
        if (m) {
          const a = Number(m[1]);
          const b = Number(m[3]);
          const r = m[2] === '+' ? a + b : m[2] === '−' ? a - b : m[2] === '·' ? a * b : a / b;
          expect(r).toBe(t.answer);
        }
      });
      const b = makeBackTask();
      expect(b.k * b.start + b.c).toBe(b.target);
      expect(b.mid).toBe(b.k * b.start);
      expect(b.target).toBeLessThanOrEqual(1000);
      expect(new Set(b.midOpts).size).toBe(4);
      expect(new Set(b.startOpts).size).toBe(4);
      expect(b.midOpts).toContain(b.mid);
      expect(b.startOpts).toContain(b.start);
    }
  });
});
