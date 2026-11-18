import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Megallo6G1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-6/Megallo6G1Mese';
import { Megallo6G1Jatek, MEGALLO_6_G1_QUESTIONS, MEGALLO_6_G1_PAIRS, MEGALLO_6_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-6/Megallo6G1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/4 Megálló (0–6)', () => {
  it('renders the story and the game', () => {
    expect(render(<Megallo6G1Mese />).container).toBeTruthy();
    expect(render(<Megallo6G1Jatek />).container).toBeTruthy();
    expect(render(<Megallo6G1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Megallo6G1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(MEGALLO_6_G1_QUESTIONS, MEGALLO_6_G1_PAIRS, MEGALLO_6_G1_SORT, { perLevel: 12 });
  });
});
