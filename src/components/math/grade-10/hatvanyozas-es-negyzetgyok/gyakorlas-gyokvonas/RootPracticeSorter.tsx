import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RootPracticeSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  allLevels?: boolean;
}

const levels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Értelmezési tartomány típusa',
    subtitle: 'Határozd meg a kifejezés kikötését, és sorold be a reláció jellege alapján!',
    categories: [
      {
        id: 'cat-geq',
        name: 'Alsó korlátos tartomány (x ≥ a)',
        description: 'A gyök alatti x pozitív együtthatójú',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950 dark:text-violet-300'
      },
      {
        id: 'cat-leq',
        name: 'Felső korlátos tartomány (x ≤ a)',
        description: 'A gyök alatti x negatív együtthatójú',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-all',
        name: 'Minden valós számra értelmezett (x ∈ ℝ)',
        description: 'A gyök alatti kifejezés mindig pozitív',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 'rps1-1', text: '√(x - 4)', categoryId: 'cat-geq' },
      { id: 'rps1-2', text: '√(2x - 10)', categoryId: 'cat-geq' },
      { id: 'rps1-3', text: '√(3x + 15)', categoryId: 'cat-geq' },
      { id: 'rps1-4', text: '√(5x - 25)', categoryId: 'cat-geq' },

      { id: 'rps1-5', text: '√(8 - x)', categoryId: 'cat-leq' },
      { id: 'rps1-6', text: '√(12 - 3x)', categoryId: 'cat-leq' },
      { id: 'rps1-7', text: '√(5 - 2x)', categoryId: 'cat-leq' },
      { id: 'rps1-8', text: '√(20 - 4x)', categoryId: 'cat-leq' },

      { id: 'rps1-9', text: '√(x² + 4)', categoryId: 'cat-all' },
      { id: 'rps1-10', text: '√(x² + 9)', categoryId: 'cat-all' },
      { id: 'rps1-11', text: '√(x⁴ + 1)', categoryId: 'cat-all' },
      { id: 'rps1-12', text: '√((x - 2)² + 1)', categoryId: 'cat-all' }
    ]
  },
  2: {
    title: 'Kifejezés értéke az azonosság után',
    subtitle: 'Végezd el a nevezetes azonosságot, és döntsd el az eredmény jellegét!',
    categories: [
      {
        id: 'cat-rat',
        name: 'Racionális nem nulla szám (a - b)',
        description: 'Négyzetek különbsége eltünteti a gyököket',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-irrat',
        name: 'Irracionális szám (megmarad a gyök)',
        description: 'Kéttagú összeg négyzete vegyes szorzattal',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-zero',
        name: 'Pontosan nulla (= 0)',
        description: 'Összevonás után a kifejezés értéke 0',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950 dark:text-violet-300'
      }
    ],
    items: [
      { id: 'rps2-1', text: '(√7 + √2)(√7 - √2)', categoryId: 'cat-rat' },
      { id: 'rps2-2', text: '(3 + √5)(3 - √5)', categoryId: 'cat-rat' },
      { id: 'rps2-3', text: '(√5 + 1)(√5 - 1)', categoryId: 'cat-rat' },
      { id: 'rps2-4', text: '(2√3 + 1)(2√3 - 1)', categoryId: 'cat-rat' },

      { id: 'rps2-5', text: '(√3 + √2)²', categoryId: 'cat-irrat' },
      { id: 'rps2-6', text: '(√5 - 1)²', categoryId: 'cat-irrat' },
      { id: 'rps2-7', text: '(2 + √3)²', categoryId: 'cat-irrat' },
      { id: 'rps2-8', text: '(√7 - 2)²', categoryId: 'cat-irrat' },

      { id: 'rps2-9', text: '√8 - 2√2', categoryId: 'cat-zero' },
      { id: 'rps2-10', text: '√18 - 3√2', categoryId: 'cat-zero' },
      { id: 'rps2-11', text: '(√5)² - 5', categoryId: 'cat-zero' },
      { id: 'rps2-12', text: '(√3 + 1)(√3 - 1) - 2', categoryId: 'cat-zero' }
    ]
  },
  3: {
    title: 'Gyökös egyenlet megoldásszáma',
    subtitle: 'Döntsd el a kikötés és az ellenőrzés alapján, hogy hány valós megoldása van az egyenletnek!',
    categories: [
      {
        id: 'cat-one',
        name: 'Pontosan 1 valós megoldás',
        description: 'Értelmezett, ellenőrizhető egyetlen gyök',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-none',
        name: 'Nincs valós megoldás (0 megoldás)',
        description: 'Negatív gyök vagy hamis gyök az ellenőrzésnél',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'cat-two',
        name: 'Két valós megoldás',
        description: 'Pozitív és negatív gyök is létezik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      }
    ],
    items: [
      { id: 'rps3-1', text: '√(x + 3) = 4', categoryId: 'cat-one' },
      { id: 'rps3-2', text: '√(2x - 1) = 5', categoryId: 'cat-one' },
      { id: 'rps3-3', text: '√x = 6', categoryId: 'cat-one' },
      { id: 'rps3-4', text: '√(3x + 1) = 7', categoryId: 'cat-one' },

      { id: 'rps3-5', text: '√x = -2', categoryId: 'cat-none' },
      { id: 'rps3-6', text: '√(x + 5) = -1', categoryId: 'cat-none' },
      { id: 'rps3-7', text: '√(2x) = -5', categoryId: 'cat-none' },
      { id: 'rps3-8', text: '√(x - 3) + 2 = 0', categoryId: 'cat-none' },

      { id: 'rps3-9', text: 'x² = 25', categoryId: 'cat-two' },
      { id: 'rps3-10', text: 'x² = 49', categoryId: 'cat-two' },
      { id: 'rps3-11', text: '(x - 1)² = 9', categoryId: 'cat-two' },
      { id: 'rps3-12', text: '√(x²) = 4', categoryId: 'cat-two' }
    ]
  }
};

export const RootPracticeSorter: React.FC<RootPracticeSorterProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  allLevels = true
}) => {
  return (
    <SorterTemplate
      title="Négyzetgyök gyakorlása csoportosító"
      subtitle="Kikötések korlátja, azonosságok eredménye és egyenletek gyökszáma"
      themeColor="violet"
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      allLevels={allLevels}
    />
  );
};

export default RootPracticeSorter;

