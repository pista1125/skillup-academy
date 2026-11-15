import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FinancialCalcTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcTheory';
import { FinancialCalcQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcQuiz';
import { FinancialCalcMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcMatcher';
import { FinancialCalcSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcSorter';
import {
  FinancialCalcCompoundSvg,
  FinancialCalcDepreciationSvg,
  FinancialCalcDoublingSvg,
  FinancialCalcFormulaSvg,
  FinancialCalcSimpleVsCompoundSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/penzugyi-szamitasok/FinancialCalcFigures';

describe('Grade 11 Topic III - 6. Pénzügyi számítások - Components', () => {
  it('renders FinancialCalcTheory without throwing', () => {
    const { container } = render(<FinancialCalcTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FinancialCalcQuiz without throwing', () => {
    const { container } = render(<FinancialCalcQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FinancialCalcMatcher without throwing', () => {
    const { container } = render(<FinancialCalcMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FinancialCalcSorter without throwing', () => {
    const { container } = render(<FinancialCalcSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      FinancialCalcCompoundSvg,
      FinancialCalcDepreciationSvg,
      FinancialCalcDoublingSvg,
      FinancialCalcFormulaSvg,
      FinancialCalcSimpleVsCompoundSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
