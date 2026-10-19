import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface OpenSentencesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const OpenSentencesSorter: React.FC<OpenSentencesSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: NYITOTT MONDAT TÍPUSA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-equation',
          name: 'Nyitott egyenlőség (Egyenlet: =)',
          description: 'A bal és jobb oldal egyenlőségét állítja, pontosan egyenlőségjel van benne',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-strict',
          name: 'Szigorú egyenlőtlenség (< vagy >)',
          description: 'Kisebb (<) vagy nagyobb (>) relációs jelet tartalmaz',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-nonstrict',
          name: 'Megengedő egyenlőtlenség (≤ vagy ≥)',
          description: 'Kisebb vagy egyenlő (≤), illetve nagyobb vagy egyenlő (≥) jelet tartalmaz',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'x + 15 = 42',
          categoryId: 'cat-equation',
          explanation: 'Egyenlőségjel van benne, tehát egyenlet.'
        },
        {
          id: 's1-2',
          text: 'a + 5 < 12',
          categoryId: 'cat-strict',
          explanation: 'Szigorúan kisebb (<) relációs jel.'
        },
        {
          id: 's1-3',
          text: '2 · b ≥ 14',
          categoryId: 'cat-nonstrict',
          explanation: 'Nagyobb vagy egyenlő (≥) megengedő reláció.'
        },
        {
          id: 's1-4',
          text: '4 · y = 36',
          categoryId: 'cat-equation',
          explanation: 'Egyenlőségjel köti össze a két oldalt.'
        },
        {
          id: 's1-5',
          text: 'y − 3 > 8',
          categoryId: 'cat-strict',
          explanation: 'Szigorúan nagyobb (>) reláció.'
        },
        {
          id: 's1-6',
          text: 'x + 7 ≤ 20',
          categoryId: 'cat-nonstrict',
          explanation: 'Kisebb vagy egyenlő (≤) reláció.'
        },
        {
          id: 's1-7',
          text: '60 − a = 25',
          categoryId: 'cat-equation',
          explanation: 'Kivonásos egyenlet.'
        },
        {
          id: 's1-8',
          text: '3 · x < 15',
          categoryId: 'cat-strict',
          explanation: 'Szigorúan kisebb (<) reláció.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: MEGOLDÁSI MŰVELET (FORDÍTOTT MŰVELETEK)
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-sub',
          name: 'Kivonással számoljuk ki az ismeretlent',
          description: 'Összeadás ellenművelete (x + a = b), vagy kivonandó keresése (a − x = b)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-add',
          name: 'Hozzáadással számoljuk ki az ismeretlent',
          description: 'Kivonás ellenművelete, a kisebbítendő keresése (x − a = b)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-mult-div',
          name: 'Osztással vagy szorzással számolunk',
          description: 'Szorzótényező keresése (osztunk) vagy osztandó keresése (szorzunk)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'x + 24 = 60',
          categoryId: 'cat-sub',
          explanation: 'x = 60 − 24 (kivonás).'
        },
        {
          id: 's2-2',
          text: 'y − 18 = 35',
          categoryId: 'cat-add',
          explanation: 'y = 35 + 18 (hozzáadás).'
        },
        {
          id: 's2-3',
          text: '5 · a = 45',
          categoryId: 'cat-mult-div',
          explanation: 'a = 45 : 5 (osztás).'
        },
        {
          id: 's2-4',
          text: 'b : 6 = 7',
          categoryId: 'cat-mult-div',
          explanation: 'b = 7 · 6 (szorzás).'
        },
        {
          id: 's2-5',
          text: '50 − x = 15',
          categoryId: 'cat-sub',
          explanation: 'x = 50 − 15 (kivonás).'
        },
        {
          id: 's2-6',
          text: 'a − 40 = 25',
          categoryId: 'cat-add',
          explanation: 'a = 25 + 40 (hozzáadás).'
        },
        {
          id: 's2-7',
          text: '8 · x = 64',
          categoryId: 'cat-mult-div',
          explanation: 'x = 64 : 8 (osztás).'
        },
        {
          id: 's2-8',
          text: 'x + 35 = 80',
          categoryId: 'cat-sub',
          explanation: 'x = 80 − 35 (kivonás).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: BEHELYETTESÍTÉS ÉS IGAZSÁGTARTALOM (x = 4 ESETÉN)
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-true',
          name: 'IGAZ állítássá válik x = 4 esetén',
          description: 'A 4-et behelyettesítve a matematikai állítás igaz',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-false',
          name: 'HAMIS állítássá válik x = 4 esetén',
          description: 'A 4-et behelyettesítve az egyenlőség vagy reláció nem teljesül',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-always',
          name: 'MINDEN természetes számra IGAZ',
          description: 'Bármilyen természetes számot behelyettesítve mindig igaz (azonosság)',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'x + 6 = 10',
          categoryId: 'cat-true',
          explanation: '4 + 6 = 10, pontosan igaz!'
        },
        {
          id: 's3-2',
          text: '2 · x + 1 = 15',
          categoryId: 'cat-false',
          explanation: '2 · 4 + 1 = 9 ≠ 15, hamis.'
        },
        {
          id: 's3-3',
          text: 'x + 0 = x',
          categoryId: 'cat-always',
          explanation: 'Bármely számhoz 0-t adva önmagát kapjuk, minden számra igaz.'
        },
        {
          id: 's3-4',
          text: '3 · x > 10',
          categoryId: 'cat-true',
          explanation: '3 · 4 = 12 > 10, igaz.'
        },
        {
          id: 's3-5',
          text: 'x + 8 < 11',
          categoryId: 'cat-false',
          explanation: '4 + 8 = 12, ami NEM kisebb 11-nél, hamis.'
        },
        {
          id: 's3-6',
          text: 'x ≥ 0 (a természetes számok halmazán)',
          categoryId: 'cat-always',
          explanation: 'A természetes számok (0, 1, 2...) mind nagyobbak vagy egyenlők nullával.'
        },
        {
          id: 's3-7',
          text: '20 : x = 5',
          categoryId: 'cat-true',
          explanation: '20 : 4 = 5, igaz.'
        },
        {
          id: 's3-8',
          text: '5 · x = 30',
          categoryId: 'cat-false',
          explanation: '5 · 4 = 20 ≠ 30, hamis.'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <SorterTemplate
      title="Nyitott Mondatok Csoportosító"
      subtitle="Húzd vagy kattintással helyezd az elemeket a megfelelő kategóriába!"
      categories={currentConfig.categories}
      items={currentConfig.items}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onComplete={onNextLevel}
      level={currentLevel}
      onLevelChange={(lvl) => setCurrentLevel(lvl)}
      onOpenRules={onOpenRules}
    />
  );
};
