import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { SikidomokG1Mese } from '@/components/math/grade-1/geometria/sikidomok/SikidomokG1Mese';
import { SikidomokG1Jatek, SIKIDOMOK_G1_QUESTIONS, SIKIDOMOK_G1_PAIRS, SIKIDOMOK_G1_SORT } from '@/components/math/grade-1/geometria/sikidomok/SikidomokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – IV/2 Síkidomok', () => {
  it('renders the story and the game', () => {
    expect(render(<SikidomokG1Mese />).container).toBeTruthy();
    expect(render(<SikidomokG1Jatek />).container).toBeTruthy();
    expect(render(<SikidomokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<SikidomokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SIKIDOMOK_G1_QUESTIONS, SIKIDOMOK_G1_PAIRS, SIKIDOMOK_G1_SORT, { perLevel: 8 });
  });
});
