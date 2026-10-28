import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AlgebraicOperationsSorterProps {
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
    title: '1. Szint: Konstans Tag Előjele Zárójelfelbontás Után',
    subtitle: 'Határozd meg a kifejezések konstans (szám) tagjának előjelét!',
    categories: [
      {
        id: 'cat-positive-const',
        name: 'Pozitív Konstans (> 0)',
        description: 'A számérték nagyobb mint 0',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-zero-const',
        name: 'Nincs Konstans Tag (= 0)',
        description: 'Minden tag tartalmaz változót',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-negative-const',
        name: 'Negatív Konstans (< 0)',
        description: 'A számérték kisebb mint 0',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Pozitív konstans
      { id: 'as1-1', label: '-(2x - 7)', category: 'cat-positive-const' }, // -2x + 7
      { id: 'as1-2', label: '(x - 2)(x - 3)', category: 'cat-positive-const' }, // +6
      { id: 'as1-3', label: '3(x + 4) - 2', category: 'cat-positive-const' }, // 12 - 2 = 10
      { id: 'as1-4', label: '-2(-3 - x)', category: 'cat-positive-const' }, // +6
      // Nincs konstans tag (0)
      { id: 'as1-5', label: 'x(2x + 5)', category: 'cat-zero-const' },
      { id: 'as1-6', label: '(3x + 4) - 4', category: 'cat-zero-const' },
      { id: 'as1-7', label: '-x² + 7x', category: 'cat-zero-const' },
      { id: 'as1-8', label: '2x(x - 3) + 6x', category: 'cat-zero-const' },
      // Negatív konstans
      { id: 'as1-9', label: '-(x + 5)', category: 'cat-negative-const' }, // -x - 5
      { id: 'as1-10', label: '(x + 4)(x - 2)', category: 'cat-negative-const' }, // -8
      { id: 'as1-11', label: '2(3x - 4)', category: 'cat-negative-const' }, // -8
      { id: 'as1-12', label: '5 - 3(x + 4)', category: 'cat-negative-const' } // 5 - 12 = -7
    ]
  },
  2: {
    title: '2. Szint: Kifejezések Végső Fokszáma',
    subtitle: 'Végezd el fejben az összevonást, és sorold be a kifejezést a végső fokszáma szerint!',
    categories: [
      {
        id: 'cat-first-degree',
        name: 'Elsőfokú Kifejezés (fok: 1)',
        description: 'A legmagasabb kitevő 1',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-second-degree',
        name: 'Másodfokú Kifejezés (fok: 2)',
        description: 'A legmagasabb kitevő 2',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-third-plus',
        name: 'Harmadfokú vagy Magasabb (fok ≥ 3)',
        description: 'A legmagasabb kitevő legalább 3',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Elsőfokú
      { id: 'as2-1', label: '4x - 2(x + 1)', category: 'cat-first-degree' }, // 2x - 2
      { id: 'as2-2', label: '(x² + 3x) - x²', category: 'cat-first-degree' }, // 3x (x² kiesik!)
      { id: 'as2-3', label: '5(2x - 1)', category: 'cat-first-degree' },
      { id: 'as2-4', label: 'x(x + 2) - x²', category: 'cat-first-degree' }, // 2x (x² kiesik!)
      // Másodfokú
      { id: 'as2-5', label: '(x + 3)(x - 1)', category: 'cat-second-degree' }, // x² + 2x - 3
      { id: 'as2-6', label: '2x(3x - 4)', category: 'cat-second-degree' }, // 6x² - 8x
      { id: 'as2-7', label: '5x² - 3x + 1', category: 'cat-second-degree' },
      { id: 'as2-8', label: '(x³ + 2x²) - x³', category: 'cat-second-degree' }, // 2x² (x³ kiesik!)
      // Harmadfokú vagy magasabb
      { id: 'as2-9', label: 'x²(x - 4)', category: 'cat-third-plus' }, // x³ - 4x²
      { id: 'as2-10', label: 'x · (x + 1)(x - 1)', category: 'cat-third-plus' }, // x³ - x
      { id: 'as2-11', label: '2x³ - 5x + 4', category: 'cat-third-plus' }
    ]
  },
  3: {
    title: '3. Szint: Eredmény Típusa Összevonás Után',
    subtitle: 'Milyen alakú lesz a kifejezés a zárójelek felbontása és összevonása után?',
    categories: [
      {
        id: 'cat-zero',
        name: 'Azonosan Nulla (= 0)',
        description: 'Minden tag kiejti egymást',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-mono',
        name: 'Egytagú (Monom)',
        description: 'Egyetlen tag marad a végén',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-poly',
        name: 'Többtagú (Polinom)',
        description: 'Kettő vagy több tag marad összevonás után',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Azonosan nulla
      { id: 'as3-1', label: '(2x + 3) - (2x + 3)', category: 'cat-zero' },
      { id: 'as3-2', label: '5x² - 5x²', category: 'cat-zero' },
      { id: 'as3-3', label: '3(x - 2) - 3x + 6', category: 'cat-zero' }, // 3x - 6 - 3x + 6 = 0
      // Monom
      { id: 'as3-4', label: '4x² - 7x²', category: 'cat-mono' }, // -3x²
      { id: 'as3-5', label: '(x + 5) - 5', category: 'cat-mono' }, // x
      { id: 'as3-6', label: '2x(3x)', category: 'cat-mono' }, // 6x²
      { id: 'as3-7', label: '3x + 4x', category: 'cat-mono' }, // 7x
      // Polinom
      { id: 'as3-8', label: '(x + 2)(x + 3)', category: 'cat-poly' }, // x² + 5x + 6
      { id: 'as3-9', label: '2x(x - 4)', category: 'cat-poly' }, // 2x² - 8x
      { id: 'as3-10', label: '-(3x - 5)', category: 'cat-poly' }, // -3x + 5
      { id: 'as3-11', label: 'x² + 2x + 1', category: 'cat-poly' }
    ]
  }
};

export const AlgebraicOperationsSorter: React.FC<AlgebraicOperationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'Számolás az algebrában'
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
      themeColor="cyan"
      storageKey="grade9-algebraic-operations-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

