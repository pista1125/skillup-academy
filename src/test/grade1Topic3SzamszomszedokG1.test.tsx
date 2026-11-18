import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { SzamszomszedokG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/szamszomszedok/SzamszomszedokG1Mese';
import { SzamszomszedokG1Jatek, SZAMSZOMSZEDOK_G1_QUESTIONS, SZAMSZOMSZEDOK_G1_PAIRS, SZAMSZOMSZEDOK_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/szamszomszedok/SzamszomszedokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/7 Számszomszédok', () => {
  it('renders the story and the game', () => {
    expect(render(<SzamszomszedokG1Mese />).container).toBeTruthy();
    expect(render(<SzamszomszedokG1Jatek />).container).toBeTruthy();
    expect(render(<SzamszomszedokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<SzamszomszedokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SZAMSZOMSZEDOK_G1_QUESTIONS, SZAMSZOMSZEDOK_G1_PAIRS, SZAMSZOMSZEDOK_G1_SORT, { perLevel: 8 });
  });
});
