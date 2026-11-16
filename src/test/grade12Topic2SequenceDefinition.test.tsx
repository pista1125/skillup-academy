import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SequenceDefinitionTheory } from '@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionTheory';
import { SequenceDefinitionQuiz } from '@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionQuiz';
import { SequenceDefinitionMatcher } from '@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionMatcher';
import { SequenceDefinitionSorter } from '@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionSorter';
import {
  OddSumSquaresSvg,
  DefinitionModesSvg,
  Mod8ChainSvg,
  GuardScheduleSvg,
  PeriodicRecursionSvg
} from '@/components/math/grade-12/sorozatok/sorozatok-megadasa/SequenceDefinitionFigures';

describe("Grade 12 Topic II - 2. Sorozatok megadása - Components", () => {
  it('renders SequenceDefinitionTheory without throwing', () => {
    const { container } = render(<SequenceDefinitionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SequenceDefinitionQuiz without throwing', () => {
    const { container } = render(<SequenceDefinitionQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SequenceDefinitionMatcher without throwing', () => {
    const { container } = render(<SequenceDefinitionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SequenceDefinitionSorter without throwing', () => {
    const { container } = render(<SequenceDefinitionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OddSumSquaresSvg, DefinitionModesSvg, Mod8ChainSvg, GuardScheduleSvg, PeriodicRecursionSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
