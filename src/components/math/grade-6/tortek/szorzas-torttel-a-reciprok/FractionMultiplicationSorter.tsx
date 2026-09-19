import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionMultiplicationSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionMultiplicationSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionMultiplicationSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: SZORZAT ÉRTÉKE AZ 1-HEZ KÉPEST
    1: {
      level: 1,
      title: 'Szorzat értéke az 1-hez képest',
      subtitle: 'Csoportosítsd a szorzásokat aszerint, hogy kisebb, egyenlő (reciprokok) vagy nagyobb 1-nél!',
      categories: [
        {
          id: 'less-1',
          title: 'Kisebb mint 1 (< 1)',
          description: 'Két valódi tört szorzata vagy 1-nél kisebb érték',
          color: 'blue'
        },
        {
          id: 'equal-1',
          title: 'Pontosan 1 (= 1, Reciprokok)',
          description: 'Egymás reciprokainak szorzata mindig 1',
          color: 'emerald'
        },
        {
          id: 'greater-1',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'A szorzat értéke meghaladja az 1 egészet',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '1/2 · 1/3 (= 1/6)', categoryId: 'less-1' },
        { id: 'i1-2', text: '2/3 · 3/2', categoryId: 'equal-1' },
        { id: 'i1-3', text: '2/3 · 3 (= 2)', categoryId: 'greater-1' },
        { id: 'i1-4', text: '3/4 · 2/3 (= 1/2)', categoryId: 'less-1' },
        { id: 'i1-5', text: '4/5 · 5/4', categoryId: 'equal-1' },
        { id: 'i1-6', text: '1 1/2 · 2 (= 3)', categoryId: 'greater-1' },
        { id: 'i1-7', text: '1/5 · 4 (= 4/5)', categoryId: 'less-1' },
        { id: 'i1-8', text: '7 · 1/7', categoryId: 'equal-1' },
        { id: 'i1-9', text: '4/3 · 3/2 (= 2)', categoryId: 'greater-1' },
        { id: 'i1-10', text: '2/7 · 3/5 (= 6/35)', categoryId: 'less-1' },
        { id: 'i1-11', text: '1 1/2 · 2/3 (3/2 · 2/3)', categoryId: 'equal-1' },
        { id: 'i1-12', text: '2 1/4 · 2/3 (= 1 1/2)', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: SZORZAT NAGYSÁGRENDJE
    2: {
      level: 2,
      title: 'Szorzat nagyságrendje',
      subtitle: 'Számítsd ki a szorzatot és helyezd a megfelelő intervallumba!',
      categories: [
        {
          id: 'range-1',
          title: '0 és 1/2 között (0 < x < 1/2)',
          description: 'A végeredmény fél egységnél kisebb',
          color: 'rose'
        },
        {
          id: 'range-2',
          title: '1/2 és 1 között (1/2 ≤ x ≤ 1)',
          description: 'Fél és egy egész közé eső szorzat',
          color: 'amber'
        },
        {
          id: 'range-3',
          title: '1-nél nagyobb (x > 1)',
          description: 'Egy egésznél nagyobb szorzat',
          color: 'emerald'
        }
      ],
      items: [
        { id: 'i2-1', text: '1/3 · 1/2 (= 1/6)', categoryId: 'range-1' },
        { id: 'i2-2', text: '3/4 · 8/9 (= 2/3)', categoryId: 'range-2' },
        { id: 'i2-3', text: '1 1/2 · 1 1/3 (= 2)', categoryId: 'range-3' },
        { id: 'i2-4', text: '3/4 · 2/5 (= 3/10)', categoryId: 'range-1' },
        { id: 'i2-5', text: '5/6 · 9/10 (= 3/4)', categoryId: 'range-2' },
        { id: 'i2-6', text: '3/2 · 4/3 (= 2)', categoryId: 'range-3' },
        { id: 'i2-7', text: '1/4 · 1/2 (= 1/8)', categoryId: 'range-1' },
        { id: 'i2-8', text: '2/3 · 3/4 (= 1/2)', categoryId: 'range-2' },
        { id: 'i2-9', text: '2 1/2 · 4/5 (= 2)', categoryId: 'range-3' },
        { id: 'i2-10', text: '2/5 · 1/3 (= 2/15)', categoryId: 'range-1' },
        { id: 'i2-11', text: '4/5 · 5/4 (= 1)', categoryId: 'range-2' },
        { id: 'i2-12', text: '5/3 · 3/2 (= 2 1/2)', categoryId: 'range-3' }
      ]
    },

    // 3. SZINT: VÉGEREDMÉNY ALAKJA
    3: {
      level: 3,
      title: 'Végeredmény alakja',
      subtitle: 'Végezd el a szorzást keresztbe egyszerűsítéssel, és sorold be a végeredmény alakja szerint!',
      categories: [
        {
          id: 'whole',
          title: 'Egész szám (1, 2, 3...)',
          description: 'A nevező 1-re egyszerűsödik',
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
        { id: 'i3-1', text: '2/3 · 3/2 (= 1)', categoryId: 'whole' },
        { id: 'i3-2', text: '2/5 · 5/8 (= 1/4)', categoryId: 'proper' },
        { id: 'i3-3', text: '3/2 · 5/4 (= 1 7/8)', categoryId: 'mixed' },
        { id: 'i3-4', text: '3/4 · 4 (= 3)', categoryId: 'whole' },
        { id: 'i3-5', text: '3/7 · 14/9 (= 2/3)', categoryId: 'proper' },
        { id: 'i3-6', text: '1 1/3 · 1 1/4 (= 1 2/3)', categoryId: 'mixed' },
        { id: 'i3-7', text: '1 1/2 · 2 (= 3)', categoryId: 'whole' },
        { id: 'i3-8', text: '1/4 · 2/3 (= 1/6)', categoryId: 'proper' },
        { id: 'i3-9', text: '2 1/2 · 3/4 (= 1 7/8)', categoryId: 'mixed' },
        { id: 'i3-10', text: '5/6 · 12/5 (= 2)', categoryId: 'whole' },
        { id: 'i3-11', text: '7/8 · 4/7 (= 1/2)', categoryId: 'proper' },
        { id: 'i3-12', text: '1 1/2 · 1 1/5 (= 1 4/5)', categoryId: 'mixed' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-fractions"
      title="Törtek szorzása és reciprok csoportosító"
      subtitle="Húzd vagy kattintással helyezd a kifejezéseket a megfelelő halmazba!"
      badge="✖️ 6. Osztály • II. Szorzás törttel, reciprok"
      topicId="g6-fraction-multiplication-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default FractionMultiplicationSorter;
