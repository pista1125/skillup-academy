import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AzUrtartalomMereseG1Mese } from '@/components/math/grade-1/meresek/az-urtartalom-merese/AzUrtartalomMereseG1Mese';
import {
  AzUrtartalomMereseG1Jatek,
  AZ_URTARTALOM_MERESE_G1_QUESTIONS,
  AZ_URTARTALOM_MERESE_G1_PAIRS,
  AZ_URTARTALOM_MERESE_G1_SORT,
} from '@/components/math/grade-1/meresek/az-urtartalom-merese/AzUrtartalomMereseG1Jatek';
import { FillJugPlayground } from '@/components/math/grade-1/meresek/az-urtartalom-merese/AzUrtartalomMereseG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – V/3 Az űrtartalom mérése', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<AzUrtartalomMereseG1Mese />).container).toBeTruthy();
    expect(render(<FillJugPlayground />).container).toBeTruthy();
    expect(render(<AzUrtartalomMereseG1Jatek />).container).toBeTruthy();
    expect(render(<AzUrtartalomMereseG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AzUrtartalomMereseG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(AZ_URTARTALOM_MERESE_G1_QUESTIONS, AZ_URTARTALOM_MERESE_G1_PAIRS, AZ_URTARTALOM_MERESE_G1_SORT, { perLevel: 8 });
  });
});
