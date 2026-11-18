import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MultExamG2Theory } from '@/components/math/grade-2/szorzas/gyakorlas-tudasproba/MultExamG2Theory';
import { MultExamG2Quiz, MULT_EXAM_G2_QUESTIONS } from '@/components/math/grade-2/szorzas/gyakorlas-tudasproba/MultExamG2Quiz';
import { MultExamG2Matcher, MULT_EXAM_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szorzas/gyakorlas-tudasproba/MultExamG2Matcher';
import { MultExamG2Sorter, MULT_EXAM_G2_SORTER_LEVELS } from '@/components/math/grade-2/szorzas/gyakorlas-tudasproba/MultExamG2Sorter';
import {
  MultMeaningSvg,
  CommuteArraySvg,
  ProductGridSvg,
  Links248Svg,
  Links369Svg,
  Link510Svg,
} from '@/components/math/grade-2/szorzas/gyakorlas-tudasproba/MultExamG2Figures';
import {
  MULT_KINDS,
  makeMultTask,
  cellsFor,
  DETECTIVE_TARGETS,
  makeDetectiveTarget,
} from '@/components/math/grade-2/szorzas/gyakorlas-tudasproba/MultExamG2Parts';

describe('Grade 2 Topic IV - 10. Gyakorlás, tudáspróba (szorzás)', () => {
  it('renders MultExamG2Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<MultExamG2Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('2. OSZTÁLY • IV. SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders MultExamG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MultExamG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0, distinct options, no division, >= 54 figures', () => {
    expect(MULT_EXAM_G2_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(MULT_EXAM_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(MULT_EXAM_G2_QUESTIONS.map((q) => q.id)).size).toBe(90);
    MULT_EXAM_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.options.length).toBeLessThanOrEqual(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      const text = `${q.question} ${q.options.join(' ')} ${q.explanation}`;
      expect(text).not.toMatch(/\d : \d/);
      (String(q.question).match(/\d+/g) || []).map(Number).forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(100);
      });
    });
    expect(MULT_EXAM_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(54);
  });

  it('Labor I generator stays within the tables and is consistent', () => {
    [0, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((table) => {
      MULT_KINDS.forEach(({ id }) => {
        for (let i = 0; i < 80; i++) {
          const t = makeMultTask(id, table);
          expect(t.text).toBeTruthy();
          expect(Number.isInteger(t.answer)).toBe(true);
          expect(t.answer).toBeGreaterThanOrEqual(0);
          expect(t.answer).toBeLessThanOrEqual(100);
          (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(100));
          expect(t.text).not.toContain(':');
          t.mistakes.forEach((m) => expect(m.value).not.toBe(t.answer));
        }
      });
    });
    const t = makeMultTask('szorzat', 7, () => 0.5);
    const [a, b] = (t.text.match(/\d+/g) || []).map(Number);
    expect(a * b).toBe(t.answer);
  });

  it('Labor II detective targets have 2–4 cells and products match', () => {
    expect(DETECTIVE_TARGETS.length).toBeGreaterThan(10);
    DETECTIVE_TARGETS.forEach((target) => {
      const cells = cellsFor(target);
      expect(cells.length).toBeGreaterThanOrEqual(2);
      expect(cells.length).toBeLessThanOrEqual(4);
      cells.forEach(([r, c]) => expect(r * c).toBe(target));
    });
    for (let i = 0; i < 50; i++) {
      const prev = DETECTIVE_TARGETS[i % DETECTIVE_TARGETS.length];
      expect(makeDetectiveTarget(prev)).not.toBe(prev);
    }
    expect(cellsFor(24)).toHaveLength(4);
  });

  it('renders MultExamG2Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MultExamG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MultExamG2Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<MultExamG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all Theory figure SVGs without throwing', () => {
    [MultMeaningSvg, CommuteArraySvg, ProductGridSvg, Links248Svg, Links369Svg, Link510Svg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = MULT_EXAM_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);

      const items = MULT_EXAM_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
