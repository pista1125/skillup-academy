import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RomanReadWriteG3Theory } from '@/components/math/grade-3/romai-szamok/iras-olvasas-100-ig/RomanReadWriteG3Theory';
import { RomanReadWriteG3Quiz, ROMAN_READ_WRITE_G3_QUESTIONS } from '@/components/math/grade-3/romai-szamok/iras-olvasas-100-ig/RomanReadWriteG3Quiz';
import { RomanReadWriteG3Matcher } from '@/components/math/grade-3/romai-szamok/iras-olvasas-100-ig/RomanReadWriteG3Matcher';
import { RomanReadWriteG3Sorter } from '@/components/math/grade-3/romai-szamok/iras-olvasas-100-ig/RomanReadWriteG3Sorter';
import {
  TensOnesTableSvg,
  WriteStepsSvg,
  ReadStepsSvg,
  LengthTrapSvg,
  RomanNumberLineSvg
} from '@/components/math/grade-3/romai-szamok/iras-olvasas-100-ig/RomanReadWriteG3Figures';
import { toRoman, romanValue, romanProblem } from '@/components/math/grade-3/romai-szamok/iras-olvasas-100-ig/RomanReadWriteG3Utils';

describe('Grade 3 Topic II - 2. Római számok írása és olvasása 100-ig - Components', () => {
  it('renders RomanReadWriteG3Theory without throwing', () => {
    const { container } = render(<RomanReadWriteG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RomanReadWriteG3Quiz without throwing', () => {
    const { container } = render(<RomanReadWriteG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ROMAN_READ_WRITE_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROMAN_READ_WRITE_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROMAN_READ_WRITE_G3_QUESTIONS.forEach((q) => {
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

  it('renders RomanReadWriteG3Matcher without throwing', () => {
    const { container } = render(<RomanReadWriteG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RomanReadWriteG3Sorter without throwing', () => {
    const { container } = render(<RomanReadWriteG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [TensOnesTableSvg, WriteStepsSvg, ReadStepsSvg, LengthTrapSvg, RomanNumberLineSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
