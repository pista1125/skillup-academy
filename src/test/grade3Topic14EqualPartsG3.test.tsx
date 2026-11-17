import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { EqualPartsG3Theory } from '@/components/math/grade-3/tortes-szamok/bevezetes/EqualPartsG3Theory';
import { EqualPartsG3Quiz, EQUAL_PARTS_G3_QUESTIONS } from '@/components/math/grade-3/tortes-szamok/bevezetes/EqualPartsG3Quiz';
import { EqualPartsG3Matcher, EQUAL_PARTS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/tortes-szamok/bevezetes/EqualPartsG3Matcher';
import { EqualPartsG3Sorter, EQUAL_PARTS_G3_SORTER_LEVELS } from '@/components/math/grade-3/tortes-szamok/bevezetes/EqualPartsG3Sorter';
import { unequalAngles, unequalCuts, equalAngles } from '@/components/math/grade-3/tortes-szamok/bevezetes/EqualPartsG3Parts';
import { FoldPaperSvg, EqualOrNotSvg, CakesCutSvg, ManyWaysSvg } from '@/components/math/grade-3/tortes-szamok/bevezetes/EqualPartsG3Figures';

describe('Grade 3 Topic XIV - 1. Egyenlő részekre osztás', () => {
  it('renders EqualPartsG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<EqualPartsG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders EqualPartsG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<EqualPartsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(EQUAL_PARTS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(EQUAL_PARTS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    EQUAL_PARTS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(EQUAL_PARTS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(EQUAL_PARTS_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders EqualPartsG3Matcher and EqualPartsG3Sorter without throwing', () => {
    expect(render(<EqualPartsG3Matcher />).container).toBeTruthy();
    expect(render(<EqualPartsG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [FoldPaperSvg, EqualOrNotSvg, CakesCutSvg, ManyWaysSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: 8 matcher pairs and 3 x 9 sorter items per level, enough with pictures', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const m = EQUAL_PARTS_G3_MATCHER_LEVELS[l];
      expect(m.pairs).toHaveLength(8);
      expect(m.pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const s = EQUAL_PARTS_G3_SORTER_LEVELS[l];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c) => {
        const items = s.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('lab generators make visibly unequal parts', () => {
    for (let i = 0; i < 200; i++) {
      const n = 2 + (i % 4);
      const a = unequalAngles(n);
      expect(a).toHaveLength(n + 1);
      expect(Math.round(a[n] - a[0])).toBe(360);
      const sizes = a.slice(1).map((v, j) => v - a[j]);
      expect(Math.max(...sizes) / Math.min(...sizes)).toBeGreaterThanOrEqual(1.8);
      const c = unequalCuts(n);
      expect(c).toHaveLength(n - 1);
      c.forEach((v) => {
        expect(v).toBeGreaterThan(0);
        expect(v).toBeLessThan(1);
      });
    }
    expect(equalAngles(4)).toEqual([0, 90, 180, 270, 360]);
  });
});
