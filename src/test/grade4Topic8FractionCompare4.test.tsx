import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionCompare4Theory, STRIP_TASKS, flagMeters } from '@/components/math/grade-4/tortszamok/tortek-osszehasonlitasa/FractionCompare4Theory';
import { FractionCompare4Quiz, FRACTION_COMPARE_QUESTIONS } from '@/components/math/grade-4/tortszamok/tortek-osszehasonlitasa/FractionCompare4Quiz';
import { FractionCompare4Matcher, FRACTION_COMPARE_MATCHER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/tortek-osszehasonlitasa/FractionCompare4Matcher';
import { FractionCompare4Sorter, FRACTION_COMPARE_SORTER_LEVELS_LIST } from '@/components/math/grade-4/tortszamok/tortek-osszehasonlitasa/FractionCompare4Sorter';
import {
  PizzaSlicesCompareSvg,
  QuarterBarsSvg,
  FractionWallSvg,
  EqualHalvesSvg,
  KmTrackSvg,
  JumpContestSvg,
  TRACK_FLAGS,
  JUMPERS,
  compareFractions,
  fw,
  fwOf
} from '@/components/math/grade-4/tortszamok/tortek-osszehasonlitasa/FractionCompare4Figures';

const NAME_TO_D: Record<string, number> = { ketted: 2, harmad: 3, negyed: 4, ötöd: 5, hatod: 6, nyolcad: 8, tized: 10 };
const parse = (s: string): [number, number] => {
  const m = s.match(/(\d+) (ketted|harmad|negyed|ötöd|hatod|nyolcad|tized)/);
  if (!m) throw new Error(`nem tört: ${s}`);
  return [Number(m[1]), NAME_TO_D[m[2]]];
};

describe('Grade 4 Topic VIII - 4. Törtek összehasonlítása - Components', () => {
  it('renders FractionCompare4Theory without throwing', () => {
    const { container } = render(<FractionCompare4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders FractionCompare4Quiz without throwing', () => {
    const { container } = render(<FractionCompare4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders FractionCompare4Matcher without throwing', () => {
    const { container } = render(<FractionCompare4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders FractionCompare4Sorter without throwing', () => {
    const { container } = render(<FractionCompare4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PizzaSlicesCompareSvg, QuarterBarsSvg, FractionWallSvg, EqualHalvesSvg, KmTrackSvg, JumpContestSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge, explanation and distinct options', () => {
    expect(FRACTION_COMPARE_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(FRACTION_COMPARE_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(FRACTION_COMPARE_QUESTIONS.map((q) => q.id)).size).toBe(30);
    FRACTION_COMPARE_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    const withFig = FRACTION_COMPARE_QUESTIONS.filter((q) => q.figure).length;
    expect(withFig).toBeGreaterThanOrEqual(12);
  });

  it('compares fractions like the book', () => {
    expect(compareFractions(1, 3, 1, 4)).toBe('>');
    expect(compareFractions(3, 4, 1, 4)).toBe('>');
    expect(compareFractions(1, 2, 5, 10)).toBe('=');
    expect(compareFractions(2, 4, 4, 10)).toBe('>');
    expect(compareFractions(3, 8, 2, 4)).toBe('<');
    expect(compareFractions(1, 6, 1, 3)).toBe('<');
    expect(fw(3, 4)).toBe('3 negyed');
    expect(fwOf(3, 4)).toBe('3 negyede');
    STRIP_TASKS.forEach((t) => expect(['<', '=', '>']).toContain(compareFractions(t.a[0], t.a[1], t.b[0], t.b[1])));
  });

  it('track flags and jumps match the workbook', () => {
    TRACK_FLAGS.forEach((f) => expect(flagMeters(f.n, f.d)).toBe(f.m));
    JUMPERS.forEach((j) => expect((200 / j.d) * j.n).toBe(j.cm));
  });

  it('sorter categories are correct', () => {
    const [l1, l2, l3] = FRACTION_COMPARE_SORTER_LEVELS_LIST;
    l1.items.forEach((it) => {
      const [n, d] = parse(it.text);
      const r = compareFractions(n, d, 1, 2);
      expect(it.categoryId).toBe(r === '<' ? 'lt' : r === '=' ? 'eq' : 'gt');
    });
    l2.items.forEach((it) => {
      const [n, d] = parse(it.text);
      expect(it.categoryId).toBe(n < d ? 'lt1' : n === d ? 'eq1' : 'gt1');
    });
    l3.items.forEach((it) => {
      const [a, b] = it.text.split('•');
      const [an, ad] = parse(a);
      const [bn, bd] = parse(b);
      const r = compareFractions(an, ad, bn, bd);
      expect(it.categoryId).toBe(r === '>' ? 'a' : r === '=' ? 'same' : 'b');
    });
  });

  it('matcher has 3 levels with 8 unique pairs each, level 1 and 2 are correct', () => {
    FRACTION_COMPARE_MATCHER_LEVELS_LIST.forEach((l) => {
      expect(l.pairs).toHaveLength(8);
      expect(new Set(l.pairs.map((p) => p.right)).size).toBe(8);
    });
    FRACTION_COMPARE_MATCHER_LEVELS_LIST[0].pairs.forEach((p) => {
      const [a, b] = String(p.left).split(' vagy ');
      const [an, ad] = parse(a);
      const [bn, bd] = parse(b);
      const bigger = compareFractions(an, ad, bn, bd) === '>' ? a : b.replace('?', '');
      expect(bigger.trim()).toBe(String(p.right));
    });
    FRACTION_COMPARE_MATCHER_LEVELS_LIST[1].pairs.forEach((p) => {
      const [an, ad] = parse(String(p.left));
      const [bn, bd] = p.right === '1 egész' ? [1, 1] : parse(String(p.right));
      expect(compareFractions(an, ad, bn, bd)).toBe('=');
    });
  });
});
