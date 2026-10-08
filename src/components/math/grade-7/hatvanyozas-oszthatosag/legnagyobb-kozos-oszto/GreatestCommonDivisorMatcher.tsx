import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GreatestCommonDivisorMatcherProps {
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
    title: '1. Szint: Egyszerű Számpárok és LNKO-juk',
    subtitle: 'Párosítsd a számpárokat a legnagyobb közös osztójukkal!',
    pairs: [
      {
        id: 'p1-1',
        prompt: 'LNKO(12; 18)',
        value: '6'
      },
      {
        id: 'p1-2',
        prompt: 'LNKO(20; 30)',
        value: '10'
      },
      {
        id: 'p1-3',
        prompt: 'LNKO(15; 25)',
        value: '5'
      },
      {
        id: 'p1-4',
        prompt: 'LNKO(24; 36)',
        value: '12'
      },
      {
        id: 'p1-5',
        prompt: 'LNKO(14; 21)',
        value: '7'
      },
      {
        id: 'p1-6',
        prompt: 'LNKO(16; 24)',
        value: '8'
      },
      {
        id: 'p1-7',
        prompt: 'LNKO(18; 27)',
        value: '9'
      },
      {
        id: 'p1-8',
        prompt: 'LNKO(40; 60)',
        value: '20'
      }
    ]
  },
  2: {
    title: '2. Szint: Hatványalakokból Képzett LNKO',
    subtitle: 'Párosítsd a prímfelbontásokat a közös prímek legkisebb kitevőiből adódó LNKO értékkel!',
    pairs: [
      {
        id: 'p2-1',
        prompt: '2³ · 3 és 2² · 3²',
        value: '2² · 3 = 12'
      },
      {
        id: 'p2-2',
        prompt: '2² · 5² és 2³ · 5',
        value: '2² · 5 = 20'
      },
      {
        id: 'p2-3',
        prompt: '2 · 3² · 7 és 2² · 3 · 5',
        value: '2 · 3 = 6'
      },
      {
        id: 'p2-4',
        prompt: '3² · 5 és 2 · 3³',
        value: '3² = 9'
      },
      {
        id: 'p2-5',
        prompt: '2⁴ · 3 és 2³ · 5',
        value: '2³ = 8'
      },
      {
        id: 'p2-6',
        prompt: '2² · 3 · 5 és 2 · 3² · 5',
        value: '2 · 3 · 5 = 30'
      },
      {
        id: 'p2-7',
        prompt: '2³ · 7 és 3² · 5',
        value: '1 (relatív prímek)'
      },
      {
        id: 'p2-8',
        prompt: '2² · 3² · 5 és 2³ · 3 · 5²',
        value: '2² · 3 · 5 = 60'
      }
    ]
  },
  3: {
    title: '3. Szint: Relatív Prímek, Törtek és Különleges Párok',
    subtitle: 'Párosítsd a feladványokat a pontos számelméleti eredménnyel!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'LNKO(8; 9)',
        value: '1 (relatív prímek)'
      },
      {
        id: 'p3-2',
        prompt: 'LNKO(15; 28)',
        value: '1 (relatív prímek)'
      },
      {
        id: 'p3-3',
        prompt: 'LNKO(n; n+1) bármely n-re',
        value: '1 (szomszédosak mindig relatív prímek)'
      },
      {
        id: 'p3-4',
        prompt: 'LNKO(15; 45)',
        value: '15 (a kisebbik osztja a nagyobbat)'
      },
      {
        id: 'p3-5',
        prompt: 'LNKO(48; 72)',
        value: '24'
      },
      {
        id: 'p3-6',
        prompt: '42 / 70 egyszerűsítve',
        value: '3 / 5 (LNKO = 14)'
      },
      {
        id: 'p3-7',
        prompt: '36 / 84 egyszerűsítve',
        value: '3 / 7 (LNKO = 12)'
      },
      {
        id: 'p3-8',
        prompt: 'LNKO(77; 91)',
        value: '7 (7·11 és 7·13)'
      }
    ]
  }
};

export const GreatestCommonDivisorMatcher: React.FC<GreatestCommonDivisorMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-gcd',
  topicTitle = '8. Legnagyobb közös osztó'
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
      themeColor="violet"
    />
  );
};

export default GreatestCommonDivisorMatcher;
