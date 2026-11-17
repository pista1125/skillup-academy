import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MassG3Theory } from '@/components/math/grade-3/meresek/a-tomeg-merese/MassG3Theory';
import { MassG3Quiz, MASS_G3_QUESTIONS } from '@/components/math/grade-3/meresek/a-tomeg-merese/MassG3Quiz';
import { MassG3Matcher, MASS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/meresek/a-tomeg-merese/MassG3Matcher';
import { MassG3Sorter, MASS_G3_SORTER_LEVELS } from '@/components/math/grade-3/meresek/a-tomeg-merese/MassG3Sorter';
import * as Figures from '@/components/math/grade-3/meresek/a-tomeg-merese/MassG3Figures';

describe('Grade 3 Topic IV - 2. A tömeg mérése - Components', () => {
  it('renders MassG3Theory without throwing', () => {
    const { container } = render(<MassG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MassG3Quiz without throwing', () => {
    const { container } = render(<MassG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(MASS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MASS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MASS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MASS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('has 3 matcher levels with 8 pairs and 3 sorter levels with 9 items', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = (MASS_G3_MATCHER_LEVELS as any)[l].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p: any) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p: any) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const items = (MASS_G3_SORTER_LEVELS as any)[l].items;
      expect(items).toHaveLength(9);
      expect((MASS_G3_SORTER_LEVELS as any)[l].categories).toHaveLength(3);
      expect(items.filter((i: any) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders MassG3Matcher without throwing', () => {
    const { container } = render(<MassG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MassG3Sorter without throwing', () => {
    const { container } = render(<MassG3Sorter />);
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
