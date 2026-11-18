import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AzEgyG1Mese } from '@/components/math/grade-1/szamolas-5-ig/az-egy/AzEgyG1Mese';
import { AzEgyG1Jatek, AZ_EGY_G1_QUESTIONS, AZ_EGY_G1_PAIRS, AZ_EGY_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/az-egy/AzEgyG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/1 Az egy', () => {
  it('renders the story and the game', () => {
    expect(render(<AzEgyG1Mese />).container).toBeTruthy();
    expect(render(<AzEgyG1Jatek />).container).toBeTruthy();
    expect(render(<AzEgyG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AzEgyG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(AZ_EGY_G1_QUESTIONS, AZ_EGY_G1_PAIRS, AZ_EGY_G1_SORT, { perLevel: 8 });
  });
});
