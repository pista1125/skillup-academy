import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DataCollectionSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const DataCollectionSorter: React.FC<DataCollectionSorterProps> = ({
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
    // 1. SZINT: ADATGYŰJTÉSI MÓDSZEREK BESOROLÁSA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-meas',
          name: 'Mérés és Megfigyelés (Műszerrel)',
          description: 'Fizikai, természeti adatok rögzítése mérőeszközökkel',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-survey',
          name: 'Kérdőív és Szavazás (Vélemények)',
          description: 'Emberek döntéseinek, kedvenceinek és véleményének felmérése',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-count',
          name: 'Közvetlen Számlálás (Események)',
          description: 'Megtörtént események vagy tárgyak darabszámának regisztrálása',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy babpalánta magasságának növekedése mm-ben a hét napjain',
          categoryId: 'cat-meas',
          explanation: 'Vonalzóval végzett közvetlen hosszúságmérés.'
        },
        {
          id: 's1-2',
          text: 'Az 5. évfolyamosok kedvenc pizzafeltétje (sonkás, sajtos, gombás)',
          categoryId: 'cat-survey',
          explanation: 'A diákok személyes ízlésének kérdőíves felmérése.'
        },
        {
          id: 's1-3',
          text: 'Egy forgalmas zebra előtt elhaladó autók és biciklisek száma fél óra alatt',
          categoryId: 'cat-count',
          explanation: 'Közvetlen megfigyelés és darabszámlálás strigulázással.'
        },
        {
          id: 's1-4',
          text: 'A tanterem belső hőmérsékletének alakulása óránként a fűtési szezonban',
          categoryId: 'cat-meas',
          explanation: 'Hőmérővel mért adatsor.'
        },
        {
          id: 's1-5',
          text: 'Melyik múzeumba látogasson el az osztály a tavaszi kiránduláson?',
          categoryId: 'cat-survey',
          explanation: 'Osztályszavazás a közös programról.'
        },
        {
          id: 's1-6',
          text: 'Egy dobókockával végzett 50 dobásból hányszor dobtunk hatost',
          categoryId: 'cat-count',
          explanation: 'Kísérlet eredményeinek darabszámlálása.'
        },
        {
          id: 's1-7',
          text: 'A tanulók 60 méteres futásának időeredményei stopperórával mérve',
          categoryId: 'cat-meas',
          explanation: 'Stopperórás időmérés.'
        },
        {
          id: 's1-8',
          text: 'Naponta átlagosan hány percet töltenek a diákok olvasással',
          categoryId: 'cat-survey',
          explanation: 'Kérdőíves önbevallásos felmérés.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: A STATISZTIKAI KUTATÁS FÁZISAI
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-prep',
          name: '1. Előkészítés és Adatgyűjtés',
          description: 'A cél meghatározása, a minta kijelölése és az adatok feljegyzése',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-org',
          name: '2. Rendszerezés és Ábrázolás',
          description: 'Táblázat készítése, skála kijelölése és diagram megrajzolása',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-eval',
          name: '3. Értékelés és Következtetés',
          description: 'Az eredmények értelmezése, tanulságok levonása és döntéshozatal',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'A kérdőív kérdéseinek megfogalmazása és a célcsoport kiválasztása',
          categoryId: 'cat-prep',
          explanation: 'A statisztikai kutatás első, tervezési lépése.'
        },
        {
          id: 's2-2',
          text: 'Gyakorisági táblázat készítése és az „Összesen” sor kiszámítása',
          categoryId: 'cat-org',
          explanation: 'A nyers adatok strukturált rendszerezése táblázatba.'
        },
        {
          id: 's2-3',
          text: 'A legnépszerűbb választás (módusz) megállapítása és szöveges indoklása',
          categoryId: 'cat-eval',
          explanation: 'Az eredmények kiértékelése és összegzése.'
        },
        {
          id: 's2-4',
          text: 'Szavazatok strigulázása ötös kötegekben a szavazólapok megszámlálásakor',
          categoryId: 'cat-prep',
          explanation: 'Közvetlen adatgyűjtési és számlálási folyamat.'
        },
        {
          id: 's2-5',
          text: 'A tengelyek megrajzolása, skálabeosztás választása és oszlopok színezése',
          categoryId: 'cat-org',
          explanation: 'A vizuális diagram elkészítése.'
        },
        {
          id: 's2-6',
          text: 'Javaslattétel az iskolabüfé kínálatának megváltoztatására az adatok alapján',
          categoryId: 'cat-eval',
          explanation: 'A statisztikai kutatás végső célja a gyakorlati döntéshozatal.'
        },
        {
          id: 's2-7',
          text: 'A kapott százalékok összehasonlítása az előzetes várakozásokkal',
          categoryId: 'cat-eval',
          explanation: 'Kritikai értékelés és reflexió.'
        },
        {
          id: 's2-8',
          text: 'A hiányzó adatok pótlása és az adatsor rendezése növekvő sorrendbe',
          categoryId: 'cat-org',
          explanation: 'Adatrendszerezési munkafázis.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: A MEGFELELŐ SKÁLABEOSZTÁS KIVÁLASZTÁSA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-scale-1',
          name: '1-es beosztás (1 cm = 1 egység)',
          description: 'Kis adathalmazokhoz, ahol a maximum nem haladja meg a 10–12-t',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-scale-5',
          name: '5-ös beosztás (1 cm = 5 egység)',
          description: 'Közepes adathalmazokhoz, ahol a maximum 20 és 40 között van',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-scale-50',
          name: '50-es vagy 100-as beosztás',
          description: 'Nagy adathalmazokhoz, ahol a maximum több százas nagyságrendű',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Egy 5 fős baráti társaság házi kedvenceinek száma (a legtöbb: 3 állat)',
          categoryId: 'cat-scale-1',
          explanation: 'Kis számokhoz (1, 2, 3) tökéletes az 1-es beosztás, szépen elfér a füzetben.'
        },
        {
          id: 's3-2',
          text: 'Egy 32 fős osztály szavazatai 4 kirándulóhelyre (a győztes helyre 17-en szavaztak)',
          categoryId: 'cat-scale-5',
          explanation: 'A 20-ig terjedő skálához az 5-ös lépésköz (0, 5, 10, 15, 20) pontosan 4 cm helyet igényel.'
        },
        {
          id: 's3-3',
          text: 'Az iskola 420 tanulójának létszáma évfolyamonként (évfolyamonként 90–120 fő)',
          categoryId: 'cat-scale-50',
          explanation: 'Nagy létszámokhoz 20-as vagy 50-es beosztás szükséges, különben lelógna a lapról.'
        },
        {
          id: 's3-4',
          text: 'Egy heti társasjáték pontszámai (a legtöbb pont: 8 pont)',
          categoryId: 'cat-scale-1',
          explanation: 'Kis értékek, 1-es beosztással a legkönnyebb felrajzolni.'
        },
        {
          id: 's3-5',
          text: 'A heti maximum hőmérséklet értékei 5. osztályban (15°C és 30°C között)',
          categoryId: 'cat-scale-5',
          explanation: 'Hőmérsékleti skálánál a leggyakoribb és legáttekinthetőbb az 5°C-os beosztás.'
        },
        {
          id: 's3-6',
          text: 'Egy városi állatkert napi látogatóinak száma a hétvégén (450 és 850 fő között)',
          categoryId: 'cat-scale-50',
          explanation: 'Több százas adatokhoz 50-es vagy 100-as skálabeosztás kell.'
        },
        {
          id: 's3-7',
          text: 'Egy diák által a hét napjain elolvasott könyvfejezetek száma (naponta 1–4 fejezet)',
          categoryId: 'cat-scale-1',
          explanation: '1-es lépésköz.'
        },
        {
          id: 's3-8',
          text: 'Egy könyvesbolt eladott könyveinek száma műfajok szerint (műfajonként 150–350 db)',
          categoryId: 'cat-scale-50',
          explanation: 'Százas nagyságrendű adatok.'
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
