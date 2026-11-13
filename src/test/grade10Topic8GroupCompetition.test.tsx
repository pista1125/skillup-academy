import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { GroupCompetitionTheory } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionTheory';
import { GroupCompetitionQuiz } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionQuiz';
import { GroupCompetitionMatcher } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionMatcher';
import { GroupCompetitionSorter } from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionSorter';
import {
  TeamChallengeRelaySvg,
  ErrorHuntStepAnalysisSvg,
  SpeedVieteDuelSvg,
  SignChartSprintSvg,
  ScoreboardTournamentSvg
} from '@/components/math/grade-10/egyenletek-es-egyenlotlensegek/csoportverseny/GroupCompetitionFigures';

describe('Grade 10 Topic VIII - Csoportverseny - Components', () => {
  it('renders GroupCompetitionTheory without throwing', () => {
    const { container } = render(<GroupCompetitionTheory />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('8. Csoportverseny');
    expect(container.textContent).toContain('FONTOS SZABÁLYOK');
    expect(container.textContent).toContain('Csapatverseny Aréna – Válassz Állomást!');
  });

  it('renders GroupCompetitionQuiz without throwing', () => {
    const { container } = render(<GroupCompetitionQuiz />);
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('8. Csoportverseny');
  });

  it('renders GroupCompetitionMatcher without throwing', () => {
    const { container } = render(<GroupCompetitionMatcher />);
    expect(container).toBeTruthy();
  });

  it('renders GroupCompetitionSorter without throwing', () => {
    const { container } = render(<GroupCompetitionSorter />);
    expect(container).toBeTruthy();
  });

  it('renders all 5 figures SVGs without throwing', () => {
    const { container: c1 } = render(<TeamChallengeRelaySvg />);
    expect(c1.querySelector('svg')).toBeTruthy();

    const { container: c2 } = render(<ErrorHuntStepAnalysisSvg />);
    expect(c2.querySelector('svg')).toBeTruthy();

    const { container: c3 } = render(<SpeedVieteDuelSvg />);
    expect(c3.querySelector('svg')).toBeTruthy();

    const { container: c4 } = render(<SignChartSprintSvg />);
    expect(c4.querySelector('svg')).toBeTruthy();

    const { container: c5 } = render(<ScoreboardTournamentSvg />);
    expect(c5.querySelector('svg')).toBeTruthy();
  });
});

