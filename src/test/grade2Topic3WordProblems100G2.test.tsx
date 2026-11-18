import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WordProblems100G2Theory } from '@/components/math/grade-2/szamolas-100-ig/szoveges-feladatok/WordProblems100G2Theory';
import {
  WordProblems100G2Quiz,
  WORD_PROBLEMS100_G2_QUESTIONS
} from '@/components/math/grade-2/szamolas-100-ig/szoveges-feladatok/WordProblems100G2Quiz';
import {
  WordProblems100G2Matcher,
  WORD_PROBLEMS100_G2_MATCHER_LEVELS
} from '@/components/math/grade-2/szamolas-100-ig/szoveges-feladatok/WordProblems100G2Matcher';
import {
  WordProblems100G2Sorter,
  WORD_PROBLEMS100_G2_SORTER_LEVELS
} from '@/components/math/grade-2/szamolas-100-ig/szoveges-feladatok/WordProblems100G2Sorter';
import {
  FiveSteps100Svg,
  PartWhole100Svg,
  CompareMore100Svg,
  InverseCompare100Svg,
  TwoStep100Svg,
  KeyWords100Svg
} from '@/components/math/grade-2/szamolas-100-ig/szoveges-feladatok/WordProblems100G2Figures';
import {
  WP_KINDS,
  makeWPTask,
  wpOptions,
  makeBarTask,
  barTarget,
  acc,
  ins
} from '@/components/math/grade-2/szamolas-100-ig/szoveges-feladatok/WordProblems100G2Parts';

describe('Grade 2 Topic III - 5. Szöveges feladatok - Components', () => {
  it('renders WordProblems100G2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WordProblems100G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems100G2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WordProblems100G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(WORD_PROBLEMS100_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WORD_PROBLEMS100_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    WORD_PROBLEMS100_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      const nums = (String(q.question) + ' ' + q.options.map(String).join(' ')).match(/\d+/g) || [];
      nums.map(Number).forEach((n) => expect(n).toBeLessThanOrEqual(100));
    });
    expect(new Set(WORD_PROBLEMS100_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(WORD_PROBLEMS100_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('lab generators stay within 0–100, are consistent, and use correct Hungarian suffixes', () => {
    WP_KINDS.forEach((k) => {
      for (let i = 0; i < 100; i++) {
        const t = makeWPTask(k);
        const val = t.op === '+' ? t.a + t.b : t.a - t.b;
        expect(val).toBe(t.answer);
        expect(t.answer).toBeGreaterThan(0);
        expect(t.answer).toBeLessThanOrEqual(100);
        (t.text.match(/\d+/g) || []).map(Number).forEach((n) => expect(n).toBeLessThanOrEqual(100));
        expect(t.text).not.toMatch(/undefined/);
        const opts = wpOptions(t);
        expect(opts).toContain(t.answer);
        expect(new Set(opts).size).toBe(opts.length);
      }
    });
    for (let i = 0; i < 200; i++) {
      const b = makeBarTask();
      expect(barTarget(b)).toBeGreaterThan(0);
      expect(barTarget(b)).toBeLessThanOrEqual(100);
    }
    expect([acc(18), acc(25), acc(40), acc(36), acc(2)]).toEqual(['18-at', '25-öt', '40-et', '36-ot', '2-t']);
    expect([ins(18), ins(25), ins(40), ins(14), ins(20)]).toEqual(['18-cal', '25-tel', '40-nel', '14-gyel', '20-szal']);
  });

  it('renders WordProblems100G2Matcher without throwing', () => {
    const { container } = render(<WordProblems100G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems100G2Sorter without throwing', () => {
    const { container } = render(<WordProblems100G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [FiveSteps100Svg, PartWhole100Svg, CompareMore100Svg, InverseCompare100Svg, TwoStep100Svg, KeyWords100Svg].forEach(
      (Fig) => {
        const { container } = render(<Fig />);
        expect(container.querySelector('svg')).toBeTruthy();
      }
    );
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = WORD_PROBLEMS100_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = WORD_PROBLEMS100_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
