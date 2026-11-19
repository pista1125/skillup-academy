import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizennegyG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizennegy/ATizennegyG1Mese';
import { ATizennegyG1Jatek, A_TIZENNEGY_G1_QUESTIONS, A_TIZENNEGY_G1_PAIRS, A_TIZENNEGY_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizennegy/ATizennegyG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/4 A tizennégy', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizennegyG1Mese />).container).toBeTruthy();
    expect(render(<ATizennegyG1Jatek />).container).toBeTruthy();
    expect(render(<ATizennegyG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizennegyG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENNEGY_G1_QUESTIONS, A_TIZENNEGY_G1_PAIRS, A_TIZENNEGY_G1_SORT, { perLevel: 8 });
  });
});
