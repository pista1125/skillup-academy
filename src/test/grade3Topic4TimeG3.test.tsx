import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TimeG3Theory } from '@/components/math/grade-3/meresek/az-ido-merese/TimeG3Theory';
import { TimeG3Quiz, TIME_G3_QUESTIONS } from '@/components/math/grade-3/meresek/az-ido-merese/TimeG3Quiz';
import { TimeG3Matcher, TIME_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/az-ido-merese/TimeG3Matcher';
import { TimeG3Sorter, TIME_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/az-ido-merese/TimeG3Sorter';
import {
  TimeUnitsStairsSvg,
  ClockPartsSvg,
  QuarterClocksSvg,
  MorningEveningSvg,
  ElapsedJumpsSvg,
  StopwatchCalendarSvg
} from '@/components/math/grade-3/meresek/az-ido-merese/TimeG3Figures';

describe('Grade 3 Topic IV - 9. Az idő mérése - Components', () => {
  it('renders TimeG3Theory without throwing', () => {
    const { container } = render(<TimeG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders TimeG3Quiz without throwing', () => {
    const { container } = render(<TimeG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(TIME_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(TIME_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    TIME_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = TIME_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = TIME_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders TimeG3Matcher without throwing', () => {
    const { container } = render(<TimeG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders TimeG3Sorter without throwing', () => {
    const { container } = render(<TimeG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TimeUnitsStairsSvg, ClockPartsSvg, QuarterClocksSvg, MorningEveningSvg, ElapsedJumpsSvg, StopwatchCalendarSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
