import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  LineAndParabolaIntersectionSvg,
  SymmetricSystemVieteBridgeSvg,
  CircleAndLineSystemSvg,
  EliminationQuadraticsSvg,
  OrderedPairsVerificationSvg
} from './QuadraticSystemsFigures';

interface QuadraticSystemsMatcherProps {
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
    title: 'Alapvető behelyettesítés és szimmetrikus számpárok',
    subtitle: 'Párosítsd a másodfokú rendszereket a pontos valós megoldáspárjaikkal!',
    pairs: [
      {
        id: 'qsm1-1',
        prompt: 'x + y = 5  és  xy = 6',
        promptFigure: <SymmetricSystemVieteBridgeSvg size={42} />,
        value: 'M = {(2; 3); (3; 2)}'
      },
      {
        id: 'qsm1-2',
        prompt: 'x + y = 7  és  xy = 12',
        value: 'M = {(3; 4); (4; 3)}'
      },
      {
        id: 'qsm1-3',
        prompt: 'y = x + 1  és  x² + y² = 5',
        value: 'M = {(1; 2); (-2; -1)}'
      },
      {
        id: 'qsm1-4',
        prompt: 'y = 2x  és  x² + y² = 20',
        value: 'M = {(2; 4); (-2; -4)}'
      },
      {
        id: 'qsm1-5',
        prompt: 'x - y = 3  és  xy = 10',
        value: 'M = {(5; 2); (-2; -5)}'
      },
      {
        id: 'qsm1-6',
        prompt: 'y = x²  és  y = 4',
        value: 'M = {(2; 4); (-2; 4)}'
      },
      {
        id: 'qsm1-7',
        prompt: 'x + y = 10  és  xy = 25',
        value: 'M = {(5; 5)} (egyetlen érintési pár)'
      },
      {
        id: 'qsm1-8',
        prompt: 'x + y = 2  és  xy = 5',
        value: 'M = ∅ (nincs valós megoldás, D < 0)'
      }
    ]
  },
  2: {
    title: 'Egyenes és parabola / kör metszéspontjai',
    subtitle: 'Párosítsd a geometriai egyenletrendszereket a metszéspontjaikkal!',
    pairs: [
      {
        id: 'qsm2-1',
        prompt: 'y = x²  és  y = x + 2',
        promptFigure: <LineAndParabolaIntersectionSvg size={42} />,
        value: 'M = {(-1; 1); (2; 4)}'
      },
      {
        id: 'qsm2-2',
        prompt: 'y = x² - 4  és  y = 2x - 1',
        value: 'M = {(3; 5); (-1; -3)}'
      },
      {
        id: 'qsm2-3',
        prompt: 'x² + y² = 25  és  y = 3',
        promptFigure: <CircleAndLineSystemSvg size={42} />,
        value: 'M = {(-4; 3); (4; 3)}'
      },
      {
        id: 'qsm2-4',
        prompt: 'x² + y² = 25  és  x = 5',
        value: 'M = {(5; 0)} (függőleges érintő)'
      },
      {
        id: 'qsm2-5',
        prompt: 'y = -x² + 4  és  y = 0',
        value: 'M = {(-2; 0); (2; 0)} (zérushelyek)'
      },
      {
        id: 'qsm2-6',
        prompt: 'x² + y² = 10  és  y = 3x',
        value: 'M = {(1; 3); (-1; -3)}'
      },
      {
        id: 'qsm2-7',
        prompt: 'y = 2x²  és  y = 4x - 2',
        value: 'M = {(1; 2)} (D = 0, érintő)'
      },
      {
        id: 'qsm2-8',
        prompt: 'x² + y² = 4  és  x = 3',
        value: 'M = ∅ (elkerülő, x > r sugarú)'
      }
    ]
  },
  3: {
    title: 'Bajnoki egyenletrendszerek és tagelimináció',
    subtitle: 'Párosítsd az összetettebb másodfokú rendszereket és paramétereket a megoldásaikkal!',
    pairs: [
      {
        id: 'qsm3-1',
        prompt: 'x² + y² = 13  és  xy = 6',
        promptFigure: <OrderedPairsVerificationSvg size={42} />,
        value: 'M = {(2; 3); (3; 2); (-2; -3); (-3; -2)}'
      },
      {
        id: 'qsm3-2',
        prompt: 'x² + y² = 25  és  x² - y² = 7',
        promptFigure: <EliminationQuadraticsSvg size={42} />,
        value: 'M = {(4; 3); (4; -3); (-4; 3); (-4; -3)}'
      },
      {
        id: 'qsm3-3',
        prompt: 'y = x²  és  y = 2 - x²',
        value: 'M = {(1; 1); (-1; 1)}'
      },
      {
        id: 'qsm3-4',
        prompt: 'x² + y = 5  és  x² - y = 3',
        value: 'M = {(2; 1); (-2; 1)}'
      },
      {
        id: 'qsm3-5',
        prompt: 'x + y = 4  és  x² + y² = 10',
        value: 'M = {(1; 3); (3; 1)}'
      },
      {
        id: 'qsm3-6',
        prompt: 'xy = 8  és  x - y = 2',
        value: 'M = {(4; 2); (-2; -4)}'
      },
      {
        id: 'qsm3-7',
        prompt: 'x + y = k  és  xy = 4  pontosan 1 megoldáspárral rendelkezik',
        value: 'k = 4 vagy k = -4 (D = k² - 16 = 0)'
      },
      {
        id: 'qsm3-8',
        prompt: 'y = x² + 1  és  y = mx  érinti egymást',
        value: 'm = 2 vagy m = -2 (D = m² - 4 = 0)'
      }
    ]
  }
};

export const QuadraticSystemsMatcher: React.FC<QuadraticSystemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-masodfoku-egyenletrendszerek-matcher',
  topicTitle = '9. Ráadás – Másodfokú egyenletrendszerek'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      level={activeLevel}
      levelConfigs={matcherLevels}
      themeColor="orange"
      topicId={topicId}
      topicTitle={topicTitle}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

