import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { G11NumberSetsTheory } from '@/components/math/grade-11/szamelmelet/szamhalmazok/G11NumberSetsTheory';
import { G11NumberSetsQuiz } from '@/components/math/grade-11/szamelmelet/szamhalmazok/G11NumberSetsQuiz';
import { G11NumberSetsMatcher } from '@/components/math/grade-11/szamelmelet/szamhalmazok/G11NumberSetsMatcher';
import { G11NumberSetsSorter } from '@/components/math/grade-11/szamelmelet/szamhalmazok/G11NumberSetsSorter';
import {
  G11NumberSetsVennSvg,
  G11ClosureOperationsSvg,
  G11DecimalTypesSvg,
  G11DenominatorRuleSvg,
  G11RepeatingToFractionSvg
} from '@/components/math/grade-11/szamelmelet/szamhalmazok/G11NumberSetsFigures';

describe('Grade 11 Topic IV - 1. Számhalmazok - Components', () => {
  it('renders G11NumberSetsTheory without throwing', () => {
    const { container } = render(<G11NumberSetsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders G11NumberSetsQuiz without throwing', () => {
    const { container } = render(<G11NumberSetsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders G11NumberSetsMatcher without throwing', () => {
    const { container } = render(<G11NumberSetsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders G11NumberSetsSorter without throwing', () => {
    const { container } = render(<G11NumberSetsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [G11NumberSetsVennSvg, G11ClosureOperationsSvg, G11DecimalTypesSvg, G11DenominatorRuleSvg, G11RepeatingToFractionSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
