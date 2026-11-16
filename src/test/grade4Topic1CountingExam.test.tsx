import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CountingExamTheory, makeTask, toRoman } from '@/components/math/grade-4/szamolas-10000-ig/megallo-kitekinto-osszefoglalas/CountingExamTheory';
import { CountingExamQuiz, COUNTING_EXAM_QUESTIONS } from '@/components/math/grade-4/szamolas-10000-ig/megallo-kitekinto-osszefoglalas/CountingExamQuiz';
import { CountingExamMatcher } from '@/components/math/grade-4/szamolas-10000-ig/megallo-kitekinto-osszefoglalas/CountingExamMatcher';
import { CountingExamSorter } from '@/components/math/grade-4/szamolas-10000-ig/megallo-kitekinto-osszefoglalas/CountingExamSorter';
import {
  SumPyramidSvg,
  RoundAndMultiplySvg,
  FairyWingsSvg,
  OperationChainSvg,
  TentsSvg,
  ProductGridSvg
} from '@/components/math/grade-4/szamolas-10000-ig/megallo-kitekinto-osszefoglalas/CountingExamFigures';

describe('Grade 4 Topic I - 13. Megálló, Kitekintő – tudáspróba - Components', () => {
  it('renders CountingExamTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CountingExamTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CountingExamQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CountingExamQuiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(COUNTING_EXAM_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNTING_EXAM_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNTING_EXAM_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNTING_EXAM_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    const withFig = COUNTING_EXAM_QUESTIONS.filter((q) => q.figure).length;
    expect(withFig).toBeGreaterThanOrEqual(36);
  });

  it('lab task generator produces consistent tasks', () => {
    expect(toRoman(19)).toBe('XIX');
    expect(toRoman(39)).toBe('XXXIX');
    expect(toRoman(24)).toBe('XXIV');
    (['kerekites', 'osszeadas', 'kivonas', 'szorzas', 'osztas', 'sorrend', 'romai'] as const).forEach((k) => {
      for (let i = 0; i < 30; i++) {
        const t = makeTask(k);
        expect(t.text).toBeTruthy();
        expect(t.answer).toBeTruthy();
        if (k !== 'romai') expect(Number(t.answer.replace(/\s/g, ''))).toBeLessThanOrEqual(10000);
      }
    });
  });

  it('renders CountingExamMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CountingExamMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CountingExamSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<CountingExamSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SumPyramidSvg, RoundAndMultiplySvg, FairyWingsSvg, OperationChainSvg, TentsSvg, ProductGridSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
