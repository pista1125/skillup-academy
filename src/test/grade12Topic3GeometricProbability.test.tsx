import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GeometricProbabilityTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/geometriai-valoszinuseg/GeometricProbabilityTheory';
import { GeometricProbabilityQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/geometriai-valoszinuseg/GeometricProbabilityQuiz';
import { GeometricProbabilityMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/geometriai-valoszinuseg/GeometricProbabilityMatcher';
import { GeometricProbabilitySorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/geometriai-valoszinuseg/GeometricProbabilitySorter';
import {
  TargetRingsSvg,
  LuckyWheelSvg,
  AntRodSvg,
  TileCoinSvg,
  FlowerPotSvg,
  PaperCornersSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/geometriai-valoszinuseg/GeometricProbabilityFigures';

describe('Grade 12 Topic III - 8. Geometriai valószínűség - Components', () => {
  it('renders GeometricProbabilityTheory without throwing', () => {
    const { container } = render(<GeometricProbabilityTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricProbabilityQuiz without throwing', () => {
    const { container } = render(<GeometricProbabilityQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricProbabilityMatcher without throwing', () => {
    const { container } = render(<GeometricProbabilityMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GeometricProbabilitySorter without throwing', () => {
    const { container } = render(<GeometricProbabilitySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TargetRingsSvg, LuckyWheelSvg, AntRodSvg, TileCoinSvg, FlowerPotSvg, PaperCornersSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
