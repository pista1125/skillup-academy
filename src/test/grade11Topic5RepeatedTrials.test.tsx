import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { RepeatedTrialsTheory } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ugyanazt-tobbszor/RepeatedTrialsTheory';
import { RepeatedTrialsQuiz } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ugyanazt-tobbszor/RepeatedTrialsQuiz';
import { RepeatedTrialsMatcher } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ugyanazt-tobbszor/RepeatedTrialsMatcher';
import { RepeatedTrialsSorter } from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ugyanazt-tobbszor/RepeatedTrialsSorter';
import {
  RepeatedTrialsPenaltySvg,
  RepeatedTrialsChainSvg,
  RepeatedTrialsExactlyOnceSvg,
  RepeatedTrialsSnakeTreeSvg,
  RepeatedTrialsFirstSixSvg
} from '@/components/math/grade-11/statisztika-valoszinusegszamitas/ugyanazt-tobbszor/RepeatedTrialsFigures';

describe('Grade 11 Topic V - 12. Ugyanazt többször - Components', () => {
  it('renders RepeatedTrialsTheory without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RepeatedTrialsTheory />);
    expect(container).toBeTruthy();
  });

  it('renders RepeatedTrialsQuiz without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RepeatedTrialsQuiz />);
    expect(container).toBeTruthy();
  });

  it('renders RepeatedTrialsMatcher without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RepeatedTrialsMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders RepeatedTrialsSorter without throwing', { timeout: 20000 }, () => {
    const { container } = render(<RepeatedTrialsSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all figure SVGs without throwing', { timeout: 20000 }, () => {
    const figures = [RepeatedTrialsPenaltySvg, RepeatedTrialsChainSvg, RepeatedTrialsExactlyOnceSvg, RepeatedTrialsSnakeTreeSvg, RepeatedTrialsFirstSixSvg];
    figures.forEach((Fig) => {
      const { container } = render(<Fig />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
