import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Reflection4Theory } from '@/components/math/grade-4/sikidomok-testek/a-tukrozes/Reflection4Theory';
import { Reflection4Quiz } from '@/components/math/grade-4/sikidomok-testek/a-tukrozes/Reflection4Quiz';
import { Reflection4Matcher } from '@/components/math/grade-4/sikidomok-testek/a-tukrozes/Reflection4Matcher';
import { Reflection4Sorter } from '@/components/math/grade-4/sikidomok-testek/a-tukrozes/Reflection4Sorter';
import {
  WaterMirrorSvg,
  GridDogSvg,
  FoldCutSvg,
  ShapeAxesSvg,
  FlagFlipSvg,
  BlocksMirrorSvg
} from '@/components/math/grade-4/sikidomok-testek/a-tukrozes/Reflection4Figures';

describe('Grade 4 Topic V - 4. A tükrözés - Components', () => {
  it('renders Reflection4Theory without throwing', () => {
    const { container } = render(<Reflection4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Reflection4Quiz without throwing', () => {
    const { container } = render(<Reflection4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Reflection4Matcher without throwing', () => {
    const { container } = render(<Reflection4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Reflection4Sorter without throwing', () => {
    const { container } = render(<Reflection4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WaterMirrorSvg, GridDogSvg, FoldCutSvg, ShapeAxesSvg, FlagFlipSvg, BlocksMirrorSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
