import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RectAreaG3Theory } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-terulete/RectAreaG3Theory';
import { RectAreaG3Quiz, RECT_AREA_G3_QUESTIONS } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-terulete/RectAreaG3Quiz';
import { RectAreaG3Matcher, RECT_AREA_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-terulete/RectAreaG3Matcher';
import { RectAreaG3Sorter, RECT_AREA_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-terulete/RectAreaG3Sorter';
import { makeRectAreaTask, rectsWithArea, RECT_TARGETS } from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-terulete/RectAreaG3Parts';
import {
  RectRowsSvg,
  RectPartialSvg,
  RectSquaresSvg,
  RectTilesSvg,
  RectSame12Svg,
  RectBorderSvg
} from '@/components/math/grade-3/meresek/a-teglalap-es-a-negyzet-terulete/RectAreaG3Figures';

describe('Grade 3 Topic IV - 8. A téglalap és a négyzet területe - Components', () => {
  it('renders RectAreaG3Theory with the right badge', () => {
    const { container } = render(<RectAreaG3Theory />);
    expect(container.textContent).toContain('3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG');
  });

  it('renders RectAreaG3Quiz without throwing', () => {
    expect(render(<RectAreaG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(RECT_AREA_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(RECT_AREA_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    RECT_AREA_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(RECT_AREA_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(RECT_AREA_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels × 8 pairs, at least 4 with a figure; sorter: 3 × 3 × 9', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = RECT_AREA_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.value))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const cfg = RECT_AREA_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      cfg.categories.forEach((c) => {
        const items = cfg.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('lab II generator: the right answer is rows · cols and options are distinct', () => {
    for (let i = 0; i < 300; i++) {
      const t = makeRectAreaTask();
      expect(t.ans).toBe(t.rows * t.cols);
      expect(t.options.some((o) => o.v === t.ans)).toBe(true);
      expect(new Set(t.options.map((o) => o.v)).size).toBe(t.options.length);
      expect(t.options.length).toBe(4);
      t.options.forEach((o) => expect(o.v).toBeGreaterThan(0));
    }
  });

  it('lab I targets can all be built in more than one way', () => {
    RECT_TARGETS.forEach((n) => expect(rectsWithArea(n).length).toBeGreaterThanOrEqual(2));
  });

  it('renders RectAreaG3Matcher and Sorter without throwing', () => {
    expect(render(<RectAreaG3Matcher />).container).toBeTruthy();
    expect(render(<RectAreaG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [RectRowsSvg, RectPartialSvg, RectSquaresSvg, RectTilesSvg, RectSame12Svg, RectBorderSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
