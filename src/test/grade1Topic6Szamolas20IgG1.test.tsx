import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Szamolas20IgG1Mese } from '@/components/math/grade-1/szamkorbovites-20-ig/szamolas-20-ig/Szamolas20IgG1Mese';
import {
  Szamolas20IgG1Jatek,
  SZAMOLAS20IG_G1_QUESTIONS,
  SZAMOLAS20IG_G1_PAIRS,
  SZAMOLAS20IG_G1_SORT,
} from '@/components/math/grade-1/szamkorbovites-20-ig/szamolas-20-ig/Szamolas20IgG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – VI/11 Számolás 20-ig (témakörzáró)', () => {
  it('renders the story and the game', () => {
    expect(render(<Szamolas20IgG1Mese />).container).toBeTruthy();
    expect(render(<Szamolas20IgG1Jatek />).container).toBeTruthy();
    expect(render(<Szamolas20IgG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Szamolas20IgG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid exam data', () => {
    checkMeseLesson(SZAMOLAS20IG_G1_QUESTIONS, SZAMOLAS20IG_G1_PAIRS, SZAMOLAS20IG_G1_SORT, { perLevel: 12 });
  });
});
