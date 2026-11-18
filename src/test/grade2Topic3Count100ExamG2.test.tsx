import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Count100ExamG2Theory } from '@/components/math/grade-2/szamolas-100-ig/megallo/Count100ExamG2Theory';
import { Count100ExamG2Quiz, COUNT100_EXAM_G2_QUESTIONS } from '@/components/math/grade-2/szamolas-100-ig/megallo/Count100ExamG2Quiz';
import { Count100ExamG2Matcher, COUNT100_EXAM_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szamolas-100-ig/megallo/Count100ExamG2Matcher';
import { Count100ExamG2Sorter, COUNT100_EXAM_G2_SORTER_LEVELS } from '@/components/math/grade-2/szamolas-100-ig/megallo/Count100ExamG2Sorter';
import {
  Count100MapSvg,
  Count100HundredSquareSvg,
  Count100BridgeAddSvg,
  Count100BridgeSubSvg,
  Count100PyramidSvg,
  Count100StripSvg,
  Count100RodsSvg
} from '@/components/math/grade-2/szamolas-100-ig/megallo/Count100ExamG2Figures';
import { EXAM_G2_TASK_KINDS, makeExamG2Task, makePyramidG2Task } from '@/components/math/grade-2/szamolas-100-ig/megallo/Count100ExamG2Parts';

describe('Grade 2 Topic III - 6. Megálló – tudáspróba', () => {
  it('renders Count100ExamG2Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<Count100ExamG2Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders Count100ExamG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count100ExamG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0, distinct options, and >= 54 figures', () => {
    expect(COUNT100_EXAM_G2_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNT100_EXAM_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNT100_EXAM_G2_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNT100_EXAM_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
      const nums = (String(q.question) + ' ' + q.options.map(String).join(' ')).match(/\d+/g) || [];
      nums.map(Number).forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(100);
      });
      // a III. témakörben csak + és −
      expect(String(q.question) + q.options.join(' ')).not.toMatch(/\d\s*[·:×]\s*\d/);
    });
    expect(COUNT100_EXAM_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(54);
  });

  it('lab task generators stay strictly within 0–100 and remain consistent', () => {
    EXAM_G2_TASK_KINDS.forEach(({ id }) => {
      for (let i = 0; i < 150; i++) {
        const t = makeExamG2Task(id);
        expect(t.text).toBeTruthy();
        expect(Number.isInteger(t.answer)).toBe(true);
        expect(t.answer).toBeGreaterThanOrEqual(0);
        expect(t.answer).toBeLessThanOrEqual(100);
        expect(t.options).toContain(t.answer);
        expect(t.options).toHaveLength(4);
        expect(new Set(t.options).size).toBe(4);
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(100));
      }
    });
    for (let i = 0; i < 150; i++) {
      const p = makePyramidG2Task();
      expect(p.b1 + p.b2).toBe(p.m1);
      expect(p.b2 + p.b3).toBe(p.m2);
      expect(p.m1 + p.m2).toBe(p.top);
      expect(p.top).toBeLessThanOrEqual(100);
    }
  });

  it('renders Count100ExamG2Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count100ExamG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Count100ExamG2Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count100ExamG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all Theory figure SVGs without throwing', () => {
    [
      Count100MapSvg,
      Count100HundredSquareSvg,
      Count100BridgeAddSvg,
      Count100BridgeSubSvg,
      Count100PyramidSvg,
      Count100StripSvg,
      Count100RodsSvg
    ].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = COUNT100_EXAM_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = COUNT100_EXAM_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
