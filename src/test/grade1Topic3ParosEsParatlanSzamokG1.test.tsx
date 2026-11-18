import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { ParosEsParatlanSzamokG1Mese } from '@/components/math/grade-1/szamkorbovites-10-ig/paros-es-paratlan-szamok/ParosEsParatlanSzamokG1Mese';
import {
  ParosEsParatlanSzamokG1Jatek,
  PAROS_ES_PARATLAN_SZAMOK_G1_QUESTIONS,
  PAROS_ES_PARATLAN_SZAMOK_G1_PAIRS,
  PAROS_ES_PARATLAN_SZAMOK_G1_SORT,
} from '@/components/math/grade-1/szamkorbovites-10-ig/paros-es-paratlan-szamok/ParosEsParatlanSzamokG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – III/3 Páros és páratlan számok', () => {
  it('renders the story and the game', () => {
    expect(render(<ParosEsParatlanSzamokG1Mese />).container).toBeTruthy();
    expect(render(<ParosEsParatlanSzamokG1Jatek />).container).toBeTruthy();
    expect(render(<ParosEsParatlanSzamokG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<ParosEsParatlanSzamokG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(PAROS_ES_PARATLAN_SZAMOK_G1_QUESTIONS, PAROS_ES_PARATLAN_SZAMOK_G1_PAIRS, PAROS_ES_PARATLAN_SZAMOK_G1_SORT, { perLevel: 8 });
  });
});
