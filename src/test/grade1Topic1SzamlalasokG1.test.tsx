import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { SzamlalasokG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/szamlalasok/SzamlalasokG1Mese';
import {
  SzamlalasokG1Jatek,
  SZAMLALASOK_G1_QUESTIONS,
  SZAMLALASOK_G1_PAIRS,
  SZAMLALASOK_G1_SORT,
} from '@/components/math/grade-1/elokeszito-idoszak/szamlalasok/SzamlalasokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/7 Számlálások', () => {
  it('renders the story and the game', () => {
    expect(render(<SzamlalasokG1Mese />).container).toBeTruthy();
    expect(render(<SzamlalasokG1Jatek />).container).toBeTruthy();
    expect(render(<SzamlalasokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<SzamlalasokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SZAMLALASOK_G1_QUESTIONS, SZAMLALASOK_G1_PAIRS, SZAMLALASOK_G1_SORT, { perLevel: 8 });
  });
});
