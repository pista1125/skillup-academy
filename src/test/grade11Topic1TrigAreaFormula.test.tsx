import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TrigAreaFormulaTheory } from '@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaTheory';
import { TrigAreaFormulaQuiz } from '@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaQuiz';
import { TrigAreaFormulaMatcher } from '@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaMatcher';
import { TrigAreaFormulaSorter } from '@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaSorter';
import {
  ReservoirParallelogramSvg,
  ParallelogramAreaSvg,
  TriangleAreaSvg,
  ChordSectorSvg,
  KiteAreaSvg
} from '@/components/math/grade-11/trigonometria/uj-teruletkeplet/TrigAreaFormulaFigures';

describe('Grade 11 Topic I - 6. Új területképlet - Components', () => {
  it('renders TrigAreaFormulaTheory without throwing', () => {
    const { container } = render(<TrigAreaFormulaTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TrigAreaFormulaQuiz without throwing', () => {
    const { container } = render(<TrigAreaFormulaQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TrigAreaFormulaMatcher without throwing', () => {
    const { container } = render(<TrigAreaFormulaMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TrigAreaFormulaSorter without throwing', () => {
    const { container } = render(<TrigAreaFormulaSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [ReservoirParallelogramSvg, ParallelogramAreaSvg, TriangleAreaSvg, ChordSectorSvg, KiteAreaSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
