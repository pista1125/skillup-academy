import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NthRootTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootTheory';
import { NthRootQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootQuiz';
import { NthRootMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootMatcher';
import { NthRootSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootSorter';
import {
  NthRootCubeSvg,
  NthRootDefinitionSvg,
  NthRootEvenOddSvg,
  NthRootPopulationSvg,
  NthRootSphereSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/szamok-n-edik-gyoke/NthRootFigures';

describe('Grade 11 Topic III - 27. Számok n-edik gyöke - Components', () => {
  it('renders NthRootTheory without throwing', () => {
    const { container } = render(<NthRootTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NthRootQuiz without throwing', () => {
    const { container } = render(<NthRootQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NthRootMatcher without throwing', () => {
    const { container } = render(<NthRootMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NthRootSorter without throwing', () => {
    const { container } = render(<NthRootSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NthRootCubeSvg, NthRootDefinitionSvg, NthRootEvenOddSvg, NthRootPopulationSvg, NthRootSphereSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
