import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenMulG3Theory } from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Theory';
import { WrittenMulG3Quiz, WRITTEN_MUL_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Quiz';
import { WrittenMulG3Matcher, WRITTEN_MUL_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Matcher';
import { WrittenMulG3Sorter, WRITTEN_MUL_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Sorter';
import { WrittenMulG3Column, mulSteps, spokenMulStep } from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Column';
import { genMul, genHunt, simulateMul, mulKindOf, MUL_KINDS } from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Parts';
import {
  WrittenMulNamesSvg,
  WrittenMulDiscsSvg,
  WrittenMulStepsSvg,
  WrittenMulCheckSvg,
  WrittenMulZeroSvg
} from '@/components/math/grade-3/irasbeli-szorzas/irasbeli-szorzas-egyjegyu-szorzoval/WrittenMulG3Figures';

describe('Grade 3 Topic XIII - 3. Írásbeli szorzás egyjegyű szorzóval', () => {
  it('renders WrittenMulG3Theory with the chapter badge', { timeout: 20000 }, () => {
    const { container, getAllByText } = render(<WrittenMulG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG').length).toBeGreaterThan(0);
  });

  it('renders WrittenMulG3Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<WrittenMulG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(WRITTEN_MUL_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WRITTEN_MUL_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    WRITTEN_MUL_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(WRITTEN_MUL_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(WRITTEN_MUL_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('renders WrittenMulG3Matcher and WrittenMulG3Sorter without throwing', () => {
    expect(render(<WrittenMulG3Matcher />).container).toBeTruthy();
    expect(render(<WrittenMulG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs and the column component without throwing', () => {
    [WrittenMulNamesSvg, WrittenMulDiscsSvg, WrittenMulStepsSvg, WrittenMulCheckSvg, WrittenMulZeroSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
    const { container } = render(<WrittenMulG3Column a="1?6" m="?" result={624} carries={[null, 2, 2]} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(WRITTEN_MUL_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(WRITTEN_MUL_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(WRITTEN_MUL_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(WRITTEN_MUL_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(WRITTEN_MUL_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('mulSteps reproduces the product and speaks like the tradition', () => {
    for (let a = 101; a <= 499; a++) {
      for (let m = 2; m <= 9; m++) {
        if (a * m > 999) continue;
        const s = mulSteps(a, m);
        expect(Number(String(s[2].write) + String(s[1].write) + String(s[0].write))).toBe(a * m);
      }
    }
    expect(spokenMulStep(mulSteps(178, 4)[0])).toBe('4-szer 8 az 32. Leírom a 2-t, maradt 3.');
    expect(spokenMulStep(mulSteps(178, 4)[1])).toBe('4-szer 7 az 28, meg 3 az 31. Leírom az 1-et, maradt 3.');
    expect(spokenMulStep(mulSteps(178, 4)[2])).toBe('4-szer 1 az 4, meg 3 az 7. Leírom a 7-et.');
  });

  it('lab generators stay within 1000 and are consistent', () => {
    for (let i = 0; i < 200; i++) {
      MUL_KINDS.forEach((k) => {
        const t = genMul(k);
        expect(t.a * t.m).toBeLessThanOrEqual(999);
        expect(t.a).toBeGreaterThanOrEqual(100);
        expect(mulKindOf(t.a, t.m)).toBe(k);
      });
      const h = genHunt();
      expect(h.shown).toBeLessThanOrEqual(999);
      if (h.errCol === null) expect(h.shown).toBe(h.a * h.m);
      else {
        expect(h.shown).not.toBe(h.a * h.m);
        expect(h.shown).toBe(simulateMul(h.a, h.m, h.errCol, h.type));
        // a hibás oszlop alatti jegyek jók, a hibás oszlop jegye rossz
        const d = (n: number, c: number) => Math.floor(n / 10 ** c) % 10;
        for (let c = 0; c < h.errCol; c++) expect(d(h.shown, c)).toBe(d(h.a * h.m, c));
        expect(d(h.shown, h.errCol)).not.toBe(d(h.a * h.m, h.errCol));
      }
    }
  });
});
