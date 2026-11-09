import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadraticGraphMatcherProps {
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
    title: 'Segédfüggvény zérushelyei és szimmetriatengelye',
    subtitle: 'Párosítsd a g(x) = ax² + bx segédfüggvényeket a zérushelyeikkel és a szimmetriatengelyükkel!',
    pairs: [
      {
        id: 'qgm1-1',
        prompt: 'g(x) = x² - 6x',
        value: 'x₁ = 0, x₂ = 6, u = 3'
      },
      {
        id: 'qgm1-2',
        prompt: 'g(x) = x² + 4x',
        value: 'x₁ = -4, x₂ = 0, u = -2'
      },
      {
        id: 'qgm1-3',
        prompt: 'g(x) = 2x² - 8x',
        value: 'x₁ = 0, x₂ = 4, u = 2'
      },
      {
        id: 'qgm1-4',
        prompt: 'g(x) = -x² + 6x',
        value: 'x₁ = 0, x₂ = 6, u = 3'
      },
      {
        id: 'qgm1-5',
        prompt: 'g(x) = 0.5x² - 2x',
        value: 'x₁ = 0, x₂ = 4, u = 2'
      },
      {
        id: 'qgm1-6',
        prompt: 'g(x) = -2x² - 6x',
        value: 'x₁ = -3, x₂ = 0, u = -1.5'
      },
      {
        id: 'qgm1-7',
        prompt: 'g(x) = x² - 10x',
        value: 'x₁ = 0, x₂ = 10, u = 5'
      },
      {
        id: 'qgm1-8',
        prompt: 'g(x) = -x² - 4x',
        value: 'x₁ = -4, x₂ = 0, u = -2'
      }
    ]
  },
  2: {
    title: 'A parabola 5 kulcspontja',
    subtitle: 'Párosítsd a másodfokú függvényeket az y-tengelymetszetükkel, annak tükörképével és a csúcspontjukkal!',
    pairs: [
      {
        id: 'qgm2-1',
        prompt: 'f(x) = x² - 4x + 3',
        value: '(0; 3), (4; 3), V(2; -1)'
      },
      {
        id: 'qgm2-2',
        prompt: 'f(x) = x² + 6x + 5',
        value: '(0; 5), (-6; 5), V(-3; -4)'
      },
      {
        id: 'qgm2-3',
        prompt: 'f(x) = -x² + 2x + 8',
        value: '(0; 8), (2; 8), V(1; 9)'
      },
      {
        id: 'qgm2-4',
        prompt: 'f(x) = 2x² - 8x + 6',
        value: '(0; 6), (4; 6), V(2; -2)'
      },
      {
        id: 'qgm2-5',
        prompt: 'f(x) = x² - 2x - 3',
        value: '(0; -3), (2; -3), V(1; -4)'
      },
      {
        id: 'qgm2-6',
        prompt: 'f(x) = -x² + 4x - 3',
        value: '(0; -3), (4; -3), V(2; 1)'
      },
      {
        id: 'qgm2-7',
        prompt: 'f(x) = 0.5x² - 2x - 2',
        value: '(0; -2), (4; -2), V(2; -4)'
      },
      {
        id: 'qgm2-8',
        prompt: 'f(x) = x² - 6x + 9',
        value: '(0; 9), (6; 9), V(3; 0)'
      }
    ]
  },
  3: {
    title: 'Teljes jellemzés: Értékkészlet és Tulajdonságok',
    subtitle: 'Párosítsd a másodfokú függvényt a pontos értékkészletével és leíró tulajdonságával!',
    pairs: [
      {
        id: 'qgm3-1',
        prompt: 'f(x) = (x - 2)² - 5',
        value: 'ÉK: [-5; ∞[, nő [2; ∞[-en'
      },
      {
        id: 'qgm3-2',
        prompt: 'f(x) = -(x + 3)² + 4',
        value: 'ÉK: ]-∞; 4], nő ]-∞; -3]-on'
      },
      {
        id: 'qgm3-3',
        prompt: 'f(x) = 2(x - 1)² + 3',
        value: 'ÉK: [3; ∞[, csökken ]-∞; 1]-en'
      },
      {
        id: 'qgm3-4',
        prompt: 'f(x) = -(x - 4)²',
        value: 'ÉK: ]-∞; 0], csökken [4; ∞[-en'
      },
      {
        id: 'qgm3-5',
        prompt: 'f(x) = (x + 1)² - 9',
        value: 'ÉK: [-9; ∞[, zérushely: {-4, 2}'
      },
      {
        id: 'qgm3-6',
        prompt: 'f(x) = -2(x - 2)² + 8',
        value: 'ÉK: ]-∞; 8], zérushely: {0, 4}'
      },
      {
        id: 'qgm3-7',
        prompt: 'f(x) = (x - 3)² + 2',
        value: 'ÉK: [2; ∞[, nincs zérushely'
      },
      {
        id: 'qgm3-8',
        prompt: 'f(x) = -(x - 1)² - 3',
        value: 'ÉK: ]-∞; -3], nincs zérushely'
      }
    ]
  }
};

export const QuadraticGraphMatcher: React.FC<QuadraticGraphMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-transz-masodfoku-grafikon-matcher',
  topicTitle = 'Másodfokú függvények grafikonja - Párosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
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

