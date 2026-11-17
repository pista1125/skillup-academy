import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  Count200ExamG3Theory,
  makeCount200Task,
  makeBuildTarget,
  numberWord,
  Count200TaskKind
} from '@/components/math/grade-3/szamolas-200-ig/megallo/Count200ExamG3Theory';
import { Count200ExamG3Quiz, COUNT200_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-200-ig/megallo/Count200ExamG3Quiz';
import { Count200ExamG3Matcher, COUNT200_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/megallo/Count200ExamG3Matcher';
import { Count200ExamG3Sorter, COUNT200_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/megallo/Count200ExamG3Sorter';
import {
  Count200BlocksSvg,
  Count200NumberLineSvg,
  Count200RoundingSvg,
  Count200AddSubSvg,
  Count200MulDivSvg,
  Count200MoneySvg
} from '@/components/math/grade-3/szamolas-200-ig/megallo/Count200ExamG3Figures';

describe('Grade 3 Topic III - 6. Megálló – tudáspróba', () => {
  it('renders Count200ExamG3Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<Count200ExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders Count200ExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count200ExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0 and distinct options', () => {
    expect(COUNT200_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNT200_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNT200_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNT200_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(COUNT200_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('no number above 200 in questions and options', () => {
    COUNT200_EXAM_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(200)));
    });
  });

  it('lab task generators stay within 0–200 and are consistent', () => {
    const kinds: Count200TaskKind[] = ['szam', 'szomszed', 'kerekites', 'osszeadas', 'kivonas', 'szorzas', 'osztas', 'sorrend'];
    kinds.forEach((k) => {
      for (let i = 0; i < 300; i++) {
        const t = makeCount200Task(k);
        expect(Number.isInteger(t.answer)).toBe(true);
        expect(t.answer).toBeGreaterThanOrEqual(0);
        expect(t.answer).toBeLessThanOrEqual(200);
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(200));
        t.mistakes.forEach((m) => expect(m.v).not.toBe(t.answer));
        const nums = (t.text.match(/\d+/g) || []).map(Number);
        if (k === 'kerekites') {
          expect(t.answer % 10).toBe(0);
          expect(Math.abs(t.answer - nums[0])).toBeLessThanOrEqual(5);
        }
        if (k === 'szorzas') expect(nums[0] * nums[1]).toBe(t.answer);
        if (k === 'osztas') expect(nums[0] / nums[1]).toBe(t.answer);
        if (k === 'osszeadas') expect(nums[0] + nums[1]).toBe(t.answer);
        if (k === 'kivonas') expect(nums[0] - nums[1]).toBe(t.answer);
      }
    });
    for (let i = 0; i < 200; i++) {
      const b = makeBuildTarget();
      expect(b.n).toBeGreaterThanOrEqual(20);
      expect(b.n).toBeLessThanOrEqual(200);
    }
    expect(numberWord(176)).toBe('százhetvenhat');
    expect(numberWord(112)).toBe('száztizenkettő');
    expect(numberWord(120)).toBe('százhúsz');
    expect(numberWord(125)).toBe('százhuszonöt');
    expect(numberWord(200)).toBe('kétszáz');
    expect(numberWord(47)).toBe('negyvenhét');
  });

  it('matcher: 3 × 8 pairs, ≥ 4 figures per level; sorter: 3 × 3 × 9', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = COUNT200_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const cfg = COUNT200_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      cfg.categories.forEach((c) => expect(cfg.items.filter((i) => i.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('renders Matcher and Sorter without throwing', () => {
    expect(render(<Count200ExamG3Matcher />).container).toBeTruthy();
    expect(render(<Count200ExamG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [Count200BlocksSvg, Count200NumberLineSvg, Count200RoundingSvg, Count200AddSubSvg, Count200MulDivSvg, Count200MoneySvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
