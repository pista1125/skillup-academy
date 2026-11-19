import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ATomegMereseG1Mese } from '@/components/math/grade-1/meresek/a-tomeg-merese/ATomegMereseG1Mese';
import {
  ATomegMereseG1Jatek,
  A_TOMEG_MERESE_G1_QUESTIONS,
  A_TOMEG_MERESE_G1_PAIRS,
  A_TOMEG_MERESE_G1_SORT,
} from '@/components/math/grade-1/meresek/a-tomeg-merese/ATomegMereseG1Jatek';
import { BalancePlayground } from '@/components/math/grade-1/meresek/a-tomeg-merese/ATomegMereseG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – V/2 A tömeg mérése', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<ATomegMereseG1Mese />).container).toBeTruthy();
    expect(render(<BalancePlayground />).container).toBeTruthy();
    expect(render(<ATomegMereseG1Jatek />).container).toBeTruthy();
    expect(render(<ATomegMereseG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ATomegMereseG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_TOMEG_MERESE_G1_QUESTIONS, A_TOMEG_MERESE_G1_PAIRS, A_TOMEG_MERESE_G1_SORT, { perLevel: 8 });
  });
});
