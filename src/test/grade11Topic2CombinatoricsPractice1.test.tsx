import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CombinatoricsPractice1Theory } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Theory';
import { CombinatoricsPractice1Quiz } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Quiz';
import { CombinatoricsPractice1Matcher } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Matcher';
import { CombinatoricsPractice1Sorter } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Sorter';
import {
  LotteryTicketSvg,
  LotteryHitsSvg,
  CountingCasesSvg,
  WordGridPathsSvg,
  CarsSeatingSvg
} from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-1/CombinatoricsPractice1Figures';

describe('Grade 11 Topic II - 20. Gyakorlás – kombinatorika - Components', () => {
  it('renders CombinatoricsPractice1Theory without throwing', () => {
    const { container } = render(<CombinatoricsPractice1Theory />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPractice1Quiz without throwing', () => {
    const { container } = render(<CombinatoricsPractice1Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPractice1Matcher without throwing', () => {
    const { container } = render(<CombinatoricsPractice1Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPractice1Sorter without throwing', () => {
    const { container } = render(<CombinatoricsPractice1Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LotteryTicketSvg, LotteryHitsSvg, CountingCasesSvg, WordGridPathsSvg, CarsSeatingSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
