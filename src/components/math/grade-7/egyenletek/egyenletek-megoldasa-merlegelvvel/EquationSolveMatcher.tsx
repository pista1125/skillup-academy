import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationSolveMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Első Lépések és Alap Rendezések',
    subtitle: 'Párosítsd az egyenletet azzal a helyes első lépéssel, amellyel a mérlegelv szerint egyszerűsítjük!',
    pairs: [
      {
        id: 'p1',
        prompt: '5x - 7 = 18 első lépése',
        value: '/ + 7  ⟹  5x = 25'
      },
      {
        id: 'p2',
        prompt: '3x + 14 = 2 első lépése',
        value: '/ - 14  ⟹  3x = -12'
      },
      {
        id: 'p3',
        prompt: '4x = 2x + 10 első lépése',
        value: '/ - 2x  ⟹  2x = 10'
      },
      {
        id: 'p4',
        prompt: '7x - 8 = 3x + 12 első lépése',
        value: '/ - 3x  ⟹  4x - 8 = 12'
      },
      {
        id: 'p5',
        prompt: '15 - 2x = 5 első lépése',
        value: '/ - 15  ⟹  -2x = -10'
      },
      {
        id: 'p6',
        prompt: 'x / 4 = 6 első lépése',
        value: '/ · 4  ⟹  x = 24'
      },
      {
        id: 'p7',
        prompt: '2(x + 3) = 14 zárójelfelbontása',
        value: '2x + 6 = 14'
      },
      {
        id: 'p8',
        prompt: '-3(x - 2) = 15 zárójelfelbontása',
        value: '-3x + 6 = 15'
      }
    ]
  },
  2: {
    title: '2. Szint: Zárójelek, Negatív Szorzók és Törtek',
    subtitle: 'Párosítsd a kifejezést az ekvivalens rendezett alakkal!',
    pairs: [
      {
        id: 'p9',
        prompt: '4(2x - 3) = 20 kibontva',
        value: '8x - 12 = 20  ⟹  8x = 32'
      },
      {
        id: 'p10',
        prompt: '-(3x - 5) = 14 kibontva',
        value: '-3x + 5 = 14  ⟹  -3x = 9'
      },
      {
        id: 'p11',
        prompt: '5x - (2x + 6) = 12 összevonva',
        value: '3x - 6 = 12  ⟹  3x = 18'
      },
      {
        id: 'p12',
        prompt: '(2x - 1) / 3 = 5 beszorozva 3-mal',
        value: '2x - 1 = 15  ⟹  2x = 16'
      },
      {
        id: 'p13',
        prompt: '(x + 4) / 2 = (x - 1) / 3  / · 6',
        value: '3(x + 4) = 2(x - 1)'
      },
      {
        id: 'p14',
        prompt: '3(x - 4) = 5(x + 2) bontva',
        value: '3x - 12 = 5x + 10'
      },
      {
        id: 'p15',
        prompt: 'x/3 + x/4 = 7  / · 12',
        value: '4x + 3x = 84  ⟹  7x = 84'
      },
      {
        id: 'p16',
        prompt: '2(3x + 1) - 4 = 16 összevonva',
        value: '6x + 2 - 4 = 16  ⟹  6x - 2 = 16'
      }
    ]
  },
  3: {
    title: '3. Szint: Egyenletek Megoldásai és Speciális Esetek',
    subtitle: 'Párosítsd az egyenletet a helyes megoldáshalmazzal (M) vagy speciális tulajdonságával!',
    pairs: [
      {
        id: 'p17',
        prompt: '6x - 5 = 2x + 15 megoldása',
        value: 'x = 5  ⟹  M = {5}'
      },
      {
        id: 'p18',
        prompt: '2(4x - 1) = 3(2x + 4) gyöke',
        value: '8x - 2 = 6x + 12  ⟹  x = 7'
      },
      {
        id: 'p19',
        prompt: '(3x - 1) / 4 = (x + 3) / 2 gyöke',
        value: '3x - 1 = 2(x + 3)  ⟹  x = 7'
      },
      {
        id: 'p20',
        prompt: '3(2x + 4) = 6x + 12',
        value: 'Azonosság: 0x = 0  ⟹  M = Q'
      },
      {
        id: 'p21',
        prompt: '5x + 3 = 5x - 7',
        value: 'Ellentmondás: 0x = -10  ⟹  M = ∅'
      },
      {
        id: 'p22',
        prompt: '4(x - 2) + 8 = 4x',
        value: 'Azonosság: 4x = 4x  ⟹  M = Q'
      },
      {
        id: 'p23',
        prompt: '2x + 5 = 2x + 8',
        value: 'Ellentmondás: 5 = 8  ⟹  M = ∅'
      },
      {
        id: 'p24',
        prompt: '3x + 10 = 1 ha az alaphalmaz U = N',
        value: 'x = -3 ∉ N  ⟹  M = ∅'
      }
    ]
  }
};

export const EquationSolveMatcher: React.FC<EquationSolveMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-eq-solve-matcher',
  topicTitle = '3. Egyenletek megoldása mérlegelvvel'
}) => {
  const activeLvl = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelConfigs={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="violet"
    />
  );
};

export default EquationSolveMatcher;
