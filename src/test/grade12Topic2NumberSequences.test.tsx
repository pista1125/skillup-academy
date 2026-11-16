import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumberSequencesTheory } from '@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesTheory';
import { NumberSequencesQuiz } from '@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesQuiz';
import { NumberSequencesMatcher } from '@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesMatcher';
import { NumberSequencesSorter } from '@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesSorter';
import {
  StairsSvg,
  SequenceFunctionSvg,
  PointGraphSvg,
  JokeTreeSvg,
  RepeatingDecimalSvg
} from '@/components/math/grade-12/sorozatok/szamsorozatok/NumberSequencesFigures';

describe("Grade 12 Topic II - 1. Számsorozatok - Components", () => {
  it('renders NumberSequencesTheory without throwing', () => {
    const { container } = render(<NumberSequencesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NumberSequencesQuiz without throwing', () => {
    const { container } = render(<NumberSequencesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NumberSequencesMatcher without throwing', () => {
    const { container } = render(<NumberSequencesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumberSequencesSorter without throwing', () => {
    const { container } = render(<NumberSequencesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [StairsSvg, SequenceFunctionSvg, PointGraphSvg, JokeTreeSvg, RepeatingDecimalSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
