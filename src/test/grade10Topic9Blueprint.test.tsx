import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { BlueprintTheory } from '@/components/math/grade-10/hasonlosag/mit-mutat-a-tervrajz/BlueprintTheory';
import { BlueprintQuiz } from '@/components/math/grade-10/hasonlosag/mit-mutat-a-tervrajz/BlueprintQuiz';
import { BlueprintMatcher } from '@/components/math/grade-10/hasonlosag/mit-mutat-a-tervrajz/BlueprintMatcher';
import { BlueprintSorter } from '@/components/math/grade-10/hasonlosag/mit-mutat-a-tervrajz/BlueprintSorter';
import {
  RoofTrussGyulaSvg,
  PoolGeometrySvg,
  ScaleBarMapSvg,
  EngineeringDimensioningSvg,
  ScaleReductionEnlargementSvg
} from '@/components/math/grade-10/hasonlosag/mit-mutat-a-tervrajz/BlueprintFigures';

describe('Grade 10 Topic IX - 5. Ráadás: Mit mutat a tervrajz? - Components', () => {
  it('renders BlueprintTheory without throwing', () => {
    const { container } = render(<BlueprintTheory />);
    expect(container).toBeTruthy();
  });

  it('renders BlueprintQuiz without throwing', () => {
    const { container } = render(<BlueprintQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders BlueprintMatcher without throwing', () => {
    const { container } = render(<BlueprintMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders BlueprintSorter without throwing', () => {
    const { container } = render(<BlueprintSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<RoofTrussGyulaSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<PoolGeometrySvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<ScaleBarMapSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<EngineeringDimensioningSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<ScaleReductionEnlargementSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

