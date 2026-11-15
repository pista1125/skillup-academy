import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ObtuseCosineTheory } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineTheory';
import { ObtuseCosineQuiz } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineQuiz';
import { ObtuseCosineMatcher } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineMatcher';
import { ObtuseCosineSorter } from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineSorter';
import {
  UnitCircleAcuteSvg,
  UnitCircleObtuseSvg,
  RightAngleCosineSvg,
  CosineGraphSvg,
  IsoscelesObtuseSvg
} from '@/components/math/grade-11/trigonometria/a-tompaszog-es-a-derekszog-koszinusza/ObtuseCosineFigures';

describe('Grade 11 Topic I - 10. A tompaszög és a derékszög koszinusza - Components', () => {
  it('renders ObtuseCosineTheory without throwing', () => {
    const { container } = render(<ObtuseCosineTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ObtuseCosineQuiz without throwing', () => {
    const { container } = render(<ObtuseCosineQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ObtuseCosineMatcher without throwing', () => {
    const { container } = render(<ObtuseCosineMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ObtuseCosineSorter without throwing', () => {
    const { container } = render(<ObtuseCosineSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [UnitCircleAcuteSvg, UnitCircleObtuseSvg, RightAngleCosineSvg, CosineGraphSvg, IsoscelesObtuseSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
