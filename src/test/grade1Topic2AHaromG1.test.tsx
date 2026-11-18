import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AHaromG1Mese } from '@/components/math/grade-1/szamolas-5-ig/a-harom/AHaromG1Mese';
import { AHaromG1Jatek, A_HAROM_G1_QUESTIONS, A_HAROM_G1_PAIRS, A_HAROM_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/a-harom/AHaromG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/4 A három', () => {
  it('renders the story and the game', () => {
    expect(render(<AHaromG1Mese />).container).toBeTruthy();
    expect(render(<AHaromG1Jatek />).container).toBeTruthy();
    expect(render(<AHaromG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AHaromG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_HAROM_G1_QUESTIONS, A_HAROM_G1_PAIRS, A_HAROM_G1_SORT, { perLevel: 8 });
  });
});
