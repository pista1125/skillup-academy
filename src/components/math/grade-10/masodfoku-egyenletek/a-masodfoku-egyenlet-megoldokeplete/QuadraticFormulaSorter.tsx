import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadraticFormulaSorterProps {
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
    title: 'Valós gyökök száma a diszkrimináns (D = b² - 4ac) alapján',
    subtitle: 'Válogasd szét az egyenleteket aszerint, hogy a diszkriminánsuk előjele alapján hány valós megoldásuk van!',
    categories: [
      {
        id: 'cat-two',
        name: '2 különböző valós gyök (D > 0)',
        description: 'A diszkrimináns pozitív, a képlet ± ágai két különböző valós számot adnak.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one',
        name: '1 valós gyök (kettős gyök, D = 0)',
        description: 'A diszkrimináns nulla, a ±√0 nem hoz létre két ágat, egyetlen megoldás van.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-none',
        name: '0 valós gyök (D < 0)',
        description: 'A diszkrimináns negatív, a valós számok körében nincs négyzetgyöke.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', content: 'x² - 8x + 12 = 0  (D = 16 > 0)', categoryId: 'cat-two' },
      { id: 's1-2', content: 'x² + 6x + 9 = 0  (D = 0)', categoryId: 'cat-one' },
      { id: 's1-3', content: 'x² + x + 4 = 0  (D = -15 < 0)', categoryId: 'cat-none' },
      { id: 's1-4', content: '2x² - 4x + 2 = 0  (D = 0)', categoryId: 'cat-one' },
      { id: 's1-5', content: '3x² - 5x - 2 = 0  (D = 49 > 0)', categoryId: 'cat-two' },
      { id: 's1-6', content: 'x² - 2x + 7 = 0  (D = -24 < 0)', categoryId: 'cat-none' },
      { id: 's1-7', content: '4x² - 12x + 9 = 0  (D = 0)', categoryId: 'cat-one' },
      { id: 's1-8', content: '-x² + 5x - 6 = 0  (D = 1 > 0)', categoryId: 'cat-two' },
      { id: 's1-9', content: '2x² + 3x + 5 = 0  (D = -31 < 0)', categoryId: 'cat-none' },
      { id: 's1-10', content: 'x² - 16 = 0  (D = 64 > 0)', categoryId: 'cat-two' }
    ]
  },
  2: {
    title: 'Helyes behelyettesítés vs. Tipikus képlethiba',
    subtitle: 'Döntsd el a felírt megoldási lépésről, hogy matematikailag pontos vagy előjel-/képlethibát tartalmaz!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Helyes behelyettesítés',
        description: 'Pontos -b előjel, helyes (-b)² négyzetelés, 2a a nevezőben és 0-ra rendezés.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-invalid',
        name: 'Hibás behelyettesítés (Tipikus hiba)',
        description: 'Elfelejtett előjelváltás, lemaradt 2-es szorzó a nevezőben vagy nem 0-ra rendezett alak.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's2-1', content: 'x² - 6x + 5 = 0 ⟹ x = (6 ± √16) / 2', categoryId: 'cat-valid' },
      { id: 's2-2', content: 'x² - 6x + 5 = 0 ⟹ x = (-6 ± √16) / 2', categoryId: 'cat-invalid' },
      { id: 's2-3', content: '2x² + 4x - 6 = 0 ⟹ x = (-4 ± √64) / 4', categoryId: 'cat-valid' },
      { id: 's2-4', content: '2x² + 4x - 6 = 0 ⟹ x = (-4 ± √64) / 2', categoryId: 'cat-invalid' },
      { id: 's2-5', content: 'x² + 3x = 10 ⟹ a = 1, b = 3, c = -10', categoryId: 'cat-valid' },
      { id: 's2-6', content: 'x² + 3x = 10 ⟹ a = 1, b = 3, c = 10', categoryId: 'cat-invalid' },
      { id: 's2-7', content: '-x² + 2x + 8 = 0 ⟹ D = 4 - 4·(-1)·8 = 36', categoryId: 'cat-valid' },
      { id: 's2-8', content: '-x² + 2x + 8 = 0 ⟹ D = 4 - 4·1·8 = -28', categoryId: 'cat-invalid' },
      { id: 's2-9', content: 'x² - 4x + 1 = 0 ⟹ (-4)² = +16', categoryId: 'cat-valid' },
      { id: 's2-10', content: 'x² - 4x + 1 = 0 ⟹ (-4)² = -16', categoryId: 'cat-invalid' }
    ]
  },
  3: {
    title: 'Diszkrimináns jellege és a gyökök típusa',
    subtitle: 'Csoportosítsd az egyenleteket a gyökök számtani jellege (racionális, irracionális vagy nincs valós gyök) szerint!',
    categories: [
      {
        id: 'cat-rational',
        name: 'Racionális gyökök (D négyzetszám)',
        description: 'D ≥ 0 és négyzetszám (pl. 0, 1, 4, 9, 16, 25...), a gyökök felírhatók egész vagy tört számként.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális gyökök (D nem négyzetszám)',
        description: 'D > 0, de nem négyzetszám (pl. 2, 3, 5, 8, 12...), a gyökökben megmarad a négyzetgyökjel (±√D).',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-none',
        name: 'Nincs valós gyök (D < 0)',
        description: 'A diszkrimináns negatív, valós megoldás nem létezik (x ∈ ∅).',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', content: 'x² - 5x + 6 = 0  [D = 1 = 1²]', categoryId: 'cat-rational' },
      { id: 's3-2', content: 'x² - 4x + 1 = 0  [D = 12, x = 2 ± √3]', categoryId: 'cat-irrational' },
      { id: 's3-3', content: 'x² + 2x + 7 = 0  [D = -24 < 0]', categoryId: 'cat-none' },
      { id: 's3-4', content: '2x² - 7x + 3 = 0  [D = 25 = 5²]', categoryId: 'cat-rational' },
      { id: 's3-5', content: 'x² - 2x - 1 = 0  [D = 8, x = 1 ± √2]', categoryId: 'cat-irrational' },
      { id: 's3-6', content: '3x² + x + 2 = 0  [D = -23 < 0]', categoryId: 'cat-none' },
      { id: 's3-7', content: 'x² - 8x + 16 = 0  [D = 0, x = 4]', categoryId: 'cat-rational' },
      { id: 's3-8', content: 'x² - 6x + 7 = 0  [D = 8, x = 3 ± √2]', categoryId: 'cat-irrational' },
      { id: 's3-9', content: 'x² + 5x = 0  [D = 25, x₁ = 0, x₂ = -5]', categoryId: 'cat-rational' },
      { id: 's3-10', content: '2x² - 2x + 5 = 0  [D = -36 < 0]', categoryId: 'cat-none' }
    ]
  }
};

export const QuadraticFormulaSorter: React.FC<QuadraticFormulaSorterProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'a-masodfoku-egyenlet-megoldokeplete',
  topicTitle = 'A másodfokú egyenlet megoldóképlete'
}) => {
  const activeLevel = level || currentLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
    />
  );
};

export default QuadraticFormulaSorter;

