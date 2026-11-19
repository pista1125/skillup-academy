import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenegyG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenegy/ATizenegyG1Mese';
import { ATizenegyG1Jatek, A_TIZENEGY_G1_QUESTIONS, A_TIZENEGY_G1_PAIRS, A_TIZENEGY_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenegy/ATizenegyG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/1 A tizenegy', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenegyG1Mese />).container).toBeTruthy();
    expect(render(<ATizenegyG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenegyG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenegyG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENEGY_G1_QUESTIONS, A_TIZENEGY_G1_PAIRS, A_TIZENEGY_G1_SORT, { perLevel: 8 });
  });
});
