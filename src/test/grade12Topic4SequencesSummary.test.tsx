import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SequencesSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/sorozatok/SequencesSummaryTheory';
import { SequencesSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/sorozatok/SequencesSummaryQuiz';
import { SequencesSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/sorozatok/SequencesSummaryMatcher';
import { SequencesSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/sorozatok/SequencesSummarySorter';
import {
  SequenceDefinitionSvg,
  ArithGeomCompareSvg,
  PartialSumThresholdSvg,
  PrintingMachineSvg,
  CyclistsSvg,
  CompoundInterestSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/sorozatok/SequencesSummaryFigures';

describe('Grade 12 Topic IV - 6. Sorozatok (összefoglalás) - Components', () => {
  it('renders SequencesSummaryTheory without throwing', () => {
    const { container } = render(<SequencesSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SequencesSummaryQuiz without throwing', () => {
    const { container } = render(<SequencesSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SequencesSummaryMatcher without throwing', () => {
    const { container } = render(<SequencesSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SequencesSummarySorter without throwing', () => {
    const { container } = render(<SequencesSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SequenceDefinitionSvg, ArithGeomCompareSvg, PartialSumThresholdSvg, PrintingMachineSvg, CyclistsSvg, CompoundInterestSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
