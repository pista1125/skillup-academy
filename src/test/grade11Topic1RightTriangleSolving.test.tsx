import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RightTriangleSolvingTheory } from '@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingTheory';
import { RightTriangleSolvingQuiz } from '@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingQuiz';
import { RightTriangleSolvingMatcher } from '@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingMatcher';
import { RightTriangleSolvingSorter } from '@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingSorter';
import {
  SolvingStepsSvg,
  IsoscelesAltitudeSvg,
  TrapezoidRoadSvg,
  CraneArmSvg,
  StatueOfLibertySvg,
  CotangentSvg
} from '@/components/math/grade-11/trigonometria/hosszusagok-es-szogek-kiszamitasa/RightTriangleSolvingFigures';

describe('Grade 11 Topic I - 5. Hosszúságok és szögek kiszámítása - Components', () => {
  it('renders RightTriangleSolvingTheory without throwing', () => {
    const { container } = render(<RightTriangleSolvingTheory />);
    expect(container).toBeTruthy();
  });

  it('renders RightTriangleSolvingQuiz without throwing', () => {
    const { container } = render(<RightTriangleSolvingQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders RightTriangleSolvingMatcher without throwing', () => {
    const { container } = render(<RightTriangleSolvingMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders RightTriangleSolvingSorter without throwing', () => {
    const { container } = render(<RightTriangleSolvingSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SolvingStepsSvg, IsoscelesAltitudeSvg, TrapezoidRoadSvg, CraneArmSvg, StatueOfLibertySvg, CotangentSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
