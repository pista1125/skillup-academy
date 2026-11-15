import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ExponentialFunctionsTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsTheory';
import { ExponentialFunctionsQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsQuiz';
import { ExponentialFunctionsMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsMatcher';
import { ExponentialFunctionsSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsSorter';
import {
  ExponentialFunctionsBase2Svg,
  ExponentialFunctionsDiscreteSvg,
  ExponentialFunctionsFamilySvg,
  ExponentialFunctionsIrrationalSvg,
  ExponentialFunctionsMirrorSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/exponencialis-fuggvenyek/ExponentialFunctionsFigures';

describe('Grade 11 Topic III - 7. Exponenciális függvények - Components', () => {
  it('renders ExponentialFunctionsTheory without throwing', () => {
    const { container } = render(<ExponentialFunctionsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialFunctionsQuiz without throwing', () => {
    const { container } = render(<ExponentialFunctionsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialFunctionsMatcher without throwing', () => {
    const { container } = render(<ExponentialFunctionsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ExponentialFunctionsSorter without throwing', () => {
    const { container } = render(<ExponentialFunctionsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ExponentialFunctionsBase2Svg,
      ExponentialFunctionsDiscreteSvg,
      ExponentialFunctionsFamilySvg,
      ExponentialFunctionsIrrationalSvg,
      ExponentialFunctionsMirrorSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
