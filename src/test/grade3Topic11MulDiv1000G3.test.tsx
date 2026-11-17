import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulDiv1000G3Theory } from '@/components/math/grade-3/szamolas-1000-ig/szorzas-es-osztas/MulDiv1000G3Theory';
import { makeStairTask, makeExchangeTask, StairKind } from '@/components/math/grade-3/szamolas-1000-ig/szorzas-es-osztas/MulDiv1000G3Parts';
import { MulDiv1000G3Quiz, MUL_DIV_1000_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-1000-ig/szorzas-es-osztas/MulDiv1000G3Quiz';
import { MulDiv1000G3Matcher, MUL_DIV_1000_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-1000-ig/szorzas-es-osztas/MulDiv1000G3Matcher';
import { MulDiv1000G3Sorter, MUL_DIV_1000_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-1000-ig/szorzas-es-osztas/MulDiv1000G3Sorter';
import {
  MulDiv1000TenHundredSvg,
  MulDiv1000StairSvg,
  MulDiv1000FlatsSvg,
  MulDiv1000SharingSvg,
  MulDiv1000HopsSvg,
  MulDiv1000ExchangeSvg
} from '@/components/math/grade-3/szamolas-1000-ig/szorzas-es-osztas/MulDiv1000G3Figures';

describe('Grade 3 Topic XI - 4. Szorzás és osztás (1000-ig) - Components', () => {
  it('renders MulDiv1000G3Theory without throwing', () => {
    const { container } = render(<MulDiv1000G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv1000G3Quiz without throwing', () => {
    const { container } = render(<MulDiv1000G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(MUL_DIV_1000_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_DIV_1000_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(MUL_DIV_1000_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    MUL_DIV_1000_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = MUL_DIV_1000_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = MUL_DIV_1000_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders MulDiv1000G3Matcher and MulDiv1000G3Sorter without throwing', () => {
    expect(render(<MulDiv1000G3Matcher />).container).toBeTruthy();
    expect(render(<MulDiv1000G3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MulDiv1000TenHundredSvg, MulDiv1000StairSvg, MulDiv1000FlatsSvg, MulDiv1000SharingSvg, MulDiv1000HopsSvg, MulDiv1000ExchangeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('theory shows the chapter badge', () => {
    const { getAllByText } = render(<MulDiv1000G3Theory />);
    expect(getAllByText('3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('no number above 1000 in questions and options; at least 18 figures', () => {
    MUL_DIV_1000_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000)));
    });
    expect(MUL_DIV_1000_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('lab task generators are consistent and stay within 0–1000', () => {
    const kinds: StairKind[] = ['tizes', 'szazas', 'reszek', 'benn'];
    for (let i = 0; i < 300; i++) {
      kinds.forEach((k) => {
        const t = makeStairTask(k);
        const [x, op, y] = t.big.split(' ');
        const A = Number(x);
        const B = Number(y);
        expect(op === '·' ? A * B : A / B).toBe(t.bigAns);
        expect(A).toBeLessThanOrEqual(1000);
        expect(t.bigAns).toBeLessThanOrEqual(1000);
        const [sx, sop, sy] = t.small.split(' ');
        expect(sop === '·' ? Number(sx) * Number(sy) : Number(sx) / Number(sy)).toBe(t.smallAns);
        [[t.smallOpts, t.smallAns], [t.bigOpts, t.bigAns]].forEach(([o, c]) => {
          const arr = o as number[];
          expect(new Set(arr).size).toBe(4);
          expect(arr).toContain(c);
          arr.forEach((v) => { expect(v).toBeGreaterThan(0); expect(v).toBeLessThanOrEqual(1000); });
        });
      });
      const e = makeExchangeTask();
      expect(e.total).toBeLessThanOrEqual(1000);
      expect(e.count * e.coin).toBe(e.total);
      expect(new Set(e.countOpts).size).toBe(4);
      expect(e.countOpts).toContain(e.count);
    }
  });
});
