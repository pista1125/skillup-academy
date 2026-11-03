import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AbsEquationSorterProps {
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
    title: '1. Szint: Megoldások Száma',
    subtitle: 'Sorold be az abszolút értékes egyenleteket a valós gyökeik száma szerint!',
    categories: [
      {
        id: 'cat-roots-zero',
        name: '0 Megoldás (∅)',
        description: 'Nincs olyan valós szám, amely kielégítené az egyenletet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-roots-one',
        name: '1 Megoldás',
        description: 'Pontosan egyetlen valós gyök létezik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-roots-two',
        name: '2 Megoldás',
        description: 'Pontosan két különböző valós gyök létezik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-roots-inf',
        name: 'Végtelen Sok Megoldás',
        description: 'Egy egész intervallum vagy az összes valós szám megoldás',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      // 0 megoldás
      { id: 'as1-1', label: '|x - 3| = -2', category: 'cat-roots-zero' },
      { id: 'as1-2', label: '|2x + 1| = -5', category: 'cat-roots-zero' },
      { id: 'as1-3', label: '|x - 2| + |x - 6| = 2', category: 'cat-roots-zero' },
      // 1 megoldás
      { id: 'as1-4', label: '|x - 7| = 0', category: 'cat-roots-one' },
      { id: 'as1-5', label: '|x - 2| = |x - 8|', category: 'cat-roots-one' },
      { id: 'as1-6', label: '|x + 3| = 0', category: 'cat-roots-one' },
      // 2 megoldás
      { id: 'as1-7', label: '|x| = 5', category: 'cat-roots-two' },
      { id: 'as1-8', label: '|x - 4| = 3', category: 'cat-roots-two' },
      { id: 'as1-9', label: '|2x - 6| = 4', category: 'cat-roots-two' },
      // Végtelen sok
      { id: 'as1-10', label: '|x - 5| = |5 - x|', category: 'cat-roots-inf' },
      { id: 'as1-11', label: '|x - 1| + |x - 4| = 3', category: 'cat-roots-inf' },
      { id: 'as1-12', label: '|3x - 9| = 3|x - 3|', category: 'cat-roots-inf' }
    ]
  },
  2: {
    title: '2. Szint: Leggyorsabb Megoldási Módszer',
    subtitle: 'Döntsd el, melyik módszerrel oldható meg leggyorsabban és legbiztosabban az egyenlet!',
    categories: [
      {
        id: 'cat-method-dist',
        name: 'Távolság a Számegyenesen',
        description: '|x - a| = b alak: a ponttól b távolságra lévő pontok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-method-mid',
        name: 'Felezőpont Számítás',
        description: '|x - a| = |x - b| alak: két megadott ponttól egyenlő távolság',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-method-cases',
        name: 'Algebrai Esetszétválasztás',
        description: 'Változó a jobb oldalon vagy több eltérő abszolút érték összege',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Távolság
      { id: 'as2-1', label: '|x - 4| = 7', category: 'cat-method-dist' },
      { id: 'as2-2', label: '|x + 5| = 2', category: 'cat-method-dist' },
      { id: 'as2-3', label: '|x - 10| = 1', category: 'cat-method-dist' },
      { id: 'as2-4', label: '|x| = 8', category: 'cat-method-dist' },
      // Felezőpont
      { id: 'as2-5', label: '|x - 3| = |x - 9|', category: 'cat-method-mid' },
      { id: 'as2-6', label: '|x + 2| = |x - 10|', category: 'cat-method-mid' },
      { id: 'as2-7', label: '|x - 1| = |x + 7|', category: 'cat-method-mid' },
      { id: 'as2-8', label: '|x - 100| = |x - 200|', category: 'cat-method-mid' },
      // Esetszétválasztás
      { id: 'as2-9', label: '|2x - 3| = x + 4', category: 'cat-method-cases' },
      { id: 'as2-10', label: '|x - 1| + |x - 5| = 8', category: 'cat-method-cases' },
      { id: 'as2-11', label: '|3x + 2| = 2x - 1', category: 'cat-method-cases' },
      { id: 'as2-12', label: '|x| + 2x = 9', category: 'cat-method-cases' }
    ]
  },
  3: {
    title: '3. Szint: A Megoldáshalmaz Alakja',
    subtitle: 'Csoportosítsd az egyenleteket a megoldáshalmazuk matematikai jellege alapján!',
    categories: [
      {
        id: 'cat-set-empty',
        name: 'Üres Halmaz (∅)',
        description: 'Ellentmondás, nincs megoldás',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      },
      {
        id: 'cat-set-discrete',
        name: 'Diszkrét Pont(ok) ({x₁} vagy {x₁, x₂})',
        description: 'Egy vagy két különálló diszkrét pont a számegyenesen',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-set-continuous',
        name: 'Folytonos Intervallum vagy Teljes ℝ',
        description: 'Egy zárt intervallum [a; b], félegyenes vagy az összes valós szám',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Üres
      { id: 'as3-1', label: '|x - 6| = -1', category: 'cat-set-empty' },
      { id: 'as3-2', label: '|x + 2| + |x - 4| = 3 (szakasz hossza 6 > 3)', category: 'cat-set-empty' },
      { id: 'as3-3', label: '|x| = -|x + 1| - 2', category: 'cat-set-empty' },
      { id: 'as3-4', label: '|2x - 5| = -0.5', category: 'cat-set-empty' },
      // Diszkrét
      { id: 'as3-5', label: '|x - 3| = 4 ({-1; 7})', category: 'cat-set-discrete' },
      { id: 'as3-6', label: '|x + 5| = 0 ({-5})', category: 'cat-set-discrete' },
      { id: 'as3-7', label: '|x - 2| = |x - 6| ({4})', category: 'cat-set-discrete' },
      { id: 'as3-8', label: '|2x - 4| = x + 1 ({1; 5})', category: 'cat-set-discrete' },
      // Folytonos intervallum vagy ℝ
      { id: 'as3-9', label: '|x - 2| + |x - 7| = 5 ([2; 7])', category: 'cat-set-continuous' },
      { id: 'as3-10', label: '|x - a| = |a - x| (ℝ)', category: 'cat-set-continuous' },
      { id: 'as3-11', label: '|x| - x = 0 ([0; ∞[)', category: 'cat-set-continuous' },
      { id: 'as3-12', label: '|x| + x = 0 (]-∞; 0])', category: 'cat-set-continuous' }
    ]
  }
};

export const AbsEquationSorter: React.FC<AbsEquationSorterProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-abszolut-egyenletek-sorter',
  topicTitle = 'Abszolút Értékes Egyenletek Rendszerező'
}) => {
  const activeLevel = level ?? currentLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={currentLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

