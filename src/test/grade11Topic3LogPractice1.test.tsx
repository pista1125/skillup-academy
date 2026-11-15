import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LogPractice1Theory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Theory';
import { LogPractice1Quiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Quiz';
import { LogPractice1Matcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Matcher';
import { LogPractice1Sorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Sorter';
import {
  ExpGraphTaskSvg,
  LogNumberLineSvg,
  DecayHundredthSvg,
  LifeExpectancySvg,
  RichterScaleSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-1/LogPractice1Figures';

describe('Grade 11 Topic III - 13. Gyakorlás - Components', () => {
  it('renders LogPractice1Theory without throwing', () => {
    const { container } = render(<LogPractice1Theory />);
    expect(container).toBeTruthy();
  });

  it('renders LogPractice1Quiz without throwing', () => {
    const { container } = render(<LogPractice1Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders LogPractice1Matcher without throwing', () => {
    const { container } = render(<LogPractice1Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders LogPractice1Sorter without throwing', () => {
    const { container } = render(<LogPractice1Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ExpGraphTaskSvg, LogNumberLineSvg, DecayHundredthSvg, LifeExpectancySvg, RichterScaleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
