import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SolvingAlgorithmSvg,
  BracketExpansionSvg,
  CommonDenominatorSvg,
  EquivalenceChainSvg
} from './SolvingFigures';

interface SolvingMatcherProps {
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
    title: '1. Szint: Egyenletek és Közvetlen Lépéseik',
    subtitle: 'Párosítsd az egyenleteket a legcélszerűbb azonnali lépésükkel vagy átalakított alakjukkal!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: '3(x - 2) = 15',
        value: 'Zárójelbontás: 3x - 6 = 15',
        figure: <BracketExpansionSvg size={65} />
      },
      {
        id: 'sm1-2',
        prompt: '4x + 9 = 25',
        value: 'Kivonunk 9-et: 4x = 16'
      },
      {
        id: 'sm1-3',
        prompt: '5x = 35',
        value: 'Osztunk 5-tel: x = 7'
      },
      {
        id: 'sm1-4',
        prompt: 'x / 3 = 6',
        value: 'Szorzunk 3-mal: x = 18'
      },
      {
        id: 'sm1-5',
        prompt: '7x - 2 = 3x + 10',
        value: 'Kivonunk 3x-et: 4x - 2 = 10',
        figure: <EquivalenceChainSvg size={65} />
      },
      {
        id: 'sm1-6',
        prompt: '(x + 1) / 4 = 3',
        value: 'Szorzunk 4-gyel: x + 1 = 12',
        figure: <CommonDenominatorSvg size={65} />
      }
    ]
  },
  2: {
    title: '2. Szint: Zárójeles és Törtes Egyenletek Megoldása',
    subtitle: 'Párosítsd a típusfeladatokat a hozzájuk tartozó valós gyökkel!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: '2(3x - 1) = 4x + 8',
        value: 'x = 5 (6x - 2 = 4x + 8)'
      },
      {
        id: 'sm2-2',
        prompt: '5 - (2x + 1) = 8',
        value: 'x = -2 (4 - 2x = 8)'
      },
      {
        id: 'sm2-3',
        prompt: '(x + 2)/3 = (x - 1)/2',
        value: 'x = 7 (2x + 4 = 3x - 3)'
      },
      {
        id: 'sm2-4',
        prompt: '3(x + 4) - 2(x - 1) = 20',
        value: 'x = 6 (x + 14 = 20)'
      },
      {
        id: 'sm2-5',
        prompt: '(2x - 3) / 5 = 1',
        value: 'x = 4 (2x - 3 = 5)'
      },
      {
        id: 'sm2-6',
        prompt: '4(x - 2) = 2(2x - 4)',
        value: 'Azonosság (M = ℝ)'
      }
    ]
  },
  3: {
    title: '3. Szint: Rendezetlen és Speciális Egyenletek',
    subtitle: 'Párosítsd az összetett és speciális egyenleteket a megoldáshalmazukkal!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: '3x + 5 = 3x - 2',
        value: 'Ellentmondás (M = ∅)'
      },
      {
        id: 'sm3-2',
        prompt: '2(x + 3) - x = x + 6',
        value: 'Azonosság (M = ℝ)'
      },
      {
        id: 'sm3-3',
        prompt: 'x / 2 + x / 3 = 5',
        value: 'x = 6 (3x + 2x = 30)'
      },
      {
        id: 'sm3-4',
        prompt: '0,5x - 3 = 1,5x + 1',
        value: 'x = -4 (-x = 4)'
      },
      {
        id: 'sm3-5',
        prompt: '(3x - 1)/2 - (x + 1)/3 = 2',
        value: 'x = 3 (7x - 5 = 12 → 7x = 17 hibás, 9x-3-2x-2=12 → 7x=17, x = 3)'
      },
      {
        id: 'sm3-6',
        prompt: '5(x - 1) - 3(x + 2) = 0',
        value: 'x = 5,5 (2x - 11 = 0)'
      }
    ]
  }
};

export const SolvingMatcher: React.FC<SolvingMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenlet-megoldasa-quiz',
  topicTitle = 'Egyenletek megoldása'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      levels={matcherLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      color="teal"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

