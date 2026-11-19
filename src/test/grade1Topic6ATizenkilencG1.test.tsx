import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenkilencG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenkilenc/ATizenkilencG1Mese';
import { ATizenkilencG1Jatek, A_TIZENKILENC_G1_QUESTIONS, A_TIZENKILENC_G1_PAIRS, A_TIZENKILENC_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenkilenc/ATizenkilencG1Jatek';
import { EperEpitoPlayground } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenkilenc/ATizenkilencG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/9 A tizenkilenc', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenkilencG1Mese />).container).toBeTruthy();
    expect(render(<EperEpitoPlayground />).container).toBeTruthy();
    expect(render(<ATizenkilencG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenkilencG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenkilencG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENKILENC_G1_QUESTIONS, A_TIZENKILENC_G1_PAIRS, A_TIZENKILENC_G1_SORT, { perLevel: 8 });
  });
});
