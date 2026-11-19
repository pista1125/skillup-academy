import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenkettoG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenketto/ATizenkettoG1Mese';
import { ATizenkettoG1Jatek, A_TIZENKETTO_G1_QUESTIONS, A_TIZENKETTO_G1_PAIRS, A_TIZENKETTO_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenketto/ATizenkettoG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/2 A tizenkettő', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenkettoG1Mese />).container).toBeTruthy();
    expect(render(<ATizenkettoG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenkettoG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenkettoG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENKETTO_G1_QUESTIONS, A_TIZENKETTO_G1_PAIRS, A_TIZENKETTO_G1_SORT, { perLevel: 8 });
  });
});
