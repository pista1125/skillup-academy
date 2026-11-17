import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulDiv200G3Theory, makeMulDiv200Task } from '@/components/math/grade-3/szamolas-200-ig/szorzas-es-osztas/MulDiv200G3Theory';
import { MulDiv200G3Quiz, MUL_DIV_200_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-200-ig/szorzas-es-osztas/MulDiv200G3Quiz';
import { MulDiv200G3Matcher, MUL_DIV_200_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/szorzas-es-osztas/MulDiv200G3Matcher';
import { MulDiv200G3Sorter, MUL_DIV_200_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-200-ig/szorzas-es-osztas/MulDiv200G3Sorter';
import {
  MulDiv200TensSvg,
  MulDiv200LadderSvg,
  MulDiv200SharingSvg,
  MulDiv200GroupingSvg,
  MulDiv200CoinsSvg,
  MulDiv200FamilySvg
} from '@/components/math/grade-3/szamolas-200-ig/szorzas-es-osztas/MulDiv200G3Figures';

describe('Grade 3 Topic III - 5. Szorzás és osztás - Components', () => {
  it('renders MulDiv200G3Theory without throwing', () => {
    const { container } = render(<MulDiv200G3Theory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG');
  });

  it('renders MulDiv200G3Quiz without throwing', () => {
    const { container } = render(<MulDiv200G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(MUL_DIV_200_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_DIV_200_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MUL_DIV_200_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MUL_DIV_200_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    expect(MUL_DIV_200_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels × 8 pairs, at least 4 with a figure; sorter: 3 × 3 × 9', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = MUL_DIV_200_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      const cfg = MUL_DIV_200_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      cfg.categories.forEach((c) => expect(cfg.items.filter((i) => i.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('lab generator stays within 0–200 and is consistent', () => {
    for (let k = 0; k < 4; k++) {
      for (let i = 0; i < 200; i++) {
        const t = makeMulDiv200Task(k);
        expect(t.options.some((o) => o.v === t.ans)).toBe(true);
        expect(new Set(t.options.map((o) => o.v)).size).toBe(t.options.length);
        expect(t.options.length).toBeGreaterThanOrEqual(3);
        (t.text.match(/\d+/g) || []).forEach((n) => expect(Number(n)).toBeLessThanOrEqual(200));
        t.options.forEach((o) => expect(o.v).toBeLessThanOrEqual(200));
        const nums = (t.text.match(/\d+/g) || []).map(Number);
        if (k === 0) expect(nums[0] * nums[1]).toBe(t.ans);
        if (k === 1 || k === 2) expect(nums[0] / nums[1]).toBe(t.ans);
        if (k === 3) expect(t.ans * nums[0]).toBe(nums[1]);
      }
    }
  });

  it('renders MulDiv200G3Matcher and Sorter without throwing', () => {
    expect(render(<MulDiv200G3Matcher />).container).toBeTruthy();
    expect(render(<MulDiv200G3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [MulDiv200TensSvg, MulDiv200LadderSvg, MulDiv200SharingSvg, MulDiv200GroupingSvg, MulDiv200CoinsSvg, MulDiv200FamilySvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
