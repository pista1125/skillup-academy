import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Orientation4Theory } from '@/components/math/grade-4/sikidomok-testek/tajekozodas/Orientation4Theory';
import { Orientation4Quiz } from '@/components/math/grade-4/sikidomok-testek/tajekozodas/Orientation4Quiz';
import { Orientation4Matcher } from '@/components/math/grade-4/sikidomok-testek/tajekozodas/Orientation4Matcher';
import { Orientation4Sorter } from '@/components/math/grade-4/sikidomok-testek/tajekozodas/Orientation4Sorter';
import {
  TownMapSvg,
  CodeReadingSvg,
  ChessBoardSvg,
  ChessPiecesSvg,
  GridWalkSvg
} from '@/components/math/grade-4/sikidomok-testek/tajekozodas/Orientation4Figures';

describe('Grade 4 Topic V - 8. Tájékozódás - Components', () => {
  it('renders Orientation4Theory without throwing', () => {
    const { container } = render(<Orientation4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Orientation4Quiz without throwing', () => {
    const { container } = render(<Orientation4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Orientation4Matcher without throwing', () => {
    const { container } = render(<Orientation4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Orientation4Sorter without throwing', () => {
    const { container } = render(<Orientation4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TownMapSvg, CodeReadingSvg, ChessBoardSvg, ChessPiecesSvg, GridWalkSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
