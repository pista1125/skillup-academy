import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AzOtG1Mese } from '@/components/math/grade-1/szamolas-5-ig/az-ot/AzOtG1Mese';
import { AzOtG1Jatek, AZ_OT_G1_QUESTIONS, AZ_OT_G1_PAIRS, AZ_OT_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/az-ot/AzOtG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/6 Az öt', () => {
  it('renders the story and the game', () => {
    expect(render(<AzOtG1Mese />).container).toBeTruthy();
    expect(render(<AzOtG1Jatek />).container).toBeTruthy();
    expect(render(<AzOtG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AzOtG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(AZ_OT_G1_QUESTIONS, AZ_OT_G1_PAIRS, AZ_OT_G1_SORT, { perLevel: 8 });
  });
});
