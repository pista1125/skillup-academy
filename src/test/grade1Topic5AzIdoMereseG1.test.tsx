import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AzIdoMereseG1Mese } from '@/components/math/grade-1/meresek/az-ido-merese/AzIdoMereseG1Mese';
import {
  AzIdoMereseG1Jatek,
  AZ_IDO_MERESE_G1_QUESTIONS,
  AZ_IDO_MERESE_G1_PAIRS,
  AZ_IDO_MERESE_G1_SORT,
} from '@/components/math/grade-1/meresek/az-ido-merese/AzIdoMereseG1Jatek';
import { ClockSetPlayground } from '@/components/math/grade-1/meresek/az-ido-merese/AzIdoMereseG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – V/4 Az idő mérése', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<AzIdoMereseG1Mese />).container).toBeTruthy();
    expect(render(<ClockSetPlayground />).container).toBeTruthy();
    expect(render(<AzIdoMereseG1Jatek />).container).toBeTruthy();
    expect(render(<AzIdoMereseG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AzIdoMereseG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(AZ_IDO_MERESE_G1_QUESTIONS, AZ_IDO_MERESE_G1_PAIRS, AZ_IDO_MERESE_G1_SORT, { perLevel: 8 });
  });
});
