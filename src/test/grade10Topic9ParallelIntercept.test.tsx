import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ParallelInterceptTheory } from '@/components/math/grade-10/hasonlosag/parhuzamos-szelok-tetele/ParallelInterceptTheory';
import { ParallelInterceptQuiz } from '@/components/math/grade-10/hasonlosag/parhuzamos-szelok-tetele/ParallelInterceptQuiz';
import { ParallelInterceptMatcher } from '@/components/math/grade-10/hasonlosag/parhuzamos-szelok-tetele/ParallelInterceptMatcher';
import { ParallelInterceptSorter } from '@/components/math/grade-10/hasonlosag/parhuzamos-szelok-tetele/ParallelInterceptSorter';
import {
  ParallelInterceptTheoremSvg,
  ParallelChordsTheoremSvg,
  SegmentPartitionSvg,
  RectangleFourPartsSvg,
  FourthProportionalSvg
} from '@/components/math/grade-10/hasonlosag/parhuzamos-szelok-tetele/ParallelInterceptFigures';

describe('Grade 10 Topic IX - 7. Ráadás – Párhuzamos szelők tétele - Components', () => {
  it('renders ParallelInterceptTheory without throwing', () => {
    const { container } = render(<ParallelInterceptTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ParallelInterceptQuiz without throwing', () => {
    const { container } = render(<ParallelInterceptQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ParallelInterceptMatcher without throwing', () => {
    const { container } = render(<ParallelInterceptMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ParallelInterceptSorter without throwing', () => {
    const { container } = render(<ParallelInterceptSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<ParallelInterceptTheoremSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ParallelChordsTheoremSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<SegmentPartitionSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<RectangleFourPartsSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<FourthProportionalSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

