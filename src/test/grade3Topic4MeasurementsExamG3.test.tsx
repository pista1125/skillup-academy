import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MeasurementsExamG3Theory } from '@/components/math/grade-3/meresek/gyakorlas-tudasproba/MeasurementsExamG3Theory';
import { MeasurementsExamG3Quiz, MEASUREMENTS_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/meresek/gyakorlas-tudasproba/MeasurementsExamG3Quiz';
import { MeasurementsExamG3Matcher, MEASUREMENTS_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/gyakorlas-tudasproba/MeasurementsExamG3Matcher';
import { MeasurementsExamG3Sorter, MEASUREMENTS_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/gyakorlas-tudasproba/MeasurementsExamG3Sorter';
import {
  UnitsOverviewSvg,
  ToolsSvg,
  ConversionSvg,
  PerimeterAreaSvg,
  RectSidesSvg
} from '@/components/math/grade-3/meresek/gyakorlas-tudasproba/MeasurementsExamG3Figures';

describe('Grade 3 Topic IV - 10. Gyakorlás, tudáspróba - Components', () => {
  it('renders MeasurementsExamG3Theory without throwing', () => {
    const { container } = render(<MeasurementsExamG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsExamG3Quiz without throwing', () => {
    const { container } = render(<MeasurementsExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(MEASUREMENTS_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(MEASUREMENTS_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    MEASUREMENTS_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = MEASUREMENTS_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = MEASUREMENTS_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders MeasurementsExamG3Matcher without throwing', () => {
    const { container } = render(<MeasurementsExamG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MeasurementsExamG3Sorter without throwing', () => {
    const { container } = render(<MeasurementsExamG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [UnitsOverviewSvg, ToolsSvg, ConversionSvg, PerimeterAreaSvg, RectSidesSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
