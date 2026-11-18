import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AKilencG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/a-kilenc/AKilencG1Mese';
import { AKilencG1Jatek, A_KILENC_G1_QUESTIONS, A_KILENC_G1_PAIRS, A_KILENC_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/a-kilenc/AKilencG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/13 A kilenc', () => {
  it('renders the story and the game', () => {
    expect(render(<AKilencG1Mese />).container).toBeTruthy();
    expect(render(<AKilencG1Jatek />).container).toBeTruthy();
    expect(render(<AKilencG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AKilencG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_KILENC_G1_QUESTIONS, A_KILENC_G1_PAIRS, A_KILENC_G1_SORT, { perLevel: 8 });
  });
});
