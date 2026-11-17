import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MixedOps1000G3Theory } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/vegyes-muveletek-szoveges/MixedOps1000G3Theory';
import { MixedOps1000G3Quiz, MIXED_OPS_1000_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/vegyes-muveletek-szoveges/MixedOps1000G3Quiz';
import { MixedOps1000G3Matcher, MIXED_OPS_1000_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/vegyes-muveletek-szoveges/MixedOps1000G3Matcher';
import { MixedOps1000G3Sorter, MIXED_OPS_1000_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/vegyes-muveletek-szoveges/MixedOps1000G3Sorter';
import * as Figs from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/vegyes-muveletek-szoveges/MixedOps1000G3Figures';
import { genRoute, genMissing } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/vegyes-muveletek-szoveges/MixedOps1000G3Parts';

describe('Grade 3 Topic XII - 4. Vegyes műveletek és szöveges feladatok - Components', () => {
  it('renders MixedOps1000G3Theory without throwing', { timeout: 20000 }, () => {
    expect(render(<MixedOps1000G3Theory />).container).toBeTruthy();
  });

  it('renders MixedOps1000G3Quiz without throwing', { timeout: 20000 }, () => {
    expect(render(<MixedOps1000G3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(MIXED_OPS_1000_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MIXED_OPS_1000_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MIXED_OPS_1000_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
      // számkör: 1000-ig
      [q.question, ...q.options].join(' ').match(/\d+/g)?.forEach((n) => expect(Number(n)).toBeLessThanOrEqual(1000));
    });
    expect(new Set(MIXED_OPS_1000_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders MixedOps1000G3Matcher and MixedOps1000G3Sorter without throwing', () => {
    expect(render(<MixedOps1000G3Matcher />).container).toBeTruthy();
    expect(render(<MixedOps1000G3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    Object.values(Figs).forEach((Fig) => {
      const { container } = render(React.createElement(Fig as React.FC));
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures: at least 4 matcher pairs and 4 sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      expect(MIXED_OPS_1000_G3_MATCHER_LEVELS[l].pairs).toHaveLength(8);
      expect(MIXED_OPS_1000_G3_MATCHER_LEVELS[l].pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      expect(new Set(MIXED_OPS_1000_G3_MATCHER_LEVELS[l].pairs.map((p) => String(p.right))).size).toBe(8);
      expect(MIXED_OPS_1000_G3_SORTER_LEVELS[l].items).toHaveLength(9);
      expect(MIXED_OPS_1000_G3_SORTER_LEVELS[l].items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('lab generators give consistent tasks within 1000', () => {
    for (let i = 0; i < 200; i++) {
      const r = genRoute();
      expect(r.dists.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(1000);
      expect(r.answer).toBeGreaterThan(0);
      const m = genMissing();
      const { a, op, b, r: res } = m.check;
      expect(op === '+' ? a + b : a - b).toBe(res);
      expect(Math.max(a, b, res)).toBeLessThanOrEqual(1000);
      expect(m.text.includes('□')).toBe(true);
    }
  });
});
