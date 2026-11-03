import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AbsValueSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Nyílás Iránya és Szélsőérték Típusa',
    subtitle: 'Döntsd el a képletek alapján, hogy a V-alak felfelé vagy lefelé nyílik!',
    categories: [
      {
        id: 'cat-opens-up',
        name: 'Felfelé Nyíló (Minimum, a > 0)',
        description: 'V-alakú grafikon, legalsó csúcspont (minimum)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-opens-down',
        name: 'Lefelé Nyíló (Maximum, a < 0)',
        description: 'Fordított Λ-alakú grafikon, legfelső csúcspont (maximum)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Felfelé nyíló (a > 0)
      { id: 'as1-1', label: 'f(x) = |x - 3| + 2', category: 'cat-opens-up' },
      { id: 'as1-2', label: 'g(x) = 2|x + 1| - 4', category: 'cat-opens-up' },
      { id: 'as1-3', label: 'h(x) = |x| - 5', category: 'cat-opens-up' },
      { id: 'as1-4', label: 'k(x) = 0.5|x - 6|', category: 'cat-opens-up' },
      { id: 'as1-5', label: 'p(x) = |x + 8| + 1', category: 'cat-opens-up' },
      { id: 'as1-6', label: 'q(x) = 3|x|', category: 'cat-opens-up' },
      // Lefelé nyíló (a < 0)
      { id: 'as1-7', label: 'f(x) = -|x| + 3', category: 'cat-opens-down' },
      { id: 'as1-8', label: 'g(x) = -2|x - 4| - 1', category: 'cat-opens-down' },
      { id: 'as1-9', label: 'h(x) = -|x + 2| + 5', category: 'cat-opens-down' },
      { id: 'as1-10', label: 'k(x) = -(1/2)|x - 1|', category: 'cat-opens-down' },
      { id: 'as1-11', label: 'p(x) = -|x|', category: 'cat-opens-down' },
      { id: 'as1-12', label: 'q(x) = -4|x + 3| + 8', category: 'cat-opens-down' }
    ]
  },
  2: {
    title: '2. Szint: Vízszintes Eltolás Iránya (u)',
    subtitle: 'Merre tolódott el a csúcspont az origóhoz képest vízszintesen?',
    categories: [
      {
        id: 'cat-u-right',
        name: 'Jobbra Tolt Csúcs (u > 0)',
        description: '|x - u| alak, a csúcs a pozitív x-tengely felé tolódik',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-u-left',
        name: 'Balra Tolt Csúcs (u < 0)',
        description: '|x + |u|| alak, a csúcs a negatív x-tengely felé tolódik',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-u-none',
        name: 'Nincs Vízszintes Eltolás (u = 0)',
        description: '|x| alak, a csúcs pontosan az y tengelyen marad',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Jobbra tolt (u > 0)
      { id: 'as2-1', label: 'f(x) = |x - 4| + 1 (Csúcs x = 4)', category: 'cat-u-right' },
      { id: 'as2-2', label: 'g(x) = |x - 1| - 3 (Csúcs x = 1)', category: 'cat-u-right' },
      { id: 'as2-3', label: 'h(x) = -|x - 7| (Csúcs x = 7)', category: 'cat-u-right' },
      { id: 'as2-4', label: 'k(x) = 2|x - 5| + 4', category: 'cat-u-right' },
      // Balra tolt (u < 0)
      { id: 'as2-5', label: 'f(x) = |x + 3| + 2 (Csúcs x = -3)', category: 'cat-u-left' },
      { id: 'as2-6', label: 'g(x) = |x + 6| - 1 (Csúcs x = -6)', category: 'cat-u-left' },
      { id: 'as2-7', label: 'h(x) = -|x + 2| + 5 (Csúcs x = -2)', category: 'cat-u-left' },
      { id: 'as2-8', label: 'k(x) = 3|x + 1|', category: 'cat-u-left' },
      // Nincs vízszintes eltolás (u = 0)
      { id: 'as2-9', label: 'f(x) = |x| - 4 (Csúcs az y tengelyen)', category: 'cat-u-none' },
      { id: 'as2-10', label: 'g(x) = |x| + 5', category: 'cat-u-none' },
      { id: 'as2-11', label: 'h(x) = -|x| + 2', category: 'cat-u-none' },
      { id: 'as2-12', label: 'k(x) = 2|x|', category: 'cat-u-none' }
    ]
  },
  3: {
    title: '3. Szint: Zérushelyek Száma',
    subtitle: 'Hány helyen metszi vagy érinti a grafikon az x tengelyt?',
    categories: [
      {
        id: 'cat-zero-two',
        name: '2 Zérushelye Van',
        description: 'Metszi az x tengelyt két pontban',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-zero-one',
        name: '1 Zérushelye Van',
        description: 'A csúcspont pontosan az x tengelyre esik (v = 0)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-zero-none',
        name: 'NINCS Zérushelye',
        description: 'Nem éri el az x tengelyt (felette/alatta marad)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // 2 zérushely
      { id: 'as3-1', label: 'f(x) = |x - 2| - 3 (csúcs y = -3, felfelé nyílik)', category: 'cat-zero-two' },
      { id: 'as3-2', label: 'g(x) = -|x + 1| + 4 (csúcs y = 4, lefelé nyílik)', category: 'cat-zero-two' },
      { id: 'as3-3', label: 'h(x) = 2|x| - 6', category: 'cat-zero-two' },
      { id: 'as3-4', label: 'k(x) = -|x - 5| + 1', category: 'cat-zero-two' },
      // 1 zérushely
      { id: 'as3-5', label: 'f(x) = |x - 4| (v = 0, C(4; 0))', category: 'cat-zero-one' },
      { id: 'as3-6', label: 'g(x) = |x + 6| (v = 0, C(-6; 0))', category: 'cat-zero-one' },
      { id: 'as3-7', label: 'h(x) = -|x - 1| (v = 0, C(1; 0))', category: 'cat-zero-one' },
      { id: 'as3-8', label: 'k(x) = 3|x| (v = 0, C(0; 0))', category: 'cat-zero-one' },
      // Nincs zérushely
      { id: 'as3-9', label: 'f(x) = |x - 3| + 2 (csúcs y = 2, felfelé nyílik)', category: 'cat-zero-none' },
      { id: 'as3-10', label: 'g(x) = -|x + 4| - 1 (csúcs y = -1, lefelé nyílik)', category: 'cat-zero-none' },
      { id: 'as3-11', label: 'h(x) = |x| + 5', category: 'cat-zero-none' },
      { id: 'as3-12', label: 'k(x) = -2|x - 1| - 3', category: 'cat-zero-none' }
    ]
  }
};

export const AbsValueSorter: React.FC<AbsValueSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'abszoluterteek-fuggveny',
  topicTitle = 'Abszolútérték-függvény'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-abszolut-sorter"
    />
  );
};

