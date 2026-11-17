import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { SymmetryG3Theory } from '@/components/math/grade-3/testek-sikidomok/tukrozesek-szimmetria/SymmetryG3Theory';
import { SymmetryG3Quiz, SYMMETRY_G3_QUESTIONS } from '@/components/math/grade-3/testek-sikidomok/tukrozesek-szimmetria/SymmetryG3Quiz';
import { SymmetryG3Matcher, SYMMETRY_G3_MATCHER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/tukrozesek-szimmetria/SymmetryG3Matcher';
import { SymmetryG3Sorter, SYMMETRY_G3_SORTER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/tukrozesek-szimmetria/SymmetryG3Sorter';
import {
  makeGridTask,
  checkGrid,
  mirrorCell,
  cellKey,
  inSource,
  FIRST_GRID_TASK,
  FOLD_SHAPES,
  isSymmetricFold,
  reflectPt,
  GN
} from '@/components/math/grade-3/testek-sikidomok/tukrozesek-szimmetria/SymmetryG3Parts';
import {
  SymmetryFoldSvg,
  SymmetryButterflySvg,
  SymmetryGridSvg,
  SymmetryAxesSvg,
  SymmetryLettersSvg,
  SymmetryWaterSvg
} from '@/components/math/grade-3/testek-sikidomok/tukrozesek-szimmetria/SymmetryG3Figures';

describe('Grade 3 Topic X - 4. Tükrözések, szimmetria', () => {
  it('renders the theory with the chapter badge', () => {
    const { container, getAllByText } = render(<SymmetryG3Theory />);
    expect(container).toBeTruthy();
    expect(getAllByText('3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG').length).toBeGreaterThan(0);
  });

  it('theory labs react to clicks', () => {
    const { getByText, getAllByText } = render(<SymmetryG3Theory />);
    fireEvent.click(getByText('Ellenőrzöm'));
    expect(getAllByText(/Még nem színeztél ki semmit/).length).toBeGreaterThan(0);
    fireEvent.click(getByText('Igen, az'));
    fireEvent.click(getAllByText('Új feladat')[0]);
  });

  it('renders the quiz without throwing', () => {
    expect(render(<SymmetryG3Quiz />).container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(SYMMETRY_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(SYMMETRY_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(SYMMETRY_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    SYMMETRY_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(SYMMETRY_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels x 8 pairs, distinct values, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = SYMMETRY_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 3 categories x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = SYMMETRY_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      cfg.categories.forEach((c) => expect(cfg.items.filter((i) => i.categoryId === c.id)).toHaveLength(3));
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<SymmetryG3Matcher />).container).toBeTruthy();
    expect(render(<SymmetryG3Sorter />).container).toBeTruthy();
    [SymmetryFoldSvg, SymmetryButterflySvg, SymmetryGridSvg, SymmetryAxesSvg, SymmetryLettersSvg, SymmetryWaterSvg].forEach((Fig) => {
      expect(render(<Fig />).container.querySelector('svg')).toBeTruthy();
    });
  });

  it('reflection math', () => {
    expect(reflectPt([10, 20], [50, 0], [50, 100])).toEqual([90, 20]);
    const r = reflectPt([0, 10], [0, 0], [10, 10]);
    expect(r[0]).toBeCloseTo(10);
    expect(r[1]).toBeCloseTo(0);
  });

  it('fold lab: every isAxis flag matches the geometry', () => {
    FOLD_SHAPES.forEach((s) => expect([s.id, isSymmetricFold(s)]).toEqual([s.id, s.isAxis]));
    expect(FOLD_SHAPES.filter((s) => s.isAxis).length).toBeGreaterThan(5);
    expect(FOLD_SHAPES.filter((s) => !s.isAxis).length).toBeGreaterThan(5);
  });

  it('grid lab: tasks are in the source half, connected size 6-9, checker works', () => {
    const tasks = [FIRST_GRID_TASK, ...Array.from({ length: 300 }, () => makeGridTask())];
    tasks.forEach((t) => {
      expect(t.cells.length).toBeGreaterThanOrEqual(6);
      expect(t.cells.length).toBeLessThanOrEqual(9);
      t.cells.forEach((c) => {
        expect(inSource(c.r, c.c, t.axis)).toBe(true);
        expect(c.r).toBeGreaterThanOrEqual(0);
        expect(c.c).toBeLessThan(GN);
      });
      const good: Record<string, number> = {};
      t.cells.forEach((c) => {
        const m = mirrorCell(c, t.axis);
        expect(inSource(m.r, m.c, t.axis)).toBe(false);
        good[cellKey(m.r, m.c)] = m.col;
      });
      expect(checkGrid(t, good).ok).toBe(true);
      expect(checkGrid(t, {}).ok).toBe(false);
      // eltolás (tükrözés helyett) → hibás
      const shifted: Record<string, number> = {};
      t.cells.forEach((c) => {
        const k = t.axis === 'v' ? cellKey(c.r, c.c + GN / 2) : cellKey(c.r + GN / 2, c.c);
        shifted[k] = c.col;
      });
      const symmetricOnItself = t.cells.every((c) => {
        const m = mirrorCell(c, t.axis);
        const k = t.axis === 'v' ? cellKey(m.r, m.c - GN / 2) : cellKey(m.r - GN / 2, m.c);
        return t.cells.some((d) => cellKey(d.r, d.c) === k && d.col === c.col);
      });
      if (!symmetricOnItself) expect(checkGrid(t, shifted).ok).toBe(false);
      const one = { ...good };
      delete one[Object.keys(one)[0]];
      const res = checkGrid(t, one);
      expect(res.ok).toBe(false);
      expect(res.missing).toHaveLength(1);
    });
  });
});
