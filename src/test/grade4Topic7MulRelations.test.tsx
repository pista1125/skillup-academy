import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { MulRelationsTheory, describeChange, ticketReasoning } from '@/components/math/grade-4/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsTheory';
import { MulRelationsQuiz } from '@/components/math/grade-4/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsQuiz';
import { MulRelationsMatcher } from '@/components/math/grade-4/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsMatcher';
import { MulRelationsSorter } from '@/components/math/grade-4/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsSorter';
import {
  FactorChangeSvg,
  DoubleHalfSvg,
  BirdsChartSvg,
  TicketTableSvg,
  DistributiveSvg,
  ChainShortcutSvg,
  TICKET_PEOPLE
} from '@/components/math/grade-4/irasbeli-szorzas/osszefuggesek-kovetkeztetesek/MulRelationsFigures';

describe('Grade 4 Topic VII - 3. Összefüggések, következtetések - Components', () => {
  it('renders MulRelationsTheory without throwing', () => {
    const { container } = render(<MulRelationsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders MulRelationsQuiz without throwing', () => {
    const { container } = render(<MulRelationsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders MulRelationsMatcher without throwing', () => {
    const { container } = render(<MulRelationsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders MulRelationsSorter without throwing', () => {
    const { container } = render(<MulRelationsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [FactorChangeSvg, DoubleHalfSvg, BirdsChartSvg, TicketTableSvg, DistributiveSvg, ChainShortcutSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('describes product changes and ticket reasoning correctly', () => {
    expect(describeChange(4880, 4880)).toBe('A szorzat nem változott.');
    expect(describeChange(4880, 9760)).toBe('A szorzat a kétszeresére nőtt.');
    expect(describeChange(4880, 2440)).toBe('A szorzat a felére csökkent.');
    TICKET_PEOPLE.forEach((n) => expect(ticketReasoning(n).price).toBe(n * 320));
    expect(ticketReasoning(31).text).toContain('9920');
    expect(ticketReasoning(15).text).toContain('4800');
  });
});
