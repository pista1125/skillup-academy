import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenotG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenot/ATizenotG1Mese';
import { ATizenotG1Jatek, A_TIZENOT_G1_QUESTIONS, A_TIZENOT_G1_PAIRS, A_TIZENOT_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenot/ATizenotG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/5 A tizenöt', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenotG1Mese />).container).toBeTruthy();
    expect(render(<ATizenotG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenotG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenotG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENOT_G1_QUESTIONS, A_TIZENOT_G1_PAIRS, A_TIZENOT_G1_SORT, { perLevel: 8 });
  });
});
