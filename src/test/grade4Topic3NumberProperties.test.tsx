import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumberPropertiesTheory, vennRegion, digitSolutions } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-szamok-tulajdonsagai/NumberPropertiesTheory';
import { NumberPropertiesQuiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-szamok-tulajdonsagai/NumberPropertiesQuiz';
import { NumberPropertiesMatcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-szamok-tulajdonsagai/NumberPropertiesMatcher';
import { NumberPropertiesSorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-szamok-tulajdonsagai/NumberPropertiesSorter';
import {
  MultiplesVennSvg,
  LastDigitRuleSvg,
  NumberCardsSvg,
  MultiplesLineSvg,
  RepeatingPatternSvg
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/a-szamok-tulajdonsagai/NumberPropertiesFigures';

describe('Grade 4 Topic III - 4. A számok tulajdonságai - Components', () => {
  it('renders NumberPropertiesTheory without throwing', () => {
    const { container } = render(<NumberPropertiesTheory />);
    expect(container).toBeTruthy();
  });

  it('renders NumberPropertiesQuiz without throwing', () => {
    const { container } = render(<NumberPropertiesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders NumberPropertiesMatcher without throwing', () => {
    const { container } = render(<NumberPropertiesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumberPropertiesSorter without throwing', () => {
    const { container } = render(<NumberPropertiesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [MultiplesVennSvg, LastDigitRuleSvg, NumberCardsSvg, MultiplesLineSvg, RepeatingPatternSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('classifies numbers and digits correctly', () => {
    expect(vennRegion(7602)).toBe('two');
    expect(vennRegion(2965)).toBe('five');
    expect(vennRegion(4310)).toBe('both');
    expect(vennRegion(4561)).toBe('none');
    expect(digitSolutions(0)).toEqual([0, 2, 4, 6, 8]);
    expect(digitSolutions(1)).toEqual([0, 5]);
    expect(digitSolutions(4)).toEqual([0]);
  });
});
