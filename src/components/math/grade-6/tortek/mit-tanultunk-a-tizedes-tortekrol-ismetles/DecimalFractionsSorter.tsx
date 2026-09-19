import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalFractionsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function DecimalFractionsSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalFractionsSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: ÉRTÉK AZ 1 EGÉSZHEZ KÉPEST
    1: {
      level: 1,
      title: 'Érték az 1 egészhez képest',
      subtitle: 'Csoportosítsd a tizedestörteket és törteket aszerint, hogy kisebbek, egyenlők vagy nagyobbak 1-nél!',
      categories: [
        {
          id: 'less-1',
          title: 'Kisebb mint 1 (< 1)',
          description: 'A szám nem éri el az 1 egészet (pl. 0,45)',
          color: 'blue'
        },
        {
          id: 'equal-1',
          title: 'Pontosan 1 (= 1)',
          description: 'Pontosan egy egész értékű (pl. 1,0 vagy 10/10)',
          color: 'emerald'
        },
        {
          id: 'greater-1',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'A szám meghaladja az 1 egészet (pl. 1,25)',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '0,45', categoryId: 'less-1' },
        { id: 'i1-2', text: '1,00', categoryId: 'equal-1' },
        { id: 'i1-3', text: '1,25', categoryId: 'greater-1' },
        { id: 'i1-4', text: '0,08', categoryId: 'less-1' },
        { id: 'i1-5', text: '5/5 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-6', text: '2,7', categoryId: 'greater-1' },
        { id: 'i1-7', text: '0,899', categoryId: 'less-1' },
        { id: 'i1-8', text: '10/10 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-9', text: '3,14', categoryId: 'greater-1' },
        { id: 'i1-10', text: '0,125', categoryId: 'less-1' },
        { id: 'i1-11', text: '100/100 (= 1)', categoryId: 'equal-1' },
        { id: 'i1-12', text: '1,01', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: NAGYSÁGRENDI SÁVOK ÉS INTERVALLUMOK
    2: {
      level: 2,
      title: 'Nagyságrendi intervallumok',
      subtitle: 'Helyezd a tizedestörteket a megfelelő nagyságrendi tartományba!',
      categories: [
        {
          id: 'band-low',
          title: '0 és 0,5 között',
          description: 'Félnél kisebb pozitív számok (0 ≤ x < 0,5)',
          color: 'amber'
        },
        {
          id: 'band-mid',
          title: '0,5 és 1,0 között',
          description: 'Legalább fél, de legfeljebb egy egész (0,5 ≤ x ≤ 1,0)',
          color: 'teal'
        },
        {
          id: 'band-high',
          title: '1,0 felett',
          description: 'Egy egésznél nagyobb számok (x > 1,0)',
          color: 'rose'
        }
      ],
      items: [
        { id: 'i2-1', text: '0,2', categoryId: 'band-low' },
        { id: 'i2-2', text: '0,75', categoryId: 'band-mid' },
        { id: 'i2-3', text: '1,4', categoryId: 'band-high' },
        { id: 'i2-4', text: '0,38', categoryId: 'band-low' },
        { id: 'i2-5', text: '0,6', categoryId: 'band-mid' },
        { id: 'i2-6', text: '2,05', categoryId: 'band-high' },
        { id: 'i2-7', text: '0,09', categoryId: 'band-low' },
        { id: 'i2-8', text: '0,85', categoryId: 'band-mid' },
        { id: 'i2-9', text: '1,125', categoryId: 'band-high' },
        { id: 'i2-10', text: '0,49', categoryId: 'band-low' },
        { id: 'i2-11', text: '0,50', categoryId: 'band-mid' },
        { id: 'i2-12', text: '3,6', categoryId: 'band-high' }
      ]
    },

    // 3. SZINT: KEREKÍTÉS EGÉSZ SZÁMRA
    3: {
      level: 3,
      title: 'Kerekítés egész számra',
      subtitle: 'Csoportosítsd a számokat aszerint, hogy egészre kerekítve 1, 2 vagy 3 egészet kapunk!',
      categories: [
        {
          id: 'round-1',
          title: 'Kerekítve 1 egész',
          description: 'A legközelebbi egész szám az 1 (0,5 ≤ x < 1,5)',
          color: 'blue'
        },
        {
          id: 'round-2',
          title: 'Kerekítve 2 egész',
          description: 'A legközelebbi egész szám a 2 (1,5 ≤ x < 2,5)',
          color: 'indigo'
        },
        {
          id: 'round-3',
          title: 'Kerekítve 3 egész',
          description: 'A legközelebbi egész szám a 3 (2,5 ≤ x < 3,5)',
          color: 'violet'
        }
      ],
      items: [
        { id: 'i3-1', text: '0,92 (≈ 1)', categoryId: 'round-1' },
        { id: 'i3-2', text: '1,08 (≈ 1)', categoryId: 'round-1' },
        { id: 'i3-3', text: '1,45 (≈ 1)', categoryId: 'round-1' },
        { id: 'i3-4', text: '0,65 (≈ 1)', categoryId: 'round-1' },
        { id: 'i3-5', text: '1,85 (≈ 2)', categoryId: 'round-2' },
        { id: 'i3-6', text: '2,12 (≈ 2)', categoryId: 'round-2' },
        { id: 'i3-7', text: '1,51 (≈ 2)', categoryId: 'round-2' },
        { id: 'i3-8', text: '2,49 (≈ 2)', categoryId: 'round-2' },
        { id: 'i3-9', text: '2,91 (≈ 3)', categoryId: 'round-3' },
        { id: 'i3-10', text: '3,25 (≈ 3)', categoryId: 'round-3' },
        { id: 'i3-11', text: '2,78 (≈ 3)', categoryId: 'round-3' },
        { id: 'i3-12', text: '3,04 (≈ 3)', categoryId: 'round-3' }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Tizedestört Csoportosító"
      subtitle="Rendezd a tizedestörteket nagyságrend és kerekítés szerint!"
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

export default DecimalFractionsSorter;
