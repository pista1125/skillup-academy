import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AddSub200G3Theory } from '@/components/math/grade-3/szamolas-200-ig/osszeadas-es-kivonas/AddSub200G3Theory';
import { AddSub200G3Quiz, ADD_SUB_200_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-200-ig/osszeadas-es-kivonas/AddSub200G3Quiz';
import { AddSub200G3Matcher, ADD_SUB_200_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/osszeadas-es-kivonas/AddSub200G3Matcher';
import { AddSub200G3Sorter, ADD_SUB_200_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/osszeadas-es-kivonas/AddSub200G3Sorter';
import {
  TensCoinsAddSvg,
  AnalogyRodsSvg,
  BridgeHundredSvg,
  BridgeBackSvg,
  ToTwoHundredSvg,
  PointsChartSvg
} from '@/components/math/grade-3/szamolas-200-ig/osszeadas-es-kivonas/AddSub200G3Figures';

describe('Grade 3 Topic III - 4. Összeadás és kivonás - Components', () => {
  it('renders AddSub200G3Theory without throwing', () => {
    const { container } = render(<AddSub200G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub200G3Quiz without throwing', () => {
    const { container } = render(<AddSub200G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ADD_SUB_200_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ADD_SUB_200_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ADD_SUB_200_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = ADD_SUB_200_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = ADD_SUB_200_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders AddSub200G3Matcher without throwing', () => {
    const { container } = render(<AddSub200G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub200G3Sorter without throwing', () => {
    const { container } = render(<AddSub200G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TensCoinsAddSvg, AnalogyRodsSvg, BridgeHundredSvg, BridgeBackSvg, ToTwoHundredSvg, PointsChartSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
