import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { ExpectedValue12Theory } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/a-varhato-ertek/ExpectedValue12Theory';
import { ExpectedValue12Quiz } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/a-varhato-ertek/ExpectedValue12Quiz';
import { ExpectedValue12Matcher } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/a-varhato-ertek/ExpectedValue12Matcher';
import { ExpectedValue12Sorter } from '@/components/math/grade-12/statisztika-valoszinusegszamitas/a-varhato-ertek/ExpectedValue12Sorter';
import {
  LuckyWheelSvg,
  WheelTableSvg,
  AngleWheelSvg,
  StockScenarioSvg,
  CoinHeadsSvg,
  TargetBoardSvg
} from '@/components/math/grade-12/statisztika-valoszinusegszamitas/a-varhato-ertek/ExpectedValue12Figures';

describe('Grade 12 Topic III - 9. A várható érték - Components', () => {
  it('renders ExpectedValue12Theory without throwing', () => {
    const { container } = render(<ExpectedValue12Theory />);
    expect(container).toBeTruthy();
  });

  it('renders ExpectedValue12Quiz without throwing', () => {
    const { container } = render(<ExpectedValue12Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders ExpectedValue12Matcher without throwing', () => {
    const { container } = render(<ExpectedValue12Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders ExpectedValue12Sorter without throwing', () => {
    const { container } = render(<ExpectedValue12Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LuckyWheelSvg, WheelTableSvg, AngleWheelSvg, StockScenarioSvg, CoinHeadsSvg, TargetBoardSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
