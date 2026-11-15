import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CombinatoricsPracticeExamTheory } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamTheory';
import { CombinatoricsPracticeExamQuiz } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamQuiz';
import { CombinatoricsPracticeExamMatcher } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamMatcher';
import { CombinatoricsPracticeExamSorter } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamSorter';
import {
  LicensePlatesSvg,
  BusTicketSvg,
  AcquaintanceGraphSvg,
  HandshakeGraphSvg,
  PhoneKeypadSvg,
  CountingModelTreeSvg
} from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-tudasproba/CombinatoricsPracticeExamFigures';

describe('Grade 11 Topic II - 25. Gyakorlás, tudáspróba - Components', () => {
  it('renders CombinatoricsPracticeExamTheory without throwing', () => {
    const { container } = render(<CombinatoricsPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPracticeExamQuiz without throwing', () => {
    const { container } = render(<CombinatoricsPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPracticeExamMatcher without throwing', () => {
    const { container } = render(<CombinatoricsPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPracticeExamSorter without throwing', () => {
    const { container } = render(<CombinatoricsPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LicensePlatesSvg, BusTicketSvg, AcquaintanceGraphSvg, HandshakeGraphSvg, PhoneKeypadSvg, CountingModelTreeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
