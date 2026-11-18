import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Megallo10G1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-10/Megallo10G1Mese';
import { Megallo10G1Jatek, MEGALLO10_G1_QUESTIONS, MEGALLO10_G1_PAIRS, MEGALLO10_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-10/Megallo10G1Jatek';
import { TreasurePlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/megallo-10/Megallo10G1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/20 Megálló (0–10)', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<Megallo10G1Mese />).container).toBeTruthy();
    expect(render(<TreasurePlayground />).container).toBeTruthy();
    expect(render(<Megallo10G1Jatek />).container).toBeTruthy();
    expect(render(<Megallo10G1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Megallo10G1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(MEGALLO10_G1_QUESTIONS, MEGALLO10_G1_PAIRS, MEGALLO10_G1_SORT, { perLevel: 12 });
  });
});
