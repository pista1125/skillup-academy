import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StretchTransformMatcherProps {
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
    title: 'Meredekség és nyílásirány',
    subtitle: 'Párosítsd a hozzárendelési szabályokat a grafikon geometriai formájával és irányával!',
    pairs: [
      {
        id: 'stm1-1',
        prompt: 'f(x) = 3x²',
        value: '„Soványabb”, felfelé nyíló'
      },
      {
        id: 'stm1-2',
        prompt: 'f(x) = -2x²',
        value: '„Soványabb”, lefelé nyíló'
      },
      {
        id: 'stm1-3',
        prompt: 'f(x) = 0,5x²',
        value: '„Kövérebb”, felfelé nyíló'
      },
      {
        id: 'stm1-4',
        prompt: 'f(x) = -0,25x²',
        value: '„Kövérebb”, lefelé nyíló'
      },
      {
        id: 'stm1-5',
        prompt: 'f(x) = 2|x|',
        value: 'Meredekebb V-alak (m = ±2)'
      },
      {
        id: 'stm1-6',
        prompt: 'f(x) = -|x|',
        value: 'Lefelé néző normál V-alak'
      },
      {
        id: 'stm1-7',
        prompt: 'f(x) = -√x',
        value: 'Tükrözött gyökív (4. síknegyed)'
      },
      {
        id: 'stm1-8',
        prompt: 'f(x) = x²',
        value: 'Normálparabola (a = 1)'
      }
    ]
  },
  2: {
    title: 'Képletek és illeszkedő pontok',
    subtitle: 'Párosítsd a függvényeket egy rájuk illeszkedő pontos pontpárral!',
    pairs: [
      {
        id: 'stm2-1',
        prompt: 'f(x) = 4x²',
        value: 'Illeszkedik a (1; 4) pont'
      },
      {
        id: 'stm2-2',
        prompt: 'f(x) = -3x²',
        value: 'Illeszkedik a (1; -3) pont'
      },
      {
        id: 'stm2-3',
        prompt: 'f(x) = 0,5x²',
        value: 'Illeszkedik a (2; 2) pont'
      },
      {
        id: 'stm2-4',
        prompt: 'f(x) = -2|x|',
        value: 'Illeszkedik a (3; -6) pont'
      },
      {
        id: 'stm2-5',
        prompt: 'f(x) = 3√x',
        value: 'Illeszkedik a (4; 6) pont'
      },
      {
        id: 'stm2-6',
        prompt: 'f(x) = -0,5|x|',
        value: 'Illeszkedik a (4; -2) pont'
      },
      {
        id: 'stm2-7',
        prompt: 'f(x) = 5x²',
        value: 'Illeszkedik a (2; 20) pont'
      },
      {
        id: 'stm2-8',
        prompt: 'f(x) = -x²',
        value: 'Illeszkedik a (2; -4) pont'
      }
    ]
  },
  3: {
    title: 'Szélsőértékek és értékkészletek',
    subtitle: 'Párosítsd a transzformált függvényeket a helyes szélsőértékükkel vagy értékkészletükkel!',
    pairs: [
      {
        id: 'stm3-1',
        prompt: 'f(x) = -5x²',
        value: 'Maximuma 0, Rf = ]-∞; 0]'
      },
      {
        id: 'stm3-2',
        prompt: 'f(x) = 4x² + 1',
        value: 'Minimuma 1, Rf = [1; ∞['
      },
      {
        id: 'stm3-3',
        prompt: 'f(x) = -2|x| + 3',
        value: 'Maximuma 3, Rf = ]-∞; 3]'
      },
      {
        id: 'stm3-4',
        prompt: 'f(x) = 0,5x² - 2',
        value: 'Minimuma -2, zérushelyek: ±2'
      },
      {
        id: 'stm3-5',
        prompt: 'f(x) = -3√x',
        value: 'Df = [0; ∞[, Rf = ]-∞; 0]'
      },
      {
        id: 'stm3-6',
        prompt: 'f(x) = 2(x - 1)²',
        value: 'Minimumhely x = 1, értéke 0'
      },
      {
        id: 'stm3-7',
        prompt: 'f(x) = -0,5(x + 2)²',
        value: 'Maximumhely x = -2, értéke 0'
      },
      {
        id: 'stm3-8',
        prompt: 'f(x) = 3|x| - 6',
        value: 'Minimuma -6, zérushelyek: ±2'
      }
    ]
  }
};

export const StretchTransformMatcher: React.FC<StretchTransformMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = '„Soványabb”, „kövérebb”'
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

