import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface IntegerPropertiesSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'cat-pos', name: 'Pozitív szám (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-neg', name: 'Negatív szám (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-zero', name: 'Nulla (= 0)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300' },
    ],
    items: [
      { id: 's1', label: '+15', category: 'cat-pos' },
      { id: 's2', label: '-18', category: 'cat-neg' },
      { id: 's3', label: '0', category: 'cat-zero' },
      { id: 's4', label: '|-7|', category: 'cat-pos' },
      { id: 's5', label: '-(-6)', category: 'cat-pos' },
      { id: 's6', label: '-(+9)', category: 'cat-neg' },
      { id: 's7', label: '5 + (-5)', category: 'cat-zero' },
      { id: 's8', label: '-4 + (-8)', category: 'cat-neg' },
      { id: 's9', label: '(-3) · (-2)', category: 'cat-pos' },
      { id: 's10', label: '0 · (-12)', category: 'cat-zero' },
    ]
  },
  2: {
    categories: [
      { id: 'cat-lt0', name: 'Értéke < 0 (Negatív)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-eq0', name: 'Értéke = 0', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300' },
      { id: 'cat-gt0', name: 'Értéke > 0 (Pozitív)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    ],
    items: [
      { id: 's11', label: '(-5) + 3', category: 'cat-lt0' },
      { id: 's12', label: '(-4) · (-5)', category: 'cat-gt0' },
      { id: 's13', label: '(-15) : 3', category: 'cat-lt0' },
      { id: 's14', label: '12 - 12', category: 'cat-eq0' },
      { id: 's15', label: '(-2) · (-3) · (-4)', category: 'cat-lt0' },
      { id: 's16', label: '(-1) · (-1) · (-1) · (-1)', category: 'cat-gt0' },
      { id: 's17', label: '0 : (-8)', category: 'cat-eq0' },
      { id: 's18', label: '|-10| - 10', category: 'cat-eq0' },
      { id: 's19', label: '8 - (-4)', category: 'cat-gt0' },
      { id: 's20', label: '(-10) + (-2)', category: 'cat-lt0' },
    ]
  },
  3: {
    categories: [
      { id: 'cat-comm', name: 'Kommutativitás (Felcserélhetőség)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
      { id: 'cat-noncomm', name: 'Nem kommutatív művelet', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-ident', name: 'Disztributivitás / Széttagolás', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      { id: 's21', label: 'a + b = b + a', category: 'cat-comm' },
      { id: 's22', label: 'a · b = b · a', category: 'cat-comm' },
      { id: 's23', label: 'a - b ≠ b - a', category: 'cat-noncomm' },
      { id: 's24', label: 'a : b ≠ b : a', category: 'cat-noncomm' },
      { id: 's25', label: 'a · (b + c) = ab + ac', category: 'cat-ident' },
      { id: 's26', label: '(a + b) : c = a:c + b:c', category: 'cat-ident' },
      { id: 's27', label: '(-3) + 7 = 7 + (-3)', category: 'cat-comm' },
      { id: 's28', label: '12 - 5 ≠ 5 - 12', category: 'cat-noncomm' },
      { id: 's29', label: '(-4) · 9 = 9 · (-4)', category: 'cat-comm' },
      { id: 's30', label: '5 · (10 - 2) = 50 - 10', category: 'cat-ident' },
    ]
  }
};

export const IntegerPropertiesSorter: React.FC<IntegerPropertiesSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Egész Számok Csoportosító"
      subtitle="Válaszd ki a kártyát, majd kattints a megfelelő kategóriára a besoroláshoz!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
