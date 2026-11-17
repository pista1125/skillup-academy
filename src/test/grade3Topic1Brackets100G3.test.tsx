import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Brackets100G3Theory } from '@/components/math/grade-3/szamolas-100-ig/a-zarojel-hasznalata/Brackets100G3Theory';
import { Brackets100G3Quiz, BRACKETS_100_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/a-zarojel-hasznalata/Brackets100G3Quiz';
import { Brackets100G3Matcher } from '@/components/math/grade-3/szamolas-100-ig/a-zarojel-hasznalata/Brackets100G3Matcher';
import { Brackets100G3Sorter } from '@/components/math/grade-3/szamolas-100-ig/a-zarojel-hasznalata/Brackets100G3Sorter';
import {
  NutsShareSvg,
  PlatesSvg,
  TwoWaysSvg,
  BracketCompareSvg,
  MinusBracketSvg
} from '@/components/math/grade-3/szamolas-100-ig/a-zarojel-hasznalata/Brackets100G3Figures';

describe('Grade 3 Topic I - 7. A zárójel használata - Components', () => {
  it('renders Brackets100G3Theory without throwing', () => {
    const { container } = render(<Brackets100G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Brackets100G3Quiz without throwing', () => {
    const { container } = render(<Brackets100G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(BRACKETS_100_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(BRACKETS_100_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    BRACKETS_100_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(BRACKETS_100_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders Brackets100G3Matcher without throwing', () => {
    const { container } = render(<Brackets100G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Brackets100G3Sorter without throwing', () => {
    const { container } = render(<Brackets100G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NutsShareSvg, PlatesSvg, TwoWaysSvg, BracketCompareSvg, MinusBracketSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
