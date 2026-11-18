import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { SzinesrudKeszletG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/szinesrud-keszlet/SzinesrudKeszletG1Mese';
import {
  SzinesrudKeszletG1Jatek,
  SZINESRUD_KESZLET_G1_QUESTIONS,
  SZINESRUD_KESZLET_G1_PAIRS,
  SZINESRUD_KESZLET_G1_SORT,
} from '@/components/math/grade-1/elokeszito-idoszak/szinesrud-keszlet/SzinesrudKeszletG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/5 Színesrúd-készlet', () => {
  it('renders the story and the game', () => {
    expect(render(<SzinesrudKeszletG1Mese />).container).toBeTruthy();
    expect(render(<SzinesrudKeszletG1Jatek />).container).toBeTruthy();
    expect(render(<SzinesrudKeszletG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<SzinesrudKeszletG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SZINESRUD_KESZLET_G1_QUESTIONS, SZINESRUD_KESZLET_G1_PAIRS, SZINESRUD_KESZLET_G1_SORT, { perLevel: 8 });
  });
});
