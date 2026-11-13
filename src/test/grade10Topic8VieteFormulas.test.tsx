import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { VieteFormulasTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasTheory';
import { VieteFormulasQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasQuiz';
import { VieteFormulasMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasMatcher';
import { VieteFormulasSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasSorter';
import {
  VieteFormulasDuoSvg,
  SignOfRootsDeductionSvg,
  SymmetricExpressionsSquareSvg,
  SymmetricExpressionsReciprocalSvg,
  MentalRootGuesserSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/viete-formulak/VieteFormulasFigures';

describe('Grade 10 Topic VIII - Viète-formulák - Components', () => {
  it('renders VieteFormulasTheory without throwing', () => {
    const { container } = render(<VieteFormulasTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Ráadás – Viète-formulák!');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Interaktív Viète Laboratórium');
  });

  it('renders VieteFormulasQuiz without throwing', () => {
    const { container } = render(<VieteFormulasQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Viète-formulák');
  });

  it('renders VieteFormulasMatcher without throwing', () => {
    const { container } = render(<VieteFormulasMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders VieteFormulasSorter without throwing', () => {
    const { container } = render(<VieteFormulasSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<VieteFormulasDuoSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<SignOfRootsDeductionSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<SymmetricExpressionsSquareSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<SymmetricExpressionsReciprocalSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<MentalRootGuesserSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

