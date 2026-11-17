import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AreaG3Theory } from '@/components/math/grade-3/meresek/a-terulet-merese/AreaG3Theory';
import { AreaG3Quiz, AREA_G3_QUESTIONS } from '@/components/math/grade-3/meresek/a-terulet-merese/AreaG3Quiz';
import { AreaG3Matcher, AREA_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/a-terulet-merese/AreaG3Matcher';
import { AreaG3Sorter, AREA_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/a-terulet-merese/AreaG3Sorter';
import { randomShape, isConnected, makeAreaCompareTask, S, areaOf, splitHalves } from '@/components/math/grade-3/meresek/a-terulet-merese/AreaG3Parts';
import {
  AreaWhatIsSvg,
  AreaUnitsSvg,
  AreaCompareSvg,
  AreaHalvesSvg,
  AreaTrianglesSvg,
  AreaVsPerimeterSvg
} from '@/components/math/grade-3/meresek/a-terulet-merese/AreaG3Figures';

describe('Grade 3 Topic IV - 7. A terület mérése - Components', () => {
  it('renders AreaG3Theory with the right badge', () => {
    const { container } = render(<AreaG3Theory />);
    expect(container.textContent).toContain('3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG');
  });

  it('renders AreaG3Quiz without throwing', () => {
    expect(render(<AreaG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(AREA_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(AREA_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    AREA_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(AREA_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(AREA_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels × 8 pairs, at least 4 with a figure; sorter: 3 × 3 × 9', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = AREA_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.value))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const cfg = AREA_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      cfg.categories.forEach((c) => expect(cfg.items.filter((i) => i.categoryId === c.id)).toHaveLength(9));
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(11);
    });
  });

  it('shape helpers: areas used in the cards are right', () => {
    expect(areaOf(S('###'), [[0, 1, 'tr'], [2, 1, 'tl']])).toBe(4);
    expect(areaOf([], splitHalves(S('###|###')))).toBe(6);
    expect(S('.##.|####|.###')).toHaveLength(9);
  });

  it('lab generators make connected shapes of the right size', () => {
    for (let n = 4; n <= 12; n++) {
      for (let i = 0; i < 50; i++) {
        const sh = randomShape(n, 4, 4);
        expect(sh).toHaveLength(n);
        expect(isConnected(sh)).toBe(true);
        sh.forEach(([c, r]) => {
          expect(c).toBeLessThan(4);
          expect(r).toBeLessThan(4);
        });
      }
    }
    for (let i = 0; i < 100; i++) {
      const t = makeAreaCompareTask();
      expect(t.a.length).toBeGreaterThanOrEqual(4);
      expect(t.b.length).toBeLessThanOrEqual(12);
    }
  });

  it('renders AreaG3Matcher and Sorter without throwing', () => {
    expect(render(<AreaG3Matcher />).container).toBeTruthy();
    expect(render(<AreaG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [AreaWhatIsSvg, AreaUnitsSvg, AreaCompareSvg, AreaHalvesSvg, AreaTrianglesSvg, AreaVsPerimeterSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
