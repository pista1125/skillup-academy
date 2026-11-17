import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ShapesExamG3Theory } from '@/components/math/grade-3/testek-sikidomok/megallo/ShapesExamG3Theory';
import { ShapesExamG3Quiz, SHAPES_EXAM_G3_QUESTIONS } from '@/components/math/grade-3/testek-sikidomok/megallo/ShapesExamG3Quiz';
import { ShapesExamG3Matcher, SHAPES_EXAM_G3_MATCHER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/megallo/ShapesExamG3Matcher';
import { ShapesExamG3Sorter, SHAPES_EXAM_G3_SORTER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/megallo/ShapesExamG3Sorter';
import { makeMixedTask, makeOddRound, ODD_ROUNDS, POLY, POLYGON_KINDS, mix4 } from '@/components/math/grade-3/testek-sikidomok/megallo/ShapesExamG3Parts';
import { ExamSolidsSvg, ExamCuboidSvg, ExamPolygonsSvg, ExamSymmetrySvg } from '@/components/math/grade-3/testek-sikidomok/megallo/ShapesExamG3Figures';
import { foldsToCube, CUBE_NETS_OK, CUBE_NETS_BAD } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Parts';

describe('Grade 3 Topic X - 5. Megálló – tudáspróba', () => {
  it('renders the theory with the chapter badge and the labs react', () => {
    const { getAllByText } = render(<ShapesExamG3Theory />);
    expect(getAllByText('3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG').length).toBeGreaterThan(0);
    fireEvent.click(getAllByText('10').find((e) => e.tagName === 'BUTTON')!);
    expect(getAllByText(/Ügyes!/).length).toBeGreaterThan(0);
    getAllByText('Új feladat').forEach((b) => fireEvent.click(b));
  });

  it('renders the quiz without throwing', () => {
    expect(render(<ShapesExamG3Quiz />).container).toBeTruthy();
  });

  it('has 90 questions, 30 per level, each with a badge and 4 distinct options', () => {
    expect(SHAPES_EXAM_G3_QUESTIONS).toHaveLength(90);
    [1, 2, 3].forEach((l) => expect(SHAPES_EXAM_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(30));
    expect(new Set(SHAPES_EXAM_G3_QUESTIONS.map((q) => q.id)).size).toBe(90);
    SHAPES_EXAM_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(SHAPES_EXAM_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(54);
  });

  it('the cube-net questions use the right nets', () => {
    [CUBE_NETS_OK[0], CUBE_NETS_OK[1], CUBE_NETS_OK[3], CUBE_NETS_OK[6]].forEach((n) => expect(foldsToCube(n)).toBe(true));
    [CUBE_NETS_BAD[0], CUBE_NETS_BAD[1], CUBE_NETS_BAD[2], CUBE_NETS_BAD[4]].forEach((n) => expect(foldsToCube(n)).toBe(false));
  });

  it('matcher: 3 levels x 8 pairs, distinct values, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = SHAPES_EXAM_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 3 categories x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = SHAPES_EXAM_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      cfg.categories.forEach((c) => expect(cfg.items.filter((i) => i.categoryId === c.id)).toHaveLength(3));
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders matcher, sorter and all figures', () => {
    expect(render(<ShapesExamG3Matcher />).container).toBeTruthy();
    expect(render(<ShapesExamG3Sorter />).container).toBeTruthy();
    [ExamSolidsSvg, ExamCuboidSvg, ExamPolygonsSvg, ExamSymmetrySvg].forEach((Fig) => expect(render(<Fig />).container.querySelector('svg')).toBeTruthy());
  });

  it('polygon data: sides = number of vertices', () => {
    POLYGON_KINDS.forEach((k) => expect(POLY[k].pts?.length).toBe(POLY[k].sides));
  });

  it('mixed task generator: the answer is among 4 distinct options', () => {
    for (let i = 0; i < 500; i++) {
      const t = makeMixedTask();
      expect(t.options).toHaveLength(4);
      expect(new Set(t.options).size).toBe(4);
      expect(t.options).toContain(t.answer);
      if (t.kind === 'plan') expect(Number(t.answer)).toBe(t.plan!.flat().reduce((a, b) => a + b, 0));
      if (t.kind === 'sides') expect(Number(t.answer)).toBe(POLY[t.poly!].sides);
      if (t.kind === 'mirror') expect([t.d, 2 * t.d!]).toContain(Number(t.answer));
      t.options.forEach((o) => expect(o === 'akárhány' || Number(o) >= 0).toBe(true));
    }
    expect(mix4('3', ['3', '4'])).toHaveLength(4);
  });

  it('odd-one-out rounds keep track of the odd item after shuffling', () => {
    for (let i = 0; i < 200; i++) {
      const r = makeOddRound();
      const orig = ODD_ROUNDS.find((o) => o.why === r.why)!;
      expect(JSON.stringify(r.items[r.odd])).toBe(JSON.stringify(orig.items[orig.odd]));
      expect(r.items).toHaveLength(4);
    }
  });
});
