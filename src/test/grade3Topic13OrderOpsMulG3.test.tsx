import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { OrderOpsMulG3Theory } from '@/components/math/grade-3/irasbeli-szorzas/a-muveletek-sorrendje/OrderOpsMulG3Theory';
import { OrderOpsMulG3Quiz, ORDER_OPS_MUL_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-szorzas/a-muveletek-sorrendje/OrderOpsMulG3Quiz';
import { OrderOpsMulG3Matcher, ORDER_OPS_MUL_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/a-muveletek-sorrendje/OrderOpsMulG3Matcher';
import { OrderOpsMulG3Sorter, ORDER_OPS_MUL_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/a-muveletek-sorrendje/OrderOpsMulG3Sorter';
import { genExpr, genTwinTask, steps, valueOf, validToks, parse, evalStr } from '@/components/math/grade-3/irasbeli-szorzas/a-muveletek-sorrendje/OrderOpsMulG3Parts';
import {
  OrderRuleMulSvg,
  CinemaTwoWaysSvg,
  ZooMapSvg,
  ShelvesSvg,
  OrderTrapMulSvg
} from '@/components/math/grade-3/irasbeli-szorzas/a-muveletek-sorrendje/OrderOpsMulG3Figures';

describe('Grade 3 Topic XIII - 5. A műveletek sorrendje', () => {
  it('renders OrderOpsMulG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<OrderOpsMulG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders OrderOpsMulG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<OrderOpsMulG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(ORDER_OPS_MUL_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ORDER_OPS_MUL_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ORDER_OPS_MUL_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(ORDER_OPS_MUL_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(ORDER_OPS_MUL_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders OrderOpsMulG3Matcher and OrderOpsMulG3Sorter without throwing', () => {
    expect(render(<OrderOpsMulG3Matcher />).container).toBeTruthy();
    expect(render(<OrderOpsMulG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [OrderRuleMulSvg, CinemaTwoWaysSvg, ZooMapSvg, ShelvesSvg, OrderTrapMulSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures and consistent matcher pairs', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(ORDER_OPS_MUL_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(ORDER_OPS_MUL_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(ORDER_OPS_MUL_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(ORDER_OPS_MUL_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(ORDER_OPS_MUL_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
    // 3. szint: a két oldal értéke egyenlő
    ORDER_OPS_MUL_G3_MATCHER_LEVELS[3].pairs
      .filter((p) => typeof p.left === 'string' && p.left !== '')
      .forEach((p) => expect(evalStr(p.left as string)).toBe(evalStr(p.right as string)));
    // 2. szint: szöveges bal oldal = jobb oldali eredmény
    ORDER_OPS_MUL_G3_MATCHER_LEVELS[2].pairs
      .filter((p) => typeof p.left === 'string' && p.left !== '')
      .forEach((p) => expect(evalStr(p.left as string)).toBe(Number(p.right)));
    // csoportosító 2. szint: az eredmény a kategória neve
    ORDER_OPS_MUL_G3_SORTER_LEVELS[2].items.forEach((i) => expect(`r${evalStr(i.text as string)}`).toBe(i.categoryId));
  });

  it('lab generators stay within 1000 and follow the order rule', () => {
    expect(evalStr('90 + 110 · 4')).toBe(530);
    expect(evalStr('2 · (60 + 270)')).toBe(660);
    expect(evalStr('900 − (160 + 240)')).toBe(500);
    for (let i = 0; i < 300; i++) {
      const t = genExpr();
      expect(validToks(t)).toBe(true);
      expect(steps(t).length).toBeGreaterThanOrEqual(2);
      const tw = genTwinTask();
      expect(evalStr(tw.options[0])).toBe(tw.value);
      expect(valueOf(parse(tw.expr))).toBe(tw.value);
      expect(evalStr(tw.options[1])).not.toBe(tw.value);
      expect(evalStr(tw.options[2])).not.toBe(tw.value);
      expect(tw.value).toBeLessThanOrEqual(1000);
    }
  });
});
