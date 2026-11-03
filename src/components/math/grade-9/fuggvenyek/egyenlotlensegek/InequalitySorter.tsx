import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface InequalitySorterProps {
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
    title: '1. Szint: Megoldáshalmaz Alakja',
    subtitle: 'Sorold be az egyenlőtlenségeket a megoldáshalmazuk geometriai formája szerint!',
    categories: [
      {
        id: 'cat-shape-inner',
        name: 'Egyetlen Korlátos Intervallum',
        description: 'Belső szakasz két véges határpont között: [a; b] vagy ]a; b[',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-shape-outer',
        name: 'Két Külső Félegyenes (Unió)',
        description: 'Két végtelenbe nyúló szakasz uniója: ]-∞; a[ ∪ ]b; ∞[',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-shape-extremes',
        name: 'Szélső Eset (∅ vagy ℝ)',
        description: 'Üres halmaz (nincs megoldás) vagy minden valós számra igaz',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Belső szakasz
      { id: 'is1-1', label: 'x² ≤ 16 ([-4; 4])', category: 'cat-shape-inner' },
      { id: 'is1-2', label: '|x - 3| < 2 (]1; 5[)', category: 'cat-shape-inner' },
      { id: 'is1-3', label: '-x² + 4 > 0 (]-2; 2[)', category: 'cat-shape-inner' },
      { id: 'is1-4', label: '|x + 1| ≤ 6 ([-7; 5])', category: 'cat-shape-inner' },
      // Két külső félegyenes
      { id: 'is1-5', label: 'x² > 9 (]-∞; -3[ ∪ ]3; ∞[)', category: 'cat-shape-outer' },
      { id: 'is1-6', label: '|x - 2| ≥ 4 (]-∞; -2] ∪ [6; ∞[)', category: 'cat-shape-outer' },
      { id: 'is1-7', label: '(x - 1)² > 4 (]-∞; -1[ ∪ ]3; ∞[)', category: 'cat-shape-outer' },
      { id: 'is1-8', label: '|x| > 7', category: 'cat-shape-outer' },
      // Szélső esetek
      { id: 'is1-9', label: 'x² < -3 (M = ∅)', category: 'cat-shape-extremes' },
      { id: 'is1-10', label: 'x² + 5 > 0 (x ∈ ℝ)', category: 'cat-shape-extremes' },
      { id: 'is1-11', label: '|x| ≥ 0 (minden valós x-re)', category: 'cat-shape-extremes' },
      { id: 'is1-12', label: '|x - 1| ≤ -2 (M = ∅)', category: 'cat-shape-extremes' }
    ]
  },
  2: {
    title: '2. Szint: Határpontok és Zárójelek',
    subtitle: 'Csoportosítsd az egyenlőtlenségeket aszerint, hogy a határpontok hozzátartoznak-e a megoldáshoz!',
    categories: [
      {
        id: 'cat-bracket-open',
        name: 'Nyílt Intervallum (]a; b[)',
        description: 'Szigorú relációjel (<, >), a határpontok nem részei a halmaznak',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-bracket-closed',
        name: 'Zárt Intervallum ([a; b])',
        description: 'Megengedő relációjel (≤, ≥), a határpontok is részei a megoldásnak',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-bracket-half',
        name: 'Félig Nyílt / Félig Zárt',
        description: 'Egyik oldalról zárt, másikról nyílt (pl. [a; ∞[ vagy [0; b[)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Nyílt
      { id: 'is2-1', label: 'x² < 25 (]-5; 5[)', category: 'cat-bracket-open' },
      { id: 'is2-2', label: '|x - 4| < 1 (]3; 5[)', category: 'cat-bracket-open' },
      { id: 'is2-3', label: '3x - 6 < 0 (]-∞; 2[)', category: 'cat-bracket-open' },
      { id: 'is2-4', label: '-x² + 1 > 0 (]-1; 1[)', category: 'cat-bracket-open' },
      // Zárt
      { id: 'is2-5', label: 'x² ≤ 4 ([-2; 2])', category: 'cat-bracket-closed' },
      { id: 'is2-6', label: '|x + 3| ≤ 2 ([-5; -1])', category: 'cat-bracket-closed' },
      { id: 'is2-7', label: '(x - 1)² ≤ 9 ([-2; 4])', category: 'cat-bracket-closed' },
      { id: 'is2-8', label: '-x² + 16 ≥ 0 ([-4; 4])', category: 'cat-bracket-closed' },
      // Félig zárt
      { id: 'is2-9', label: '2x - 8 ≥ 0 ([4; ∞[)', category: 'cat-bracket-half' },
      { id: 'is2-10', label: '√x ≤ 4 ([0; 16])', category: 'cat-bracket-half' },
      { id: 'is2-11', label: '-3x + 9 ≤ 0 ([3; ∞[)', category: 'cat-bracket-half' },
      { id: 'is2-12', label: '√x < 3 ([0; 9[)', category: 'cat-bracket-half' }
    ]
  },
  3: {
    title: '3. Szint: Függvénycsalád Típusa',
    subtitle: 'Sorold be a relációkat a vizsgált függvénytípusuk szerint!',
    categories: [
      {
        id: 'cat-type-linear',
        name: 'Lineáris Egyenlőtlenség',
        description: 'Egyenesek és számegyenesen vizsgálható elsőfokú kifejezések',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-type-quad',
        name: 'Másodfokú Egyenlőtlenség',
        description: 'Parabola és egyenes vagy tengely viszonya',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-type-abs',
        name: 'Abszolútértékes Egyenlőtlenség',
        description: 'V-alakú görbék és távolsági egyenlőtlenségek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Lineáris
      { id: 'is3-1', label: '4x - 5 > 2x + 1', category: 'cat-type-linear' },
      { id: 'is3-2', label: '-3x + 7 ≤ 1', category: 'cat-type-linear' },
      { id: 'is3-3', label: '0.5x + 2 < 4', category: 'cat-type-linear' },
      { id: 'is3-4', label: '2 - x ≥ 3x - 6', category: 'cat-type-linear' },
      // Másodfokú
      { id: 'is3-5', label: 'x² - 6x + 8 ≤ 0', category: 'cat-type-quad' },
      { id: 'is3-6', label: '-x² + 5x - 4 > 0', category: 'cat-type-quad' },
      { id: 'is3-7', label: '(x - 3)² ≥ 4', category: 'cat-type-quad' },
      { id: 'is3-8', label: 'x² < 2x + 3', category: 'cat-type-quad' },
      // Abszolútértékes
      { id: 'is3-9', label: '|x - 5| ≤ 3', category: 'cat-type-abs' },
      { id: 'is3-10', label: '2|x + 1| - 4 > 0', category: 'cat-type-abs' },
      { id: 'is3-11', label: '|2x - 6| < 8', category: 'cat-type-abs' },
      { id: 'is3-12', label: '-|x - 2| + 3 ≥ 0', category: 'cat-type-abs' }
    ]
  }
};

export const InequalitySorter: React.FC<InequalitySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'egyenlotlensegek',
  topicTitle = 'Egyenlőtlenségek Grafikus Megoldása'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      title="Egyenlőtlenségek Csoportosító"
      subtitle="Kategorizáld az egyenlőtlenségeket a megoldáshalmazuk alakja, zárójeleik és függvénytípusuk szerint!"
      levels={sorterLevels}
      currentLevel={activeLevel}
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

