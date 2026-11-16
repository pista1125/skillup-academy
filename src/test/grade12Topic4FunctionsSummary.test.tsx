import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FunctionsSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/fuggvenyek/FunctionsSummaryTheory';
import { FunctionsSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/fuggvenyek/FunctionsSummaryQuiz';
import { FunctionsSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/fuggvenyek/FunctionsSummaryMatcher';
import { FunctionsSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/fuggvenyek/FunctionsSummarySorter';
import {
  MappingSvg,
  BasicFunctionsSvg,
  TransformationsSvg,
  LinearExampleSvg,
  ShiftExampleSvg,
  ReciprocalExampleSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/fuggvenyek/FunctionsSummaryFigures';

describe("Grade 12 Topic IV - 5. Függvények - Components", () => {
  it('renders FunctionsSummaryTheory without throwing', () => {
    const { container } = render(<FunctionsSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FunctionsSummaryQuiz without throwing', () => {
    const { container } = render(<FunctionsSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FunctionsSummaryMatcher without throwing', () => {
    const { container } = render(<FunctionsSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FunctionsSummarySorter without throwing', () => {
    const { container } = render(<FunctionsSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MappingSvg, BasicFunctionsSvg, TransformationsSvg, LinearExampleSvg, ShiftExampleSvg, ReciprocalExampleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
