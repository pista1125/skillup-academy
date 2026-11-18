import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WordProblems50G2Theory } from '@/components/math/grade-2/szamolas-50-ig/szoveges-feladatok/WordProblems50G2Theory';
import {
  WordProblems50G2Quiz,
  WORD_PROBLEMS50_G2_QUESTIONS
} from '@/components/math/grade-2/szamolas-50-ig/szoveges-feladatok/WordProblems50G2Quiz';
import {
  WordProblems50G2Matcher,
  WORD_PROBLEMS50_G2_MATCHER_LEVELS
} from '@/components/math/grade-2/szamolas-50-ig/szoveges-feladatok/WordProblems50G2Matcher';
import {
  WordProblems50G2Sorter,
  WORD_PROBLEMS50_G2_SORTER_LEVELS
} from '@/components/math/grade-2/szamolas-50-ig/szoveges-feladatok/WordProblems50G2Sorter';
import {
  WordStepsSvg,
  JoinBarSvg,
  TakeBarSvg,
  CompareDiffSvg,
  TrickyCompareSvg,
  TwoStepBarSvg
} from '@/components/math/grade-2/szamolas-50-ig/szoveges-feladatok/WordProblems50G2Figures';
import {
  WORD_KINDS,
  makeWordTask,
  makeCompareTask
} from '@/components/math/grade-2/szamolas-50-ig/szoveges-feladatok/WordProblems50G2Parts';

describe('Grade 2 Topic II - 5. Szöveges feladatok - Components', () => {
  it('renders WordProblems50G2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WordProblems50G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems50G2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WordProblems50G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, distinct options, numbers <= 50', () => {
    expect(WORD_PROBLEMS50_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WORD_PROBLEMS50_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    WORD_PROBLEMS50_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      (String(q.question).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(50));
    });
    expect(new Set(WORD_PROBLEMS50_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(WORD_PROBLEMS50_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('lab generators stay within 0–50 and are consistent', () => {
    WORD_KINDS.forEach(({ id }) => {
      for (let i = 0; i < 100; i++) {
        const t = makeWordTask(id);
        expect(t.answer).toBe(t.op === '+' ? t.a + t.b : t.a - t.b);
        expect(t.answer).toBeGreaterThanOrEqual(1);
        expect(t.answer).toBeLessThanOrEqual(50);
        expect(t.options).toContain(t.answer);
        expect(new Set(t.options).size).toBe(4);
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(50));
      }
    });
    for (let i = 0; i < 200; i++) {
      const c = makeCompareTask();
      expect(c.answer).toBe(c.more ? c.a + c.diff : c.a - c.diff);
      expect(c.answer).toBeGreaterThanOrEqual(1);
      expect(c.answer).toBeLessThanOrEqual(50);
    }
  });

  it('renders WordProblems50G2Matcher without throwing', () => {
    const { container } = render(<WordProblems50G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems50G2Sorter without throwing', () => {
    const { container } = render(<WordProblems50G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [WordStepsSvg, JoinBarSvg, TakeBarSvg, CompareDiffSvg, TrickyCompareSvg, TwoStepBarSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = WORD_PROBLEMS50_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      const items = WORD_PROBLEMS50_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
