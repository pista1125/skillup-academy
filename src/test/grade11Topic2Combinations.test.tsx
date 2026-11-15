import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { CombinationsTheory } from '@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsTheory';
import { CombinationsQuiz } from '@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsQuiz';
import { CombinationsMatcher } from '@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsMatcher';
import { CombinationsSorter } from '@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsSorter';
import {
  SubsetOvercountSvg,
  BinomialNotationSvg,
  VolleyballMatchesSvg,
  HeptagonSegmentsSvg,
  LiftGroupsSvg,
  TicketPunchSvg
} from '@/components/math/grade-11/kombinatorika-grafok/amikor-nem-szamit-a-kivalasztas-sorrendje/CombinationsFigures';

describe('Grade 11 Topic II - 18. Amikor nem számít a kiválasztás sorrendje - Components', () => {
  it('renders CombinationsTheory without throwing', () => {
    const { container } = render(<CombinationsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders CombinationsQuiz without throwing', () => {
    const { container } = render(<CombinationsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CombinationsMatcher without throwing', () => {
    const { container } = render(<CombinationsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CombinationsSorter without throwing', () => {
    const { container } = render(<CombinationsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SubsetOvercountSvg, BinomialNotationSvg, VolleyballMatchesSvg, HeptagonSegmentsSvg, LiftGroupsSvg, TicketPunchSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
