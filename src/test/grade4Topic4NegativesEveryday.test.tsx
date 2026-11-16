import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NegativesEverydayTheory, tempWord, SIGN_TASKS } from '@/components/math/grade-4/negativ-szamok/negativ-szamok-a-mindennapokban/NegativesEverydayTheory';
import { NegativesEverydayQuiz, NEGATIVES_EVERYDAY_QUESTIONS } from '@/components/math/grade-4/negativ-szamok/negativ-szamok-a-mindennapokban/NegativesEverydayQuiz';
import { NegativesEverydayMatcher } from '@/components/math/grade-4/negativ-szamok/negativ-szamok-a-mindennapokban/NegativesEverydayMatcher';
import { NegativesEverydaySorter } from '@/components/math/grade-4/negativ-szamok/negativ-szamok-a-mindennapokban/NegativesEverydaySorter';
import {
  ThermometerSvg,
  SeaLevelSvg,
  TownTempsSvg,
  DayGraphSvg,
  FloorsSvg,
  WeatherWordsSvg,
  fmtNum,
  DAY_TEMPS
} from '@/components/math/grade-4/negativ-szamok/negativ-szamok-a-mindennapokban/NegativesEverydayFigures';

describe('Grade 4 Topic IV - 1. A negatív számok a mindennapokban - Components', () => {
  it('renders NegativesEverydayTheory without throwing', () => {
    const { container } = render(<NegativesEverydayTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NegativesEverydayQuiz without throwing', () => {
    const { container } = render(<NegativesEverydayQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NegativesEverydayMatcher without throwing', () => {
    const { container } = render(<NegativesEverydayMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NegativesEverydaySorter without throwing', () => {
    const { container } = render(<NegativesEverydaySorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ThermometerSvg, SeaLevelSvg, TownTempsSvg, DayGraphSvg, FloorsSvg, WeatherWordsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge and 4 distinct options', () => {
    expect(NEGATIVES_EVERYDAY_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NEGATIVES_EVERYDAY_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(NEGATIVES_EVERYDAY_QUESTIONS.map((q) => q.id)).size).toBe(30);
    NEGATIVES_EVERYDAY_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
  });

  it('formats negative numbers and temperatures like the textbook', () => {
    expect(fmtNum(-6)).toBe('−6');
    expect(fmtNum(2400)).toBe('2400');
    expect(fmtNum(-10994)).toBe('−10 994');
    expect(tempWord(-6)).toBe('6 fokkal fagypont alatt');
    expect(tempWord(0)).toBe('pont fagypont');
    expect(DAY_TEMPS.find(([h]) => h === 13)?.[1]).toBe(6);
    SIGN_TASKS.forEach((t) => expect(t.options).toContain(t.answer));
  });
});
