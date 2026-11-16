import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { OpenSentencesTheory } from '@/components/math/grade-4/szamolas-10000-ig/nyitott-mondatok/OpenSentencesTheory';
import { OpenSentencesQuiz } from '@/components/math/grade-4/szamolas-10000-ig/nyitott-mondatok/OpenSentencesQuiz';
import { OpenSentencesMatcher } from '@/components/math/grade-4/szamolas-10000-ig/nyitott-mondatok/OpenSentencesMatcher';
import { OpenSentencesSorter } from '@/components/math/grade-4/szamolas-10000-ig/nyitott-mondatok/OpenSentencesSorter';
import {
  OpenSentenceCardsSvg,
  BalanceScaleSvg,
  SameSymbolsSvg,
  SwimBarSvg,
  SolutionsNumberLineSvg,
  ThinkNumberArrowsSvg
} from '@/components/math/grade-4/szamolas-10000-ig/nyitott-mondatok/OpenSentencesFigures';

describe('Grade 4 Topic I - 5. Nyitott mondatok - Components', () => {
  it('renders OpenSentencesTheory without throwing', () => {
    const { container } = render(<OpenSentencesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders OpenSentencesQuiz without throwing', () => {
    const { container } = render(<OpenSentencesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders OpenSentencesMatcher without throwing', () => {
    const { container } = render(<OpenSentencesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders OpenSentencesSorter without throwing', () => {
    const { container } = render(<OpenSentencesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OpenSentenceCardsSvg, BalanceScaleSvg, SameSymbolsSvg, SwimBarSvg, SolutionsNumberLineSvg, ThinkNumberArrowsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
