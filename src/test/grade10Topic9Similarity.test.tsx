import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SimilarityTheory } from '@/components/math/grade-10/hasonlosag/hasonlosag/SimilarityTheory';
import { SimilarityQuiz } from '@/components/math/grade-10/hasonlosag/hasonlosag/SimilarityQuiz';
import { SimilarityMatcher } from '@/components/math/grade-10/hasonlosag/hasonlosag/SimilarityMatcher';
import { SimilaritySorter } from '@/components/math/grade-10/hasonlosag/hasonlosag/SimilaritySorter';
import {
  SimilarityCompositionSvg,
  RectanglePartitionSvg,
  PerimeterAreaScaleSvg,
  PyramidLayersSvg,
  ScaleMapBlueprintSvg
} from '@/components/math/grade-10/hasonlosag/hasonlosag/SimilarityFigures';

describe('Grade 10 Topic IX - 4. Hasonlóság - Components', () => {
  it('renders SimilarityTheory without throwing', () => {
    const { container } = render(<SimilarityTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarityQuiz without throwing', () => {
    const { container } = render(<SimilarityQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SimilarityMatcher without throwing', () => {
    const { container } = render(<SimilarityMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SimilaritySorter without throwing', () => {
    const { container } = render(<SimilaritySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<SimilarityCompositionSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<RectanglePartitionSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<PerimeterAreaScaleSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<PyramidLayersSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<ScaleMapBlueprintSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });

  it('renders SimilarityQuiz with matcher mode without blank screen and starts level', () => {
    const { container, getAllByText } = render(<SimilarityQuiz initialGameMode="matcher" />);
    expect(container.textContent).toContain('Párosító játék');
    expect(container.textContent).toContain('1. Szint');

    // Click into Level 2 (as seen in user screenshot)
    const startBtns = getAllByText(/Párosító Indítása/i);
    expect(startBtns.length).toBeGreaterThan(0);
    fireEvent.click(startBtns[1]); // Level 2

    // Now the matcher workspace should be rendered, not blank!
    expect(container.textContent).toContain('2. szint');
    expect(container.textContent).toContain('0 / 8 pár');
  });

  it('renders SimilarityQuiz with sorter mode without blank screen and starts level', () => {
    const { container, getAllByText } = render(<SimilarityQuiz initialGameMode="sorter" />);
    expect(container.textContent).toContain('Csoportosító játék');
    expect(container.textContent).toContain('1. Szint');

    // Click into Level 1
    const startBtns = getAllByText(/Csoportosító Indítása/i);
    expect(startBtns.length).toBeGreaterThan(0);
    fireEvent.click(startBtns[0]); // Level 1

    // Now the sorter workspace should be rendered, not blank!
    expect(container.textContent).toContain('1. szint');
    expect(container.textContent).toContain('12 db maradt');
  });

  it('renders SimilarityMatcher on all 3 difficulty levels with cards', () => {
    for (const lvl of [1, 2, 3] as const) {
      const { container } = render(<SimilarityMatcher level={lvl} currentLevel={lvl} />);
      expect(container.textContent).toContain(`${lvl}. szint`);
    }
  });

  it('renders SimilaritySorter on all 3 difficulty levels with categories', () => {
    for (const lvl of [1, 2, 3] as const) {
      const { container } = render(<SimilaritySorter level={lvl} currentLevel={lvl} />);
      expect(container.textContent).toContain(`${lvl}. szint`);
    }
  });
});

