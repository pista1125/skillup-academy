import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SumChangesG3Theory, makeGoalTask, checkGoal, makeCompareTask, goalText } from '@/components/math/grade-3/irasbeli-osszeadas/az-osszeg-valtozasai/SumChangesG3Theory';
import { SumChangesG3Quiz, SUM_CHANGES_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-osszeadas/az-osszeg-valtozasai/SumChangesG3Quiz';
import { SumChangesG3Matcher, SUM_CHANGES_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/az-osszeg-valtozasai/SumChangesG3Matcher';
import { SumChangesG3Sorter, SUM_CHANGES_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/az-osszeg-valtozasai/SumChangesG3Sorter';
import { ins, changeText } from '@/components/math/grade-3/irasbeli-osszeadas/az-osszeg-valtozasai/SumChangesG3Parts';
import {
  SumChangesOneTagSvg,
  SumChangesBothSvg,
  SumChangesMoveSvg,
  SumChangesTableSvg,
  SumChangesCleverSvg,
  SumChangesCompareSvg
} from '@/components/math/grade-3/irasbeli-osszeadas/az-osszeg-valtozasai/SumChangesG3Figures';

describe('Grade 3 Topic VII - 4. Az összeg változásai', () => {
  it('renders the theory with the chapter badge', () => {
    const { container, getAllByText } = render(<SumChangesG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders the quiz without throwing', () => {
    expect(render(<SumChangesG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(SUM_CHANGES_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SUM_CHANGES_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(SUM_CHANGES_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    SUM_CHANGES_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('no number above 1000 in questions and options; at least 18 figures', () => {
    SUM_CHANGES_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000)));
    });
    expect(SUM_CHANGES_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = SUM_CHANGES_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = SUM_CHANGES_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<SumChangesG3Matcher />).container).toBeTruthy();
    expect(render(<SumChangesG3Sorter />).container).toBeTruthy();
    [SumChangesOneTagSvg, SumChangesBothSvg, SumChangesMoveSvg, SumChangesTableSvg, SumChangesCleverSvg, SumChangesCompareSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });

  it('Hungarian suffixes', () => {
    expect(ins(10)).toBe('10-zel');
    expect(ins(20)).toBe('20-szal');
    expect(ins(100)).toBe('100-zal');
    expect(ins(-1)).toBe('1-gyel');
    expect(ins(2)).toBe('2-vel');
    expect(ins(90)).toBe('90-nel');
    expect(ins(110)).toBe('110-zel');
    expect(ins(9)).toBe('9-cel');
    expect(changeText(0)).toBe('nem változik');
    expect(changeText(-20)).toBe('20-szal csökken');
    expect(goalText(0)).toBe('ne változzon');
  });

  it('goal lab: tasks stay in range and the checker accepts exactly the right changes', () => {
    for (let i = 0; i < 300; i++) {
      const t = makeGoalTask();
      expect(t.a + t.b + t.delta).toBeLessThanOrEqual(1000);
      expect(t.a + t.b + t.delta).toBeGreaterThanOrEqual(0);
      expect(checkGoal(t, t.delta, 0).ok).toBe(t.delta !== 0);
      expect(checkGoal(t, 10, t.delta - 10).ok).toBe(true);
      expect(checkGoal(t, t.delta + 1, 0).ok).toBe(false);
    }
  });

  it('compare lab: the sign matches the sums', () => {
    for (let i = 0; i < 500; i++) {
      const c = makeCompareTask();
      const l = c.l[0] + c.l[1];
      const r = c.r[0] + c.r[1];
      expect(c.sign).toBe(l < r ? '<' : l > r ? '>' : '=');
      [...c.l, ...c.r].forEach((v) => {
        expect(v).toBeGreaterThanOrEqual(10);
        expect(v).toBeLessThanOrEqual(999);
      });
      expect(l).toBeLessThanOrEqual(1000);
      expect(r).toBeLessThanOrEqual(1000);
      expect(c.why.length).toBeGreaterThan(10);
    }
  });
});
