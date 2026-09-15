import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'neg', name: 'Negatív számok (< 0)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300' },
      { id: 'zero', name: 'Nulla (= 0, origó)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200' },
      { id: 'pos', name: 'Pozitív számok (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ],
    items: [
      { id: 's1-1', label: '-8', category: 'neg' },
      { id: 's1-2', label: '+15', category: 'pos' },
      { id: 's1-3', label: '-24', category: 'neg' },
      { id: 's1-4', label: '0', category: 'zero' },
      { id: 's1-5', label: '+100', category: 'pos' },
      { id: 's1-6', label: '-3', category: 'neg' },
      { id: 's1-7', label: '+7', category: 'pos' },
      { id: 's1-8', label: '-1', category: 'neg' },
      { id: 's1-9', label: '0 Ft', category: 'zero' },
      { id: 's1-10', label: '+45', category: 'pos' }
    ]
  },
  2: {
    categories: [
      { id: 'neg', name: 'Fagy / Mélység / Tartozás (-)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300' },
      { id: 'zero', name: 'Semleges / Alappont (0)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200' },
      { id: 'pos', name: 'Meleg / Magasság / Megtakarítás (+)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ],
    items: [
      { id: 's2-1', label: '12 °C fagy', category: 'neg' },
      { id: 's2-2', label: '4. emelet', category: 'pos' },
      { id: 's2-3', label: '3 000 Ft adósság', category: 'neg' },
      { id: 's2-4', label: 'Tengerszint (0 m)', category: 'zero' },
      { id: 's2-5', label: '28 méterrel a tengerszint alatt', category: 'neg' },
      { id: 's2-6', label: 'Víz fagyáspontja', category: 'zero' },
      { id: 's2-7', label: '20 000 Ft megtakarítás', category: 'pos' },
      { id: 's2-8', label: '2. mélygarázs szint', category: 'neg' },
      { id: 's2-9', label: '25 °C nyári meleg', category: 'pos' },
      { id: 's2-10', label: 'Földszint a liftben', category: 'zero' }
    ]
  },
  3: {
    categories: [
      { id: 'deep_neg', name: 'Kisebb, mint -5 (< -5)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300' },
      { id: 'mid_neg', name: '-5 és 0 közé esik', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300' },
      { id: 'pos', name: 'Nagyobb, mint 0 (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ],
    items: [
      { id: 's3-1', label: '-12', category: 'deep_neg' },
      { id: 's3-2', label: '-3', category: 'mid_neg' },
      { id: 's3-3', label: '+8', category: 'pos' },
      { id: 's3-4', label: '-20', category: 'deep_neg' },
      { id: 's3-5', label: '-1', category: 'mid_neg' },
      { id: 's3-6', label: '+1', category: 'pos' },
      { id: 's3-7', label: '-50', category: 'deep_neg' },
      { id: 's3-8', label: '-4', category: 'mid_neg' },
      { id: 's3-9', label: '+100', category: 'pos' },
      { id: 's3-10', label: '-2', category: 'mid_neg' }
    ]
  }
};

export interface NegativeNumbersSorterProps {
  onBack: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
}

export function NegativeNumbersSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level = 1
}: NegativeNumbersSorterProps) {
  return (
    <SorterTemplate
      title="Negatív számok - Csoportosító Játék"
      badge="❄️ 5. Osztály • I. Az egész számok"
      level={level}
      levels={SORTER_LEVELS}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default NegativeNumbersSorter;
