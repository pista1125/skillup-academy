import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { NyitottMondatokG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/nyitott-mondatok/NyitottMondatokG1Mese';
import {
  NyitottMondatokG1Jatek,
  NYITOTT_MONDATOK_G1_QUESTIONS,
  NYITOTT_MONDATOK_G1_PAIRS,
  NYITOTT_MONDATOK_G1_SORT,
} from '@/components/math/grade-1/szamkorbovites-10-ig/nyitott-mondatok/NyitottMondatokG1Jatek';
import { OpenSentencePlayground } from '@/components/math/grade-1/szamkorbovites-10-ig/nyitott-mondatok/NyitottMondatokG1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/11 Nyitott mondatok', () => {
  it('renders the story and the game', () => {
    expect(render(<NyitottMondatokG1Mese />).container).toBeTruthy();
    expect(render(<OpenSentencePlayground />).container).toBeTruthy();
    expect(render(<NyitottMondatokG1Jatek />).container).toBeTruthy();
    expect(render(<NyitottMondatokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<NyitottMondatokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(NYITOTT_MONDATOK_G1_QUESTIONS, NYITOTT_MONDATOK_G1_PAIRS, NYITOTT_MONDATOK_G1_SORT, { perLevel: 8 });
  });
});
