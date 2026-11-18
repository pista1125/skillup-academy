import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ShapesG2Theory } from '@/components/math/grade-2/geometria/testek-sikidomok/ShapesG2Theory';
import { ShapesG2Quiz, SHAPES_G2_QUESTIONS } from '@/components/math/grade-2/geometria/testek-sikidomok/ShapesG2Quiz';
import { ShapesG2Matcher, SHAPES_G2_MATCHER_LEVELS } from '@/components/math/grade-2/geometria/testek-sikidomok/ShapesG2Matcher';
import { ShapesG2Sorter, SHAPES_G2_SORTER_LEVELS } from '@/components/math/grade-2/geometria/testek-sikidomok/ShapesG2Sorter';
import {
  SolidVsFlatSvg,
  SolidsGallerySvg,
  FacesPrintSvg,
  FlatShapesSvg,
  SideCornerSvg,
  CubeBuildSvg,
} from '@/components/math/grade-2/geometria/testek-sikidomok/ShapesG2Figures';

describe('Grade 2 Topic VII - 2. Testek, síkidomok - Components', () => {
  it('renders ShapesG2Theory without throwing', () => {
    const { container } = render(<ShapesG2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders ShapesG2Quiz without throwing', () => {
    const { container } = render(<ShapesG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(SHAPES_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SHAPES_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SHAPES_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(SHAPES_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(SHAPES_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders ShapesG2Matcher without throwing', () => {
    const { container } = render(<ShapesG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders ShapesG2Sorter without throwing', () => {
    const { container } = render(<ShapesG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SolidVsFlatSvg, SolidsGallerySvg, FacesPrintSvg, FlatShapesSvg, SideCornerSvg, CubeBuildSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = SHAPES_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = SHAPES_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
