import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { QuadraticInequalitiesTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesTheory';
import { QuadraticInequalitiesQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesQuiz';
import { QuadraticInequalitiesMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesMatcher';
import { QuadraticInequalitiesSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesSorter';
import {
  ParabolaCasesDgt0Svg,
  ParabolaCasesDeq0Svg,
  ParabolaCasesDlt0Svg,
  SignTableChartSvg,
  InequalityIntervalNumberLineSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/masodfoku-egyenlotlensegek/QuadraticInequalitiesFigures';

describe('Grade 10 Topic VIII - Másodfokú egyenlőtlenségek - Components', () => {
  it('renders QuadraticInequalitiesTheory without throwing', () => {
    const { container } = render(<QuadraticInequalitiesTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Másodfokú egyenlőtlenségek megoldása');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Interaktív Parabola és Egyenlőtlenség Laboratórium');
  });

  it('renders QuadraticInequalitiesQuiz without throwing', () => {
    const { container } = render(<QuadraticInequalitiesQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Másodfokú egyenlőtlenségek');
  });

  it('renders QuadraticInequalitiesMatcher without throwing', () => {
    const { container } = render(<QuadraticInequalitiesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders QuadraticInequalitiesSorter without throwing', () => {
    const { container } = render(<QuadraticInequalitiesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<ParabolaCasesDgt0Svg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ParabolaCasesDeq0Svg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<ParabolaCasesDlt0Svg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<SignTableChartSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<InequalityIntervalNumberLineSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});
