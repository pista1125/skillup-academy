import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/a-tiz/ATizG1Mese';
import { ATizG1Jatek, A_TIZ_G1_QUESTIONS, A_TIZ_G1_PAIRS, A_TIZ_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/a-tiz/ATizG1Jatek';
import { FillTenPlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/a-tiz/ATizG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/17 A tíz', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<ATizG1Mese />).container).toBeTruthy();
    expect(render(<FillTenPlayground />).container).toBeTruthy();
    expect(render(<ATizG1Jatek />).container).toBeTruthy();
    expect(render(<ATizG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZ_G1_QUESTIONS, A_TIZ_G1_PAIRS, A_TIZ_G1_SORT, { perLevel: 8 });
  });
});
