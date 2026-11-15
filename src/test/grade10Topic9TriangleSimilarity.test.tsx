import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TriangleSimilarityTheory } from '@/components/math/grade-10/hasonlosag/haromszogek-hasonlosaga/TriangleSimilarityTheory';
import { TriangleSimilarityQuiz } from '@/components/math/grade-10/hasonlosag/haromszogek-hasonlosaga/TriangleSimilarityQuiz';
import { TriangleSimilarityMatcher } from '@/components/math/grade-10/hasonlosag/haromszogek-hasonlosaga/TriangleSimilarityMatcher';
import { TriangleSimilaritySorter } from '@/components/math/grade-10/hasonlosag/haromszogek-hasonlosaga/TriangleSimilaritySorter';
import {
  FourSimilarityCasesSvg,
  ThreeSailorsSvg,
  HourglassTrianglesSvg,
  RectangleQuarterPointSvg,
  TrapezoidRightTrianglesSvg,
  SkyscraperModelVibrationSvg
} from '@/components/math/grade-10/hasonlosag/haromszogek-hasonlosaga/TriangleSimilarityFigures';

describe('Grade 10 Topic IX - 8. Háromszögek hasonlósága - Components', () => {
  it('renders TriangleSimilarityTheory without throwing', () => {
    const { container } = render(<TriangleSimilarityTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TriangleSimilarityQuiz without throwing', () => {
    const { container } = render(<TriangleSimilarityQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TriangleSimilarityMatcher without throwing', () => {
    const { container } = render(<TriangleSimilarityMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TriangleSimilaritySorter without throwing', () => {
    const { container } = render(<TriangleSimilaritySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<FourSimilarityCasesSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ThreeSailorsSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<HourglassTrianglesSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<RectangleQuarterPointSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<TrapezoidRightTrianglesSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();

    const { container: c6 } = render(<SkyscraperModelVibrationSvg />);
    expect(c6.querySelector('svg')).toBeTruthy();
  });
});

