import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { OsszehasonlitasokG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/osszehasonlitasok/OsszehasonlitasokG1Mese';
import { OsszehasonlitasokG1Jatek, OSSZEHASONLITASOK_G1_QUESTIONS, OSSZEHASONLITASOK_G1_PAIRS, OSSZEHASONLITASOK_G1_SORT } from '@/components/math/grade-1/elokeszito-idoszak/osszehasonlitasok/OsszehasonlitasokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/2 Összehasonlítások', () => {
  it('renders the story and the game', () => {
    expect(render(<OsszehasonlitasokG1Mese />).container).toBeTruthy();
    expect(render(<OsszehasonlitasokG1Jatek />).container).toBeTruthy();
    expect(render(<OsszehasonlitasokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<OsszehasonlitasokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(OSSZEHASONLITASOK_G1_QUESTIONS, OSSZEHASONLITASOK_G1_PAIRS, OSSZEHASONLITASOK_G1_SORT, { perLevel: 8 });
  });
});
