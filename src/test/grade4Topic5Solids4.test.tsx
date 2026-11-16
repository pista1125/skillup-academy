import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Solids4Theory } from '@/components/math/grade-4/sikidomok-testek/a-testek/Solids4Theory';
import { Solids4Quiz } from '@/components/math/grade-4/sikidomok-testek/a-testek/Solids4Quiz';
import { Solids4Matcher } from '@/components/math/grade-4/sikidomok-testek/a-testek/Solids4Matcher';
import { Solids4Sorter } from '@/components/math/grade-4/sikidomok-testek/a-testek/Solids4Sorter';
import {
  SolidsFamilySvg,
  FlatCurvedSvg,
  CuboidPartsSvg,
  CuboidNetSvg,
  CubeStairsSvg,
  ViewsSvg
} from '@/components/math/grade-4/sikidomok-testek/a-testek/Solids4Figures';

describe('Grade 4 Topic V - 3. A testek - Components', () => {
  it('renders Solids4Theory without throwing', () => {
    const { container } = render(<Solids4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Solids4Quiz without throwing', () => {
    const { container } = render(<Solids4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Solids4Matcher without throwing', () => {
    const { container } = render(<Solids4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Solids4Sorter without throwing', () => {
    const { container } = render(<Solids4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SolidsFamilySvg, FlatCurvedSvg, CuboidPartsSvg, CuboidNetSvg, CubeStairsSvg, ViewsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
