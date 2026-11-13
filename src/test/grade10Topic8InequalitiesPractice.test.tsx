import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { InequalitiesPracticeTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeTheory';
import { InequalitiesPracticeQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeQuiz';
import { InequalitiesPracticeMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeMatcher';
import { InequalitiesPracticeSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeSorter';
import {
  FractionSignChartSvg,
  AbsoluteValueInequalityBandSvg,
  DenominatorDangerTrapSvg,
  ComplexIntervalIntersectionSvg,
  AbsoluteQuadraticParabolaSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/gyakorlas-egyenlotlensegek/InequalitiesPracticeFigures';

describe('Grade 10 Topic VIII - Gyakorlás: Törtes és abszolútértékes egyenlőtlenségek - Components', () => {
  it('renders InequalitiesPracticeTheory without throwing', () => {
    const { container } = render(<InequalitiesPracticeTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Törtes és abszolútértékes egyenlőtlenségek');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Interaktív Törtes és Abszolútérték Laboratórium');
  });

  it('renders InequalitiesPracticeQuiz without throwing', () => {
    const { container } = render(<InequalitiesPracticeQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Törtes és abszolútértékes egyenlőtlenségek');
  });

  it('renders InequalitiesPracticeMatcher without throwing', () => {
    const { container } = render(<InequalitiesPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders InequalitiesPracticeSorter without throwing', () => {
    const { container } = render(<InequalitiesPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<FractionSignChartSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<AbsoluteValueInequalityBandSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<DenominatorDangerTrapSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<ComplexIntervalIntersectionSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<AbsoluteQuadraticParabolaSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

