import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Sub10G2Theory } from '@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Theory';
import { Sub10G2Quiz, SUB10_G2_QUESTIONS } from '@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Quiz';
import { Sub10G2Matcher, SUB10_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Matcher';
import { Sub10G2Sorter, SUB10_G2_SORTER_LEVELS } from '@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Sorter';
import {
  CrossedDiscsSubSvg,
  BeadStringSubSvg,
  FactFamilyCardSvg,
  BackwardJumpLineSvg,
  RadialTenWheelSvg
} from '@/components/math/grade-2/szamolas-20-ig/kivonas-10-es-szamkor/Sub10G2Figures';

describe('Grade 2 Topic I - 3. Kivonás 10-es számkör - Components', () => {
  it('renders Sub10G2Theory without throwing', () => {
    const { container } = render(<Sub10G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Sub10G2Quiz without throwing', () => {
    const { container } = render(<Sub10G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, distinct options, and ~60-70% figures', () => {
    expect(SUB10_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SUB10_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SUB10_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(SUB10_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    const withFigure = SUB10_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length;
    expect(withFigure).toBeGreaterThanOrEqual(18);
  });

  it('renders Sub10G2Matcher without throwing', () => {
    const { container } = render(<Sub10G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Sub10G2Sorter without throwing', () => {
    const { container } = render(<Sub10G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      CrossedDiscsSubSvg,
      BeadStringSubSvg,
      FactFamilyCardSvg,
      BackwardJumpLineSvg,
      RadialTenWheelSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = SUB10_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) =>
        expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true)
      );
      const items = SUB10_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
