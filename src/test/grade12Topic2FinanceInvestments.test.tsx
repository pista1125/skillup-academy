import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FinanceInvestmentsTheory } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsTheory';
import { FinanceInvestmentsQuiz } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsQuiz';
import { FinanceInvestmentsMatcher } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsMatcher';
import { FinanceInvestmentsSorter } from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsSorter';
import {
  SimpleVsCompoundSvg,
  QuarterlyCompoundingSvg,
  SavingsTimelineSvg,
  CarDepreciationSvg,
  TwoPhaseSavingsSvg
} from '@/components/math/grade-12/sorozatok/penzugyi-feladatok-1-tokebefektetesek/FinanceInvestmentsFigures';

describe('Grade 12 Topic II - 8. Pénzügyi feladatok I. – tőkebefektetések - Components', () => {
  it('renders FinanceInvestmentsTheory without throwing', () => {
    const { container } = render(<FinanceInvestmentsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders FinanceInvestmentsQuiz without throwing', () => {
    const { container } = render(<FinanceInvestmentsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders FinanceInvestmentsMatcher without throwing', () => {
    const { container } = render(<FinanceInvestmentsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders FinanceInvestmentsSorter without throwing', () => {
    const { container } = render(<FinanceInvestmentsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SimpleVsCompoundSvg, QuarterlyCompoundingSvg, SavingsTimelineSvg, CarDepreciationSvg, TwoPhaseSavingsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
