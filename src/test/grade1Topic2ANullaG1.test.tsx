import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ANullaG1Mese } from '@/components/math/grade-1/szamolas-5-ig/a-nulla/ANullaG1Mese';
import { ANullaG1Jatek, A_NULLA_G1_QUESTIONS, A_NULLA_G1_PAIRS, A_NULLA_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/a-nulla/ANullaG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/3 A nulla', () => {
  it('renders the story and the game', () => {
    expect(render(<ANullaG1Mese />).container).toBeTruthy();
    expect(render(<ANullaG1Jatek />).container).toBeTruthy();
    expect(render(<ANullaG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ANullaG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_NULLA_G1_QUESTIONS, A_NULLA_G1_PAIRS, A_NULLA_G1_SORT, { perLevel: 8 });
  });
});
