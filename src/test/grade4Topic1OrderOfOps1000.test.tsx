import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { OrderOfOps1000Theory, evaluate } from '@/components/math/grade-4/szamolas-10000-ig/a-muveletek-sorrendje/OrderOfOps1000Theory';
import { OrderOfOps1000Quiz } from '@/components/math/grade-4/szamolas-10000-ig/a-muveletek-sorrendje/OrderOfOps1000Quiz';
import { OrderOfOps1000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/a-muveletek-sorrendje/OrderOfOps1000Matcher';
import { OrderOfOps1000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/a-muveletek-sorrendje/OrderOfOps1000Sorter';
import {
  OrderRulesSvg,
  StepCirclesSvg,
  FishingRodsSvg,
  ParenthesesCompareSvg,
  MillBoardSvg
} from '@/components/math/grade-4/szamolas-10000-ig/a-muveletek-sorrendje/OrderOfOps1000Figures';

describe('Grade 4 Topic I - 4. A műveletek sorrendje - Components', () => {
  it('renders OrderOfOps1000Theory without throwing', () => {
    const { container } = render(<OrderOfOps1000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOfOps1000Quiz without throwing', () => {
    const { container } = render(<OrderOfOps1000Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOfOps1000Matcher without throwing', () => {
    const { container } = render(<OrderOfOps1000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOfOps1000Sorter without throwing', () => {
    const { container } = render(<OrderOfOps1000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OrderRulesSvg, StepCirclesSvg, FishingRodsSvg, ParenthesesCompareSvg, MillBoardSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('evaluates expressions in the correct order', () => {
    expect(evaluate('500 + 4 · 90')).toBe(860);
    expect(evaluate('60 · 5 : 100 · 80')).toBe(240);
    expect(evaluate('1000 : ( 350 − 250 )')).toBe(10);
    expect(evaluate('180 + 8 · 42 − 9 · 11')).toBe(417);
    expect(evaluate('( 460 − 267 ) · 5 − 400')).toBe(565);
    expect(evaluate('3 · ( 139 + 117 )')).toBe(768);
    expect(evaluate('1000 − 678 + 127')).toBe(449);
  });
});
