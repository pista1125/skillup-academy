import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TransformationsSolidsSummaryTheory } from '@/components/math/grade-12/rendszerezo-osszefoglalas/transzformaciok-alakzatok/TransformationsSolidsSummaryTheory';
import { TransformationsSolidsSummaryQuiz } from '@/components/math/grade-12/rendszerezo-osszefoglalas/transzformaciok-alakzatok/TransformationsSolidsSummaryQuiz';
import { TransformationsSolidsSummaryMatcher } from '@/components/math/grade-12/rendszerezo-osszefoglalas/transzformaciok-alakzatok/TransformationsSolidsSummaryMatcher';
import { TransformationsSolidsSummarySorter } from '@/components/math/grade-12/rendszerezo-osszefoglalas/transzformaciok-alakzatok/TransformationsSolidsSummarySorter';
import {
  SymmetryTypesSvg,
  CentralSimilaritySvg,
  PythagorasThalesSvg,
  TrigRatiosSvg,
  BridgeArcSvg,
  AreaFormulasSvg,
  CosineLawSvg
} from '@/components/math/grade-12/rendszerezo-osszefoglalas/transzformaciok-alakzatok/TransformationsSolidsSummaryFigures';

describe("Grade 12 Topic IV - 8. Transzformációk, síkbeli és térbeli alakzatok (összefoglalás) - Components", () => {
  it('renders TransformationsSolidsSummaryTheory without throwing', () => {
    const { container } = render(<TransformationsSolidsSummaryTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TransformationsSolidsSummaryQuiz without throwing', () => {
    const { container } = render(<TransformationsSolidsSummaryQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TransformationsSolidsSummaryMatcher without throwing', () => {
    const { container } = render(<TransformationsSolidsSummaryMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TransformationsSolidsSummarySorter without throwing', () => {
    const { container } = render(<TransformationsSolidsSummarySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SymmetryTypesSvg, CentralSimilaritySvg, PythagorasThalesSvg, TrigRatiosSvg, BridgeArcSvg, AreaFormulasSvg, CosineLawSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
