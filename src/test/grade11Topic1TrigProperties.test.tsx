import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { TrigPropertiesTheory } from '@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesTheory';
import { TrigPropertiesQuiz } from '@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesQuiz';
import { TrigPropertiesMatcher } from '@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesMatcher';
import { TrigPropertiesSorter } from '@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesSorter';
import {
  SpecialAnglesSvg,
  ComplementaryAnglesSvg,
  UnitHypotenuseSvg,
  MontserratCableCarSvg,
  ParasailingSvg,
  BuildingElevationSvg
} from '@/components/math/grade-11/trigonometria/a-szogfuggvenyek-tulajdonsagai/TrigPropertiesFigures';

describe('Grade 11 Topic I - 4. A szögfüggvények tulajdonságai - Components', () => {
  it('renders TrigPropertiesTheory without throwing', () => {
    const { container } = render(<TrigPropertiesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders TrigPropertiesQuiz without throwing', () => {
    const { container } = render(<TrigPropertiesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders TrigPropertiesMatcher without throwing', () => {
    const { container } = render(<TrigPropertiesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders TrigPropertiesSorter without throwing', () => {
    const { container } = render(<TrigPropertiesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [
      SpecialAnglesSvg,
      ComplementaryAnglesSvg,
      UnitHypotenuseSvg,
      MontserratCableCarSvg,
      ParasailingSvg,
      BuildingElevationSvg
    ];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
