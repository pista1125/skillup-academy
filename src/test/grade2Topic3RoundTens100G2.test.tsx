import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RoundTens100G2Theory } from '@/components/math/grade-2/szamolas-100-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Theory';
import {
  RoundTens100G2Quiz,
  ROUND_TENS100_G2_QUESTIONS
} from '@/components/math/grade-2/szamolas-100-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Quiz';
import {
  RoundTens100G2Matcher,
  ROUND_TENS100_G2_MATCHER_LEVELS
} from '@/components/math/grade-2/szamolas-100-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Matcher';
import {
  RoundTens100G2Sorter,
  ROUND_TENS100_G2_SORTER_LEVELS
} from '@/components/math/grade-2/szamolas-100-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Sorter';
import {
  RoundTensStairsSvg,
  SmallBigAnalogySvg,
  KeepOnesAddSvg,
  TakeTensSvg,
  TensJumpLineSvg,
  HundredSplitCoinsSvg
} from '@/components/math/grade-2/szamolas-100-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Figures';
import {
  makeRodTask,
  rodTaskAnswer,
  rodTaskOptions
} from '@/components/math/grade-2/szamolas-100-ig/osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Parts';

describe('Grade 2 Topic III - 4. Összeadás, kivonás kerek tízesekkel - Components', () => {
  it('renders RoundTens100G2Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RoundTens100G2Theory />);
    expect(container).toBeTruthy();
  });

  it('renders RoundTens100G2Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RoundTens100G2Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge, explanation, correctAnswer 0, and distinct options', () => {
    expect(ROUND_TENS100_G2_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ROUND_TENS100_G2_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ROUND_TENS100_G2_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      const nums = (String(q.question) + ' ' + q.options.map(String).join(' ')).match(/\d+/g) || [];
      nums.map(Number).forEach((n) => expect(n).toBeLessThanOrEqual(100));
    });
    expect(new Set(ROUND_TENS100_G2_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(ROUND_TENS100_G2_QUESTIONS.filter((q) => Boolean(q.figure)).length).toBeGreaterThanOrEqual(18);
  });

  it('lab generator stays within 0–100 and options contain the answer', () => {
    for (let i = 0; i < 300; i++) {
      const t = makeRodTask();
      const ans = rodTaskAnswer(t);
      expect(ans).toBeGreaterThanOrEqual(0);
      expect(ans).toBeLessThanOrEqual(100);
      const opts = rodTaskOptions(t);
      expect(opts).toContain(ans);
      expect(new Set(opts).size).toBe(opts.length);
      opts.forEach((o) => expect(o).toBeLessThanOrEqual(100));
    }
  });

  it('renders RoundTens100G2Matcher without throwing', () => {
    const { container } = render(<RoundTens100G2Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RoundTens100G2Sorter without throwing', () => {
    const { container } = render(<RoundTens100G2Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [RoundTensStairsSvg, SmallBigAnalogySvg, KeepOnesAddSvg, TakeTensSvg, TensJumpLineSvg, HundredSplitCoinsSvg].forEach(
      (Fig) => {
        const { container } = render(<Fig />);
        expect(container.querySelector('svg')).toBeTruthy();
      }
    );
  });

  it('has card figures on at least 4 matcher pairs and at least 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = ROUND_TENS100_G2_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));

      const items = ROUND_TENS100_G2_SORTER_LEVELS[l].items ?? [];
      expect(items).toHaveLength(9);
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
