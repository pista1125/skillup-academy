import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AddSub1000Theory, columnSteps } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-1000-ig/AddSub1000Theory';
import { AddSub1000Quiz } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-1000-ig/AddSub1000Quiz';
import { AddSub1000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-1000-ig/AddSub1000Matcher';
import { AddSub1000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-1000-ig/AddSub1000Sorter';
import {
  MentalJumpSvg,
  WrittenAdditionSvg,
  WrittenSubtractionSvg,
  EstimateSvg,
  GiftShopSvg
} from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-1000-ig/AddSub1000Figures';

describe('Grade 4 Topic I - 2. Összeadás és kivonás 1000-ig - Components', () => {
  it('renders AddSub1000Theory without throwing', () => {
    const { container } = render(<AddSub1000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub1000Quiz without throwing', () => {
    const { container } = render(<AddSub1000Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub1000Matcher without throwing', () => {
    const { container } = render(<AddSub1000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub1000Sorter without throwing', () => {
    const { container } = render(<AddSub1000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MentalJumpSvg, WrittenAdditionSvg, WrittenSubtractionSvg, EstimateSvg, GiftShopSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes written addition and subtraction columns correctly', () => {
    const add = columnSteps(448, 263, '+').map((s) => s.digit);
    expect(add).toEqual([1, 1, 7]);
    const sub = columnSteps(931, 456, '−').map((s) => s.digit);
    expect(sub).toEqual([5, 7, 4]);
    const sub2 = columnSteps(952, 786, '−').map((s) => s.digit);
    expect(sub2).toEqual([6, 6, 1]);
  });
});
