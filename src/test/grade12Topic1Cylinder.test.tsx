import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CylinderTheory } from '@/components/math/grade-12/tergeometria/a-henger/CylinderTheory';
import { CylinderQuiz } from '@/components/math/grade-12/tergeometria/a-henger/CylinderQuiz';
import { CylinderMatcher } from '@/components/math/grade-12/tergeometria/a-henger/CylinderMatcher';
import { CylinderSorter } from '@/components/math/grade-12/tergeometria/a-henger/CylinderSorter';
import {
  CylinderPartsSvg,
  RectangleRotationSvg,
  PaperRollSvg,
  SpoonInPotSvg,
  LampShadeSvg
} from '@/components/math/grade-12/tergeometria/a-henger/CylinderFigures';

describe('Grade 12 Topic I - 4. A henger - Components', () => {
  it('renders CylinderTheory without throwing', () => {
    const { container } = render(<CylinderTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CylinderQuiz without throwing', () => {
    const { container } = render(<CylinderQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CylinderMatcher without throwing', () => {
    const { container } = render(<CylinderMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CylinderSorter without throwing', () => {
    const { container } = render(<CylinderSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [CylinderPartsSvg, RectangleRotationSvg, PaperRollSvg, SpoonInPotSvg, LampShadeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
