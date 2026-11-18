import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Sub20G2Theory } from '@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Theory';
import { Sub20G2Quiz, SUB20_G2_QUESTIONS } from '@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Quiz';
import { Sub20G2Matcher, SUB20_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Matcher';
import { Sub20G2Sorter, SUB20_G2_SORTER_LEVELS } from '@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Sorter';
import {
  ReachTenAndSubTenSvg,
  AnalogySubNoCrossSvg,
  BridgingDownTwentyFrameSvg,
  ThreeStrategiesLineSvg,
  RadialTwentyWheelSvg,
  ArrowChainSubSvg
} from '@/components/math/grade-2/szamolas-20-ig/kivonas-20-as-szamkor/Sub20G2Figures';

describe('Grade 2 Topic I - 5. Kivonás 20-as számkör - Components', () => {
  it('renders Sub20G2Theory without throwing', () => {
    const { container } = render(<Sub20G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Sub20G2Quiz without throwing', () => {
    const { container } = render(<Sub20G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, and distinct options', () => {
    expect(SUB20_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SUB20_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    SUB20_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      const textBlob = `${q.question || ''} ${q.explanation} ${q.options.map(String).join(' ')}`;
      expect(textBlob).not.toMatch(/[·$]/);
      expect(textBlob).not.toMatch(/\d\s*[:/]\s*\d/);
    });
    expect(new Set(SUB20_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders Sub20G2Matcher without throwing', () => {
    const { container } = render(<Sub20G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Sub20G2Sorter without throwing', () => {
    const { container } = render(<Sub20G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      ReachTenAndSubTenSvg,
      AnalogySubNoCrossSvg,
      BridgingDownTwentyFrameSvg,
      ThreeStrategiesLineSvg,
      RadialTwentyWheelSvg,
      ArrowChainSubSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = SUB20_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      const items = SUB20_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
