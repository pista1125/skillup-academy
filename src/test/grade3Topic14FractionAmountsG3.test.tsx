import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionAmountsG3Theory } from '@/components/math/grade-3/tortes-szamok/osszehasonlitas/FractionAmountsG3Theory';
import { FractionAmountsG3Quiz, FRACTION_AMOUNTS_G3_QUESTIONS } from '@/components/math/grade-3/tortes-szamok/osszehasonlitas/FractionAmountsG3Quiz';
import { FractionAmountsG3Matcher, FRACTION_AMOUNTS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/tortes-szamok/osszehasonlitas/FractionAmountsG3Matcher';
import { FractionAmountsG3Sorter, FRACTION_AMOUNTS_G3_SORTER_LEVELS } from '@/components/math/grade-3/tortes-szamok/osszehasonlitas/FractionAmountsG3Sorter';
import { makeShareTask, shareOptions, makeUnitTask, unitOptions } from '@/components/math/grade-3/tortes-szamok/osszehasonlitas/FractionAmountsG3Parts';
import {
  ShareApplesSvg,
  QuarterKgSvg,
  FifthMeterSvg,
  ClockPartsSvg,
  SegmentPartsSvg,
  HalfLitreSvg,
  RoadSvg
} from '@/components/math/grade-3/tortes-szamok/osszehasonlitas/FractionAmountsG3Figures';

describe('Grade 3 Topic XIV - 3. Törtrész mennyiségekből', () => {
  it('renders FractionAmountsG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<FractionAmountsG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders FractionAmountsG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionAmountsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(FRACTION_AMOUNTS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(FRACTION_AMOUNTS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    FRACTION_AMOUNTS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(FRACTION_AMOUNTS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(FRACTION_AMOUNTS_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders FractionAmountsG3Matcher and FractionAmountsG3Sorter without throwing', () => {
    expect(render(<FractionAmountsG3Matcher />).container).toBeTruthy();
    expect(render(<FractionAmountsG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [ShareApplesSvg, QuarterKgSvg, FifthMeterSvg, ClockPartsSvg, SegmentPartsSvg, HalfLitreSvg, RoadSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per category', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const m = FRACTION_AMOUNTS_G3_MATCHER_LEVELS[l];
      expect(m.pairs).toHaveLength(8);
      expect(m.pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(m.pairs.map((p) => String(p.right))).size).toBe(8);
      const s = FRACTION_AMOUNTS_G3_SORTER_LEVELS[l];
      expect(s.categories).toHaveLength(3);
      expect(s.items).toHaveLength(27);
      s.categories.forEach((c) => {
        const items = s.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('lab generators give whole-number parts', () => {
    for (let i = 0; i < 300; i++) {
      const s = makeShareTask();
      expect(s.total % s.k).toBe(0);
      const so = shareOptions(s);
      expect(so).toContain(s.total / s.k);
      expect(new Set(so).size).toBe(so.length);
      const u = makeUnitTask();
      expect(u.total % u.n).toBe(0);
      const uo = unitOptions(u);
      expect(uo).toContain(u.total / u.n);
      expect(new Set(uo).size).toBe(uo.length);
      expect(u.total).toBeLessThanOrEqual(1000);
    }
  });
});
