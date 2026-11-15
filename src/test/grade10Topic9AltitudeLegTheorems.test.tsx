import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { AltitudeLegTheoremsTheory } from '@/components/math/grade-10/hasonlosag/magassagtetel-befogotetel/AltitudeLegTheoremsTheory';
import { AltitudeLegTheoremsQuiz } from '@/components/math/grade-10/hasonlosag/magassagtetel-befogotetel/AltitudeLegTheoremsQuiz';
import { AltitudeLegTheoremsMatcher } from '@/components/math/grade-10/hasonlosag/magassagtetel-befogotetel/AltitudeLegTheoremsMatcher';
import { AltitudeLegTheoremsSorter } from '@/components/math/grade-10/hasonlosag/magassagtetel-befogotetel/AltitudeLegTheoremsSorter';
import {
  AltitudeAndLegTheoremsSvg,
  ThreeSimilarTrianglesSvg,
  PythagorasFromLegsSvg,
  CliffMeasurementSvg,
  ArithmeticGeometricInequalitySvg
} from '@/components/math/grade-10/hasonlosag/magassagtetel-befogotetel/AltitudeLegTheoremsFigures';

describe('Grade 10 Topic IX - 10. Ráadás – Magasságtétel, befogótétel - Components', () => {
  it('renders AltitudeLegTheoremsTheory without throwing', () => {
    const { container } = render(<AltitudeLegTheoremsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders AltitudeLegTheoremsQuiz without throwing', () => {
    const { container } = render(<AltitudeLegTheoremsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders AltitudeLegTheoremsMatcher without throwing', () => {
    const { container } = render(<AltitudeLegTheoremsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders AltitudeLegTheoremsSorter without throwing', () => {
    const { container } = render(<AltitudeLegTheoremsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figures SVGs without throwing', () => {
    const { container: c1 } = render(<AltitudeAndLegTheoremsSvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ThreeSimilarTrianglesSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<PythagorasFromLegsSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<CliffMeasurementSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<ArithmeticGeometricInequalitySvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

