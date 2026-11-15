import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { GraphPropertiesTheory } from '@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesTheory';
import { GraphPropertiesQuiz } from '@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesQuiz';
import { GraphPropertiesMatcher } from '@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesMatcher';
import { GraphPropertiesSorter } from '@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesSorter';
import {
  SameGraphTwoDrawingsSvg,
  GraphTermsSvg,
  FourFriendsCycleSvg,
  VillageRoadsSvg,
  ChessFinalGraphSvg
} from '@/components/math/grade-11/kombinatorika-grafok/grafok-jellemzoi/GraphPropertiesFigures';

describe('Grade 11 Topic II - 23. Gráfok jellemzői - Components', () => {
  it('renders GraphPropertiesTheory without throwing', () => {
    const { container } = render(<GraphPropertiesTheory />);
    expect(container).toBeTruthy();
  });

  it('graph lab: adding an edge updates the degree sum check', () => {
    render(<GraphPropertiesTheory />);
    // kezdetben 3 él (A–B, B–C, C–D)
    expect(screen.getByText(/csúcsok: 5, élek: 3/)).toBeTruthy();
    fireEvent.click(screen.getByTestId('vertex-0'));
    fireEvent.click(screen.getByTestId('vertex-4'));
    expect(screen.getByText(/csúcsok: 5, élek: 4/)).toBeTruthy();
    expect(screen.getByText(/2 · élek száma = 2 · 4 = 8/)).toBeTruthy();
  });

  it('renders GraphPropertiesQuiz without throwing', () => {
    const { container } = render(<GraphPropertiesQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders GraphPropertiesMatcher without throwing', () => {
    const { container } = render(<GraphPropertiesMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GraphPropertiesSorter without throwing', () => {
    const { container } = render(<GraphPropertiesSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [SameGraphTwoDrawingsSvg, GraphTermsSvg, FourFriendsCycleSvg, VillageRoadsSvg, ChessFinalGraphSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
