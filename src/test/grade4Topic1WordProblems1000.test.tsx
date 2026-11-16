import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WordProblems1000Theory } from '@/components/math/grade-4/szamolas-10000-ig/szoveges-feladatok/WordProblems1000Theory';
import { WordProblems1000Quiz } from '@/components/math/grade-4/szamolas-10000-ig/szoveges-feladatok/WordProblems1000Quiz';
import { WordProblems1000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/szoveges-feladatok/WordProblems1000Matcher';
import { WordProblems1000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/szoveges-feladatok/WordProblems1000Sorter';
import {
  SolvingStepsSvg,
  RunnersBarSvg,
  PairsLineSvg,
  ColorRodsSvg,
  MeetingPathSvg,
  CoinsShareSvg
} from '@/components/math/grade-4/szamolas-10000-ig/szoveges-feladatok/WordProblems1000Figures';

describe('Grade 4 Topic I - 6. Szöveges feladatok - Components', () => {
  it('renders WordProblems1000Theory without throwing', () => {
    const { container } = render(<WordProblems1000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems1000Quiz without throwing', () => {
    const { container } = render(<WordProblems1000Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems1000Matcher without throwing', () => {
    const { container } = render(<WordProblems1000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WordProblems1000Sorter without throwing', () => {
    const { container } = render(<WordProblems1000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SolvingStepsSvg, RunnersBarSvg, PairsLineSvg, ColorRodsSvg, MeetingPathSvg, CoinsShareSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
