import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SolidsG3Theory } from '@/components/math/grade-3/testek-sikidomok/a-testek/SolidsG3Theory';
import { SolidsG3Quiz, SOLIDS_G3_QUESTIONS } from '@/components/math/grade-3/testek-sikidomok/a-testek/SolidsG3Quiz';
import { SolidsG3Matcher, SOLIDS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/a-testek/SolidsG3Matcher';
import { SolidsG3Sorter, SOLIDS_G3_SORTER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/a-testek/SolidsG3Sorter';
import { SolidsAroundUsSvg, SolidFacesSvg, FlatOrCurvedSvg, BuildingPlanSvg } from '@/components/math/grade-3/testek-sikidomok/a-testek/SolidsG3Figures';
import { SOLID_INFO, SOLID_KINDS, planTotal } from '@/components/math/grade-3/testek-sikidomok/a-testek/SolidsG3Parts';

describe('Grade 3 Topic X - 1. A testek - Components', () => {
  it('renders SolidsG3Theory without throwing', () => {
    const { container } = render(<SolidsG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsG3Quiz without throwing', () => {
    const { container } = render(<SolidsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(SOLIDS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SOLIDS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SOLIDS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('solid data is consistent', () => {
    expect(SOLID_KINDS).toHaveLength(9);
    expect(SOLID_INFO.kocka.faces).toHaveLength(6);
    expect(SOLID_INFO.henger.faces.filter((f) => f === 'kor')).toHaveLength(2);
    expect(SOLID_INFO.gomb.faces).toHaveLength(0);
    expect(planTotal([[3, 2, 1], [2, 1, 1]])).toBe(10);
  });

  it('matcher has 3 levels x 8 pairs, sorter 3 levels x 3 categories x 9 items', () => {
    [1, 2, 3].forEach((l) => {
      expect(SOLIDS_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs).toHaveLength(8);
      const s = SOLIDS_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => expect(s.items.filter((it: any) => it.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('renders SolidsG3Matcher without throwing', () => {
    const { container } = render(<SolidsG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders SolidsG3Sorter without throwing', () => {
    const { container } = render(<SolidsG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [SolidsAroundUsSvg, SolidFacesSvg, FlatOrCurvedSvg, BuildingPlanSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
