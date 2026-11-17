import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulDiv500G3Theory, makeFamilyTask, makePackTask } from '@/components/math/grade-3/szamolas-500-ig/szorzas-es-osztas/MulDiv500G3Theory';
import { MulDiv500G3Quiz, MUL_DIV_500_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-500-ig/szorzas-es-osztas/MulDiv500G3Quiz';
import { MulDiv500G3Matcher, MUL_DIV_500_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/szorzas-es-osztas/MulDiv500G3Matcher';
import { MulDiv500G3Sorter, MUL_DIV_500_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/szorzas-es-osztas/MulDiv500G3Sorter';
import {
  MulDiv500BoxesSvg,
  MulDiv500AnalogySvg,
  MulDiv500HundredsSvg,
  MulDiv500SharingSvg,
  MulDiv500HopsSvg,
  MulDiv500CoinGridSvg
} from '@/components/math/grade-3/szamolas-500-ig/szorzas-es-osztas/MulDiv500G3Figures';

describe('Grade 3 Topic V - 4. Szorzás és osztás - Components', () => {
  it('renders MulDiv500G3Theory without throwing', () => {
    const { container } = render(<MulDiv500G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv500G3Quiz without throwing', () => {
    const { container } = render(<MulDiv500G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(MUL_DIV_500_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_DIV_500_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MUL_DIV_500_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = MUL_DIV_500_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = MUL_DIV_500_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders MulDiv500G3Matcher without throwing', () => {
    const { container } = render(<MulDiv500G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv500G3Sorter without throwing', () => {
    const { container } = render(<MulDiv500G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MulDiv500BoxesSvg, MulDiv500AnalogySvg, MulDiv500HundredsSvg, MulDiv500SharingSvg, MulDiv500HopsSvg, MulDiv500CoinGridSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('theory shows the chapter badge', () => {
    const { getAllByText } = render(<MulDiv500G3Theory />);
    expect(getAllByText('3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('no number above 500 in questions and options; at least 18 figures', () => {
    MUL_DIV_500_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(500)));
    });
    expect(MUL_DIV_500_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('lab task generators are consistent and stay within 0–500', () => {
    for (let i = 0; i < 300; i++) {
      const f = makeFamilyTask();
      expect(f.p).toBe(f.g * f.v);
      expect(f.p).toBeLessThanOrEqual(500);
      expect(f.v % 10).toBe(0);
      [[f.mulOpts, f.p], [f.divGOpts, f.v], [f.divVOpts, f.g]].forEach(([o, c]) => {
        const arr = o as number[];
        expect(new Set(arr).size).toBe(4);
        expect(arr).toContain(c);
        arr.forEach((v) => { expect(v).toBeGreaterThan(0); expect(v).toBeLessThanOrEqual(500); });
      });
      (['benn', 'reszek'] as const).forEach((m) => {
        const t = makePackTask(m);
        expect(t.n).toBeLessThanOrEqual(480);
        expect(t.n % 10).toBe(0);
        expect(t.n / t.s).toBe(t.answer);
        if (m === 'reszek') expect((t.n / 10) % t.s).toBe(0);
        else expect(t.s % 10).toBe(0);
        expect(new Set(t.answerOpts).size).toBe(4);
        expect(t.answerOpts).toContain(t.answer);
      });
    }
  });
});
