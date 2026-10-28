import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  EquationBalanceSvg,
  EquationVsIdentitySvg,
  RootVerificationSvg,
  GraphicalSolutionSvg
} from './EquationsFigures';

interface EquationsMatcherProps {
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
    title: '1. Szint: Egyenletek és Gyökeik',
    subtitle: 'Párosítsd a lineáris egyenleteket a hozzájuk tartozó valós gyökkel!',
    pairs: [
      {
        id: 'em1-1',
        prompt: '2x + 6 = 14',
        value: 'x = 4',
        figure: <EquationBalanceSvg size={65} />
      },
      {
        id: 'em1-2',
        prompt: '3x - 5 = 10',
        value: 'x = 5'
      },
      {
        id: 'em1-3',
        prompt: '4x + 1 = -11',
        value: 'x = -3'
      },
      {
        id: 'em1-4',
        prompt: '7x = 0',
        value: 'x = 0'
      },
      {
        id: 'em1-5',
        prompt: 'x / 3 + 2 = 6',
        value: 'x = 12'
      },
      {
        id: 'em1-6',
        prompt: '5 - 2x = 1',
        value: 'x = 2'
      }
    ]
  },
  2: {
    title: '2. Szint: Egyenlet, Azonosság vagy Ellentmondás',
    subtitle: 'Párosítsd az egyenlőségeket a megoldáshalmazuk pontos leírásával!',
    pairs: [
      {
        id: 'em2-1',
        prompt: '2(x + 4) = 2x + 8',
        value: 'Azonosság (M = ℝ)',
        figure: <EquationVsIdentitySvg size={65} />
      },
      {
        id: 'em2-2',
        prompt: 'x + 5 = x + 11',
        value: 'Ellentmondás (M = ∅)'
      },
      {
        id: 'em2-3',
        prompt: '4x - 8 = 12',
        value: 'Egyenlet (M = {5})'
      },
      {
        id: 'em2-4',
        prompt: '(x + 1)² = x² + 2x + 1',
        value: 'Azonosság (M = ℝ)'
      },
      {
        id: 'em2-5',
        prompt: '3x + 1 = 3x - 4',
        value: 'Ellentmondás (M = ∅)'
      },
      {
        id: 'em2-6',
        prompt: 'x² = 25',
        value: 'Két gyök (M = {-5, 5})'
      }
    ]
  },
  3: {
    title: '3. Szint: Ellenőrzés és Alaphalmaz',
    subtitle: 'Párosítsd a kifejezéseket, behelyettesítéseket és alaphalmazokat a helyes eredményekkel!',
    pairs: [
      {
        id: 'em3-1',
        prompt: 'B(3) értéke a 4x - 5 bal oldalon',
        value: '7 (mert 4·3 - 5 = 7)',
        figure: <RootVerificationSvg size={65} />
      },
      {
        id: 'em3-2',
        prompt: 'J(-2) értéke a 3x + 10 jobb oldalon',
        value: '4 (mert 3·(-2) + 10 = 4)'
      },
      {
        id: 'em3-3',
        prompt: 'x = 3 gyöke-e: 2x + 4 = 10',
        value: 'Igen, valódi gyök (10 = 10)'
      },
      {
        id: 'em3-4',
        prompt: 'x = 1 gyöke-e: 5x - 2 = 3x + 2',
        value: 'Nem gyök (3 ≠ 5)'
      },
      {
        id: 'em3-5',
        prompt: '2x = 3 megoldáshalmaza, ha A = ℤ',
        value: 'M = ∅ (mert 1.5 ∉ ℤ)'
      },
      {
        id: 'em3-6',
        prompt: 'Grafikonok metszéspontja: M(4; 9)',
        value: 'Megoldás: x = 4 (első koordináta)',
        figure: <GraphicalSolutionSvg size={65} />
      }
    ]
  }
};

export const EquationsMatcher: React.FC<EquationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenlet-alap-quiz',
  topicTitle = 'Egyenletek'
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
      color="emerald"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

