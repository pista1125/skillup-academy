import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersPracticeMatcherProps {
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
    title: 'Prímhatványok és numerikus egyszerűsítések',
    subtitle: 'Párosítsd a hatványos kifejezéseket a pontos egész számértékükkel!',
    pairs: [
      {
        id: 'ppm1-1',
        prompt: '2⁵ · 4⁻²',
        value: '2'
      },
      {
        id: 'ppm1-2',
        prompt: '12² : (2⁴ · 3)',
        value: '3'
      },
      {
        id: 'ppm1-3',
        prompt: '(½)⁻³ : 2',
        value: '4'
      },
      {
        id: 'ppm1-4',
        prompt: '25² · 5⁻³',
        value: '5'
      },
      {
        id: 'ppm1-5',
        prompt: '(2 · 3)³ : 6²',
        value: '6'
      },
      {
        id: 'ppm1-6',
        prompt: '(½)⁻³',
        value: '8'
      },
      {
        id: 'ppm1-7',
        prompt: '9³ · 3⁻⁴',
        value: '9'
      },
      {
        id: 'ppm1-8',
        prompt: '10³ : 10²',
        value: '10'
      }
    ]
  },
  2: {
    title: 'Összetett törtek és algebrai kifejezések',
    subtitle: 'Párosítsd az algebrai hatványkifejezéseket a legegyszerűbb alakjukkal!',
    pairs: [
      {
        id: 'ppm2-1',
        prompt: '(a²b⁻³)⁻²',
        value: 'b⁶ / a⁴'
      },
      {
        id: 'ppm2-2',
        prompt: '(2a³)² : (4a⁴)',
        value: 'a²'
      },
      {
        id: 'ppm2-3',
        prompt: '(x⁻¹y²)³ · x⁴',
        value: 'xy⁶'
      },
      {
        id: 'ppm2-4',
        prompt: '(3x²)³ : (9x⁵)',
        value: '3x'
      },
      {
        id: 'ppm2-5',
        prompt: '(a⁻³ : a⁻⁵) · a⁻¹',
        value: 'a'
      },
      {
        id: 'ppm2-6',
        prompt: '(x²y³)⁻¹ · (x³y⁴)',
        value: 'xy'
      },
      {
        id: 'ppm2-7',
        prompt: '(2x⁻¹y)³ · x³',
        value: '8y³'
      },
      {
        id: 'ppm2-8',
        prompt: '(x⁴y⁻²) / (x²y⁻⁴)',
        value: 'x²y²'
      }
    ]
  },
  3: {
    title: 'Közös hatvány kiemelése törtben',
    subtitle: 'Párosítsd a hatványösszegeket tartalmazó törteket a helyes egész számértékükkel!',
    pairs: [
      {
        id: 'ppm3-1',
        prompt: '(3ⁿ⁺¹ - 3ⁿ) : 3ⁿ',
        value: '2'
      },
      {
        id: 'ppm3-2',
        prompt: '(2ⁿ⁺² - 2ⁿ) : 2ⁿ',
        value: '3'
      },
      {
        id: 'ppm3-3',
        prompt: '(3ⁿ⁺¹ + 3ⁿ) : 3ⁿ',
        value: '4'
      },
      {
        id: 'ppm3-4',
        prompt: '(6ⁿ⁺¹ - 6ⁿ) : 6ⁿ',
        value: '5'
      },
      {
        id: 'ppm3-5',
        prompt: '(5ⁿ⁺¹ + 5ⁿ) : 5ⁿ',
        value: '6'
      },
      {
        id: 'ppm3-6',
        prompt: '(2ⁿ⁺³ - 2ⁿ) : 2ⁿ',
        value: '7'
      },
      {
        id: 'ppm3-7',
        prompt: '(3ⁿ⁺² - 3ⁿ) : 3ⁿ',
        value: '8'
      },
      {
        id: 'ppm3-8',
        prompt: '(10ⁿ⁺¹ - 10ⁿ) : 10ⁿ',
        value: '9'
      }
    ]
  }
};

export const PowersPracticeMatcher: React.FC<PowersPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '3. Hatványozás gyakorlása'
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
      title="Hatványozás gyakorlása párosító játék"
      subtitle="Párosítsd az egyszerűsített kifejezéseket a pontos értékükkel!"
      themeColor="purple"
    />
  );
};

