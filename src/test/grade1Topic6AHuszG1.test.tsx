import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AHuszG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-husz/AHuszG1Mese';
import { AHuszG1Jatek, A_HUSZ_G1_QUESTIONS, A_HUSZ_G1_PAIRS, A_HUSZ_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-husz/AHuszG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/10 A húsz', () => {
  it('renders the story and the game', () => {
    expect(render(<AHuszG1Mese />).container).toBeTruthy();
    expect(render(<AHuszG1Jatek />).container).toBeTruthy();
    expect(render(<AHuszG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AHuszG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_HUSZ_G1_QUESTIONS, A_HUSZ_G1_PAIRS, A_HUSZ_G1_SORT, { perLevel: 8 });
  });
});
