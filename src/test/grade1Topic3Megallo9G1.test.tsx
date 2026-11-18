import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Megallo9G1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-9/Megallo9G1Mese';
import { Megallo9G1Jatek, MEGALLO9_G1_QUESTIONS, MEGALLO9_G1_PAIRS, MEGALLO9_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-9/Megallo9G1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/16 Megálló (9)', () => {
  it('renders the story and the game', () => {
    expect(render(<Megallo9G1Mese />).container).toBeTruthy();
    expect(render(<Megallo9G1Jatek />).container).toBeTruthy();
    expect(render(<Megallo9G1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Megallo9G1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(MEGALLO9_G1_QUESTIONS, MEGALLO9_G1_PAIRS, MEGALLO9_G1_SORT, { perLevel: 12 });
  });
});
