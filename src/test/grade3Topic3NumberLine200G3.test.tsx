import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { NumberLine200G3Theory } from '@/components/math/grade-3/szamolas-200-ig/szamok-helye-a-szamegyenesen/NumberLine200G3Theory';
import { NumberLine200G3Quiz, NUMBER_LINE_200_G3_QUESTIONS } from '@/components/math/grade-3/szamolas-200-ig/szamok-helye-a-szamegyenesen/NumberLine200G3Quiz';
import { NumberLine200G3Matcher } from '@/components/math/grade-3/szamolas-200-ig/szamok-helye-a-szamegyenesen/NumberLine200G3Matcher';
import { NumberLine200G3Sorter } from '@/components/math/grade-3/szamolas-200-ig/szamok-helye-a-szamegyenesen/NumberLine200G3Sorter';
import {
  NumberLine0to200Svg,
  ZoomLineSvg,
  ScaleStepsSvg,
  TapeMeasureSvg,
  GrasshopperSvg,
  MiddleSvg
} from '@/components/math/grade-3/szamolas-200-ig/szamok-helye-a-szamegyenesen/NumberLine200G3Figures';

describe("Grade 3 Topic III - 2. Számok helye a számegyenesen - Components", () => {
  it('renders NumberLine200G3Theory without throwing', () => {
    const { container } = render(<NumberLine200G3Theory />);
    expect(container).toBeTruthy();
  });

  it('renders NumberLine200G3Quiz without throwing', () => {
    const { container } = render(<NumberLine200G3Quiz />);
    expect(container).toBeTruthy();
  });

  it('has 30 questions, 10 per level, each with a badge and 4 distinct options', () => {
    expect(NUMBER_LINE_200_G3_QUESTIONS).toHaveLength(30);
    [1, 2, 3].forEach((l) => expect(NUMBER_LINE_200_G3_QUESTIONS.filter((q) => q.level === l)).toHaveLength(10));
    NUMBER_LINE_200_G3_QUESTIONS.forEach((q) => {
      expect(q.questionTypeBadge).toBeTruthy();
      expect(q.correctAnswer).toBe(0);
      expect(new Set(q.options.map(String)).size).toBe(q.options.length);
    });
  });

  it('renders NumberLine200G3Matcher without throwing', () => {
    const { container } = render(<NumberLine200G3Matcher />);
    expect(container).toBeTruthy();
  });

  it('renders NumberLine200G3Sorter without throwing', () => {
    const { container } = render(<NumberLine200G3Sorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [NumberLine0to200Svg, ZoomLineSvg, ScaleStepsSvg, TapeMeasureSvg, GrasshopperSvg, MiddleSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
