import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ReplacementComparisonTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszatevessel-vagy-anelkul/ReplacementComparisonTheory';
import { ReplacementComparisonQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszatevessel-vagy-anelkul/ReplacementComparisonQuiz';
import { ReplacementComparisonMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszatevessel-vagy-anelkul/ReplacementComparisonMatcher';
import { ReplacementComparisonSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszatevessel-vagy-anelkul/ReplacementComparisonSorter';
import {
  ReplacementComparisonQualitySvg,
  ReplacementComparisonModelsSvg,
  ReplacementComparisonBusSvg,
  ReplacementComparisonLeftHandedSvg,
  ReplacementComparisonVoucher250Svg,
  ReplacementComparisonVoucher2500Svg,
  ReplacementComparisonPotionSvg,
  rcBinomialP,
  rcHyperP
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/visszatevessel-vagy-anelkul/ReplacementComparisonFigures';

describe('Grade 11 Topic V - 15. Ráadás – Visszatevéssel vagy anélkül? - Components', () => {
  it('renders ReplacementComparisonTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ReplacementComparisonTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ReplacementComparisonQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ReplacementComparisonQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ReplacementComparisonMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ReplacementComparisonMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ReplacementComparisonSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ReplacementComparisonSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ReplacementComparisonQualitySvg,
      ReplacementComparisonModelsSvg,
      ReplacementComparisonBusSvg,
      ReplacementComparisonLeftHandedSvg,
      ReplacementComparisonVoucher250Svg,
      ReplacementComparisonVoucher2500Svg,
      ReplacementComparisonPotionSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes the textbook probabilities', () => {
    const withRep = [5, 6, 7].reduce((s, k) => s + rcBinomialP(15, k, 0.4), 0);
    const withoutRep = [5, 6, 7].reduce((s, k) => s + rcHyperP(50, 20, 15, k), 0);
    expect(withRep).toBeCloseTo(0.5696, 3);
    expect(withoutRep).toBeCloseTo(0.6549, 3);
    expect(rcHyperP(60, 12, 10, 0)).toBeCloseTo(0.0868, 3);
  });
});
