import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface StatsSummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const StatsSummarySorter: React.FC<StatsSummarySorterProps> = ({
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
    // 1. SZINT: A MEGFELELŐ DIAGRAMTÍPUS KIVÁLASZTÁSA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-bar',
          name: 'Oszlopdiagram',
          description: 'Különálló kategóriák összehasonlítása',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-line',
          name: 'Vonaldiagram',
          description: 'Időbeli változások, folyamatos trendek bemutatása',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-pie',
          name: 'Kördiagram',
          description: 'A részek és az egész (100%) arányának szemléltetése',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy beteg testhőmérsékletének óránkénti változása a kórházban',
          categoryId: 'cat-line',
          explanation: 'Időbeli lefolyású, folyamatos folyamat.'
        },
        {
          id: 's1-2',
          text: 'Az osztály tanulóinak kedvenc háziállatai (kutya, macska, hörcsög)',
          categoryId: 'cat-bar',
          explanation: 'Egymástól független, különálló kategóriák.'
        },
        {
          id: 's1-3',
          text: 'Egy család havi költségvetésének százalékos megoszlása a teljes bevételből',
          categoryId: 'cat-pie',
          explanation: 'A teljes egész (100%) részekre bontása.'
        },
        {
          id: 's1-4',
          text: 'Egy babpalánta magasságának növekedése mm-ben a hét 7 napján',
          categoryId: 'cat-line',
          explanation: 'Időbeli növekedési folyamat.'
        },
        {
          id: 's1-5',
          text: 'Az 5. évfolyam osztályainak létszáma (5.A, 5.B, 5.C)',
          categoryId: 'cat-bar',
          explanation: 'Csoportok létszámának összevetése.'
        },
        {
          id: 's1-6',
          text: 'Az iskolai büfében a szavazatok aránya a pizza, melegszendvics és saláta között',
          categoryId: 'cat-pie',
          explanation: 'A szavazatok 100%-os megoszlásának bemutatása.'
        },
        {
          id: 's1-7',
          text: 'A levegő páratartalmának alakulása reggeltől estig',
          categoryId: 'cat-line',
          explanation: 'Időbeli időjárási görbe.'
        },
        {
          id: 's1-8',
          text: 'A könyvtárban kikölcsönzött könyvek száma műfajok szerint',
          categoryId: 'cat-bar',
          explanation: 'Különálló könyvműfajok összehasonlítása.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: STATISZTIKAI MUTATÓK TULAJDONSÁGAI
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-mean',
          name: 'Átlag (Számtani közép)',
          description: 'Összeg osztva a darabszámmal, kiegyenlítés',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-mode',
          name: 'Módusz (Gyakorisági csúcs)',
          description: 'A leggyakoribb, legnagyobb darabszámú érték',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-range',
          name: 'Terjedelem (Kiterjedés)',
          description: 'A legkisebb és legnagyobb adat távolsága',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Kiszámításához az összes adat összegét elosztjuk az adatok darabszámával',
          categoryId: 'cat-mean',
          explanation: 'A számtani közép alapképlete.'
        },
        {
          id: 's2-2',
          text: 'A cipőboltban a leggyakrabban eladott méret (38-as)',
          categoryId: 'cat-mode',
          explanation: 'A legnépszerűbb méret a módusz.'
        },
        {
          id: 's2-3',
          text: 'Legnagyobb érték mínusz legkisebb érték (Max − Min)',
          categoryId: 'cat-range',
          explanation: 'Ez a terjedelem definíciója.'
        },
        {
          id: 's2-4',
          text: 'Mindig a legkisebb és a legnagyobb adat közé esik',
          categoryId: 'cat-mean',
          explanation: 'Közrefogási tulajdonság.'
        },
        {
          id: 's2-5',
          text: 'Nem feltétlenül létezik belőle egyetlenegy; lehet több is vagy egy sem',
          categoryId: 'cat-mode',
          explanation: 'Több csúcsérték esetén több módusz is van.'
        },
        {
          id: 's2-6',
          text: 'Megmutatja, milyen széles intervallumban szóródnak az adatok',
          categoryId: 'cat-range',
          explanation: 'A minta szélességét jelzi.'
        },
        {
          id: 's2-7',
          text: 'Egyetlen kiugró extrém érték nagyon erősen eltorzíthatja',
          categoryId: 'cat-mean',
          explanation: 'Az átlag érzékeny az outlierekre.'
        },
        {
          id: 's2-8',
          text: 'Visszafelé szorozva a darabszámmal megkapjuk az elemek összegét',
          categoryId: 'cat-mean',
          explanation: 'Összeg = Átlag × Darabszám.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ESEMÉNYEK VALÓSZÍNŰSÉGE
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-certain',
          name: 'Biztos esemény (100%)',
          description: 'Mindenképpen bekövetkezik',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-possible',
          name: 'Lehetséges (Véletlen) esemény',
          description: 'Bekövetkezhet, de nem garantált',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-impossible',
          name: 'Lehetetlen esemény (0%)',
          description: 'Soha nem fordulhat elő',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Szabályos kockával 7-nél kisebb számot dobunk',
          categoryId: 'cat-certain',
          explanation: '1, 2, 3, 4, 5, 6 mindegyike kisebb 7-nél.'
        },
        {
          id: 's3-2',
          text: 'Pénzérmével Fejet dobunk',
          categoryId: 'cat-possible',
          explanation: '50% esélyű véletlen kimenetel.'
        },
        {
          id: 's3-3',
          text: 'Két kockával dobva az összeg pontosan 1',
          categoryId: 'cat-impossible',
          explanation: 'A minimális összeg 1 + 1 = 2.'
        },
        {
          id: 's3-4',
          text: 'Két páratlan szám szorzata páratlan lesz',
          categoryId: 'cat-certain',
          explanation: 'Páratlan × páratlan mindig páratlan (pl. 3 × 5 = 15).'
        },
        {
          id: 's3-5',
          text: 'A holnapi lottóhúzáson telitalálatunk lesz',
          categoryId: 'cat-possible',
          explanation: 'Rendkívül ritka, de lehetséges kimenetel.'
        },
        {
          id: 's3-6',
          text: 'Szabályos kockával negatív számot dobunk',
          categoryId: 'cat-impossible',
          explanation: 'A kockán minden szám pozitív.'
        },
        {
          id: 's3-7',
          text: 'Egy szabályos kockával dobva a szám legalább 1',
          categoryId: 'cat-certain',
          explanation: 'A legkisebb dobható szám az 1.'
        },
        {
          id: 's3-8',
          text: 'Egy csupa kék golyót tartalmazó zsákból zöldet húzunk',
          categoryId: 'cat-impossible',
          explanation: 'Nincs zöld golyó a zsákban.'
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
      title="Összefoglaló Csoportosító Játék"
      subtitle="Rendszerezd a diagramtípusokat, a statisztikai mutatókat és a valószínűségi kategóriákat!"
      color="slate"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};
