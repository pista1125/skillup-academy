import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TimeG2Theory } from '@/components/math/grade-2/meresek/ido-meres/TimeG2Theory';
import { TimeG2Quiz, TIME_G2_QUESTIONS } from '@/components/math/grade-2/meresek/ido-meres/TimeG2Quiz';
import { TimeG2Matcher, TIME_G2_MATCHER_LEVELS } from '@/components/math/grade-2/meresek/ido-meres/TimeG2Matcher';
import { TimeG2Sorter, TIME_G2_SORTER_LEVELS } from '@/components/math/grade-2/meresek/ido-meres/TimeG2Sorter';
import {
  DayPartsSvg,
  Clock24Svg,
  HandsSvg,
  MinuteSectorsSvg,
  WeekSvg,
  YearSvg,
} from '@/components/math/grade-2/meresek/ido-meres/TimeG2Figures';

describe('Grade 2 Topic VIII - 4. Az idő mérése - Components', () => {
  it('renders TimeG2Theory without throwing', () => {
    const { container } = render(<TimeG2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders TimeG2Quiz without throwing', () => {
    const { container } = render(<TimeG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(TIME_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(TIME_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    TIME_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(TIME_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(TIME_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders TimeG2Matcher without throwing', () => {
    const { container } = render(<TimeG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders TimeG2Sorter without throwing', () => {
    const { container } = render(<TimeG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      DayPartsSvg,
      Clock24Svg,
      HandsSvg,
      MinuteSectorsSvg,
      WeekSvg,
  YearSvg,
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = TIME_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = TIME_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
