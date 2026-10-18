import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SurfaceAreaSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SurfaceAreaSorter: React.FC<SurfaceAreaSorterProps> = ({
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
    // 1. SZINT: FELSZÍNKÉPLET JELLEGE
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-cube-formula',
          name: 'Kocka felszíne (6 · a²)',
          description: '6 egybevágó négyzetlap összege',
          badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800'
        },
        {
          id: 'cat-cuboid-formula',
          name: 'Zárt téglatest felszíne 2(ab+ac+bc)',
          description: '3 pár egybevágó téglalaplap összege',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-open-formula',
          name: 'Nyitott test (5 lap, fedél nélkül)',
          description: 'Akvárium, medence vagy fedetlen doboz',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'a = 4 cm élű zárt kocka felszíne (96 cm²)',
          categoryId: 'cat-cube-formula',
          explanation: 'A = 6 · 4 · 4 = 96 cm².'
        },
        {
          id: 's1-2',
          text: 'Egy szabályos dobókocka teljes külső felülete',
          categoryId: 'cat-cube-formula',
          explanation: 'A kocka 6 egyforma négyzetlapból áll.'
        },
        {
          id: 's1-3',
          text: 'Egy kocka, melynél egy lap területe 25 cm² (felszíne 150 cm²)',
          categoryId: 'cat-cube-formula',
          explanation: 'A = 6 · 25 = 150 cm².'
        },
        {
          id: 's1-4',
          text: 'A 6 · a · a képlettel kiszámított felszín',
          categoryId: 'cat-cube-formula',
          explanation: 'A kocka klasszikus felszínképlete.'
        },
        {
          id: 's1-5',
          text: 'a = 5 cm, b = 3 cm, c = 2 cm zárt doboz felszíne',
          categoryId: 'cat-cuboid-formula',
          explanation: 'A = 2 · (15 + 10 + 6) = 62 cm² téglatest.'
        },
        {
          id: 's1-6',
          text: '3 cm × 4 cm × 5 cm tégla felülete',
          categoryId: 'cat-cuboid-formula',
          explanation: 'Téglatest felszíne: A = 2 · (12 + 15 + 20) = 94 cm².'
        },
        {
          id: 's1-7',
          text: 'A 2 · (ab + ac + bc) képlet alkalmazása',
          categoryId: 'cat-cuboid-formula',
          explanation: 'Zárt téglatest felszínének általános képlete.'
        },
        {
          id: 's1-8',
          text: '3 pár egybevágó téglalaplap felületének összege',
          categoryId: 'cat-cuboid-formula',
          explanation: 'A téglatest 6 lapja 3 egybevágó párt alkot.'
        },
        {
          id: 's1-9',
          text: 'Egy felül nyitott üvegakvárium üvegfelülete',
          categoryId: 'cat-open-formula',
          explanation: 'Nincs fedele, csak 1 fenéklap és 4 oldalfal = 5 lap.'
        },
        {
          id: 's1-10',
          text: 'Kerti medence belső csempézése (aljzat és 4 oldalfal)',
          categoryId: 'cat-open-formula',
          explanation: 'A medencének nincs fedőlapja, csak 5 felületet csempézünk.'
        },
        {
          id: 's1-11',
          text: 'Egy fiók külső bevonása fedőlap nélkül',
          categoryId: 'cat-open-formula',
          explanation: 'Nyitott doboz: 5 határoló lap.'
        },
        {
          id: 's1-12',
          text: 'Fedél nélküli kockadoboz (A = 5 · a²)',
          categoryId: 'cat-open-formula',
          explanation: 'A 6-os szorzó helyett csak 5-tel szorozzuk a négyzetlapot.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: FELSZÍN NAGYSÁGRENDJE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-small',
          name: 'A < 100 cm²',
          description: 'A test felszíne nem éri el a 100 négyzetcentimétert (1 dm²-t)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-medium',
          name: '100 cm² ≤ A ≤ 300 cm²',
          description: 'A felszín 100 és 300 négyzetcentiméter közé esik',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-large',
          name: 'A > 300 cm²',
          description: 'A test felszíne meghaladja a 300 négyzetcentimétert',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'a = 2 cm élű kocka felszíne',
          categoryId: 'cat-small',
          explanation: 'A = 6 · 4 = 24 cm² (< 100 cm²).'
        },
        {
          id: 's2-2',
          text: 'a = 3 cm élű kocka felszíne',
          categoryId: 'cat-small',
          explanation: 'A = 6 · 9 = 54 cm² (< 100 cm²).'
        },
        {
          id: 's2-3',
          text: 'a = 4 cm élű kocka felszíne',
          categoryId: 'cat-small',
          explanation: 'A = 6 · 16 = 96 cm² (< 100 cm²).'
        },
        {
          id: 's2-4',
          text: 'a = 4 cm, b = 3 cm, c = 2 cm téglatest felszíne',
          categoryId: 'cat-small',
          explanation: 'A = 2 · (12 + 8 + 6) = 52 cm² (< 100 cm²).'
        },
        {
          id: 's2-5',
          text: 'a = 5 cm élű kocka felszíne',
          categoryId: 'cat-medium',
          explanation: 'A = 6 · 25 = 150 cm² (100 és 300 cm² között).'
        },
        {
          id: 's2-6',
          text: 'a = 6 cm élű kocka felszíne',
          categoryId: 'cat-medium',
          explanation: 'A = 6 · 36 = 216 cm² (100 és 300 cm² között).'
        },
        {
          id: 's2-7',
          text: 'a = 6 cm, b = 5 cm, c = 4 cm téglatest felszíne',
          categoryId: 'cat-medium',
          explanation: 'A = 2 · (30 + 24 + 20) = 148 cm² (100 és 300 cm² között).'
        },
        {
          id: 's2-8',
          text: 'a = 10 cm, b = 5 cm, c = 4 cm téglatest felszíne',
          categoryId: 'cat-medium',
          explanation: 'A = 2 · (50 + 40 + 20) = 220 cm² (100 és 300 cm² között).'
        },
        {
          id: 's2-9',
          text: 'a = 8 cm élű kocka felszíne',
          categoryId: 'cat-large',
          explanation: 'A = 6 · 64 = 384 cm² (> 300 cm²).'
        },
        {
          id: 's2-10',
          text: 'a = 10 cm élű kocka felszíne',
          categoryId: 'cat-large',
          explanation: 'A = 6 · 100 = 600 cm² (> 300 cm²).'
        },
        {
          id: 's2-11',
          text: 'a = 12 cm, b = 10 cm, c = 8 cm téglatest felszíne',
          categoryId: 'cat-large',
          explanation: 'A = 2 · (120 + 96 + 80) = 592 cm² (> 300 cm²).'
        },
        {
          id: 's2-12',
          text: 'a = 1 m élű kocka felszíne',
          categoryId: 'cat-large',
          explanation: 'A = 6 m² = 60 000 cm² (> 300 cm²).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: GEOMETRIAI MENNYISÉGEK MEGKÜLÖNBÖZTETÉSE
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-surface',
          name: 'Teljes felszín (A, cm²)',
          description: 'A test összes határoló lapjának területe',
          badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800'
        },
        {
          id: 'cat-edges-sum',
          name: 'Élek összhossza (Ö_é, cm)',
          description: 'A test 12 élének együttes hossza (drótváz)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-face-area',
          name: 'Egyetlen határoló lap területe (cm²)',
          description: 'Csak egyetlen lap mérete (alaplap, oldallap)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Ajándékdoboz becsomagolásához szükséges papír területe',
          categoryId: 'cat-surface',
          explanation: 'A test teljes beborítása a felszínét jelenti.'
        },
        {
          id: 's3-2',
          text: 'Téglatest alakú szekrény lefestendő teljes külső felülete',
          categoryId: 'cat-surface',
          explanation: 'A külső felület festése a teljes felszín.'
        },
        {
          id: 's3-3',
          text: 'Akvárium elkészítéséhez szükséges összes üveglap területe',
          categoryId: 'cat-surface',
          explanation: 'A lapok együttes területe a felszín.'
        },
        {
          id: 's3-4',
          text: 'A 2 · (ab + ac + bc) képlet eredménye',
          categoryId: 'cat-surface',
          explanation: 'A téglatest felszínének képlete.'
        },
        {
          id: 's3-5',
          text: 'Egy díszdoboz élvázához szükséges drót hossza',
          categoryId: 'cat-edges-sum',
          explanation: 'A drót a test 12 élét követi: hosszúság.'
        },
        {
          id: 's3-6',
          text: 'Akvárium széleire ragasztandó élvédő szalag hossza',
          categoryId: 'cat-edges-sum',
          explanation: 'Az élekre kerül: élhossz-összeg.'
        },
        {
          id: 's3-7',
          text: 'A 4 · (a + b + c) vagy 12 · a képlet eredménye',
          categoryId: 'cat-edges-sum',
          explanation: 'Az élek összhosszának képlete (hosszúságmérték).'
        },
        {
          id: 's3-8',
          text: 'A test 12 élének együttes hossza',
          categoryId: 'cat-edges-sum',
          explanation: 'Az élek összhossza.'
        },
        {
          id: 's3-9',
          text: 'A kocka alsó lapjának területe (a²)',
          categoryId: 'cat-face-area',
          explanation: 'Csak 1 lap a 6 közül.'
        },
        {
          id: 's3-10',
          text: 'A téglatest alaplapjának területe (a · b)',
          categoryId: 'cat-face-area',
          explanation: 'Csak az alsó lap területe.'
        },
        {
          id: 's3-11',
          text: 'Egy szoba padlójának parkettázása',
          categoryId: 'cat-face-area',
          explanation: 'Csak a padló (alaplap) felülete, a falak és plafon nélkül.'
        },
        {
          id: 's3-12',
          text: 'Kocka felszínének pontosan a hatodrésze (A : 6)',
          categoryId: 'cat-face-area',
          explanation: 'Mivel 6 egyforma lap van, a hatodrész egyetlen lap területe.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Felszínszámítás Csoportosító"
      subtitle="Válogasd szét a testek felszíneit, nagyságrendjeit és geometriai mennyiségeit!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
