import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Sub100G2Theory } from '@/components/math/grade-2/szamolas-100-ig/kivonas-100-as-szamkor/Sub100G2Theory';
import { Sub100G2Quiz, SUB100_G2_QUESTIONS } from '@/components/math/grade-2/szamolas-100-ig/kivonas-100-as-szamkor/Sub100G2Quiz';
import { Sub100G2Matcher, SUB100_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szamolas-100-ig/kivonas-100-as-szamkor/Sub100G2Matcher';
import { Sub100G2Sorter, SUB100_G2_SORTER_LEVELS } from '@/components/math/grade-2/szamolas-100-ig/kivonas-100-as-szamkor/Sub100G2Sorter';
import {
  NoCrossSubSvg,
  RoundTenSubSvg,
  BridgeBackSvg,
  RodBreakSvg,
  TensThenOnesBackSvg,
  CheckWithAddSvg,
} from '@/components/math/grade-2/szamolas-100-ig/kivonas-100-as-szamkor/Sub100G2Figures';

describe('Grade 2 Topic III - 3. Kivonás 100-as számkör - Components', () => {
  it('renders Sub100G2Theory without throwing', () => {
    const { container } = render(<Sub100G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Sub100G2Quiz without throwing', () => {
    const { container } = render(<Sub100G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(SUB100_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SUB100_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SUB100_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(SUB100_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(SUB100_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders Sub100G2Matcher without throwing', () => {
    const { container } = render(<Sub100G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Sub100G2Sorter without throwing', () => {
    const { container } = render(<Sub100G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NoCrossSubSvg, RoundTenSubSvg, BridgeBackSvg, RodBreakSvg, TensThenOnesBackSvg, CheckWithAddSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = SUB100_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = SUB100_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
