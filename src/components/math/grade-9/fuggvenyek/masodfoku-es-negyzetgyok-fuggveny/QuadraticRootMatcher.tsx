import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ParabolaTransformSvg, SquareRootSvg, TransformComparisonSvg } from './QuadraticRootFigures';

export interface QuadraticRootMatcherProps {
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
    title: '1. Szint: Parabola Csúcspont és Nyílás',
    subtitle: 'Párosítsd a másodfokú hozzárendelési utasításokat a csúcspontjukkal és nyílásuk irányával!',
    pairs: [
      {
        id: 'qm1-1',
        prompt: 'f(x) = (x - 3)² + 2',
        value: 'Csúcspont: C(3; 2), felfelé nyílik (minimum)',
        figure: <ParabolaTransformSvg size={70} />
      },
      {
        id: 'qm1-2',
        prompt: 'g(x) = -(x + 4)² - 5',
        value: 'Csúcspont: C(-4; -5), lefelé nyílik (maximum)'
      },
      {
        id: 'qm1-3',
        prompt: 'h(x) = 2(x - 1)²',
        value: 'Csúcspont: C(1; 0), meredekebb/szűkebb, felfelé nyílik'
      },
      {
        id: 'qm1-4',
        prompt: 'p(x) = -0.5(x + 2)² + 6',
        value: 'Csúcspont: C(-2; 6), laposabb/szélesebb, lefelé nyílik'
      },
      {
        id: 'qm1-5',
        prompt: 'q(x) = x² - 7',
        value: 'Csúcspont: C(0; -7), felfelé nyílik'
      },
      {
        id: 'qm1-6',
        prompt: 'r(x) = -(x - 5)²',
        value: 'Csúcspont: C(5; 0), érinti az x-tengelyt, lefelé nyílik'
      }
    ]
  },
  2: {
    title: '2. Szint: Négyzetgyök-függvény Tartományai',
    subtitle: 'Párosítsd a négyzetgyökös kifejezéseket a kezdőpontjukkal és értékkészletükkel!',
    pairs: [
      {
        id: 'qm2-1',
        prompt: 'g(x) = √(x - 4) + 1',
        value: 'Kezdőpont: K(4; 1), D_g = [4; ∞[, R_g = [1; ∞[',
        figure: <SquareRootSvg size={70} />
      },
      {
        id: 'qm2-2',
        prompt: 'h(x) = √(x + 2) - 3',
        value: 'Kezdőpont: K(-2; -3), D_h = [-2; ∞[, R_h = [-3; ∞['
      },
      {
        id: 'qm2-3',
        prompt: 'p(x) = -√(x - 1) + 4',
        value: 'Kezdőpont: K(1; 4), lefelé hajlik: R_p = ]-∞; 4]'
      },
      {
        id: 'qm2-4',
        prompt: 'q(x) = 2√x',
        value: 'Kezdőpont: Origó (0; 0), meredekebb növekedés'
      },
      {
        id: 'qm2-5',
        prompt: 'r(x) = √(-x)',
        value: 'Kezdőpont: (0; 0), balra nyíló ág: D_r = ]-∞; 0]'
      },
      {
        id: 'qm2-6',
        prompt: 's(x) = -√x - 2',
        value: 'Kezdőpont: (0; -2), lefelé csökken: R_s = ]-∞; -2]'
      }
    ]
  },
  3: {
    title: '3. Szint: Teljes Négyzetek és Zérushelyek',
    subtitle: 'Párosítsd a kifejezéseket az átalakított alakjukkal és a zérushelyek számával!',
    pairs: [
      {
        id: 'qm3-1',
        prompt: 'f(x) = x² - 6x + 9',
        value: '(x - 3)², pontosan 1 zérushelye van (érinti az x-tengelyt)',
        figure: <TransformComparisonSvg size={70} />
      },
      {
        id: 'qm3-2',
        prompt: 'g(x) = x² - 4x + 1',
        value: '(x - 2)² - 3, csúcsa y = -3-ban van, így 2 zérushelye van'
      },
      {
        id: 'qm3-3',
        prompt: 'h(x) = x² + 2x + 5',
        value: '(x + 1)² + 4, csúcsa az x-tengely felett van, 0 zérushely'
      },
      {
        id: 'qm3-4',
        prompt: 'p(x) = -(x - 2)² + 9',
        value: 'Lefelé nyílik, csúcsa (2; 9), zérushelyei: x = -1 és x = 5'
      },
      {
        id: 'qm3-5',
        prompt: '√(x - 5) - 3 = 0',
        value: 'Zérushely: x = 14 (mert √(14 - 5) = 3)'
      },
      {
        id: 'qm3-6',
        prompt: '√(2x + 6) = 4',
        value: 'Zérushely: x = 5 (mert 2(5) + 6 = 16 és √16 = 4)'
      }
    ]
  }
};

export const QuadraticRootMatcher: React.FC<QuadraticRootMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'masodfoku-es-negyzetgyok-fuggveny',
  topicTitle = 'Másodfokú és Négyzetgyök-függvény'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      title="Másodfokú & Gyök Párosító"
      subtitle="Kapcsold össze a függvényeket a csúcspontjukkal, kezdőpontjukkal és geometriai tulajdonságaikkal!"
      levels={matcherLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

