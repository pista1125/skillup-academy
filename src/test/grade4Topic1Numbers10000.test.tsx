import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Numbers10000Theory, numberToWords } from '@/components/math/grade-4/szamolas-10000-ig/csoportositasok-szamok-10000-ig/Numbers10000Theory';
import { Numbers10000Quiz, NUMBERS_10000_QUESTIONS } from '@/components/math/grade-4/szamolas-10000-ig/csoportositasok-szamok-10000-ig/Numbers10000Quiz';
import { Numbers10000Matcher } from '@/components/math/grade-4/szamolas-10000-ig/csoportositasok-szamok-10000-ig/Numbers10000Matcher';
import { Numbers10000Sorter } from '@/components/math/grade-4/szamolas-10000-ig/csoportositasok-szamok-10000-ig/Numbers10000Sorter';
import {
  GemGroupingSvg,
  FabatkaExchangeSvg,
  PlaceValueTableSvg,
  AbacusSvg,
  NumberLine10000Svg,
  HundredsGridSvg
} from '@/components/math/grade-4/szamolas-10000-ig/csoportositasok-szamok-10000-ig/Numbers10000Figures';

describe('Grade 4 Topic I - 9. Csoportosítások, számok 10 000-ig - Components', () => {
  it('renders Numbers10000Theory without throwing', () => {
    const { container } = render(<Numbers10000Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers10000Quiz without throwing', () => {
    const { container } = render(<Numbers10000Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge', () => {
    expect(NUMBERS_10000_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NUMBERS_10000_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    NUMBERS_10000_QUESTIONS.forEach((q) => expect(q.questionTypeBadge).toBeTruthy());
  });

  it('writes numbers in words by the textbook rules', () => {
    expect(numberToWords(2001)).toBe('kétezer-egy');
    expect(numberToWords(1805)).toBe('ezernyolcszázöt');
    expect(numberToWords(8714)).toBe('nyolcezer-hétszáztizennégy');
    expect(numberToWords(5000)).toBe('ötezer');
    expect(numberToWords(10000)).toBe('tízezer');
    expect(numberToWords(3054)).toBe('háromezer-ötvennégy');
  });

  it('renders Numbers10000Matcher without throwing', () => {
    const { container } = render(<Numbers10000Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Numbers10000Sorter without throwing', () => {
    const { container } = render(<Numbers10000Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [GemGroupingSvg, FabatkaExchangeSvg, PlaceValueTableSvg, AbacusSvg, NumberLine10000Svg, HundredsGridSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
