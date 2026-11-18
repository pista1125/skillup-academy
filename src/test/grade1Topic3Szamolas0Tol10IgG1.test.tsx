import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Szamolas0Tol10IgG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/szamolas-0-tol-10-ig/Szamolas0Tol10IgG1Mese';
import {
  Szamolas0Tol10IgG1Jatek,
  SZAMOLAS_0_TOL_10_IG_G1_QUESTIONS,
  SZAMOLAS_0_TOL_10_IG_G1_PAIRS,
  SZAMOLAS_0_TOL_10_IG_G1_SORT,
} from '@/components/math/grade-1/szamkorbovites-10-ig/szamolas-0-tol-10-ig/Szamolas0Tol10IgG1Jatek';
import { BowlingPlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/szamolas-0-tol-10-ig/Szamolas0Tol10IgG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/18 Számolás 0-tól 10-ig', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<Szamolas0Tol10IgG1Mese />).container).toBeTruthy();
    expect(render(<BowlingPlayground />).container).toBeTruthy();
    expect(render(<Szamolas0Tol10IgG1Jatek />).container).toBeTruthy();
    expect(render(<Szamolas0Tol10IgG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Szamolas0Tol10IgG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SZAMOLAS_0_TOL_10_IG_G1_QUESTIONS, SZAMOLAS_0_TOL_10_IG_G1_PAIRS, SZAMOLAS_0_TOL_10_IG_G1_SORT, { perLevel: 8 });
  });
});
