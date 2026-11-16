import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { LogicBlocks4Theory } from '@/components/math/grade-4/szamolas-10000-ig/jatekok-a-logikai-lapokkal/LogicBlocks4Theory';
import { LogicBlocks4Quiz } from '@/components/math/grade-4/szamolas-10000-ig/jatekok-a-logikai-lapokkal/LogicBlocks4Quiz';
import { LogicBlocks4Matcher } from '@/components/math/grade-4/szamolas-10000-ig/jatekok-a-logikai-lapokkal/LogicBlocks4Matcher';
import { LogicBlocks4Sorter } from '@/components/math/grade-4/szamolas-10000-ig/jatekok-a-logikai-lapokkal/LogicBlocks4Sorter';
import {
  LogicSetPropertiesSvg,
  OneChangeSequencesSvg,
  TwoChangeSequencesSvg,
  CommonPropertiesSvg,
  SpoilerGameSvg
} from '@/components/math/grade-4/szamolas-10000-ig/jatekok-a-logikai-lapokkal/LogicBlocks4Figures';

describe('Grade 4 Topic I - 8. Játékok a logikai lapokkal - Components', () => {
  it('renders LogicBlocks4Theory without throwing', () => {
    const { container } = render(<LogicBlocks4Theory />);
    expect(container).toBeTruthy();
  });

  it('renders LogicBlocks4Quiz without throwing', () => {
    const { container } = render(<LogicBlocks4Quiz />);
    expect(container).toBeTruthy();
  });

  it('renders LogicBlocks4Matcher without throwing', () => {
    const { container } = render(<LogicBlocks4Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders LogicBlocks4Sorter without throwing', () => {
    const { container } = render(<LogicBlocks4Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [LogicSetPropertiesSvg, OneChangeSequencesSvg, TwoChangeSequencesSvg, CommonPropertiesSvg, SpoilerGameSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
