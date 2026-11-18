import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Osszeadas0Tol5IgG1Mese } from '@/components/math/grade-1/szamolas-5-ig/osszeadas-0-tol-5-ig/Osszeadas0Tol5IgG1Mese';
import { Osszeadas0Tol5IgG1Jatek, OSSZEADAS_0_TOL_5_IG_G1_QUESTIONS, OSSZEADAS_0_TOL_5_IG_G1_PAIRS, OSSZEADAS_0_TOL_5_IG_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/osszeadas-0-tol-5-ig/Osszeadas0Tol5IgG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/7 Összeadás 0-tól 5-ig', () => {
  it('renders the story and the game', () => {
    expect(render(<Osszeadas0Tol5IgG1Mese />).container).toBeTruthy();
    expect(render(<Osszeadas0Tol5IgG1Jatek />).container).toBeTruthy();
    expect(render(<Osszeadas0Tol5IgG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Osszeadas0Tol5IgG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(OSSZEADAS_0_TOL_5_IG_G1_QUESTIONS, OSSZEADAS_0_TOL_5_IG_G1_PAIRS, OSSZEADAS_0_TOL_5_IG_G1_SORT, { perLevel: 8 });
  });
});
