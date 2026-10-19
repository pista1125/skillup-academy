import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SequencesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SequencesSorter: React.FC<SequencesSorterProps> = ({
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
    // 1. SZINT: SOROZATOK VISELKEDÉSE (NÖVEKVŐ, CSÖKKENŐ, VÁLTAKOZÓ)
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-incr',
          name: 'Növekvő számsorozatok',
          description: 'A sorozat tagjainak értéke lépésről lépésre folyamatosan nő',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-decr',
          name: 'Csökkenő számsorozatok',
          description: 'A sorozat tagjainak értéke lépésről lépésre folyamatosan fogy',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-alt',
          name: 'Váltakozó vagy állandó sorozatok',
          description: 'A tagok nem egyirányba mozognak, hanem fel-le ingadoznak vagy egyformák',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '2, 5, 8, 11, 14, 17 ...',
          categoryId: 'cat-incr',
          explanation: '+3 lépésközzel nő.'
        },
        {
          id: 's1-2',
          text: '1, 2, 4, 8, 16, 32 ...',
          categoryId: 'cat-incr',
          explanation: '·2 szorzással nő.'
        },
        {
          id: 's1-3',
          text: '10, 20, 30, 40, 50 ...',
          categoryId: 'cat-incr',
          explanation: '+10 lépésközzel nő.'
        },
        {
          id: 's1-4',
          text: '1, 3, 6, 10, 15, 21 ...',
          categoryId: 'cat-incr',
          explanation: 'Háromszögszámok, növekvő sorozat.'
        },
        {
          id: 's1-5',
          text: '50, 43, 36, 29, 22 ...',
          categoryId: 'cat-decr',
          explanation: '-7 lépésközzel csökken.'
        },
        {
          id: 's1-6',
          text: '80, 40, 20, 10, 5 ...',
          categoryId: 'cat-decr',
          explanation: ':2 osztással csökken.'
        },
        {
          id: 's1-7',
          text: '100, 95, 90, 85, 80 ...',
          categoryId: 'cat-decr',
          explanation: '-5 lépésközzel csökken.'
        },
        {
          id: 's1-8',
          text: '30, 24, 18, 12, 6 ...',
          categoryId: 'cat-decr',
          explanation: '-6 lépésközzel csökken.'
        },
        {
          id: 's1-9',
          text: '1, 5, 2, 6, 3, 7, 4 ...',
          categoryId: 'cat-alt',
          explanation: '+4, -3 felváltva &rarr; váltakozó ritmus.'
        },
        {
          id: 's1-10',
          text: '10, 2, 10, 2, 10, 2 ...',
          categoryId: 'cat-alt',
          explanation: 'Két érték ciklikus váltakozása.'
        },
        {
          id: 's1-11',
          text: '3, -3, 3, -3, 3 ...',
          categoryId: 'cat-alt',
          explanation: 'Előjelet váltó sorozat.'
        },
        {
          id: 's1-12',
          text: '5, 5, 5, 5, 5, 5 ...',
          categoryId: 'cat-alt',
          explanation: 'Konstans (állandó értékű) sorozat.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: KÉPZÉSI SZABÁLY MŰVELETE SZERINT
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-arith',
          name: 'Állandó különbségű (+d vagy -d)',
          description: 'Minden lépésben ugyanannyit adunk hozzá vagy vonunk ki',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-geom',
          name: 'Állandó hányadosú (·q vagy :q)',
          description: 'Minden lépésben ugyanazzal a számmal szorzunk vagy osztunk',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-var',
          name: 'Változó lépésközű sorozatok',
          description: 'A lépésköz maga is változik (pl. +1, +2, +3 vagy duplázódik)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Minden lépésben +4: 1, 5, 9, 13, 17 ...',
          categoryId: 'cat-arith',
          explanation: 'Állandó +4 különbség.'
        },
        {
          id: 's2-2',
          text: 'Minden lépésben -6: 40, 34, 28, 22 ...',
          categoryId: 'cat-arith',
          explanation: 'Állandó -6 különbség.'
        },
        {
          id: 's2-3',
          text: 'Minden lépésben +10: 10, 20, 30, 40 ...',
          categoryId: 'cat-arith',
          explanation: 'Tízesével növekvő sorozat.'
        },
        {
          id: 's2-4',
          text: 'Minden lépésben -3: 20, 17, 14, 11 ...',
          categoryId: 'cat-arith',
          explanation: 'Állandó kivonás.'
        },
        {
          id: 's2-5',
          text: 'Minden lépésben ·2: 3, 6, 12, 24, 48 ...',
          categoryId: 'cat-geom',
          explanation: 'Állandó szorzó: 2.'
        },
        {
          id: 's2-6',
          text: 'Minden lépésben ·3: 2, 6, 18, 54 ...',
          categoryId: 'cat-geom',
          explanation: 'Állandó szorzó: 3.'
        },
        {
          id: 's2-7',
          text: 'Minden lépésben :2: 64, 32, 16, 8, 4 ...',
          categoryId: 'cat-geom',
          explanation: 'Felező sorozat.'
        },
        {
          id: 's2-8',
          text: 'Minden lépésben :10: 1000, 100, 10, 1 ...',
          categoryId: 'cat-geom',
          explanation: 'Tizedelő sorozat.'
        },
        {
          id: 's2-9',
          text: 'Növekvő lépésközök: 1, 2, 4, 7, 11, 16 ...',
          categoryId: 'cat-var',
          explanation: '+1, +2, +3, +4, +5...'
        },
        {
          id: 's2-10',
          text: 'Páros lépésközök: 2, 4, 8, 14, 22 ...',
          categoryId: 'cat-var',
          explanation: '+2, +4, +6, +8...'
        },
        {
          id: 's2-11',
          text: 'Fibonacci-típusú: 1, 1, 2, 3, 5, 8 ...',
          categoryId: 'cat-var',
          explanation: 'Mindegyik az előző kettő összege.'
        },
        {
          id: 's2-12',
          text: 'Duplázódó ugrások: 2, 3, 5, 9, 17, 33 ...',
          categoryId: 'cat-var',
          explanation: 'Ugrások: +1, +2, +4, +8, +16.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: A 10. TAG (a_10) ÉRTÉKÉNEK NAGYSÁGA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-small',
          name: 'A 10. tag kisebb mint 30 (a_10 < 30)',
          description: 'A sorozat 10. eleme 30 alatt marad',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-med',
          name: 'A 10. tag 30 és 100 közé esik (30 ≤ a_10 ≤ 100)',
          description: 'A sorozat 10. eleme közepes kétjegyű szám',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-large',
          name: 'A 10. tag nagyobb mint 100 (a_10 > 100)',
          description: 'A sorozat 10. eleme háromjegyű vagy annál is nagyobb',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Páros számok: 2, 4, 6, 8 ...',
          categoryId: 'cat-small',
          explanation: 'A 10. tag: 2 · 10 = 20 (< 30).'
        },
        {
          id: 's3-2',
          text: 'Páratlan számok: 1, 3, 5, 7 ...',
          categoryId: 'cat-small',
          explanation: 'A 10. tag: 2 · 10 - 1 = 19 (< 30).'
        },
        {
          id: 's3-3',
          text: 'Kezdőtag: 5, szabály: +2',
          categoryId: 'cat-small',
          explanation: 'A 10. tag: 5 + 9 · 2 = 23 (< 30).'
        },
        {
          id: 's3-4',
          text: '30, 28, 26, 24 ... (szabály: -2)',
          categoryId: 'cat-small',
          explanation: 'A 10. tag: 30 - 9 · 2 = 12 (< 30).'
        },
        {
          id: 's3-5',
          text: 'Kezdőtag: 3, szabály: +4',
          categoryId: 'cat-med',
          explanation: 'A 10. tag: 3 + 9 · 4 = 39 (30 és 100 között).'
        },
        {
          id: 's3-6',
          text: 'Kezdőtag: 5, szabály: +5',
          categoryId: 'cat-med',
          explanation: 'A 10. tag: 5 · 10 = 50 (30 és 100 között).'
        },
        {
          id: 's3-7',
          text: 'Kezdőtag: 10, szabály: +7',
          categoryId: 'cat-med',
          explanation: 'A 10. tag: 10 + 9 · 7 = 73 (30 és 100 között).'
        },
        {
          id: 's3-8',
          text: 'Kezdőtag: 1, szabály: +10',
          categoryId: 'cat-med',
          explanation: 'A 10. tag: 1 + 9 · 10 = 91 (30 és 100 között).'
        },
        {
          id: 's3-9',
          text: '1, 2, 4, 8, 16, 32 ... (duplázás)',
          categoryId: 'cat-large',
          explanation: 'A 10. tag: 2^9 = 512 (> 100).'
        },
        {
          id: 's3-10',
          text: 'Kezdőtag: 20, szabály: +15',
          categoryId: 'cat-large',
          explanation: 'A 10. tag: 20 + 9 · 15 = 155 (> 100).'
        },
        {
          id: 's3-11',
          text: 'Kezdőtag: 100, szabály: +20',
          categoryId: 'cat-large',
          explanation: 'A 10. tag: 100 + 9 · 20 = 280 (> 100).'
        },
        {
          id: 's3-12',
          text: '1, 3, 9, 27 ... (triplázás)',
          categoryId: 'cat-large',
          explanation: 'A 10. tag: 3^9 = 19683 (> 100).'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-sequences-quiz"
      title="Sorozatok csoportosító"
      subtitle="Csoportosítsd a sorozatokat viselkedésük, műveletük és 10. tagjuk értéke szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-sequences-sorter"
      storageKey="g5-loc-sequences-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
