import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionsReviewSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsReviewSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsReviewSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: MŰVELET FAJTÁJA SZERINT
    1: {
      level: 1,
      title: 'Művelet típusa',
      subtitle: 'Csoportosítsd a feladatokat az elvégzendő fő művelet szerint!',
      categories: [
        {
          id: 'add-sub',
          title: 'Összeadás és Kivonás (+ / -)',
          description: 'Azonos vagy közös nevezőjű összeadás és kivonás',
          color: 'blue'
        },
        {
          id: 'mult',
          title: 'Szorzás természetes számmal (·)',
          description: 'Számláló szorzása vagy nevező osztása',
          color: 'purple'
        },
        {
          id: 'div',
          title: 'Osztás természetes számmal (:)',
          description: 'Számláló osztása vagy nevező szorzása',
          color: 'indigo'
        }
      ],
      items: [
        { id: 'i1-1', text: '1/3 + 2/3', categoryId: 'add-sub' },
        { id: 'i1-2', text: '3/4 · 3', categoryId: 'mult' },
        { id: 'i1-3', text: '4/5 : 2', categoryId: 'div' },
        { id: 'i1-4', text: '5/6 - 1/2', categoryId: 'add-sub' },
        { id: 'i1-5', text: '2/7 · 5', categoryId: 'mult' },
        { id: 'i1-6', text: '6/7 : 3', categoryId: 'div' },
        { id: 'i1-7', text: '1 1/2 + 2/3', categoryId: 'add-sub' },
        { id: 'i1-8', text: '1/4 · 4', categoryId: 'mult' },
        { id: 'i1-9', text: '3/4 : 2', categoryId: 'div' },
        { id: 'i1-10', text: '3 - 1/4', categoryId: 'add-sub' },
        { id: 'i1-11', text: '5/8 · 2', categoryId: 'mult' },
        { id: 'i1-12', text: '1 1/3 : 2', categoryId: 'div' }
      ]
    },

    // 2. SZINT: EREDMÉNY ÉRTÉKTÍPUSA SZERINT
    2: {
      level: 2,
      title: 'Eredmény típusa',
      subtitle: 'Számítsd ki az eredményt, és sorold be a megfelelő értéktípusba!',
      categories: [
        {
          id: 'proper',
          title: 'Valódi tört (< 1)',
          description: 'A számláló kisebb a nevezőnél',
          color: 'emerald'
        },
        {
          id: 'whole',
          title: 'Egész szám (= 1, 2...)',
          description: 'A végeredmény egész szám',
          color: 'blue'
        },
        {
          id: 'mixed',
          title: 'Vegyes tört / Áltört (> 1)',
          description: 'Értéke 1-nél nagyobb',
          color: 'amber'
        }
      ],
      items: [
        { id: 'i2-1', text: '1/4 + 1/4 (= 1/2)', categoryId: 'proper' },
        { id: 'i2-2', text: '1/3 · 3 (= 1)', categoryId: 'whole' },
        { id: 'i2-3', text: '2/3 + 2/3 (= 1 1/3)', categoryId: 'mixed' },
        { id: 'i2-4', text: '4/5 : 2 (= 2/5)', categoryId: 'proper' },
        { id: 'i2-5', text: '1/2 · 4 (= 2)', categoryId: 'whole' },
        { id: 'i2-6', text: '3/4 · 2 (= 1 1/2)', categoryId: 'mixed' },
        { id: 'i2-7', text: '5/6 - 1/2 (= 1/3)', categoryId: 'proper' },
        { id: 'i2-8', text: '3/4 + 1/4 (= 1)', categoryId: 'whole' },
        { id: 'i2-9', text: '1 1/2 + 3/4 (= 2 1/4)', categoryId: 'mixed' },
        { id: 'i2-10', text: '3/4 : 2 (= 3/8)', categoryId: 'proper' },
        { id: 'i2-11', text: '1/3 · 6 (= 2)', categoryId: 'whole' },
        { id: 'i2-12', text: '2 - 1/3 (= 1 2/3)', categoryId: 'mixed' }
      ]
    },

    // 3. SZINT: VÉGEREDMÉNY NAGYSÁGA
    3: {
      level: 3,
      title: 'Végeredmény nagysága',
      subtitle: 'Hasonlítsd össze az eredményt az 1/2 és 1 egységekkel!',
      categories: [
        {
          id: 'less-half',
          title: 'Kisebb mint 1/2 (< 1/2)',
          description: 'Végeredmény < 1/2',
          color: 'rose'
        },
        {
          id: 'half-one',
          title: '1/2 és 1 között (1/2 ≤ x ≤ 1)',
          description: '1/2 és 1 közé eső érték',
          color: 'emerald'
        },
        {
          id: 'greater-one',
          title: 'Nagyobb mint 1 (> 1)',
          description: '1 egésznél nagyobb érték',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i3-1', text: '1/4 : 2', categoryId: 'less-half' },
        { id: 'i3-2', text: '1/2 + 1/4', categoryId: 'half-one' },
        { id: 'i3-3', text: '1/2 + 2/3', categoryId: 'greater-one' },
        { id: 'i3-4', text: '1/3 : 2', categoryId: 'less-half' },
        { id: 'i3-5', text: '2/3 · 1', categoryId: 'half-one' },
        { id: 'i3-6', text: '3/4 · 2', categoryId: 'greater-one' },
        { id: 'i3-7', text: '2/5 : 3', categoryId: 'less-half' },
        { id: 'i3-8', text: '3/8 + 1/8 · 5', categoryId: 'half-one' },
        { id: 'i3-9', text: '1 1/2 + 1/4', categoryId: 'greater-one' },
        { id: 'i3-10', text: '4/5 : 2', categoryId: 'less-half' },
        { id: 'i3-11', text: '1/4 + 1/4 · 3', categoryId: 'half-one' },
        { id: 'i3-12', text: '2 · (1/2 + 1/3)', categoryId: 'greater-one' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-fractions"
      title="Törtek átfogó csoportosító játék"
      subtitle="Húzd vagy kattintással helyezd a feladatokat a megfelelő kategóriába!"
      badge="🍕 6. Osztály • II. Törtek ismétlése"
      topicId="g6-fractions-review-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default FractionsReviewSorter;
