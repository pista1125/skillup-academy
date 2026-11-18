import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { TajekozodasG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/tajekozodas/TajekozodasG1Mese';
import {
  TajekozodasG1Jatek,
  TAJEKOZODAS_G1_QUESTIONS,
  TAJEKOZODAS_G1_PAIRS,
  TAJEKOZODAS_G1_SORT,
} from '@/components/math/grade-1/elokeszito-idoszak/tajekozodas/TajekozodasG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/6 Tájékozódás', () => {
  it('renders the story and the game', () => {
    expect(render(<TajekozodasG1Mese />).container).toBeTruthy();
    expect(render(<TajekozodasG1Jatek />).container).toBeTruthy();
    expect(render(<TajekozodasG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<TajekozodasG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(TAJEKOZODAS_G1_QUESTIONS, TAJEKOZODAS_G1_PAIRS, TAJEKOZODAS_G1_SORT, { perLevel: 8 });
  });
});
