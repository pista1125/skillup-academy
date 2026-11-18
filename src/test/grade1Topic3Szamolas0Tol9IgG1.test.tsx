import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Szamolas0Tol9IgG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/szamolas-0-tol-9-ig/Szamolas0Tol9IgG1Mese';
import { Szamolas0Tol9IgG1Jatek, SZAMOLAS_0_TOL_9_IG_G1_QUESTIONS, SZAMOLAS_0_TOL_9_IG_G1_PAIRS, SZAMOLAS_0_TOL_9_IG_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/szamolas-0-tol-9-ig/Szamolas0Tol9IgG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/14 Számolás 0-tól 9-ig', () => {
  it('renders the story and the game', () => {
    expect(render(<Szamolas0Tol9IgG1Mese />).container).toBeTruthy();
    expect(render(<Szamolas0Tol9IgG1Jatek />).container).toBeTruthy();
    expect(render(<Szamolas0Tol9IgG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Szamolas0Tol9IgG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SZAMOLAS_0_TOL_9_IG_G1_QUESTIONS, SZAMOLAS_0_TOL_9_IG_G1_PAIRS, SZAMOLAS_0_TOL_9_IG_G1_SORT, { perLevel: 8 });
  });
});
