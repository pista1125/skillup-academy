import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  WrittenSubExamG3Theory,
  makeColTask,
  kindOf,
  estimateOptions,
  digitHint,
  makeMixedTask,
  COL_KINDS,
  MIX_KINDS
} from '@/components/math/grade-3/irasbeli-kivonas/megallo/WrittenSubExamG3Theory';
import { WrittenSubExamG3Quiz, WRITTEN_SUB_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-kivonas/megallo/WrittenSubExamG3Quiz';
import { WrittenSubExamG3Matcher, WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/megallo/WrittenSubExamG3Matcher';
import { WrittenSubExamG3Sorter, WRITTEN_SUB_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/megallo/WrittenSubExamG3Sorter';
import {
  WrittenSubExamCoinsSvg,
  WrittenSubExamEstimateSvg,
  WrittenSubExamStepsSvg,
  WrittenSubExamCheckSvg,
  WrittenSubExamPlanSvg,
  WrittenSubExamChangesSvg
} from '@/components/math/grade-3/irasbeli-kivonas/megallo/WrittenSubExamG3Figures';
import { subSteps } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';

const nums = (s: string) => (s.match(/\d+/g) || []).map(Number);

describe('Grade 3 Topic VIII - 5. Megálló – tudáspróba', () => {
  it('renders the theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<WrittenSubExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders the quiz without throwing', { timeout: 20000 }, () => {
    expect(render(<WrittenSubExamG3Quiz />).container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0 and distinct options; at least 54 figures', () => {
    expect(WRITTEN_SUB_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(WRITTEN_SUB_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(WRITTEN_SUB_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    WRITTEN_SUB_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
    expect(WRITTEN_SUB_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('no number above 500 in questions and options (the book stays within 500 in this chapter)', () => {
    WRITTEN_SUB_EXAM_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => nums(String(s)).forEach((n) => expect(n).toBeLessThanOrEqual(500)));
    });
  });

  it('matcher: 3 levels x 8 pairs with distinct values, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
    // a szöveges kivonások eredménye stimmel
    [1, 2].forEach((l) =>
      WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS[l as 1 | 2].pairs
        .filter((p) => String(p.left).includes('−'))
        .forEach((p) => {
          const [a, b] = String(p.left).split(' − ').map(Number);
          expect(a - b).toBe(Number(p.right));
        })
    );
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level; level 1–2 categories are right', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = WRITTEN_SUB_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
    WRITTEN_SUB_EXAM_G3_SORTER_LEVELS[1].items
      .filter((i) => i.text)
      .forEach((i) => {
        const [a, b] = i.text.split(' − ').map(Number);
        const n = subSteps(a, b).filter((s) => s.carryOut).length;
        expect(i.categoryId).toBe(`n${n}`);
      });
    WRITTEN_SUB_EXAM_G3_SORTER_LEVELS[2].items
      .filter((i) => i.text)
      .forEach((i) => {
        const [a, b] = i.text.split(' − ').map(Number);
        expect(i.categoryId).toBe(a - b < 200 ? 'kev' : a - b === 200 ? 'pont' : 'tobb');
      });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<WrittenSubExamG3Matcher />).container).toBeTruthy();
    expect(render(<WrittenSubExamG3Sorter />).container).toBeTruthy();
    [WrittenSubExamCoinsSvg, WrittenSubExamEstimateSvg, WrittenSubExamStepsSvg, WrittenSubExamCheckSvg, WrittenSubExamPlanSvg, WrittenSubExamChangesSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });

  it('column lab: tasks of every kind, ≤ 500, three-digit result; hints catch typical mistakes (pótlás, maradék)', () => {
    COL_KINDS.forEach(({ id }) => {
      for (let i = 0; i < 100; i++) {
        const t = makeColTask(id);
        expect(t.kind).toBe(id);
        expect(kindOf(t.a, t.b)).toBe(id);
        expect(t.a).toBeLessThanOrEqual(500);
        expect(t.a - t.b).toBeGreaterThanOrEqual(100);
        const est = estimateOptions(t.a, t.b);
        expect(est.options).toContain(est.right);
        expect(new Set(est.options).size).toBe(3);
        const st = subSteps(t.a, t.b);
        expect(st[2].write * 100 + st[1].write * 10 + st[0].write).toBe(t.a - t.b);
        st.forEach((s, c) => {
          expect(digitHint(st, c, s.write).ok).toBe(true);
          expect(digitHint(st, c, (s.write + 3) % 10).ok).toBe(false);
        });
      }
    });
    // 341 − 127: fordított kivonás az egyeseknél (7 − 1 = 6)
    const st = subSteps(341, 127);
    expect(digitHint(st, 0, 6).msg).toContain('Fordítva');
    // a maradékot nem adta a kivonandó jegyéhez (2-höz 2, az 4)
    expect(digitHint(st, 1, 2).msg).toContain('maradékot');
  });

  it('mixed lab: every kind gives 4 distinct options ≤ 500 with the right answer and a hint for each wrong one', () => {
    MIX_KINDS.forEach(({ id }) => {
      for (let i = 0; i < 300; i++) {
        const t = makeMixedTask(id);
        expect(t.kind).toBe(id);
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        t.options.forEach((o) => {
          nums(o).forEach((n) => {
            expect(n).toBeGreaterThanOrEqual(0);
            expect(n).toBeLessThanOrEqual(500);
          });
          if (o !== t.answer) expect(t.why[o]).toBeTruthy();
        });
        nums(t.text).forEach((n) => expect(n).toBeLessThanOrEqual(500));
        if (t.expr) expect(Function(`return ${t.expr}`)()).toBe(parseInt(t.answer, 10));
      }
    });
  });
});
