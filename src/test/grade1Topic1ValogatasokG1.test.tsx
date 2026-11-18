import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ValogatasokG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/valogatasok/ValogatasokG1Mese';
import { ValogatasokG1Jatek, VALOGATASOK_G1_QUESTIONS, VALOGATASOK_G1_PAIRS, VALOGATASOK_G1_SORT } from '@/components/math/grade-1/elokeszito-idoszak/valogatasok/ValogatasokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/1 Válogatások', () => {
  it('renders the story and the game', () => {
    expect(render(<ValogatasokG1Mese />).container).toBeTruthy();
    expect(render(<ValogatasokG1Jatek />).container).toBeTruthy();
    expect(render(<ValogatasokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ValogatasokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(VALOGATASOK_G1_QUESTIONS, VALOGATASOK_G1_PAIRS, VALOGATASOK_G1_SORT, { perLevel: 8 });
  });
});
