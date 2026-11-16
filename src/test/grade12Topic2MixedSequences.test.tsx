import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MixedSequencesTheory } from '@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesTheory';
import { MixedSequencesQuiz } from '@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesQuiz';
import { MixedSequencesMatcher } from '@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesMatcher';
import { MixedSequencesSorter } from '@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesSorter';
import {
  ArithVsGeoSvg,
  HalvingNumberLineSvg,
  TriangleCakeSvg,
  PavingRowsSvg,
  MeansSvg,
  PumpkinPyramidSvg
} from '@/components/math/grade-12/sorozatok/vegyes-feladatok/MixedSequencesFigures';

describe('Grade 12 Topic II - 7. Vegyes feladatok - Components', () => {
  it('renders MixedSequencesTheory without throwing', () => {
    const { container } = render(<MixedSequencesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MixedSequencesQuiz without throwing', () => {
    const { container } = render(<MixedSequencesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MixedSequencesMatcher without throwing', () => {
    const { container } = render(<MixedSequencesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MixedSequencesSorter without throwing', () => {
    const { container } = render(<MixedSequencesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ArithVsGeoSvg, HalvingNumberLineSvg, TriangleCakeSvg, PavingRowsSvg, MeansSvg, PumpkinPyramidSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
