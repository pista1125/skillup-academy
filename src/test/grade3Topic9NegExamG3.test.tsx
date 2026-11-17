import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NegExamG3Theory, makeExamTask, EXAM_KINDS, makeDiary, diaryNoon, diaryEvening } from '@/components/math/grade-3/negativ-szamok/gyakorlas-tudasproba/NegExamG3Theory';
import { NegExamG3Quiz, NEG_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/negativ-szamok/gyakorlas-tudasproba/NegExamG3Quiz';
import { NegExamG3Matcher, NEG_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/negativ-szamok/gyakorlas-tudasproba/NegExamG3Matcher';
import { NegExamG3Sorter, NEG_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/negativ-szamok/gyakorlas-tudasproba/NegExamG3Sorter';
import { ExamThermoSvg, ExamLineSvg, ExamBuildingSvg, ExamOrderSvg, ExamChangeSvg, ExamTwoPartsSvg } from '@/components/math/grade-3/negativ-szamok/gyakorlas-tudasproba/NegExamG3Figures';
import { changeText } from '@/components/math/grade-3/negativ-szamok/gyakorlas-tudasproba/NegExamG3Parts';

const num = (s: string) => Number(s.replace('–', '-'));
/** „–3 °C → 5 °C” → [-3, 5] */
const parseArrow = (s: string): [number, number] | null => {
  const m = s.match(/^(–?\d+) °C → (–?\d+) °C$/);
  return m ? [num(m[1]), num(m[2])] : null;
};
const parseStartChange = (s: string): number | null => {
  const m = s.match(/^(–?\d+) °C volt, (melegedett|hűlt) (\d+) fokkal$/);
  if (!m) return null;
  return m[2] === 'melegedett' ? num(m[1]) + Number(m[3]) : num(m[1]) - Number(m[3]);
};

describe('Grade 3 Topic IX - 4. Gyakorlás, tudáspróba', () => {
  it('renders the theory with the chapter badge', { timeout: 20000 }, () => {
    const { container } = render(<NegExamG3Theory />);
    expect(container.textContent).toContain('3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG');
  });

  it('renders the quiz without throwing', { timeout: 20000 }, () => {
    expect(render(<NegExamG3Quiz />).container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0 and distinct options', () => {
    expect(NEG_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(NEG_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(NEG_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    NEG_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(NEG_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('uses the textbook minus sign and small numbers only', () => {
    NEG_EXAM_G3_QUESTIONS.forEach((q) => {
      [q.question, q.explanation, ...q.options.map(String)].forEach((s) => {
        expect(String(s)).not.toMatch(/(^|\s)-\d/);
        (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(40));
      });
    });
  });

  it('matcher: 3 levels x 8 pairs, distinct values, text pairs correct', () => {
    [1, 2, 3].forEach((l) => {
      const m = NEG_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3];
      expect(m.pairs).toHaveLength(8);
      const rights = m.pairs.map((p: any) => p.right).filter((r: any) => r);
      expect(new Set(rights).size).toBe(rights.length);
      expect(m.pairs.filter((p: any) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      m.pairs.forEach((p: any) => {
        const r = parseStartChange(p.left);
        if (r !== null) expect(p.right).toBe(`${r < 0 ? '–' + -r : r} °C`);
      });
    });
  });

  it('sorter: 3 levels x 3 categories x 9 items, text items correct', () => {
    [1, 2, 3].forEach((l) => {
      const s = NEG_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => {
        const its = s.items.filter((it: any) => it.categoryId === c.id);
        expect(its).toHaveLength(9);
        expect(its.filter((it: any) => it.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
    NEG_EXAM_G3_SORTER_LEVELS[3].items.forEach((it: any) => {
      const ar = parseArrow(it.text);
      if (ar) expect(`s${Math.abs(ar[0] - ar[1])}`).toBe(it.categoryId);
    });
    const band = (v: number) => (v < -4 ? 'cold' : v < 0 ? 'mid' : 'warm');
    NEG_EXAM_G3_SORTER_LEVELS[2].items.forEach((it: any) => {
      const m = String(it.text).match(/^(–?\d+) °C$/);
      if (m) expect(band(num(m[1]))).toBe(it.categoryId);
    });
  });

  it('exam lab: every kind gives consistent tasks', () => {
    EXAM_KINDS.forEach((k) => {
      for (let i = 0; i < 300; i++) {
        const t = makeExamTask(k);
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        if (k === 'change') expect(t.answer).toBe(changeText(t.a, t.b));
      }
    });
  });

  it('diary lab stays in range and crosses 0', () => {
    for (let i = 0; i < 300; i++) {
      const d = makeDiary();
      const n = diaryNoon(d);
      const e = diaryEvening(d);
      expect(n).toBeLessThanOrEqual(10);
      expect(e).toBeGreaterThanOrEqual(-10);
      expect((d.r < 0 && n > 0) || (n > 0 && e < 0)).toBe(true);
    }
  });

  it('renders matcher, sorter and figures without throwing', () => {
    expect(render(<NegExamG3Matcher />).container).toBeTruthy();
    expect(render(<NegExamG3Sorter />).container).toBeTruthy();
    [ExamThermoSvg, ExamLineSvg, ExamBuildingSvg, ExamOrderSvg, ExamChangeSvg, ExamTwoPartsSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });
});
