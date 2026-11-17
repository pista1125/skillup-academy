import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { PolygonsG3Theory } from '@/components/math/grade-3/testek-sikidomok/sikidomok-sokszogek/PolygonsG3Theory';
import { PolygonsG3Quiz, POLYGONS_G3_QUESTIONS } from '@/components/math/grade-3/testek-sikidomok/sikidomok-sokszogek/PolygonsG3Quiz';
import { PolygonsG3Matcher, POLYGONS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/sikidomok-sokszogek/PolygonsG3Matcher';
import { PolygonsG3Sorter, POLYGONS_G3_SORTER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/sikidomok-sokszogek/PolygonsG3Sorter';
import { LinesSvg, PlaneShapesSvg, SidesVerticesSvg, PolygonNamesSvg, RectSquareSvg } from '@/components/math/grade-3/testek-sikidomok/sikidomok-sokszogek/PolygonsG3Figures';
import { SHAPES, straightVertex, selfCrossing, isRect, isSquare } from '@/components/math/grade-3/testek-sikidomok/sikidomok-sokszogek/PolygonsG3Parts';

describe('Grade 3 Topic X - 3. Síkidomok, sokszögek - Components', () => {
  it('renders PolygonsG3Theory without throwing', () => {
    const { container } = render(<PolygonsG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonsG3Quiz without throwing', () => {
    const { container } = render(<PolygonsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(POLYGONS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(POLYGONS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    POLYGONS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('shape data and drawing checks are consistent', () => {
    Object.values(SHAPES).forEach((s) => {
      if (s.pts) {
        expect(s.pts).toHaveLength(s.n);
        expect(straightVertex(s.pts)).toBe(-1);
        expect(selfCrossing(s.pts)).toBe(false);
      } else expect(s.n).toBe(0);
    });
    expect(isRect([[0, 0], [3, 0], [3, 2], [0, 2]])).toBe(true);
    expect(isSquare([[0, 0], [3, 0], [3, 2], [0, 2]])).toBe(false);
    expect(isSquare([[1, 0], [3, 1], [2, 3], [0, 2]])).toBe(true);
    expect(selfCrossing([[0, 0], [2, 2], [2, 0], [0, 2]])).toBe(true);
    expect(straightVertex([[0, 0], [1, 0], [2, 0], [1, 2]])).toBe(1);
  });

  it('matcher has 3 levels x 8 pairs, sorter 3 levels x 3 categories x 9 items', () => {
    [1, 2, 3].forEach((l) => {
      expect(POLYGONS_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs).toHaveLength(8);
      const s = POLYGONS_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => expect(s.items.filter((it: any) => it.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('renders PolygonsG3Matcher without throwing', () => {
    const { container } = render(<PolygonsG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders PolygonsG3Sorter without throwing', () => {
    const { container } = render(<PolygonsG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [LinesSvg, PlaneShapesSvg, SidesVerticesSvg, PolygonNamesSvg, RectSquareSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
