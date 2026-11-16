import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulDiv10000Theory } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-10000-ig/MulDiv10000Theory';
import { MulDiv10000Quiz, MUL_DIV_10000_QUESTIONS } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-10000-ig/MulDiv10000Quiz';
import { MulDiv10000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-10000-ig/MulDiv10000Matcher';
import { MulDiv10000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-10000-ig/MulDiv10000Sorter';
import {
  MultiplyShiftSvg,
  DivideShiftSvg,
  PiggyBanksSvg,
  CoinArraySvg,
  ProductPyramidSvg,
  MushroomBasketsSvg
} from '@/components/math/grade-4/szamolas-10000-ig/szorzas-osztas-10000-ig/MulDiv10000Figures';

describe("Grade 4 Topic I - 12. Szorzás és osztás 10 000-ig - Components", () => {
  it('renders MulDiv10000Theory without throwing', () => {
    const { container } = render(<MulDiv10000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv10000Quiz without throwing', () => {
    const { container } = render(<MulDiv10000Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(MUL_DIV_10000_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_DIV_10000_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MUL_DIV_10000_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('renders MulDiv10000Matcher without throwing', () => {
    const { container } = render(<MulDiv10000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv10000Sorter without throwing', () => {
    const { container } = render(<MulDiv10000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MultiplyShiftSvg, DivideShiftSvg, PiggyBanksSvg, CoinArraySvg, ProductPyramidSvg, MushroomBasketsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
