import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  LinearSystemComparisonSvg,
  SystemIntersectionSvg,
  SubstitutionWorkflowSvg,
  EliminationWorkflowSvg
} from './LinearSystemsFigures';

interface LinearSystemsMatcherProps {
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
    title: '1. Szint: Alapvető Rendszerek és Megoldáspárjuk',
    subtitle: 'Párosítsd a kétismeretlenes egyenletrendszereket a hozzájuk tartozó (x; y) rendezett számpárral!',
    pairs: [
      {
        id: 'lm1-1',
        prompt: 'x + y = 10 és x - y = 4',
        value: '(x; y) = (7; 3)',
        figure: <LinearSystemComparisonSvg size={65} />
      },
      {
        id: 'lm1-2',
        prompt: 'x = 2y és x + y = 9',
        value: '(x; y) = (6; 3)'
      },
      {
        id: 'lm1-3',
        prompt: '2x + y = 7 és y = 1',
        value: '(x; y) = (3; 1)'
      },
      {
        id: 'lm1-4',
        prompt: 'x + 2y = 8 és x = 0',
        value: '(x; y) = (0; 4)'
      },
      {
        id: 'lm1-5',
        prompt: '3x - y = 5 és y = 3x - 5',
        value: 'Azonosság (M = ∞)'
      },
      {
        id: 'lm1-6',
        prompt: 'x + y = 4 és x + y = 7',
        value: 'Ellentmondás (M = ∅)',
        figure: <SystemIntersectionSvg size={65} />
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Modellek és Rendszerek',
    subtitle: 'Párosítsd a szöveges és algebrai rendszereket a valós megoldásukkal!',
    pairs: [
      {
        id: 'lm2-1',
        prompt: 'Két szám összege 20, különbsége 6',
        value: '(13; 7)',
        figure: <SubstitutionWorkflowSvg size={65} />
      },
      {
        id: 'lm2-2',
        prompt: 'Apa és fia együtt 48 éves, apa 3-szor idősebb',
        value: 'Apa: 36 év, fia: 12 év'
      },
      {
        id: 'lm2-3',
        prompt: 'Csirkék (x) és nyulak (y): 10 fej, 28 láb',
        value: 'x = 6 csirke, y = 4 nyúl'
      },
      {
        id: 'lm2-4',
        prompt: '50 és 100 Ft-os érmék: 15 db, összeg 1100 Ft',
        value: '8 db 50-es, 7 db 100-as'
      },
      {
        id: 'lm2-5',
        prompt: '2x + 3y = 13 és x - y = 4',
        value: '(x; y) = (5; 1)'
      },
      {
        id: 'lm2-6',
        prompt: '3x + 2y = 12 és 4x - 2y = 2',
        value: '(x; y) = (2; 3)',
        figure: <EliminationWorkflowSvg size={65} />
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Grafikus Rendszerek',
    subtitle: 'Párosítsd a kifejezéseket a grafikus jellemzőikkel és gyökeikkel!',
    pairs: [
      {
        id: 'lm3-1',
        prompt: '2(x + y) = 14 és 3x - 2y = 6',
        value: '(x; y) = (4; 3)'
      },
      {
        id: 'lm3-2',
        prompt: 'x / 2 + y / 3 = 4 és x - y = 3',
        value: '(x; y) = (6; 3)'
      },
      {
        id: 'lm3-3',
        prompt: 'Párhuzamos egyenesek a koordináta-rendszerben',
        value: 'Nincs megoldás (M = ∅)',
        figure: <SystemIntersectionSvg size={65} />
      },
      {
        id: 'lm3-4',
        prompt: 'Egybeeső egyenesek grafikonja',
        value: 'Végtelen sok közös pont'
      },
      {
        id: 'lm3-5',
        prompt: 'x + 2y = 5 és 2x + 4y = 10',
        value: 'Azonosság (M = ∞)'
      },
      {
        id: 'lm3-6',
        prompt: '3x + 4y = 18 és 2x - y = 1',
        value: '(x; y) = (2; 3)'
      }
    ]
  }
};

export const LinearSystemsMatcher: React.FC<LinearSystemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenlet-rendszerek-quiz',
  topicTitle = 'Elsőfokú kétismeretlenes egyenletrendszer'
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
      color="red"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

