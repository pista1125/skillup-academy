import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Count100ExamG3Theory, makeCount100Task, makeDivTask, Count100TaskKind } from '@/components/math/grade-3/szamolas-100-ig/megallo/Count100ExamG3Theory';
import { Count100ExamG3Quiz, COUNT100_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/megallo/Count100ExamG3Quiz';
import { Count100ExamG3Matcher, COUNT100_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-100-ig/megallo/Count100ExamG3Matcher';
import { Count100ExamG3Sorter, COUNT100_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-100-ig/megallo/Count100ExamG3Sorter';
import {
  Count100TensOnesSvg,
  Count100NumberLineSvg,
  Count100RemainderSvg,
  Count100OrderStepsSvg,
  Count100DominoSquareSvg,
  Count100ChainSvg
} from '@/components/math/grade-3/szamolas-100-ig/megallo/Count100ExamG3Figures';

describe('Grade 3 Topic I - 8. Megálló – tudáspróba', () => {
  it('renders Count100ExamG3Theory without throwing', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<Count100ExamG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders Count100ExamG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count100ExamG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, badge, explanation, correctAnswer 0 and distinct options', () => {
    expect(COUNT100_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(COUNT100_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(COUNT100_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    COUNT100_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    const withFig = COUNT100_EXAM_G3_QUESTIONS.filter((q) => q.figure).length;
    expect(withFig).toBeGreaterThanOrEqual(54);
  });

  it('lab task generators stay within 0–100 and are consistent', () => {
    const kinds: Count100TaskKind[] = ['szomszed', 'osszeadas', 'kivonas', 'szorzas', 'osztas', 'maradekos', 'sorrend', 'zarojel'];
    kinds.forEach((k) => {
      for (let i = 0; i < 200; i++) {
        const t = makeCount100Task(k);
        expect(t.text).toBeTruthy();
        t.answers.forEach((a) => {
          expect(Number.isInteger(a)).toBe(true);
          expect(a).toBeGreaterThanOrEqual(0);
          expect(a).toBeLessThanOrEqual(100);
        });
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(100));
        if (k === 'maradekos') {
          const [n, d] = (t.text.match(/\d+/g) || []).map(Number);
          expect(t.answers[1]).toBeLessThan(d);
          expect(t.answers[0] * d + t.answers[1]).toBe(n);
        }
        t.mistakes.forEach((m) => expect(m.values).not.toEqual(t.answers));
      }
    });
    for (let i = 0; i < 200; i++) {
      const d = makeDivTask();
      expect(d.total).toBeLessThanOrEqual(100);
      expect(Math.floor(d.total / d.size)).toBeGreaterThanOrEqual(2);
    }
  });

  it('renders Count100ExamG3Matcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count100ExamG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Count100ExamG3Sorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Count100ExamG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [Count100TensOnesSvg, Count100NumberLineSvg, Count100RemainderSvg, Count100OrderStepsSvg, Count100DominoSquareSvg, Count100ChainSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(COUNT100_EXAM_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(COUNT100_EXAM_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(COUNT100_EXAM_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(COUNT100_EXAM_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });
});

