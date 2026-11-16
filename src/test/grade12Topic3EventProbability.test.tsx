import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { EventProbabilityTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemeny-valoszinusege/EventProbabilityTheory';
import { EventProbabilityQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemeny-valoszinusege/EventProbabilityQuiz';
import { EventProbabilityMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemeny-valoszinusege/EventProbabilityMatcher';
import { EventProbabilitySorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemeny-valoszinusege/EventProbabilitySorter';
import {
  CoinProbabilityVennSvg,
  ClassicDiceSvg,
  BoardGameStepsSvg,
  ThreeDigitSlotsSvg,
  IndependentDiceSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/esemeny-valoszinusege/EventProbabilityFigures';

describe('Grade 12 Topic III - 7. Esemény valószínűsége - Components', () => {
  it('renders EventProbabilityTheory without throwing', () => {
    const { container } = render(<EventProbabilityTheory />);
    expect(container).toBeTruthy();
  });

  it('renders EventProbabilityQuiz without throwing', () => {
    const { container } = render(<EventProbabilityQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders EventProbabilityMatcher without throwing', () => {
    const { container } = render(<EventProbabilityMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders EventProbabilitySorter without throwing', () => {
    const { container } = render(<EventProbabilitySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CoinProbabilityVennSvg, ClassicDiceSvg, BoardGameStepsSvg, ThreeDigitSlotsSvg, IndependentDiceSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
