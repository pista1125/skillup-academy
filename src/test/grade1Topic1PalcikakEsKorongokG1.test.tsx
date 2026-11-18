import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { PalcikakEsKorongokG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/palcikak-es-korongok/PalcikakEsKorongokG1Mese';
import { PalcikakEsKorongokG1Jatek, PALCIKAK_ES_KORONGOK_G1_QUESTIONS, PALCIKAK_ES_KORONGOK_G1_PAIRS, PALCIKAK_ES_KORONGOK_G1_SORT } from '@/components/math/grade-1/elokeszito-idoszak/palcikak-es-korongok/PalcikakEsKorongokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/4 Pálcikák és korongok', () => {
  it('renders the story and the game', () => {
    expect(render(<PalcikakEsKorongokG1Mese />).container).toBeTruthy();
    expect(render(<PalcikakEsKorongokG1Jatek />).container).toBeTruthy();
    expect(render(<PalcikakEsKorongokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<PalcikakEsKorongokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(PALCIKAK_ES_KORONGOK_G1_QUESTIONS, PALCIKAK_ES_KORONGOK_G1_PAIRS, PALCIKAK_ES_KORONGOK_G1_SORT, { perLevel: 8 });
  });
});
