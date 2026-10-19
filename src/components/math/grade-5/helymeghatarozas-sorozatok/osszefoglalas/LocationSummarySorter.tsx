import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LocationSummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LocationSummarySorter: React.FC<LocationSummarySorterProps> = ({
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
    // 1. SZINT: FEJEZETI TÉMAKÖRÖK SZERINTI CSOPORTOSÍTÁS
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-coord',
          name: 'Koordináta-rendszer és Tájékozódás',
          description: 'Origó, tengelyek, pontpárok és síknegyedek',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-patterns',
          name: 'Díszítősorok és Mintázatok',
          description: 'Ismétlődő motívumok, eltolás, tükrözés és periódus',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-sequences',
          name: 'Számgépek és Számsorozatok',
          description: 'Bemenet-kimenet szabályok, számtani és nevezetes sorozatok',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Origó O(0; 0)',
          categoryId: 'cat-coord',
          explanation: 'A koordináta-rendszer középpontja.'
        },
        {
          id: 's1-2',
          text: 'Rendezett számpár: P(x; y)',
          categoryId: 'cat-coord',
          explanation: 'Pont helyzete a síkban.'
        },
        {
          id: 's1-3',
          text: 'x és y koordináta-tengelyek metszéspontja',
          categoryId: 'cat-coord',
          explanation: 'A derékszögű koordináta-rendszer alapja.'
        },
        {
          id: 's1-4',
          text: 'I., II., III. és IV. síknegyed',
          categoryId: 'cat-coord',
          explanation: 'A sík felosztása a tengelyek által.'
        },
        {
          id: 's1-5',
          text: 'Ismétlődő motívum (alapszakasz)',
          categoryId: 'cat-patterns',
          explanation: 'A díszítősor alapegysége.'
        },
        {
          id: 's1-6',
          text: 'Eltolásos ritmus a sormintában',
          categoryId: 'cat-patterns',
          explanation: 'Geometriai transzláció.'
        },
        {
          id: 's1-7',
          text: 'Tengelyes tükrözés a mintázatban',
          categoryId: 'cat-patterns',
          explanation: 'Szimmetrikus díszítés.'
        },
        {
          id: 's1-8',
          text: 'Sorminta periódushossza',
          categoryId: 'cat-patterns',
          explanation: 'Hány elem után kezdődik újra a minta.'
        },
        {
          id: 's1-9',
          text: 'Bemenet (x) és kimenet (y) értéktáblázata',
          categoryId: 'cat-sequences',
          explanation: 'Számgép modell.'
        },
        {
          id: 's1-10',
          text: 'Állandó különbségű számtani sorozat',
          categoryId: 'cat-sequences',
          explanation: 'Lépésközös sorozatok.'
        },
        {
          id: 's1-11',
          text: 'Négyzetszámok és háromszögszámok',
          categoryId: 'cat-sequences',
          explanation: 'Alakzatszámok.'
        },
        {
          id: 's1-12',
          text: 'Fibonacci-sorozat: 1, 1, 2, 3, 5, 8...',
          categoryId: 'cat-sequences',
          explanation: 'A természet híres rekurzív sorozata.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: MATEMATIKAI KIJELENTÉSEK IGAZSÁGTARTALMA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-true',
          name: 'Mindig IGAZ állítások',
          description: 'Matematikai tények és érvényes törvényszerűségek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-false',
          name: 'Mindig HAMIS kijelentések',
          description: 'Tipikus csapdák és téves félreértések',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-depends',
          name: 'A konkrét feladattól FÜGGŐ állítások',
          description: 'Lehet igaz is, hamis is a paraméterektől függően',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Az origó koordinátái O(0; 0)',
          categoryId: 'cat-true',
          explanation: 'Alapvető tény.'
        },
        {
          id: 's2-2',
          text: 'Két szomszédos háromszögszám összege négyzetszám',
          categoryId: 'cat-true',
          explanation: 'Pl. 3 + 6 = 9 = 3².'
        },
        {
          id: 's2-3',
          text: 'Az első n darab páratlan szám összege = n²',
          categoryId: 'cat-true',
          explanation: 'Pl. 1 + 3 + 5 = 9 = 3².'
        },
        {
          id: 's2-4',
          text: 'A Fibonacci-sorozatban minden tag az előző kettő összege',
          categoryId: 'cat-true',
          explanation: 'A sorozat definíciója.'
        },
        {
          id: 's2-5',
          text: 'A P(2; 5) és P(5; 2) ugyanazt a pontot jelöli',
          categoryId: 'cat-false',
          explanation: 'A számpár rendezett! Nem ugyanaz a pont.'
        },
        {
          id: 's2-6',
          text: 'Az x-tengelyen lévő pontok x-koordinátája mindig 0',
          categoryId: 'cat-false',
          explanation: 'Hamis, az y koordinátájuk 0!'
        },
        {
          id: 's2-7',
          text: 'A négyzetszámok sorozatának lépésköze állandó',
          categoryId: 'cat-false',
          explanation: 'Hamis, a lépésközök nőnek (+3, +5, +7...).'
        },
        {
          id: 's2-8',
          text: 'A 15 egy négyzetszám',
          categoryId: 'cat-false',
          explanation: 'Nincs olyan egész szám, amelynek négyzete 15.'
        },
        {
          id: 's2-9',
          text: 'Egy számsorozat monoton növekvő',
          categoryId: 'cat-depends',
          explanation: 'Vannak csökkenő és váltakozó sorozatok is.'
        },
        {
          id: 's2-10',
          text: 'A sorminta 100. eleme megegyezik a legelső elemmel',
          categoryId: 'cat-depends',
          explanation: 'A periódus hosszától függ (100 mod p).'
        },
        {
          id: 's2-11',
          text: 'A számgép kimenete nagyobb mint a bemenete',
          categoryId: 'cat-depends',
          explanation: 'Kivonás vagy osztás esetén kisebb is lehet.'
        },
        {
          id: 's2-12',
          text: 'Egy tetszőleges pont az I. síknegyedbe esik',
          categoryId: 'cat-depends',
          explanation: 'Bármelyik másik negyedbe vagy tengelyre is eshet.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MEGOLDÁSI MÓDSZEREK ÉS ESZKÖZTÁR
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-geom-read',
          name: 'Geometriai és vizuális leolvasás',
          description: 'Ábrák, tengelyek, lépések számlálása és rácsháló',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-algebra',
          name: 'Algebrai számítás és egyenlet',
          description: 'Képletek, szorzás, inverz műveletek és maradékos osztás',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-nature-app',
          name: 'Természeti és valós világbeli megfigyelés',
          description: 'Növények, virágszirmok, játékok és térképi tájékozódás',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Rácshálón mért lépésszám (Manhattan-távolság)',
          categoryId: 'cat-geom-read',
          explanation: 'Vízszintes és függőleges távolság összege.'
        },
        {
          id: 's3-2',
          text: 'Pont koordinátáinak leolvasása a síkról',
          categoryId: 'cat-geom-read',
          explanation: 'Vetítés az x és y tengelyre.'
        },
        {
          id: 's3-3',
          text: 'Sorminta szimmetriatengelyének észlelése',
          categoryId: 'cat-geom-read',
          explanation: 'Tükrözési tengely vizuális azonosítása.'
        },
        {
          id: 's3-4',
          text: 'Pöttyrács alakzatok (négyzet/háromszög) rajzolása',
          categoryId: 'cat-geom-read',
          explanation: 'Alakzatszámok geometriája.'
        },
        {
          id: 's3-5',
          text: 'y = a · x + b számgép kimenet kiszámítása',
          categoryId: 'cat-algebra',
          explanation: 'Képletbe való behelyettesítés.'
        },
        {
          id: 's3-6',
          text: 'Inverz művelet végrehajtása visszafelé',
          categoryId: 'cat-algebra',
          explanation: 'Ellentétes műveletek ellentétes sorrendben.'
        },
        {
          id: 's3-7',
          text: 'Sorozat n-edik tagjának képlete: a₁ + (n - 1)d',
          categoryId: 'cat-algebra',
          explanation: 'Általános tag algebrai levezetése.'
        },
        {
          id: 's3-8',
          text: 'Maradékos osztás a periódus hosszával',
          categoryId: 'cat-algebra',
          explanation: 'A 100. díszítőelem kiszámítása.'
        },
        {
          id: 's3-9',
          text: 'Napraforgó magtányér spiráljainak megfigyelése',
          categoryId: 'cat-nature-app',
          explanation: 'Fibonacci-számok a biológiában.'
        },
        {
          id: 's3-10',
          text: 'Fenyőtoboz pikkelyspiráljainak számlálása',
          categoryId: 'cat-nature-app',
          explanation: 'Botanikai Fibonacci-mintázat.'
        },
        {
          id: 's3-11',
          text: 'Virágszirmok száma és Fibonacci-sorozat',
          categoryId: 'cat-nature-app',
          explanation: '3, 5, 8, 13, 21 szirmú virágok.'
        },
        {
          id: 's3-12',
          text: 'Sakktábla mezőazonosítás és tájékozódás',
          categoryId: 'cat-nature-app',
          explanation: 'e4 mező, oszlop és sor koordináták a valóságban.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-summary-quiz"
      title="Fejezeti összefoglaló csoportosító"
      subtitle="Csoportosítsd a fejezet fogalmait témakör, igazságtartalom és megoldási módszer szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-location-summary-sorter"
      storageKey="g5-loc-summary-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
