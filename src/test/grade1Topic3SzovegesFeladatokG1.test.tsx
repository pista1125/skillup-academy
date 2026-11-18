import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { SzovegesFeladatokG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/szoveges-feladatok/SzovegesFeladatokG1Mese';
import {
  SzovegesFeladatokG1Jatek,
  SZOVEGES_FELADATOK_G1_QUESTIONS,
  SZOVEGES_FELADATOK_G1_PAIRS,
  SZOVEGES_FELADATOK_G1_SORT,
} from '@/components/math/grade-1/szamkorbovites-10-ig/szoveges-feladatok/SzovegesFeladatokG1Jatek';
import { StoryMachinePlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/szoveges-feladatok/SzovegesFeladatokG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/19 Szöveges feladatok', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<SzovegesFeladatokG1Mese />).container).toBeTruthy();
    expect(render(<StoryMachinePlayground />).container).toBeTruthy();
    expect(render(<SzovegesFeladatokG1Jatek />).container).toBeTruthy();
    expect(render(<SzovegesFeladatokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<SzovegesFeladatokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(SZOVEGES_FELADATOK_G1_QUESTIONS, SZOVEGES_FELADATOK_G1_PAIRS, SZOVEGES_FELADATOK_G1_SORT, { perLevel: 8 });
  });
});
