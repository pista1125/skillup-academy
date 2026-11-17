import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GroupingExamG3Theory } from '@/components/math/grade-3/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamG3Theory';
import { GroupingExamG3Quiz, GROUPING_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamG3Quiz';
import { GroupingExamG3Matcher, GROUPING_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamG3Matcher';
import { GroupingExamG3Sorter, GROUPING_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamG3Sorter';
import { ChapterMapSvg, BlockSignsSvg, VennPartsSvg, CountingRecapSvg, QuantifiersSvg } from '@/components/math/grade-3/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamG3Figures';

describe('Grade 3 Topic VI - 4. Gyakorlás, tudáspróba - Components', () => {
  it('renders GroupingExamG3Theory without throwing', () => {
    const { container } = render(<GroupingExamG3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<GroupingExamG3Theory />);
    expect(getAllByText(/VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK/).length).toBeGreaterThan(0);
  });

  it('renders GroupingExamG3Quiz without throwing', () => {
    const { container } = render(<GroupingExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has a figure on most questions of every level', () => {
    [1, 2, 3].forEach((l) => {
      const qs = GROUPING_EXAM_G3_QUESTIONS.filter((q) => q.level === l);
      expect(qs.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
    });
  });

  it('has 90 questions, 30 per level, each with a badge and distinct options', () => {
    expect(GROUPING_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(GROUPING_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    GROUPING_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(GROUPING_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = GROUPING_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 3 categories x 9 items, at least 4 figures per category', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = GROUPING_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      cfg.categories.forEach((c) => {
        const items = cfg.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('renders GroupingExamG3Matcher without throwing', () => {
    const { container } = render(<GroupingExamG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders GroupingExamG3Sorter without throwing', () => {
    const { container } = render(<GroupingExamG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, BlockSignsSvg, VennPartsSvg, CountingRecapSvg, QuantifiersSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
