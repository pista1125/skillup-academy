import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AcuteTangentTheory } from '@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentTheory';
import { AcuteTangentQuiz } from '@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentQuiz';
import { AcuteTangentMatcher } from '@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentMatcher';
import { AcuteTangentSorter } from '@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentSorter';
import {
  WaterTowerSvg,
  SimilarRightTrianglesSvg,
  TangentDefinitionSvg,
  TangentFanSvg,
  RectangleDiagonalSvg
} from '@/components/math/grade-11/trigonometria/hegyesszog-tangense/AcuteTangentFigures';

describe('Grade 11 Topic I - 1. Hegyesszög tangense - Components', () => {
  it('renders AcuteTangentTheory without throwing', () => {
    const { container } = render(<AcuteTangentTheory />);
    expect(container).toBeTruthy();
  });

  it('renders AcuteTangentQuiz without throwing', () => {
    const { container } = render(<AcuteTangentQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders AcuteTangentMatcher without throwing', () => {
    const { container } = render(<AcuteTangentMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders AcuteTangentSorter without throwing', () => {
    const { container } = render(<AcuteTangentSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WaterTowerSvg, SimilarRightTrianglesSvg, TangentDefinitionSvg, TangentFanSvg, RectangleDiagonalSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
