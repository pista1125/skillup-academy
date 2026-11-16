import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SolidsPracticeExamTheory } from '@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamTheory';
import { SolidsPracticeExamQuiz } from '@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamQuiz';
import { SolidsPracticeExamMatcher } from '@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamMatcher';
import { SolidsPracticeExamSorter } from '@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamSorter';
import {
  SolidsPracticeExamColumnSvg,
  SolidsPracticeExamFunnelSvg,
  SolidsPracticeExamConeSectorSvg,
  SolidsPracticeExamFountainSvg,
  SolidsPracticeExamBowlSvg,
  SolidsPracticeExamLouvreSvg
} from '@/components/math/grade-12/tergeometria/gyakorlas-tudasproba/SolidsPracticeExamFigures';

describe('Grade 12 Topic I - 18. Gyakorlás, tudáspróba - Components', () => {
  it('renders SolidsPracticeExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsPracticeExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsPracticeExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsPracticeExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<SolidsPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SolidsPracticeExamColumnSvg, SolidsPracticeExamFunnelSvg, SolidsPracticeExamConeSectorSvg, SolidsPracticeExamFountainSvg, SolidsPracticeExamBowlSvg, SolidsPracticeExamLouvreSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
