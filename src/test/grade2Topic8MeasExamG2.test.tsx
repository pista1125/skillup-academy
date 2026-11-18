import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MeasExamG2Theory } from '@/components/math/grade-2/meresek/gyakorlas-tudasproba/MeasExamG2Theory';
import { MeasExamG2Quiz, MEAS_EXAM_G2_QUESTIONS } from '@/components/math/grade-2/meresek/gyakorlas-tudasproba/MeasExamG2Quiz';
import { MeasExamG2Matcher, MEAS_EXAM_G2_MATCHER_LEVELS } from '@/components/math/grade-2/meresek/gyakorlas-tudasproba/MeasExamG2Matcher';
import { MeasExamG2Sorter, MEAS_EXAM_G2_SORTER_LEVELS } from '@/components/math/grade-2/meresek/gyakorlas-tudasproba/MeasExamG2Sorter';
import {
  UnitsOverviewSvg,
  ConversionSvg,
  ToolsSvg,
  MixedUnitsSvg,
} from '@/components/math/grade-2/meresek/gyakorlas-tudasproba/MeasExamG2Figures';
import { makeMixTask } from '@/components/math/grade-2/meresek/gyakorlas-tudasproba/MeasExamG2Parts';

const nums = (s: string) => (s.match(/\d+/g) || []).map(Number);

describe('Grade 2 Topic VIII - 5. Gyakorlás, tudáspróba - Components', () => {
  it('renders MeasExamG2Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<MeasExamG2Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('2. OSZTÁLY • VIII. MÉRÉSEK • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders MeasExamG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MeasExamG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0, distinct options, numbers <= 100, >= 54 figures', () => {
    expect(MEAS_EXAM_G2_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(MEAS_EXAM_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(MEAS_EXAM_G2_QUESTIONS.map((q) => q.id)).size).toBe(90);
    MEAS_EXAM_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
      [String(q.question), ...q.options.map(String), String(q.explanation)].forEach((s) =>
        nums(s).forEach((n) => expect(n).toBeLessThanOrEqual(100))
      );
    });
    expect(MEAS_EXAM_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(54);
  });

  it('mixed lab generator gives 4 distinct options containing the answer, numbers <= 100', () => {
    for (let i = 0; i < 300; i++) {
      const t = makeMixTask();
      expect(t.options).toHaveLength(4);
      expect(new Set(t.options).size).toBe(4);
      expect(t.options).toContain(t.answer);
      [t.text, t.answer, ...t.options].forEach((s) => nums(s).forEach((n) => expect(n).toBeLessThanOrEqual(100)));
    }
  });

  it('renders MeasExamG2Matcher without throwing', () => {
    const { container } = render(<MeasExamG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MeasExamG2Sorter without throwing', () => {
    const { container } = render(<MeasExamG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [UnitsOverviewSvg, ConversionSvg, ToolsSvg, MixedUnitsSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = MEAS_EXAM_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = MEAS_EXAM_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
