import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { HomothetyTheory } from '@/components/math/grade-10/hasonlosag/kozeppontos-hasonlosag/HomothetyTheory';
import { HomothetyQuiz } from '@/components/math/grade-10/hasonlosag/kozeppontos-hasonlosag/HomothetyQuiz';
import { HomothetyMatcher } from '@/components/math/grade-10/hasonlosag/kozeppontos-hasonlosag/HomothetyMatcher';
import { HomothetySorter } from '@/components/math/grade-10/hasonlosag/kozeppontos-hasonlosag/HomothetySorter';
import {
  CircleHomothetySvg,
  CircleTouchingDilationSvg,
  InvariantLinesSvg,
  AngleInterceptThalesSvg,
  PyramidDilationSvg
} from '@/components/math/grade-10/hasonlosag/kozeppontos-hasonlosag/HomothetyFigures';

describe('Grade 10 Topic IX - 2. Középpontos hasonlóság - Components', () => {
  it('renders HomothetyTheory without throwing', () => {
    const { container } = render(<HomothetyTheory />);
    expect(container).toBeTruthy();
  });

  it('renders HomothetyQuiz without throwing', () => {
    const { container } = render(<HomothetyQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders HomothetyMatcher without throwing', () => {
    const { container } = render(<HomothetyMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders HomothetySorter without throwing', () => {
    const { container } = render(<HomothetySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<CircleHomothetySvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<CircleTouchingDilationSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<InvariantLinesSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<AngleInterceptThalesSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<PyramidDilationSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

