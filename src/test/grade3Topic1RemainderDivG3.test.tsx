import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RemainderDivG3Theory } from '@/components/math/grade-3/szamolas-100-ig/maradekos-osztas/RemainderDivG3Theory';
import { RemainderDivG3Quiz, REMAINDER_DIV_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/maradekos-osztas/RemainderDivG3Quiz';
import { RemainderDivG3Matcher, REMAINDER_DIV_G3_MATCHER_LEVELS } from '@/components/math/grade-3/szamolas-100-ig/maradekos-osztas/RemainderDivG3Matcher';
import { RemainderDivG3Sorter, REMAINDER_DIV_G3_SORTER_LEVELS } from '@/components/math/grade-3/szamolas-100-ig/maradekos-osztas/RemainderDivG3Sorter';
import {
  PacksSvg,
  NotationSvg,
  CheckSvg,
  RemainderCycleSvg,
  SticksSvg
} from '@/components/math/grade-3/szamolas-100-ig/maradekos-osztas/RemainderDivG3Figures';

describe('Grade 3 Topic I - 4. Maradékos osztás - Components', () => {
  it('renders RemainderDivG3Theory without throwing', () => {
    const { container } = render(<RemainderDivG3Theory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG');
  });

  it('renders RemainderDivG3Quiz without throwing', () => {
    const { container } = render(<RemainderDivG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(REMAINDER_DIV_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(REMAINDER_DIV_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    REMAINDER_DIV_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(REMAINDER_DIV_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders RemainderDivG3Matcher without throwing', () => {
    const { container } = render(<RemainderDivG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders RemainderDivG3Sorter without throwing', () => {
    const { container } = render(<RemainderDivG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [PacksSvg, NotationSvg, CheckSvg, RemainderCycleSvg, SticksSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('has card figures on at least 4 matcher pairs and ~40 % of sorter items per level', () => {
    ([1, 2, 3] as const).forEach((l) => {
      const pairs = REMAINDER_DIV_G3_MATCHER_LEVELS[l].pairs ?? [];
      expect(pairs).toHaveLength(8);
      expect(pairs.filter((p) => p.promptFigure || p.valueFigure).length).toBeGreaterThanOrEqual(4);
      pairs.forEach((p) => expect(Boolean(p.left || p.promptFigure) && Boolean(p.right || p.valueFigure)).toBe(true));
      const items = REMAINDER_DIV_G3_SORTER_LEVELS[l].items ?? [];
      expect(items.filter((i) => i.figure).length).toBeGreaterThanOrEqual(4);
      items.forEach((i) => expect(Boolean(i.text || i.figure)).toBe(true));
    });
  });
});
