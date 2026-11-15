import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { StandardDeviationTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatsokasag-szorasa/StandardDeviationTheory';
import { StandardDeviationQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatsokasag-szorasa/StandardDeviationQuiz';
import { StandardDeviationMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatsokasag-szorasa/StandardDeviationMatcher';
import { StandardDeviationSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatsokasag-szorasa/StandardDeviationSorter';
import {
  StandardDeviationClassesSvg,
  StandardDeviationStepsSvg,
  StandardDeviationTableSvg,
  StandardDeviationSpreadSvg,
  StandardDeviationBulbsSvg,
  StandardDeviationCoffeeSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/adatsokasag-szorasa/StandardDeviationFigures';

describe('Grade 11 Topic V - 4. Adatsokaság szórása - Components', () => {
  it('renders StandardDeviationTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StandardDeviationTheory />);
    expect(container).toBeTruthy();
  });

  it('renders StandardDeviationQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StandardDeviationQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders StandardDeviationMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StandardDeviationMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders StandardDeviationSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<StandardDeviationSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', { timeout: 20000 }, () => {
    const figures = [StandardDeviationClassesSvg, StandardDeviationStepsSvg, StandardDeviationTableSvg, StandardDeviationSpreadSvg, StandardDeviationBulbsSvg, StandardDeviationCoffeeSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
