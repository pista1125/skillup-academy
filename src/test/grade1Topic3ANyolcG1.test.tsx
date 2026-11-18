import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ANyolcG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/a-nyolc/ANyolcG1Mese';
import { ANyolcG1Jatek, A_NYOLC_G1_QUESTIONS, A_NYOLC_G1_PAIRS, A_NYOLC_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/a-nyolc/ANyolcG1Jatek';
import { SnowmanButtonsPlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/a-nyolc/ANyolcG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/9 A nyolc', () => {
  it('renders the story and the game', () => {
    expect(render(<ANyolcG1Mese />).container).toBeTruthy();
    expect(render(<SnowmanButtonsPlayground />).container).toBeTruthy();
    expect(render(<ANyolcG1Jatek />).container).toBeTruthy();
    expect(render(<ANyolcG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ANyolcG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_NYOLC_G1_QUESTIONS, A_NYOLC_G1_PAIRS, A_NYOLC_G1_SORT, { perLevel: 8 });
  });
});
