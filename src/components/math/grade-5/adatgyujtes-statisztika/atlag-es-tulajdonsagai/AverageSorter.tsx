import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AverageSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AverageSorter: React.FC<AverageSorterProps> = ({
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
    // 1. SZINT: ÚJ ÉRDEMJEGY HATÁSA A 4,0-S ÁTLAGRA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-inc',
          name: 'Növeli az átlagot (Érték > 4,0)',
          description: 'Az új érték nagyobb az eddigi átlagnál, így felfelé húzza',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-dec',
          name: 'Csökkenti az átlagot (Érték < 4,0)',
          description: 'Az új érték kisebb az eddigi átlagnál, így lerontja azt',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-same',
          name: 'Nem változtatja meg (Érték = 4,0)',
          description: 'Az új érték pontosan megegyezik a jelenlegi átlaggal',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '5-ös (Jeles) dolgozatjegy',
          categoryId: 'cat-inc',
          explanation: '5 > 4,0, ezért az átlag növekszik.'
        },
        {
          id: 's1-2',
          text: '2-es (Elégséges) dolgozatjegy',
          categoryId: 'cat-dec',
          explanation: '2 < 4,0, ezért az átlag lecsökken.'
        },
        {
          id: 's1-3',
          text: '4-es (Jó) felelet',
          categoryId: 'cat-same',
          explanation: '4 = 4,0, pontosan egyenlő az átlaggal, így nem változtatja meg.'
        },
        {
          id: 's1-4',
          text: '1-es (Elégtelen) témazáró',
          categoryId: 'cat-dec',
          explanation: '1 < 4,0, jelentősen lerontja a tanulmányi átlagot.'
        },
        {
          id: 's1-5',
          text: '4,5 pontos bónusz feladat',
          categoryId: 'cat-inc',
          explanation: '4,5 > 4,0, felfelé módosítja a számtani közepet.'
        },
        {
          id: 's1-6',
          text: '3-as (Közepes) röpdolgozat',
          categoryId: 'cat-dec',
          explanation: '3 < 4,0, lefelé húzza a 4,0-s átlagot.'
        },
        {
          id: 's1-7',
          text: 'Négyes alá (3,7) értékű felmérő',
          categoryId: 'cat-dec',
          explanation: '3,7 < 4,0, kisebb az átlagnál, így csökkenti azt.'
        },
        {
          id: 's1-8',
          text: 'Pontosan 4,0 értékű projektmunka',
          categoryId: 'cat-same',
          explanation: 'Megegyezik az átlaggal, így a számtani közép nem változik.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: LEHETSÉGES ÉS LEHETETLEN ÁTLAGOK (10, 15, 20)
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-valid',
          name: 'Lehetséges átlagérték (10 ≤ Átlag ≤ 20)',
          description: 'A legkisebb (10) és legnagyobb (20) adat határai közé esik',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-low',
          name: 'Lehetetlen: Túl kicsi (< 10)',
          description: 'Kisebb a minta legkisebb adatánál (sérti a közrefogási elvet)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-high',
          name: 'Lehetetlen: Túl nagy (> 20)',
          description: 'Nagyobb a minta legnagyobb adatánál (sérti a közrefogási elvet)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '15 (A pontos számtani közép)',
          categoryId: 'cat-valid',
          explanation: '(10 + 15 + 20) : 3 = 45 : 3 = 15, tökéletesen érvényes.'
        },
        {
          id: 's2-2',
          text: '6 (Alacsony számérték)',
          categoryId: 'cat-low',
          explanation: 'Mivel a legkisebb szám a 10, az átlag nem lehet 6.'
        },
        {
          id: 's2-3',
          text: '25 (Magas számérték)',
          categoryId: 'cat-high',
          explanation: 'Mivel a legnagyobb szám a 20, az átlag nem haladhatja meg a 20-at.'
        },
        {
          id: 's2-4',
          text: '12,5 (Köztes tizedestört)',
          categoryId: 'cat-valid',
          explanation: '10 és 20 közé esik, elméletileg lehetséges más darabszámok mellett.'
        },
        {
          id: 's2-5',
          text: '0 (Nulla)',
          categoryId: 'cat-low',
          explanation: 'Kisebb mint 10, lehetetlen átlag.'
        },
        {
          id: 's2-6',
          text: '21 (Kissé meghaladja a maximumot)',
          categoryId: 'cat-high',
          explanation: 'Nagyobb a 20-as maximumnál, kizárt.'
        },
        {
          id: 's2-7',
          text: '18 (Köztes egész)',
          categoryId: 'cat-valid',
          explanation: '10 és 20 közé esik, érvényes köztes érték.'
        },
        {
          id: 's2-8',
          text: '9,9 (Közvetlenül a minimum alatt)',
          categoryId: 'cat-low',
          explanation: 'Még éppen kisebb a 10-es minimumnál, így lehetetlen.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: STATISZTIKAI MUTATÓK SZÉTVÁLOGATÁSA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-mean',
          name: 'Átlag (Számtani közép)',
          description: 'Összeg osztva a darabszámmal, kiegyenlítő mutató',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-mode',
          name: 'Módusz (Leggyakoribb adat)',
          description: 'A mintában a legtöbbször előforduló érték',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-range',
          name: 'Terjedelem (Szélső értékek különbsége)',
          description: 'Legnagyobb adat mínusz legkisebb adat (Max − Min)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Kiszámításához össze kell adni az adatokat és elosztani a darabszámmal',
          categoryId: 'cat-mean',
          explanation: 'Ez a számtani közép (átlag) pontos definíciója.'
        },
        {
          id: 's3-2',
          text: 'A legtöbbször előforduló, legnagyobb gyakoriságú érték',
          categoryId: 'cat-mode',
          explanation: 'Ez a módusz definíciója (pl. a legnépszerűbb fagylaltíz).'
        },
        {
          id: 's3-3',
          text: 'A legnagyobb és legkisebb adat különbsége (Max − Min)',
          categoryId: 'cat-range',
          explanation: 'Ez a terjedelem, ami a szóródást, az adatok távolságát mutatja.'
        },
        {
          id: 's3-4',
          text: 'Erősen befolyásolják a szélsőséges kiugró értékek',
          categoryId: 'cat-mean',
          explanation: 'Egyetlen extrém nagy vagy kicsi adat erősen elhúzhatja az átlagot.'
        },
        {
          id: 's3-5',
          text: 'Megmutatja, milyen széles sávban helyezkednek el a mérési eredmények',
          categoryId: 'cat-range',
          explanation: 'A terjedelem a megfigyelt értékek kiterjedését fejezi ki.'
        },
        {
          id: 's3-6',
          text: 'Nem feltétlenül létezik belőle csak egy, lehet belőle több is, vagy akár egy sem',
          categoryId: 'cat-mode',
          explanation: 'Ha több érték is holtversenyben a leggyakoribb, több módusz is van.'
        },
        {
          id: 's3-7',
          text: 'Ha mindenkinek azonos pontszáma van, értéke pontosan ezzel a pontszámmal egyenlő',
          categoryId: 'cat-mean',
          explanation: 'Azonos értékek átlaga önmagukkal egyenlő.'
        },
        {
          id: 's3-8',
          text: 'Ha a legkisebb adat 12, a legnagyobb 28, akkor az értéke 16',
          categoryId: 'cat-range',
          explanation: 'Terjedelem = 28 − 12 = 16.'
        }
      ]
    }
  };

  const handleLevelChange = (newLevel: DifficultyLevel) => {
    setCurrentLevel(newLevel);
    if (onNextLevel) onNextLevel();
  };

  return (
    <SorterTemplate
      title="Átlag Csoportosító Játék"
      subtitle="Válogasd szét a fogalmakat, az átlagváltozásokat és a lehetséges értékeket!"
      color="amber"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};
