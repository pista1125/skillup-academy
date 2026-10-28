import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VariablesSorterProps {
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
    title: '1. Szint: Kifejezések Szerkezeti Besorolása',
    subtitle: 'Sorold be a kifejezéseket a szerkezeti típusuk szerint a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-monomial',
        name: 'Monom (Egytagú)',
        description: 'Csak szorzás és hatványozás, nincsenek tagok összeadva',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-polynomial',
        name: 'Polinom (Többtagú)',
        description: 'Tagok algebrai összege vagy különbsége',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-fraction',
        name: 'Algebrai Tört',
        description: 'A nevezőben is változó szerepel',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Monom
      { id: 'vs1-1', label: '5x³', category: 'cat-monomial' },
      { id: 'vs1-2', label: '-7a²b', category: 'cat-monomial' },
      { id: 'vs1-3', label: '42', category: 'cat-monomial' },
      { id: 'vs1-4', label: '-x', category: 'cat-monomial' },
      // Polinom
      { id: 'vs1-5', label: '3x - 5', category: 'cat-polynomial' },
      { id: 'vs1-6', label: '2x² - 4x + 7', category: 'cat-polynomial' },
      { id: 'vs1-7', label: 'a³ - b³', category: 'cat-polynomial' },
      { id: 'vs1-8', label: '5x + 2y - z', category: 'cat-polynomial' },
      // Algebrai tört
      { id: 'vs1-9', label: '4 / x', category: 'cat-fraction' },
      { id: 'vs1-10', label: '(x + 1) / (x - 3)', category: 'cat-fraction' },
      { id: 'vs1-11', label: '5 / (a + b)', category: 'cat-fraction' }
    ]
  },
  2: {
    title: '2. Szint: Helyettesítési Érték Előjele (x = -2 esetén)',
    subtitle: 'Határozd meg a kifejezések értékét az x = -2 helyen, és sorold be előjelük szerint!',
    categories: [
      {
        id: 'cat-negative',
        name: 'Negatív Érték (< 0)',
        description: 'Az eredmény kisebb mint 0',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-zero',
        name: 'Pontosan Nulla (= 0)',
        description: 'Az eredmény 0 (a kifejezés zérushelye)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-positive',
        name: 'Pozitív Érték (> 0)',
        description: 'Az eredmény nagyobb mint 0',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Negatív
      { id: 'vs2-1', label: '3x - 1', category: 'cat-negative' }, // 3(-2)-1 = -7
      { id: 'vs2-2', label: '-x²', category: 'cat-negative' }, // -(-2)^2 = -4
      { id: 'vs2-3', label: 'x³', category: 'cat-negative' }, // (-2)^3 = -8
      { id: 'vs2-4', label: '4x', category: 'cat-negative' }, // 4(-2) = -8
      // Nulla
      { id: 'vs2-5', label: 'x + 2', category: 'cat-zero' }, // -2 + 2 = 0
      { id: 'vs2-6', label: 'x² - 4', category: 'cat-zero' }, // (-2)^2 - 4 = 0
      { id: 'vs2-7', label: '2x + 4', category: 'cat-zero' }, // 2(-2) + 4 = 0
      // Pozitív
      { id: 'vs2-8', label: 'x²', category: 'cat-positive' }, // (-2)^2 = 4
      { id: 'vs2-9', label: '-3x', category: 'cat-positive' }, // -3(-2) = 6
      { id: 'vs2-10', label: '5 - 2x', category: 'cat-positive' }, // 5 - 2(-2) = 9
      { id: 'vs2-11', label: '(-x)²', category: 'cat-positive' } // (-(-2))^2 = 4
    ]
  },
  3: {
    title: '3. Szint: Egynemű Kifejezések Csoportosítása',
    subtitle: 'Válogasd szét a kifejezéseket a betűs részük alapján azonos csoportokba!',
    categories: [
      {
        id: 'cat-x-sq',
        name: 'x²-es Tagok',
        description: 'Betűs rész: x²',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-xy',
        name: 'xy-os Tagok',
        description: 'Betűs rész: xy (vagy yx)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-x-sq-y',
        name: 'x²y-os Tagok',
        description: 'Betűs rész: x²y',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-x-y-sq',
        name: 'xy²-es Tagok',
        description: 'Betűs rész: xy²',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // x²
      { id: 'vs3-1', label: '4x²', category: 'cat-x-sq' },
      { id: 'vs3-2', label: '-x²', category: 'cat-x-sq' },
      { id: 'vs3-3', label: '(1/2)x²', category: 'cat-x-sq' },
      // xy
      { id: 'vs3-4', label: '3xy', category: 'cat-xy' },
      { id: 'vs3-5', label: '-5yx', category: 'cat-xy' },
      { id: 'vs3-6', label: 'xy', category: 'cat-xy' },
      // x²y
      { id: 'vs3-7', label: '5x²y', category: 'cat-x-sq-y' },
      { id: 'vs3-8', label: '-2x²y', category: 'cat-x-sq-y' },
      { id: 'vs3-9', label: 'yx²', category: 'cat-x-sq-y' },
      // xy²
      { id: 'vs3-10', label: '3xy²', category: 'cat-x-y-sq' },
      { id: 'vs3-11', label: '-xy²', category: 'cat-x-y-sq' },
      { id: 'vs3-12', label: '7y²x', category: 'cat-x-y-sq' }
    ]
  }
};

export const VariablesSorter: React.FC<VariablesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'A betűk szerepe a számolásban'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-variables-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

