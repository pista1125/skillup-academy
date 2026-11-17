import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenSubG3Theory } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Theory';
import { WrittenSubG3Quiz, WRITTEN_SUB_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Quiz';
import { WrittenSubG3Matcher, WRITTEN_SUB_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Matcher';
import { WrittenSubG3Sorter, WRITTEN_SUB_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Sorter';
import { StepsNoExchangeSvg, FillUpStepsSvg, ExchangeOnesSvg, ExchangeTensSvg, ExchangeBothSvg, ZeroTensSvg, CheckSvg, WordPlanSvg } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Figures';

describe('Grade 3 Topic VIII - 3. Írásbeli kivonás - Components', () => {
  it('renders WrittenSubG3Theory without throwing', () => {
    const { container } = render(<WrittenSubG3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<WrittenSubG3Theory />);
    expect(getAllByText(/VIII. ÍRÁSBELI KIVONÁS/).length).toBeGreaterThan(0);
  });

  it('renders WrittenSubG3Quiz without throwing', () => {
    const { container } = render(<WrittenSubG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(WRITTEN_SUB_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WRITTEN_SUB_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(WRITTEN_SUB_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    WRITTEN_SUB_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = WRITTEN_SUB_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = WRITTEN_SUB_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders WrittenSubG3Matcher without throwing', () => {
    const { container } = render(<WrittenSubG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenSubG3Sorter without throwing', () => {
    const { container } = render(<WrittenSubG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [StepsNoExchangeSvg, FillUpStepsSvg, ExchangeOnesSvg, ExchangeTensSvg, ExchangeBothSvg, ZeroTensSvg, CheckSvg, WordPlanSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

import { subSteps, spokenSubStep, exchangeMarks, WrittenSubG3Column } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';

describe('Grade 3 Topic VIII - WrittenSubG3Column helpers', () => {
  it('subSteps gives the right digits for every pair up to 500', () => {
    for (let a = 100; a <= 500; a += 7) {
      for (let b = 100; b < a; b += 13) {
        const r = subSteps(a, b).reduce((s, st) => s + st.write * 10 ** st.col, 0);
        expect(r).toBe(a - b);
        subSteps(a, b).forEach((st) => {
          expect(st.write).toBeGreaterThanOrEqual(0);
          expect(st.write).toBeLessThanOrEqual(9);
        });
      }
    }
  });

  it('speaks the zero-tens case like the textbook', () => {
    const s = subSteps(403, 157);
    expect(spokenSubStep(s[0], s)).toContain('9 tízesre és 10 egyesre');
    expect(spokenSubStep(s[1], s)).toContain('9 − 5 = 4');
    expect(spokenSubStep(s[2], s)).toContain('4 − 1 = 3');
    expect(exchangeMarks(s, 3)).toEqual([13, 9, 3]);
  });

  it('renders the column with exchange marks', () => {
    const { container } = render(<WrittenSubG3Column minuend={372} subtrahend={145} result={227} exchanges={[12, 6]} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
