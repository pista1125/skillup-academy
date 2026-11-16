import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import {
  OrderOfOps10000Theory,
  evaluate,
  evalSteps,
  SIGN_TASKS,
  WAGON_ORDER
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-sorrendje/OrderOfOps10000Theory';
import { OrderOfOps10000Quiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-sorrendje/OrderOfOps10000Quiz';
import { OrderOfOps10000Matcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-sorrendje/OrderOfOps10000Matcher';
import { OrderOfOps10000Sorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-sorrendje/OrderOfOps10000Sorter';
import {
  OrderLadderSvg,
  MonaManoSvg,
  TrainWagonsSvg,
  OpenSentenceLineSvg,
  FishHookSvg
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-muveletek-sorrendje/OrderOfOps10000Figures';

describe('Grade 4 Topic III - 7. A műveletek sorrendje (10 000-ig) - Components', () => {
  it('renders OrderOfOps10000Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<OrderOfOps10000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOfOps10000Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<OrderOfOps10000Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOfOps10000Matcher without throwing', () => {
    const { container } = render(<OrderOfOps10000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOfOps10000Sorter without throwing', () => {
    const { container } = render(<OrderOfOps10000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OrderLadderSvg, MonaManoSvg, TrainWagonsSvg, OpenSentenceLineSvg, FishHookSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('evaluates the workbook expressions in the correct order', () => {
    expect(evaluate('4264 − 1316 · 3')).toBe(316);
    expect(evaluate('(4264 − 1316) · 3')).toBe(8844);
    expect(evaluate('9464 − 3518 + 1325')).toBe(7271);
    expect(evaluate('5 · 1614 : 3')).toBe(2690);
    expect(evaluate('1386 + 2634 : 6')).toBe(1825);
    expect(evaluate('(1386 + 2634) : 6')).toBe(670);
    expect(evaluate('10 000 − (6450 + 3 · 285)')).toBe(2695);
    expect(evaluate('9848 : 4 + 3 · 1127')).toBe(5843);
    expect(evalSteps('(4264 − 1316) · 3')).toEqual(['(4264 − 1316) · 3', '2948 · 3', '8844']);
  });

  it('sign lab targets are reachable and the train spells PUTNOK', () => {
    const signs = ['+', '−', '·', ':'];
    SIGN_TASKS.forEach((t) => {
      const ok = signs.some((a) => signs.some((b) => evaluate(`4800 ${a} 60 ${b} 10`) === t.target));
      expect(ok).toBe(true);
    });
    expect(WAGON_ORDER.join('')).toBe('PUTNOK');
  });
});
