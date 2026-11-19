import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { VonalakG1Mese } from '@/components/math/grade-1/geometria/vonalak/VonalakG1Mese';
import { VonalakG1Jatek, VONALAK_G1_QUESTIONS, VONALAK_G1_PAIRS, VONALAK_G1_SORT } from '@/components/math/grade-1/geometria/vonalak/VonalakG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – IV/1 Vonalak', () => {
  it('renders the story and the game', () => {
    expect(render(<VonalakG1Mese />).container).toBeTruthy();
    expect(render(<VonalakG1Jatek />).container).toBeTruthy();
    expect(render(<VonalakG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<VonalakG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(VONALAK_G1_QUESTIONS, VONALAK_G1_PAIRS, VONALAK_G1_SORT, { perLevel: 8 });
  });
});
