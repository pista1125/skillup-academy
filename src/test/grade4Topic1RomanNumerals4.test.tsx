import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanNumerals4Theory } from '@/components/math/grade-4/szamolas-10000-ig/a-romai-szamok/RomanNumerals4Theory';
import { RomanNumerals4Quiz } from '@/components/math/grade-4/szamolas-10000-ig/a-romai-szamok/RomanNumerals4Quiz';
import { RomanNumerals4Matcher } from '@/components/math/grade-4/szamolas-10000-ig/a-romai-szamok/RomanNumerals4Matcher';
import { RomanNumerals4Sorter } from '@/components/math/grade-4/szamolas-10000-ig/a-romai-szamok/RomanNumerals4Sorter';
import {
  RomanSignsSvg,
  RomanRulesSvg,
  SwimCapsSvg,
  PostcardSvg,
  RomanClockSvg,
  MatchsticksSvg
} from '@/components/math/grade-4/szamolas-10000-ig/a-romai-szamok/RomanNumerals4Figures';

describe('Grade 4 Topic I - 7. A római számok - Components', () => {
  it('renders RomanNumerals4Theory without throwing', () => {
    const { container } = render(<RomanNumerals4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RomanNumerals4Quiz without throwing', () => {
    const { container } = render(<RomanNumerals4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders RomanNumerals4Matcher without throwing', () => {
    const { container } = render(<RomanNumerals4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanNumerals4Sorter without throwing', () => {
    const { container } = render(<RomanNumerals4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RomanSignsSvg, RomanRulesSvg, SwimCapsSvg, PostcardSvg, RomanClockSvg, MatchsticksSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
