import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SortingByPropertyG3Theory } from '@/components/math/grade-3/valogatasok-csoportositasok/valogatas-tulajdonsagok-szerint/SortingByPropertyG3Theory';
import { SortingByPropertyG3Quiz, SORTING_BY_PROPERTY_G3_QUESTIONS } from '@/components/math/grade-3/valogatasok-csoportositasok/valogatas-tulajdonsagok-szerint/SortingByPropertyG3Quiz';
import { SortingByPropertyG3Matcher, SORTING_BY_PROPERTY_G3_MATCHER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/valogatas-tulajdonsagok-szerint/SortingByPropertyG3Matcher';
import { SortingByPropertyG3Sorter, SORTING_BY_PROPERTY_G3_SORTER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/valogatas-tulajdonsagok-szerint/SortingByPropertyG3Sorter';
import {
  LogicSetSvg,
  OnePropertySortSvg,
  TwoPropertiesSvg,
  OddOneOutSvg,
  SortingTreeSvg,
  NumberLabelsSvg
} from '@/components/math/grade-3/valogatasok-csoportositasok/valogatas-tulajdonsagok-szerint/SortingByPropertyG3Figures';
import { ALL_BLOCKS } from '@/components/math/grade-3/valogatasok-csoportositasok/valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';

describe('Grade 3 Topic VI - 1. Válogatás tulajdonságok szerint - Components', () => {
  it('renders SortingByPropertyG3Theory without throwing', () => {
    const { container } = render(<SortingByPropertyG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders SortingByPropertyG3Quiz without throwing', () => {
    const { container } = render(<SortingByPropertyG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(SORTING_BY_PROPERTY_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SORTING_BY_PROPERTY_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SORTING_BY_PROPERTY_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('logic block set has 48 different blocks', () => {
    expect(ALL_BLOCKS).toHaveLength(48);
    expect(new Set(ALL_BLOCKS.map((b) => JSON.stringify(b))).size).toBe(48);
  });

  it('matcher has 3 levels x 8 pairs, sorter 3 levels x 3 categories x 9 items', () => {
    [1, 2, 3].forEach((l) => {
      expect(SORTING_BY_PROPERTY_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs).toHaveLength(8);
      const s = SORTING_BY_PROPERTY_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => expect(s.items.filter((it: any) => it.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('renders SortingByPropertyG3Matcher without throwing', () => {
    const { container } = render(<SortingByPropertyG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders SortingByPropertyG3Sorter without throwing', () => {
    const { container } = render(<SortingByPropertyG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LogicSetSvg, OnePropertySortSvg, TwoPropertiesSvg, OddOneOutSvg, SortingTreeSvg, NumberLabelsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
