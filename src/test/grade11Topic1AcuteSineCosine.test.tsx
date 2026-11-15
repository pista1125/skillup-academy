import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AcuteSineCosineTheory } from '@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineTheory';
import { AcuteSineCosineQuiz } from '@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineQuiz';
import { AcuteSineCosineMatcher } from '@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineMatcher';
import { AcuteSineCosineSorter } from '@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineSorter';
import {
  SinCosDefinitionSvg,
  MillimeterHypotenuseSvg,
  HikingPathSvg,
  IsoscelesApexSvg,
  CalculatorKeysSvg,
  RectangleDiagonalSvg
} from '@/components/math/grade-11/trigonometria/hegyesszog-szinusza-koszinusza/AcuteSineCosineFigures';

describe('Grade 11 Topic I - 3. Hegyesszög szinusza, koszinusza - Components', () => {
  it('renders AcuteSineCosineTheory without throwing', () => {
    const { container } = render(<AcuteSineCosineTheory />);
    expect(container).toBeTruthy();
  });

  it('renders AcuteSineCosineQuiz without throwing', () => {
    const { container } = render(<AcuteSineCosineQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders AcuteSineCosineMatcher without throwing', () => {
    const { container } = render(<AcuteSineCosineMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders AcuteSineCosineSorter without throwing', () => {
    const { container } = render(<AcuteSineCosineSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      SinCosDefinitionSvg,
      MillimeterHypotenuseSvg,
      HikingPathSvg,
      IsoscelesApexSvg,
      CalculatorKeysSvg,
      RectangleDiagonalSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
