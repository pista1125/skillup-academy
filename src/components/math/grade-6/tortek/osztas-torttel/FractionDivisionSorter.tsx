import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionDivisionSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionDivisionSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionDivisionSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: HÁNYADOS ÉRTÉKE AZ 1-HEZ KÉPEST
    1: {
      level: 1,
      title: 'Hányados értéke az 1-hez képest',
      subtitle: 'Csoportosítsd az osztásokat aszerint, hogy a hányados kisebb, egyenlő (1) vagy nagyobb 1-nél!',
      categories: [
        {
          id: 'less-1',
          title: 'Kisebb mint 1 (< 1)',
          description: 'A hányados 1-nél kisebb tört',
          color: 'blue'
        },
        {
          id: 'equal-1',
          title: 'Pontosan 1 (= 1, Önmagával osztva)',
          description: 'Bármely nem nulla szám önmagával osztva 1',
          color: 'emerald'
        },
        {
          id: 'greater-1',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'A hányados meghaladja az 1 egészet',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '1/4 : 1/2 (= 1/2)', categoryId: 'less-1' },
        { id: 'i1-2', text: '3/4 : 3/4', categoryId: 'equal-1' },
        { id: 'i1-3', text: '1/2 : 1/4 (= 2)', categoryId: 'greater-1' },
        { id: 'i1-4', text: '2/5 : 2 (= 1/5)', categoryId: 'less-1' },
        { id: 'i1-5', text: '2/5 : 2/5', categoryId: 'equal-1' },
        { id: 'i1-6', text: '3 : 1/2 (= 6)', categoryId: 'greater-1' },
        { id: 'i1-7', text: '3/8 : 3/4 (= 1/2)', categoryId: 'less-1' },
        { id: 'i1-8', text: '5/8 : 5/8', categoryId: 'equal-1' },
        { id: 'i1-9', text: '2/3 : 1/3 (= 2)', categoryId: 'greater-1' },
        { id: 'i1-10', text: '3/7 : 2 (= 3/14)', categoryId: 'less-1' },
        { id: 'i1-11', text: '1 1/2 : 1 1/2', categoryId: 'equal-1' },
        { id: 'i1-12', text: '1 1/2 : 3/4 (= 2)', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: HÁNYADOS NAGYSÁGRENDJE
    2: {
      level: 2,
      title: 'Hányados nagyságrendje',
      subtitle: 'Számítsd ki a hányadost és helyezd a megfelelő intervallumba!',
      categories: [
        {
          id: 'range-1',
          title: '0 és 1 között (0 < x < 1)',
          description: 'A végeredmény 1-nél kisebb',
          color: 'rose'
        },
        {
          id: 'range-2',
          title: '1 és 2 között (1 ≤ x ≤ 2)',
          description: '1 és 2 közé eső hányados',
          color: 'amber'
        },
        {
          id: 'range-3',
          title: '2-nél nagyobb (x > 2)',
          description: 'Két egésznél nagyobb hányados',
          color: 'emerald'
        }
      ],
      items: [
        { id: 'i2-1', text: '3/4 : 9/8 (= 2/3)', categoryId: 'range-1' },
        { id: 'i2-2', text: '2/3 : 4/9 (= 1 1/2)', categoryId: 'range-2' },
        { id: 'i2-3', text: '2 : 1/3 (= 6)', categoryId: 'range-3' },
        { id: 'i2-4', text: '5/6 : 10/3 (= 1/4)', categoryId: 'range-1' },
        { id: 'i2-5', text: '4/5 : 8/15 (= 1 1/2)', categoryId: 'range-2' },
        { id: 'i2-6', text: '6/7 : 2/7 (= 3)', categoryId: 'range-3' },
        { id: 'i2-7', text: '7/10 : 14/5 (= 1/4)', categoryId: 'range-1' },
        { id: 'i2-8', text: '3/4 : 3/4 (= 1)', categoryId: 'range-2' },
        { id: 'i2-9', text: '2 1/4 : 3/8 (= 6)', categoryId: 'range-3' },
        { id: 'i2-10', text: '1/3 : 2/3 (= 1/2)', categoryId: 'range-1' },
        { id: 'i2-11', text: '1 1/2 : 1 (= 1 1/2)', categoryId: 'range-2' },
        { id: 'i2-12', text: '4 : 1/2 (= 8)', categoryId: 'range-3' }
      ]
    },

    // 3. SZINT: VÉGEREDMÉNY ALAKJA
    3: {
      level: 3,
      title: 'Végeredmény alakja',
      subtitle: 'Végezd el az osztást a reciprok segítségével és csoportosíts a hányados formátuma szerint!',
      categories: [
        {
          id: 'whole',
          title: 'Egész szám (1, 2, 3...)',
          description: 'A hányados pontosan egész szám',
          color: 'blue'
        },
        {
          id: 'proper',
          title: 'Valódi tört (< 1)',
          description: 'Egyszerűsített valódi tört alak',
          color: 'teal'
        },
        {
          id: 'mixed',
          title: 'Vegyes tört / Áltört (> 1)',
          description: 'Egynél nagyobb nem egész tört',
          color: 'indigo'
        }
      ],
      items: [
        { id: 'i3-1', text: '1/2 : 1/4 (= 2)', categoryId: 'whole' },
        { id: 'i3-2', text: '3/4 : 9/8 (= 2/3)', categoryId: 'proper' },
        { id: 'i3-3', text: '2/3 : 4/9 (= 1 1/2)', categoryId: 'mixed' },
        { id: 'i3-4', text: '2 1/2 : 1 1/4 (= 2)', categoryId: 'whole' },
        { id: 'i3-5', text: '5/6 : 10/3 (= 1/4)', categoryId: 'proper' },
        { id: 'i3-6', text: '4/5 : 8/15 (= 1 1/2)', categoryId: 'mixed' },
        { id: 'i3-7', text: '3 : 1/3 (= 9)', categoryId: 'whole' },
        { id: 'i3-8', text: '3/7 : 2 (= 3/14)', categoryId: 'proper' },
        { id: 'i3-9', text: '3/2 : 4/5 (= 1 7/8)', categoryId: 'mixed' },
        { id: 'i3-10', text: '6/7 : 2/7 (= 3)', categoryId: 'whole' },
        { id: 'i3-11', text: '1/3 : 1/2 (= 2/3)', categoryId: 'proper' },
        { id: 'i3-12', text: '5/4 : 2/3 (= 1 7/8)', categoryId: 'mixed' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-fractions"
      title="Törtek osztása csoportosító"
      subtitle="Húzd vagy kattintással helyezd az osztásokat a megfelelő kategóriába!"
      badge="➗ 6. Osztály • II. Osztás törttel"
      topicId="g6-fraction-division-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default FractionDivisionSorter;
