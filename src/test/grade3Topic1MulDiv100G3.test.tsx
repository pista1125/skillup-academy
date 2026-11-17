import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulDiv100G3Theory } from '@/components/math/grade-3/szamolas-100-ig/szorzas-es-osztas/MulDiv100G3Theory';
import { MulDiv100G3Quiz, MUL_DIV_100_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-100-ig/szorzas-es-osztas/MulDiv100G3Quiz';
import { MulDiv100G3Matcher } from '@/components/math/grade-3/szamolas-100-ig/szorzas-es-osztas/MulDiv100G3Matcher';
import { MulDiv100G3Sorter } from '@/components/math/grade-3/szamolas-100-ig/szorzas-es-osztas/MulDiv100G3Sorter';
import {
  MulArraySvg,
  MulDivNamesSvg,
  GroupingSvg,
  SharingSvg,
  SevenJumpsSvg,
  FamilySvg
} from '@/components/math/grade-3/szamolas-100-ig/szorzas-es-osztas/MulDiv100G3Figures';

describe('Grade 3 Topic I - 3. Szorzás és osztás - Components', () => {
  it('renders MulDiv100G3Theory without throwing', () => {
    const { container } = render(<MulDiv100G3Theory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG');
  });

  it('renders MulDiv100G3Quiz without throwing', () => {
    const { container } = render(<MulDiv100G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(MUL_DIV_100_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(MUL_DIV_100_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    MUL_DIV_100_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
    expect(new Set(MUL_DIV_100_G3_QUESTIONS.map((q) => q.id)).size).toBe(30);
  });

  it('renders MulDiv100G3Matcher without throwing', () => {
    const { container } = render(<MulDiv100G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders MulDiv100G3Sorter without throwing', () => {
    const { container } = render(<MulDiv100G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MulArraySvg, MulDivNamesSvg, GroupingSvg, SharingSvg, SevenJumpsSvg, FamilySvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
