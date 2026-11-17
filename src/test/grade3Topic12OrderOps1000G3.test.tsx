import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { OrderOps1000G3Theory } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/muveleti-sorrend/OrderOps1000G3Theory';
import { OrderOps1000G3Quiz, ORDER_OPS_1000_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/muveleti-sorrend/OrderOps1000G3Quiz';
import { OrderOps1000G3Matcher, ORDER_OPS_1000_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/muveleti-sorrend/OrderOps1000G3Matcher';
import { OrderOps1000G3Sorter, ORDER_OPS_1000_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/muveleti-sorrend/OrderOps1000G3Sorter';
import * as Figs from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/muveleti-sorrend/OrderOps1000G3Figures';
import { evalStr, genExpr, genBracketTask, validToks, valueOf, parse, steps } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/muveleti-sorrend/OrderOps1000G3Parts';

describe('Grade 3 Topic XII - 3. A műveletek sorrendje és a zárójelek - Components', () => {
  it('renders OrderOps1000G3Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<OrderOps1000G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOps1000G3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<OrderOps1000G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(ORDER_OPS_1000_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ORDER_OPS_1000_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ORDER_OPS_1000_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(ORDER_OPS_1000_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders OrderOps1000G3Matcher and OrderOps1000G3Sorter without throwing', () => {
    expect(render(<OrderOps1000G3Matcher />).container).toBeTruthy();
    expect(render(<OrderOps1000G3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    Object.values(Figs).forEach((Fig) => {
      const { container } = render(React.createElement(Fig as React.FC));
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(ORDER_OPS_1000_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(ORDER_OPS_1000_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(ORDER_OPS_1000_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(ORDER_OPS_1000_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(ORDER_OPS_1000_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('evaluates expressions with brackets and the right order', () => {
    expect(evalStr('(930 − 570) : 6 + 245')).toBe(305);
    expect(evalStr('850 − 30 · 9')).toBe(580);
    expect(evalStr('700 − (250 − 100)')).toBe(550);
    expect(evalStr('1000 − 6 · 70 − 135')).toBe(445);
    expect(steps(parse('4 · (275 − 185)')).map((s) => s.r)).toEqual([90, 360]);
  });

  it('matcher and sorter data are consistent with the evaluator', () => {
    ([1, 2, 3] as const).forEach((l) => {
      ORDER_OPS_1000_G3_MATCHER_LEVELS[l].pairs.forEach((p) => {
        if (p.left) expect(evalStr(String(p.left))).toBe(Number(p.right));
      });
    });
    const s2 = ORDER_OPS_1000_G3_SORTER_LEVELS[2];
    s2.items.forEach((i) => expect(String(evalStr(String(i.text)))).toBe(String(i.categoryId).slice(1)));
  });

  it('lab generators stay within 0–1000 with whole numbers', () => {
    for (let i = 0; i < 200; i++) {
      const t = genExpr();
      expect(validToks(t)).toBe(true);
      t.forEach((x) => typeof x === 'number' && expect(x).toBeLessThanOrEqual(1000));
      const b = genBracketTask();
      expect(b.forms.some((f) => f.value === b.target)).toBe(true);
      b.forms.forEach((f) => {
        expect(validToks(parse(f.text))).toBe(true);
        expect(valueOf(parse(f.text))).toBe(f.value);
      });
    }
  });
});
