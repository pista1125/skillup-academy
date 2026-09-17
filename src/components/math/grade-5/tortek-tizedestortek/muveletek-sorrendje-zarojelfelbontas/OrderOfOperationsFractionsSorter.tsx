import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface OrderOfOperationsFractionsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function OrderOfOperationsFractionsSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: OrderOfOperationsFractionsSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: MELYIK MŰVELETET VÉGEZZÜK EL LEGKORÁBBAN?
    1: {
      level: 1,
      title: 'Elsőként elvégzendő művelet',
      subtitle: 'Döntsd el a műveleti hierarchia alapján, hogy melyik lépéssel kezdjük a számolást!',
      categories: [
        {
          id: 'parentheses',
          title: 'Zárójel belseje',
          description: 'A zárójelben lévő műveletnek van elsőbbsége',
          color: 'purple'
        },
        {
          id: 'mult-div',
          title: 'Szorzás vagy Osztás',
          description: 'Magasabb rendű művelet a zárójelek után',
          color: 'indigo'
        },
        {
          id: 'add-sub',
          title: 'Összeadás / Kivonás',
          description: 'Azonos rendű műveletek balról jobbra haladva',
          color: 'emerald'
        }
      ],
      items: [
        { id: 'i1-1', text: '(1/2 + 1/4) · 3', categoryId: 'parentheses' },
        { id: 'i1-2', text: '2/3 + 1/3 · 4', categoryId: 'mult-div' },
        { id: 'i1-3', text: '3/4 - 1/2 : 2', categoryId: 'mult-div' },
        { id: 'i1-4', text: '5 · (3/4 - 1/4)', categoryId: 'parentheses' },
        { id: 'i1-5', text: '1/2 + 1/4 - 1/8', categoryId: 'add-sub' },
        { id: 'i1-6', text: '4/5 - 1/5 + 2/5', categoryId: 'add-sub' },
        { id: 'i1-7', text: '(1 - 1/3) : 2', categoryId: 'parentheses' },
        { id: 'i1-8', text: '1/3 · 2 + 1/4', categoryId: 'mult-div' },
        { id: 'i1-9', text: '3/5 : 2 - 1/10', categoryId: 'mult-div' },
        { id: 'i1-10', text: '10 · (1/5 + 2/5)', categoryId: 'parentheses' },
        { id: 'i1-11', text: '3/7 + 2/7 - 1/7', categoryId: 'add-sub' },
        { id: 'i1-12', text: '1 - 1/2 + 1/4', categoryId: 'add-sub' }
      ]
    },

    // 2. SZINT: KIFEJEZÉS ÉRTÉKE 1 EGÉSZHEZ KÉPEST
    2: {
      level: 2,
      title: 'Kifejezés értéke 1 egészhez képest',
      subtitle: 'Számítsd ki a kifejezést a helyes sorrendben, és hasonlítsd 1-hez!',
      categories: [
        {
          id: 'less-one',
          title: 'Kisebb mint 1 (< 1)',
          description: 'A kifejezés értéke 1-nél kisebb',
          color: 'amber'
        },
        {
          id: 'equal-one',
          title: 'Pontosan 1 (= 1)',
          description: 'A kifejezés értéke 1 teljes egész',
          color: 'emerald'
        },
        {
          id: 'greater-one',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'A kifejezés értéke 1-nél nagyobb',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i2-1', text: '1/4 + 1/4 · 3', categoryId: 'equal-one' },
        { id: 'i2-2', text: '1/2 + 1/2 : 2', categoryId: 'less-one' },
        { id: 'i2-3', text: '(1/2 + 1/4) · 4', categoryId: 'greater-one' },
        { id: 'i2-4', text: '(1/3 + 2/3) · 1', categoryId: 'equal-one' },
        { id: 'i2-5', text: '3/4 - 1/2 : 2', categoryId: 'less-one' },
        { id: 'i2-6', text: '1/3 + 2/3 · 2', categoryId: 'greater-one' },
        { id: 'i2-7', text: '6 · (1/2 - 1/3)', categoryId: 'equal-one' },
        { id: 'i2-8', text: '(4/5 - 1/5) : 3', categoryId: 'less-one' },
        { id: 'i2-9', text: '1/2 · 4 + 1/3 · 6', categoryId: 'greater-one' },
        { id: 'i2-10', text: '3/8 + 1/8 · 5', categoryId: 'equal-one' },
        { id: 'i2-11', text: '2/5 + 1/5 : 2', categoryId: 'less-one' },
        { id: 'i2-12', text: '2 · (1/2 + 1/4)', categoryId: 'greater-one' }
      ]
    },

    // 3. SZINT: VÉGEREDMÉNY ÉRTÉKTARTOMÁNYA
    3: {
      level: 3,
      title: 'Végeredmény értéktartománya',
      subtitle: 'Kategorizáld a kifejezéseket a végeredményük nagysága szerint!',
      categories: [
        {
          id: 'range-low',
          title: '0 és 1/2 között (≤ 1/2)',
          description: 'Végeredmény legfeljebb 1/2',
          color: 'blue'
        },
        {
          id: 'range-mid',
          title: '1/2 és 1 között',
          description: '1/2 < Végeredmény ≤ 1',
          color: 'emerald'
        },
        {
          id: 'range-high',
          title: '1-nél nagyobb (> 1)',
          description: 'Végeredmény > 1',
          color: 'violet'
        }
      ],
      items: [
        { id: 'i3-1', text: '(3/4 - 1/4) : 2', categoryId: 'range-low' },
        { id: 'i3-2', text: '(1/2 + 1/3) : 5', categoryId: 'range-low' },
        { id: 'i3-3', text: '(1 - 1/5) : 2', categoryId: 'range-low' },
        { id: 'i3-4', text: '(4/5 - 1/5) : 3', categoryId: 'range-low' },
        { id: 'i3-5', text: '1/2 + 1/2 : 2', categoryId: 'range-mid' },
        { id: 'i3-6', text: '1/4 + 1/4 · 3', categoryId: 'range-mid' },
        { id: 'i3-7', text: '1/2 + (1 - 3/4)', categoryId: 'range-mid' },
        { id: 'i3-8', text: '3/8 + 1/8 · 5', categoryId: 'range-mid' },
        { id: 'i3-9', text: '(1/2 + 1/4) · 4', categoryId: 'range-high' },
        { id: 'i3-10', text: '2 - (1/2 + 1/4)', categoryId: 'range-high' },
        { id: 'i3-11', text: '2 · (1/2 + 1/4)', categoryId: 'range-high' },
        { id: 'i3-12', text: '1/3 + 2/3 · 2', categoryId: 'range-high' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      title="Műveleti sorrend csoportosító játék"
      subtitle="Húzd vagy kattintással helyezd a feladatokat a megfelelő kategóriába!"
      badge="🔢 5. Osztály • Törtek"
      topicId="g5-fractions-order-of-operations-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default OrderOfOperationsFractionsSorter;
