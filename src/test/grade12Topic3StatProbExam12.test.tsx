import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatProbExam12Theory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbExam12Theory';
import { StatProbExam12Quiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbExam12Quiz';
import { StatProbExam12Matcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbExam12Matcher';
import { StatProbExam12Sorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbExam12Sorter';
import {
  StatProbExam12ChapterMapSvg,
  StatProbExam12BoxQuartersSvg,
  StatProbExam12StockCompareSvg,
  StatProbExam12DiceTableSvg,
  StatProbExam12WheelSvg,
  StatProbExam12GradesPieSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/gyakorlas-tudasproba/StatProbExam12Figures';

describe('Grade 12 Topic III - 11. Gyakorlás, tudáspróba - Components', () => {
  it('renders StatProbExam12Theory without throwing', () => {
    const { container } = render(<StatProbExam12Theory />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbExam12Quiz without throwing', () => {
    const { container } = render(<StatProbExam12Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbExam12Matcher without throwing', () => {
    const { container } = render(<StatProbExam12Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatProbExam12Sorter without throwing', () => {
    const { container } = render(<StatProbExam12Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      StatProbExam12ChapterMapSvg,
      StatProbExam12BoxQuartersSvg,
      StatProbExam12StockCompareSvg,
      StatProbExam12DiceTableSvg,
      StatProbExam12WheelSvg,
      StatProbExam12GradesPieSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
