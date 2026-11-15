import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MidlinesMediansTheory } from '@/components/math/grade-10/hasonlosag/haromszog-kozepvonalai-es-sulyvonalai/MidlinesMediansTheory';
import { MidlinesMediansQuiz } from '@/components/math/grade-10/hasonlosag/haromszog-kozepvonalai-es-sulyvonalai/MidlinesMediansQuiz';
import { MidlinesMediansMatcher } from '@/components/math/grade-10/hasonlosag/haromszog-kozepvonalai-es-sulyvonalai/MidlinesMediansMatcher';
import { MidlinesMediansSorter } from '@/components/math/grade-10/hasonlosag/haromszog-kozepvonalai-es-sulyvonalai/MidlinesMediansSorter';
import {
  MidlineTheoremSvg,
  FourMidlineTrianglesSvg,
  MediansCentroidRatioSvg,
  SixEqualAreaTrianglesSvg,
  RightTriangleMedianSvg
} from '@/components/math/grade-10/hasonlosag/haromszog-kozepvonalai-es-sulyvonalai/MidlinesMediansFigures';

describe('Grade 10 Topic IX - 9. Háromszög középvonalai és súlyvonalai - Components', () => {
  it('renders MidlinesMediansTheory without throwing', () => {
    const { container } = render(<MidlinesMediansTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MidlinesMediansQuiz without throwing', () => {
    const { container } = render(<MidlinesMediansQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MidlinesMediansMatcher without throwing', () => {
    const { container } = render(<MidlinesMediansMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MidlinesMediansSorter without throwing', () => {
    const { container } = render(<MidlinesMediansSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<MidlineTheoremSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<FourMidlineTrianglesSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<MediansCentroidRatioSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<SixEqualAreaTrianglesSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<RightTriangleMedianSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

