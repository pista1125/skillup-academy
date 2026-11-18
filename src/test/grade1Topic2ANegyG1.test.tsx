import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ANegyG1Mese } from '@/components/math/grade-1/szamolas-5-ig/a-negy/ANegyG1Mese';
import { ANegyG1Jatek, A_NEGY_G1_QUESTIONS, A_NEGY_G1_PAIRS, A_NEGY_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/a-negy/ANegyG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/5 A négy', () => {
  it('renders the story and the game', () => {
    expect(render(<ANegyG1Mese />).container).toBeTruthy();
    expect(render(<ANegyG1Jatek />).container).toBeTruthy();
    expect(render(<ANegyG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ANegyG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_NEGY_G1_QUESTIONS, A_NEGY_G1_PAIRS, A_NEGY_G1_SORT, { perLevel: 8 });
  });
});
