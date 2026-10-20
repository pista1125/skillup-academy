import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LogicGamesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LogicGamesSorter: React.FC<LogicGamesSorterProps> = ({
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
    // 1. SZINT: LOGIKAI LAPOK BESOROLÁSA FORMA ÉS ÉLEK SZERINT
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-curves',
          name: 'Körök (Görbe vonalú)',
          description: 'Nincs éle és nincs csúcsa',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-triangles',
          name: 'Háromszögek (3 csúcsú)',
          description: 'Pontosan 3 oldala és 3 csúcsa van',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-quads',
          name: 'Négyzetek és Téglalapok (Négyszögek)',
          description: '4 csúccsal és 4 oldallal rendelkező sokszögek',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Nagy, piros, lyukas kör 🔴',
          categoryId: 'cat-curves',
          explanation: 'Minden kör görbe határoló vonalú, nincsenek csúcsai.'
        },
        {
          id: 's1-2',
          text: 'Kicsi, kék, teli háromszög 🔺',
          categoryId: 'cat-triangles',
          explanation: '3 csúcsa és 3 oldala van, ezért a háromszögek csoportjába tartozik.'
        },
        {
          id: 's1-3',
          text: 'Nagy, zöld, teli négyzet 🟩',
          categoryId: 'cat-quads',
          explanation: 'A négyzet 4 egyenlő oldallal és 4 derékszöggel rendelkező négyszög.'
        },
        {
          id: 's1-4',
          text: 'Kicsi, sárga, lyukas téglalap 🟨',
          categoryId: 'cat-quads',
          explanation: 'A téglalap 4 oldalú és 4 derékszögű síkidom.'
        },
        {
          id: 's1-5',
          text: 'Kicsi, zöld, teli kör 🟢',
          categoryId: 'cat-curves',
          explanation: 'Körlap, nincsenek töréspontjai vagy csúcsai.'
        },
        {
          id: 's1-6',
          text: 'Nagy, sárga, lyukas háromszög 📐',
          categoryId: 'cat-triangles',
          explanation: 'Háromszög alakú síkidom.'
        },
        {
          id: 's1-7',
          text: 'Nagy, kék, lyukas négyzet 🟦',
          categoryId: 'cat-quads',
          explanation: 'Négyszög, 4 derékszöggel.'
        },
        {
          id: 's1-8',
          text: 'Kicsi, piros, teli kör ⭕',
          categoryId: 'cat-curves',
          explanation: 'Körlap.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÁMOK ELHELYEZÉSE VENN-DIAGRAM ALAPJÁN
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-even-only',
          name: 'Csak Páros számok',
          description: 'Párosak, de 5-tel NEM oszthatók (pl. 2, 4, 6, 8, 12, 14, 16, 18)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-intersection',
          name: 'Metszet: Páros ÉS 5-tel osztható',
          description: 'Egyszerre párosak és 5-tel oszthatók, vagyis 0-ra végződnek (10, 20, 30...)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-neither',
          name: 'Sem páros, sem 5-tel nem osztható',
          description: 'Páratlan számok, amelyek nem 5-re végződnek (pl. 1, 3, 7, 9, 11, 13, 17, 19)',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'A 6 és a 14',
          categoryId: 'cat-even-only',
          explanation: 'Párosak, de nem oszthatók 5-tel (nem 0-ra vagy 5-re végződnek).'
        },
        {
          id: 's2-2',
          text: 'A 20 és a 40',
          categoryId: 'cat-intersection',
          explanation: 'Mindkettő 0-ra végződik: egyszerre párosak és oszthatók 5-tel (a metszetben vannak).'
        },
        {
          id: 's2-3',
          text: 'A 7 és a 13',
          categoryId: 'cat-neither',
          explanation: 'Egyik feltételnek sem felelnek meg: páratlanok és nem oszthatók 5-tel sem.'
        },
        {
          id: 's2-4',
          text: 'A 10',
          categoryId: 'cat-intersection',
          explanation: '10 páros és 5-tel is osztható (10 = 2 × 5).'
        },
        {
          id: 's2-5',
          text: 'A 8 és a 16',
          categoryId: 'cat-even-only',
          explanation: 'Páros számok, de 5-tel osztva maradékot adnak.'
        },
        {
          id: 's2-6',
          text: 'A 9 és a 17',
          categoryId: 'cat-neither',
          explanation: 'Páratlanok és nem oszthatók 5-tel (külső tartományba esnek).'
        },
        {
          id: 's2-7',
          text: 'A 30 és a 50',
          categoryId: 'cat-intersection',
          explanation: '10-zel osztható páros számok: mindkét halmaz közös elemei.'
        },
        {
          id: 's2-8',
          text: 'A 2 és a 18',
          categoryId: 'cat-even-only',
          explanation: 'Páros számok.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÁLLÍTÁSOK LOGIKAI MINŐSÍTÉSE
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-certain',
          name: 'Biztosan igaz (Törvényszerű)',
          description: 'Minden esetben érvényes, nincs kivétel',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-possible',
          name: 'Lehetséges, de nem biztos',
          description: 'Előfordulhat, de nem garantált (véletlen vagy eseti)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-impossible',
          name: 'Lehetetlen (Soha nem igaz)',
          description: 'Ellentmond a szabályoknak, sosem következhet be',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Két páros szám összege mindig páros szám.',
          categoryId: 'cat-certain',
          explanation: 'Páros + páros = páros minden egész számra törvényszerűen igaz.'
        },
        {
          id: 's3-2',
          text: 'Egy dobókockával egyszer dobva 6-ost dobunk.',
          categoryId: 'cat-possible',
          explanation: 'Lehetséges (1/6 az esélye), de egyáltalán nem biztos.'
        },
        {
          id: 's3-3',
          text: 'Egy háromszögnek 4 belső szöge van.',
          categoryId: 'cat-impossible',
          explanation: 'A háromszög definíció szerint pontosan 3 oldallal és 3 belső szöggel rendelkezik.'
        },
        {
          id: 's3-4',
          text: 'A 64 lapos logikai készletben pontosan 16 darab körlap van.',
          categoryId: 'cat-certain',
          explanation: '4 szín × 2 méret × 2 lyukasság = 16 körlap található a készletben.'
        },
        {
          id: 's3-5',
          text: 'Egy találomra kihúzott logikai lap piros és lyukas.',
          categoryId: 'cat-possible',
          explanation: 'Van ilyen lap a készletben, de nem biztos, hogy pont ilyet húzunk.'
        },
        {
          id: 's3-6',
          text: 'Két páratlan szám összege páratlan szám lesz.',
          categoryId: 'cat-impossible',
          explanation: 'Két páratlan szám összege mindig páros (pl. 3 + 5 = 8).'
        },
        {
          id: 's3-7',
          text: 'Ha egy szám osztható 10-zel, akkor 5-tel is osztható.',
          categoryId: 'cat-certain',
          explanation: 'Mivel 10 = 2 × 5, minden 10-zel osztható szám automatikusan osztható 5-tel is.'
        },
        {
          id: 's3-8',
          text: 'Egy szabályos játékkockával 7-est dobunk.',
          categoryId: 'cat-impossible',
          explanation: 'A hagyományos kocka lapjai 1-től 6-ig vannak számozva, 7-es nincs rajta.'
        }
      ]
    }
  };

  const handleLevelChange = (lvl: DifficultyLevel) => {
    setCurrentLevel(lvl);
    if (onNextLevel && lvl > currentLevel) {
      onNextLevel();
    }
  };

  return (
    <SorterTemplate
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};
