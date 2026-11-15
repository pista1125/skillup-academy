import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CombinatoricsPractice2Theory } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Theory';
import { CombinatoricsPractice2Quiz } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Quiz';
import { CombinatoricsPractice2Matcher } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Matcher';
import { CombinatoricsPractice2Sorter } from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Sorter';
import {
  PracticeMazeSvg,
  FlagColoringSvg,
  FountainColoringSvg,
  ExamRoomSvg,
  NineDigitComplementSvg
} from '@/components/math/grade-11/kombinatorika-grafok/gyakorlas-kombinatorika-2/CombinatoricsPractice2Figures';

describe('Grade 11 Topic II - 22. Gyakorlás (kombinatorika) - Components', () => {
  it('renders CombinatoricsPractice2Theory without throwing', () => {
    const { container } = render(<CombinatoricsPractice2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPractice2Quiz without throwing', () => {
    const { container } = render(<CombinatoricsPractice2Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPractice2Matcher without throwing', () => {
    const { container } = render(<CombinatoricsPractice2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsPractice2Sorter without throwing', () => {
    const { container } = render(<CombinatoricsPractice2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PracticeMazeSvg, FlagColoringSvg, FountainColoringSvg, ExamRoomSvg, NineDigitComplementSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
