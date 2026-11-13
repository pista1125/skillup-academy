import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RadicalEquationsTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsTheory';
import { RadicalEquationsQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsQuiz';
import { RadicalEquationsMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsMatcher';
import { RadicalEquationsSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsSorter';
import {
  RadicalStepFlowSvg,
  RadicalParabolaIntersectionSvg,
  RadicalDomainSvg,
  TwoRadicalsSvg,
  ExtraneousRootDetectorSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyokos-egyenletek/RadicalEquationsFigures';

describe('Grade 10 Topic VIII - Gyökös egyenletek - Components', () => {
  it('renders RadicalEquationsTheory without throwing', () => {
    const { container } = render(<RadicalEquationsTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Gyökös egyenletek megoldása');
  });

  it('renders RadicalEquationsQuiz without throwing', () => {
    const { container } = render(<RadicalEquationsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders RadicalEquationsMatcher without throwing', () => {
    const { container } = render(<RadicalEquationsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders RadicalEquationsSorter without throwing', () => {
    const { container } = render(<RadicalEquationsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<RadicalStepFlowSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<RadicalParabolaIntersectionSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<RadicalDomainSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<TwoRadicalsSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<ExtraneousRootDetectorSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

