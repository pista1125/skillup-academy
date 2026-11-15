import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatProbPracticeExamTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbPracticeExamTheory';
import { StatProbPracticeExamQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbPracticeExamQuiz';
import { StatProbPracticeExamMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbPracticeExamMatcher';
import { StatProbPracticeExamSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbPracticeExamSorter';
import {
  StatProbExamChapterMapSvg,
  StatProbExamGradesPieSvg,
  StatProbExamMassBoxPlotSvg,
  StatProbExamFrequencyBoxPlotSvg,
  StatProbExamVennSvg,
  StatProbExamStockSvg,
  StatProbExamSpecialDieSvg,
  STAT_PROB_EXAM_MASSES,
  statProbExamStats
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbPracticeExamFigures';

describe('Grade 11 Topic V - 16. Gyakorlás, tudáspróba - Components', () => {
  it('renders StatProbPracticeExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatProbPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbPracticeExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatProbPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbPracticeExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatProbPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbPracticeExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatProbPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      StatProbExamChapterMapSvg,
      StatProbExamGradesPieSvg,
      StatProbExamMassBoxPlotSvg,
      StatProbExamFrequencyBoxPlotSvg,
      StatProbExamVennSvg,
      StatProbExamStockSvg,
      StatProbExamSpecialDieSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes the textbook statistics with the textbook quartile rule', () => {
    const s = statProbExamStats(STAT_PROB_EXAM_MASSES);
    expect(s.n).toBe(19);
    expect(s.median).toBe(36);
    expect(s.q1).toBe(35);
    expect(s.q3).toBe(37);
    expect(s.modes).toEqual([37]);
    const t = statProbExamStats([14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 19, 20]);
    expect(t.q1).toBe(15.5);
    expect(t.median).toBe(17);
    expect(t.q3).toBe(18);
  });
});
