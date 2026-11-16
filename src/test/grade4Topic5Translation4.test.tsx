import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Translation4Theory } from '@/components/math/grade-4/sikidomok-testek/eltolas/Translation4Theory';
import { Translation4Quiz } from '@/components/math/grade-4/sikidomok-testek/eltolas/Translation4Quiz';
import { Translation4Matcher } from '@/components/math/grade-4/sikidomok-testek/eltolas/Translation4Matcher';
import { Translation4Sorter } from '@/components/math/grade-4/sikidomok-testek/eltolas/Translation4Sorter';
import {
  DeskPushSvg,
  CompassRoseSvg,
  ChairShiftSvg,
  TrainTemplateSvg,
  GridShiftSvg,
  BusStopsSvg
} from '@/components/math/grade-4/sikidomok-testek/eltolas/Translation4Figures';

describe('Grade 4 Topic V - 6. Eltolás - Components', () => {
  it('renders Translation4Theory without throwing', () => {
    const { container } = render(<Translation4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Translation4Quiz without throwing', () => {
    const { container } = render(<Translation4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Translation4Matcher without throwing', () => {
    const { container } = render(<Translation4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Translation4Sorter without throwing', () => {
    const { container } = render(<Translation4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DeskPushSvg, CompassRoseSvg, ChairShiftSvg, TrainTemplateSvg, GridShiftSvg, BusStopsSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
