import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { Relations4Theory, TABLE_SCENARIOS, canApply, applyOp } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/osszefuggesek-kovetkeztetesek/Relations4Theory';
import { Relations4Quiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/osszefuggesek-kovetkeztetesek/Relations4Quiz';
import { Relations4Matcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/osszefuggesek-kovetkeztetesek/Relations4Matcher';
import { Relations4Sorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/osszefuggesek-kovetkeztetesek/Relations4Sorter';
import {
  SpeedTrainSvg,
  EqualQuotientsSvg,
  DoublingChainSvg,
  SpoonsHalvingSvg,
  GardenersTableSvg
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/osszefuggesek-kovetkeztetesek/Relations4Figures';

describe('Grade 4 Topic III - 5. Összefüggések, következtetések - Components', () => {
  it('renders Relations4Theory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Relations4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders Relations4Quiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<Relations4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders Relations4Matcher without throwing', () => {
    const { container } = render(<Relations4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders Relations4Sorter without throwing', () => {
    const { container } = render(<Relations4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SpeedTrainSvg, EqualQuotientsSvg, DoublingChainSvg, SpoonsHalvingSvg, GardenersTableSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('table lab answers follow the textbook relations', () => {
    const train = TABLE_SCENARIOS.find((s) => s.id === 'train')!;
    train.cols.forEach((c) => expect(c.ans).toBe(c.top * 600));
    const balloon = TABLE_SCENARIOS.find((s) => s.id === 'balloon')!;
    balloon.cols.forEach((c) => expect(c.ans).toBe(c.top / 60));
    const game = TABLE_SCENARIOS.find((s) => s.id === 'game')!;
    game.cols.forEach((c) => expect(c.ans * c.top).toBe(4080));
    const plants = TABLE_SCENARIOS.find((s) => s.id === 'plants')!;
    plants.cols.forEach((c) => expect(c.ans * c.top).toBe(240));
  });

  it('keeper lab operations stay whole numbers', () => {
    expect(canApply(600, ':2')).toBe(true);
    expect(canApply(9, ':2')).toBe(false);
    expect(canApply(3600, '·3')).toBe(false);
    expect(applyOp(600, '·2') * applyOp(8, ':2')).toBe(4800);
  });
});
