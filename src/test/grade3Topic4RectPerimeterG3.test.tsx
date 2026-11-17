import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RectPerimeterG3Theory } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-kerulete/RectPerimeterG3Theory';
import { RectPerimeterG3Quiz, RECT_PERIMETER_G3_QUESTIONS } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-kerulete/RectPerimeterG3Quiz';
import { RectPerimeterG3Matcher } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-kerulete/RectPerimeterG3Matcher';
import { RectPerimeterG3Sorter } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-kerulete/RectPerimeterG3Sorter';
import {
  RectOppositeSvg,
  RectUnfoldSvg,
  SquarePerimeterSvg,
  SamePerimeterSvg,
  PoolSvg
} from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-kerulete/RectPerimeterG3Figures';

describe('Grade 3 Topic IV - 6. A téglalap és a négyzet kerülete - Components', () => {
  it('renders RectPerimeterG3Theory without throwing', () => {
    const { container } = render(<RectPerimeterG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RectPerimeterG3Quiz without throwing', () => {
    const { container } = render(<RectPerimeterG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(RECT_PERIMETER_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(RECT_PERIMETER_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    RECT_PERIMETER_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('uses no letter formula for the perimeter', () => {
    RECT_PERIMETER_G3_QUESTIONS.forEach((q) => {
      expect(`${q.question} ${q.explanation}`).not.toMatch(/2\s*·\s*\(|K\s*=|\ba\s*\+\s*b\b/);
    });
  });

  it('renders RectPerimeterG3Matcher without throwing', () => {
    const { container } = render(<RectPerimeterG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RectPerimeterG3Sorter without throwing', () => {
    const { container } = render(<RectPerimeterG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RectOppositeSvg, RectUnfoldSvg, SquarePerimeterSvg, SamePerimeterSvg, PoolSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
