import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  GroupingExamTheory,
  makeVennTask,
  makeTruthTask,
  regionOf,
  truthOf,
  sentence,
  PROPS
} from '@/components/math/grade-4/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamTheory';
import { GroupingExamQuiz, GROUPING_EXAM_QUESTIONS } from '@/components/math/grade-4/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamQuiz';
import { GroupingExamMatcher } from '@/components/math/grade-4/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamMatcher';
import { GroupingExamSorter } from '@/components/math/grade-4/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamSorter';
import {
  ChapterMapSvg,
  EvenTripleVennSvg,
  BlocksTableSvg,
  OutfitGridSvg
} from '@/components/math/grade-4/valogatasok-csoportositasok/gyakorlas-tudasproba/GroupingExamFigures';

describe('Grade 4 Topic VI - 5. Gyakorlás, tudáspróba - Components', () => {
  it('renders GroupingExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<GroupingExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders GroupingExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<GroupingExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GroupingExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<GroupingExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GroupingExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<GroupingExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, EvenTripleVennSvg, BlocksTableSvg, OutfitGridSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 4 Topic VI - 5. Gyakorlás, tudáspróba - Logic', () => {
  it('has 90 questions, 30 per level, unique ids, correct answer first, badge everywhere', () => {
    expect(GROUPING_EXAM_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(GROUPING_EXAM_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(GROUPING_EXAM_QUESTIONS.map((q) => q.id)).size).toBe(90);
    GROUPING_EXAM_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    const withFig = GROUPING_EXAM_QUESTIONS.filter((q) => q.figure).length;
    expect(withFig).toBeGreaterThanOrEqual(36);
  });

  it('generators are deterministic and consistent', () => {
    for (let s = 1; s <= 50; s++) {
      const t = makeVennTask(s);
      expect(t.a).not.toBe(t.b);
      expect(makeVennTask(s)).toEqual(t);
      expect(['A', 'AB', 'B', 'O']).toContain(regionOf(t.n, t.a, t.b));
      const u = makeTruthTask(s);
      expect(u.set.length).toBe(5);
      expect(new Set(u.set).size).toBe(5);
      expect(typeof truthOf(u.q, u.p, u.set)).toBe('boolean');
      expect(sentence(u.q, u.p)).toMatch(/eleme/);
    }
    const even = PROPS[0];
    expect(truthOf('mind', even, [2, 4, 6])).toBe(true);
    expect(truthOf('nemmind', even, [2, 4, 7])).toBe(true);
    expect(truthOf('egyiksem', even, [1, 3, 8])).toBe(false);
  });

  it('lab I gives feedback after choosing a region', () => {
    const { getByLabelText, getByText } = render(<GroupingExamTheory />);
    fireEvent.click(getByLabelText('rész AB'));
    expect(getByText(/Új feladat/)).toBeTruthy();
  });
});
