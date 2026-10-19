import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface TimeMeasurementSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const TimeMeasurementSorter: React.FC<TimeMeasurementSorterProps> = ({
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
    // 1. SZINT: MILYEN EGYSÉGBEN ÉRDEMES MEGADNI?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-short',
          name: 'Másodperc és Perc (s, min)',
          description: 'Rövid folyamatok: sportversenyek, fogmosás, főzés, villanások',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-medium',
          name: 'Óra és Nap (h, d)',
          description: 'Napi események: iskolai nap, alvás, utazás, hétvégi kirándulás',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-long',
          name: 'Hónap és Év (hó, a)',
          description: 'Hosszú távú folyamatok: tanév, emberi életkor, növények növekedése',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'A 60 méteres síkfutás lefutási ideje',
          categoryId: 'cat-short',
          explanation: 'Körülbelül 8–10 másodperc.'
        },
        {
          id: 's1-2',
          text: 'Egy teatojás áztatása forró vízben',
          categoryId: 'cat-short',
          explanation: '3–5 perc.'
        },
        {
          id: 's1-3',
          text: 'A napi iskolai tanítás ideje (órák és szünetek)',
          categoryId: 'cat-medium',
          explanation: 'Körülbelül 5–7 óra.'
        },
        {
          id: 's1-4',
          text: 'Egy hétvégi családi kempingezés a Balatonnál',
          categoryId: 'cat-medium',
          explanation: '2 vagy 3 nap.'
        },
        {
          id: 's1-5',
          text: 'Az általános iskola 5. osztályos tanéve',
          categoryId: 'cat-long',
          explanation: 'Szeptembertől június közepéig tart, azaz közel 10 hónap.'
        },
        {
          id: 's1-6',
          text: 'Egy nagyszülő életkora a születésnapján',
          categoryId: 'cat-long',
          explanation: 'Például 65 vagy 72 év.'
        },
        {
          id: 's1-7',
          text: 'Alapos esti fogmosás ideje',
          categoryId: 'cat-short',
          explanation: 'Legalább 2–3 perc.'
        },
        {
          id: 's1-8',
          text: 'Vonatút Budapestről Bécsbe',
          categoryId: 'cat-medium',
          explanation: 'Körülbelül 2 óra 40 perc.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: IDŐTARTAMOK NAGYSÁGRENDJE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-under-hour',
          name: 'Kevesebb mint 1 óra (< 60 perc)',
          description: 'Bármilyen időtartam, ami rövidebb 1 teljes óránál',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-one-to-day',
          name: '1 óra és 24 óra között (1 h – 1 nap)',
          description: '60 percnél hosszabb, de nem éri el az 1 teljes napot',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-over-day',
          name: 'Több mint 1 nap (> 24 óra)',
          description: '24 óránál hosszabb időtartamok (több nap, hét)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Háromnegyed óra (45 perc)',
          categoryId: 'cat-under-hour',
          explanation: '45 perc < 60 perc.'
        },
        {
          id: 's2-2',
          text: '1800 másodperc',
          categoryId: 'cat-under-hour',
          explanation: '1800 : 60 = 30 perc, ami kevesebb mint 1 óra.'
        },
        {
          id: 's2-3',
          text: '150 perc',
          categoryId: 'cat-one-to-day',
          explanation: '150 perc = 2 óra 30 perc (1 és 24 óra között van).'
        },
        {
          id: 's2-4',
          text: '500 perc',
          categoryId: 'cat-one-to-day',
          explanation: '500 perc = 8 óra 20 perc (1 és 24 óra között van).'
        },
        {
          id: 's2-5',
          text: '1 hét',
          categoryId: 'cat-over-day',
          explanation: '1 hét = 7 nap = 168 óra, sokkal több mint 24 óra.'
        },
        {
          id: 's2-6',
          text: '50 óra',
          categoryId: 'cat-over-day',
          explanation: '50 óra = 2 nap és 2 óra (> 24 óra).'
        },
        {
          id: 's2-7',
          text: '2000 másodperc',
          categoryId: 'cat-under-hour',
          explanation: '2000 s = 33 perc 20 másodperc (< 60 perc).'
        },
        {
          id: 's2-8',
          text: '20 óra',
          categoryId: 'cat-one-to-day',
          explanation: 'Nagyobb mint 1 óra, de kisebb mint 24 óra.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: HÓNAPOK HOSSZA (BÜTYÖKSZABÁLY)
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-31-days',
          name: '31 napos hónapok (Bütykök)',
          description: 'A leghosszabb naptári hónapok a kézfej bütykein',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        },
        {
          id: 'cat-30-days',
          name: '30 napos hónapok (Gödrök)',
          description: 'Négy hónap: Április, Június, Szeptember, November',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-february',
          name: 'Február (28 vagy 29 nap)',
          description: 'A legrövidebb hónap, szökőévben 29, egyébként 28 napos',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Január',
          categoryId: 'cat-31-days',
          explanation: 'Az év első hónapja, 31 napos (első bütyök).'
        },
        {
          id: 's3-2',
          text: 'Február',
          categoryId: 'cat-february',
          explanation: 'Különleges hónap: alapesetben 28 napos, szökőévben 29 napos.'
        },
        {
          id: 's3-3',
          text: 'Április',
          categoryId: 'cat-30-days',
          explanation: 'Április 30 napos hónap (gödörben van).'
        },
        {
          id: 's3-4',
          text: 'Július és Augusztus',
          categoryId: 'cat-31-days',
          explanation: 'Mindkét nyári hónap 31 napos (két egymás melletti kézfej bütykei)!'
        },
        {
          id: 's3-5',
          text: 'Szeptember',
          categoryId: 'cat-30-days',
          explanation: 'Az iskolakezdés hónapja 30 napos.'
        },
        {
          id: 's3-6',
          text: 'Október',
          categoryId: 'cat-31-days',
          explanation: 'Október 31 napos (bütyök).'
        },
        {
          id: 's3-7',
          text: 'November',
          categoryId: 'cat-30-days',
          explanation: 'November 30 napos (gödör).'
        },
        {
          id: 's3-8',
          text: 'December',
          categoryId: 'cat-31-days',
          explanation: 'Az év utolsó hónapja 31 napos (bütyök).'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <SorterTemplate
      title="Idő és Naptár Csoportosító"
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
