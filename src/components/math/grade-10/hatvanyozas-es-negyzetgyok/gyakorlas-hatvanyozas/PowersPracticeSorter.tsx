import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersPracticeSorterProps {
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
    title: 'Összehasonlítás 1-gyel',
    subtitle: 'Sorold be a kifejezéseket aszerint, hogy értékük 1-nél kisebb, pontosan 1, vagy 1-nél nagyobb!',
    categories: [
      {
        id: 'cat-lt1',
        name: 'Értéke 1-nél kisebb (< 1)',
        description: 'Tört értékű pozitív kifejezések',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-eq1',
        name: 'Értéke pontosan 1 (= 1)',
        description: 'Azonos értékű kifejezések hányadosa vagy nulladik hatvány',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-gt1',
        name: 'Értéke 1-nél nagyobb (> 1)',
        description: '1-nél nagyobb egész vagy tört értékek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'pps1-1', text: '2⁻³ · 4', categoryId: 'cat-lt1' },
      { id: 'pps1-2', text: '12⁻¹ · 6', categoryId: 'cat-lt1' },
      { id: 'pps1-3', text: '(⅓)²', categoryId: 'cat-lt1' },
      { id: 'pps1-4', text: '5⁻² · 10', categoryId: 'cat-lt1' },

      { id: 'pps1-5', text: '4¹⁵ : 8¹⁰', categoryId: 'cat-eq1' },
      { id: 'pps1-6', text: '6³ : (2³ · 3³)', categoryId: 'cat-eq1' },
      { id: 'pps1-7', text: '10⁻² · 100', categoryId: 'cat-eq1' },
      { id: 'pps1-8', text: '(7 - 6)¹⁰⁰', categoryId: 'cat-eq1' },

      { id: 'pps1-9', text: '(½)⁻³', categoryId: 'cat-gt1' },
      { id: 'pps1-10', text: '2¹⁰ : 2⁶', categoryId: 'cat-gt1' },
      { id: 'pps1-11', text: '3⁴ · 9⁻¹', categoryId: 'cat-gt1' },
      { id: 'pps1-12', text: '2⁵ · 4⁻¹', categoryId: 'cat-gt1' }
    ]
  },
  2: {
    title: 'Prímalap szerinti bontás',
    subtitle: 'Egyszerűsítés után melyik kifejezés írható fel egyetlen prímszám (2 vagy 3) hatványaként?',
    categories: [
      {
        id: 'cat-p2',
        name: '2 tiszta hatványa (2ⁿ)',
        description: 'A legegyszerűbb alak kizárólag a 2 hatványa',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'cat-p3',
        name: '3 tiszta hatványa (3ⁿ)',
        description: 'A legegyszerűbb alak kizárólag a 3 hatványa',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-mixed',
        name: 'Vegyes összetett szám (nem tiszta prímhatvány)',
        description: 'Több különböző prímtényezőt tartalmazó érték',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      }
    ],
    items: [
      { id: 'pps2-1', text: '8³ : 4²', categoryId: 'cat-p2' },
      { id: 'pps2-2', text: '16² · 2⁻³', categoryId: 'cat-p2' },
      { id: 'pps2-3', text: '32 · (½)⁻²', categoryId: 'cat-p2' },
      { id: 'pps2-4', text: '4⁵ : 2³', categoryId: 'cat-p2' },

      { id: 'pps2-5', text: '27² : 9', categoryId: 'cat-p3' },
      { id: 'pps2-6', text: '81 · 3⁻²', categoryId: 'cat-p3' },
      { id: 'pps2-7', text: '9³ · 27⁻¹', categoryId: 'cat-p3' },
      { id: 'pps2-8', text: '(⅓)⁻⁴', categoryId: 'cat-p3' },

      { id: 'pps2-9', text: '12² : 4', categoryId: 'cat-mixed' },
      { id: 'pps2-10', text: '18 · 2', categoryId: 'cat-mixed' },
      { id: 'pps2-11', text: '10³ : 5', categoryId: 'cat-mixed' },
      { id: 'pps2-12', text: '15² : 3', categoryId: 'cat-mixed' }
    ]
  },
  3: {
    title: 'Algebrai kifejezések x-szerinti foka',
    subtitle: 'Egyszerűsítsd a betűs kifejezést, és határozd meg az x változó kitevőjének előjelét!',
    categories: [
      {
        id: 'cat-neg-exp',
        name: 'Negatív kitevőjű x (x⁻ⁿ, n > 0)',
        description: 'Egyszerűsítés után az x a nevezőben marad',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'cat-zero-exp',
        name: 'Nulladfokú / konstans x-ben (x⁰ = 1)',
        description: 'Az x teljesen kiesik az egyszerűsítés során',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      },
      {
        id: 'cat-pos-exp',
        name: 'Pozitív kitevőjű x (xⁿ, n > 0)',
        description: 'Egyszerűsítés után az x pozitív hatványon szerepel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 'pps3-1', text: 'x² : x⁵', categoryId: 'cat-neg-exp' },
      { id: 'pps3-2', text: '(x²)⁻³ · x', categoryId: 'cat-neg-exp' },
      { id: 'pps3-3', text: '(x⁻¹y)³ : (xy³)', categoryId: 'cat-neg-exp' },
      { id: 'pps3-4', text: '1 / (x³ · x²)', categoryId: 'cat-neg-exp' },

      { id: 'pps3-5', text: '(x³)² : x⁶', categoryId: 'cat-zero-exp' },
      { id: 'pps3-6', text: '(x⁻²)⁻³ · x⁻⁶', categoryId: 'cat-zero-exp' },
      { id: 'pps3-7', text: '(x²y)³ : (x⁶y³)', categoryId: 'cat-zero-exp' },
      { id: 'pps3-8', text: 'x⁵ · (x⁻¹ · x⁻⁴)', categoryId: 'cat-zero-exp' },

      { id: 'pps3-9', text: 'x⁷ : x³', categoryId: 'cat-pos-exp' },
      { id: 'pps3-10', text: '(x²)³ : x', categoryId: 'cat-pos-exp' },
      { id: 'pps3-11', text: '(x⁻¹y)⁻² · x', categoryId: 'cat-pos-exp' },
      { id: 'pps3-12', text: '(x⁴y) : y', categoryId: 'cat-pos-exp' }
    ]
  }
};

export const PowersPracticeSorter: React.FC<PowersPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '3. Hatványozás gyakorlása'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Hatványozás gyakorlása csoportosító játék"
      subtitle="Csoportosítsd a kifejezéseket értékük, prímbontásuk és algebrai fokuk szerint!"
      themeColor="purple"
    />
  );
};

