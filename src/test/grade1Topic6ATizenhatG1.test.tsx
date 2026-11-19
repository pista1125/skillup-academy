import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenhatG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenhat/ATizenhatG1Mese';
import { ATizenhatG1Jatek, A_TIZENHAT_G1_QUESTIONS, A_TIZENHAT_G1_PAIRS, A_TIZENHAT_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenhat/ATizenhatG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/6 A tizenhat', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenhatG1Mese />).container).toBeTruthy();
    expect(render(<ATizenhatG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenhatG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenhatG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENHAT_G1_QUESTIONS, A_TIZENHAT_G1_PAIRS, A_TIZENHAT_G1_SORT, { perLevel: 8 });
  });
});
