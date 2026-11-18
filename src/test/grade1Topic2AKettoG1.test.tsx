import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { AKettoG1Mese } from '@/components/math/grade-1/szamolas-5-ig/a-ketto/AKettoG1Mese';
import { AKettoG1Jatek, A_KETTO_G1_QUESTIONS, A_KETTO_G1_PAIRS, A_KETTO_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/a-ketto/AKettoG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/2 A kettő', () => {
  it('renders the story and the game', () => {
    expect(render(<AKettoG1Mese />).container).toBeTruthy();
    expect(render(<AKettoG1Jatek />).container).toBeTruthy();
    expect(render(<AKettoG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<AKettoG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(A_KETTO_G1_QUESTIONS, A_KETTO_G1_PAIRS, A_KETTO_G1_SORT, { perLevel: 8 });
  });
});
