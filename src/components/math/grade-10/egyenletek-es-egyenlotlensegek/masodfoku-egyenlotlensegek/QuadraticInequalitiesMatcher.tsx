import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ParabolaCasesDgt0Svg,
  ParabolaCasesDeq0Svg,
  ParabolaCasesDlt0Svg,
  SignTableChartSvg,
  InequalityIntervalNumberLineSvg
} from './QuadraticInequalitiesFigures';

interface QuadraticInequalitiesMatcherProps {
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
    title: 'Alapvető másodfokú egyenlőtlenségek',
    subtitle: 'Párosítsd a hiányos másodfokú egyenlőtlenségeket a valós megoldáshalmazukkal!',
    pairs: [
      {
        id: 'qim1-1',
        prompt: 'x² > 9',
        promptFigure: <InequalityIntervalNumberLineSvg size={42} />,
        value: 'x ∈ ]-∞; -3[ ∪ ]3; ∞[ (a gyökökön KÍVÜL)'
      },
      {
        id: 'qim1-2',
        prompt: 'x² ≤ 16',
        value: 'x ∈ [-4; 4] (a két gyök KÖZÖTT, zárt intervallum)'
      },
      {
        id: 'qim1-3',
        prompt: 'x² < 0',
        value: 'M = ∅ (valós szám négyzete sosem negatív)'
      },
      {
        id: 'qim1-4',
        prompt: 'x² ≥ 0',
        value: 'M = ℝ (minden valós szám négyzete nemnegatív)'
      },
      {
        id: 'qim1-5',
        prompt: '(x - 3)² ≤ 0',
        promptFigure: <ParabolaCasesDeq0Svg size={42} />,
        value: 'x = 3 (egyetlen pont, mert a négyzet csak 0 lehet)'
      },
      {
        id: 'qim1-6',
        prompt: 'x² - 25 < 0',
        value: 'x ∈ ]-5; 5[ (a gyökök -5 és 5 között)'
      },
      {
        id: 'qim1-7',
        prompt: 'x(x - 4) > 0',
        promptFigure: <ParabolaCasesDgt0Svg size={42} />,
        value: 'x ∈ ]-∞; 0[ ∪ ]4; ∞[ (zérushelyek: 0 és 4)'
      },
      {
        id: 'qim1-8',
        prompt: 'x² + 1 > 0',
        promptFigure: <ParabolaCasesDlt0Svg size={42} />,
        value: 'M = ℝ (x² ≥ 0 miatt x² + 1 legalább 1, mindig > 0)'
      }
    ]
  },
  2: {
    title: 'Normál alakú egyenlőtlenségek (D > 0)',
    subtitle: 'Határozd meg a két valós zérushellyel rendelkező parabolák előjelét!',
    pairs: [
      {
        id: 'qim2-1',
        prompt: 'x² - 4x + 3 < 0',
        promptFigure: <ParabolaCasesDgt0Svg size={42} />,
        value: 'x ∈ ]1; 3[ (gyökök: 1 és 3, köztük a parabola a tengely alatt fut)'
      },
      {
        id: 'qim2-2',
        prompt: 'x² - 5x + 6 ≥ 0',
        value: 'x ∈ ]-∞; 2] ∪ [3; ∞[ (gyökök: 2 és 3, kívül és a határokon)'
      },
      {
        id: 'qim2-3',
        prompt: 'x² - 2x - 8 ≤ 0',
        value: 'x ∈ [-2; 4] (gyökök: -2 és 4, zárt intervallum köztük)'
      },
      {
        id: 'qim2-4',
        prompt: 'x² + 3x - 10 > 0',
        value: 'x ∈ ]-∞; -5[ ∪ ]2; ∞[ (gyökök: -5 és 2, kívül pozitív)'
      },
      {
        id: 'qim2-5',
        prompt: 'x² - 6x ≤ 0',
        promptFigure: <SignTableChartSvg size={42} />,
        value: 'x ∈ [0; 6] (kiemelve: x(x - 6) ≤ 0, gyökök: 0 és 6)'
      },
      {
        id: 'qim2-6',
        prompt: 'x² - 9 ≥ 0',
        value: 'x ∈ ]-∞; -3] ∪ [3; ∞[ (két gyökön kívül és azokon)'
      },
      {
        id: 'qim2-7',
        prompt: '2x² - 8 > 0',
        value: 'x ∈ ]-∞; -2[ ∪ ]2; ∞[ (osztás 2-vel: x² - 4 > 0)'
      },
      {
        id: 'qim2-8',
        prompt: 'x² + x - 6 < 0',
        value: 'x ∈ ]-3; 2[ (szorzattá bontva: (x + 3)(x - 2) < 0)'
      }
    ]
  },
  3: {
    title: 'Negatív főegyüttható, D = 0 és D < 0 határesetek',
    subtitle: 'Párosítsd a lefelé nyíló parabolákat és a speciális diszkriminánsú eseteket!',
    pairs: [
      {
        id: 'qim3-1',
        prompt: '-x² + 4x - 3 > 0',
        promptFigure: <SignTableChartSvg size={42} />,
        value: 'x ∈ ]1; 3[ (szorzás -1-gyel: x² - 4x + 3 < 0, a jel megfordul!)'
      },
      {
        id: 'qim3-2',
        prompt: 'x² - 6x + 9 > 0',
        promptFigure: <ParabolaCasesDeq0Svg size={42} />,
        value: 'x ∈ ℝ \\ {3} ((x - 3)² > 0, csak a 3-ban nulla)'
      },
      {
        id: 'qim3-3',
        prompt: 'x² - 4x + 4 ≤ 0',
        value: 'M = {2} ((x - 2)² ≤ 0, csak az érintési pontban teljesül)'
      },
      {
        id: 'qim3-4',
        prompt: 'x² + 2x + 5 > 0',
        promptFigure: <ParabolaCasesDlt0Svg size={42} />,
        value: 'M = ℝ (D = -16 < 0, a parabola a tengely felett lebeg)'
      },
      {
        id: 'qim3-5',
        prompt: 'x² + 4x + 5 < 0',
        value: 'M = ∅ (D = -4 < 0, a parabola sehol sem negatív)'
      },
      {
        id: 'qim3-6',
        prompt: '-x² + 2x - 1 ≥ 0',
        value: 'M = {1} (-(x - 1)² ≥ 0 ⟺ (x - 1)² ≤ 0)'
      },
      {
        id: 'qim3-7',
        prompt: '(x - 1)(x + 4) ≤ 0',
        value: 'x ∈ [-4; 1] (két gyök: -4 és 1, köztük negatív vagy nulla)'
      },
      {
        id: 'qim3-8',
        prompt: '(x - 3) / (x + 2) > 0',
        value: 'x ∈ ]-∞; -2[ ∪ ]3; ∞[ (a hányados előjele a szorzatéval azonos, x ≠ -2)'
      }
    ]
  }
};

export const QuadraticInequalitiesMatcher: React.FC<QuadraticInequalitiesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-masodfoku-egyenlotlensegek-matcher',
  topicTitle = 'Másodfokú egyenlőtlenségek – Párosító'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      level={activeLevel}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

