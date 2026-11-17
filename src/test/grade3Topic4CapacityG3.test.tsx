import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CapacityG3Theory } from '@/components/math/grade-3/meresek/az-urtartalom-merese/CapacityG3Theory';
import { CapacityG3Quiz, CAPACITY_G3_QUESTIONS } from '@/components/math/grade-3/meresek/az-urtartalom-merese/CapacityG3Quiz';
import { CapacityG3Matcher, CAPACITY_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/az-urtartalom-merese/CapacityG3Matcher';
import { CapacityG3Sorter, CAPACITY_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/az-urtartalom-merese/CapacityG3Sorter';
import * as Figures from '@/components/math/grade-3/meresek/az-urtartalom-merese/CapacityG3Figures';

describe('Grade 3 Topic IV - 3. Az űrtartalom mérése - Components', () => {
  it('renders CapacityG3Theory without throwing', () => {
    const { container } = render(<CapacityG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders CapacityG3Quiz without throwing', () => {
    const { container } = render(<CapacityG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(CAPACITY_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(CAPACITY_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    CAPACITY_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(CAPACITY_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('has 3 matcher levels with 8 pairs and 3 sorter levels with 9 items', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = (CAPACITY_G3_MATCHER_LEVELS as any)[l].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p: any) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p: any) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const items = (CAPACITY_G3_SORTER_LEVELS as any)[l].items;
      expect(items).toHaveLength(9);
      expect((CAPACITY_G3_SORTER_LEVELS as any)[l].categories).toHaveLength(3);
      expect(items.filter((i: any) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders CapacityG3Matcher without throwing', () => {
    const { container } = render(<CapacityG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders CapacityG3Sorter without throwing', () => {
    const { container } = render(<CapacityG3Sorter />);
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
