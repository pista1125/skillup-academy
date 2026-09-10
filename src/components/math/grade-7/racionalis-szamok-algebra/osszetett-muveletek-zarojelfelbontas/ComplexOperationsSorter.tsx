import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComplexOperationsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'cat-paren', name: 'Zárójel belseje először', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-multdiv', name: 'Szorzás / Osztás először', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-leftright', name: 'Balról jobbra elvégzendő', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      { id: 's1', label: '12 + 3 · (4 - 1)', category: 'cat-paren' },
      { id: 's2', label: '20 : (2 + 3)', category: 'cat-paren' },
      { id: 's3', label: '(8 - 3) · 4', category: 'cat-paren' },
      { id: 's4', label: '15 - 3 · 4', category: 'cat-multdiv' },
      { id: 's5', label: '8 + 12 : 4', category: 'cat-multdiv' },
      { id: 's6', label: '20 - 4 · 2 + 5', category: 'cat-multdiv' },
      { id: 's7', label: '12 - 5 + 3', category: 'cat-leftright' },
      { id: 's8', label: '18 : 3 · 2', category: 'cat-leftright' },
      { id: 's9', label: '25 + 10 - 8', category: 'cat-leftright' },
      { id: 's10', label: '30 : 5 : 2', category: 'cat-leftright' },
    ]
  },
  2: {
    categories: [
      { id: 'cat-same', name: 'Változatlan előjelek: +(...) ', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-flip', name: 'Előjelek megfordulnak: -(...) ', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-distrib', name: 'Szorzással felbontandó: c · (...)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    ],
    items: [
      { id: 's11', label: '+(a - b + c)', category: 'cat-same' },
      { id: 's12', label: '8 + (3x - 5)', category: 'cat-same' },
      { id: 's13', label: '12 + (-4 + 7)', category: 'cat-same' },
      { id: 's14', label: '-(a + b)', category: 'cat-flip' },
      { id: 's15', label: '-(x - y + 2)', category: 'cat-flip' },
      { id: 's16', label: '10 - (4 - 3x)', category: 'cat-flip' },
      { id: 's17', label: '-(-a - b)', category: 'cat-flip' },
      { id: 's18', label: '3 · (2x - 4)', category: 'cat-distrib' },
      { id: 's19', label: '-2 · (x + 5)', category: 'cat-distrib' },
      { id: 's20', label: '4 · (1/2 - 3/4)', category: 'cat-distrib' },
    ]
  },
  3: {
    categories: [
      { id: 'cat-pos', name: 'Pozitív eredmény (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-zero', name: 'Eredmény pontosan 0', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-neg', name: 'Negatív eredmény (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
    ],
    items: [
      { id: 's21', label: '15 - 2 · 4  (= 7)', category: 'cat-pos' },
      { id: 's22', label: '-3 · (-4) - 2  (= 10)', category: 'cat-pos' },
      { id: 's23', label: '20 - [ 5 - (3 - 8) ]  (= 10)', category: 'cat-pos' },
      { id: 's24', label: '8 - 2 · 4  (= 0)', category: 'cat-zero' },
      { id: 's25', label: '-5 · (3 - 3)  (= 0)', category: 'cat-zero' },
      { id: 's26', label: '(12 - 4 · 3) / 5  (= 0)', category: 'cat-zero' },
      { id: 's27', label: '10 - 3 · 5  (= -5)', category: 'cat-neg' },
      { id: 's28', label: '-4 · (2 + 3)  (= -20)', category: 'cat-neg' },
      { id: 's29', label: '(5 - 15) / 2  (= -5)', category: 'cat-neg' },
      { id: 's30', label: '3/4 - 1/2 · 3  (= -3/4)', category: 'cat-neg' },
    ]
  }
};

export const ComplexOperationsSorter: React.FC<ComplexOperationsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Összetett Műveletek Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a kifejezéseket a megfelelő prioritási vagy előjeles kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
