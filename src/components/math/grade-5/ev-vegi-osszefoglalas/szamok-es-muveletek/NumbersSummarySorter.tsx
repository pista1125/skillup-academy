import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface NumbersSummarySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function NumbersSummarySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: NumbersSummarySorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: ELŐJELEK ÉS SZÁMTÍPUSOK
    // ========================================================
    1: {
      categories: [
        {
          id: 'positive',
          name: 'Pozitív számok (> 0)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'zero',
          name: 'Nulla (0, semleges)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'negative',
          name: 'Negatív számok (< 0)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '+15 (vagyon)', categoryId: 'positive' },
        { id: 'i1-2', label: '1 250', categoryId: 'positive' },
        { id: 'i1-3', label: '|−9| (abszolút érték = 9)', categoryId: 'positive' },
        { id: 'i1-4', label: '+42 °C', categoryId: 'positive' },
        { id: 'i1-5', label: '0 (nulla)', categoryId: 'zero' },
        { id: 'i1-6', label: '0 °C fagyáspont', categoryId: 'zero' },
        { id: 'i1-7', label: '0 Ft egyenleg', categoryId: 'zero' },
        { id: 'i1-8', label: '5 − 5', categoryId: 'zero' },
        { id: 'i1-9', label: '−8 (tartozás)', categoryId: 'negative' },
        { id: 'i1-10', label: '−12 °C fagy', categoryId: 'negative' },
        { id: 'i1-11', label: '+10 ellentettje (−10)', categoryId: 'negative' },
        { id: 'i1-12', label: '−450 m tengerszint alatt', categoryId: 'negative' }
      ]
    },

    // ========================================================
    // 2. SZINT: KEREKÍTÉS SZÁZASOKRA
    // ========================================================
    2: {
      categories: [
        {
          id: 'round-100',
          name: '100-ra kerekül (50 – 149)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'round-200',
          name: '200-ra kerekül (150 – 249)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'round-300',
          name: '300-ra kerekül (250 – 349)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '89 (tízes: 8 ≥ 5)', categoryId: 'round-100' },
        { id: 'i2-2', label: '124 (tízes: 2 < 5)', categoryId: 'round-100' },
        { id: 'i2-3', label: '65 (tízes: 6 ≥ 5)', categoryId: 'round-100' },
        { id: 'i2-4', label: '148 (tízes: 4 < 5)', categoryId: 'round-100' },
        { id: 'i2-5', label: '162 (tízes: 6 ≥ 5)', categoryId: 'round-200' },
        { id: 'i2-6', label: '199 (tízes: 9 ≥ 5)', categoryId: 'round-200' },
        { id: 'i2-7', label: '235 (tízes: 3 < 5)', categoryId: 'round-200' },
        { id: 'i2-8', label: '204 (tízes: 0 < 5)', categoryId: 'round-200' },
        { id: 'i2-9', label: '251 (tízes: 5 ≥ 5)', categoryId: 'round-300' },
        { id: 'i2-10', label: '280 (tízes: 8 ≥ 5)', categoryId: 'round-300' },
        { id: 'i2-11', label: '315 (tízes: 1 < 5)', categoryId: 'round-300' },
        { id: 'i2-12', label: '349 (tízes: 4 < 5)', categoryId: 'round-300' }
      ]
    },

    // ========================================================
    // 3. SZINT: MŰVELETI EREDMÉNYEK ELŐJELE ÉS ÉRTÉKE
    // ========================================================
    3: {
      categories: [
        {
          id: 'res-neg',
          name: 'Negatív eredmény (< 0)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'res-zero',
          name: 'Pontosan 0 (= 0)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'res-pos',
          name: 'Pozitív eredmény (> 0)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '4 − 10 (−6)', categoryId: 'res-neg' },
        { id: 'i3-2', label: '(−5) + (−3) (−8)', categoryId: 'res-neg' },
        { id: 'i3-3', label: '2 · (−6) (−12)', categoryId: 'res-neg' },
        { id: 'i3-4', label: '0 − 7 (−7)', categoryId: 'res-neg' },
        { id: 'i3-5', label: '(−9) + 9', categoryId: 'res-zero' },
        { id: 'i3-6', label: '14 − 14', categoryId: 'res-zero' },
        { id: 'i3-7', label: '0 · (−100)', categoryId: 'res-zero' },
        { id: 'i3-8', label: '(−4) − (−4)', categoryId: 'res-zero' },
        { id: 'i3-9', label: '(−3) + 8 (+5)', categoryId: 'res-pos' },
        { id: 'i3-10', label: '7 − (−3) (+10)', categoryId: 'res-pos' },
        { id: 'i3-11', label: '30 : 5 (+6)', categoryId: 'res-pos' },
        { id: 'i3-12', label: '12 + 4 · 2 (+20)', categoryId: 'res-pos' }
      ]
    }
  };

  const handleNextLevelInternal = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as DifficultyLevel);
    } else if (onNextLevel) {
      onNextLevel();
    }
  };

  return (
    <SorterTemplate
      title="Számok és műveletek – Csoportosító"
      subtitle="Válogasd szét a számokat és kifejezéseket a megfelelő kategóriákba!"
      levels={levelsConfig}
      level={level}
      currentLevel={level}
      onLevelChange={(lvl) => setLevel(lvl as DifficultyLevel)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-numbers-summary-sorter"
      themeColor="emerald"
    />
  );
}
