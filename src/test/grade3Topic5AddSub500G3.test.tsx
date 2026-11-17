import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AddSub500G3Theory, makeSplitTask } from '@/components/math/grade-3/szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Theory';
import { AddSub500G3Quiz, ADD_SUB_500_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Quiz';
import { AddSub500G3Matcher, ADD_SUB_500_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Matcher';
import { AddSub500G3Sorter, ADD_SUB_500_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Sorter';
import {
  AddSub500CoinsSvg,
  AddSub500AnalogySvg,
  AddSub500BridgeSvg,
  AddSub500BridgeBackSvg,
  AddSub500SplitAddSvg,
  AddSub500SplitSubSvg,
  AddSub500ToFiveHundredSvg
} from '@/components/math/grade-3/szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Figures';

describe('Grade 3 Topic V - 3. Összeadás és kivonás - Components', () => {
  it('renders AddSub500G3Theory without throwing', () => {
    const { container } = render(<AddSub500G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub500G3Quiz without throwing', () => {
    const { container } = render(<AddSub500G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(ADD_SUB_500_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(ADD_SUB_500_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    ADD_SUB_500_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = ADD_SUB_500_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = ADD_SUB_500_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders AddSub500G3Matcher without throwing', () => {
    const { container } = render(<AddSub500G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders AddSub500G3Sorter without throwing', () => {
    const { container } = render(<AddSub500G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [AddSub500CoinsSvg, AddSub500AnalogySvg, AddSub500BridgeSvg, AddSub500BridgeBackSvg, AddSub500SplitAddSvg, AddSub500SplitSubSvg, AddSub500ToFiveHundredSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('theory shows the chapter badge', () => {
    const { getAllByText } = render(<AddSub500G3Theory />);
    expect(getAllByText('3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG').length).toBeGreaterThan(0);
  });

  it('no number above 500 in questions and options; at least 18 figures', () => {
    ADD_SUB_500_G3_QUESTIONS.forEach((q) => {
      [q.question, ...q.options.map(String)].forEach((s) => (String(s).match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(500)));
    });
    expect(ADD_SUB_500_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('split lab tasks are consistent and stay within 0–500', () => {
    [true, false].forEach((plus) => {
      for (let i = 0; i < 300; i++) {
        const t = makeSplitTask(plus);
        expect(t.b).toBe(t.h + t.t);
        expect(t.res).toBe(plus ? t.a + t.b : t.a - t.b);
        expect(t.mid).toBe(plus ? t.a + t.h : t.a - t.h);
        expect(t.res).toBeGreaterThanOrEqual(0);
        expect(t.res).toBeLessThanOrEqual(500);
        expect(new Set(t.midOpts).size).toBe(4);
        expect(new Set(t.resOpts).size).toBe(4);
        expect(t.midOpts).toContain(t.mid);
        expect(t.resOpts).toContain(t.res);
        [...t.midOpts, ...t.resOpts].forEach((v) => {
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual(500);
        });
      }
    });
  });
});
