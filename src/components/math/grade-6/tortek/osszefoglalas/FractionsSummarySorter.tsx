import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionsSummarySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsSummarySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsSummarySorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: TÖRT ÉS TIZEDES ÉRTÉKE 1-HEZ KÉPEST
    1: {
      level: 1,
      title: 'Érték az 1 egészhez képest',
      subtitle: 'Csoportosítsd a számokat és kifejezéseket az 1 egészhez viszonyított nagyságuk szerint!',
      categories: [
        {
          id: 'cat-less-1',
          title: 'Kisebb mint 1 (< 1)',
          description: 'Valódi törtek vagy 1-nél kisebb tizedesek.',
          color: 'blue'
        },
        {
          id: 'cat-eq-1',
          title: 'Pontosan 1 (= 1)',
          description: 'Számláló = nevező, vagy reciprokok szorzata.',
          color: 'emerald'
        },
        {
          id: 'cat-more-1',
          title: 'Nagyobb mint 1 (> 1)',
          description: 'Áltörtek, vegyes törtek vagy 1-nél nagyobb tizedesek.',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', text: '3/4', categoryId: 'cat-less-1' },
        { id: 'i1-2', text: '0,85', categoryId: 'cat-less-1' },
        { id: 'i1-3', text: '1/2 · 1/2 (= 1/4)', categoryId: 'cat-less-1' },
        { id: 'i1-4', text: '0,2 · 4 (= 0,8)', categoryId: 'cat-less-1' },
        { id: 'i1-5', text: '5/5', categoryId: 'cat-eq-1' },
        { id: 'i1-6', text: '3/4 · 4/3', categoryId: 'cat-eq-1' },
        { id: 'i1-7', text: '0,25 · 4', categoryId: 'cat-eq-1' },
        { id: 'i1-8', text: '1/3 + 2/3', categoryId: 'cat-eq-1' },
        { id: 'i1-9', text: '7/4', categoryId: 'cat-more-1' },
        { id: 'i1-10', text: '1 1/2', categoryId: 'cat-more-1' },
        { id: 'i1-11', text: '1,25', categoryId: 'cat-more-1' },
        { id: 'i1-12', text: '3 : 0,5 (= 6)', categoryId: 'cat-more-1' }
      ]
    },

    // 2. SZINT: MILYEN MŰVELETI SZABÁLY SZÜKSÉGES?
    2: {
      level: 2,
      title: 'Milyen szabályt alkalmazzunk?',
      subtitle: 'Válaszd ki a feladat megoldásához szükséges legfontosabb módszert!',
      categories: [
        {
          id: 'cat-lcm',
          title: 'Közös nevező (LKKT)',
          description: 'Különböző nevezőjű törtek összeadásánál és kivonásánál.',
          color: 'amber'
        },
        {
          id: 'cat-recip',
          title: 'Reciprokkal való szorzás',
          description: 'Közönséges törttel való osztásnál.',
          color: 'indigo'
        },
        {
          id: 'cat-expand-ten',
          title: 'Bővítés / 10-es léptetés',
          description: 'Tizedestörttel való osztásnál vagy 10-zel, 100-zal való műveletnél.',
          color: 'rose'
        }
      ],
      items: [
        { id: 'i2-1', text: '1/3 + 2/5', categoryId: 'cat-lcm' },
        { id: 'i2-2', text: '5/6 - 3/8', categoryId: 'cat-lcm' },
        { id: 'i2-3', text: '2 1/4 + 1 1/3', categoryId: 'cat-lcm' },
        { id: 'i2-4', text: '7/10 - 2/5', categoryId: 'cat-lcm' },
        { id: 'i2-5', text: '3/4 : 2/5', categoryId: 'cat-recip' },
        { id: 'i2-6', text: '6 : 3/4', categoryId: 'cat-recip' },
        { id: 'i2-7', text: '5/8 : 5/2', categoryId: 'cat-recip' },
        { id: 'i2-8', text: '1 1/2 : 3/4', categoryId: 'cat-recip' },
        { id: 'i2-9', text: '4,8 : 0,6 (➔ 48 : 6)', categoryId: 'cat-expand-ten' },
        { id: 'i2-10', text: '3 : 0,25 (➔ 300 : 25)', categoryId: 'cat-expand-ten' },
        { id: 'i2-11', text: '3,45 · 100', categoryId: 'cat-expand-ten' },
        { id: 'i2-12', text: '45,6 : 1000', categoryId: 'cat-expand-ten' }
      ]
    },

    // 3. SZINT: KIFEJEZÉS KISZÁMÍTOTT VÉGSŐ ÉRTÉKE
    3: {
      level: 3,
      title: 'Összetett kifejezések értéke',
      subtitle: 'Számítsd ki és sorold be a kifejezéseket a végeredményük alapján!',
      categories: [
        {
          id: 'cat-lt-2',
          title: 'Értéke < 2',
          description: 'A végeredmény kisebb mint 2.',
          color: 'teal'
        },
        {
          id: 'cat-2-5',
          title: 'Értéke 2 és 5 között [2; 5]',
          description: 'A végeredmény 2 és 5 közötti szám.',
          color: 'blue'
        },
        {
          id: 'cat-gt-5',
          title: 'Értéke > 5',
          description: 'A végeredmény szigorúan nagyobb mint 5.',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i3-1', text: '(1 - 0,5) · 2 (= 1)', categoryId: 'cat-lt-2' },
        { id: 'i3-2', text: '3 - 2 · 1,2 (= 0,6)', categoryId: 'cat-lt-2' },
        { id: 'i3-3', text: '1/2 + 1/4 · 2 (= 1)', categoryId: 'cat-lt-2' },
        { id: 'i3-4', text: '(2/3 + 1/3) : 2 (= 0,5)', categoryId: 'cat-lt-2' },
        { id: 'i3-5', text: '10 - 2 · 3 (= 4)', categoryId: 'cat-2-5' },
        { id: 'i3-6', text: '2 · [5 - 2 · 1,5] (= 4)', categoryId: 'cat-2-5' },
        { id: 'i3-7', text: '15 : [2 · 2,5] (= 3)', categoryId: 'cat-2-5' },
        { id: 'i3-8', text: '(3 + 5) · 0,5 (= 4)', categoryId: 'cat-2-5' },
        { id: 'i3-9', text: '20 - [3 · 2,5 + 2] (= 10,5)', categoryId: 'cat-gt-5' },
        { id: 'i3-10', text: '[(2/3 + 1/3) · 6] : 0,5 (= 12)', categoryId: 'cat-gt-5' },
        { id: 'i3-11', text: '[3 - 1] · 4 (= 8)', categoryId: 'cat-gt-5' },
        { id: 'i3-12', text: '[4 - 1] · 5 (= 15)', categoryId: 'cat-gt-5' }
      ]
    }
  };

  return (
    <SorterTemplate
      title="II. Fejezet Összefoglaló Csoportosító"
      subtitle="Rendezd a feladatokat értékük, típusuk és a szükséges műveleti szabályok szerint!"
      badge="🧩 6. Osztály • II. Törtek • Összefoglalás"
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

export default FractionsSummarySorter;
