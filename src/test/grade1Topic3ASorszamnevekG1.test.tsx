import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ASorszamnevekG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/a-sorszamnevek/ASorszamnevekG1Mese';
import { ASorszamnevekG1Jatek, A_SORSZAMNEVEK_G1_QUESTIONS, A_SORSZAMNEVEK_G1_PAIRS, A_SORSZAMNEVEK_G1_SORT } from '@/components/math/grade-1/szamkorbovites-10-ig/a-sorszamnevek/ASorszamnevekG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/15 A sorszámnevek', () => {
  it('renders the story and the game', () => {
    expect(render(<ASorszamnevekG1Mese />).container).toBeTruthy();
    expect(render(<ASorszamnevekG1Jatek />).container).toBeTruthy();
    expect(render(<ASorszamnevekG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ASorszamnevekG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_SORSZAMNEVEK_G1_QUESTIONS, A_SORSZAMNEVEK_G1_PAIRS, A_SORSZAMNEVEK_G1_SORT, { perLevel: 8 });
  });
});
