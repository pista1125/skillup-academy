import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalOperationsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'cat-lt1', name: 'Értéke < 1 (Valódi tört)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-eq1', name: 'Értéke = 1 (Egész egység)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-gt1', name: 'Értéke > 1 (Egésznél nagyobb)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      { id: 's1', label: '1/3 + 1/3', category: 'cat-lt1' },
      { id: 's2', label: '3/4 - 1/2', category: 'cat-lt1' },
      { id: 's3', label: '(2/5) · (1/2)', category: 'cat-lt1' },
      { id: 's4', label: '2/3 + 1/3', category: 'cat-eq1' },
      { id: 's5', label: '(3/4) · (4/3)', category: 'cat-eq1' },
      { id: 's6', label: '(5/8) : (5/8)', category: 'cat-eq1' },
      { id: 's7', label: '2/3 + 3/4', category: 'cat-gt1' },
      { id: 's8', label: '(5/2) : (1/2)', category: 'cat-gt1' },
      { id: 's9', label: '1 + 2/3', category: 'cat-gt1' },
      { id: 's10', label: '3 · (2/3)', category: 'cat-gt1' },
    ]
  },
  2: {
    categories: [
      { id: 'cat-neg', name: 'Negatív eredmény (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-zero', name: 'Nulla (= 0)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300' },
      { id: 'cat-pos', name: 'Pozitív eredmény (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    ],
    items: [
      { id: 's11', label: '-1/2 + 1/3', category: 'cat-neg' },
      { id: 's12', label: '1/4 - 3/4', category: 'cat-neg' },
      { id: 's13', label: '(-2/3) · (3/4)', category: 'cat-neg' },
      { id: 's14', label: '3/5 - 3/5', category: 'cat-zero' },
      { id: 's15', label: '0 · (-4/7)', category: 'cat-zero' },
      { id: 's16', label: '0 : (5/9)', category: 'cat-zero' },
      { id: 's17', label: '(-2/3) · (-3/2)', category: 'cat-pos' },
      { id: 's18', label: '1/2 + 1/4', category: 'cat-pos' },
      { id: 's19', label: '(-3/4) : (-1/2)', category: 'cat-pos' },
      { id: 's20', label: '5/6 - 1/3', category: 'cat-pos' },
    ]
  },
  3: {
    categories: [
      { id: 'cat-low', name: 'Értéke < 0,5 (Félnél kisebb)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-mid', name: '0,5 és 1 között', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-high', name: 'Értéke ≥ 1 (Egy vagy több)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    ],
    items: [
      { id: 's21', label: '1/4 + 1/8', category: 'cat-low' },
      { id: 's22', label: '(2/3) · (1/2)', category: 'cat-low' },
      { id: 's23', label: '1/2 - 1/6', category: 'cat-low' },
      { id: 's24', label: '(3/4) · (4/5)', category: 'cat-mid' },
      { id: 's25', label: '1/3 + 1/4', category: 'cat-mid' },
      { id: 's26', label: '5/6 - 1/6', category: 'cat-mid' },
      { id: 's27', label: '2/3 + 2/3', category: 'cat-high' },
      { id: 's28', label: '(3/4) : (1/2)', category: 'cat-high' },
      { id: 's29', label: '2 · (3/4)', category: 'cat-high' },
      { id: 's30', label: '(5/6) : (5/6)', category: 'cat-high' },
    ]
  }
};

export const RationalOperationsSorter: React.FC<RationalOperationsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Racionális Műveletek Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a kifejezéseket a megfelelő értékcsoportba!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
