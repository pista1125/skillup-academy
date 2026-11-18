import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { TobbKevesebbUgyanannyiG1Mese } from '@/components/math/grade-1/elokeszito-idoszak/tobb-kevesebb-ugyanannyi/TobbKevesebbUgyanannyiG1Mese';
import {
  TobbKevesebbUgyanannyiG1Jatek,
  TOBB_KEVESEBB_UGYANANNYI_G1_QUESTIONS,
  TOBB_KEVESEBB_UGYANANNYI_G1_PAIRS,
  TOBB_KEVESEBB_UGYANANNYI_G1_SORT,
} from '@/components/math/grade-1/elokeszito-idoszak/tobb-kevesebb-ugyanannyi/TobbKevesebbUgyanannyiG1Jatek';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – I/8 Több, kevesebb, ugyanannyi', () => {
  it('renders the story and the game', () => {
    expect(render(<TobbKevesebbUgyanannyiG1Mese />).container).toBeTruthy();
    expect(render(<TobbKevesebbUgyanannyiG1Jatek />).container).toBeTruthy();
    expect(render(<TobbKevesebbUgyanannyiG1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<TobbKevesebbUgyanannyiG1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid game data', () => {
    checkMeseLesson(TOBB_KEVESEBB_UGYANANNYI_G1_QUESTIONS, TOBB_KEVESEBB_UGYANANNYI_G1_PAIRS, TOBB_KEVESEBB_UGYANANNYI_G1_SORT, { perLevel: 8 });
  });
});
