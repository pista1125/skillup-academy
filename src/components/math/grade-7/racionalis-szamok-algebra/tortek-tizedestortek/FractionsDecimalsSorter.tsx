import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionsDecimalsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'cat-valodi', name: 'Valódi tört (< 1)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-egesz', name: 'Egész szám (1 vagy egész)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-altort', name: 'Áltört / Vegyes szám (> 1)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
    ],
    items: [
      { id: 's1', label: '2/5', category: 'cat-valodi' },
      { id: 's2', label: '7/8', category: 'cat-valodi' },
      { id: 's3', label: '1/3', category: 'cat-valodi' },
      { id: 's4', label: '4/4', category: 'cat-egesz' },
      { id: 's5', label: '12/4 (= 3)', category: 'cat-egesz' },
      { id: 's6', label: '0/5 (= 0)', category: 'cat-egesz' },
      { id: 's7', label: '5/3', category: 'cat-altort' },
      { id: 's8', label: '9/4', category: 'cat-altort' },
      { id: 's9', label: '2 és 1/3', category: 'cat-altort' },
      { id: 's10', label: '7/2', category: 'cat-altort' },
    ]
  },
  2: {
    categories: [
      { id: 'cat-veges', name: 'Véges tizedestört', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-tiszta', name: 'Tiszta szakaszos tizedes', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-vegyes', name: 'Vegyes szakaszos tizedes', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      { id: 's11', label: '3/8 (0,375)', category: 'cat-veges' },
      { id: 's12', label: '7/20 (0,35)', category: 'cat-veges' },
      { id: 's13', label: '9/25 (0,36)', category: 'cat-veges' },
      { id: 's14', label: '1/2 (0,5)', category: 'cat-veges' },
      { id: 's15', label: '1/3 (0,3̇)', category: 'cat-tiszta' },
      { id: 's16', label: '2/9 (0,2̇)', category: 'cat-tiszta' },
      { id: 's17', label: '4/11 (0,3̇6̇)', category: 'cat-tiszta' },
      { id: 's18', label: '1/6 (0,16̇)', category: 'cat-vegyes' },
      { id: 's19', label: '5/6 (0,83̇)', category: 'cat-vegyes' },
      { id: 's20', label: '7/15 (0,46̇)', category: 'cat-vegyes' },
    ]
  },
  3: {
    categories: [
      { id: 'cat-neg', name: 'Értéke < 0 (Negatív)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-mid', name: 'Értéke 0 és 0,5 között', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-high', name: 'Értéke ≥ 0,5 (Fél vagy több)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    ],
    items: [
      { id: 's21', label: '-3/4', category: 'cat-neg' },
      { id: 's22', label: '-0,25', category: 'cat-neg' },
      { id: 's23', label: '-1 és 1/2', category: 'cat-neg' },
      { id: 's24', label: '-(+5/6)', category: 'cat-neg' },
      { id: 's25', label: '1/5 (0,2)', category: 'cat-mid' },
      { id: 's26', label: '3/8 (0,375)', category: 'cat-mid' },
      { id: 's27', label: '1/3 (0,33̇)', category: 'cat-mid' },
      { id: 's28', label: '1/2 (0,5)', category: 'cat-high' },
      { id: 's29', label: '3/4 (0,75)', category: 'cat-high' },
      { id: 's30', label: '5/6 (0,83̇)', category: 'cat-high' },
    ]
  }
};

export const FractionsDecimalsSorter: React.FC<FractionsDecimalsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Törtek és Tizedestörtek Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a törteket és tizedestörteket a megfelelő kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
