import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AddSub10000Theory } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-10000-ig/AddSub10000Theory';
import { AddSub10000Quiz, ADD_SUB_10000_QUESTIONS } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-10000-ig/AddSub10000Quiz';
import { AddSub10000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-10000-ig/AddSub10000Matcher';
import { AddSub10000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-10000-ig/AddSub10000Sorter';
import {
  HundredsCoinsSvg,
  ThreeWaysSvg,
  AddJumpsSvg,
  SubJumpsSvg,
  GuestsChartSvg,
  SumPyramidSvg
} from '@/components/math/grade-4/szamolas-10000-ig/osszeadas-kivonas-10000-ig/AddSub10000Figures';

describe("Grade 4 Topic I - 11. Összeadás és kivonás 10 000-ig - Components", () => {
  it('renders AddSub10000Theory without throwing', () => {
    const { container } = render(<AddSub10000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub10000Quiz without throwing', () => {
    const { container } = render(<AddSub10000Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ADD_SUB_10000_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ADD_SUB_10000_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ADD_SUB_10000_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('renders AddSub10000Matcher without throwing', () => {
    const { container } = render(<AddSub10000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub10000Sorter without throwing', () => {
    const { container } = render(<AddSub10000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [HundredsCoinsSvg, ThreeWaysSvg, AddJumpsSvg, SubJumpsSvg, GuestsChartSvg, SumPyramidSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
