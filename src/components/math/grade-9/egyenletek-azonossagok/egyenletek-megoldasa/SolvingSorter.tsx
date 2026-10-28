import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolvingSorterProps {
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
    title: '1. Szint: Legcélszerűbb Azonnali Lépés',
    subtitle: 'Milyen algebrai lépéssel érdemes kezdeni a megadott egyenlet megoldását?',
    categories: [
      {
        id: 'cat-bracket-expand',
        name: 'Zárójelbontás (Disztributivitás)',
        description: 'Zárójelek felbontása szorzással vagy előjelváltással',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-mult-denom',
        name: 'Beszorzás a közös nevezővel',
        description: 'Törtek eltüntetése LKKT-vel',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-balance-isolate',
        name: 'Mérlegelvi rendezés / Összevonás',
        description: 'Tagok átrendezése a két oldal között',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Zárójelbontás
      { id: 'ss1-1', label: '3(2x - 4) = 18', category: 'cat-bracket-expand' },
      { id: 'ss1-2', label: '-(x + 5) = 2', category: 'cat-bracket-expand' },
      { id: 'ss1-3', label: '4(x + 1) = 3(x - 2)', category: 'cat-bracket-expand' },
      { id: 'ss1-4', label: '5 - 2(x + 3) = 9', category: 'cat-bracket-expand' },
      // Beszorzás közös nevezővel
      { id: 'ss1-5', label: 'x/3 + x/4 = 7', category: 'cat-mult-denom' },
      { id: 'ss1-6', label: '(2x - 1) / 5 = 3', category: 'cat-mult-denom' },
      { id: 'ss1-7', label: '(x + 2)/6 - x/2 = 1', category: 'cat-mult-denom' },
      { id: 'ss1-8', label: '3x / 8 = (x - 1) / 4', category: 'cat-mult-denom' },
      // Mérlegelvi rendezés
      { id: 'ss1-9', label: '5x - 8 = 2x + 7', category: 'cat-balance-isolate' },
      { id: 'ss1-10', label: '3x + 10 = 25', category: 'cat-balance-isolate' },
      { id: 'ss1-11', label: '7x - 2x + 4 = 19', category: 'cat-balance-isolate' },
      { id: 'ss1-12', label: '4x = 24', category: 'cat-balance-isolate' }
    ]
  },
  2: {
    title: '2. Szint: Megoldások Jellege és Száma (A = ℝ)',
    subtitle: 'Határozd meg, hogy az egyenletnek egyetlen gyöke van, azonosság vagy ellentmondás!',
    categories: [
      {
        id: 'cat-one-solution',
        name: 'Pontosan 1 megoldás',
        description: 'Véges, egyetlen valós gyök',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-identity-infinite',
        name: 'Azonosság (M = ℝ)',
        description: 'Végtelen sok megoldás, minden szám jó',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-contradiction-empty',
        name: 'Ellentmondás (M = ∅)',
        description: 'Egyetlen valós számra sem teljesül',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'ss2-1', label: '3x - 5 = 16', category: 'cat-one-solution' },
      { id: 'ss2-2', label: '2(x + 4) = 3x - 1', category: 'cat-one-solution' },
      { id: 'ss2-3', label: 'x / 2 + 1 = 5', category: 'cat-one-solution' },
      { id: 'ss2-4', label: '4 - x = 2x + 1', category: 'cat-one-solution' },
      // Azonosság
      { id: 'ss2-5', label: '2(x + 3) = 2x + 6', category: 'cat-identity-infinite' },
      { id: 'ss2-6', label: '3x - 7 = -7 + 3x', category: 'cat-identity-infinite' },
      { id: 'ss2-7', label: '4(2x - 1) = 8x - 4', category: 'cat-identity-infinite' },
      { id: 'ss2-8', label: 'x + x + x = 3x', category: 'cat-identity-infinite' },
      // Ellentmondás
      { id: 'ss2-9', label: 'x + 4 = x + 9', category: 'cat-contradiction-empty' },
      { id: 'ss2-10', label: '3(x - 1) = 3x + 5', category: 'cat-contradiction-empty' },
      { id: 'ss2-11', label: '2x - 7 = 2x + 1', category: 'cat-contradiction-empty' },
      { id: 'ss2-12', label: '5x - 2 = 5x + 8', category: 'cat-contradiction-empty' }
    ]
  },
  3: {
    title: '3. Szint: A Kapott Gyök Értéktartománya',
    subtitle: 'Milyen szám a megadott egyenlet valós gyöke?',
    categories: [
      {
        id: 'cat-pos-int',
        name: 'Pozitív egész gyök',
        description: 'x ∈ {1, 2, 3...}',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-neg-int',
        name: 'Negatív egész gyök',
        description: 'x ∈ {-1, -2, -3...}',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-fraction-root',
        name: 'Nem egész (tört) gyök',
        description: 'x ∈ ℚ \\ ℤ (tizedestört, valódi tört)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Pozitív egész
      { id: 'ss3-1', label: '2x = 8 (x = 4)', category: 'cat-pos-int' },
      { id: 'ss3-2', label: '3x - 1 = 20 (x = 7)', category: 'cat-pos-int' },
      { id: 'ss3-3', label: 'x / 3 = 2 (x = 6)', category: 'cat-pos-int' },
      { id: 'ss3-4', label: '5x + 3 = 13 (x = 2)', category: 'cat-pos-int' },
      // Negatív egész
      { id: 'ss3-5', label: 'x + 7 = 2 (x = -5)', category: 'cat-neg-int' },
      { id: 'ss3-6', label: '3x = -12 (x = -4)', category: 'cat-neg-int' },
      { id: 'ss3-7', label: '2x + 10 = 4 (x = -3)', category: 'cat-neg-int' },
      { id: 'ss3-8', label: '-5x = 35 (x = -7)', category: 'cat-neg-int' },
      // Tört
      { id: 'ss3-9', label: '2x = 5 (x = 2,5)', category: 'cat-fraction-root' },
      { id: 'ss3-10', label: '3x = 10 (x = 10/3)', category: 'cat-fraction-root' },
      { id: 'ss3-11', label: '4x - 1 = 2 (x = 3/4)', category: 'cat-fraction-root' },
      { id: 'ss3-12', label: '5x = 7 (x = 1,4)', category: 'cat-fraction-root' }
    ]
  }
};

export const SolvingSorter: React.FC<SolvingSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenlet-megoldasa-quiz',
  topicTitle = 'Egyenletek megoldása'
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
      color="teal"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

