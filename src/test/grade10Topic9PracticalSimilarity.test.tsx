import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PracticalSimilarityTheory } from '@/components/math/grade-10/hasonlosag/alkalmazzuk-a-hasonlosagot/PracticalSimilarityTheory';
import { PracticalSimilarityQuiz } from '@/components/math/grade-10/hasonlosag/alkalmazzuk-a-hasonlosagot/PracticalSimilarityQuiz';
import { PracticalSimilarityMatcher } from '@/components/math/grade-10/hasonlosag/alkalmazzuk-a-hasonlosagot/PracticalSimilarityMatcher';
import { PracticalSimilaritySorter } from '@/components/math/grade-10/hasonlosag/alkalmazzuk-a-hasonlosagot/PracticalSimilaritySorter';
import {
  ShadowMeasurementSvg,
  MirrorHeightSvg,
  ThalesShipDistanceSvg,
  MarginSimilarityCounterSvg,
  BiometricScalingSvg
} from '@/components/math/grade-10/hasonlosag/alkalmazzuk-a-hasonlosagot/PracticalSimilarityFigures';

describe('Grade 10 Topic IX - 6. Alkalmazzuk a hasonlóságot! - Components', () => {
  it('renders PracticalSimilarityTheory without throwing', () => {
    const { container } = render(<PracticalSimilarityTheory />);
    expect(container).toBeTruthy();
  });

  it('renders PracticalSimilarityQuiz without throwing', () => {
    const { container } = render(<PracticalSimilarityQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders PracticalSimilarityMatcher without throwing', () => {
    const { container } = render(<PracticalSimilarityMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders PracticalSimilaritySorter without throwing', () => {
    const { container } = render(<PracticalSimilaritySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<ShadowMeasurementSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<MirrorHeightSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<ThalesShipDistanceSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<MarginSimilarityCounterSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<BiometricScalingSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

