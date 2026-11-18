import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Megallo7G1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-7/Megallo7G1Mese';
import { Megallo7G1Jatek, MEGALLO_7_G1_QUESTIONS, MEGALLO_7_G1_PAIRS, MEGALLO_7_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-7/Megallo7G1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/8 Megálló (7)', () => {
  it('renders the story and the game', () => {
    expect(render(<Megallo7G1Mese />).container).toBeTruthy();
    expect(render(<Megallo7G1Jatek />).container).toBeTruthy();
    expect(render(<Megallo7G1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Megallo7G1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(MEGALLO_7_G1_QUESTIONS, MEGALLO_7_G1_PAIRS, MEGALLO_7_G1_SORT, { perLevel: 12 });
  });
});
