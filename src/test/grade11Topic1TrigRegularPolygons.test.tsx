import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TrigRegularPolygonsTheory } from '@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsTheory';
import { TrigRegularPolygonsQuiz } from '@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsQuiz';
import { TrigRegularPolygonsMatcher } from '@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsMatcher';
import { TrigRegularPolygonsSorter } from '@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsSorter';
import {
  HubcapNonagonSvg,
  NonagonTriangleSvg,
  ArcSectorSvg,
  CircularSegmentSvg,
  ChordCircleSvg,
  PipeWaterSvg
} from '@/components/math/grade-11/trigonometria/a-kor-es-a-szabalyos-sokszogek/TrigRegularPolygonsFigures';

describe('Grade 11 Topic I - 13. A kör és a szabályos sokszögek - Components', () => {
  it('renders TrigRegularPolygonsTheory without throwing', () => {
    const { container } = render(<TrigRegularPolygonsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TrigRegularPolygonsQuiz without throwing', () => {
    const { container } = render(<TrigRegularPolygonsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TrigRegularPolygonsMatcher without throwing', () => {
    const { container } = render(<TrigRegularPolygonsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TrigRegularPolygonsSorter without throwing', () => {
    const { container } = render(<TrigRegularPolygonsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [HubcapNonagonSvg, NonagonTriangleSvg, ArcSectorSvg, CircularSegmentSvg, ChordCircleSvg, PipeWaterSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
