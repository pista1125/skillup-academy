import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StatDiagramsTheory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/diagramok/StatDiagramsTheory';
import { StatDiagramsQuiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/diagramok/StatDiagramsQuiz';
import { StatDiagramsMatcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/diagramok/StatDiagramsMatcher';
import { StatDiagramsSorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/diagramok/StatDiagramsSorter';
import {
  DetergentMisleadingSvg,
  BoxPlotAnatomySvg,
  SwimmerBoxPlotSvg,
  BeamonOutlierSvg,
  MilakBoxPlotsSvg,
  StaffPieSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/diagramok/StatDiagramsFigures';

describe('Grade 12 Topic III - 3. Diagramok - Components', () => {
  it('renders StatDiagramsTheory without throwing', () => {
    const { container } = render(<StatDiagramsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StatDiagramsQuiz without throwing', () => {
    const { container } = render(<StatDiagramsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StatDiagramsMatcher without throwing', () => {
    const { container } = render(<StatDiagramsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StatDiagramsSorter without throwing', () => {
    const { container } = render(<StatDiagramsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DetergentMisleadingSvg, BoxPlotAnatomySvg, SwimmerBoxPlotSvg, BeamonOutlierSvg, MilakBoxPlotsSvg, StaffPieSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
