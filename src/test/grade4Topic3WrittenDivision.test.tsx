import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenDivisionTheory, shareStates } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osztas-egyjegyu-osztoval/WrittenDivisionTheory';
import { WrittenDivisionQuiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osztas-egyjegyu-osztoval/WrittenDivisionQuiz';
import { WrittenDivisionMatcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osztas-egyjegyu-osztoval/WrittenDivisionMatcher';
import { WrittenDivisionSorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osztas-egyjegyu-osztoval/WrittenDivisionSorter';
import {
  DivShortFormSvg,
  DivLongFormSvg,
  DivRemainderSvg,
  DivSplitSvg,
  CoinShareSvg,
  divSteps
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osztas-egyjegyu-osztoval/WrittenDivisionFigures';

describe('Grade 4 Topic III - 3. Írásbeli osztás egyjegyű osztóval - Components', () => {
  it('renders WrittenDivisionTheory without throwing', () => {
    const { container } = render(<WrittenDivisionTheory />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenDivisionQuiz without throwing', () => {
    const { container } = render(<WrittenDivisionQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenDivisionMatcher without throwing', () => {
    const { container } = render(<WrittenDivisionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenDivisionSorter without throwing', () => {
    const { container } = render(<WrittenDivisionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [DivShortFormSvg, DivLongFormSvg, DivRemainderSvg, DivSplitSvg, CoinShareSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes the steps of written division correctly', () => {
    const s1 = divSteps(2872, 2);
    expect(s1.map((s) => s.q)).toEqual([1, 4, 3, 6]);
    expect(s1.map((s) => s.r)).toEqual([0, 0, 1, 0]);
    const s2 = divSteps(224, 3);
    expect(s2.map((s) => s.partial)).toEqual([22, 14]);
    expect(s2.map((s) => s.q)).toEqual([7, 4]);
    expect(s2[s2.length - 1].r).toBe(2);
    expect(divSteps(3150, 3).map((s) => s.q)).toEqual([1, 0, 5, 0]);
    expect(divSteps(7319, 4).map((s) => s.q).join('')).toBe('1829');
    const share = shareStates(750, 3);
    expect(share[share.length - 1].each).toEqual([2, 5, 0]);
  });
});
