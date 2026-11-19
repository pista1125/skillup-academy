import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenhetG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenhet/ATizenhetG1Mese';
import { ATizenhetG1Jatek, A_TIZENHET_G1_QUESTIONS, A_TIZENHET_G1_PAIRS, A_TIZENHET_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenhet/ATizenhetG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/7 A tizenhét', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenhetG1Mese />).container).toBeTruthy();
    expect(render(<ATizenhetG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenhetG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenhetG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENHET_G1_QUESTIONS, A_TIZENHET_G1_PAIRS, A_TIZENHET_G1_SORT, { perLevel: 8 });
  });
});
