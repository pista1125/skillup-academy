import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface ComplexOperationsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ComplexOperationsSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ComplexOperationsSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: MELYIK MŰVELETET KELL ELŐSZÖR ELVÉGEZNI?
    1: {
      level: 1,
      title: 'Melyik művelet az első?',
      subtitle: 'Csoportosítsd a kifejezéseket aszerint, hogy melyik műveletet kell legelőször kiszámítani!',
      categories: [
        {
          id: 'cat-bracket',
          title: 'Zárójelben lévő művelet',
          description: 'A zárójel mindig a legmagasabb prioritású!',
          color: 'purple'
        },
        {
          id: 'cat-mult-div',
          title: 'Szorzás vagy osztás',
          description: 'Zárójel nélkül a szorzás és osztás megelőzi az összeadást/kivonást.',
          color: 'blue'
        },
        {
          id: 'cat-add-sub',
          title: 'Összeadás vagy kivonás',
          description: 'Azonos rendű műveletek esetén balról jobbra haladunk.',
          color: 'emerald'
        }
      ],
      items: [
        { id: 'i1-1', text: '(5 + 3) · 2', categoryId: 'cat-bracket' },
        { id: 'i1-2', text: '12 : (2 + 4)', categoryId: 'cat-bracket' },
        { id: 'i1-3', text: '3/4 · (1/2 + 1/4)', categoryId: 'cat-bracket' },
        { id: 'i1-4', text: '10 - (3,5 - 1,5)', categoryId: 'cat-bracket' },
        { id: 'i1-5', text: '5 + 3 · 2', categoryId: 'cat-mult-div' },
        { id: 'i1-6', text: '10 - 8 : 4', categoryId: 'cat-mult-div' },
        { id: 'i1-7', text: '1/2 + 3/4 · 8', categoryId: 'cat-mult-div' },
        { id: 'i1-8', text: '6,5 - 2 · 1,5', categoryId: 'cat-mult-div' },
        { id: 'i1-9', text: '15 - 5 + 3', categoryId: 'cat-add-sub' },
        { id: 'i1-10', text: '2,5 + 3,5 - 1', categoryId: 'cat-add-sub' },
        { id: 'i1-11', text: '3/4 + 1/4 - 1/2', categoryId: 'cat-add-sub' },
        { id: 'i1-12', text: '12 - 4 - 2', categoryId: 'cat-add-sub' }
      ]
    },

    // 2. SZINT: ZÁRÓJELFELBONTÁSI SZABÁLY
    2: {
      level: 2,
      title: 'Zárójelfelbontás és előjelek',
      subtitle: 'Csoportosítsd a kifejezéseket a zárójel előtti előjel vagy szorzó hatása szerint!',
      categories: [
        {
          id: 'cat-keep',
          title: 'Előjelek megmaradnak (+)',
          description: '+ jel előtt: a zárójel simán elhagyható.',
          color: 'emerald'
        },
        {
          id: 'cat-flip',
          title: 'Előjelek megfordulnak (-)',
          description: '- jel előtt: a zárójelben minden tag előjele ellentétére vált!',
          color: 'rose'
        },
        {
          id: 'cat-distrib',
          title: 'Tagok megszorzódnak (k · )',
          description: 'A szorzóval a zárójel minden tagját meg kell szorozni.',
          color: 'blue'
        }
      ],
      items: [
        { id: 'i2-1', text: '+(a - b + c)', categoryId: 'cat-keep' },
        { id: 'i2-2', text: 'x + (y - z)', categoryId: 'cat-keep' },
        { id: 'i2-3', text: '3 + (2/3 - 1/6)', categoryId: 'cat-keep' },
        { id: 'i2-4', text: 'a + (5 - b)', categoryId: 'cat-keep' },
        { id: 'i2-5', text: '-(a + b)', categoryId: 'cat-flip' },
        { id: 'i2-6', text: '-(x - y + z)', categoryId: 'cat-flip' },
        { id: 'i2-7', text: '5 - (3/4 - 1/2)', categoryId: 'cat-flip' },
        { id: 'i2-8', text: '-(2a - 3b)', categoryId: 'cat-flip' },
        { id: 'i2-9', text: '2 · (a + b)', categoryId: 'cat-distrib' },
        { id: 'i2-10', text: '3 · (x - 2y)', categoryId: 'cat-distrib' },
        { id: 'i2-11', text: '0,5 · (4 + 6a)', categoryId: 'cat-distrib' },
        { id: 'i2-12', text: '1/2 · (4/3 - 2)', categoryId: 'cat-distrib' }
      ]
    },

    // 3. SZINT: KIFEJEZÉS KISZÁMÍTOTT ÉRTÉKE
    3: {
      level: 3,
      title: 'Összetett kifejezések értéke',
      subtitle: 'Számítsd ki és sorold be a kifejezéseket a végeredményük nagysága alapján!',
      categories: [
        {
          id: 'cat-lt-2',
          title: 'Értéke < 2',
          description: 'A számítás végeredménye kisebb mint 2.',
          color: 'amber'
        },
        {
          id: 'cat-2-5',
          title: 'Értéke 2 és 5 között [2; 5]',
          description: 'A végeredmény 2 és 5 közötti szám.',
          color: 'indigo'
        },
        {
          id: 'cat-gt-5',
          title: 'Értéke > 5',
          description: 'A számítás végeredménye szigorúan nagyobb mint 5.',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i3-1', text: '(1 - 0,5) · 2 (= 1)', categoryId: 'cat-lt-2' },
        { id: 'i3-2', text: '1/2 + 1/4 · 2 (= 1)', categoryId: 'cat-lt-2' },
        { id: 'i3-3', text: '3 - 2 · 1,2 (= 0,6)', categoryId: 'cat-lt-2' },
        { id: 'i3-4', text: '(2/3 + 1/3) : 2 (= 0,5)', categoryId: 'cat-lt-2' },
        { id: 'i3-5', text: '5 - 2 · 1 (= 3)', categoryId: 'cat-2-5' },
        { id: 'i3-6', text: '(3 + 5) · 0,5 (= 4)', categoryId: 'cat-2-5' },
        { id: 'i3-7', text: '2 · 1,5 + 1 (= 4)', categoryId: 'cat-2-5' },
        { id: 'i3-8', text: '(6 + 4) : 4 (= 2,5)', categoryId: 'cat-2-5' },
        { id: 'i3-9', text: '(4 + 2) · 2 (= 12)', categoryId: 'cat-gt-5' },
        { id: 'i3-10', text: '10 - 2 · 1,5 (= 7)', categoryId: 'cat-gt-5' },
        { id: 'i3-11', text: '2 · (3 + 1) (= 8)', categoryId: 'cat-gt-5' },
        { id: 'i3-12', text: '(1,5 + 0,5) · 3 + 2 (= 8)', categoryId: 'cat-gt-5' }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Összetett Műveletek Csoportosító"
      subtitle="Rendszerezd a feladatokat műveleti prioritás és eredményük szerint!"
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

export default ComplexOperationsSorter;
