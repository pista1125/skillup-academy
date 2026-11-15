import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LogPractice2Theory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Theory';
import { LogPractice2Quiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Quiz';
import { LogPractice2Matcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Matcher';
import { LogPractice2Sorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Sorter';
import {
  CoffeeCoolingSvg,
  PressureAltitudeSvg,
  LogBetweenIntegersSvg,
  InformationBitsSvg,
  NapierIdeaSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/gyakorlas-logaritmus-2/LogPractice2Figures';

describe('Grade 11 Topic III - 15. Gyakorlás (logaritmus) - Components', () => {
  it('renders LogPractice2Theory without throwing', () => {
    const { container } = render(<LogPractice2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders LogPractice2Quiz without throwing', () => {
    const { container } = render(<LogPractice2Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders LogPractice2Matcher without throwing', () => {
    const { container } = render(<LogPractice2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders LogPractice2Sorter without throwing', () => {
    const { container } = render(<LogPractice2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CoffeeCoolingSvg, PressureAltitudeSvg, LogBetweenIntegersSvg, InformationBitsSvg, NapierIdeaSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
