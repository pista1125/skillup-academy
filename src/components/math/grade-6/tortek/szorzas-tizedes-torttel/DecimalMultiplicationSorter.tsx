import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalMultiplicationSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function DecimalMultiplicationSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalMultiplicationSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: SZORZAT ÉRTÉKE 1-HEZ KÉPEST
    1: {
      level: 1,
      title: 'Szorzat értéke az 1 egészhez képest',
      subtitle: 'Csoportosítsd a szorzásokat aszerint, hogy az eredmény kisebb, egyenlő (1) vagy nagyobb 1-nél!',
      categories: [
        {
          id: 'less-1',
          title: 'Kisebb mint 1 (< 1)',
          description: 'A szorzat értéke 0 és 1 közé esik',
          color: 'blue'
        },
        {
          id: 'equal-1',
          title: 'Pontosan 1 (= 1)',
          description: 'A szorzat pontosan 1 egész',
          color: 'emerald'
        },
        {
          id: 'greater-1',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'A szorzat meghaladja az 1 egészet',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '0,2 · 0,4 (= 0,08)', categoryId: 'less-1' },
        { id: 'i1-2', text: '0,5 · 2 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-3', text: '1,5 · 2 (= 3)', categoryId: 'greater-1' },
        { id: 'i1-4', text: '0,9 · 0,9 (= 0,81)', categoryId: 'less-1' },
        { id: 'i1-5', text: '0,25 · 4 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-6', text: '2,4 · 1,5 (= 3,6)', categoryId: 'greater-1' },
        { id: 'i1-7', text: '0,05 · 10 (= 0,5)', categoryId: 'less-1' },
        { id: 'i1-8', text: '0,1 · 10 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-9', text: '3,2 · 2 (= 6,4)', categoryId: 'greater-1' },
        { id: 'i1-10', text: '0,75 · 0,8 (= 0,6)', categoryId: 'less-1' },
        { id: 'i1-11', text: '1,25 · 0,8 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-12', text: '4,5 · 1,2 (= 5,4)', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: TIZEDESJEGYEK SZÁMA A SZORZATBAN
    2: {
      level: 2,
      title: 'Tizedesjegyek száma a szorzatban',
      subtitle: 'Csoportosítsd a szorzásokat a végeredmény tizedesjegyeinek száma alapján!',
      categories: [
        {
          id: 'dec-1',
          title: 'Egész vagy 1 tizedesjegy',
          description: 'A szorzatnak 0 vagy legfeljebb 1 tizedesjegye van (pl. 3,6 vagy 10)',
          color: 'teal'
        },
        {
          id: 'dec-2',
          title: 'Pontosan 2 tizedesjegy',
          description: 'A szorzat század pontosságú (pl. 0,12 vagy 0,56)',
          color: 'amber'
        },
        {
          id: 'dec-3',
          title: '3 vagy több tizedesjegy',
          description: 'A szorzat ezred vagy még kisebb jegyű (pl. 0,015)',
          color: 'rose'
        }
      ],
      items: [
        { id: 'i2-1', text: '1,2 · 3 (= 3,6)', categoryId: 'dec-1' },
        { id: 'i2-2', text: '0,3 · 0,4 (= 0,12)', categoryId: 'dec-2' },
        { id: 'i2-3', text: '0,05 · 0,3 (= 0,015)', categoryId: 'dec-3' },
        { id: 'i2-4', text: '2,5 · 4 (= 10)', categoryId: 'dec-1' },
        { id: 'i2-5', text: '0,7 · 0,8 (= 0,56)', categoryId: 'dec-2' },
        { id: 'i2-6', text: '0,12 · 0,04 (= 0,0048)', categoryId: 'dec-3' },
        { id: 'i2-7', text: '0,4 · 2 (= 0,8)', categoryId: 'dec-1' },
        { id: 'i2-8', text: '1,1 · 1,1 (= 1,21)', categoryId: 'dec-2' },
        { id: 'i2-9', text: '0,025 · 0,2 (= 0,005)', categoryId: 'dec-3' },
        { id: 'i2-10', text: '0,5 · 0,6 (= 0,3)', categoryId: 'dec-1' },
        { id: 'i2-11', text: '0,4 · 0,6 (= 0,24)', categoryId: 'dec-2' },
        { id: 'i2-12', text: '0,15 · 0,3 (= 0,045)', categoryId: 'dec-3' }
      ]
    },

    // 3. SZINT: NAGYSÁGRENDI SÁVOK
    3: {
      level: 3,
      title: 'Nagyságrendi sávok',
      subtitle: 'Helyezd a szorzásokat a megfelelő nagyságrendi tartományba!',
      categories: [
        {
          id: 'band-small',
          title: '0 és 1 között [0; 1[',
          description: 'Egésznél kisebb szorzatok',
          color: 'blue'
        },
        {
          id: 'band-mid',
          title: '1 és 10 között [1; 10]',
          description: 'Egy és tíz közötti szorzatok',
          color: 'indigo'
        },
        {
          id: 'band-large',
          title: '10 felett (> 10)',
          description: 'Tíznél nagyobb értékű szorzatok',
          color: 'violet'
        }
      ],
      items: [
        { id: 'i3-1', text: '0,3 · 0,8 (= 0,24)', categoryId: 'band-small' },
        { id: 'i3-2', text: '1,5 · 3 (= 4,5)', categoryId: 'band-mid' },
        { id: 'i3-3', text: '3,5 · 4 (= 14)', categoryId: 'band-large' },
        { id: 'i3-4', text: '0,09 · 5 (= 0,45)', categoryId: 'band-small' },
        { id: 'i3-5', text: '2,4 · 2,5 (= 6)', categoryId: 'band-mid' },
        { id: 'i3-6', text: '12,5 · 2 (= 25)', categoryId: 'band-large' },
        { id: 'i3-7', text: '0,7 · 0,7 (= 0,49)', categoryId: 'band-small' },
        { id: 'i3-8', text: '4,2 · 1,5 (= 6,3)', categoryId: 'band-mid' },
        { id: 'i3-9', text: '5,5 · 4 (= 22)', categoryId: 'band-large' },
        { id: 'i3-10', text: '0,125 · 4 (= 0,5)', categoryId: 'band-small' },
        { id: 'i3-11', text: '3,2 · 3 (= 9,6)', categoryId: 'band-mid' },
        { id: 'i3-12', text: '8,4 · 2 (= 16,8)', categoryId: 'band-large' }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Tizedestört Szorzás Csoportosító"
      subtitle="Rendezd a szorzási feladványokat eredmény és tizedesjegyek száma szerint!"
      badge="🧩 6. Osztály • II. Törtek"
      levels={levelsConfig}
      level={level}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

export default DecimalMultiplicationSorter;
