import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { SphereSectionsTheory } from '@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsTheory';
import { SphereSectionsQuiz } from '@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsQuiz';
import { SphereSectionsMatcher } from '@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsMatcher';
import { SphereSectionsSorter } from '@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsSorter';
import {
  OrangeSectionSvg,
  SphereTermsSvg,
  SectionTriangleSvg,
  MelonSlicesSvg,
  CubeSphereSvg,
  DomeSvg
} from '@/components/math/grade-12/tergeometria/a-gomb-a-gomb-szeletelese/SphereSectionsFigures';

describe('Grade 12 Topic I - 6. A gömb, a gömb szeletelése - Components', () => {
  it('renders SphereSectionsTheory without throwing', () => {
    const { container } = render(<SphereSectionsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders SphereSectionsQuiz without throwing', () => {
    const { container } = render(<SphereSectionsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders SphereSectionsMatcher without throwing', () => {
    const { container } = render(<SphereSectionsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders SphereSectionsSorter without throwing', () => {
    const { container } = render(<SphereSectionsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [OrangeSectionSvg, SphereTermsSvg, SectionTriangleSvg, MelonSlicesSvg, CubeSphereSvg, DomeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
