import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { OrderOps100G3Theory } from '@/components/math/grade-3/szamolas-100-ig/a-muveletek-sorrendje/OrderOps100G3Theory';
import { OrderOps100G3Quiz, ORDER_OPS_100_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/a-muveletek-sorrendje/OrderOps100G3Quiz';
import { OrderOps100G3Matcher } from '@/components/math/grade-3/szamolas-100-ig/a-muveletek-sorrendje/OrderOps100G3Matcher';
import { OrderOps100G3Sorter } from '@/components/math/grade-3/szamolas-100-ig/a-muveletek-sorrendje/OrderOps100G3Sorter';
import {
  TrainChainSvg,
  FrogChainSvg,
  OrderRuleSvg,
  OrderBubblesSvg,
  OrderTrapSvg,
  BagsStorySvg
} from '@/components/math/grade-3/szamolas-100-ig/a-muveletek-sorrendje/OrderOps100G3Figures';

describe('Grade 3 Topic I - 6. A műveletek sorrendje - Components', () => {
  it('renders OrderOps100G3Theory without throwing', () => {
    const { container } = render(<OrderOps100G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOps100G3Quiz without throwing', () => {
    const { container } = render(<OrderOps100G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(ORDER_OPS_100_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ORDER_OPS_100_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ORDER_OPS_100_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(ORDER_OPS_100_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders OrderOps100G3Matcher without throwing', () => {
    const { container } = render(<OrderOps100G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders OrderOps100G3Sorter without throwing', () => {
    const { container } = render(<OrderOps100G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TrainChainSvg, FrogChainSvg, OrderRuleSvg, OrderBubblesSvg, OrderTrapSvg, BagsStorySvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
