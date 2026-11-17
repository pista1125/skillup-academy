import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulRelationsG3Theory } from '@/components/math/grade-3/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsG3Theory';
import { MulRelationsG3Quiz, MUL_RELATIONS_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsG3Quiz';
import { MulRelationsG3Matcher, MUL_RELATIONS_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsG3Matcher';
import { MulRelationsG3Sorter, MUL_RELATIONS_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsG3Sorter';
import { genChange, genPrice, changeFactor } from '@/components/math/grade-3/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsG3Parts';
import {
  MulRelTableSvg,
  MulRelDotsSvg,
  MulRelTimesTenSvg,
  MulRelSameSvg,
  MulRelPriceSvg
} from '@/components/math/grade-3/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsG3Figures';

describe('Grade 3 Topic XIII - 4. Összefüggések, következtetések', () => {
  it('renders MulRelationsG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<MulRelationsG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders MulRelationsG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MulRelationsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(MUL_RELATIONS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_RELATIONS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MUL_RELATIONS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MUL_RELATIONS_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(MUL_RELATIONS_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders MulRelationsG3Matcher and MulRelationsG3Sorter without throwing', () => {
    expect(render(<MulRelationsG3Matcher />).container).toBeTruthy();
    expect(render(<MulRelationsG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [MulRelTableSvg, MulRelDotsSvg, MulRelTimesTenSvg, MulRelSameSvg, MulRelPriceSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(MUL_RELATIONS_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(MUL_RELATIONS_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(MUL_RELATIONS_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(MUL_RELATIONS_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(MUL_RELATIONS_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('lab generators stay within 1000 and are consistent', () => {
    for (let i = 0; i < 300; i++) {
      const c = genChange();
      expect(c.p).toBe(c.a * c.b);
      expect(c.p2).toBe(c.a2 * c.b2);
      expect(c.p2).toBe(c.p * changeFactor(c.kind));
      expect(c.p2).toBeLessThanOrEqual(1000);
      const p = genPrice();
      expect(p.n2).toBe(p.n1 * p.times);
      expect(p.price2).toBe(p.price1 * p.times);
      expect(p.price2).toBeLessThanOrEqual(1000);
    }
  });
});
