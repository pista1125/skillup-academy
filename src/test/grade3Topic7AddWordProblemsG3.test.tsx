import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AddWordProblemsG3Theory, makeWordTask, makeCompareWord, wordHint } from '@/components/math/grade-3/irasbeli-osszeadas/szoveges-feladatok/AddWordProblemsG3Theory';
import { AddWordProblemsG3Quiz, ADD_WORD_PROBLEMS_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-osszeadas/szoveges-feladatok/AddWordProblemsG3Quiz';
import { AddWordProblemsG3Matcher, ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/szoveges-feladatok/AddWordProblemsG3Matcher';
import { AddWordProblemsG3Sorter, ADD_WORD_PROBLEMS_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/szoveges-feladatok/AddWordProblemsG3Sorter';
import { sumNoCarry, round10 } from '@/components/math/grade-3/irasbeli-osszeadas/szoveges-feladatok/AddWordProblemsG3Parts';
import {
  WordStepsSvg,
  WordLibrarySvg,
  WordMoreSvg,
  WordLessThanSvg,
  WordThreeSvg,
  WordMenuSvg
} from '@/components/math/grade-3/irasbeli-osszeadas/szoveges-feladatok/AddWordProblemsG3Figures';

describe('Grade 3 Topic VII - 5. Szöveges feladatok', () => {
  it('renders the theory with the chapter badge', () => {
    const { container, getAllByText } = render(<AddWordProblemsG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders the quiz without throwing', () => {
    expect(render(<AddWordProblemsG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ADD_WORD_PROBLEMS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ADD_WORD_PROBLEMS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(ADD_WORD_PROBLEMS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    ADD_WORD_PROBLEMS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('no number above 1000 in questions and options; at least 18 figures', () => {
    ADD_WORD_PROBLEMS_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000)));
    });
    expect(ADD_WORD_PROBLEMS_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = ADD_WORD_PROBLEMS_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = ADD_WORD_PROBLEMS_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<AddWordProblemsG3Matcher />).container).toBeTruthy();
    expect(render(<AddWordProblemsG3Sorter />).container).toBeTruthy();
    [WordStepsSvg, WordLibrarySvg, WordMoreSvg, WordLessThanSvg, WordThreeSvg, WordMenuSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });

  it('helpers', () => {
    expect(sumNoCarry([236, 158])).toBe(384);
    expect(sumNoCarry([267, 358])).toBe(515);
    expect(round10(245)).toBe(250);
    expect(round10(158)).toBe(160);
  });

  it('word lab: tasks are consistent and stay within 0–1000', () => {
    (['sum2', 'sum3', 'more', 'less'] as const).forEach((k) => {
      for (let i = 0; i < 300; i++) {
        const t = makeWordTask(k);
        expect(t.result).toBe(t.nums.reduce((s, n) => s + n, 0));
        expect(t.result).toBeLessThanOrEqual(999);
        expect(t.planOpts).toHaveLength(3);
        expect(new Set(t.planOpts).size).toBe(3);
        expect(t.planOpts).toContain(t.plan);
        expect(new Set(t.estOpts).size).toBe(4);
        expect(t.estOpts).toContain(t.est);
        expect(new Set(t.resOpts).size).toBe(4);
        expect(t.resOpts).toContain(t.result);
        [...t.resOpts, ...t.estOpts].forEach((v) => {
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual(1000);
        });
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000));
        t.resOpts.filter((v) => v !== t.result).forEach((v) => expect(wordHint(t, 2, v).length).toBeGreaterThan(5));
      }
    });
  });

  it('compare lab: tasks are consistent', () => {
    for (let i = 0; i < 300; i++) {
      const c = makeCompareWord();
      expect(c.other_v).toBe(c.a + c.d);
      expect(c.total).toBe(c.a + c.other_v);
      expect(c.total).toBeLessThanOrEqual(999);
      expect(c.known).not.toBe(c.other);
      expect(new Set(c.resOpts).size).toBe(4);
      expect(c.resOpts).toContain(c.other_v);
      expect(new Set(c.totalOpts).size).toBe(4);
      expect(c.totalOpts).toContain(c.total);
    }
  });
});
