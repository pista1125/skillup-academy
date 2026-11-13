import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RootFactorizationTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationTheory';
import { RootFactorizationQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationQuiz';
import { RootFactorizationMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationMatcher';
import { RootFactorizationSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationSorter';
import {
  RootFactorFormulaSvg,
  MissingLeadingCoeffTrapSvg,
  FractionSimplificationSvg,
  DiscriminantCasesFactorSvg,
  ConstructEquationFromRootsSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/polinom-gyoktenyezos-alakja/RootFactorizationFigures';

describe('Grade 10 Topic VIII - Polinom gyöktényezős alakja - Components', () => {
  it('renders RootFactorizationTheory without throwing', () => {
    const { container } = render(<RootFactorizationTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('A másodfokú polinom gyöktényezős alakja');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Interaktív Gyöktényezős Laboratórium');
  });

  it('renders RootFactorizationQuiz without throwing', () => {
    const { container } = render(<RootFactorizationQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Polinom gyöktényezős alakja');
  });

  it('renders RootFactorizationMatcher without throwing', () => {
    const { container } = render(<RootFactorizationMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders RootFactorizationSorter without throwing', () => {
    const { container } = render(<RootFactorizationSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<RootFactorFormulaSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<MissingLeadingCoeffTrapSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<FractionSimplificationSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<DiscriminantCasesFactorSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<ConstructEquationFromRootsSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

