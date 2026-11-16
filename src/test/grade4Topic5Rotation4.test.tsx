import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Rotation4Theory } from '@/components/math/grade-4/sikidomok-testek/elforgatas/Rotation4Theory';
import { Rotation4Quiz } from '@/components/math/grade-4/sikidomok-testek/elforgatas/Rotation4Quiz';
import { Rotation4Matcher } from '@/components/math/grade-4/sikidomok-testek/elforgatas/Rotation4Matcher';
import { Rotation4Sorter } from '@/components/math/grade-4/sikidomok-testek/elforgatas/Rotation4Sorter';
import {
  SpinningThingsSvg,
  PinTemplateSvg,
  TurnAmountsSvg,
  QuarterTurnsSvg,
  TracingPaperSvg,
  GridRotationSvg
} from '@/components/math/grade-4/sikidomok-testek/elforgatas/Rotation4Figures';

describe('Grade 4 Topic V - 7. Elforgatás - Components', () => {
  it('renders Rotation4Theory without throwing', () => {
    const { container } = render(<Rotation4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Rotation4Quiz without throwing', () => {
    const { container } = render(<Rotation4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Rotation4Matcher without throwing', () => {
    const { container } = render(<Rotation4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Rotation4Sorter without throwing', () => {
    const { container } = render(<Rotation4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SpinningThingsSvg, PinTemplateSvg, TurnAmountsSvg, QuarterTurnsSvg, TracingPaperSvg, GridRotationSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
