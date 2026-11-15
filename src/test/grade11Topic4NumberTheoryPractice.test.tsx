import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumberTheoryPracticeTheory } from '@/components/math/grade-11/szamelmelet/gyakorlas-szamelmelet-1/NumberTheoryPracticeTheory';
import { NumberTheoryPracticeQuiz } from '@/components/math/grade-11/szamelmelet/gyakorlas-szamelmelet-1/NumberTheoryPracticeQuiz';
import { NumberTheoryPracticeMatcher } from '@/components/math/grade-11/szamelmelet/gyakorlas-szamelmelet-1/NumberTheoryPracticeMatcher';
import { NumberTheoryPracticeSorter } from '@/components/math/grade-11/szamelmelet/gyakorlas-szamelmelet-1/NumberTheoryPracticeSorter';
import {
  ChapterMapSvg,
  SaplingRowsSvg,
  DominoPrimeSvg,
  NineMultiplesSvg,
  SetsVennSvg
} from '@/components/math/grade-11/szamelmelet/gyakorlas-szamelmelet-1/NumberTheoryPracticeFigures';

describe('Grade 11 Topic IV - 50. Gyakorlás - Components', () => {
  it('renders NumberTheoryPracticeTheory without throwing', () => {
    const { container } = render(<NumberTheoryPracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NumberTheoryPracticeQuiz without throwing', () => {
    const { container } = render(<NumberTheoryPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NumberTheoryPracticeMatcher without throwing', () => {
    const { container } = render(<NumberTheoryPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumberTheoryPracticeSorter without throwing', () => {
    const { container } = render(<NumberTheoryPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, SaplingRowsSvg, DominoPrimeSvg, NineMultiplesSvg, SetsVennSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
