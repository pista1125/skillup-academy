import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FindSolutionsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FindSolutionsSorter: React.FC<FindSolutionsSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: MŰVELETI SZABÁLYOK ÉS VESZÉLYEK
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-simple-inverse',
          name: 'Egyszerű fordított művelet (+ helyett −, · helyett :)',
          description: 'Összeadás és szorzás lebontása a szokásos ellentétes művelettel',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-head-inverse',
          name: 'Kisebbítendő vagy Osztandó keresése (− helyett +, : helyett ·)',
          description: 'A kivonás vagy osztás legelső tagja ismeretlen',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-tricky',
          name: 'Trükkös: Kivonandó vagy Osztó keresése (NEM fordítunk műveletet!)',
          description: '40 − x = 15 esetén x = 40 − 15; 48 : x = 6 esetén x = 48 : 6',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'x + 19 = 45',
          categoryId: 'cat-simple-inverse',
          explanation: 'Összeadás lebontása: 45 − 19 = 26.'
        },
        {
          id: 's1-2',
          text: '5 · y = 45',
          categoryId: 'cat-simple-inverse',
          explanation: 'Szorzás lebontása: 45 : 5 = 9.'
        },
        {
          id: 's1-3',
          text: 'a − 14 = 30',
          categoryId: 'cat-head-inverse',
          explanation: 'Kisebbítendő keresése: 30 + 14 = 44.'
        },
        {
          id: 's1-4',
          text: 'b : 6 = 8',
          categoryId: 'cat-head-inverse',
          explanation: 'Osztandó keresése: 8 · 6 = 48.'
        },
        {
          id: 's1-5',
          text: '50 − x = 18',
          categoryId: 'cat-tricky',
          explanation: 'Kivonandó keresése: x = 50 − 18 = 32 (nem összeadunk!).'
        },
        {
          id: 's1-6',
          text: '72 : y = 9',
          categoryId: 'cat-tricky',
          explanation: 'Osztó keresése: y = 72 : 9 = 8 (nem szorzunk!).'
        },
        {
          id: 's1-7',
          text: '3 · m + 8 = 29',
          categoryId: 'cat-simple-inverse',
          explanation: 'Kivonással és osztással bontjuk le: 29 − 8 = 21, majd 21 : 3 = 7.'
        },
        {
          id: 's1-8',
          text: '65 − (k + 2) = 40',
          categoryId: 'cat-tricky',
          explanation: 'A zárójel kivonandó: (k + 2) = 65 − 40 = 25.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: MEGOLDÁS NAGYSÁGA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-small',
          name: 'Egyjegyű megoldás: x < 10',
          description: 'A kapott ismeretlen értéke 0 és 9 közé esik',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-medium',
          name: 'Kétjegyű megoldás: 10 ≤ x < 25',
          description: 'A kapott ismeretlen értéke 10 és 24 közé esik',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-large',
          name: 'Nagyobb megoldás: x ≥ 25',
          description: 'A kapott ismeretlen értéke legalább 25',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '4 · x + 12 = 40',
          categoryId: 'cat-small',
          explanation: '4 · x = 28 → x = 7 (< 10).'
        },
        {
          id: 's2-2',
          text: '5 · x − 10 = 65',
          categoryId: 'cat-medium',
          explanation: '5 · x = 75 → x = 15 (10 ≤ x < 25).'
        },
        {
          id: 's2-3',
          text: 'x : 5 = 6',
          categoryId: 'cat-large',
          explanation: 'x = 6 · 5 = 30 (≥ 25).'
        },
        {
          id: 's2-4',
          text: '45 − 3 · x = 24',
          categoryId: 'cat-small',
          explanation: '3 · x = 21 → x = 7 (< 10).'
        },
        {
          id: 's2-5',
          text: '2 · (x + 4) = 48',
          categoryId: 'cat-medium',
          explanation: 'x + 4 = 24 → x = 20 (10 ≤ x < 25).'
        },
        {
          id: 's2-6',
          text: '(x − 10) : 4 = 5',
          categoryId: 'cat-large',
          explanation: 'x − 10 = 20 → x = 30 (≥ 25).'
        },
        {
          id: 's2-7',
          text: '7 · x + 15 = 43',
          categoryId: 'cat-small',
          explanation: '7 · x = 28 → x = 4 (< 10).'
        },
        {
          id: 's2-8',
          text: '3 · x − 7 = 35',
          categoryId: 'cat-medium',
          explanation: '3 · x = 42 → x = 14 (10 ≤ x < 25).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: IGAZSÁGHALMAZ TÍPUSA (Alaphalmaz: Természetes számok ℕ)
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-sol-positive',
          name: 'Pozitív egész megoldás (x ∈ {1, 2, 3, ...})',
          description: 'Pontosan egy pozitív egész szám teszi igazzá az egyenletet',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-sol-zero',
          name: 'A megoldás a nulla (x = 0)',
          description: 'A 0 behelyettesítésével válik igaz egyenlőséggé',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        },
        {
          id: 'cat-sol-empty',
          name: 'Nincs megoldása ℕ-en (I = ∅)',
          description: 'Lehetetlen feltétel vagy nem egész szám jönne ki az ℕ alaphalmazon',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '3 · x + 5 = 26',
          categoryId: 'cat-sol-positive',
          explanation: '3 · x = 21 → x = 7, ami pozitív természetes szám.'
        },
        {
          id: 's3-2',
          text: '5 · x + 12 = 12',
          categoryId: 'cat-sol-zero',
          explanation: '5 · x = 0 → x = 0. A 0 természetes szám.'
        },
        {
          id: 's3-3',
          text: 'x + 10 = x + 15',
          categoryId: 'cat-sol-empty',
          explanation: 'Mindkét oldalból levonva x-et: 10 = 15, ami lehetetlen. I = ∅.'
        },
        {
          id: 's3-4',
          text: '2 · x + 10 = 5',
          categoryId: 'cat-sol-empty',
          explanation: '2 · x = 5 − 10 = −5, természetes számok között nincs megoldása! I = ∅.'
        },
        {
          id: 's3-5',
          text: '7 · (x − 4) = 21',
          categoryId: 'cat-sol-positive',
          explanation: 'x − 4 = 3 → x = 7 (pozitív egész).'
        },
        {
          id: 's3-6',
          text: '40 − 4 · x = 40',
          categoryId: 'cat-sol-zero',
          explanation: '4 · x = 0 → x = 0. Megoldás: 0.'
        },
        {
          id: 's3-7',
          text: '3 · x = 10 (ha x ∈ ℕ)',
          categoryId: 'cat-sol-empty',
          explanation: '10 nem osztható 3-mal, 10 : 3 nem egész szám. Nincs természetes szám megoldása.'
        },
        {
          id: 's3-8',
          text: '6 · x + 18 = 60',
          categoryId: 'cat-sol-positive',
          explanation: '6 · x = 42 → x = 7 (pozitív egész).'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Keressük a megoldásokat! Csoportosító"
      subtitle="Kategorizáld az egyenleteket lebontási szabályaik, megoldásuk mérete és típusa szerint!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
export default FindSolutionsSorter;
