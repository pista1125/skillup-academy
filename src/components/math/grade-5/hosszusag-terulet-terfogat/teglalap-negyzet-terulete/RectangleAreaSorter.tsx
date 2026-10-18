import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RectangleAreaSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RectangleAreaSorter: React.FC<RectangleAreaSorterProps> = ({
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
    // 1. SZINT: MELYIK ALAKZAT TERÜLETE LEHET?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-square',
          name: 'Négyzet területe (a = b)',
          description: 'Minden oldala egyforma, T = a · a',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-rect',
          name: 'Kifejezetten Téglalap (a ≠ b)',
          description: 'Két különböző szomszédos oldal, T = a · b',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        },
        {
          id: 'cat-cannot',
          name: 'Nem állapítható meg közvetlenül',
          description: 'Hiányos vagy nem elégséges adatok',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'a = 6 cm és b = 6 cm oldalú alakzat területe (36 cm²)',
          categoryId: 'cat-square',
          explanation: 'Mivel a két szomszédos oldal egyenlő (a = b), ez egy négyzet.'
        },
        {
          id: 's1-2',
          text: 'T = 49 cm² alakzat, amelynek minden oldala egyenlő hosszúságú',
          categoryId: 'cat-square',
          explanation: 'Minden oldala egyenlő: ez a négyzet (oldala 7 cm).'
        },
        {
          id: 's1-3',
          text: 'a = 8 m oldalú négyzet területe (64 m²)',
          categoryId: 'cat-square',
          explanation: 'Kifejezetten négyzet: T = 8 · 8 = 64 m².'
        },
        {
          id: 's1-4',
          text: 'T = a² képlettel kiszámolt terület',
          categoryId: 'cat-square',
          explanation: 'Az oldal négyzetre emelése a négyzet területképlete.'
        },
        {
          id: 's1-5',
          text: 'a = 7 cm, b = 4 cm alakzat területe (28 cm²)',
          categoryId: 'cat-rect',
          explanation: 'Két különböző oldalhosszúság: T = 7 · 4 = 28 cm² téglalap.'
        },
        {
          id: 's1-6',
          text: 'a = 10 m, b = 3 m kerti telek területe (30 m²)',
          categoryId: 'cat-rect',
          explanation: 'Téglalap alakú telek, T = 10 · 3 = 30 m².'
        },
        {
          id: 's1-7',
          text: 'a = 12 dm, b = 5 dm íróasztal lapja (60 dm²)',
          categoryId: 'cat-rect',
          explanation: 'Téglalap, két különböző méretű oldallal.'
        },
        {
          id: 's1-8',
          text: 'T = 40 cm², melynek oldalai 8 cm és 5 cm',
          categoryId: 'cat-rect',
          explanation: 'Különböző szomszédos oldalak: 8 cm ≠ 5 cm.'
        },
        {
          id: 's1-9',
          text: 'Egy általános téglalap, aminek csak a kerülete ismert (K = 30 cm)',
          categoryId: 'cat-cannot',
          explanation: 'Csak a kerületből nem számítható ki egy általános téglalap területe (végtelen sok oldal-pár lehetséges).'
        },
        {
          id: 's1-10',
          text: 'Egy téglalap, aminek csak az egyik oldala adott (a = 5 cm, a b ismeretlen)',
          categoryId: 'cat-cannot',
          explanation: 'A második oldal (b) nélkül nem számítható ki a téglalap területe.'
        },
        {
          id: 's1-11',
          text: 'Különböző mértékegységű oldalak közvetlen összeadása',
          categoryId: 'cat-cannot',
          explanation: 'Nem számítási módszer, értelmetlen hiba.'
        },
        {
          id: 's1-12',
          text: 'Egy alakzat, amiről csak annyit tudunk, hogy négyszög',
          categoryId: 'cat-cannot',
          explanation: 'Nem minden négyszög téglalap, az a · b képlet nem érvényes rá.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TERÜLET NAGYSÁGRENDJE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-small',
          name: 'T < 50 cm²',
          description: 'A terület kisebb mint 50 négyzetcentiméter',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-medium',
          name: '50 cm² ≤ T ≤ 100 cm²',
          description: 'A terület 50 és 100 négyzetcentiméter közé esik',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-large',
          name: 'T > 100 cm²',
          description: 'A terület meghaladja a 100 négyzetcentimétert (1 dm²-t)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'a = 6 cm, b = 5 cm téglalap területe',
          categoryId: 'cat-small',
          explanation: 'T = 6 · 5 = 30 cm² (< 50 cm²).'
        },
        {
          id: 's2-2',
          text: 'a = 6 cm oldalú négyzet területe',
          categoryId: 'cat-small',
          explanation: 'T = 6 · 6 = 36 cm² (< 50 cm²).'
        },
        {
          id: 's2-3',
          text: 'a = 8 cm, b = 4 cm téglalap területe',
          categoryId: 'cat-small',
          explanation: 'T = 8 · 4 = 32 cm² (< 50 cm²).'
        },
        {
          id: 's2-4',
          text: 'a = 7 cm oldalú négyzet területe',
          categoryId: 'cat-small',
          explanation: 'T = 7 · 7 = 49 cm² (< 50 cm²).'
        },
        {
          id: 's2-5',
          text: 'a = 10 cm, b = 6 cm téglalap területe',
          categoryId: 'cat-medium',
          explanation: 'T = 10 · 6 = 60 cm² (50 és 100 cm² között).'
        },
        {
          id: 's2-6',
          text: 'a = 8 cm oldalú négyzet területe',
          categoryId: 'cat-medium',
          explanation: 'T = 8 · 8 = 64 cm² (50 és 100 cm² között).'
        },
        {
          id: 's2-7',
          text: 'a = 9 cm oldalú négyzet területe',
          categoryId: 'cat-medium',
          explanation: 'T = 9 · 9 = 81 cm² (50 és 100 cm² között).'
        },
        {
          id: 's2-8',
          text: 'a = 10 cm oldalú négyzet területe',
          categoryId: 'cat-medium',
          explanation: 'T = 10 · 10 = 100 cm² (pontosan a határ, 1 dm²).'
        },
        {
          id: 's2-9',
          text: 'a = 15 cm, b = 10 cm téglalap területe',
          categoryId: 'cat-large',
          explanation: 'T = 15 · 10 = 150 cm² (> 100 cm²).'
        },
        {
          id: 's2-10',
          text: 'a = 11 cm oldalú négyzet területe',
          categoryId: 'cat-large',
          explanation: 'T = 11 · 11 = 121 cm² (> 100 cm²).'
        },
        {
          id: 's2-11',
          text: 'a = 20 cm, b = 8 cm téglalap területe',
          categoryId: 'cat-large',
          explanation: 'T = 20 · 8 = 160 cm² (> 100 cm²).'
        },
        {
          id: 's2-12',
          text: 'a = 12 cm oldalú négyzet területe',
          categoryId: 'cat-large',
          explanation: 'T = 12 · 12 = 144 cm² (> 100 cm²).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: SZÁMÍTÁSI MÓDSZER MEGHATÁROZÁSA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-mult',
          name: 'Közvetlen szorzás (T = a · b vagy a · a)',
          description: 'Mindkét oldal ismert és azonos mértékegységben van',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-div',
          name: 'Visszafelé osztás (a = T : b)',
          description: 'A terület és az egyik oldal ismert, a hiányzó oldalt keressük',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-multi-step',
          name: 'Többlépéses feladat',
          description: 'Előbb átváltás vagy kerületből oldalhossz szükséges',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'a = 7 cm és b = 4 cm téglalap területének keresése',
          categoryId: 'cat-mult',
          explanation: 'Közvetlen szorzás: T = 7 · 4 = 28 cm².'
        },
        {
          id: 's3-2',
          text: 'a = 9 m négyzet alakú virágágyás területének kiszámítása',
          categoryId: 'cat-mult',
          explanation: 'Közvetlen szorzás önmagával: T = 9 · 9 = 81 m².'
        },
        {
          id: 's3-3',
          text: 'a = 12 dm és b = 6 dm parketta felületének kiszámítása',
          categoryId: 'cat-mult',
          explanation: 'Azonos egységek, közvetlen szorzás: T = 12 · 6 = 72 dm².'
        },
        {
          id: 's3-4',
          text: 'a = 50 m és b = 20 m telek területének kiszámítása',
          categoryId: 'cat-mult',
          explanation: 'Közvetlen szorzás: T = 50 · 20 = 1000 m².'
        },
        {
          id: 's3-5',
          text: 'T = 45 cm² és b = 5 cm, keresett a téglalap másik oldala',
          categoryId: 'cat-div',
          explanation: 'Osztással számolunk vissza: a = 45 : 5 = 9 cm.'
        },
        {
          id: 's3-6',
          text: 'T = 72 m² telek szélessége b = 8 m, keresett a hossza',
          categoryId: 'cat-div',
          explanation: 'Visszafelé osztás: a = 72 : 8 = 9 m.'
        },
        {
          id: 's3-7',
          text: 'T = 36 dm² téglalap magassága, ha az alapja a = 4 dm',
          categoryId: 'cat-div',
          explanation: 'Visszafelé osztás: b = 36 : 4 = 9 dm.'
        },
        {
          id: 's3-8',
          text: 'T = 100 m² téglalap egyik oldala 20 m, mekkora a másik?',
          categoryId: 'cat-div',
          explanation: 'Visszafelé osztás: b = 100 : 20 = 5 m.'
        },
        {
          id: 's3-9',
          text: 'a = 2 m és b = 30 cm téglalap területe',
          categoryId: 'cat-multi-step',
          explanation: 'Kétlépéses: először át kell váltani azonos mértékegységre (2 m = 200 cm), majd utána szorozni.'
        },
        {
          id: 's3-10',
          text: 'Négyzet kerülete K = 28 cm, keresett a területe (T = ?)',
          categoryId: 'cat-multi-step',
          explanation: 'Kétlépéses: előbb oldal kiszámítása a kerületből (a = 28 : 4 = 7 cm), majd terület (T = 7 · 7 = 49 cm²).'
        },
        {
          id: 's3-11',
          text: 'Téglalap kerülete K = 30 cm, a = 9 cm, keresett a területe',
          categoryId: 'cat-multi-step',
          explanation: 'Többlépéses: félkerület a + b = 15 cm, b = 6 cm, majd terület T = 9 · 6 = 54 cm².'
        },
        {
          id: 's3-12',
          text: 'a = 4 dm és b = 50 cm, keresett a terület négyzetdeciméterben',
          categoryId: 'cat-multi-step',
          explanation: 'Előbb átváltás (50 cm = 5 dm), majd szorzás: T = 4 · 5 = 20 dm².'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Téglalap és Négyzet Terület Csoportosító"
      subtitle="Válogasd szét a feladatokat és számításokat a megfelelő kategóriákba!"
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
