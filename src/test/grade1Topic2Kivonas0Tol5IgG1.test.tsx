import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Kivonas0Tol5IgG1Mese } from '@/components/math/grade-1/szamolas-5-ig/kivonas-0-tol-5-ig/Kivonas0Tol5IgG1Mese';
import {
  Kivonas0Tol5IgG1Jatek,
  KIVONAS_0_TOL_5_IG_G1_QUESTIONS,
  KIVONAS_0_TOL_5_IG_G1_PAIRS,
  KIVONAS_0_TOL_5_IG_G1_SORT,
} from '@/components/math/grade-1/szamolas-5-ig/kivonas-0-tol-5-ig/Kivonas0Tol5IgG1Jatek';
import { CrossOutPlayground } from '@/components/math/grade-1/szamolas-5-ig/kivonas-0-tol-5-ig/Kivonas0Tol5IgG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/8 Kivonás 0-tól 5-ig', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<Kivonas0Tol5IgG1Mese />).container).toBeTruthy();
    expect(render(<CrossOutPlayground />).container).toBeTruthy();
    expect(render(<Kivonas0Tol5IgG1Jatek />).container).toBeTruthy();
    expect(render(<Kivonas0Tol5IgG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Kivonas0Tol5IgG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(KIVONAS_0_TOL_5_IG_G1_QUESTIONS, KIVONAS_0_TOL_5_IG_G1_PAIRS, KIVONAS_0_TOL_5_IG_G1_SORT, { perLevel: 8 });
  });
  it('uses only numbers 0–5', () => {
    KIVONAS_0_TOL_5_IG_G1_QUESTIONS.forEach((q) =>
      q.options.forEach((o) => {
        if (typeof o === 'number') expect(o).toBeLessThanOrEqual(5);
      })
    );
  });
});
