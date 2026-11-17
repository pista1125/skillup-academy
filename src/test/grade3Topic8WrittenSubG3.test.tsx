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

import { subSteps, spokenSubStep, carryMarks, carryCount, WrittenSubG3Column } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { forgotCarry, stepHint } from '@/components/math/grade-3/irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Theory';

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

  it('speaks the steps with the pótlásos-maradékos method (teacher decision)', () => {
    const t = subSteps(532, 167);
    expect(spokenSubStep(t[0])).toBe('7-hez 5, az 12. Leírom az 5-öt, maradt 1.');
    expect(spokenSubStep(t[1])).toBe('6 meg 1 az 7. 7-hez 6, az 13. Leírom a 6-ot, maradt 1.');
    expect(spokenSubStep(t[2])).toBe('1 meg 1 az 2. 2-höz 3, az 5. Leírom a 3-at.');
    const s = subSteps(403, 157);
    expect(spokenSubStep(s[1])).toBe('5 meg 1 az 6. 6-hoz 4, az 10. Leírom a 4-et, maradt 1.');
    expect(carryMarks(s, 3)).toEqual([null, 1, 1]);
    expect(carryMarks(s, 1)).toEqual([null, 1, null]);
    expect(carryCount(486, 253)).toBe(0);
    expect(carryCount(421, 186)).toBe(2);
  });

  it('typical mistakes: forgotten maradék and reversed pótlás', () => {
    expect(forgotCarry(372, 145)).toBe(237);
    expect(forgotCarry(403, 157)).toBe(356);
    const s = subSteps(372, 145);
    expect(stepHint(s[1], 3)).toContain('maradékot');
    expect(stepHint(s[0], 3)).toContain('Fordítva');
    expect(stepHint(s[0], 7)).toBe('');
  });

  it('renders the column with maradék marks', () => {
    const { container } = render(<WrittenSubG3Column minuend={372} subtrahend={145} result={227} carries={[null, 1]} />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.textContent).toContain('1');
  });
});
