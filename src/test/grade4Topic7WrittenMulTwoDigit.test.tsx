import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenMulTwoDigitTheory, mul2Steps, round10 } from '@/components/math/grade-4/irasbeli-szorzas/irasbeli-szorzas/WrittenMulTwoDigitTheory';
import { WrittenMulTwoDigitQuiz } from '@/components/math/grade-4/irasbeli-szorzas/irasbeli-szorzas/WrittenMulTwoDigitQuiz';
import { WrittenMulTwoDigitMatcher } from '@/components/math/grade-4/irasbeli-szorzas/irasbeli-szorzas/WrittenMulTwoDigitMatcher';
import { WrittenMulTwoDigitSorter } from '@/components/math/grade-4/irasbeli-szorzas/irasbeli-szorzas/WrittenMulTwoDigitSorter';
import {
  MonaReadingSvg,
  SwapCheckSvg,
  TwoWaysSvg,
  ShortcutSvg,
  EstimateSvg,
  BridgeSvg
} from '@/components/math/grade-4/irasbeli-szorzas/irasbeli-szorzas/WrittenMulTwoDigitFigures';

const digitsOf = (a: number, b: number, row: 'p1' | 'p2' | 'sum') =>
  mul2Steps(a, b)
    .filter((s) => s.row === row)
    .sort((x, y) => y.offset - x.offset)
    .map((s) => s.digit)
    .join('');

describe('Grade 4 Topic VII - 2. Írásbeli szorzás - Components', () => {
  it('renders WrittenMulTwoDigitTheory without throwing', () => {
    const { container } = render(<WrittenMulTwoDigitTheory />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMulTwoDigitQuiz without throwing', () => {
    const { container } = render(<WrittenMulTwoDigitQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMulTwoDigitMatcher without throwing', () => {
    const { container } = render(<WrittenMulTwoDigitMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMulTwoDigitSorter without throwing', () => {
    const { container } = render(<WrittenMulTwoDigitSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MonaReadingSvg, SwapCheckSvg, TwoWaysSvg, ShortcutSvg, EstimateSvg, BridgeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes partial products and the product correctly', () => {
    expect(digitsOf(12, 14, 'p1')).toBe('48');
    expect(digitsOf(12, 14, 'p2')).toBe('12');
    expect(digitsOf(12, 14, 'sum')).toBe('168');
    expect(digitsOf(24, 26, 'p1')).toBe('144');
    expect(digitsOf(24, 26, 'sum')).toBe('624');
    [
      [75, 27],
      [85, 16],
      [239, 36],
      [384, 25],
      [174, 28]
    ].forEach(([a, b]) => expect(Number(digitsOf(a, b, 'sum'))).toBe(a * b));
    expect(round10(26)).toBe(30);
    expect(round10(24)).toBe(20);
    expect(round10(85)).toBe(90);
  });
});
