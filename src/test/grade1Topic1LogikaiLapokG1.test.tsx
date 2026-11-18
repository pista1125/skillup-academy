import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { LogikaiLapokG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/logikai-lapok/LogikaiLapokG1Mese';
import { LogikaiLapokG1Jatek, LOGIKAI_LAPOK_G1_QUESTIONS, LOGIKAI_LAPOK_G1_PAIRS, LOGIKAI_LAPOK_G1_SORT } from '@/components/math/grade-1/elokeszito-idoszak/logikai-lapok/LogikaiLapokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/3 Logikai lapok', () => {
  it('renders the story and the game', () => {
    expect(render(<LogikaiLapokG1Mese />).container).toBeTruthy();
    expect(render(<LogikaiLapokG1Jatek />).container).toBeTruthy();
    expect(render(<LogikaiLapokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<LogikaiLapokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(LOGIKAI_LAPOK_G1_QUESTIONS, LOGIKAI_LAPOK_G1_PAIRS, LOGIKAI_LAPOK_G1_SORT, { perLevel: 8 });
  });
});
