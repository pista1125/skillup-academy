import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Rounding200G3Theory } from '@/components/math/grade-3/szamolas-200-ig/szamszomszedok-kerekites/Rounding200G3Theory';
import { Rounding200G3Quiz, ROUNDING_200_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-200-ig/szamszomszedok-kerekites/Rounding200G3Quiz';
import { Rounding200G3Matcher, ROUNDING_200_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/szamszomszedok-kerekites/Rounding200G3Matcher';
import { Rounding200G3Sorter, ROUNDING_200_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/szamszomszedok-kerekites/Rounding200G3Sorter';
import {
  NeighboursTrainSvg,
  NeighboursLineSvg,
  SunflowersSvg,
  RoundingRuleSvg,
  ApproxSignSvg,
  PriceTagsSvg
} from '@/components/math/grade-3/szamolas-200-ig/szamszomszedok-kerekites/Rounding200G3Figures';

describe('Grade 3 Topic III - 3. Számszomszédok, kerekítés - Components', () => {
  it('renders Rounding200G3Theory without throwing', () => {
    const { container } = render(<Rounding200G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Rounding200G3Quiz without throwing', () => {
    const { container } = render(<Rounding200G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ROUNDING_200_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROUNDING_200_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROUNDING_200_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = ROUNDING_200_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = ROUNDING_200_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders Rounding200G3Matcher without throwing', () => {
    const { container } = render(<Rounding200G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Rounding200G3Sorter without throwing', () => {
    const { container } = render(<Rounding200G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NeighboursTrainSvg, NeighboursLineSvg, SunflowersSvg, RoundingRuleSvg, ApproxSignSvg, PriceTagsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
