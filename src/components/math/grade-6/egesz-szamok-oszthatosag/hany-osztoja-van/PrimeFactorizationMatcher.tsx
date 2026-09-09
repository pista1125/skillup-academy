import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PrimeFactorizationMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Számok és prímfelbontásuk 50-ig',
    timeLimit: 120,
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    pairs: [
      { id: 'p1-1', left: '12', right: '2² · 3' },
      { id: 'p1-2', left: '18', right: '2 · 3²' },
      { id: 'p1-3', left: '20', right: '2² · 5' },
      { id: 'p1-4', left: '24', right: '2³ · 3' },
      { id: 'p1-5', left: '28', right: '2² · 7' },
      { id: 'p1-6', left: '30', right: '2 · 3 · 5' },
      { id: 'p1-7', left: '36', right: '2² · 3²' },
      { id: 'p1-8', left: '45', right: '3² · 5' }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Számok és prímfelbontásuk 150-ig',
    timeLimit: 100,
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    pairs: [
      { id: 'p2-1', left: '60', right: '2² · 3 · 5' },
      { id: 'p2-2', left: '72', right: '2³ · 3²' },
      { id: 'p2-3', left: '80', right: '2⁴ · 5' },
      { id: 'p2-4', left: '90', right: '2 · 3² · 5' },
      { id: 'p2-5', left: '100', right: '2² · 5²' },
      { id: 'p2-6', left: '108', right: '2² · 3³' },
      { id: 'p2-7', left: '120', right: '2³ · 3 · 5' },
      { id: 'p2-8', left: '144', right: '2⁴ · 3²' }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Számok és osztóik száma vagy nagy prímfelbontás',
    timeLimit: 90,
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    pairs: [
      { id: 'p3-1', left: '72 (2³ · 3²)', right: '12 osztó (4·3)' },
      { id: 'p3-2', left: '36 (2² · 3²)', right: '9 osztó (3·3)' },
      { id: 'p3-3', left: '60 (2² · 3 · 5)', right: '12 osztó (3·2·2)' },
      { id: 'p3-4', left: '100 (2² · 5²)', right: '9 osztó (3·3)' },
      { id: 'p3-5', left: '210 (2 · 3 · 5 · 7)', right: '16 osztó (2⁴)' },
      { id: 'p3-6', left: '216', right: '2³ · 3³' },
      { id: 'p3-7', left: '360', right: '2³ · 3² · 5' },
      { id: 'p3-8', left: '500', right: '2² · 5³' }
    ]
  }
};

export function PrimeFactorizationMatcher({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack
}: PrimeFactorizationMatcherProps) {
  return (
    <MatcherTemplate
      levels={MATCHER_LEVELS}
      initialLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      title="Prímtényezős Párosító"
      subtitle="Párosítsd a számokat a helyes prímtényezős felbontásukkal vagy az osztóik számával!"
      themeColor="indigo"
    />
  );
}

export { PrimeFactorizationMatcher as NumberOfDivisorsMatcher };
