import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PowersReviewTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewTheory';
import { PowersReviewQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewQuiz';
import { PowersReviewMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewMatcher';
import { PowersReviewSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewSorter';
import {
  PowersReviewDefinitionSvg,
  PowersReviewLadderSvg,
  PowersReviewIdentitiesSvg,
  PowersReviewMagicSquareSvg,
  PowersReviewOrderingSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/hatvanyozas-ismetles/PowersReviewFigures';

describe('Grade 11 Topic III - 26. Hatványozás – ismétlés - Components', () => {
  it('renders PowersReviewTheory without throwing', () => {
    const { container } = render(<PowersReviewTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PowersReviewQuiz without throwing', () => {
    const { container } = render(<PowersReviewQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PowersReviewMatcher without throwing', () => {
    const { container } = render(<PowersReviewMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PowersReviewSorter without throwing', () => {
    const { container } = render(<PowersReviewSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PowersReviewDefinitionSvg, PowersReviewLadderSvg, PowersReviewIdentitiesSvg, PowersReviewMagicSquareSvg, PowersReviewOrderingSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
