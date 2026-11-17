import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PerimeterG3Theory } from '@/components/math/grade-3/meresek/a-kerulet-merese/PerimeterG3Theory';
import { PerimeterG3Quiz, PERIMETER_G3_QUESTIONS } from '@/components/math/grade-3/meresek/a-kerulet-merese/PerimeterG3Quiz';
import { PerimeterG3Matcher } from '@/components/math/grade-3/meresek/a-kerulet-merese/PerimeterG3Matcher';
import { PerimeterG3Sorter } from '@/components/math/grade-3/meresek/a-kerulet-merese/PerimeterG3Sorter';
import {
  WalkAroundSvg,
  UnfoldSidesSvg,
  GridPerimeterSvg,
  SticksShapesSvg,
  GardenSvg
} from '@/components/math/grade-3/meresek/a-kerulet-merese/PerimeterG3Figures';
import { countBoundary, traceBoundary } from '@/components/math/grade-3/meresek/a-kerulet-merese/PerimeterG3Parts';

describe('Grade 3 Topic IV - 5. A kerület mérése - Components', () => {
  it('renders PerimeterG3Theory without throwing', () => {
    const { container } = render(<PerimeterG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders PerimeterG3Quiz without throwing', () => {
    const { container } = render(<PerimeterG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(PERIMETER_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(PERIMETER_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    PERIMETER_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('counts and traces grid-shape boundaries correctly', () => {
    const plus: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
    expect(countBoundary(plus)).toBe(12);
    expect(traceBoundary(plus)).toHaveLength(12);
    const stairs: [number, number][] = [[1, 0], [1, 1], [2, 1], [1, 2], [2, 2], [3, 2]];
    expect(countBoundary(stairs)).toBe(12);
    expect(traceBoundary(stairs)).toHaveLength(12);
  });

  it('renders PerimeterG3Matcher without throwing', () => {
    const { container } = render(<PerimeterG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders PerimeterG3Sorter without throwing', () => {
    const { container } = render(<PerimeterG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WalkAroundSvg, UnfoldSidesSvg, GridPerimeterSvg, SticksShapesSvg, GardenSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
