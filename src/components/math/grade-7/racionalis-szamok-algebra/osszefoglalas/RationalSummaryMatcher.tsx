import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface RationalSummaryMatcherProps {
  onNextLevel?: () => void;
}

export const RationalSummaryMatcher: React.FC<RationalSummaryMatcherProps> = ({ onNextLevel }) => {
  // Level 1: Racionális számok & Számelmélet
  const level1Pairs: MatchPair[] = [
    { id: 'm1-1', left: '-3/4 ellentettje', right: '+3/4' },
    { id: 'm1-2', left: '-2/5 reciproka', right: '-5/2' },
    { id: 'm1-3', left: '|-7.5| (abszolút érték)', right: '7.5' },
    { id: 'm1-4', left: '1/3 + 1/6', right: '1/2' },
    { id: 'm1-5', left: '3/4 - 1/2', right: '1/4' },
    { id: 'm1-6', left: '2/3 · 3/4', right: '1/2' },
    { id: 'm1-7', left: '(3/5) : (2/5)', right: '3/2' },
    { id: 'm1-8', left: '120 Ft-nak a 3/4 része', right: '90 Ft' },
  ];

  // Level 2: Műveleti sorrend & Algebranyelv
  const level2Pairs: MatchPair[] = [
    { id: 'm2-1', left: '10 - 2 · 3', right: '4' },
    { id: 'm2-2', left: '(10 - 2) · 3', right: '24' },
    { id: 'm2-3', left: '„Egy szám 4-szeresénél 5-tel több”', right: '4x + 5' },
    { id: 'm2-4', left: '„Egy szám 5-tel növelt értékének 4-szerese”', right: '4(x + 5)' },
    { id: 'm2-5', left: '-(3x - 7)', right: '-3x + 7' },
    { id: 'm2-6', left: '3 · (2x - 4)', right: '6x - 12' },
    { id: 'm2-7', left: '-2 · (4a + 3b)', right: '-8a - 6b' },
    { id: 'm2-8', left: 'x · (x + 5)', right: 'x² + 5x' },
  ];

  // Level 3: Összevonás, Kiemelés & Helyettesítés
  const level3Pairs: MatchPair[] = [
    { id: 'm3-1', left: '5a + 3b - 2a + 4b', right: '3a + 7b' },
    { id: 'm3-2', left: '3x² + 2x - x² + 5x', right: '2x² + 7x' },
    { id: 'm3-3', left: '6x + 9 kiemeléssel', right: '3(2x + 3)' },
    { id: 'm3-4', left: '4x² - 8x kiemeléssel', right: '4x(x - 2)' },
    { id: 'm3-5', left: '5x + 5 kiemeléssel', right: '5(x + 1)' },
    { id: 'm3-6', left: '3x + 4, ha x = -2', right: '-2' },
    { id: 'm3-7', left: 'x² - 5, ha x = -3', right: '4' },
    { id: 'm3-8', left: 'a, b oldalú téglalap kerülete', right: '2(a + b)' },
  ];

  return (
    <MatcherTemplate
      title="II. Fejezeti Nagy Párosító Bajnokság"
      subtitle="Párosítsd össze a racionális műveleteket, algebrai kifejezéseket, kiemeléseket és behelyettesítéseket!"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
    />
  );
};
