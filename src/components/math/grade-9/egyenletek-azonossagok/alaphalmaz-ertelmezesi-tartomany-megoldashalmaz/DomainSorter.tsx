import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DomainSorterProps {
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
    title: '1. Szint: Kikötés Típusa az Értelmezési Tartományhoz',
    subtitle: 'Milyen matematikai szabály alapján kell kikötést tenni az alábbi kifejezésekre?',
    categories: [
      {
        id: 'cat-denom-zero',
        name: 'Nevező ≠ 0 (Nullával osztás tilalma)',
        description: 'Tört nevezőjében ismeretlen szerepel',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-sqrt-nonneg',
        name: 'Gyökjel alatti ≥ 0 (Nemnegatív)',
        description: 'Páros kitevőjű gyök alatti kifejezés',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-no-restriction',
        name: 'Nincs kikötés (É.T. = ℝ)',
        description: 'Minden valós számra elvégezhető művelet',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Nevező ≠ 0
      { id: 'ds1-1', label: '3 / (x - 5)', category: 'cat-denom-zero' },
      { id: 'ds1-2', label: '(2x + 1) / (x + 8)', category: 'cat-denom-zero' },
      { id: 'ds1-3', label: '7 / (4x - 12)', category: 'cat-denom-zero' },
      { id: 'ds1-4', label: '(x² - 1) / x', category: 'cat-denom-zero' },
      // Gyökjel alatt ≥ 0
      { id: 'ds1-5', label: '√(x - 6)', category: 'cat-sqrt-nonneg' },
      { id: 'ds1-6', label: '√(2x + 10)', category: 'cat-sqrt-nonneg' },
      { id: 'ds1-7', label: '√(7 - x)', category: 'cat-sqrt-nonneg' },
      { id: 'ds1-8', label: '√(3x)', category: 'cat-sqrt-nonneg' },
      // Nincs kikötés
      { id: 'ds1-9', label: '3x² - 5x + 2', category: 'cat-no-restriction' },
      { id: 'ds1-10', label: '(x - 4) / 5 (nevező konstans!)', category: 'cat-no-restriction' },
      { id: 'ds1-11', label: '2(x + 7) - 9', category: 'cat-no-restriction' },
      { id: 'ds1-12', label: '(3x + 1) / 8', category: 'cat-no-restriction' }
    ]
  },
  2: {
    title: '2. Szint: Számok Besorolása a Nevezetes Halmazokba',
    subtitle: 'Melyik számhalmaz a legszűkebb kategória, amelybe az adott érték beletartozik?',
    categories: [
      {
        id: 'cat-natural',
        name: 'Természetes szám (x ∈ ℕ)',
        description: 'Nemnegatív egészek: 0, 1, 2, 3...',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-integer-not-nat',
        name: 'Egész, de nem természetes (x ∈ ℤ \\ ℕ)',
        description: 'Szigorúan negatív egész számok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-real-not-int',
        name: 'Valós, de nem egész (x ∈ ℝ \\ ℤ)',
        description: 'Törtek, tizedestörtek és irracionális számok',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Természetes
      { id: 'ds2-1', label: 'x = 0', category: 'cat-natural' },
      { id: 'ds2-2', label: 'x = 7', category: 'cat-natural' },
      { id: 'ds2-3', label: 'x = 100', category: 'cat-natural' },
      { id: 'ds2-4', label: 'x = 12 / 3 (= 4)', category: 'cat-natural' },
      // Egész, nem természetes (negatív)
      { id: 'ds2-5', label: 'x = -5', category: 'cat-integer-not-nat' },
      { id: 'ds2-6', label: 'x = -1', category: 'cat-integer-not-nat' },
      { id: 'ds2-7', label: 'x = -42', category: 'cat-integer-not-nat' },
      { id: 'ds2-8', label: 'x = -15 / 3 (= -5)', category: 'cat-integer-not-nat' },
      // Valós, nem egész
      { id: 'ds2-9', label: 'x = 2,5', category: 'cat-real-not-int' },
      { id: 'ds2-10', label: 'x = -3 / 4', category: 'cat-real-not-int' },
      { id: 'ds2-11', label: 'x = √2', category: 'cat-real-not-int' },
      { id: 'ds2-12', label: 'x = π', category: 'cat-real-not-int' }
    ]
  },
  3: {
    title: '3. Szint: Gyökök Sorsa az É.T. és Alaphalmaz Alapján',
    subtitle: 'Valódi gyök, a kikötés miatt hamis gyök, vagy az alaphalmaz miatt kieső érték?',
    categories: [
      {
        id: 'cat-valid-root',
        name: 'Valódi gyök (M eleme)',
        description: 'Benne van az É.T.-ben és az Alaphalmazban is',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false-root-denom',
        name: 'Hamis gyök (Kikötés zárja ki: x ∉ É.T.)',
        description: 'Nullával való osztás vagy negatív gyök miatt tilos',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-dropped-base-set',
        name: 'Alaphalmaz miatt esik ki (x ∉ A)',
        description: 'Számolható lenne, de a megadott A kizárja',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Valódi gyök
      { id: 'ds3-1', label: '2x = 6 → x = 3, ha A = ℝ', category: 'cat-valid-root' },
      { id: 'ds3-2', label: 'x² = 25 → x = 5, ha A = ℕ', category: 'cat-valid-root' },
      { id: 'ds3-3', label: '(x - 2)/3 = 1 → x = 5, É.T. = ℝ', category: 'cat-valid-root' },
      { id: 'ds3-4', label: '3x + 1 = 10 → x = 3, ha A = ℤ', category: 'cat-valid-root' },
      // Hamis gyök
      { id: 'ds3-5', label: '(x² - 4)/(x - 2) = 4 → kapott x = 2, de x ≠ 2!', category: 'cat-false-root-denom' },
      { id: 'ds3-6', label: '5/(x - 3) = 5/(x - 3) + 1 → x ≠ 3', category: 'cat-false-root-denom' },
      { id: 'ds3-7', label: '(x - 1)/(x - 1) = 0 → x = 1 nem megengedett', category: 'cat-false-root-denom' },
      { id: 'ds3-8', label: '√(x - 5) = -2 négyzetre emelve x = 9, de √4 ≠ -2!', category: 'cat-false-root-denom' },
      // Alaphalmaz miatt kiesik
      { id: 'ds3-9', label: '2x = 7 → x = 3,5, ha A = ℤ', category: 'cat-dropped-base-set' },
      { id: 'ds3-10', label: 'x + 4 = 1 → x = -3, ha A = ℕ', category: 'cat-dropped-base-set' },
      { id: 'ds3-11', label: 'x² = 3 → x = ±√3, ha A = ℚ', category: 'cat-dropped-base-set' },
      { id: 'ds3-12', label: '4x = 2 → x = 0,5, ha A = ℕ', category: 'cat-dropped-base-set' }
    ]
  }
};

export const DomainSorter: React.FC<DomainSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenlet-alaphalmaz-quiz',
  topicTitle = 'Alaphalmaz, értelmezési tartomány, megoldáshalmaz'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      color="rose"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
