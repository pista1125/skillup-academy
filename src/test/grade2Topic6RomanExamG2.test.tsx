import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanExamG2Theory } from '@/components/math/grade-2/romai-szamok/gyakorlas-tudasproba/RomanExamG2Theory';
import { RomanExamG2Quiz, ROMAN_EXAM_G2_QUESTIONS } from '@/components/math/grade-2/romai-szamok/gyakorlas-tudasproba/RomanExamG2Quiz';
import { RomanExamG2Matcher, ROMAN_EXAM_G2_MATCHER_LEVELS } from '@/components/math/grade-2/romai-szamok/gyakorlas-tudasproba/RomanExamG2Matcher';
import { RomanExamG2Sorter, ROMAN_EXAM_G2_SORTER_LEVELS } from '@/components/math/grade-2/romai-szamok/gyakorlas-tudasproba/RomanExamG2Sorter';
import {
  RomanRecapRulesSvg,
  RomanFullTableSvg,
  RomanReadStepsSvg,
  RomanMistakesSvg
} from '@/components/math/grade-2/romai-szamok/gyakorlas-tudasproba/RomanExamG2Figures';
import {
  ROMAN_EXAM_TASK_KINDS,
  makeRomanExamTask,
  makeValidityTask,
  romanBreakdown
} from '@/components/math/grade-2/romai-szamok/gyakorlas-tudasproba/RomanExamG2Parts';
import { toRoman, fromRoman, isValidRoman } from '@/components/math/grade-2/romai-szamok/romai-szamok-ertelmezese/RomanIntroG2Parts';

describe('Grade 2 Topic VI - 4. Gyakorlás, tudáspróba', () => {
  it('renders RomanExamG2Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<RomanExamG2Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('2. OSZTÁLY • VI. A RÓMAI SZÁMOK • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders RomanExamG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0, distinct options, and >= 54 figures', () => {
    expect(ROMAN_EXAM_G2_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(ROMAN_EXAM_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(ROMAN_EXAM_G2_QUESTIONS.map((q) => q.id)).size).toBe(90);
    ROMAN_EXAM_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
      const textNums = (String(q.question).match(/\d+/g) || []).map(Number);
      textNums.forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(20);
      });
      q.options.forEach((o) => {
        if (/^[IVXLCDM]+\.?$/.test(String(o))) expect(String(o)).toMatch(/^[IVX]+\.?$/);
      });
    });
    expect(ROMAN_EXAM_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(54);
  });

  it('roman helpers and breakdowns are consistent for 1–20', () => {
    for (let n = 1; n <= 20; n++) {
      expect(fromRoman(toRoman(n))).toBe(n);
      expect(romanBreakdown(n).endsWith(String(n))).toBe(true);
    }
  });

  it('lab task generators stay strictly within 1–20 and remain consistent', () => {
    ROMAN_EXAM_TASK_KINDS.forEach(({ id }) => {
      for (let i = 0; i < 200; i++) {
        const t = makeRomanExamTask(id);
        expect(t.prompt).toBeTruthy();
        expect(t.options).toContain(t.answer);
        expect(new Set(t.options).size).toBe(t.options.length);
        expect(t.options.length).toBeGreaterThanOrEqual(3);
        expect(t.answerValue).toBeGreaterThanOrEqual(1);
        expect(t.answerValue).toBeLessThanOrEqual(20);
        (t.show.match(/\d+/g) || []).forEach((n) => {
          expect(Number(n)).toBeGreaterThanOrEqual(1);
          expect(Number(n)).toBeLessThanOrEqual(20);
        });
        if (id === 'read') expect(fromRoman(t.show)).toBe(Number(t.answer));
        if (id === 'write') expect(fromRoman(t.answer)).toBe(Number(t.show));
        if (id === 'clock') {
          expect(t.hour).toBe(Number(t.answer));
          t.options.forEach((o) => {
            expect(Number(o)).toBeGreaterThanOrEqual(1);
            expect(Number(o)).toBeLessThanOrEqual(12);
          });
        }
        if (id === 'calc') {
          const [a, op, b] = t.show.split(' ');
          const va = fromRoman(a)!;
          const vb = fromRoman(b)!;
          expect(op === '+' ? va + vb : va - vb).toBe(Number(t.answer));
        }
      }
    });
    for (let i = 0; i < 100; i++) {
      const s = makeValidityTask();
      expect(typeof isValidRoman(s)).toBe('boolean');
    }
  });

  it('renders RomanExamG2Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanExamG2Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all Theory figure SVGs without throwing', () => {
    [RomanRecapRulesSvg, RomanFullTableSvg, RomanReadStepsSvg, RomanMistakesSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = ROMAN_EXAM_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = ROMAN_EXAM_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
