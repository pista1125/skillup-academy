import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AHetG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/a-het/AHetG1Mese';
import { AHetG1Jatek, A_HET_G1_QUESTIONS, A_HET_G1_PAIRS, A_HET_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/a-het/AHetG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/5 A hét', () => {
  it('renders the story and the game', () => {
    expect(render(<AHetG1Mese />).container).toBeTruthy();
    expect(render(<AHetG1Jatek />).container).toBeTruthy();
    expect(render(<AHetG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AHetG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_HET_G1_QUESTIONS, A_HET_G1_PAIRS, A_HET_G1_SORT, { perLevel: 8 });
  });
});
