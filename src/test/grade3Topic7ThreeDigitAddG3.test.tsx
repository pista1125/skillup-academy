import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ThreeDigitAddG3Theory } from '@/components/math/grade-3/irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Theory';
import { ThreeDigitAddG3Quiz, THREE_DIGIT_ADD_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Quiz';
import { ThreeDigitAddG3Matcher, THREE_DIGIT_ADD_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Matcher';
import { ThreeDigitAddG3Sorter, THREE_DIGIT_ADD_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Sorter';
import { AddHundredsSvg, RoundTensSvg, PlaceValueAddSvg, FairStallSvg, CoinPurseSvg } from '@/components/math/grade-3/irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Figures';

describe('Grade 3 Topic VII - 1. Háromjegyű számok összeadása - Components', () => {
  it('renders ThreeDigitAddG3Theory without throwing', () => {
    const { container } = render(<ThreeDigitAddG3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<ThreeDigitAddG3Theory />);
    expect(getAllByText(/VII. ÍRÁSBELI ÖSSZEADÁS/).length).toBeGreaterThan(0);
  });

  it('renders ThreeDigitAddG3Quiz without throwing', () => {
    const { container } = render(<ThreeDigitAddG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(THREE_DIGIT_ADD_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(THREE_DIGIT_ADD_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(THREE_DIGIT_ADD_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    THREE_DIGIT_ADD_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = THREE_DIGIT_ADD_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = THREE_DIGIT_ADD_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders ThreeDigitAddG3Matcher without throwing', () => {
    const { container } = render(<ThreeDigitAddG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders ThreeDigitAddG3Sorter without throwing', () => {
    const { container } = render(<ThreeDigitAddG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [AddHundredsSvg, RoundTensSvg, PlaceValueAddSvg, FairStallSvg, CoinPurseSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
