import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { QuadraticSystemsTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsTheory';
import { QuadraticSystemsQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsQuiz';
import { QuadraticSystemsMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsMatcher';
import { QuadraticSystemsSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsSorter';
import {
  LineAndParabolaIntersectionSvg,
  SymmetricSystemVieteBridgeSvg,
  CircleAndLineSystemSvg,
  EliminationQuadraticsSvg,
  OrderedPairsVerificationSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenletrendszerek/QuadraticSystemsFigures';

describe('Grade 10 Topic VIII - Másodfokú egyenletrendszerek - Components', () => {
  it('renders QuadraticSystemsTheory without throwing', () => {
    const { container } = render(<QuadraticSystemsTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('9. Ráadás – Másodfokú egyenletrendszerek');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Interaktív Rendszer Laboratórium');
  });

  it('renders QuadraticSystemsQuiz without throwing', () => {
    const { container } = render(<QuadraticSystemsQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('9. Ráadás – Másodfokú egyenletrendszerek');
  });

  it('renders QuadraticSystemsMatcher without throwing', () => {
    const { container } = render(<QuadraticSystemsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders QuadraticSystemsSorter without throwing', () => {
    const { container } = render(<QuadraticSystemsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<LineAndParabolaIntersectionSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<SymmetricSystemVieteBridgeSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<CircleAndLineSystemSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<EliminationQuadraticsSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<OrderedPairsVerificationSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

