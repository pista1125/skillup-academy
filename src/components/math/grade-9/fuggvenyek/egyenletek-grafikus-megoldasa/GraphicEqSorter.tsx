import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GraphicEqSorterProps {
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
    title: '1. Szint: Valós Megoldások Száma',
    subtitle: 'Sorold be az egyenleteket a grafikonjaik metszéspontjainak (valós gyökeiknek) száma szerint!',
    categories: [
      {
        id: 'cat-sols-0',
        name: '0 Megoldás (M = ∅)',
        description: 'A két grafikon sehol sem találkozik, nincs metszéspont',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-sols-1',
        name: '1 Megoldás',
        description: 'Érintési pont vagy egyetlen metszéspont létezik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-sols-2',
        name: '2 Megoldás',
        description: 'A két görbe két különböző pontban metszi egymást',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // 0 megoldás
      { id: 'gs1-1', label: 'x² = -4 (a parabola nem ér le a negatív síkba)', category: 'cat-sols-0' },
      { id: 'gs1-2', label: '|x - 2| = -1', category: 'cat-sols-0' },
      { id: 'gs1-3', label: '√x = -3', category: 'cat-sols-0' },
      { id: 'gs1-4', label: 'x² + 3 = 1', category: 'cat-sols-0' },
      // 1 megoldás
      { id: 'gs1-5', label: 'x² = 2x - 1 ((x - 1)² = 0 érintés)', category: 'cat-sols-1' },
      { id: 'gs1-6', label: '|x + 5| = 0 (csúcs az x-tengelyen)', category: 'cat-sols-1' },
      { id: 'gs1-7', label: '√(x - 1) = 2', category: 'cat-sols-1' },
      { id: 'gs1-8', label: '-(x - 3)² = 0', category: 'cat-sols-1' },
      // 2 megoldás
      { id: 'gs1-9', label: 'x² = 9', category: 'cat-sols-2' },
      { id: 'gs1-10', label: '|x - 4| = 3', category: 'cat-sols-2' },
      { id: 'gs1-11', label: 'x² = x + 2', category: 'cat-sols-2' },
      { id: 'gs1-12', label: '(x - 1)² = 4', category: 'cat-sols-2' }
    ]
  },
  2: {
    title: '2. Szint: Egyenlet Görbepárjának Típusa',
    subtitle: 'Csoportosítsd az egyenleteket az ábrázolandó két függvény görbetípusa alapján!',
    categories: [
      {
        id: 'cat-linear-linear',
        name: 'Lineáris - Lineáris',
        description: 'Két egyenes metszéspontjának keresése a síkon',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-abs-linear',
        name: 'Abszolútérték - Lineáris',
        description: 'V-alakú görbe és egy egyenes kölcsönös helyzete',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-quad-linear',
        name: 'Másodfokú - Lineáris',
        description: 'Parabola és egyenes metszéspontjainak meghatározása',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Lineáris - Lineáris
      { id: 'gs2-1', label: '2x - 3 = x + 4', category: 'cat-linear-linear' },
      { id: 'gs2-2', label: '3x = -x + 8', category: 'cat-linear-linear' },
      { id: 'gs2-3', label: '-0.5x + 1 = 2x - 4', category: 'cat-linear-linear' },
      { id: 'gs2-4', label: 'x + 5 = 7', category: 'cat-linear-linear' },
      // Abszolútérték - Lineáris
      { id: 'gs2-5', label: '|x - 1| = 2x + 3', category: 'cat-abs-linear' },
      { id: 'gs2-6', label: '|x + 4| = 5', category: 'cat-abs-linear' },
      { id: 'gs2-7', label: '2|x| - 1 = x + 2', category: 'cat-abs-linear' },
      { id: 'gs2-8', label: '-|x - 3| + 2 = 0', category: 'cat-abs-linear' },
      // Másodfokú - Lineáris
      { id: 'gs2-9', label: 'x² = 3x - 2', category: 'cat-quad-linear' },
      { id: 'gs2-10', label: '(x - 2)² - 1 = 3', category: 'cat-quad-linear' },
      { id: 'gs2-11', label: '-x² + 4 = x + 2', category: 'cat-quad-linear' },
      { id: 'gs2-12', label: 'x² - 4x = -3', category: 'cat-quad-linear' }
    ]
  },
  3: {
    title: '3. Szint: Megoldások Előjele',
    subtitle: 'Határozd meg a metszéspontok x-koordinátáinak (a gyököknek) az előjelét!',
    categories: [
      {
        id: 'cat-sols-both-pos',
        name: 'Mindkét Gyök Pozitív (x₁ > 0, x₂ > 0)',
        description: 'Mindkét metszéspont az y-tengelytől jobbra esik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sols-opposite',
        name: 'Különböző Előjelű Gyökök (x₁ < 0 < x₂)',
        description: 'Egyik metszéspont balra, a másik jobbra van az y-tengelytől',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-sols-both-neg',
        name: 'Mindkét Gyök Negatív (x₁ < 0, x₂ < 0)',
        description: 'Mindkét metszéspont az y-tengelytől balra esik',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Két pozitív
      { id: 'gs3-1', label: 'x² - 5x + 6 = 0 (x₁ = 2, x₂ = 3)', category: 'cat-sols-both-pos' },
      { id: 'gs3-2', label: '|x - 4| = 1 (x₁ = 3, x₂ = 5)', category: 'cat-sols-both-pos' },
      { id: 'gs3-3', label: '(x - 3)² = 1 (x₁ = 2, x₂ = 4)', category: 'cat-sols-both-pos' },
      { id: 'gs3-4', label: 'x² - 7x + 12 = 0 (x₁ = 3, x₂ = 4)', category: 'cat-sols-both-pos' },
      // Különböző előjelű
      { id: 'gs3-5', label: 'x² = 4 (x₁ = -2, x₂ = 2)', category: 'cat-sols-opposite' },
      { id: 'gs3-6', label: 'x² = x + 2 (x₁ = -1, x₂ = 2)', category: 'cat-sols-opposite' },
      { id: 'gs3-7', label: '|x| = 6 (x₁ = -6, x₂ = 6)', category: 'cat-sols-opposite' },
      { id: 'gs3-8', label: '|x - 1| = 3 (x₁ = -2, x₂ = 4)', category: 'cat-sols-opposite' },
      // Két negatív
      { id: 'gs3-9', label: 'x² + 5x + 6 = 0 (x₁ = -3, x₂ = -2)', category: 'cat-sols-both-neg' },
      { id: 'gs3-10', label: '|x + 4| = 1 (x₁ = -5, x₂ = -3)', category: 'cat-sols-both-neg' },
      { id: 'gs3-11', label: '(x + 5)² = 4 (x₁ = -7, x₂ = -3)', category: 'cat-sols-both-neg' },
      { id: 'gs3-12', label: 'x² + 7x + 10 = 0 (x₁ = -5, x₂ = -2)', category: 'cat-sols-both-neg' }
    ]
  }
};

export const GraphicEqSorter: React.FC<GraphicEqSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'egyenletek-grafikus-megoldasa',
  topicTitle = 'Egyenletek Grafikus Megoldása'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      title="Grafikus Egyenlet Csoportosító"
      subtitle="Kategorizáld az egyenleteket a metszéspontjaik száma, görbetípusuk és a gyökök előjele szerint!"
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

