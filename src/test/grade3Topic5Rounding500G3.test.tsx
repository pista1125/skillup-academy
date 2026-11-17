import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Rounding500G3Theory } from '@/components/math/grade-3/szamolas-500-ig/szamszomszedok-kerekites/Rounding500G3Theory';
import { Rounding500G3Quiz, ROUNDING_500_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-500-ig/szamszomszedok-kerekites/Rounding500G3Quiz';
import { Rounding500G3Matcher, ROUNDING_500_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/szamszomszedok-kerekites/Rounding500G3Matcher';
import { Rounding500G3Sorter, ROUNDING_500_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/szamszomszedok-kerekites/Rounding500G3Sorter';
import {
  NeighboursLadderSvg,
  HundredLineSvg,
  TenRuleSvg,
  HundredRuleSvg,
  TwoWaysSvg,
  ExactOrNotSvg,
  ToyShopSvg
} from '@/components/math/grade-3/szamolas-500-ig/szamszomszedok-kerekites/Rounding500G3Figures';

describe('Grade 3 Topic V - 2. Számszomszédok, kerekítés - Components', () => {
  it('renders Rounding500G3Theory without throwing', () => {
    const { container } = render(<Rounding500G3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<Rounding500G3Theory />);
    expect(getAllByText(/V. SZÁMOLÁS 0-TÓL 500-IG/).length).toBeGreaterThan(0);
  });

  it('renders Rounding500G3Quiz without throwing', () => {
    const { container } = render(<Rounding500G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ROUNDING_500_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROUNDING_500_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROUNDING_500_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = ROUNDING_500_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = ROUNDING_500_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders Rounding500G3Matcher without throwing', () => {
    const { container } = render(<Rounding500G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Rounding500G3Sorter without throwing', () => {
    const { container } = render(<Rounding500G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NeighboursLadderSvg, HundredLineSvg, TenRuleSvg, HundredRuleSvg, TwoWaysSvg, ExactOrNotSvg, ToyShopSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
