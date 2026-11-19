import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATizennyolcG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizennyolc/ATizennyolcG1Mese';
import { ATizennyolcG1Jatek, A_TIZENNYOLC_G1_QUESTIONS, A_TIZENNYOLC_G1_PAIRS, A_TIZENNYOLC_G1_SORT } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizennyolc/ATizennyolcG1Jatek';
import { BackToTenPlayground } from '@/components/math/grade-1/szamkorbovites-20-ig/a-tizennyolc/ATizennyolcG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/8 A tizennyolc', () => {
  it('renders the story and the game', () => {
    expect(render(<ATizennyolcG1Mese />).container).toBeTruthy();
    expect(render(<BackToTenPlayground />).container).toBeTruthy();
    expect(render(<ATizennyolcG1Jatek />).container).toBeTruthy();
    expect(render(<ATizennyolcG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATizennyolcG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TIZENNYOLC_G1_QUESTIONS, A_TIZENNYOLC_G1_PAIRS, A_TIZENNYOLC_G1_SORT, { perLevel: 8 });
  });
});
