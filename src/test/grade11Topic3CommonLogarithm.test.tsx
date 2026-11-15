import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CommonLogarithmTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmTheory';
import { CommonLogarithmQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmQuiz';
import { CommonLogarithmMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmMatcher';
import { CommonLogarithmSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmSorter';
import {
  CommonLogChangeBaseSvg,
  CommonLogGraphSvg,
  CommonLogHalfLifeSvg,
  CommonLogInterestSvg,
  CommonLogScaleSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/tizes-alapu-logaritmus/CommonLogarithmFigures';

describe('Grade 11 Topic III - 36. A tízes alapú logaritmus használata - Components', () => {
  it('renders CommonLogarithmTheory without throwing', () => {
    const { container } = render(<CommonLogarithmTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CommonLogarithmQuiz without throwing', () => {
    const { container } = render(<CommonLogarithmQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CommonLogarithmMatcher without throwing', () => {
    const { container } = render(<CommonLogarithmMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CommonLogarithmSorter without throwing', () => {
    const { container } = render(<CommonLogarithmSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CommonLogScaleSvg, CommonLogGraphSvg, CommonLogChangeBaseSvg, CommonLogHalfLifeSvg, CommonLogInterestSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
