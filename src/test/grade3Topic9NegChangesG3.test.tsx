import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NegChangesG3Theory, makeSetTask, setTarget, makeReadTask, makeReadOptions, makeOrderSet } from '@/components/math/grade-3/negativ-szamok/osszehasonlitas-es-valtozasok/NegChangesG3Theory';
import { NegChangesG3Quiz, NEG_CHANGES_G3_QUESTIONS } from '@/components/math/grade-3/negativ-szamok/osszehasonlitas-es-valtozasok/NegChangesG3Quiz';
import { NegChangesG3Matcher, NEG_CHANGES_G3_MATCHER_LEVELS } from '@/components/math/grade-3/negativ-szamok/osszehasonlitas-es-valtozasok/NegChangesG3Matcher';
import { NegChangesG3Sorter, NEG_CHANGES_G3_SORTER_LEVELS } from '@/components/math/grade-3/negativ-szamok/osszehasonlitas-es-valtozasok/NegChangesG3Sorter';
import { ColderWarmerSvg, OrderSvg, WarmUpSvg, AcrossZeroSvg, CoolDownSvg, BothBelowSvg, UpDownSvg } from '@/components/math/grade-3/negativ-szamok/osszehasonlitas-es-valtozasok/NegChangesG3Figures';
import { changeText } from '@/components/math/grade-3/negativ-szamok/osszehasonlitas-es-valtozasok/NegChangesG3Parts';

/** „–3 °C → 5 °C” → [-3, 5] */
const parseArrow = (s: string): [number, number] | null => {
  const m = s.match(/^(–?\d+) °C → (–?\d+) °C$/);
  return m ? [Number(m[1].replace('–', '-')), Number(m[2].replace('–', '-'))] : null;
};
/** „–2 °C volt, melegedett 6 fokkal” / „5 °C, hűlt 7 fokkal” → eredmény */
const parseStartChange = (s: string): number | null => {
  const m = s.match(/^(–?\d+) °C(?: volt)?, (melegedett|hűlt) (\d+) fokkal$/);
  if (!m) return null;
  const a = Number(m[1].replace('–', '-'));
  return m[2] === 'melegedett' ? a + Number(m[3]) : a - Number(m[3]);
};

describe('Grade 3 Topic IX - 3. Összehasonlítás és változások - Components', () => {
  it('renders NegChangesG3Theory with the chapter badge', () => {
    const { container } = render(<NegChangesG3Theory />);
    expect(container.textContent).toContain('3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG');
  });

  it('renders NegChangesG3Quiz without throwing', () => {
    expect(render(<NegChangesG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(NEG_CHANGES_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NEG_CHANGES_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    NEG_CHANGES_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(NEG_CHANGES_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(NEG_CHANGES_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('uses the textbook minus sign (en dash), never a hyphen before a number', () => {
    NEG_CHANGES_G3_QUESTIONS.forEach((q) => {
      [q.question, q.explanation, ...q.options.map(String)].forEach((s) => expect(String(s)).not.toMatch(/(^|\s)-\d/));
    });
  });

  it('changeText is right', () => {
    expect(changeText(-3, 5)).toBe('melegedett 8 fokkal');
    expect(changeText(4, -2)).toBe('hűlt 6 fokkal');
    expect(changeText(-1, -1)).toBe('nem változott');
  });

  it('matcher: 3 levels x 8 pairs, distinct values, the text pairs are correct', () => {
    [1, 2, 3].forEach((l) => {
      const m = NEG_CHANGES_G3_MATCHER_LEVELS[l as 1 | 2 | 3];
      expect(m.pairs).toHaveLength(8);
      const rights = m.pairs.map((p: any) => p.right).filter((r: any) => r);
      expect(new Set(rights).size).toBe(rights.length);
      expect(m.pairs.filter((p: any) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      m.pairs.forEach((p: any) => {
        const ar = parseArrow(p.left);
        if (ar) expect(changeText(ar[0], ar[1])).toBe(p.right);
        const r = parseStartChange(p.left);
        if (r !== null && p.right) expect(p.right).toBe(`${r < 0 ? '–' + -r : r} °C`);
      });
    });
  });

  it('sorter: 3 levels x 3 categories x 9 items, text items correct', () => {
    [1, 2, 3].forEach((l) => {
      const s = NEG_CHANGES_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => {
        const its = s.items.filter((it: any) => it.categoryId === c.id);
        expect(its).toHaveLength(9);
        expect(its.filter((it: any) => it.figure).length).toBeGreaterThanOrEqual(4);
      });
    });
    const cat1: Record<string, string> = { up: 'melegedett', down: 'hűlt', same: 'nem változott' };
    NEG_CHANGES_G3_SORTER_LEVELS[1].items.forEach((it: any) => {
      const ar = parseArrow(it.text);
      if (ar) expect(changeText(ar[0], ar[1]).startsWith(cat1[it.categoryId])).toBe(true);
    });
    NEG_CHANGES_G3_SORTER_LEVELS[2].items.forEach((it: any) => {
      const ar = parseArrow(it.text);
      if (ar) expect(`d${Math.abs(ar[0] - ar[1])}`).toBe(it.categoryId);
    });
    const cat3: Record<string, number> = { m2: -2, z0: 0, p3: 3 };
    NEG_CHANGES_G3_SORTER_LEVELS[3].items.forEach((it: any) => {
      const r = parseStartChange(it.text);
      if (r !== null) expect(r).toBe(cat3[it.categoryId]);
    });
  });

  it('labs generate consistent tasks', () => {
    for (let i = 0; i < 300; i++) {
      const t = makeSetTask();
      const e = setTarget(t);
      expect(e).toBeGreaterThanOrEqual(-10);
      expect(e).toBeLessThanOrEqual(10);
      const r = makeReadTask();
      expect(r.opts).toHaveLength(4);
      expect(new Set(r.opts).size).toBe(4);
      expect(r.opts).toContain(changeText(r.a, r.b));
      const o = makeOrderSet();
      expect(new Set(o).size).toBe(5);
    }
    expect(makeReadOptions(-2, 5)).toContain('melegedett 3 fokkal');
  });

  it('renders NegChangesG3Matcher and NegChangesG3Sorter without throwing', () => {
    expect(render(<NegChangesG3Matcher />).container).toBeTruthy();
    expect(render(<NegChangesG3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [ColderWarmerSvg, OrderSvg, WarmUpSvg, AcrossZeroSvg, CoolDownSvg, BothBelowSvg, UpDownSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
