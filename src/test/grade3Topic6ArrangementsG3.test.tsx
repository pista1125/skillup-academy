import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ArrangementsG3Theory } from '@/components/math/grade-3/valogatasok-csoportositasok/sorba-rendezes-lehetosegek/ArrangementsG3Theory';
import { ArrangementsG3Quiz, ARRANGEMENTS_G3_QUESTIONS } from '@/components/math/grade-3/valogatasok-csoportositasok/sorba-rendezes-lehetosegek/ArrangementsG3Quiz';
import { ArrangementsG3Matcher, ARRANGEMENTS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/sorba-rendezes-lehetosegek/ArrangementsG3Matcher';
import { ArrangementsG3Sorter, ARRANGEMENTS_G3_SORTER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/sorba-rendezes-lehetosegek/ArrangementsG3Sorter';
import {
  OrderByHeightSvg,
  ArrowOrderSvg,
  ThreeOrdersSvg,
  OrderTreeSvg,
  DigitCardsSvg,
  OutfitsSvg,
  StatementsSvg
} from '@/components/math/grade-3/valogatasok-csoportositasok/sorba-rendezes-lehetosegek/ArrangementsG3Figures';

describe('Grade 3 Topic VI - 3. Sorba rendezés és lehetőségek - Components', () => {
  it('renders ArrangementsG3Theory without throwing', () => {
    const { container } = render(<ArrangementsG3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<ArrangementsG3Theory />);
    expect(getAllByText(/VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK/).length).toBeGreaterThan(0);
  });

  it('renders ArrangementsG3Quiz without throwing', () => {
    const { container } = render(<ArrangementsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(ARRANGEMENTS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ARRANGEMENTS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ARRANGEMENTS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(ARRANGEMENTS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = ARRANGEMENTS_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 3 categories x 9 items, at least 4 figures per category', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = ARRANGEMENTS_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      cfg.categories.forEach((c) => {
        const items = cfg.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('renders ArrangementsG3Matcher without throwing', () => {
    const { container } = render(<ArrangementsG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders ArrangementsG3Sorter without throwing', () => {
    const { container } = render(<ArrangementsG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OrderByHeightSvg, ArrowOrderSvg, ThreeOrdersSvg, OrderTreeSvg, DigitCardsSvg, OutfitsSvg, StatementsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
