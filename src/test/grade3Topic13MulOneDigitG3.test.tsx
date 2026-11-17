import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulOneDigitG3Theory } from '@/components/math/grade-3/irasbeli-szorzas/szorzas-egyjegyu-szammal/MulOneDigitG3Theory';
import { MulOneDigitG3Quiz, MUL_ONE_DIGIT_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-szorzas/szorzas-egyjegyu-szammal/MulOneDigitG3Quiz';
import { MulOneDigitG3Matcher, MUL_ONE_DIGIT_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/szorzas-egyjegyu-szammal/MulOneDigitG3Matcher';
import { MulOneDigitG3Sorter, MUL_ONE_DIGIT_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/szorzas-egyjegyu-szammal/MulOneDigitG3Sorter';
import { szor, targy, opts } from '@/components/math/grade-3/irasbeli-szorzas/szorzas-egyjegyu-szammal/MulOneDigitG3Parts';
import {
  CoinsMulSvg,
  TensMulSvg,
  SplitMulSvg,
  ChainSvg,
  ThreePartSvg,
  SwapSvg
} from '@/components/math/grade-3/irasbeli-szorzas/szorzas-egyjegyu-szammal/MulOneDigitG3Figures';

describe('Grade 3 Topic XIII - 1. Szorzás egyjegyű számmal', () => {
  it('renders MulOneDigitG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<MulOneDigitG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders MulOneDigitG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MulOneDigitG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(MUL_ONE_DIGIT_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_ONE_DIGIT_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MUL_ONE_DIGIT_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MUL_ONE_DIGIT_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(MUL_ONE_DIGIT_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders MulOneDigitG3Matcher and MulOneDigitG3Sorter without throwing', () => {
    expect(render(<MulOneDigitG3Matcher />).container).toBeTruthy();
    expect(render(<MulOneDigitG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [CoinsMulSvg, TensMulSvg, SplitMulSvg, ChainSvg, ThreePartSvg, SwapSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(MUL_ONE_DIGIT_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(MUL_ONE_DIGIT_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(MUL_ONE_DIGIT_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(MUL_ONE_DIGIT_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(MUL_ONE_DIGIT_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('helpers: Hungarian suffixes and option builder', () => {
    expect(szor(3)).toBe('3-szor');
    expect(szor(4)).toBe('4-szer');
    expect(szor(5)).toBe('5-ször');
    expect(targy(5)).toBe('az 5-öt');
    expect(targy(2)).toBe('a 2-t');
    const o = opts(360, [330, 360, 123]);
    expect(o[0]).toBe('360');
    expect(o).toHaveLength(4);
    expect(new Set(o).size).toBe(4);
  });
});
