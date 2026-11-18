import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RoundTens50G2Theory } from '@/components/math/grade-2/szamolas-50-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Theory';
import {
  RoundTens50G2Quiz,
  ROUND_TENS50_G2_QUESTIONS
} from '@/components/math/grade-2/szamolas-50-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Quiz';
import {
  RoundTens50G2Matcher,
  ROUND_TENS50_G2_MATCHER_LEVELS
} from '@/components/math/grade-2/szamolas-50-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Matcher';
import {
  RoundTens50G2Sorter,
  ROUND_TENS50_G2_SORTER_LEVELS
} from '@/components/math/grade-2/szamolas-50-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Sorter';
import {
  RoundTensStairsSvg,
  SmallBigAnalogySvg,
  TakeAwayRodsSvg,
  OnlyTensChangeSvg,
  TensJumpsLineSvg,
  PayFortySvg
} from '@/components/math/grade-2/szamolas-50-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Figures';
import { makeRodTask } from '@/components/math/grade-2/szamolas-50-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Parts';

describe('Grade 2 Topic II - 4. Összeadás, kivonás kerek tízesekkel - Components', () => {
  it('renders RoundTens50G2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RoundTens50G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RoundTens50G2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RoundTens50G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, distinct options, numbers <= 50', () => {
    expect(ROUND_TENS50_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROUND_TENS50_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROUND_TENS50_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      (String(q.question).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(50));
    });
    expect(new Set(ROUND_TENS50_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(ROUND_TENS50_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('lab generator stays within 0–50 and is consistent', () => {
    for (let i = 0; i < 200; i++) {
      const t = makeRodTask();
      expect(t.start + t.delta).toBe(t.answer);
      expect(Math.abs(t.delta) % 10).toBe(0);
      expect(t.answer).toBeGreaterThanOrEqual(0);
      expect(t.answer).toBeLessThanOrEqual(50);
      expect(t.options).toContain(t.answer);
      expect(new Set(t.options).size).toBe(4);
    }
  });

  it('renders RoundTens50G2Matcher without throwing', () => {
    const { container } = render(<RoundTens50G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RoundTens50G2Sorter without throwing', () => {
    const { container } = render(<RoundTens50G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [RoundTensStairsSvg, SmallBigAnalogySvg, TakeAwayRodsSvg, OnlyTensChangeSvg, TensJumpsLineSvg, PayFortySvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = ROUND_TENS50_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      const items = ROUND_TENS50_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
