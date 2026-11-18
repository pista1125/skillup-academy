import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AHatG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/a-hat/AHatG1Mese';
import { AHatG1Jatek, A_HAT_G1_QUESTIONS, A_HAT_G1_PAIRS, A_HAT_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/a-hat/AHatG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/1 A hat', () => {
  it('renders the story and the game', () => {
    expect(render(<AHatG1Mese />).container).toBeTruthy();
    expect(render(<AHatG1Jatek />).container).toBeTruthy();
    expect(render(<AHatG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AHatG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_HAT_G1_QUESTIONS, A_HAT_G1_PAIRS, A_HAT_G1_SORT, { perLevel: 8 });
  });
});
