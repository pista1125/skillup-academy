import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { TestekG1Mese } from '@/components/math/grade-1/geometria/testek/TestekG1Mese';
import { TestekG1Jatek, TESTEK_G1_QUESTIONS, TESTEK_G1_PAIRS, TESTEK_G1_SORT } from '@/components/math/grade-1/geometria/testek/TestekG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – IV/3 Testek', () => {
  it('renders the story and the game', () => {
    expect(render(<TestekG1Mese />).container).toBeTruthy();
    expect(render(<TestekG1Jatek />).container).toBeTruthy();
    expect(render(<TestekG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<TestekG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(TESTEK_G1_QUESTIONS, TESTEK_G1_PAIRS, TESTEK_G1_SORT, { perLevel: 8 });
  });
});
