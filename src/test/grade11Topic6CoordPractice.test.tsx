import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CoordPracticeTheory } from '@/components/math/grade-11/koordinatageometria/gyakorlas-koordinatageometria/CoordPracticeTheory';
import { CoordPracticeQuiz } from '@/components/math/grade-11/koordinatageometria/gyakorlas-koordinatageometria/CoordPracticeQuiz';
import { CoordPracticeMatcher } from '@/components/math/grade-11/koordinatageometria/gyakorlas-koordinatageometria/CoordPracticeMatcher';
import { CoordPracticeSorter } from '@/components/math/grade-11/koordinatageometria/gyakorlas-koordinatageometria/CoordPracticeSorter';
import {
  CoordPracticeVectorsSvg,
  CoordPracticeIsoscelesSvg,
  CoordPracticeAltitudeSvg,
  CoordPracticeCircumcircleSvg,
  CoordPracticeCentroidMinSvg,
  CoordPracticeLinesSvg
} from '@/components/math/grade-11/koordinatageometria/gyakorlas-koordinatageometria/CoordPracticeFigures';

describe('Grade 11 Topic VI - 16. Gyakorlás - Components', () => {
  it('renders CoordPracticeTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CoordPracticeQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CoordPracticeMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CoordPracticeSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CoordPracticeSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      CoordPracticeVectorsSvg,
      CoordPracticeIsoscelesSvg,
      CoordPracticeAltitudeSvg,
      CoordPracticeCircumcircleSvg,
      CoordPracticeCentroidMinSvg,
      CoordPracticeLinesSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
