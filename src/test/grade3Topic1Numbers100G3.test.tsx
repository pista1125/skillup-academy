import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Numbers100G3Theory } from '@/components/math/grade-3/szamolas-100-ig/szamok-100-ig/Numbers100G3Theory';
import { Numbers100G3Quiz, NUMBERS_100_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/szamok-100-ig/Numbers100G3Quiz';
import { Numbers100G3Matcher, NUMBERS_100_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-100-ig/szamok-100-ig/Numbers100G3Matcher';
import { Numbers100G3Sorter, NUMBERS_100_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-100-ig/szamok-100-ig/Numbers100G3Sorter';
import {
  TensOnesBlocksSvg,
  HundredBoardSvg,
  PlaceValueTableSvg,
  NeighboursNumberLineSvg,
  PurseMoneySvg,
  EvenOddSvg
} from '@/components/math/grade-3/szamolas-100-ig/szamok-100-ig/Numbers100G3Figures';

describe('Grade 3 Topic I - 1. Számok 100-ig - Components', () => {
  it('renders Numbers100G3Theory without throwing', () => {
    const { container } = render(<Numbers100G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers100G3Quiz without throwing', () => {
    const { container } = render(<Numbers100G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(NUMBERS_100_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NUMBERS_100_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    NUMBERS_100_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(NUMBERS_100_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders Numbers100G3Matcher without throwing', () => {
    const { container } = render(<Numbers100G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers100G3Sorter without throwing', () => {
    const { container } = render(<Numbers100G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TensOnesBlocksSvg, HundredBoardSvg, PlaceValueTableSvg, NeighboursNumberLineSvg, PurseMoneySvg, EvenOddSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and ~40 % of sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = NUMBERS_100_G3_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      const items = NUMBERS_100_G3_SORTER_LEVELS[l].items ?? [];
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
