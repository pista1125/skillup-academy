import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  AlgebraMasterySvg,
  EquivalenceMapSvg,
  ProblemSolvingMapSvg,
  LinearSystemMapSvg
} from './PracticeTestFigures';

interface PracticeTestMatcherProps {
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
    title: '1. Szint: Alapvető Kifejezések és Egyenletek (Könnyű)',
    subtitle: 'Párosítsd a kifejezéseket, azonosságokat és egyszerű egyenleteket az értékükkel!',
    pairs: [
      {
        id: 'ptm1-1',
        prompt: '(a + b)²',
        value: 'a² + 2ab + b²',
        figure: <AlgebraMasterySvg size={65} />
      },
      {
        id: 'ptm1-2',
        prompt: 'a² - b²',
        value: '(a - b)(a + b)'
      },
      {
        id: 'ptm1-3',
        prompt: '2x + 6 = 14',
        value: 'x = 4'
      },
      {
        id: 'ptm1-4',
        prompt: 'x / 3 = 7',
        value: 'x = 21'
      },
      {
        id: 'ptm1-5',
        prompt: '5 / (x - 4) kikötése',
        value: 'x ≠ 4',
        figure: <EquivalenceMapSvg size={65} />
      },
      {
        id: 'ptm1-6',
        prompt: 'x + y = 6 és x - y = 2',
        value: '(x; y) = (4; 2)'
      }
    ]
  },
  2: {
    title: '2. Szint: Szorzattá Alakítás és Modellezés (Közepes)',
    subtitle: 'Párosítsd a szorzattá alakításokat, egyenleteket és szöveges típusokat a kulcsukkal!',
    pairs: [
      {
        id: 'ptm2-1',
        prompt: 'x² - 16 = 0 gyökei',
        value: 'x = 4 vagy x = -4'
      },
      {
        id: 'ptm2-2',
        prompt: '3(x - 2) + 4 = 19',
        value: 'x = 7'
      },
      {
        id: 'ptm2-3',
        prompt: '3x / (2x - 10) kikötése',
        value: 'x ≠ 5',
        figure: <EquivalenceMapSvg size={65} />
      },
      {
        id: 'ptm2-4',
        prompt: 'Életkorok különbsége',
        value: 'Idővel állandó marad',
        figure: <ProblemSolvingMapSvg size={65} />
      },
      {
        id: 'ptm2-5',
        prompt: 'Oldott anyag képlete',
        value: 'm · (p / 100)'
      },
      {
        id: 'ptm2-6',
        prompt: '2x + y = 7 és y = 3',
        value: '(x; y) = (2; 3)'
      }
    ]
  },
  3: {
    title: '3. Szint: Ekvivalencia, Rendszerek és Gyökök (Nehéz)',
    subtitle: 'Párosítsd a mélyebb algebrai összefüggéseket és speciális egyenleteket!',
    pairs: [
      {
        id: 'ptm3-1',
        prompt: '(x - 3)/(x - 3) = 1',
        value: 'M = ℝ \\ {3}',
        figure: <EquivalenceMapSvg size={65} />
      },
      {
        id: 'ptm3-2',
        prompt: '|x - 2| = 5',
        value: 'x = 7 vagy x = -3'
      },
      {
        id: 'ptm3-3',
        prompt: 'x² + 6x + 9 = 0',
        value: 'x = -3 (teljes négyzet)'
      },
      {
        id: 'ptm3-4',
        prompt: 'Szembejövő járművek sebessége',
        value: 'v_összes = v₁ + v₂',
        figure: <ProblemSolvingMapSvg size={65} />
      },
      {
        id: 'ptm3-5',
        prompt: 'x + y = 5 és 2x + 2y = 10',
        value: 'Végtelen sok megoldás (0 = 0)',
        figure: <LinearSystemMapSvg size={65} />
      },
      {
        id: 'ptm3-6',
        prompt: 'x + y = 5 és 2x + 2y = 12',
        value: 'Nincs megoldás (0 = 2)'
      }
    ]
  }
};

export const PracticeTestMatcher: React.FC<PracticeTestMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenlet-gyakorlas-quiz',
  topicTitle = 'Gyakorlás, tudáspróba'
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
      color="purple"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

