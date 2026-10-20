import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface TablesGraphsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const TablesGraphsSorter: React.FC<TablesGraphsSorterProps> = ({
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
    // 1. SZINT: MELYIK DIAGRAMTÍPUS A LEGJOBB VÁLASZTÁS?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-bar',
          name: 'Oszlopdiagram (Összehasonlítás)',
          description: 'Különböző különálló csoportok vagy kategóriák nagyságának összevetése',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-line',
          name: 'Vonaldiagram (Időbeli változás)',
          description: 'Folytonos folyamatok, időbeli tendenciák (hőmérséklet, sebesség, vízállás)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-pie',
          name: 'Kördiagram (Egy egész megoszlása)',
          description: 'A 100%-os egész részeinek és arányainak bemutatása',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Az 5.a osztály tanulóinak kedvenc sportágai (foci, kosár, úszás)',
          categoryId: 'cat-bar',
          explanation: 'Különböző kategóriák létszámainak összehasonlítására az oszlopdiagram a legalkalmasabb.'
        },
        {
          id: 's1-2',
          text: 'Egy lázas beteg testhőmérsékletének alakulása óránként a nap során',
          categoryId: 'cat-line',
          explanation: 'Időbeli folytonos folyamat, a láz emelkedését és csökkenését vonaldiagram ábrázolja legszemléletesebben.'
        },
        {
          id: 's1-3',
          text: 'Egy család havi fizetésének elosztása (lakbér, élelem, rezsi, megtakarítás)',
          categoryId: 'cat-pie',
          explanation: 'A teljes jövedelem (100%) részeinek és szeleteinek bemutatására a kördiagram a legjobb.'
        },
        {
          id: 's1-4',
          text: 'Egy iskolai diákönkormányzati választás szavazati arányai a jelöltek között',
          categoryId: 'cat-pie',
          explanation: 'Az összes leadott szavazat (100%) megoszlását kördiagrammal szoktuk szemléltetni.'
        },
        {
          id: 's1-5',
          text: 'A Duna vízállásának változása Budapestnél a hét 7 napján',
          categoryId: 'cat-line',
          explanation: 'Folytonos időbeli változás, az áradást és apadást vonallal kötjük össze.'
        },
        {
          id: 's1-6',
          text: 'A magyar olimpiai csapat által nyert érmek száma sportáganként',
          categoryId: 'cat-bar',
          explanation: 'Különálló sportágak éremszámainak összehasonlítása.'
        },
        {
          id: 's1-7',
          text: 'Egy gépkocsi sebességének alakulása a gyorsítás során 0-tól 100 km/h-ig',
          categoryId: 'cat-line',
          explanation: 'Folytonos időbeli növekedési folyamat.'
        },
        {
          id: 's1-8',
          text: 'A Föld felszínének megoszlása óceánok (71%) és szárazföldek (29%) között',
          categoryId: 'cat-pie',
          explanation: 'A teljes bolygófelszín (100%) két nagy részének aránya.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: VONALDIAGRAM SZAKASZAINAK JELENTÉSE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-up',
          name: 'Növekedés / Emelkedés (↗️)',
          description: 'A vonal balról jobbra felfelé tart, az érték növekszik',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-down',
          name: 'Csökkenés / Visszaesés (↘️)',
          description: 'A vonal balról jobbra lefelé lejt, az érték csökken',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-flat',
          name: 'Állandó / Változatlan (➡️)',
          description: 'A vonal vízszintes, az érték változatlan maradt',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'A levegő hőmérséklete reggel 8 órakor 12°C volt, délben pedig 22°C',
          categoryId: 'cat-up',
          explanation: '12°C-ról 22°C-ra emelkedett a hőmérséklet, a szakasz meredeken felfelé tart.'
        },
        {
          id: 's2-2',
          text: 'Az autó sebessége lakott területre érve 90 km/h-ról 50 km/h-ra lassult',
          categoryId: 'cat-down',
          explanation: 'A sebességérték csökkent, a vonal lefelé mutat.'
        },
        {
          id: 's2-3',
          text: 'A déli órákban (12 és 14 óra között) a hőmérséklet pontosan 25°C maradt',
          categoryId: 'cat-flat',
          explanation: 'Az érték nem változott, a vonaldiagram ezen a szakaszon vízszintes.'
        },
        {
          id: 's2-4',
          text: 'A perselyben gyűjtött pénz összege a zsebpénz berakásakor megnőtt',
          categoryId: 'cat-up',
          explanation: 'Növekedés történt.'
        },
        {
          id: 's2-5',
          text: 'A beteg láza a gyógyszer bevétele után 39°C-ról 37°C-ra csillapodott',
          categoryId: 'cat-down',
          explanation: 'A lázgörbe ezen szakasza lefelé lejt.'
        },
        {
          id: 's2-6',
          text: 'A vonat 20 percig állt az állomáson, a megtett távolság nem növekedett',
          categoryId: 'cat-flat',
          explanation: 'A mozgás szünetelt, az út-idő grafikon vízszintes szakaszt mutat.'
        },
        {
          id: 's2-7',
          text: 'A hegycsúcs felé túrázók tengerszint feletti magassága percről percre nő',
          categoryId: 'cat-up',
          explanation: 'A magassági vonal emelkedik.'
        },
        {
          id: 's2-8',
          text: 'Az okostelefon akkumulátorának töltöttsége videónézés közben 80%-ról 40%-ra esett',
          categoryId: 'cat-down',
          explanation: 'Az akkumulátor merülése csökkenő görbét eredményez.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KORREKT VS FÉLREVEZETŐ GRAFIKONOK
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-reliable',
          name: 'Korrekt és Megbízható Diagram',
          description: 'A matematikai szabályoknak megfelel, pontosan tükrözi a valóságot',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-misleading',
          name: 'Félrevezető / Manipulatív Diagram',
          description: 'Trükkös beállításokkal eltúlozza vagy elrejti a valós arányokat',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-faulty',
          name: 'Hibás / Értelmetlen Ábrázolás',
          description: 'Matematikai hibát tartalmaz, vagy hiányoznak az alapvető adatai',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'A függőleges tengely 0-ról indul, és a skálabeosztása egyenletes (pl. 5-ösével nő)',
          categoryId: 'cat-reliable',
          explanation: 'Ez a megbízható és pontos diagram alapkövetelménye.'
        },
        {
          id: 's3-2',
          text: 'A függőleges tengely 90-ről indul, így a 95 és 100 közötti apró eltérés kétszeresnek látszik',
          categoryId: 'cat-misleading',
          explanation: 'A levágott tengely manipulálja a néző szemét, eltúlozza a különbséget.'
        },
        {
          id: 's3-3',
          text: 'A kördiagram szeleteinek százalékos összege 130%-ot ad ki',
          categoryId: 'cat-faulty',
          explanation: 'Matematikai hiba: egy teljes kör soha nem lehet több vagy kevesebb, mint 100%!'
        },
        {
          id: 's3-4',
          text: 'Az oszlopok szélessége és a köztük lévő távolság minden kategóriánál teljesen azonos',
          categoryId: 'cat-reliable',
          explanation: 'Korrekt grafikon: csak a magasság változik a gyakorisággal arányosan.'
        },
        {
          id: 's3-5',
          text: '3D-s megdöntött kördiagram, ahol az elöl lévő 20%-os szelet nagyobbnak látszik a hátsó 40%-osnál',
          categoryId: 'cat-misleading',
          explanation: 'A térbeli torzítás vizuális trükk a szem becsapására.'
        },
        {
          id: 's3-6',
          text: 'A tengelyeken nincsenek számok és hiányzik a mértékegység megnevezése is',
          categoryId: 'cat-faulty',
          explanation: 'Adatok és skála nélkül a grafikon használhatatlan és értelmetlen.'
        },
        {
          id: 's3-7',
          text: 'A kördiagram körcikkeinek szögeit szögmérővel mérve pontosan 360°-ot kapunk',
          categoryId: 'cat-reliable',
          explanation: 'Korrekt szerkesztés: a 360° pontosan az 1 egésznek felel meg.'
        },
        {
          id: 's3-8',
          text: 'A tengely beosztása egyenetlen: 0, 10, 20 után hirtelen 100 és 500 következik ugyanakkora távolságra',
          categoryId: 'cat-misleading',
          explanation: 'A nem egyenletes beosztás eltorzítja az adatok valóságos görbéjét.'
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
