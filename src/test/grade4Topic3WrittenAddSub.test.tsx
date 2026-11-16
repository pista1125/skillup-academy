import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { WrittenAddSubTheory, columnSteps4 } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osszeadas-es-kivonas/WrittenAddSubTheory';
import { WrittenAddSubQuiz } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osszeadas-es-kivonas/WrittenAddSubQuiz';
import { WrittenAddSubMatcher } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osszeadas-es-kivonas/WrittenAddSubMatcher';
import { WrittenAddSubSorter } from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osszeadas-es-kivonas/WrittenAddSubSorter';
import {
  WrittenAdditionSvg,
  MonaSubtractionSvg,
  ManoSubtractionSvg,
  EstimateSvg,
  FlightRouteSvg,
  SameDifferenceSvg
} from '@/components/math/grade-4/irasbeli-muveletek-10000-ig/irasbeli-osszeadas-es-kivonas/WrittenAddSubFigures';

describe('Grade 4 Topic III - 1. Írásbeli összeadás és kivonás - Components', () => {
  it('renders WrittenAddSubTheory without throwing', () => {
    const { container } = render(<WrittenAddSubTheory />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenAddSubQuiz without throwing', () => {
    const { container } = render(<WrittenAddSubQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenAddSubMatcher without throwing', () => {
    const { container } = render(<WrittenAddSubMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders WrittenAddSubSorter without throwing', () => {
    const { container } = render(<WrittenAddSubSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [WrittenAdditionSvg, MonaSubtractionSvg, ManoSubtractionSvg, EstimateSvg, FlightRouteSvg, SameDifferenceSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('computes four-digit written addition and subtraction columns correctly', () => {
    expect(columnSteps4(3845, 2850, '+').map((s) => s.digit)).toEqual([5, 9, 6, 6]);
    expect(columnSteps4(7212, 5410, '−').map((s) => s.digit)).toEqual([2, 0, 8, 1]);
    expect(columnSteps4(8000, 2873, '−').map((s) => s.digit)).toEqual([7, 2, 1, 5]);
    expect(columnSteps4(6300, 3649, '−').map((s) => s.digit)).toEqual([1, 5, 6, 2]);
  });
});
