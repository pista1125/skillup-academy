import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DirectProportionSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const DirectProportionSorter: React.FC<DirectProportionSorterProps> = ({
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
    // 1. SZINT: EGYENES ARÁNYOSSÁG VAGY NEM?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-direct',
          name: 'Egyenes arányosság',
          description: 'A duplázódásra duplázódással válaszol, a hányados állandó és az origóból indul',
          badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800'
        },
        {
          id: 'cat-inverse',
          name: 'Fordított arányosság',
          description: 'A duplázódásra pontosan feleződéssel válaszol, a szorzat állandó',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-neither',
          name: 'Egyik sem (nem arányos)',
          description: 'Korkülönbség, alapdíjas költség, vagy más hatványos kapcsolat',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Vásárolt alma tömege és a fizetendő összeg fix kilónkénti áron',
          categoryId: 'cat-direct',
          explanation: 'Kétszer annyi almáért kétszer annyit fizetünk: egyenes arányosság.'
        },
        {
          id: 's1-2',
          text: 'Egy szoba kifestésén dolgozó munkások száma és a munka ideje',
          categoryId: 'cat-inverse',
          explanation: 'Kétszer annyi munkás feleannyi idő alatt végez: fordított arányosság.'
        },
        {
          id: 's1-3',
          text: 'Egy taxi viteldíja fix 1000 Ft-os alapdíjjal + kilométerenként',
          categoryId: 'cat-neither',
          explanation: 'Az alapdíj miatt nem origóból indul, nem egyenes arányosság.'
        },
        {
          id: 's1-4',
          text: 'Egy autó menetideje és megtett útja állandó sebesség mellett',
          categoryId: 'cat-direct',
          explanation: 'Kétszer annyi idő alatt kétszer akkora utat tesz meg: egyenes arányosság.'
        },
        {
          id: 's1-5',
          text: 'Egy tábla csoki szeleteinek száma és egy szelet tömege',
          categoryId: 'cat-inverse',
          explanation: 'Több szeletre törve kisebb szeletek keletkeznek.'
        },
        {
          id: 's1-6',
          text: 'Egy négyzet oldalhossza és a területe (T = a · a)',
          categoryId: 'cat-neither',
          explanation: 'Ha az oldal duplázódik, a terület NÉGYSZEREZŐDIK (nem egyenes arányos).'
        },
        {
          id: 's1-7',
          text: 'Egy szabályos háromszög oldala és a kerülete',
          categoryId: 'cat-direct',
          explanation: 'K = 3 · a, az oldal duplázódásakor a kerület is pontosan duplázódik.'
        },
        {
          id: 's1-8',
          text: 'Két testvér életkora az évek múlásával',
          categoryId: 'cat-neither',
          explanation: 'A kettőjük közötti különbség fix, nem az arányuk.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYSÉGÁR NAGYSÁGRENDJE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-low',
          name: 'Egységár < 500 Ft',
          description: '1 darab vagy 1 kilogramm ára kevesebb mint 500 Ft',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-medium',
          name: 'Egységár 500 és 1000 Ft között',
          description: '1 darab vagy 1 kilogramm ára 500 Ft és 1000 Ft közé esik',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-high',
          name: 'Egységár > 1000 Ft',
          description: '1 darab vagy 1 kilogramm ára több mint 1000 Ft',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '4 darab füzet 1200 Ft',
          categoryId: 'cat-low',
          explanation: '1 füzet = 1200 : 4 = 300 Ft (< 500 Ft).'
        },
        {
          id: 's2-2',
          text: '2 kg sajt 5000 Ft',
          categoryId: 'cat-high',
          explanation: '1 kg sajt = 5000 : 2 = 2500 Ft (> 1000 Ft).'
        },
        {
          id: 's2-3',
          text: '4 liter benzin 2400 Ft',
          categoryId: 'cat-medium',
          explanation: '1 liter benzin = 2400 : 4 = 600 Ft (500 és 1000 Ft között).'
        },
        {
          id: 's2-4',
          text: '3 kg burgonya 1050 Ft',
          categoryId: 'cat-low',
          explanation: '1 kg burgonya = 1050 : 3 = 350 Ft (< 500 Ft).'
        },
        {
          id: 's2-5',
          text: '3 darab póló 9000 Ft',
          categoryId: 'cat-high',
          explanation: '1 póló = 9000 : 3 = 3000 Ft (> 1000 Ft).'
        },
        {
          id: 's2-6',
          text: '5 darab prémium csokoládé 3500 Ft',
          categoryId: 'cat-medium',
          explanation: '1 csoki = 3500 : 5 = 700 Ft (500 és 1000 Ft között).'
        },
        {
          id: 's2-7',
          text: '5 darab grafitceruza 1000 Ft',
          categoryId: 'cat-low',
          explanation: '1 ceruza = 1000 : 5 = 200 Ft (< 500 Ft).'
        },
        {
          id: 's2-8',
          text: '2 kg kávébab 4400 Ft',
          categoryId: 'cat-high',
          explanation: '1 kg kávé = 4400 : 2 = 2200 Ft (> 1000 Ft).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: SZÁMTÁBLÁZATOK VIZSGÁLATA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-table-direct',
          name: 'Egyenes arányosság táblázata',
          description: 'A hányados (y : x) minden oszlopban PONTOSAN ugyanannyi',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-table-inverse',
          name: 'Fordított arányosság táblázata',
          description: 'A szorzat (x · y) minden oszlopban PONTOSAN ugyanannyi',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-table-other',
          name: 'Nem arányos számtáblázat',
          description: 'Sem a hányados, sem a szorzat nem állandó (pl. fix összeg adódik hozzá)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Párok: (1; 4), (2; 8), (3; 12), (5; 20)',
          categoryId: 'cat-table-direct',
          explanation: 'A hányados mindig y : x = 4 (egyenes arányosság).'
        },
        {
          id: 's3-2',
          text: 'Párok: (1; 24), (2; 12), (3; 8), (4; 6)',
          categoryId: 'cat-table-inverse',
          explanation: 'A szorzat mindig x · y = 24 (fordított arányosság).'
        },
        {
          id: 's3-3',
          text: 'Párok: (1; 11), (2; 12), (3; 13), (4; 14)',
          categoryId: 'cat-table-other',
          explanation: 'y = x + 10 (különbség állandó, nem arányos).'
        },
        {
          id: 's3-4',
          text: 'Párok: (2; 50), (4; 100), (6; 150), (10; 250)',
          categoryId: 'cat-table-direct',
          explanation: 'A hányados mindig 25 (y : x = 25).'
        },
        {
          id: 's3-5',
          text: 'Párok: (1; 1), (2; 4), (3; 9), (4; 16)',
          categoryId: 'cat-table-other',
          explanation: 'Négyzetszámok (y = x · x), nem egyenes arányosság.'
        },
        {
          id: 's3-6',
          text: 'Párok: (1; 60), (2; 30), (3; 20), (5; 12)',
          categoryId: 'cat-table-inverse',
          explanation: 'A szorzat mindig 60 (x · y = 60).'
        },
        {
          id: 's3-7',
          text: 'Párok: (3; 150), (5; 250), (8; 400)',
          categoryId: 'cat-table-direct',
          explanation: 'A hányados mindig 50 (150 : 3 = 250 : 5 = 400 : 8 = 50).'
        },
        {
          id: 's3-8',
          text: 'Párok: (0; 500), (1; 800), (2; 1100), (3; 1400)',
          categoryId: 'cat-table-other',
          explanation: 'Alapdíjas kapcsolat: y = 500 + 300 · x (nem origóból indul).'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <SorterTemplate
      title="Egyenes Arányosság Csoportosító"
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
