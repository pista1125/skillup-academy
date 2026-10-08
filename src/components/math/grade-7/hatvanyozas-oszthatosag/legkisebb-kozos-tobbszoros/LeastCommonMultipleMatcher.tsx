import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LeastCommonMultipleMatcherProps {
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
    title: '1. Szint: Egyszerű Számpárok és LKKT-jük',
    subtitle: 'Párosítsd a számpárokat a legkisebb közös többszörösükkel!',
    pairs: [
      {
        id: 'p1-1',
        prompt: 'LKKT(6; 8)',
        value: '24'
      },
      {
        id: 'p1-2',
        prompt: 'LKKT(10; 15)',
        value: '30'
      },
      {
        id: 'p1-3',
        prompt: 'LKKT(12; 18)',
        value: '36'
      },
      {
        id: 'p1-4',
        prompt: 'LKKT(8; 12)',
        value: '24'
      },
      {
        id: 'p1-5',
        prompt: 'LKKT(15; 20)',
        value: '60'
      },
      {
        id: 'p1-6',
        prompt: 'LKKT(14; 21)',
        value: '42'
      },
      {
        id: 'p1-7',
        prompt: 'LKKT(20; 30)',
        value: '60'
      },
      {
        id: 'p1-8',
        prompt: 'LKKT(24; 36)',
        value: '72'
      }
    ]
  },
  2: {
    title: '2. Szint: Hatványalakokból Képzett LKKT',
    subtitle: 'Párosítsd a prímfelbontásokat a legnagyobb kitevők szorzatából adódó LKKT értékkel!',
    pairs: [
      {
        id: 'p2-1',
        prompt: '2³ · 3 és 2² · 3²',
        value: '2³ · 3² = 72'
      },
      {
        id: 'p2-2',
        prompt: '2² · 5 és 2 · 5²',
        value: '2² · 5² = 100'
      },
      {
        id: 'p2-3',
        prompt: '2³ · 7 és 2 · 3 · 7',
        value: '2³ · 3 · 7 = 168'
      },
      {
        id: 'p2-4',
        prompt: '3² · 5 és 2² · 3',
        value: '2² · 3² · 5 = 180'
      },
      {
        id: 'p2-5',
        prompt: '2⁴ · 3 és 2³ · 5',
        value: '2⁴ · 3 · 5 = 240'
      },
      {
        id: 'p2-6',
        prompt: '2² · 3² és 2 · 5',
        value: '2² · 3² · 5 = 180'
      },
      {
        id: 'p2-7',
        prompt: '2³ · 5 és 3 · 7',
        value: '2³ · 3 · 5 · 7 = 840 (relatív prímek)'
      },
      {
        id: 'p2-8',
        prompt: '2² · 3 · 5 és 2 · 3² · 7',
        value: '2² · 3² · 5 · 7 = 1260'
      }
    ]
  },
  3: {
    title: '3. Szint: Relatív Prímek, Közös Nevező és Alaptétel',
    subtitle: 'Párosítsd a feladványokat a pontos számelméleti összefüggéssel!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'LKKT(8; 9)',
        value: '72 (relatív prímek: 8 · 9)'
      },
      {
        id: 'p3-2',
        prompt: 'LKKT(7; 11)',
        value: '77 (két prím szorzata)'
      },
      {
        id: 'p3-3',
        prompt: 'LKKT(15; 45)',
        value: '45 (a nagyobbik szám)'
      },
      {
        id: 'p3-4',
        prompt: 'Ha LNKO = 6 és a·b = 360',
        value: 'LKKT = 60 (360 : 6)'
      },
      {
        id: 'p3-5',
        prompt: '1/12 + 1/18 legkisebb közös nevezője',
        value: '36'
      },
      {
        id: 'p3-6',
        prompt: '1/20 + 1/30 legkisebb közös nevezője',
        value: '60'
      },
      {
        id: 'p3-7',
        prompt: 'Járatok: 12 és 15 percenként találkoznak',
        value: '60 perc múlva'
      },
      {
        id: 'p3-8',
        prompt: 'LKKT(n; n+1) bármely n-re',
        value: 'n · (n + 1) (szorzatuk)'
      }
    ]
  }
};

export const LeastCommonMultipleMatcher: React.FC<LeastCommonMultipleMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-lcm',
  topicTitle = '9. Legkisebb közös többszörös'
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
      themeColor="purple"
    />
  );
};

export default LeastCommonMultipleMatcher;
