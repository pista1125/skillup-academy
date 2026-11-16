import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Rounding10000Theory } from '@/components/math/grade-4/szamolas-10000-ig/szamszomszedok-kerekites/Rounding10000Theory';
import { Rounding10000Quiz, ROUNDING_10000_QUESTIONS } from '@/components/math/grade-4/szamolas-10000-ig/szamszomszedok-kerekites/Rounding10000Quiz';
import { Rounding10000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/szamszomszedok-kerekites/Rounding10000Matcher';
import { Rounding10000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/szamszomszedok-kerekites/Rounding10000Sorter';
import {
  NeighboursTableSvg,
  RoundingNumberLineSvg,
  MountainsSvg,
  MineCartsSvg,
  ZoomNeighboursSvg
} from '@/components/math/grade-4/szamolas-10000-ig/szamszomszedok-kerekites/Rounding10000Figures';

describe("Grade 4 Topic I - 10. Számszomszédok, kerekítés - Components", () => {
  it('renders Rounding10000Theory without throwing', () => {
    const { container } = render(<Rounding10000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Rounding10000Quiz without throwing', () => {
    const { container } = render(<Rounding10000Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ROUNDING_10000_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROUNDING_10000_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROUNDING_10000_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('renders Rounding10000Matcher without throwing', () => {
    const { container } = render(<Rounding10000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Rounding10000Sorter without throwing', () => {
    const { container } = render(<Rounding10000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NeighboursTableSvg, RoundingNumberLineSvg, MountainsSvg, MineCartsSvg, ZoomNeighboursSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
