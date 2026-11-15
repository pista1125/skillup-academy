import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CentralDilationTheory } from '@/components/math/grade-10/hasonlosag/kozeppontos-nagyitas-kicsinyites/CentralDilationTheory';
import { CentralDilationQuiz } from '@/components/math/grade-10/hasonlosag/kozeppontos-nagyitas-kicsinyites/CentralDilationQuiz';
import { CentralDilationMatcher } from '@/components/math/grade-10/hasonlosag/kozeppontos-nagyitas-kicsinyites/CentralDilationMatcher';
import { CentralDilationSorter } from '@/components/math/grade-10/hasonlosag/kozeppontos-nagyitas-kicsinyites/CentralDilationSorter';
import {
  DilationCenterSvg,
  NegativeRatioSvg,
  AreaPerimeterRatioSvg,
  SquareInTriangleSvg,
  PyramidSliceSvg
} from '@/components/math/grade-10/hasonlosag/kozeppontos-nagyitas-kicsinyites/CentralDilationFigures';

describe('Grade 10 Topic IX - Középpontos nagyítás, kicsinyítés - Components', () => {
  it('renders CentralDilationTheory without throwing', () => {
    const { container } = render(<CentralDilationTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CentralDilationQuiz without throwing', () => {
    const { container } = render(<CentralDilationQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CentralDilationMatcher without throwing', () => {
    const { container } = render(<CentralDilationMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CentralDilationSorter without throwing', () => {
    const { container } = render(<CentralDilationSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<DilationCenterSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<NegativeRatioSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<AreaPerimeterRatioSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<SquareInTriangleSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<PyramidSliceSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

