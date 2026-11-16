import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Area4Theory } from '@/components/math/grade-4/meresek/a-terulet-merese/Area4Theory';
import { Area4Quiz } from '@/components/math/grade-4/meresek/a-terulet-merese/Area4Quiz';
import { Area4Matcher } from '@/components/math/grade-4/meresek/a-terulet-merese/Area4Matcher';
import { Area4Sorter } from '@/components/math/grade-4/meresek/a-terulet-merese/Area4Sorter';
import {
  NotebookCoverSvg,
  RowsColumnsSvg,
  UnitChoicesSvg,
  VolleyballCourtsSvg,
  HalfAreaSvg
} from '@/components/math/grade-4/meresek/a-terulet-merese/Area4Figures';

describe('Grade 4 Topic II - 3. A terület mérése - Components', () => {
  it('renders Area4Theory without throwing', () => {
    const { container } = render(<Area4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Area4Quiz without throwing', () => {
    const { container } = render(<Area4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Area4Matcher without throwing', () => {
    const { container } = render(<Area4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Area4Sorter without throwing', () => {
    const { container } = render(<Area4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NotebookCoverSvg, RowsColumnsSvg, UnitChoicesSvg, VolleyballCourtsSvg, HalfAreaSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
