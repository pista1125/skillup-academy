import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { CombinatoricsGraphsTheory } from '@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsTheory';
import { CombinatoricsGraphsQuiz } from '@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsQuiz';
import { CombinatoricsGraphsMatcher } from '@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsMatcher';
import { CombinatoricsGraphsSorter } from '@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsSorter';
import {
  TableTennisGraphSvg,
  CompleteGraphsSvg,
  ConferenceGraphSvg,
  VertexOrEdgeChoiceSvg,
  SocialNetworkSvg
} from '@/components/math/grade-11/kombinatorika-grafok/kombinatorika-es-grafok/CombinatoricsGraphsFigures';

describe('Grade 11 Topic II - 24. Kombinatorika és gráfok - Components', () => {
  it('renders CombinatoricsGraphsTheory without throwing', () => {
    const { container } = render(<CombinatoricsGraphsTheory />);
    expect(container).toBeTruthy();
  });

  it('tournament lab: textbook example gives 23 played and 5 remaining; odd sum is flagged', () => {
    render(<CombinatoricsGraphsTheory />);
    expect(screen.getByText(/lejátszott: 46 \/ 2 =/)).toBeTruthy();
    fireEvent.click(screen.getByText('Valaki rosszul emlékszik'));
    expect(screen.getByText(/Az összeg páratlan/)).toBeTruthy();
  });

  it('renders CombinatoricsGraphsQuiz without throwing', () => {
    const { container } = render(<CombinatoricsGraphsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsGraphsMatcher without throwing', () => {
    const { container } = render(<CombinatoricsGraphsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders CombinatoricsGraphsSorter without throwing', () => {
    const { container } = render(<CombinatoricsGraphsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', () => {
    const figures = [TableTennisGraphSvg, CompleteGraphsSvg, ConferenceGraphSvg, VertexOrEdgeChoiceSvg, SocialNetworkSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
