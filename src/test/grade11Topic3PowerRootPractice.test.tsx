import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PowerRootPracticeTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeTheory';
import { PowerRootPracticeQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeQuiz';
import { PowerRootPracticeMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeMatcher';
import { PowerRootPracticeSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeSorter';
import {
  ChapterMapSvg,
  PracticeNumberLineSvg,
  PowersOfTwoSvg,
  ExponentSubstitutionSvg,
  CompareZoomSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-hatvany-gyok/PowerRootPracticeFigures';

describe('Grade 11 Topic III - 5. Gyakorlás (hatvány, gyök) - Components', () => {
  it('renders PowerRootPracticeTheory without throwing', () => {
    const { container } = render(<PowerRootPracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PowerRootPracticeQuiz without throwing', () => {
    const { container } = render(<PowerRootPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PowerRootPracticeMatcher without throwing', () => {
    const { container } = render(<PowerRootPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PowerRootPracticeSorter without throwing', () => {
    const { container } = render(<PowerRootPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, PracticeNumberLineSvg, PowersOfTwoSvg, ExponentSubstitutionSvg, CompareZoomSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
