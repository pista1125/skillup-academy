import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MassG2Theory } from '@/components/math/grade-2/meresek/tomeg-meres/MassG2Theory';
import { MassG2Quiz, MASS_G2_QUESTIONS } from '@/components/math/grade-2/meresek/tomeg-meres/MassG2Quiz';
import { MassG2Matcher, MASS_G2_MATCHER_LEVELS } from '@/components/math/grade-2/meresek/tomeg-meres/MassG2Matcher';
import { MassG2Sorter, MASS_G2_SORTER_LEVELS } from '@/components/math/grade-2/meresek/tomeg-meres/MassG2Sorter';
import {
  BalanceStatesSvg,
  SeesawSvg,
  KgExamplesSvg,
  ScaleTypesSvg,
  FeatherIronSvg,
} from '@/components/math/grade-2/meresek/tomeg-meres/MassG2Figures';

describe('Grade 2 Topic VIII - 2. A tömeg mérése - Components', () => {
  it('renders MassG2Theory without throwing', () => {
    const { container } = render(<MassG2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MassG2Quiz without throwing', () => {
    const { container } = render(<MassG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(MASS_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MASS_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MASS_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MASS_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(MASS_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders MassG2Matcher without throwing', () => {
    const { container } = render(<MassG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MassG2Sorter without throwing', () => {
    const { container } = render(<MassG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      BalanceStatesSvg,
      SeesawSvg,
      KgExamplesSvg,
      ScaleTypesSvg,
      FeatherIronSvg,
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = MASS_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = MASS_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
