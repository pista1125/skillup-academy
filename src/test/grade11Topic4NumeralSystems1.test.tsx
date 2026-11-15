import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumeralSystems1Theory } from '@/components/math/grade-11/szamelmelet/szamrendszerek-1/NumeralSystems1Theory';
import { NumeralSystems1Quiz, NUMERAL_SYSTEMS1_QUESTIONS } from '@/components/math/grade-11/szamelmelet/szamrendszerek-1/NumeralSystems1Quiz';
import { NumeralSystems1Matcher } from '@/components/math/grade-11/szamelmelet/szamrendszerek-1/NumeralSystems1Matcher';
import { NumeralSystems1Sorter } from '@/components/math/grade-11/szamelmelet/szamrendszerek-1/NumeralSystems1Sorter';
import {
  BonbonPackingSvg,
  PlaceValueTableSvg,
  BinaryPlaceValueSvg,
  HexPlaceValueSvg,
  DigitSetsSvg
} from '@/components/math/grade-11/szamelmelet/szamrendszerek-1/NumeralSystems1Figures';

describe('Grade 11 Topic IV - 48. Számrendszerek I. - Components', () => {
  it('renders NumeralSystems1Theory without throwing', () => {
    const { container } = render(<NumeralSystems1Theory />);
    expect(container).toBeTruthy();
  });

  it('renders NumeralSystems1Quiz without throwing', () => {
    const { container } = render(<NumeralSystems1Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 10 questions on each of the 3 levels', () => {
    const qs = NUMERAL_SYSTEMS1_QUESTIONS;
    expect(qs).toHaveLength(30);
    [1, 2, 3].forEach((lvl) => expect(qs.filter((q) => q.level === lvl)).toHaveLength(10));
    qs.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('renders NumeralSystems1Matcher without throwing', () => {
    const { container } = render(<NumeralSystems1Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumeralSystems1Sorter without throwing', () => {
    const { container } = render(<NumeralSystems1Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [BonbonPackingSvg, PlaceValueTableSvg, BinaryPlaceValueSvg, HexPlaceValueSvg, DigitSetsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
