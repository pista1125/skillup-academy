import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GraphicLinearSorterProps {
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
    title: 'Egyenletrendszerek Besorolása Megoldásszám Szerint',
    subtitle: 'Sorold be az egyenletrendszereket: Pontosan 1 megoldás, Nincs megoldás (∅) vagy Végtelen sok megoldás!',
    categories: [
      {
        id: 'cat-one',
        name: 'Pontosan 1 Megoldás',
        description: 'Metsző egyenesek (m₁ ≠ m₂), egyetlen közös pont (x₀; y₀)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-none',
        name: 'Nincs Megoldás (∅)',
        description: 'Párhuzamos egyenesek (m₁ = m₂, b₁ ≠ b₂), ellentmondásos rendszer',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-infinite',
        name: 'Végtelen Sok Megoldás',
        description: 'Egybeeső egyenesek (m₁ = m₂, b₁ = b₂), az egyenletek egymás többszörösei',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'gls1-1', label: 'y = 7 − x  és  y = 10 − 2x (M: 3; 4)', category: 'cat-one' },
      { id: 'gls1-2', label: 'y = 2x + 1  és  y = −x + 4 (M: 1; 3)', category: 'cat-one' },
      { id: 'gls1-3', label: 'x + y = 0  és  2x − y = 0 (M: 0; 0)', category: 'cat-one' },
      { id: 'gls1-4', label: 'y = 6 − x  és  y = 1,5x + 1 (M: 2; 4)', category: 'cat-one' },

      // Nincs megoldás
      { id: 'gls1-5', label: '3x + y = 5  és  6x + 2y = 1 (m = −3, b₁ ≠ b₂)', category: 'cat-none' },
      { id: 'gls1-6', label: 'y = 2x + 4  és  y = 2x − 3 (m = 2, párhuzamosak)', category: 'cat-none' },
      { id: 'gls1-7', label: 'x + y = 2  és  x + y = 6 (ellentmondás: 2 = 6)', category: 'cat-none' },
      { id: 'gls1-8', label: '4x − 2y = 8  és  2x − y = 1 (párhuzamos egyenesek)', category: 'cat-none' },

      // Végtelen sok megoldás
      { id: 'gls1-9', label: '2x − y = 1  és  4x − 2y = 2 (II = 2 · I)', category: 'cat-infinite' },
      { id: 'gls1-10', label: 'x + y = 5  és  3x + 3y = 15 (egybeeső egyenesek)', category: 'cat-infinite' },
      { id: 'gls1-11', label: 'y = 3x − 2  és  6x − 2y = 4 (ugyanaz az egyenes)', category: 'cat-infinite' },
      { id: 'gls1-12', label: '−x + 2y = 3  és  2x − 4y = −6 (számszorosok)', category: 'cat-infinite' }
    ]
  },
  2: {
    title: 'Lineáris Függvények Meredekség Szerint',
    subtitle: 'Csoportosítsd az egyenleteket a hozzájuk tartozó egyenes meredeksége (m) alapján!',
    categories: [
      {
        id: 'cat-pos',
        name: 'Pozitív Meredekség (m > 0)',
        description: 'Jobbra felfelé tartó, szigorúan monoton növekvő egyenes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-neg',
        name: 'Negatív Meredekség (m < 0)',
        description: 'Jobbra lefelé tartó, szigorúan monoton csökkenő egyenes',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-zero',
        name: 'Vízszintes Egyenes (m = 0)',
        description: 'x tengellyel párhuzamos, konstans függvény (y = c)',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      // Pozitív meredekség
      { id: 'gls2-1', label: 'y = 2x − 5 (m = 2)', category: 'cat-pos' },
      { id: 'gls2-2', label: '2x − y = 3 ⟹ y = 2x − 3 (m = 2)', category: 'cat-pos' },
      { id: 'gls2-3', label: 'y = 0,5x + 4 (m = 0,5)', category: 'cat-pos' },
      { id: 'gls2-4', label: '3x − 2y = 1 ⟹ y = 1,5x − 0,5 (m = 1,5)', category: 'cat-pos' },

      // Negatív meredekség
      { id: 'gls2-5', label: 'y = 7 − x (m = −1)', category: 'cat-neg' },
      { id: 'gls2-6', label: '2x + y = 10 ⟹ y = −2x + 10 (m = −2)', category: 'cat-neg' },
      { id: 'gls2-7', label: 'y = −3x + 1 (m = −3)', category: 'cat-neg' },
      { id: 'gls2-8', label: '4x + 2y = 6 ⟹ y = −2x + 3 (m = −2)', category: 'cat-neg' },

      // Vízszintes
      { id: 'gls2-9', label: 'y = 4 (m = 0)', category: 'cat-zero' },
      { id: 'gls2-10', label: '2y = 8 ⟹ y = 4 (m = 0)', category: 'cat-zero' },
      { id: 'gls2-11', label: 'y − 3 = 0 ⟹ y = 3 (m = 0)', category: 'cat-zero' },
      { id: 'gls2-12', label: 'y = −2 (m = 0)', category: 'cat-zero' }
    ]
  },
  3: {
    title: 'Egyenletrendszerek Matematikai Jellege',
    subtitle: 'Válogasd szét a rendszereket típus szerint: Határozott, Ellentmondásos vagy Határozatlan!',
    categories: [
      {
        id: 'cat-determined',
        name: 'Határozott Rendszer',
        description: 'Egyetlen független megoldáspárral rendelkezik (metsző egyenesek)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-inconsistent',
        name: 'Ellentmondásos (Inkonzisztens)',
        description: 'Nincs olyan számpár, amely mindkettőt teljesíti (párhuzamos egyenesek)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-dependent',
        name: 'Határozatlan (Függő egyenletek)',
        description: 'Végtelen sok megoldás, az egyenletek egymásból levezethetők',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Határozott
      { id: 'gls3-1', label: '2x + 3y = 7  és  x − y = 1 (Megoldás: 2; 1)', category: 'cat-determined' },
      { id: 'gls3-2', label: 'x + y = 7  és  4x + 2y = 20 (Megoldás: 3; 4)', category: 'cat-determined' },
      { id: 'gls3-3', label: 'y = 6 − x  és  y = 1,5x + 1 (Megoldás: 2; 4)', category: 'cat-determined' },
      { id: 'gls3-4', label: 'y = x + 4  és  y = −2x + 1 (Megoldás: −1; 3)', category: 'cat-determined' },

      // Ellentmondásos
      { id: 'gls3-5', label: '0,6x − 2y = 8  és  3x − 10y = 20 (balszélek 5-szörösei, 40 ≠ 20)', category: 'cat-inconsistent' },
      { id: 'gls3-6', label: '2x + 4y = 6  és  x + 2y = 5 (2 · 5 = 10 ≠ 6)', category: 'cat-inconsistent' },
      { id: 'gls3-7', label: 'y = 4x + 1  és  y = 4x − 2 (párhuzamos egyenesek)', category: 'cat-inconsistent' },
      { id: 'gls3-8', label: 'x − 3y = 4  és  −2x + 6y = 5 (ellentmondás: −8 ≠ 5)', category: 'cat-inconsistent' },

      // Határozatlan
      { id: 'gls3-9', label: '0,6x − 2y = 4  és  3x − 10y = 20 (5 · 4 = 20, egybeesnek)', category: 'cat-dependent' },
      { id: 'gls3-10', label: '3x − y = 2  és  9x − 3y = 6 (egymás 3-szorosai)', category: 'cat-dependent' },
      { id: 'gls3-11', label: 'x + 2y = 4  és  2x + 4y = 8 (egymás 2-szeresei)', category: 'cat-dependent' },
      { id: 'gls3-12', label: 'y = −x + 3  és  x + y = 3 (azonosság)', category: 'cat-dependent' }
    ]
  }
};

export const GraphicLinearSorter: React.FC<GraphicLinearSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '1. Egyenletrendszerek grafikus megoldása'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      title="1. Egyenletrendszerek grafikus megoldása – Csoportosító Játék"
      subtitle="Húzd a megfelelő dobozba az egyenletrendszereket és függvényeket a megoldások száma és tulajdonságaik szerint!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 7. LECKE"
      levels={sorterLevels}
      currentLevel={activeLvl}
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

