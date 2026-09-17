import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionDivideSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionDivideSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionDivideSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: ALKALMAZANDÓ SZABÁLY SZERINT
    1: {
      level: 1,
      title: 'Melyik szabályt kell alkalmazni?',
      subtitle: 'Döntsd el, hogy a számlálót osztjuk (ha osztható), vagy a nevezőt szorozzuk!',
      categories: [
        {
          id: 'num-div',
          title: 'Számláló osztása (osztható)',
          description: 'A számláló maradék nélkül osztható a számmal',
          color: 'emerald'
        },
        {
          id: 'den-mult',
          title: 'Nevező szorzása (nem osztható)',
          description: 'A számláló nem osztható, a nevezőt szorozzuk',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '6/7 : 2', categoryId: 'num-div' },
        { id: 'i1-2', text: '3/5 : 2', categoryId: 'den-mult' },
        { id: 'i1-3', text: '8/11 : 4', categoryId: 'num-div' },
        { id: 'i1-4', text: '1/4 : 3', categoryId: 'den-mult' },
        { id: 'i1-5', text: '9/10 : 3', categoryId: 'num-div' },
        { id: 'i1-6', text: '2/7 : 3', categoryId: 'den-mult' },
        { id: 'i1-7', text: '10/13 : 5', categoryId: 'num-div' },
        { id: 'i1-8', text: '5/8 : 2', categoryId: 'den-mult' },
        { id: 'i1-9', text: '12/17 : 6', categoryId: 'num-div' },
        { id: 'i1-10', text: '7/9 : 4', categoryId: 'den-mult' },
        { id: 'i1-11', text: '15/16 : 3', categoryId: 'num-div' },
        { id: 'i1-12', text: '4/7 : 3', categoryId: 'den-mult' }
      ]
    },

    // 2. SZINT: LEGEGYSZERŰBB VÉGEREDMÉNY NEVEZŐJE
    2: {
      level: 2,
      title: 'Végeredmény nevezője',
      subtitle: 'Számítsd ki az osztást fejben, és csoportosíts a végeredmény nevezője szerint!',
      categories: [
        {
          id: 'den-small',
          title: 'Nevező ≤ 10',
          description: 'A végeredmény nevezője legfeljebb 10',
          color: 'blue'
        },
        {
          id: 'den-med',
          title: 'Nevező 11 és 20 között',
          description: 'A végeredmény nevezője 11-20',
          color: 'indigo'
        },
        {
          id: 'den-large',
          title: 'Nevező > 20',
          description: 'A végeredmény nevezője 20 feletti',
          color: 'rose'
        }
      ],
      items: [
        { id: 'i2-1', text: '1/3 : 2 (= 1/6)', categoryId: 'den-small' },
        { id: 'i2-2', text: '3/4 : 2 (= 3/8)', categoryId: 'den-small' },
        { id: 'i2-3', text: '4/5 : 2 (= 2/5)', categoryId: 'den-small' },
        { id: 'i2-4', text: '6/7 : 3 (= 2/7)', categoryId: 'den-small' },
        { id: 'i2-5', text: '1/4 : 3 (= 1/12)', categoryId: 'den-med' },
        { id: 'i2-6', text: '2/5 : 3 (= 2/15)', categoryId: 'den-med' },
        { id: 'i2-7', text: '5/7 : 2 (= 5/14)', categoryId: 'den-med' },
        { id: 'i2-8', text: '3/5 : 4 (= 3/20)', categoryId: 'den-med' },
        { id: 'i2-9', text: '1/8 : 3 (= 1/24)', categoryId: 'den-large' },
        { id: 'i2-10', text: '2/7 : 5 (= 2/35)', categoryId: 'den-large' },
        { id: 'i2-11', text: '7/10 : 3 (= 7/30)', categoryId: 'den-large' },
        { id: 'i2-12', text: '3/8 : 4 (= 3/32)', categoryId: 'den-large' }
      ]
    },

    // 3. SZINT: VÉGEREDMÉNY NAGYSÁGA
    3: {
      level: 3,
      title: 'Eredmény nagysága',
      subtitle: 'Hasonlítsd össze a végeredményt az 1/4 és 1/2 törtekkel!',
      categories: [
        {
          id: 'less-quarter',
          title: 'Kisebb mint 1/4',
          description: 'Végeredmény < 1/4',
          color: 'amber'
        },
        {
          id: 'quarter-half',
          title: '1/4 és 1/2 között',
          description: '1/4 ≤ Végeredmény ≤ 1/2',
          color: 'emerald'
        },
        {
          id: 'greater-half',
          title: 'Nagyobb mint 1/2',
          description: 'Végeredmény > 1/2',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i3-1', text: '1/3 : 2', categoryId: 'less-quarter' },
        { id: 'i3-2', text: '2/5 : 3', categoryId: 'less-quarter' },
        { id: 'i3-3', text: '1/4 : 2', categoryId: 'less-quarter' },
        { id: 'i3-4', text: '3/5 : 4', categoryId: 'less-quarter' },
        { id: 'i3-5', text: '3/4 : 2', categoryId: 'quarter-half' },
        { id: 'i3-6', text: '4/5 : 2', categoryId: 'quarter-half' },
        { id: 'i3-7', text: '6/7 : 3', categoryId: 'quarter-half' },
        { id: 'i3-8', text: '1 1/2 : 3', categoryId: 'quarter-half' },
        { id: 'i3-9', text: '2 1/4 : 3', categoryId: 'greater-half' },
        { id: 'i3-10', text: '1 1/3 : 2', categoryId: 'greater-half' },
        { id: 'i3-11', text: '1 4/5 : 2', categoryId: 'greater-half' },
        { id: 'i3-12', text: '2 2/3 : 4', categoryId: 'greater-half' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      title="Tört osztása csoportosító játék"
      subtitle="Húzd vagy kattintással helyezd a feladatokat a megfelelő kategóriába!"
      badge="➗ 5. Osztály • Törtek"
      topicId="g5-fraction-divide-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default FractionDivideSorter;
