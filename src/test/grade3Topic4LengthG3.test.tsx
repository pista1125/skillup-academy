import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LengthG3Theory } from '@/components/math/grade-3/meresek/a-hosszusag-merese/LengthG3Theory';
import { LengthG3Quiz, LENGTH_G3_QUESTIONS } from '@/components/math/grade-3/meresek/a-hosszusag-merese/LengthG3Quiz';
import { LengthG3Matcher } from '@/components/math/grade-3/meresek/a-hosszusag-merese/LengthG3Matcher';
import { LengthG3Sorter } from '@/components/math/grade-3/meresek/a-hosszusag-merese/LengthG3Sorter';
import {
  LengthUnitsSvg,
  RulerMmSvg,
  RulerStartSvg,
  WhichUnitSvg,
  UnitStairsSvg,
  GridWalkSvg,
  BookTowerSvg
} from '@/components/math/grade-3/meresek/a-hosszusag-merese/LengthG3Figures';

describe('Grade 3 Topic IV - 4. A hosszúság mérése - Components', () => {
  it('renders LengthG3Theory without throwing', () => {
    const { container } = render(<LengthG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders LengthG3Quiz without throwing', () => {
    const { container } = render(<LengthG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(LENGTH_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(LENGTH_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    LENGTH_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('renders LengthG3Matcher without throwing', () => {
    const { container } = render(<LengthG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders LengthG3Sorter without throwing', () => {
    const { container } = render(<LengthG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LengthUnitsSvg, RulerMmSvg, RulerStartSvg, WhichUnitSvg, UnitStairsSvg, GridWalkSvg, BookTowerSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
