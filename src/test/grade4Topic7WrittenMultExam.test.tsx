import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenMultExamTheory, makeExamTask } from '@/components/math/grade-4/irasbeli-szorzas/gyakorlas-tudasproba/WrittenMultExamTheory';
import { WrittenMultExamQuiz } from '@/components/math/grade-4/irasbeli-szorzas/gyakorlas-tudasproba/WrittenMultExamQuiz';
import { WrittenMultExamMatcher } from '@/components/math/grade-4/irasbeli-szorzas/gyakorlas-tudasproba/WrittenMultExamMatcher';
import { WrittenMultExamSorter } from '@/components/math/grade-4/irasbeli-szorzas/gyakorlas-tudasproba/WrittenMultExamSorter';
import {
  ChapterMapSvg,
  BuffetPriceSvg,
  ForestTrainSvg,
  OrchardSvg,
  ErrorHuntSvg,
  ArrowCycleSvg,
  ERROR_HUNT
} from '@/components/math/grade-4/irasbeli-szorzas/gyakorlas-tudasproba/WrittenMultExamFigures';

describe('Grade 4 Topic VII - 4. Gyakorlás, tudáspróba - Components', () => {
  it('renders WrittenMultExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenMultExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMultExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenMultExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMultExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenMultExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenMultExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenMultExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ChapterMapSvg, BuffetPriceSvg, ForestTrainSvg, OrchardSvg, ErrorHuntSvg, ArrowCycleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('generates valid mixed tasks and correct error-hunt data', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const t = makeExamTask(seed);
      expect(t.options).toContain(t.answer);
      expect(new Set(t.options).size).toBe(4);
      expect(t.answer).toBeLessThanOrEqual(9999);
      expect(t.answer).toBeGreaterThan(0);
    }
    const evalTask = (s: string) => {
      const expr = s.replace(/·/g, '*').replace(/−/g, '-');
      return expr
        .split('-')
        .map((part) => part.split('+').map((x) => x.split('*').reduce((p, v) => p * Number(v), 1)).reduce((p, v) => p + v, 0))
        .reduce((p, v, i) => (i === 0 ? v : p - v));
    };
    ERROR_HUNT.forEach((r) => expect(evalTask(r.task)).toBe(r.real));
  });
});
