import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Numbers200G3Theory } from '@/components/math/grade-3/szamolas-200-ig/szamok-200-ig/Numbers200G3Theory';
import { Numbers200G3Quiz, NUMBERS_200_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-200-ig/szamok-200-ig/Numbers200G3Quiz';
import { Numbers200G3Matcher } from '@/components/math/grade-3/szamolas-200-ig/szamok-200-ig/Numbers200G3Matcher';
import { Numbers200G3Sorter } from '@/components/math/grade-3/szamolas-200-ig/szamok-200-ig/Numbers200G3Sorter';
import {
  HundredsTensOnesSvg,
  SecondHundredBoardSvg,
  PlaceValue200Svg,
  Abacus200Svg,
  Money200Svg,
  NumberWordsSvg
} from '@/components/math/grade-3/szamolas-200-ig/szamok-200-ig/Numbers200G3Figures';

describe("Grade 3 Topic III - 1. Számok 200-ig - Components", () => {
  it('renders Numbers200G3Theory without throwing', () => {
    const { container } = render(<Numbers200G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers200G3Quiz without throwing', () => {
    const { container } = render(<Numbers200G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(NUMBERS_200_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NUMBERS_200_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    NUMBERS_200_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('renders Numbers200G3Matcher without throwing', () => {
    const { container } = render(<Numbers200G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers200G3Sorter without throwing', () => {
    const { container } = render(<Numbers200G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [HundredsTensOnesSvg, SecondHundredBoardSvg, PlaceValue200Svg, Abacus200Svg, Money200Svg, NumberWordsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
