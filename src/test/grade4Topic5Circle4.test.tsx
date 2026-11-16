import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Circle4Theory } from '@/components/math/grade-4/sikidomok-testek/a-kor/Circle4Theory';
import { Circle4Quiz } from '@/components/math/grade-4/sikidomok-testek/a-kor/Circle4Quiz';
import { Circle4Matcher } from '@/components/math/grade-4/sikidomok-testek/a-kor/Circle4Matcher';
import { Circle4Sorter } from '@/components/math/grade-4/sikidomok-testek/a-kor/Circle4Sorter';
import {
  RoundThingsSvg,
  HulaHoopSvg,
  CompassStepsSvg,
  CircleOrNotSvg,
  ConcentricSvg,
  CirclePatternsSvg
} from '@/components/math/grade-4/sikidomok-testek/a-kor/Circle4Figures';

describe('Grade 4 Topic V - 2. A kör - Components', () => {
  it('renders Circle4Theory without throwing', () => {
    const { container } = render(<Circle4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Circle4Quiz without throwing', () => {
    const { container } = render(<Circle4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Circle4Matcher without throwing', () => {
    const { container } = render(<Circle4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Circle4Sorter without throwing', () => {
    const { container } = render(<Circle4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RoundThingsSvg, HulaHoopSvg, CompassStepsSvg, CircleOrNotSvg, ConcentricSvg, CirclePatternsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
