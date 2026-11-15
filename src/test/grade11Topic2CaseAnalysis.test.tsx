import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CaseAnalysisTheory } from '@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisTheory';
import { CaseAnalysisQuiz } from '@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisQuiz';
import { CaseAnalysisMatcher } from '@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisMatcher';
import { CaseAnalysisSorter } from '@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisSorter';
import {
  PrizeCasesSvg,
  RookBoardSvg,
  FlagStripesSvg,
  DiceTargetSvg,
  TigerEnclosuresSvg
} from '@/components/math/grade-11/kombinatorika-grafok/esetszetvalasztas/CaseAnalysisFigures';

describe('Grade 11 Topic II - 21. Esetszétválasztás - Components', () => {
  it('renders CaseAnalysisTheory without throwing', () => {
    const { container } = render(<CaseAnalysisTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CaseAnalysisQuiz without throwing', () => {
    const { container } = render(<CaseAnalysisQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CaseAnalysisMatcher without throwing', () => {
    const { container } = render(<CaseAnalysisMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CaseAnalysisSorter without throwing', () => {
    const { container } = render(<CaseAnalysisSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PrizeCasesSvg, RookBoardSvg, FlagStripesSvg, DiceTargetSvg, TigerEnclosuresSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
