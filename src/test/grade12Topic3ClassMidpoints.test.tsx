import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ClassMidpointsTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/szamitasok-osztalykozepekkel/ClassMidpointsTheory';
import { ClassMidpointsQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/szamitasok-osztalykozepekkel/ClassMidpointsQuiz';
import { ClassMidpointsMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/szamitasok-osztalykozepekkel/ClassMidpointsMatcher';
import { ClassMidpointsSorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/szamitasok-osztalykozepekkel/ClassMidpointsSorter';
import {
  NailsHistogramSvg,
  MidpointConceptSvg,
  RainfallHistogramSvg,
  WireToleranceSvg,
  ScoresHistogramSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/szamitasok-osztalykozepekkel/ClassMidpointsFigures';

describe('Grade 12 Topic III - 4. Számítások osztályközepekkel - Components', () => {
  it('renders ClassMidpointsTheory without throwing', () => {
    const { container } = render(<ClassMidpointsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders ClassMidpointsQuiz without throwing', () => {
    const { container } = render(<ClassMidpointsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders ClassMidpointsMatcher without throwing', () => {
    const { container } = render(<ClassMidpointsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders ClassMidpointsSorter without throwing', () => {
    const { container } = render(<ClassMidpointsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NailsHistogramSvg, MidpointConceptSvg, RainfallHistogramSvg, WireToleranceSvg, ScoresHistogramSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
