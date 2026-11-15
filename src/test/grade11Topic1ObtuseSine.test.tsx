import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ObtuseSineTheory } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineTheory';
import { ObtuseSineQuiz } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineQuiz';
import { ObtuseSineMatcher } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineMatcher';
import { ObtuseSineSorter } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineSorter';
import {
  ObtuseAreaPairSvg,
  SideBySideTrianglesSvg,
  SupplementarySineDefinitionSvg,
  RightAngleSineSvg,
  SineInverseTwoAnglesSvg
} from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-szinusza/ObtuseSineFigures';

describe('Grade 11 Topic I - 7. A tompaszög és a derékszög szinusza - Components', () => {
  it('renders ObtuseSineTheory without throwing', () => {
    const { container } = render(<ObtuseSineTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ObtuseSineQuiz without throwing', () => {
    const { container } = render(<ObtuseSineQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ObtuseSineMatcher without throwing', () => {
    const { container } = render(<ObtuseSineMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ObtuseSineSorter without throwing', () => {
    const { container } = render(<ObtuseSineSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ObtuseAreaPairSvg,
      SideBySideTrianglesSvg,
      SupplementarySineDefinitionSvg,
      RightAngleSineSvg,
      SineInverseTwoAnglesSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
