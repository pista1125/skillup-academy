import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CuboidG3Theory } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Theory';
import { CuboidG3Quiz, CUBOID_G3_QUESTIONS } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Quiz';
import { CuboidG3Matcher, CUBOID_G3_MATCHER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Matcher';
import { CuboidG3Sorter, CUBOID_G3_SORTER_LEVELS } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Sorter';
import { CuboidsAndCubeSvg, OppositeFacesSvg, CubeNetSvg, LayersSvg, CompleteCubeSvg } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Figures';
import { foldsToCube, CUBE_NETS_OK, CUBE_NETS_BAD } from '@/components/math/grade-3/testek-sikidomok/a-teglatest-es-a-kocka/CuboidG3Parts';

describe('Grade 3 Topic X - 2. A téglatest és a kocka - Components', () => {
  it('renders CuboidG3Theory without throwing', () => {
    const { container } = render(<CuboidG3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders CuboidG3Quiz without throwing', () => {
    const { container } = render(<CuboidG3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and distinct options', () => {
    expect(CUBOID_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(CUBOID_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    CUBOID_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(q.explanation).toBeTruthy();
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('cube nets are classified correctly', () => {
    expect(CUBE_NETS_OK).toHaveLength(9);
    expect(CUBE_NETS_BAD).toHaveLength(9);
    CUBE_NETS_OK.forEach((n) => expect(foldsToCube(n)).toBe(true));
    CUBE_NETS_BAD.forEach((n) => expect(foldsToCube(n)).toBe(false));
  });

  it('matcher has 3 levels x 8 pairs, sorter 3 levels x 3 categories x 9 items', () => {
    [1, 2, 3].forEach((l) => {
      expect(CUBOID_G3_MATCHER_LEVELS[l as 1 | 2 | 3].pairs).toHaveLength(8);
      const s = CUBOID_G3_SORTER_LEVELS[l as 1 | 2 | 3];
      expect(s.categories).toHaveLength(3);
      s.categories.forEach((c: any) => expect(s.items.filter((it: any) => it.categoryId === c.id)).toHaveLength(9));
    });
  });

  it('renders CuboidG3Matcher without throwing', () => {
    const { container } = render(<CuboidG3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders CuboidG3Sorter without throwing', () => {
    const { container } = render(<CuboidG3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    [CuboidsAndCubeSvg, OppositeFacesSvg, CubeNetSvg, LayersSvg, CompleteCubeSvg].forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
