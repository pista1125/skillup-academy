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
    // 1. SZINT: TIZEDESJEGYEK SZÁMA / UTOLSÓ HELYIÉRTÉK SZERINT
    1: {
      level: 1,
      title: 'Tizedesjegyek száma',
      subtitle: 'Csoportosítsd a számokat a tizedesvessző utáni jegyek száma szerint!',
      categories: [
        {
          id: 'tenths',
          title: '1 tizedesjegy (tizedek)',
          description: 'A vessző után 1 számjegy áll (pl. 0,4)',
          color: 'blue'
        },
        {
          id: 'hundredths',
          title: '2 tizedesjegy (századok)',
          description: 'A vessző után 2 számjegy áll (pl. 0,25)',
          color: 'emerald'
        },
        {
          id: 'thousandths',
          title: '3 tizedesjegy (ezredek)',
          description: 'A vessző után 3 számjegy áll (pl. 0,125)',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '0,7', categoryId: 'tenths' },
        { id: 'i1-2', text: '0,35', categoryId: 'hundredths' },
        { id: 'i1-3', text: '0,125', categoryId: 'thousandths' },
        { id: 'i1-4', text: '3,2', categoryId: 'tenths' },
        { id: 'i1-5', text: '1,08', categoryId: 'hundredths' },
        { id: 'i1-6', text: '0,004', categoryId: 'thousandths' },
        { id: 'i1-7', text: '12,9', categoryId: 'tenths' },
        { id: 'i1-8', text: '0,99', categoryId: 'hundredths' },
        { id: 'i1-9', text: '2,408', categoryId: 'thousandths' },
        { id: 'i1-10', text: '5,0', categoryId: 'tenths' },
        { id: 'i1-11', text: '0,05', categoryId: 'hundredths' },
        { id: 'i1-12', text: '1,001', categoryId: 'thousandths' }
      ]
    },

    // 2. SZINT: EGÉSZ RÉSZ NAGYSÁGA SZERINT
    2: {
      level: 2,
      title: 'Egész rész nagysága',
      subtitle: 'Sorold be a tizedestörteket az egész részük értéke szerint!',
      categories: [
        {
          id: 'zero-whole',
          title: '0 egész (0,...)',
          description: 'Kisebb mint 1 egész',
          color: 'emerald'
        },
        {
          id: 'one-whole',
          title: '1 egész (1,...)',
          description: '1 és 2 egész közé eső számok',
          color: 'blue'
        },
        {
          id: 'multi-whole',
          title: '2 vagy több egész (≥ 2)',
          description: 'Legalább 2 egész nagyságú számok',
          color: 'amber'
        }
      ],
      items: [
        { id: 'i2-1', text: '0,45', categoryId: 'zero-whole' },
        { id: 'i2-2', text: '1,2', categoryId: 'one-whole' },
        { id: 'i2-3', text: '3,75', categoryId: 'multi-whole' },
        { id: 'i2-4', text: '0,09', categoryId: 'zero-whole' },
        { id: 'i2-5', text: '1,89', categoryId: 'one-whole' },
        { id: 'i2-6', text: '2,01', categoryId: 'multi-whole' },
        { id: 'i2-7', text: '0,999', categoryId: 'zero-whole' },
        { id: 'i2-8', text: '1,005', categoryId: 'one-whole' },
        { id: 'i2-9', text: '10,4', categoryId: 'multi-whole' },
        { id: 'i2-10', text: '0,1', categoryId: 'zero-whole' },
        { id: 'i2-11', text: '1,5', categoryId: 'one-whole' },
        { id: 'i2-12', text: '5,08', categoryId: 'multi-whole' }
      ]
    },

    // 3. SZINT: NAGYSÁGRENDI BESOROLÁS (0,5 ÉS 1-HEZ KÉPEST)
    3: {
      level: 3,
      title: 'Érték nagyságrendje',
      subtitle: 'Hasonlítsd a tizedes törtet a 0,5 (fél) és az 1 egész értékekhez!',
      categories: [
        {
          id: 'less-half',
          title: 'Kisebb mint 0,5 (< 0,5)',
          description: '0 és 0,5 közé eső tizedestörtek',
          color: 'rose'
        },
        {
          id: 'half-one',
          title: '0,5 és 1 között (0,5 ≤ x ≤ 1)',
          description: 'Fél és egy egész közötti értékek',
          color: 'emerald'
        },
        {
          id: 'greater-one',
          title: 'Nagyobb mint 1 (> 1)',
          description: '1 egésznél nagyobb tizedestörtek',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i3-1', text: '0,2', categoryId: 'less-half' },
        { id: 'i3-2', text: '0,75', categoryId: 'half-one' },
        { id: 'i3-3', text: '1,25', categoryId: 'greater-one' },
        { id: 'i3-4', text: '0,05', categoryId: 'less-half' },
        { id: 'i3-5', text: '0,6', categoryId: 'half-one' },
        { id: 'i3-6', text: '2,1', categoryId: 'greater-one' },
        { id: 'i3-7', text: '0,49', categoryId: 'less-half' },
        { id: 'i3-8', text: '0,888', categoryId: 'half-one' },
        { id: 'i3-9', text: '1,01', categoryId: 'greater-one' },
        { id: 'i3-10', text: '0,125', categoryId: 'less-half' },
        { id: 'i3-11', text: '0,50', categoryId: 'half-one' },
        { id: 'i3-12', text: '3,05', categoryId: 'greater-one' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      title="Tizedes törtek csoportosító játék"
      subtitle="Húzd vagy kattintással helyezd a tizedestörteket a megfelelő kategóriába!"
      badge="🪙 5. Osztály • Tizedes törtek"
      topicId="g5-decimal-fractions-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default DecimalFractionsSorter;
