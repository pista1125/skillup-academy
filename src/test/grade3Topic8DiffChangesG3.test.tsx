import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { DiffChangesG3Theory, makeGoalTask, checkGoal, makeCompareTask, goalText } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Theory';
import { DiffChangesG3Quiz, DIFF_CHANGES_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Quiz';
import { DiffChangesG3Matcher, DIFF_CHANGES_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Matcher';
import { DiffChangesG3Sorter, DIFF_CHANGES_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Sorter';
import { ins, changeText } from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Parts';
import {
  DiffChangesMinuendSvg,
  DiffChangesSubtrahendSvg,
  DiffChangesWalletSvg,
  DiffChangesAgeSvg,
  DiffChangesTableSvg,
  DiffChangesCleverSvg
} from '@/components/math/grade-3/irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Figures';

describe('Grade 3 Topic VIII - 4. A különbség változásai', () => {
  it('renders the theory with the chapter badge', () => {
    const { container, getAllByText } = render(<DiffChangesG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders the quiz without throwing', () => {
    expect(render(<DiffChangesG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(DIFF_CHANGES_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(DIFF_CHANGES_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(DIFF_CHANGES_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    DIFF_CHANGES_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('no number above 500 in questions and options (chapter VIII stays within 500 like the book); at least 18 figures', () => {
    DIFF_CHANGES_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(500)));
    });
    expect(DIFF_CHANGES_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = DIFF_CHANGES_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = DIFF_CHANGES_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter level 3: the expressions really are <, = or > 200', () => {
    DIFF_CHANGES_G3_SORTER_LEVELS[3].items.forEach((i) => {
      const [a, b] = i.text.split(' − ').map(Number);
      const want = a - b < 200 ? 'kev' : a - b === 200 ? 'pont' : 'tobb';
      expect(i.categoryId).toBe(want);
    });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<DiffChangesG3Matcher />).container).toBeTruthy();
    expect(render(<DiffChangesG3Sorter />).container).toBeTruthy();
    [DiffChangesMinuendSvg, DiffChangesSubtrahendSvg, DiffChangesWalletSvg, DiffChangesAgeSvg, DiffChangesTableSvg, DiffChangesCleverSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });

  it('Hungarian suffixes', () => {
    expect(ins(10)).toBe('10-zel');
    expect(ins(20)).toBe('20-szal');
    expect(ins(100)).toBe('100-zal');
    expect(ins(-1)).toBe('1-gyel');
    expect(ins(90)).toBe('90-nel');
    expect(ins(110)).toBe('110-zel');
    expect(changeText(0)).toBe('nem változik');
    expect(changeText(-20)).toBe('20-szal csökken');
    expect(goalText(0)).toBe('ne változzon');
    expect(goalText(-90)).toBe('90-nel kisebb legyen');
  });

  it('goal lab: tasks stay in range and the checker follows the subtraction rules', () => {
    for (let i = 0; i < 300; i++) {
      const t = makeGoalTask();
      expect(t.m + Math.max(0, t.delta)).toBeLessThanOrEqual(500);
      expect(t.s).toBeLessThan(t.m);
      expect(t.m - t.s + t.delta).toBeGreaterThanOrEqual(0);
      // a kisebbítendő ugyanarra, a kivonandó fordítva
      expect(checkGoal(t, t.delta, 0).ok).toBe(t.delta !== 0);
      expect(checkGoal(t, 0, -t.delta).ok).toBe(t.delta !== 0);
      expect(checkGoal(t, 10 + t.delta, 10).ok).toBe(true);
      if (t.delta !== 0) {
        expect(checkGoal(t, 0, t.delta).ok).toBe(false);
        expect(checkGoal(t, 0, t.delta).msg).toContain('fordítva');
      }
    }
  });

  it('compare lab: the sign matches the differences, all values in range', () => {
    for (let i = 0; i < 500; i++) {
      const c = makeCompareTask();
      const l = c.l[0] - c.l[1];
      const r = c.r[0] - c.r[1];
      expect(c.sign).toBe(l < r ? '<' : l > r ? '>' : '=');
      [...c.l, ...c.r].forEach((v) => {
        expect(v).toBeGreaterThanOrEqual(10);
        expect(v).toBeLessThanOrEqual(500);
      });
      expect(l).toBeGreaterThanOrEqual(0);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(c.why.length).toBeGreaterThan(10);
    }
  });
});
