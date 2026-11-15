import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { G11DivisibilityRulesTheory } from '@/components/math/grade-11/szamelmelet/oszthatosagi-szabalyok-maradekok/G11DivisibilityRulesTheory';
import { G11DivisibilityRulesQuiz } from '@/components/math/grade-11/szamelmelet/oszthatosagi-szabalyok-maradekok/G11DivisibilityRulesQuiz';
import { G11DivisibilityRulesMatcher } from '@/components/math/grade-11/szamelmelet/oszthatosagi-szabalyok-maradekok/G11DivisibilityRulesMatcher';
import { G11DivisibilityRulesSorter } from '@/components/math/grade-11/szamelmelet/oszthatosagi-szabalyok-maradekok/G11DivisibilityRulesSorter';
import {
  LastDigitsRulesSvg,
  ExcursionGroupsSvg,
  DigitSumSvg,
  DivisionRemainderSvg,
  RemainderClassesSvg,
  WeekdayCycleSvg
} from '@/components/math/grade-11/szamelmelet/oszthatosagi-szabalyok-maradekok/G11DivisibilityRulesFigures';

describe('Grade 11 Topic IV - 45. Oszthatósági szabályok, osztási maradékok - Components', () => {
  it('renders G11DivisibilityRulesTheory without throwing', () => {
    const { container } = render(<G11DivisibilityRulesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders G11DivisibilityRulesQuiz without throwing', () => {
    const { container } = render(<G11DivisibilityRulesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders G11DivisibilityRulesMatcher without throwing', () => {
    const { container } = render(<G11DivisibilityRulesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders G11DivisibilityRulesSorter without throwing', () => {
    const { container } = render(<G11DivisibilityRulesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LastDigitsRulesSvg, ExcursionGroupsSvg, DigitSumSvg, DivisionRemainderSvg, RemainderClassesSvg, WeekdayCycleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
