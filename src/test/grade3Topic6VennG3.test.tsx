import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { VennG3Theory } from '@/components/math/grade-3/valogatasok-csoportositasok/venn-diagramok-es-halmazok/VennG3Theory';
import { VennG3Quiz, VENN_G3_QUESTIONS } from '@/components/math/grade-3/valogatasok-csoportositasok/venn-diagramok-es-halmazok/VennG3Quiz';
import { VennG3Matcher, VENN_G3_MATCHER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/venn-diagramok-es-halmazok/VennG3Matcher';
import { VennG3Sorter, VENN_G3_SORTER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/venn-diagramok-es-halmazok/VennG3Sorter';
import {
  OneLoopSvg,
  TwoLoopsBlocksSvg,
  RegionNamesSvg,
  NumbersVennSvg,
  ApartLoopsSvg,
  NestedLoopsSvg
} from '@/components/math/grade-3/valogatasok-csoportositasok/venn-diagramok-es-halmazok/VennG3Figures';
import { regionAt, SLOTS, Region } from '@/components/math/grade-3/valogatasok-csoportositasok/venn-diagramok-es-halmazok/VennG3Parts';

describe('Grade 3 Topic VI - 2. Venn-diagramok és halmazok - Components', () => {
  it('renders VennG3Theory without throwing', () => {
    const { container } = render(<VennG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders VennG3Quiz without throwing', () => {
    const { container } = render(<VennG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(VENN_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(VENN_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    VENN_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('every placement slot lies in its own region of the diagram', () => {
    (['overlap', 'apart', 'nested'] as const).forEach((mode) => {
      (Object.keys(SLOTS[mode]) as Region[]).forEach((r) => {
        SLOTS[mode][r].forEach(([x, y]) => {
          const got = regionAt(mode, x, y);
          expect(got).toBe(r);
        });
      });
    });
  });

  it('matcher has 3 levels x 8 pairs, sorter 3 levels x 3 categories x 9 items', () => {
    [1, 2, 3].forEach((l) => {
      expect(VENN_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs).toHaveLength(8);
      const s = VENN_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => expect(s.items.filter((it: any) => it.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('renders VennG3Matcher without throwing', () => {
    const { container } = render(<VennG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders VennG3Sorter without throwing', () => {
    const { container } = render(<VennG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OneLoopSvg, TwoLoopsBlocksSvg, RegionNamesSvg, NumbersVennSvg, ApartLoopsSvg, NestedLoopsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
