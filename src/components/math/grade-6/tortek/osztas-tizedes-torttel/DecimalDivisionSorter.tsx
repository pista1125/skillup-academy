import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalDivisionSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function DecimalDivisionSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalDivisionSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: HÁNYADOS ÉRTÉKE 1-HEZ KÉPEST
    1: {
      level: 1,
      title: 'Hányados értéke az 1 egészhez képest',
      subtitle: 'Csoportosítsd az osztásokat aszerint, hogy a hányados kisebb, egyenlő (1) vagy nagyobb 1-nél!',
      categories: [
        {
          id: 'less-1',
          title: 'Kisebb mint 1 (< 1)',
          description: 'A hányados 1-nél kisebb (pl. 0,2 vagy 0,5)',
          color: 'blue'
        },
        {
          id: 'equal-1',
          title: 'Pontosan 1 (= 1)',
          description: 'A számot önmagával osztjuk (pl. 2,5 : 2,5)',
          color: 'emerald'
        },
        {
          id: 'greater-1',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'A hányados meghaladja az 1 egészet (pl. 8 vagy 6)',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '0,4 : 2 (= 0,2)', categoryId: 'less-1' },
        { id: 'i1-2', text: '2,5 : 2,5 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-3', text: '4,8 : 0,6 (= 8)', categoryId: 'greater-1' },
        { id: 'i1-4', text: '0,35 : 0,7 (= 0,5)', categoryId: 'less-1' },
        { id: 'i1-5', text: '0,75 : 0,75 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-6', text: '3 : 0,5 (= 6)', categoryId: 'greater-1' },
        { id: 'i1-7', text: '0,12 : 0,4 (= 0,3)', categoryId: 'less-1' },
        { id: 'i1-8', text: '10 : 10 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-9', text: '1,5 : 0,3 (= 5)', categoryId: 'greater-1' },
        { id: 'i1-10', text: '0,08 : 0,2 (= 0,4)', categoryId: 'less-1' },
        { id: 'i1-11', text: '0,05 : 0,05 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-12', text: '7 : 0,1 (= 70)', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: NAGYSÁGRENDI SÁVOK
    2: {
      level: 2,
      title: 'Nagyságrendi sávok',
      subtitle: 'Helyezd az osztási feladványokat a megfelelő értéktartományba!',
      categories: [
        {
          id: 'band-small',
          title: '0 és 1 között [0; 1[',
          description: 'Egésznél kisebb hányadosok',
          color: 'blue'
        },
        {
          id: 'band-mid',
          title: '1 és 10 között [1; 10]',
          description: 'Egy és tíz közötti hányadosok',
          color: 'indigo'
        },
        {
          id: 'band-large',
          title: '10 felett (> 10)',
          description: 'Tíznél nagyobb eredmények',
          color: 'rose'
        }
      ],
      items: [
        { id: 'i2-1', text: '1,2 : 3 (= 0,4)', categoryId: 'band-small' },
        { id: 'i2-2', text: '2,4 : 0,4 (= 6)', categoryId: 'band-mid' },
        { id: 'i2-3', text: '1,2 : 0,04 (= 30)', categoryId: 'band-large' },
        { id: 'i2-4', text: '0,45 : 0,9 (= 0,5)', categoryId: 'band-small' },
        { id: 'i2-5', text: '0,72 : 0,9 (= 0,8)', categoryId: 'band-small' },
        { id: 'i2-6', text: '8,4 : 2 (= 4,2)', categoryId: 'band-mid' },
        { id: 'i2-7', text: '15 : 0,5 (= 30)', categoryId: 'band-large' },
        { id: 'i2-8', text: '0,18 : 0,6 (= 0,3)', categoryId: 'band-small' },
        { id: 'i2-9', text: '3,6 : 1,2 (= 3)', categoryId: 'band-mid' },
        { id: 'i2-10', text: '4,5 : 0,01 (= 450)', categoryId: 'band-large' },
        { id: 'i2-11', text: '2,5 : 0,5 (= 5)', categoryId: 'band-mid' },
        { id: 'i2-12', text: '6 : 0,25 (= 24)', categoryId: 'band-large' }
      ]
    },

    // 3. SZINT: EREDMÉNY TÍPUSA
    3: {
      level: 3,
      title: 'Eredmény típusa és nagyságrendje',
      subtitle: 'Csoportosítsd az osztásokat az eredmény jellege alapján!',
      categories: [
        {
          id: 'type-int',
          title: '1 és 10 közötti egész',
          description: 'Pontos egész szám eredmény (pl. 3, 5, 6, 8)',
          color: 'emerald'
        },
        {
          id: 'type-dec',
          title: 'Tizedestört alak',
          description: 'Törtrésszel rendelkező szám (pl. 0,2; 0,45; 2,5)',
          color: 'teal'
        },
        {
          id: 'type-large',
          title: '10 feletti szám',
          description: 'Tíznél nagyobb értékű eredmény (pl. 24, 30, 50)',
          color: 'violet'
        }
      ],
      items: [
        { id: 'i3-1', text: '4,8 : 0,6 (= 8)', categoryId: 'type-int' },
        { id: 'i3-2', text: '4,5 : 10 (= 0,45)', categoryId: 'type-dec' },
        { id: 'i3-3', text: '5 : 0,1 (= 50)', categoryId: 'type-large' },
        { id: 'i3-4', text: '2,4 : 0,8 (= 3)', categoryId: 'type-int' },
        { id: 'i3-5', text: '7,5 : 3 (= 2,5)', categoryId: 'type-dec' },
        { id: 'i3-6', text: '1,2 : 0,04 (= 30)', categoryId: 'type-large' },
        { id: 'i3-7', text: '0,36 : 0,06 (= 6)', categoryId: 'type-int' },
        { id: 'i3-8', text: '0,8 : 4 (= 0,2)', categoryId: 'type-dec' },
        { id: 'i3-9', text: '8 : 0,2 (= 40)', categoryId: 'type-large' },
        { id: 'i3-10', text: '1,5 : 0,3 (= 5)', categoryId: 'type-int' },
        { id: 'i3-11', text: '6,3 : 9 (= 0,7)', categoryId: 'type-dec' },
        { id: 'i3-12', text: '6 : 0,25 (= 24)', categoryId: 'type-large' }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Tizedestört Osztás Csoportosító"
      subtitle="Rendezd az osztásokat hányadosuk értéke és típusa szerint!"
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

export default DecimalDivisionSorter;
