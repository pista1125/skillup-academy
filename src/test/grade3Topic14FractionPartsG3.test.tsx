import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionPartsG3Theory } from '@/components/math/grade-3/tortes-szamok/kozonseges-tortek/FractionPartsG3Theory';
import { FractionPartsG3Quiz, FRACTION_PARTS_G3_QUESTIONS } from '@/components/math/grade-3/tortes-szamok/kozonseges-tortek/FractionPartsG3Quiz';
import { FractionPartsG3Matcher, FRACTION_PARTS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/tortes-szamok/kozonseges-tortek/FractionPartsG3Matcher';
import { FractionPartsG3Sorter, FRACTION_PARTS_G3_SORTER_LEVELS } from '@/components/math/grade-3/tortes-szamok/kozonseges-tortek/FractionPartsG3Sorter';
import { genFracTask, nameOptions, fracName } from '@/components/math/grade-3/tortes-szamok/kozonseges-tortek/FractionPartsG3Parts';
import {
  PartNamesSvg,
  QuartersSvg,
  CompareUnitsSvg,
  RodPartsSvg,
  EverydayPartsSvg,
  MissingPartSvg
} from '@/components/math/grade-3/tortes-szamok/kozonseges-tortek/FractionPartsG3Figures';

describe('Grade 3 Topic XIV - 2. Törtrészek: fele, harmada, negyede', () => {
  it('renders FractionPartsG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<FractionPartsG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders FractionPartsG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionPartsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(FRACTION_PARTS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(FRACTION_PARTS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    FRACTION_PARTS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(FRACTION_PARTS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(FRACTION_PARTS_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders FractionPartsG3Matcher and FractionPartsG3Sorter without throwing', () => {
    expect(render(<FractionPartsG3Matcher />).container).toBeTruthy();
    expect(render(<FractionPartsG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [PartNamesSvg, QuartersSvg, CompareUnitsSvg, RodPartsSvg, EverydayPartsSvg, MissingPartSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: 8 matcher pairs and 3 x 9 sorter items per level, enough with pictures', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const m = FRACTION_PARTS_G3_MATCHER_LEVELS[l];
      expect(m.pairs).toHaveLength(8);
      expect(m.pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(m.pairs.map((p) => String(p.right))).size).toBe(8);
      const s = FRACTION_PARTS_G3_SORTER_LEVELS[l];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c) => {
        const items = s.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
      const texts = s.items.filter((i) => i.text).map((i) => i.text);
      expect(new Set(texts).size).toBe(texts.length);
    });
  });

  it('lab generators are consistent and give 4 distinct options with the right one first', () => {
    for (let i = 0; i < 500; i++) {
      const t = genFracTask();
      expect(t.k).toBeGreaterThanOrEqual(1);
      expect(t.k).toBeLessThan(t.n);
      expect(t.colored).toHaveLength(t.n);
      expect(t.colored.filter(Boolean)).toHaveLength(t.k);
      expect(t.rows * t.cols).toBe(t.n);
      const o = nameOptions(t.k, t.n);
      expect(o).toHaveLength(4);
      expect(new Set(o).size).toBe(4);
      expect(o[0]).toBe(fracName(t.k, t.n));
    }
    expect(fracName(3, 4)).toBe('3 negyed');
    expect(fracName(4, 4)).toBe('1 egész');
  });
});
