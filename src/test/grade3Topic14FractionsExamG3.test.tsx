import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { FractionsExamG3Theory } from '@/components/math/grade-3/tortes-szamok/gyakorlas-tudasproba/FractionsExamG3Theory';
import { FractionsExamG3Quiz, FRACTIONS_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/tortes-szamok/gyakorlas-tudasproba/FractionsExamG3Quiz';
import { FractionsExamG3Matcher, FRACTIONS_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/tortes-szamok/gyakorlas-tudasproba/FractionsExamG3Matcher';
import { FractionsExamG3Sorter, FRACTIONS_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/tortes-szamok/gyakorlas-tudasproba/FractionsExamG3Sorter';
import { makeColorTask, makeMixTask, MIX_KINDS } from '@/components/math/grade-3/tortes-szamok/gyakorlas-tudasproba/FractionsExamG3Parts';
import { PieNamesSvg, WholeStripsSvg, RodsSvg, AmountsSvg } from '@/components/math/grade-3/tortes-szamok/gyakorlas-tudasproba/FractionsExamG3Figures';

describe('Grade 3 Topic XIV - 4. Gyakorlás, tudáspróba', () => {
  it('renders FractionsExamG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<FractionsExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders FractionsExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<FractionsExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(FRACTIONS_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(FRACTIONS_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(FRACTIONS_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    FRACTIONS_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(FRACTIONS_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('renders FractionsExamG3Matcher and FractionsExamG3Sorter without throwing', () => {
    expect(render(<FractionsExamG3Matcher />).container).toBeTruthy();
    expect(render(<FractionsExamG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [PieNamesSvg, WholeStripsSvg, RodsSvg, AmountsSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per category', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const m = FRACTIONS_EXAM_G3_MATCHER_LEVELS[l];
      expect(m.pairs).toHaveLength(8);
      expect(m.pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(m.pairs.map((p) => String(p.right))).size).toBe(8);
      const s = FRACTIONS_EXAM_G3_SORTER_LEVELS[l];
      expect(s.items).toHaveLength(27);
      s.categories.forEach((c) => {
        const items = s.items.filter((i) => i.categoryId === c.id);
        expect(items).toHaveLength(9);
        expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  it('lab generators are consistent and stay within 1000', () => {
    for (let i = 0; i < 300; i++) {
      const c = makeColorTask();
      expect(c.k).toBeGreaterThanOrEqual(1);
      expect(c.k).toBeLessThan(c.n);
      MIX_KINDS.forEach(({ id }) => {
        const t = makeMixTask(id);
        expect(t.text).toBeTruthy();
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        expect(t.options).toContain(t.answer);
        (t.text.match(/\d+/g) ?? []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000));
      });
    }
  });
});
