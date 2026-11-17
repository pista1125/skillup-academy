import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenAdd1000G3Theory } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-osszeadas-1000-ig/WrittenAdd1000G3Theory';
import { WrittenAdd1000G3Quiz, WRITTEN_ADD_1000_G3_QUESTIONS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-osszeadas-1000-ig/WrittenAdd1000G3Quiz';
import { WrittenAdd1000G3Matcher, WRITTEN_ADD_1000_G3_MATCHER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-osszeadas-1000-ig/WrittenAdd1000G3Matcher';
import { WrittenAdd1000G3Sorter, WRITTEN_ADD_1000_G3_SORTER_LEVELS } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-osszeadas-1000-ig/WrittenAdd1000G3Sorter';
import { TwoAddendsSvg, ThreeAddendsSvg, FourAddendsSvg, ThousandSumSvg, EstimateCheckSvg, TrainWordSvg } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-osszeadas-1000-ig/WrittenAdd1000G3Figures';
import { makeAddTask, steps3, sumOf, forgotAll, onlyOne, addHint, stepLines, AddKind } from '@/components/math/grade-3/irasbeli-muveletek-1000-ig/irasbeli-osszeadas-1000-ig/WrittenAdd1000G3Parts';

describe('Grade 3 Topic XII - 1. Írásbeli összeadás 1000-ig - Components', () => {
  it('renders WrittenAdd1000G3Theory without throwing', () => {
    const { container } = render(<WrittenAdd1000G3Theory />);
    expect(container).toBeTruthy();
  });

  it('shows the chapter badge', () => {
    const { getAllByText } = render(<WrittenAdd1000G3Theory />);
    expect(getAllByText(/XII. ÍRÁSBELI MŰVELETEK 1000-IG/).length).toBeGreaterThan(0);
  });

  it('renders WrittenAdd1000G3Quiz without throwing', () => {
    const { container } = render(<WrittenAdd1000G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(WRITTEN_ADD_1000_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(WRITTEN_ADD_1000_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    expect(new Set(WRITTEN_ADD_1000_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
    WRITTEN_ADD_1000_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(WRITTEN_ADD_1000_G3_QUESTIONS.filter((q) => q.figure).length).toBeGreaterThanOrEqual(18);
  });

  it('matcher: 3 levels x 8 pairs, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const pairs = WRITTEN_ADD_1000_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs;
      expect(pairs).toHaveLength(8);
      expect(new Set(pairs.map((p) => String(p.right))).size).toBe(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('sorter: 3 levels x 9 items, at least 4 figures per level', () => {
    [1, 2, 3].forEach((l) => {
      const cfg = WRITTEN_ADD_1000_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(cfg.categories).toHaveLength(3);
      expect(cfg.items).toHaveLength(9);
      expect(cfg.items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders WrittenAdd1000G3Matcher and WrittenAdd1000G3Sorter without throwing', () => {
    expect(render(<WrittenAdd1000G3Matcher />).container).toBeTruthy();
    expect(render(<WrittenAdd1000G3Sorter />).container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [TwoAddendsSvg, ThreeAddendsSvg, FourAddendsSvg, ThousandSumSvg, EstimateCheckSvg, TrainWordSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});

describe('Grade 3 Topic XII - written addition helpers', () => {
  it('the generator stays within 1000 and fits its kind', () => {
    (['ket', 'harom', 'negy', 'ezer'] as AddKind[]).forEach((k) => {
      for (let i = 0; i < 40; i++) {
        const xs = makeAddTask(k);
        const s = sumOf(xs);
        expect(s).toBeLessThanOrEqual(1000);
        expect(xs.length).toBe(k === 'ket' ? 2 : k === 'harom' ? 3 : k === 'negy' ? 4 : xs.length);
        if (k === 'ezer') expect(s).toBe(1000);
        const st = steps3(xs);
        const r = st.reduce((a, x) => a + x.write * 10 ** x.col, 0) + (st[2].carryOut ? 1000 : 0);
        expect(r).toBe(s);
      }
    });
  });

  it('speaks the steps and finds the typical mistakes', () => {
    const st = steps3([248, 175, 396]);
    expect(st[1].carryOut).toBe(2);
    expect(stepLines(st[1]).map((l) => l.t)).toEqual(['4 meg 7 meg 9 az 20,', 'meg 1 az 21.', 'Leírom az 1-et,', 'maradt 2.']);
    expect(forgotAll([248, 175, 396])).toBe(609);
    expect(onlyOne([248, 175, 396])).toBe(719);
    expect(addHint(st[2], 7)).toContain('Nem 1, hanem 2');
    expect(addHint(st[2], 6)).toContain('maradékot');
    expect(addHint(st[2], 8)).toBe('');
  });
});
