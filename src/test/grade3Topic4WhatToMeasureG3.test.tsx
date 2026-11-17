import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WhatToMeasureG3Theory } from '@/components/math/grade-3/meresek/mit-mivel-merunk/WhatToMeasureG3Theory';
import { WhatToMeasureG3Quiz, WHAT_TO_MEASURE_G3_QUESTIONS } from '@/components/math/grade-3/meresek/mit-mivel-merunk/WhatToMeasureG3Quiz';
import { WhatToMeasureG3Matcher, WHAT_TO_MEASURE_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/mit-mivel-merunk/WhatToMeasureG3Matcher';
import { WhatToMeasureG3Sorter, WHAT_TO_MEASURE_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/mit-mivel-merunk/WhatToMeasureG3Sorter';
import * as Figures from '@/components/math/grade-3/meresek/mit-mivel-merunk/WhatToMeasureG3Figures';

describe('Grade 3 Topic IV - 1. Mit mivel mérünk? - Components', () => {
  it('renders WhatToMeasureG3Theory without throwing', () => {
    const { container } = render(<WhatToMeasureG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders WhatToMeasureG3Quiz without throwing', () => {
    const { container } = render(<WhatToMeasureG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(WHAT_TO_MEASURE_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WHAT_TO_MEASURE_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    WHAT_TO_MEASURE_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(WHAT_TO_MEASURE_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('has 3 matcher levels with 8 pairs and 3 sorter levels with 9 items', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = (WHAT_TO_MEASURE_G3_MATCHER_LEVELS as any)[l].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p: any) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p: any) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const items = (WHAT_TO_MEASURE_G3_SORTER_LEVELS as any)[l].items;
      expect(items).toHaveLength(9);
      expect((WHAT_TO_MEASURE_G3_SORTER_LEVELS as any)[l].categories).toHaveLength(3);
      expect(items.filter((i: any) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders WhatToMeasureG3Matcher without throwing', () => {
    const { container } = render(<WhatToMeasureG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WhatToMeasureG3Sorter without throwing', () => {
    const { container } = render(<WhatToMeasureG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figs = Object.values(Figures).filter((f) => typeof f === 'function') as React.FC[];
    expect(figs.length).toBeGreaterThanOrEqual(3);
    figs.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
