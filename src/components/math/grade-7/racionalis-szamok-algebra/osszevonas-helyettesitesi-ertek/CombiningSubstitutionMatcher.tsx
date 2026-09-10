import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface CombiningSubstitutionMatcherProps {
  onNextLevel?: () => void;
}

export const CombiningSubstitutionMatcher: React.FC<CombiningSubstitutionMatcherProps> = ({ onNextLevel }) => {
  const level1Pairs: MatchPair[] = [
    { id: 'm1-1', left: '3x + 5x', right: '8x' },
    { id: 'm1-2', left: '7a - 2a', right: '5a' },
    { id: 'm1-3', left: '4y - 9y', right: '-5y' },
    { id: 'm1-4', left: '-2b - 6b', right: '-8b' },
    { id: 'm1-5', left: 'x + x + x', right: '3x' },
    { id: 'm1-6', left: '5x - x', right: '4x' },
    { id: 'm1-7', left: '2a + 3 + 5a', right: '7a + 3' },
    { id: 'm1-8', left: '6 - 4x + 2', right: '8 - 4x' },
  ];

  const level2Pairs: MatchPair[] = [
    { id: 'm2-1', left: '3a + 2b + 5a - 7b', right: '8a - 5b' },
    { id: 'm2-2', left: '4x - (2x - 3)', right: '2x + 3' },
    { id: 'm2-3', left: '2(3x + 4) - 5x', right: 'x + 8' },
    { id: 'm2-4', left: '3x² + 2x - x² + 4x', right: '2x² + 6x' },
    { id: 'm2-5', left: '5(a - 2) + 10', right: '5a' },
    { id: 'm2-6', left: '10 - (3x + 4)', right: '6 - 3x' },
    { id: 'm2-7', left: '1/2 x + 3/2 x', right: '2x' },
    { id: 'm2-8', left: '-4(x - 2) - 8', right: '-4x' },
  ];

  const level3Pairs: MatchPair[] = [
    { id: 'm3-1', left: '2x + 5, ha x = 3', right: '11' },
    { id: 'm3-2', left: '3x - 4, ha x = -2', right: '-10' },
    { id: 'm3-3', left: 'x² + 1, ha x = -3', right: '10' },
    { id: 'm3-4', left: '4 - 2x, ha x = -5', right: '14' },
    { id: 'm3-5', left: 'x² - 2x, ha x = 4', right: '8' },
    { id: 'm3-6', left: '2(x + 3), ha x = -5', right: '-4' },
    { id: 'm3-7', left: 'x/2 + 5, ha x = -6', right: '2' },
    { id: 'm3-8', left: '3x² - 5, ha x = 2', right: '7' },
  ];

  return (
    <MatcherTemplate
      title="Összevonás & Helyettesítési Érték Párosító"
      subtitle="Párosítsd össze a kifejezéseket az összevont alakjukkal vagy a kiszámított helyettesítési értékükkel!"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
    />
  );
};
