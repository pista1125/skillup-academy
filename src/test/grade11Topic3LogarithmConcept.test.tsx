import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LogarithmConceptTheory } from '@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptTheory';
import { LogarithmConceptQuiz } from '@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptQuiz';
import { LogarithmConceptMatcher } from '@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptMatcher';
import { LogarithmConceptSorter } from '@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptSorter';
import {
  LogConceptConditionsSvg,
  LogConceptDefinitionSvg,
  LogConceptGraphSvg,
  LogConceptSlideRuleSvg,
  LogConceptTripleSvg
} from '@/components/math/grade-11/hatvany-gyok-logaritmus/a-logaritmus-fogalma/LogarithmConceptFigures';

describe('Grade 11 Topic III - 35. A logaritmus fogalma - Components', () => {
  it('renders LogarithmConceptTheory without throwing', () => {
    const { container } = render(<LogarithmConceptTheory />);
    expect(container).toBeTruthy();
  });

  it('renders LogarithmConceptQuiz without throwing', () => {
    const { container } = render(<LogarithmConceptQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders LogarithmConceptMatcher without throwing', () => {
    const { container } = render(<LogarithmConceptMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders LogarithmConceptSorter without throwing', () => {
    const { container } = render(<LogarithmConceptSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LogConceptTripleSvg, LogConceptDefinitionSvg, LogConceptConditionsSvg, LogConceptGraphSvg, LogConceptSlideRuleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
