import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanBasicsG3Theory } from '@/components/math/grade-3/romai-szamok/alapveto-szamjegyek-szabalyok/RomanBasicsG3Theory';
import { RomanBasicsG3Quiz, ROMAN_BASICS_G3_QUESTIONS } from '@/components/math/grade-3/romai-szamok/alapveto-szamjegyek-szabalyok/RomanBasicsG3Quiz';
import { RomanBasicsG3Matcher } from '@/components/math/grade-3/romai-szamok/alapveto-szamjegyek-szabalyok/RomanBasicsG3Matcher';
import { RomanBasicsG3Sorter } from '@/components/math/grade-3/romai-szamok/alapveto-szamjegyek-szabalyok/RomanBasicsG3Sorter';
import {
  RomanSignsSvg,
  RomanOriginSvg,
  AddRuleSvg,
  SubtractRuleSvg,
  ThreeRuleSvg,
  WorkedXXIVSvg
} from '@/components/math/grade-3/romai-szamok/alapveto-szamjegyek-szabalyok/RomanBasicsG3Figures';
import { toRoman, romanValue, romanProblem } from '@/components/math/grade-3/romai-szamok/alapveto-szamjegyek-szabalyok/RomanBasicsG3Utils';

describe('Grade 3 Topic II - 1. A római számjegyek és alapszabályok - Components', () => {
  it('renders RomanBasicsG3Theory without throwing', () => {
    const { container } = render(<RomanBasicsG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RomanBasicsG3Quiz without throwing', () => {
    const { container } = render(<RomanBasicsG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ROMAN_BASICS_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROMAN_BASICS_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROMAN_BASICS_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('roman helpers are consistent for 1..100 and reject wrong forms', () => {
    for (let n = 1; n <= 100; n++) {
      expect(romanValue(toRoman(n))).toBe(n);
      expect(romanProblem(toRoman(n))).toBeNull();
    }
    ['IIII', 'VV', 'VX', 'IL', 'IC', 'XXXX', 'IIV', 'XCX', 'VIV', 'LC', 'CI'].forEach((s) => expect(romanProblem(s)).not.toBeNull());
  });

  it('renders RomanBasicsG3Matcher without throwing', () => {
    const { container } = render(<RomanBasicsG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanBasicsG3Sorter without throwing', () => {
    const { container } = render(<RomanBasicsG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [RomanSignsSvg, RomanOriginSvg, AddRuleSvg, SubtractRuleSvg, ThreeRuleSvg, WorkedXXIVSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
