import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatDataCollectionTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-adatgyujtes/StatDataCollectionTheory';
import { StatDataCollectionQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-adatgyujtes/StatDataCollectionQuiz';
import { StatDataCollectionMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-adatgyujtes/StatDataCollectionMatcher';
import { StatDataCollectionSorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-adatgyujtes/StatDataCollectionSorter';
import {
  LiteraryDigestSvg,
  StratifiedSampleSvg,
  CouponVennSvg,
  InsuranceTreeSvg,
  VisitorSharesSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/statisztikai-adatgyujtes/StatDataCollectionFigures';

describe('Grade 12 Topic III - 1. Statisztikai adatgyűjtés - Components', () => {
  it('renders StatDataCollectionTheory without throwing', () => {
    const { container } = render(<StatDataCollectionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatDataCollectionQuiz without throwing', () => {
    const { container } = render(<StatDataCollectionQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatDataCollectionMatcher without throwing', () => {
    const { container } = render(<StatDataCollectionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatDataCollectionSorter without throwing', () => {
    const { container } = render(<StatDataCollectionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LiteraryDigestSvg, StratifiedSampleSvg, CouponVennSvg, InsuranceTreeSvg, VisitorSharesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
