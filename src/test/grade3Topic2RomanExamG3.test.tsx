import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanExamG3Theory } from '@/components/math/grade-3/romai-szamok/gyakorlas-tudasproba/RomanExamG3Theory';
import { RomanExamG3Quiz, ROMAN_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/romai-szamok/gyakorlas-tudasproba/RomanExamG3Quiz';
import { RomanExamG3Matcher } from '@/components/math/grade-3/romai-szamok/gyakorlas-tudasproba/RomanExamG3Matcher';
import { RomanExamG3Sorter } from '@/components/math/grade-3/romai-szamok/gyakorlas-tudasproba/RomanExamG3Sorter';
import { makeTask, toRoman, romanIssue, romanValue, TaskKind } from '@/components/math/grade-3/romai-szamok/gyakorlas-tudasproba/RomanExamG3Utils';
import {
  RomanSignsSummarySvg,
  RomanBuildSvg,
  RomanTensLineSvg,
  RomanTrapsSvg,
  RomanCompareSvg
} from '@/components/math/grade-3/romai-szamok/gyakorlas-tudasproba/RomanExamG3Figures';

describe('Grade 3 Topic II - 4. Gyakorlás, tudáspróba - Components', () => {
  it('renders RomanExamG3Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RomanExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(ROMAN_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(ROMAN_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(ROMAN_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    ROMAN_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    const withFig = ROMAN_EXAM_G3_QUESTIONS.filter((q) => q.figure).length;
    expect(withFig).toBeGreaterThanOrEqual(54);
  });

  it('roman helpers and the lab task generator are consistent', () => {
    for (let n = 1; n <= 100; n++) {
      expect(romanValue(toRoman(n))).toBe(n);
      expect(romanIssue(toRoman(n))).toBeNull();
    }
    ['IIII', 'IC', 'VX', 'IL', 'XXXX', 'VV'].forEach((s) => expect(romanIssue(s)).toBeTruthy());
    (['rom2ar', 'ar2rom', 'compare', 'next', 'clock', 'month'] as TaskKind[]).forEach((k) => {
      for (let i = 0; i < 40; i++) {
        const t = makeTask(k);
        expect(t.text).toBeTruthy();
        expect(t.options).toContain(t.answer);
        expect(new Set(t.options).size).toBe(t.options.length);
        if (k === 'rom2ar') expect(Number(t.answer)).toBeLessThanOrEqual(100);
        if (k === 'ar2rom' || k === 'next') expect(romanIssue(t.answer)).toBeNull();
      }
    });
  });

  it('renders RomanExamG3Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanExamG3Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RomanExamG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [RomanSignsSummarySvg, RomanBuildSvg, RomanTensLineSvg, RomanTrapsSvg, RomanCompareSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
