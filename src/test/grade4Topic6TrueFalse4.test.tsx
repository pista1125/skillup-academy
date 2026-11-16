import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  TrueFalse4Theory,
  TK_STATEMENTS,
  setsWhereTrue,
  MAKE_TRUE
} from '@/components/math/grade-4/valogatasok-csoportositasok/igaz-vagy-hamis/TrueFalse4Theory';
import { TrueFalse4Quiz, TRUE_FALSE_4_QUESTIONS } from '@/components/math/grade-4/valogatasok-csoportositasok/igaz-vagy-hamis/TrueFalse4Quiz';
import { TrueFalse4Matcher } from '@/components/math/grade-4/valogatasok-csoportositasok/igaz-vagy-hamis/TrueFalse4Matcher';
import { TrueFalse4Sorter } from '@/components/math/grade-4/valogatasok-csoportositasok/igaz-vagy-hamis/TrueFalse4Sorter';
import {
  AnimalsGlobeSvg,
  ThreeSetsSvg,
  MfSetSvg,
  QuantifierBoxesSvg,
  CounterexampleSvg,
  MF_SET
} from '@/components/math/grade-4/valogatasok-csoportositasok/igaz-vagy-hamis/TrueFalse4Figures';

describe('Grade 4 Topic VI - 4. Igaz vagy hamis? - Components', () => {
  it('renders TrueFalse4Theory without throwing', () => {
    const { container } = render(<TrueFalse4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders TrueFalse4Quiz without throwing', () => {
    const { container } = render(<TrueFalse4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders TrueFalse4Matcher without throwing', () => {
    const { container } = render(<TrueFalse4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders TrueFalse4Sorter without throwing', () => {
    const { container } = render(<TrueFalse4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [AnimalsGlobeSvg, ThreeSetsSvg, MfSetSvg, QuantifierBoxesSvg, CounterexampleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 4 Topic VI - 4. Igaz vagy hamis? - Logic', () => {
  it('has 30 questions, 10 per level, correct answer first, badge everywhere', () => {
    expect(TRUE_FALSE_4_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(TRUE_FALSE_4_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    TRUE_FALSE_4_QUESTIONS.forEach((q) => {
      expect(q.correctAnswer).toBe(0);
      expect(q.questionTypeBadge).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('TK 132/3. a) statements are true for the right sets', () => {
    expect(TK_STATEMENTS.map((s) => setsWhereTrue(s).join(''))).toEqual(['A', 'BC', 'A', 'A', 'A', 'C', 'AB']);
  });

  it('MF II/51/10. facts', () => {
    const digitSum = (n: number) => String(n).split('').reduce((a, d) => a + Number(d), 0);
    expect(MF_SET.some((n) => n % 2 === 0)).toBe(true);
    expect(MF_SET.filter((n) => digitSum(n) === 26)).toEqual([5939]);
    expect(MF_SET.filter((n) => String(n).includes('0'))).toHaveLength(5);
    expect(MF_SET.filter((n) => n % 1000 !== 0 && Math.round(n / 1000) * 1000 < n)).toEqual([3063, 4016]);
  });

  it('every make-true challenge has a solution (single element)', () => {
    MAKE_TRUE.forEach((c) => expect(c.pool.some((n) => c.goals.every((g) => g.f([n])))).toBe(true));
  });

  it('lab I checks answers', () => {
    const { getByLabelText, getByText } = render(<TrueFalse4Theory />);
    // A halmaz: igaz, hamis, igaz, igaz, igaz, hamis, igaz
    [true, false, true, true, true, false, true].forEach((v, i) => fireEvent.click(getByLabelText(`${i + 1}. állítás ${v ? 'igaz' : 'hamis'}`)));
    fireEvent.click(getByText('Ellenőrzés'));
    expect(getByText(/Hibátlan!/)).toBeTruthy();
  });
});
