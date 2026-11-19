import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AHosszusagMereseG1Mese } from '@/components/math/grade-1/meresek/a-hosszusag-merese/AHosszusagMereseG1Mese';
import {
  AHosszusagMereseG1Jatek,
  A_HOSSZUSAG_MERESE_G1_QUESTIONS,
  A_HOSSZUSAG_MERESE_G1_PAIRS,
  A_HOSSZUSAG_MERESE_G1_SORT,
} from '@/components/math/grade-1/meresek/a-hosszusag-merese/AHosszusagMereseG1Jatek';
import { RodMeasurePlayground } from '@/components/math/grade-1/meresek/a-hosszusag-merese/AHosszusagMereseG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – V/1 A hosszúság mérése', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<AHosszusagMereseG1Mese />).container).toBeTruthy();
    expect(render(<RodMeasurePlayground />).container).toBeTruthy();
    expect(render(<AHosszusagMereseG1Jatek />).container).toBeTruthy();
    expect(render(<AHosszusagMereseG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AHosszusagMereseG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_HOSSZUSAG_MERESE_G1_QUESTIONS, A_HOSSZUSAG_MERESE_G1_PAIRS, A_HOSSZUSAG_MERESE_G1_SORT, { perLevel: 8 });
  });
});
