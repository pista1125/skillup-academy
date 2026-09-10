import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface ExpansionFactoringMatcherProps {
  onNextLevel?: () => void;
}

export const ExpansionFactoringMatcher: React.FC<ExpansionFactoringMatcherProps> = ({ onNextLevel }) => {
  const level1Pairs: MatchPair[] = [
    { id: 'm1-1', left: '3 · (x + 4)', right: '3x + 12' },
    { id: 'm1-2', left: '5 · (2a - 3)', right: '10a - 15' },
    { id: 'm1-3', left: '4 · (3y + 2)', right: '12y + 8' },
    { id: 'm1-4', left: '2 · (5 - x)', right: '10 - 2x' },
    { id: 'm1-5', left: '6 · (a + b)', right: '6a + 6b' },
    { id: 'm1-6', left: '7 · (2x - 1)', right: '14x - 7' },
    { id: 'm1-7', left: '1/2 · (4x + 6)', right: '2x + 3' },
    { id: 'm1-8', left: '8 · (1 - 2y)', right: '8 - 16y' },
  ];

  const level2Pairs: MatchPair[] = [
    { id: 'm2-1', left: '-2 · (3x - 5)', right: '-6x + 10' },
    { id: 'm2-2', left: '-4 · (2a + 3b)', right: '-8a - 12b' },
    { id: 'm2-3', left: '-5 · (1 - 2x)', right: '-5 + 10x' },
    { id: 'm2-4', left: 'x · (x + 4)', right: 'x² + 4x' },
    { id: 'm2-5', left: '2a · (3a - 5)', right: '6a² - 10a' },
    { id: 'm2-6', left: '-3x · (2x - 1)', right: '-6x² + 3x' },
    { id: 'm2-7', left: '-(4x - 7)', right: '-4x + 7' },
    { id: 'm2-8', left: '-1/3 · (9x - 6)', right: '-3x + 2' },
  ];

  const level3Pairs: MatchPair[] = [
    { id: 'm3-1', left: '6x + 15', right: '3(2x + 5)' },
    { id: 'm3-2', left: '8a - 12b', right: '4(2a - 3b)' },
    { id: 'm3-3', left: '5x + 5', right: '5(x + 1)' },
    { id: 'm3-4', left: '4x² + 6x', right: '2x(2x + 3)' },
    { id: 'm3-5', left: '-3a - 6b', right: '-3(a + 2b)' },
    { id: 'm3-6', left: '10xy - 15x', right: '5x(2y - 3)' },
    { id: 'm3-7', left: '7x - 7', right: '7(x - 1)' },
    { id: 'm3-8', left: '12a² - 18ab', right: '6a(2a - 3b)' },
  ];

  return (
    <MatcherTemplate
      title="Zárójelfelbontás & Kiemelés Párosító"
      subtitle="Párosítsd össze a szorzat alakú kifejezéseket a kifejtett összeg alakjukkal, vagy a kiemeléssel nyert szorzattal!"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
    />
  );
};
