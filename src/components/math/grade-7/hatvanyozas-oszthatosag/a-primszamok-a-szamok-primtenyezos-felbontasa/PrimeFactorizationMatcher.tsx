import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PrimeFactorizationMatcherProps {
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
    title: '1. Szint: Alapvető Számok és Prímfelbontásuk',
    subtitle: 'Párosítsd a kétjegyű összetett számokat a pontos kanonikus prímtényezős alakjukkal!',
    pairs: [
      {
        id: 'p1-1',
        prompt: '12',
        value: '2² · 3'
      },
      {
        id: 'p1-2',
        prompt: '18',
        value: '2 · 3²'
      },
      {
        id: 'p1-3',
        prompt: '20',
        value: '2² · 5'
      },
      {
        id: 'p1-4',
        prompt: '24',
        value: '2³ · 3'
      },
      {
        id: 'p1-5',
        prompt: '36',
        value: '2² · 3²'
      },
      {
        id: 'p1-6',
        prompt: '45',
        value: '3² · 5'
      },
      {
        id: 'p1-7',
        prompt: '50',
        value: '2 · 5²'
      },
      {
        id: 'p1-8',
        prompt: '75',
        value: '3 · 5²'
      }
    ]
  },
  2: {
    title: '2. Szint: Háromjegyű Számok és Több Prímtényező',
    subtitle: 'Keresd meg a nagyobb összetett számok 2-t vagy 3-at tartalmazó prímfelbontását!',
    pairs: [
      {
        id: 'p2-1',
        prompt: '60',
        value: '2² · 3 · 5'
      },
      {
        id: 'p2-2',
        prompt: '72',
        value: '2³ · 3²'
      },
      {
        id: 'p2-3',
        prompt: '90',
        value: '2 · 3² · 5'
      },
      {
        id: 'p2-4',
        prompt: '100',
        value: '2² · 5²'
      },
      {
        id: 'p2-5',
        prompt: '120',
        value: '2³ · 3 · 5'
      },
      {
        id: 'p2-6',
        prompt: '144',
        value: '2⁴ · 3²'
      },
      {
        id: 'p2-7',
        prompt: '150',
        value: '2 · 3 · 5²'
      },
      {
        id: 'p2-8',
        prompt: '180',
        value: '2² · 3² · 5'
      }
    ]
  },
  3: {
    title: '3. Szint: Nagyobb Számok és Magasabb Hatványok',
    subtitle: 'Párosítsd a kerek és összetett számokat a teljes kanonikus alakjukkal!',
    pairs: [
      {
        id: 'p3-1',
        prompt: '210',
        value: '2 · 3 · 5 · 7'
      },
      {
        id: 'p3-2',
        prompt: '216',
        value: '2³ · 3³'
      },
      {
        id: 'p3-3',
        prompt: '250',
        value: '2 · 5³'
      },
      {
        id: 'p3-4',
        prompt: '300',
        value: '2² · 3 · 5²'
      },
      {
        id: 'p3-5',
        prompt: '360',
        value: '2³ · 3² · 5'
      },
      {
        id: 'p3-6',
        prompt: '400',
        value: '2⁴ · 5²'
      },
      {
        id: 'p3-7',
        prompt: '500',
        value: '2² · 5³'
      },
      {
        id: 'p3-8',
        prompt: '1000',
        value: '2³ · 5³'
      }
    ]
  }
};

export const PrimeFactorizationMatcher: React.FC<PrimeFactorizationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-prime-factors',
  topicTitle = '5. A prímszámok. A számok prímtényezős felbontása'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      levels={matcherLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="emerald"
    />
  );
};

export default PrimeFactorizationMatcher;
