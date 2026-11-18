import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Megallo5G1Mese } from '@/components/math/grade-1/szamolas-5-ig/megallo/Megallo5G1Mese';
import { Megallo5G1Jatek, MEGALLO5_G1_QUESTIONS, MEGALLO5_G1_PAIRS, MEGALLO5_G1_SORT } from '@/components/math/grade-1/szamolas-5-ig/megallo/Megallo5G1Jatek';
import { UnderClothPlayground } from '@/components/math/grade-1/szamolas-5-ig/megallo/Megallo5G1Parts';
import { checkMeseLesson } from './grade1MeseChecks';

describe('Grade 1 – II/9 Megálló (0–5)', () => {
  it('renders the story, the playground and the game', () => {
    expect(render(<Megallo5G1Mese />).container).toBeTruthy();
    expect(render(<UnderClothPlayground />).container).toBeTruthy();
    expect(render(<Megallo5G1Jatek />).container).toBeTruthy();
    expect(render(<Megallo5G1Jatek initialGameMode="matcher" />).container).toBeTruthy();
    expect(render(<Megallo5G1Jatek initialGameMode="sorter" />).container).toBeTruthy();
  });
  it('has valid exam data (12 per level)', () => {
    checkMeseLesson(MEGALLO5_G1_QUESTIONS, MEGALLO5_G1_PAIRS, MEGALLO5_G1_SORT, { perLevel: 12 });
  });
  it('uses only numbers 0–5', () => {
    MEGALLO5_G1_QUESTIONS.forEach((q) =>
      q.options.forEach((o) => {
        if (typeof o === 'number') expect(o).toBeLessThanOrEqual(5);
      })
    );
  });
});
