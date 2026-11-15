import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SimilarityPracticeExamTheory } from '@/components/math/grade-10/hasonlosag/gyakorlas-tudasproba/SimilarityPracticeExamTheory';
import { SimilarityPracticeExamQuiz } from '@/components/math/grade-10/hasonlosag/gyakorlas-tudasproba/SimilarityPracticeExamQuiz';
import { SimilarityPracticeExamMatcher } from '@/components/math/grade-10/hasonlosag/gyakorlas-tudasproba/SimilarityPracticeExamMatcher';
import { SimilarityPracticeExamSorter } from '@/components/math/grade-10/hasonlosag/gyakorlas-tudasproba/SimilarityPracticeExamSorter';
import {
  SynthesisConceptMapSvg,
  HexagonTrianglesSimilaritySvg,
  MirrorReflectionMeasurementSvg,
  TruncatedPyramidSectionsSvg,
  PyraminxSimilaritySvg
} from '@/components/math/grade-10/hasonlosag/gyakorlas-tudasproba/SimilarityPracticeExamFigures';

describe('Grade 10 Topic IX - 11. Gyakorlás, tudáspróba - Components', () => {
  it('renders SimilarityPracticeExamTheory without throwing', () => {
    const { container } = render(<SimilarityPracticeExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarityPracticeExamQuiz without throwing', () => {
    const { container } = render(<SimilarityPracticeExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarityPracticeExamMatcher without throwing', () => {
    const { container } = render(<SimilarityPracticeExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarityPracticeExamSorter without throwing', () => {
    const { container } = render(<SimilarityPracticeExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<SynthesisConceptMapSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<HexagonTrianglesSimilaritySvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<MirrorReflectionMeasurementSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<TruncatedPyramidSectionsSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<PyraminxSimilaritySvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

