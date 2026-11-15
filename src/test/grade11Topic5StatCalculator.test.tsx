import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatCalculatorTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/statisztikai-szamitasok-szamologep/StatCalculatorTheory';
import { StatCalculatorQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/statisztikai-szamitasok-szamologep/StatCalculatorQuiz';
import { StatCalculatorMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/statisztikai-szamitasok-szamologep/StatCalculatorMatcher';
import { StatCalculatorSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/statisztikai-szamitasok-szamologep/StatCalculatorSorter';
import {
  StatCalculatorMenuSvg,
  StatCalculatorDataScreenSvg,
  StatCalculatorResultsSvg,
  StatCalculatorBiasSvg,
  StatCalculatorFireSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/statisztikai-szamitasok-szamologep/StatCalculatorFigures';

describe('Grade 11 Topic V - 5. Ráadás – Statisztikai számítások számológéppel - Components', () => {
  it('renders StatCalculatorTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatCalculatorTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatCalculatorQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatCalculatorQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatCalculatorMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatCalculatorMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatCalculatorSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StatCalculatorSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', { timeout: 20000 }, () => {
    const figures = [StatCalculatorMenuSvg, StatCalculatorDataScreenSvg, StatCalculatorResultsSvg, StatCalculatorBiasSvg, StatCalculatorFireSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
