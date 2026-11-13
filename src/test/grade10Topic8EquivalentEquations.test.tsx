import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { EquivalentEquationsTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsTheory';
import { EquivalentEquationsQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsQuiz';
import { EquivalentEquationsMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsMatcher';
import { EquivalentEquationsSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsSorter';
import {
  BalanceScaleSvg,
  ExtraneousRootsSvg,
  LostRootsSvg,
  DomainRestrictionSvg,
  FlowchartStepSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/ekvivalens-egyenletek/EquivalentEquationsFigures';

describe('Grade 10 Topic VIII - Ekvivalens egyenletek - Components', () => {
  it('renders EquivalentEquationsTheory without throwing', () => {
    const { container } = render(<EquivalentEquationsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders EquivalentEquationsQuiz without throwing', () => {
    const { container } = render(<EquivalentEquationsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders EquivalentEquationsMatcher without throwing', () => {
    const { container } = render(<EquivalentEquationsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders EquivalentEquationsSorter without throwing', () => {
    const { container } = render(<EquivalentEquationsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<BalanceScaleSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ExtraneousRootsSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<LostRootsSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<DomainRestrictionSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<FlowchartStepSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

