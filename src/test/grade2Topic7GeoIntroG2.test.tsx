import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GeoIntroG2Theory } from '@/components/math/grade-2/geometria/bevezeto/GeoIntroG2Theory';
import { GeoIntroG2Quiz, GEO_INTRO_G2_QUESTIONS } from '@/components/math/grade-2/geometria/bevezeto/GeoIntroG2Quiz';
import { GeoIntroG2Matcher, GEO_INTRO_G2_MATCHER_LEVELS } from '@/components/math/grade-2/geometria/bevezeto/GeoIntroG2Matcher';
import { GeoIntroG2Sorter, GEO_INTRO_G2_SORTER_LEVELS } from '@/components/math/grade-2/geometria/bevezeto/GeoIntroG2Sorter';
import {
  PositionSceneSvg,
  QueueSvg,
  GridWalkSvg,
  TableCodesSvg,
  LinesSvg,
  OpenClosedSvg,
  LogicSetSvg,
  LogicChainSvg,
} from '@/components/math/grade-2/geometria/bevezeto/GeoIntroG2Figures';

describe('Grade 2 Topic VII - 1. Tájékozódás, vonalak, logikai lapok - Components', () => {
  it('renders GeoIntroG2Theory without throwing', () => {
    const { container } = render(<GeoIntroG2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders GeoIntroG2Quiz without throwing', () => {
    const { container } = render(<GeoIntroG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(GEO_INTRO_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(GEO_INTRO_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    GEO_INTRO_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(GEO_INTRO_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(GEO_INTRO_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('renders GeoIntroG2Matcher without throwing', () => {
    const { container } = render(<GeoIntroG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders GeoIntroG2Sorter without throwing', () => {
    const { container } = render(<GeoIntroG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PositionSceneSvg, QueueSvg, GridWalkSvg, TableCodesSvg, LinesSvg, OpenClosedSvg, LogicSetSvg, LogicChainSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = GEO_INTRO_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = GEO_INTRO_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
