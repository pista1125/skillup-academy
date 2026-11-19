import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizenharomG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenharom/ATizenharomG1Mese';
import { ATizenharomG1Jatek, A_TIZENHAROM_G1_QUESTIONS, A_TIZENHAROM_G1_PAIRS, A_TIZENHAROM_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizenharom/ATizenharomG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/3 A tizenhárom', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizenharomG1Mese />).container).toBeTruthy();
    expect(render(<ATizenharomG1Jatek />).container).toBeTruthy();
    expect(render(<ATizenharomG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizenharomG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENHAROM_G1_QUESTIONS, A_TIZENHAROM_G1_PAIRS, A_TIZENHAROM_G1_SORT, { perLevel: 8 });
  });
});
