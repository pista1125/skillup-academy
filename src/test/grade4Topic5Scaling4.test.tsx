import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Scaling4Theory } from '@/components/math/grade-4/sikidomok-testek/nagyitas-kicsinyites/Scaling4Theory';
import { Scaling4Quiz } from '@/components/math/grade-4/sikidomok-testek/nagyitas-kicsinyites/Scaling4Quiz';
import { Scaling4Matcher } from '@/components/math/grade-4/sikidomok-testek/nagyitas-kicsinyites/Scaling4Matcher';
import { Scaling4Sorter } from '@/components/math/grade-4/sikidomok-testek/nagyitas-kicsinyites/Scaling4Sorter';
import {
  MagnifierMapSvg,
  HouseDrawingsSvg,
  TreeDoubleSvg,
  SimilarPairsSvg,
  ArrowStepsSvg,
  WrongScalingSvg
} from '@/components/math/grade-4/sikidomok-testek/nagyitas-kicsinyites/Scaling4Figures';

describe('Grade 4 Topic V - 5. Nagyítás, kicsinyítés - Components', () => {
  it('renders Scaling4Theory without throwing', () => {
    const { container } = render(<Scaling4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Scaling4Quiz without throwing', () => {
    const { container } = render(<Scaling4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Scaling4Matcher without throwing', () => {
    const { container } = render(<Scaling4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Scaling4Sorter without throwing', () => {
    const { container } = render(<Scaling4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MagnifierMapSvg, HouseDrawingsSvg, TreeDoubleSvg, SimilarPairsSvg, ArrowStepsSvg, WrongScalingSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
