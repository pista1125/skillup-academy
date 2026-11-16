import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ArithmeticSequenceTheory } from '@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceTheory';
import { ArithmeticSequenceQuiz } from '@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceQuiz';
import { ArithmeticSequenceMatcher } from '@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceMatcher';
import { ArithmeticSequenceSorter } from '@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceSorter';
import {
  GrainTrendSvg,
  ArithmeticChainSvg,
  PiggyBankSvg,
  HexRingsSvg,
  TwoTermsSvg
} from '@/components/math/grade-12/sorozatok/szamtani-sorozatok/ArithmeticSequenceFigures';

describe("Grade 12 Topic II - 3. Számtani sorozatok - Components", () => {
  it('renders ArithmeticSequenceTheory without throwing', () => {
    const { container } = render(<ArithmeticSequenceTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSequenceQuiz without throwing', () => {
    const { container } = render(<ArithmeticSequenceQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSequenceMatcher without throwing', () => {
    const { container } = render(<ArithmeticSequenceMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ArithmeticSequenceSorter without throwing', () => {
    const { container } = render(<ArithmeticSequenceSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [GrainTrendSvg, ArithmeticChainSvg, PiggyBankSvg, HexRingsSvg, TwoTermsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
