import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  Count500ExamG3Theory,
  makeCount500Task,
  makeChainTask,
  numberWord,
  roundTen,
  roundHundred,
  Count500TaskKind
} from '@/components/math/grade-3/szamolas-500-ig/megallo/Count500ExamG3Theory';
import { Count500ExamG3Quiz, COUNT500_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-500-ig/megallo/Count500ExamG3Quiz';
import { Count500ExamG3Matcher, COUNT500_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/megallo/Count500ExamG3Matcher';
import { Count500ExamG3Sorter, COUNT500_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/megallo/Count500ExamG3Sorter';
import {
  Count500BlocksSvg,
  Count500NumberLineSvg,
  Count500RoundingSvg,
  Count500AddSubSvg,
  Count500MulDivSvg,
  Count500MoneySvg
} from '@/components/math/grade-3/szamolas-500-ig/megallo/Count500ExamG3Figures';

describe('Grade 3 Topic V - 5. Megálló – tudáspróba', () => {
  it('renders Count500ExamG3Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<Count500ExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders Count500ExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count500ExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0 and distinct options', () => {
    expect(COUNT500_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNT500_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNT500_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNT500_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(COUNT500_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('no number above 500 in questions and options', () => {
    COUNT500_EXAM_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(500)));
    });
  });

  it('number words and rounding helpers', () => {
    expect(numberWord(406)).toBe('négyszázhat');
    expect(numberWord(247)).toBe('kétszáznegyvenhét');
    expect(numberWord(315)).toBe('háromszáztizenöt');
    expect(numberWord(122)).toBe('százhuszonkettő');
    expect(numberWord(490)).toBe('négyszázkilencven');
    expect(numberWord(500)).toBe('ötszáz');
    expect(roundTen(495)).toBe(500);
    expect(roundTen(384)).toBe(380);
    expect(roundHundred(349)).toBe(300);
    expect(roundHundred(250)).toBe(300);
  });

  it('lab task generators stay within 0–500 and are consistent', () => {
    const kinds: Count500TaskKind[] = ['szam', 'szomszed', 'kerekites', 'osszeadas', 'kivonas', 'szorzas', 'osztas', 'sorrend'];
    kinds.forEach((k) => {
      for (let i = 0; i < 300; i++) {
        const t = makeCount500Task(k);
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        t.options.forEach((v) => {
          expect(Number.isInteger(v)).toBe(true);
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual(500);
        });
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(500));
        expect(t.hints[t.answer]).toBeUndefined();
      }
    });
    for (let i = 0; i < 300; i++) {
      const c = makeChainTask();
      expect(c.values).toHaveLength(6);
      expect(c.ops).toHaveLength(5);
      c.values.forEach((v) => {
        expect(Number.isInteger(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(500);
      });
      c.options.forEach((o, j) => {
        expect(new Set(o).size).toBe(4);
        expect(o).toContain(c.values[c.given + j]);
      });
    }
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = COUNT500_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = COUNT500_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher and sorter without throwing', () => {
    expect(render(<Count500ExamG3Matcher />).container).toBeTruthy();
    expect(render(<Count500ExamG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [Count500BlocksSvg, Count500NumberLineSvg, Count500RoundingSvg, Count500AddSubSvg, Count500MulDivSvg, Count500MoneySvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
