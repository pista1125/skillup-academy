import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Megallo8G1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-8/Megallo8G1Mese';
import { Megallo8G1Jatek, MEGALLO_8_G1_QUESTIONS, MEGALLO_8_G1_PAIRS, MEGALLO_8_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-8/Megallo8G1Jatek';
import { KeyPuzzlePlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-8/Megallo8G1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/12 Megálló (8)', () => {
  it('renders the story and the game', () => {
    expect(render(<Megallo8G1Mese />).container).toBeTruthy();
    expect(render(<KeyPuzzlePlayground />).container).toBeTruthy();
    expect(render(<Megallo8G1Jatek />).container).toBeTruthy();
    expect(render(<Megallo8G1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Megallo8G1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(MEGALLO_8_G1_QUESTIONS, MEGALLO_8_G1_PAIRS, MEGALLO_8_G1_SORT, { perLevel: 12 });
  });
});
