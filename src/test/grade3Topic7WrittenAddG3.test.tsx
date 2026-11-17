import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenAddG3Theory } from '@/components/math/grade-3/irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Theory';
import { WrittenAddG3Quiz, WRITTEN_ADD_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Quiz';
import { WrittenAddG3Matcher, WRITTEN_ADD_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Matcher';
import { WrittenAddG3Sorter, WRITTEN_ADD_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Sorter';
import { ThreeStepsSvg, CarryOnesSvg, CarryTensSvg, CarryBothSvg, CheckSwapSvg, ThreeTermsSvg } from '@/components/math/grade-3/irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Figures';

describe('Grade 3 Topic VII - 3. Írásbeli összeadás - Components', () => {
  it('renders WrittenAddG3Theory without throwing', () => {
    const { container } = render(<WrittenAddG3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<WrittenAddG3Theory />);
    expect(getAllByText(/VII. ÍRÁSBELI ÖSSZEADÁS/).length).toBeGreaterThan(0);
  });

  it('renders WrittenAddG3Quiz without throwing', () => {
    const { container } = render(<WrittenAddG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(WRITTEN_ADD_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WRITTEN_ADD_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(WRITTEN_ADD_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    WRITTEN_ADD_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = WRITTEN_ADD_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = WRITTEN_ADD_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders WrittenAddG3Matcher without throwing', () => {
    const { container } = render(<WrittenAddG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenAddG3Sorter without throwing', () => {
    const { container } = render(<WrittenAddG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ThreeStepsSvg, CarryOnesSvg, CarryTensSvg, CarryBothSvg, CheckSwapSvg, ThreeTermsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

import { addSteps, spokenStep, WrittenAddG3Column } from '@/components/math/grade-3/irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';

describe('WrittenAddG3Column helpers', () => {
  it('computes the column steps with carries', () => {
    const s = addSteps([168, 275]);
    expect(s.map((x) => x.write)).toEqual([3, 4, 4]);
    expect(s.map((x) => x.carryOut)).toEqual([1, 1, 0]);
    expect(spokenStep(s[0])).toBe('8 meg 5 az 13. Leírom a 3-at, maradt 1.');
    expect(spokenStep(s[1])).toBe('6 meg 7 az 13, meg 1 az 14. Leírom a 4-et, maradt 1.');
  });
  it('renders ? digits and carries', () => {
    const { container } = render(<WrittenAddG3Column addends={['1?5', 194]} result="3?9" carries={[null, 1]} />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(5);
  });
});
