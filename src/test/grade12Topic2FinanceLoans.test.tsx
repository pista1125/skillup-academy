import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FinanceLoansTheory } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansTheory';
import { FinanceLoansQuiz } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansQuiz';
import { FinanceLoansMatcher } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansMatcher';
import { FinanceLoansSorter } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansSorter';
import {
  LoanCycleSvg,
  AnnuityTableSvg,
  DebtStepsSvg,
  AmortizationBarsSvg,
  CurrencyRiskSvg
} from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-2-hitelek-es-kockazatok/FinanceLoansFigures';

describe('Grade 12 Topic II - 9. Pénzügyi feladatok II. – hitelek és kockázatok - Components', () => {
  it('renders FinanceLoansTheory without throwing', () => {
    const { container } = render(<FinanceLoansTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FinanceLoansQuiz without throwing', () => {
    const { container } = render(<FinanceLoansQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FinanceLoansMatcher without throwing', () => {
    const { container } = render(<FinanceLoansMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FinanceLoansSorter without throwing', () => {
    const { container } = render(<FinanceLoansSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LoanCycleSvg, AnnuityTableSvg, DebtStepsSvg, AmortizationBarsSvg, CurrencyRiskSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
