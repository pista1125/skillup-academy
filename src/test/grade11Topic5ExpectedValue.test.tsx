import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ExpectedValueTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/varhato-ertek/ExpectedValueTheory';
import { ExpectedValueQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/varhato-ertek/ExpectedValueQuiz';
import { ExpectedValueMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/varhato-ertek/ExpectedValueMatcher';
import { ExpectedValueSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/varhato-ertek/ExpectedValueSorter';
import {
  ExpectedValueThreeDiceSvg,
  ExpectedValueConceptsSvg,
  ExpectedValueStepsSvg,
  ExpectedValueLotterySvg,
  ExpectedValueFairGameSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/varhato-ertek/ExpectedValueFigures';

describe('Grade 11 Topic V - 9. Várható érték - Components', () => {
  it('renders ExpectedValueTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ExpectedValueTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ExpectedValueQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ExpectedValueQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ExpectedValueMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ExpectedValueMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ExpectedValueSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<ExpectedValueSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ExpectedValueThreeDiceSvg, ExpectedValueConceptsSvg, ExpectedValueStepsSvg, ExpectedValueLotterySvg, ExpectedValueFairGameSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
