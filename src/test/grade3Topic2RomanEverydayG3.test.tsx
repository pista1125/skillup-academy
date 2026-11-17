import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanEverydayG3Theory, STICK_PUZZLES } from '@/components/math/grade-3/romai-szamok/romai-szamok-a-mindennapokban/RomanEverydayG3Theory';
import { RomanEverydayG3Quiz, ROMAN_EVERYDAY_G3_QUESTIONS } from '@/components/math/grade-3/romai-szamok/romai-szamok-a-mindennapokban/RomanEverydayG3Quiz';
import { RomanEverydayG3Matcher } from '@/components/math/grade-3/romai-szamok/romai-szamok-a-mindennapokban/RomanEverydayG3Matcher';
import { RomanEverydayG3Sorter } from '@/components/math/grade-3/romai-szamok/romai-szamok-a-mindennapokban/RomanEverydayG3Sorter';
import { evalStickEq, toRoman, fromRoman, stickCount } from '@/components/math/grade-3/romai-szamok/romai-szamok-a-mindennapokban/RomanEverydayG3Parts';
import {
  RomanClockFaceSvg,
  ClockIIIIvsIVSvg,
  RomanEverywhereSvg,
  MonthsRomanSvg,
  MatchstickMoveSvg,
  MirrorRomanSvg,
  StickNumberSvg
} from '@/components/math/grade-3/romai-szamok/romai-szamok-a-mindennapokban/RomanEverydayG3Figures';

describe('Grade 3 Topic II - 3. Római számok a mindennapokban és fejtörők - Components', () => {
  it('renders RomanEverydayG3Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanEverydayG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RomanEverydayG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanEverydayG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ROMAN_EVERYDAY_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROMAN_EVERYDAY_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(ROMAN_EVERYDAY_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    ROMAN_EVERYDAY_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('roman helpers and stick puzzles are consistent', () => {
    expect(toRoman(14)).toBe('XIV');
    expect(toRoman(39)).toBe('XXXIX');
    expect(toRoman(94)).toBe('XCIV');
    expect(fromRoman('IIII')).toBeNull();
    expect(stickCount('XIV')).toBe(5);
    STICK_PUZZLES.forEach((p) => {
      expect(evalStickEq(p.start).ok).toBe(false);
      expect(evalStickEq(p.solution).ok).toBe(true);
      // egy pálcika áthelyezése: a pálcikaszám nem változik
      expect(stickCount(p.solution)).toBe(stickCount(p.start));
    });
  });

  it('renders RomanEverydayG3Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanEverydayG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanEverydayG3Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanEverydayG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RomanClockFaceSvg, ClockIIIIvsIVSvg, RomanEverywhereSvg, MonthsRomanSvg, MatchstickMoveSvg, MirrorRomanSvg, StickNumberSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
