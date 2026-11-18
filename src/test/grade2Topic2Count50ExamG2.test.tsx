import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Count50ExamG2Theory } from '@/components/math/grade-2/szamolas-50-ig/megallo/Count50ExamG2Theory';
import { Count50ExamG2Quiz, COUNT50_EXAM_G2_QUESTIONS } from '@/components/math/grade-2/szamolas-50-ig/megallo/Count50ExamG2Quiz';
import { Count50ExamG2Matcher, COUNT50_EXAM_G2_MATCHER_LEVELS } from '@/components/math/grade-2/szamolas-50-ig/megallo/Count50ExamG2Matcher';
import { Count50ExamG2Sorter, COUNT50_EXAM_G2_SORTER_LEVELS } from '@/components/math/grade-2/szamolas-50-ig/megallo/Count50ExamG2Sorter';
import {
  Count50MapSvg,
  Count50PlaceValueSvg,
  Count50NeighborsSvg,
  Count50BridgeSvg,
  Count50EvenOddSvg,
  Count50PyramidSvg
} from '@/components/math/grade-2/szamolas-50-ig/megallo/Count50ExamG2Figures';
import {
  EXAM50_TASK_KINDS,
  makeExam50Task,
  makePyramid50Task
} from '@/components/math/grade-2/szamolas-50-ig/megallo/Count50ExamG2Parts';

describe('Grade 2 Topic II - 6. Megálló – tudáspróba', () => {
  it('renders Count50ExamG2Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<Count50ExamG2Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders Count50ExamG2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count50ExamG2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0, distinct options, and >= 54 figures', () => {
    expect(COUNT50_EXAM_G2_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNT50_EXAM_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNT50_EXAM_G2_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNT50_EXAM_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(4);
      (String(q.question).match(/\d+/g) || []).map(Number).forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(50);
      });
      expect(String(q.question)).not.toMatch(/\d\s*[·:]\s*\d/);
    });
    expect(COUNT50_EXAM_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(54);
  });

  it('lab task generators stay strictly within 0–50 and remain consistent', () => {
    EXAM50_TASK_KINDS.forEach(({ id }) => {
      for (let i = 0; i < 150; i++) {
        const t = makeExam50Task(id);
        expect(t.text).toBeTruthy();
        expect(Number.isInteger(t.answer)).toBe(true);
        expect(t.answer).toBeGreaterThanOrEqual(0);
        expect(t.answer).toBeLessThanOrEqual(50);
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(50));
        t.mistakes.forEach((m) => expect(m.value).not.toBe(t.answer));
      }
    });
    for (let i = 0; i < 150; i++) {
      const p = makePyramid50Task();
      expect(p.b1 + p.b2).toBe(p.m1);
      expect(p.b2 + p.b3).toBe(p.m2);
      expect(p.m1 + p.m2).toBe(p.top);
      expect(p.top).toBeLessThanOrEqual(50);
    }
  });

  it('renders Count50ExamG2Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count50ExamG2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Count50ExamG2Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count50ExamG2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all Theory figure SVGs without throwing', () => {
    [Count50MapSvg, Count50PlaceValueSvg, Count50NeighborsSvg, Count50BridgeSvg, Count50EvenOddSvg, Count50PyramidSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = COUNT50_EXAM_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);

      const items = COUNT50_EXAM_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
