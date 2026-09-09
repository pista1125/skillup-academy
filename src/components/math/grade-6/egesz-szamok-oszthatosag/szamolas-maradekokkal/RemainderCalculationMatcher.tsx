import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RemainderCalculationMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Egyszerű maradékos osztások eredményei',
    timeLimit: 120,
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    pairs: [
      { id: 'p1-1', left: '17 : 5 maradéka', right: '2' },
      { id: 'p1-2', left: '25 : 4 maradéka', right: '1' },
      { id: 'p1-3', left: '19 : 3 maradéka', right: '1' },
      { id: 'p1-4', left: '34 : 6 maradéka', right: '4' },
      { id: 'p1-5', left: '45 : 7 maradéka', right: '3' },
      { id: 'p1-6', left: '50 : 8 maradéka', right: '2' },
      { id: 'p1-7', left: '31 : 9 maradéka', right: '4' },
      { id: 'p1-8', left: '23 : 10 maradéka', right: '3' }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Naptárszámítás és ciklikus maradékok',
    timeLimit: 100,
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    pairs: [
      { id: 'p2-1', left: '15 nap múlva Hétfőtől', right: 'Kedd (15 = 2·7 + 1)' },
      { id: 'p2-2', left: '23 nap múlva Keddtől', right: 'Csütörtök (23 = 3·7 + 2)' },
      { id: 'p2-3', left: '30 nap múlva Szerdától', right: 'Péntek (30 = 4·7 + 2)' },
      { id: 'p2-4', left: '14 nap múlva Péntektől', right: 'Péntek (14 = 2·7 + 0)' },
      { id: 'p2-5', left: '100 nap múlva Vasárnaptól', right: 'Kedd (100 = 14·7 + 2)' },
      { id: 'p2-6', left: '50 óra múlva 6 órától', right: '8 óra (50 = 4·12 + 2)' },
      { id: 'p2-7', left: '26 óra múlva 10 órától', right: '12 óra (26 = 2·12 + 2)' },
      { id: 'p2-8', left: '37 nap múlva Csütörtöktől', right: 'Kedd (37 = 5·7 + 2)' }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Maradékosztályok és számelméleti összefüggések',
    timeLimit: 90,
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    pairs: [
      { id: 'p3-1', left: '5-tel osztva 3 maradék', right: '28 (5·5 + 3)' },
      { id: 'p3-2', left: '7-tel osztva 5 maradék', right: '40 (7·5 + 5)' },
      { id: 'p3-3', left: '3-mal osztva 2 maradék', right: '29 (3·9 + 2)' },
      { id: 'p3-4', left: '4-gyel osztva 3 maradék', right: '35 (4·8 + 3)' },
      { id: 'p3-5', left: '6-tal osztva 5 maradék', right: '47 (6·7 + 5)' },
      { id: 'p3-6', left: '8-cal osztva 7 maradék', right: '55 (8·6 + 7)' },
      { id: 'p3-7', left: '9-cel osztva 6 maradék', right: '42 (9·4 + 6)' },
      { id: 'p3-8', left: '11-gyel osztva 4 maradék', right: '48 (11·4 + 4)' }
    ]
  }
};

export function RemainderCalculationMatcher({
  level = 1,
  onNextLevel,
  onOpenRules
}: RemainderCalculationMatcherProps) {
  return (
    <MatcherTemplate
      levels={MATCHER_LEVELS}
      initialLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      title="Maradékos Párosító Játék"
      subtitle="Kattints a feladatra, majd a megfelelő maradékra vagy eredményre!"
      themeColor="teal"
    />
  );
}
