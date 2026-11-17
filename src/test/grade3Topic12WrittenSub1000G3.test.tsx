import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenSub1000G3Theory } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-kivonas-1000-ig/WrittenSub1000G3Theory';
import { WrittenSub1000G3Quiz, WRITTEN_SUB_1000_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-kivonas-1000-ig/WrittenSub1000G3Quiz';
import { WrittenSub1000G3Matcher, WRITTEN_SUB_1000_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-kivonas-1000-ig/WrittenSub1000G3Matcher';
import { WrittenSub1000G3Sorter, WRITTEN_SUB_1000_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-kivonas-1000-ig/WrittenSub1000G3Sorter';
import { RecapSubSvg, ZeroTensSubSvg, RoundHundredSubSvg, ThousandSubSvg, CheckAddSubSvg, PuzzleBarSvg } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-kivonas-1000-ig/WrittenSub1000G3Figures';
import { stepsSub, spokenSub, carryMarksSub, forgotSub, swappedSub, subHint, makeSubTask, SubKind } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-kivonas-1000-ig/WrittenSub1000G3Parts';

describe('Grade 3 Topic XII - 2. Írásbeli kivonás 1000-ig - Components', () => {
  it('renders WrittenSub1000G3Theory without throwing', () => {
    const { container } = render(<WrittenSub1000G3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<WrittenSub1000G3Theory />);
    expect(getAllByText(/XII. ÍRÁSBELI MŰVELETEK 1000-IG/).length).toBeGreaterThan(0);
  });

  it('renders WrittenSub1000G3Quiz without throwing', () => {
    const { container } = render(<WrittenSub1000G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(WRITTEN_SUB_1000_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WRITTEN_SUB_1000_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(WRITTEN_SUB_1000_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    WRITTEN_SUB_1000_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(WRITTEN_SUB_1000_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = WRITTEN_SUB_1000_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = WRITTEN_SUB_1000_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders WrittenSub1000G3Matcher and WrittenSub1000G3Sorter without throwing', () => {
    expect(render(<WrittenSub1000G3Matcher />).container).toBeTruthy();
    expect(render(<WrittenSub1000G3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [RecapSubSvg, ZeroTensSubSvg, RoundHundredSubSvg, ThousandSubSvg, CheckAddSubSvg, PuzzleBarSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 3 Topic XII - written subtraction helpers (pótlásos-maradékos)', () => {
  it('the generator stays within 1000 and the steps give the right difference', () => {
    (['ismetles', 'nulla', 'kerek', 'ezer'] as SubKind[]).forEach((k) => {
      for (let i = 0; i < 40; i++) {
        const [a, b] = makeSubTask(k);
        expect(a).toBeLessThanOrEqual(1000);
        expect(b).toBeLessThan(a);
        if (k === 'ezer') expect(a).toBe(1000);
        if (k === 'kerek') expect(a % 100).toBe(0);
        if (k === 'nulla') expect(Math.floor(a / 10) % 10).toBe(0);
        const r = stepsSub(a, b).reduce((s, st) => s + st.write * 10 ** st.col, 0);
        expect(r).toBe(a - b);
      }
    });
  });

  it('speaks 1000 − 347 with the pótlásos method', () => {
    const st = stepsSub(1000, 347);
    expect(st).toHaveLength(4);
    expect(spokenSub(st[0], st)).toBe('7-hez 3, az 10. Leírom a 3-at, maradt 1.');
    expect(spokenSub(st[1], st)).toBe('4 meg 1 az 5. 5-höz 5, az 10. Leírom az 5-öt, maradt 1.');
    expect(spokenSub(st[2], st)).toBe('3 meg 1 az 4. 4-hez 6, az 10. Leírom a 6-ot, maradt 1.');
    expect(spokenSub(st[3], st)).toContain('0-t nem írunk');
    expect(carryMarksSub(st, 4)).toEqual([null, 1, 1, 1]);
    const z = stepsSub(704, 258);
    expect(spokenSub(z[1], z)).toBe('5 meg 1 az 6. 6-hoz 4, az 10. Leírom a 4-et, maradt 1.');
  });

  it('typical mistakes', () => {
    expect(forgotSub(1000, 347)).toBe(763);
    expect(swappedSub(613, 357)).toBe(344);
    const z = stepsSub(704, 258);
    expect(subHint(z[1], 5)).toContain('maradékot');
    expect(subHint(z[1], 4)).toBe('');
  });
});
