import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { NumberLineOppositesTheory, landing, opposite, HOP_TASKS } from '@/components/math/grade-4/negativ-szamok/szamegyenes-es-ellentettek/NumberLineOppositesTheory';
import { NumberLineOppositesQuiz, NUMBER_LINE_QUESTIONS } from '@/components/math/grade-4/negativ-szamok/szamegyenes-es-ellentettek/NumberLineOppositesQuiz';
import { NumberLineOppositesMatcher } from '@/components/math/grade-4/negativ-szamok/szamegyenes-es-ellentettek/NumberLineOppositesMatcher';
import { NumberLineOppositesSorter } from '@/components/math/grade-4/negativ-szamok/szamegyenes-es-ellentettek/NumberLineOppositesSorter';
import {
  NumberLineSvg,
  OppositesSvg,
  GrasshopperSvg,
  DiversSvg,
  NeighboursSvg,
  ScaledLineSvg,
  DIVERS
} from '@/components/math/grade-4/negativ-szamok/szamegyenes-es-ellentettek/NumberLineOppositesFigures';

describe('Grade 4 Topic IV - 2. Számegyenes és ellentettek - Components', () => {
  it('renders NumberLineOppositesTheory without throwing', () => {
    const { container } = render(<NumberLineOppositesTheory />);
    expect(container).toBeTruthy();
  });

  it('lab number line is clickable', () => {
    const { getAllByTestId } = render(<NumberLineOppositesTheory />);
    const picks = getAllByTestId('nl-pick-7');
    fireEvent.click(picks[0]);
    expect(picks.length).toBeGreaterThan(0);
  });

  it('renders NumberLineOppositesQuiz without throwing', () => {
    const { container } = render(<NumberLineOppositesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NumberLineOppositesMatcher without throwing', () => {
    const { container } = render(<NumberLineOppositesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumberLineOppositesSorter without throwing', () => {
    const { container } = render(<NumberLineOppositesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NumberLineSvg, OppositesSvg, GrasshopperSvg, DiversSvg, NeighboursSvg, ScaledLineSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has 30 questions, 10 per level, each with badge and 4 distinct options', () => {
    expect(NUMBER_LINE_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NUMBER_LINE_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(NUMBER_LINE_QUESTIONS.map((q) => q.id)).size).toBe(30);
    NUMBER_LINE_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
    });
  });

  it('computes jumps and opposites like the textbook', () => {
    expect(landing(3, [4])).toBe(7);
    expect(landing(3, [-7])).toBe(-4);
    expect(landing(3, [6, -10])).toBe(-1);
    expect(landing(0, [5, -6, 1, -4, -4, -4, 7, 10, -17])).toBe(-12);
    HOP_TASKS.forEach((t) => {
      const a = landing(t.start, t.moves);
      expect(a).toBeGreaterThanOrEqual(-12);
      expect(a).toBeLessThanOrEqual(10);
    });
    expect(opposite(4)).toBe(-4);
    expect(opposite(-10)).toBe(10);
    expect(opposite(0)).toBe(0);
    expect(DIVERS.reduce((m, d) => (d.d > m.d ? d : m)).n).toBe('E');
  });
});
