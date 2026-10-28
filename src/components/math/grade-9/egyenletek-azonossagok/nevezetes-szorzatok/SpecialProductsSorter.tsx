import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpecialProductsSorterProps {
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
    title: '1. Szint: Nevezetes Azonosság Típusa',
    subtitle: 'Melyik nevezetes azonosságra vezethető vissza a megadott kifejezés?',
    categories: [
      {
        id: 'cat-sum-sq',
        name: 'Összeg Négyzete',
        description: '(a + b)² = a² + 2ab + b²',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-diff-sq',
        name: 'Különbség Négyzete',
        description: '(a - b)² = a² - 2ab + b²',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-diff-of-sq',
        name: 'Négyzetek Különbsége',
        description: '(a + b)(a - b) = a² - b²',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300'
      }
    ],
    items: [
      // Összeg négyzete
      { id: 'ss1-1', label: '(x + 5)²', category: 'cat-sum-sq' },
      { id: 'ss1-2', label: 'x² + 6x + 9', category: 'cat-sum-sq' },
      { id: 'ss1-3', label: '(2a + 3b)²', category: 'cat-sum-sq' },
      { id: 'ss1-4', label: '4x² + 20x + 25', category: 'cat-sum-sq' },
      // Különbség négyzete
      { id: 'ss1-5', label: '(x - 4)²', category: 'cat-diff-sq' },
      { id: 'ss1-6', label: 'x² - 10x + 25', category: 'cat-diff-sq' },
      { id: 'ss1-7', label: '(3x - 1)²', category: 'cat-diff-sq' },
      { id: 'ss1-8', label: '9a² - 24a + 16', category: 'cat-diff-sq' },
      // Négyzetek különbsége
      { id: 'ss1-9', label: '(x + 7)(x - 7)', category: 'cat-diff-of-sq' },
      { id: 'ss1-10', label: 'x² - 49', category: 'cat-diff-of-sq' },
      { id: 'ss1-11', label: '(2x + 5)(2x - 5)', category: 'cat-diff-of-sq' },
      { id: 'ss1-12', label: '4a² - 9b²', category: 'cat-diff-of-sq' }
    ]
  },
  2: {
    title: '2. Szint: Tagok Száma a Kibontás Után',
    subtitle: 'Hány tagú lesz a kifejezés a zárójelek felbontása és összevonása után?',
    categories: [
      {
        id: 'cat-binom',
        name: 'Kéttagú (Binom: a² - b²)',
        description: 'A vegyes tagok kiejtik egymást',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300'
      },
      {
        id: 'cat-trinom',
        name: 'Háromtagú (Trinom: a² ± 2ab + b²)',
        description: 'Teljes négyzet kifejtése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-four-term',
        name: 'Nem Nevezetes (Nem teljes négyzet)',
        description: 'Különböző együtthatók szorzata',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      // Kéttagú
      { id: 'ss2-1', label: '(x + 3)(x - 3)', category: 'cat-binom' }, // x² - 9
      { id: 'ss2-2', label: '(2x + 1)(2x - 1)', category: 'cat-binom' }, // 4x² - 1
      { id: 'ss2-3', label: '(5 - x)(5 + x)', category: 'cat-binom' }, // 25 - x²
      { id: 'ss2-4', label: '(3a + 4b)(3a - 4b)', category: 'cat-binom' },
      // Háromtagú
      { id: 'ss2-5', label: '(x + 4)²', category: 'cat-trinom' },
      { id: 'ss2-6', label: '(2x - 3)²', category: 'cat-trinom' },
      { id: 'ss2-7', label: '(x - 6)²', category: 'cat-trinom' },
      { id: 'ss2-8', label: '(3x + 5y)²', category: 'cat-trinom' },
      // Nem nevezetes / egyéb
      { id: 'ss2-9', label: '(x + 2)(x + 5)', category: 'cat-four-term' }, // x² + 7x + 10
      { id: 'ss2-10', label: '(x - 3)(x + 4)', category: 'cat-four-term' },
      { id: 'ss2-11', label: '(2x + 1)(x - 3)', category: 'cat-four-term' }
    ]
  },
  3: {
    title: '3. Szint: A Középső Tag Előjele',
    subtitle: 'Határozd meg a kifejtett kifejezés elsőfokú (középső) tagjának előjelét!',
    categories: [
      {
        id: 'cat-pos-mid',
        name: 'Pozitív Középső Tag (+2ab)',
        description: 'A lineáris tag előjele pozitív',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-zero-mid',
        name: 'Nincs Középső Tag (0)',
        description: 'A keresztszorzatok kiejtik egymást',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-neg-mid',
        name: 'Negatív Középső Tag (-2ab)',
        description: 'A lineáris tag előjele negatív',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Pozitív
      { id: 'ss3-1', label: '(x + 7)²', category: 'cat-pos-mid' },
      { id: 'ss3-2', label: '(3x + 2)²', category: 'cat-pos-mid' },
      { id: 'ss3-3', label: '(-x - 4)²', category: 'cat-pos-mid' }, // = (x + 4)² -> +8x!
      { id: 'ss3-4', label: '(2x + 5)²', category: 'cat-pos-mid' },
      // Nulla
      { id: 'ss3-5', label: '(x + 9)(x - 9)', category: 'cat-zero-mid' },
      { id: 'ss3-6', label: '(4x + 3)(4x - 3)', category: 'cat-zero-mid' },
      { id: 'ss3-7', label: '(1 - 2x)(1 + 2x)', category: 'cat-zero-mid' },
      // Negatív
      { id: 'ss3-8', label: '(x - 6)²', category: 'cat-neg-mid' },
      { id: 'ss3-9', label: '(5x - 1)²', category: 'cat-neg-mid' },
      { id: 'ss3-10', label: '(2 - 3x)²', category: 'cat-neg-mid' },
      { id: 'ss3-11', label: '-(x + 3)²', category: 'cat-neg-mid' } // -x² - 6x - 9
    ]
  }
};

export const SpecialProductsSorter: React.FC<SpecialProductsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'Nevezetes szorzatok'
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
      themeColor="purple"
      storageKey="grade9-special-products-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};
