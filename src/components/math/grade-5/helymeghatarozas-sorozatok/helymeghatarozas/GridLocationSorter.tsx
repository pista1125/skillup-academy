import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GridLocationSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const GridLocationSorter: React.FC<GridLocationSorterProps> = ({
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
    // 1. SZINT: RÁCSHÁLÓS RENDSZEREK MEZŐI
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-chess',
          name: 'Sakktábla mezők (a-h, 1-8)',
          description: 'A nemzetközi sakkban használt kisbetűs oszlopok és számozott sorok',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-torpedo',
          name: 'Torpedó játéktábla cellák',
          description: 'A klasszikus csatahajó játékban használt nagybetűs oszlopok (A-J) és sorszámok (1-10)',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-excel',
          name: 'Táblázatkezelő (Excel) kifejezések',
          description: 'Számítógépes táblázatokban használt cellahivatkozások, tartományok és képletek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'e4 és d4 mezők',
          categoryId: 'cat-chess',
          explanation: 'A sakkban a kisbetűvel jelölt király- és vezérgyalog központi kezdőmezői.'
        },
        {
          id: 's1-2',
          text: '„Lövés a B4-es mezőre!”',
          categoryId: 'cat-torpedo',
          explanation: 'A torpedóban a célpont koordinátájának bemondása.'
        },
        {
          id: 's1-3',
          text: '=SUM(A1:A10) képlet',
          categoryId: 'cat-excel',
          explanation: 'A táblázatkezelőben egy cellatartomány összeadását végző függvény.'
        },
        {
          id: 's1-4',
          text: 'h8 sarokmező (fekete bástya kiindulópontja)',
          categoryId: 'cat-chess',
          explanation: 'A sakktábla jobb felső sarka.'
        },
        {
          id: 's1-5',
          text: 'J10 koordináta a 10×10-es tengeri táblán',
          categoryId: 'cat-torpedo',
          explanation: 'A torpedójáték jobb alsó sarki mezője.'
        },
        {
          id: 's1-6',
          text: 'B2:D6 cellatartomány kijelölése',
          categoryId: 'cat-excel',
          explanation: 'Több sorból és oszlopból álló téglalap alakú adattartomány az Excelben.'
        },
        {
          id: 's1-7',
          text: 'c6 és f3 mezők (a huszár kedvenc lépései)',
          categoryId: 'cat-chess',
          explanation: 'A sakktáblán a huszár (ló) jellegzetes L-alakú ugrási célpontjai.'
        },
        {
          id: 's1-8',
          text: 'Egy 3-as hadihajó: C2, C3, C4 mezőkön',
          categoryId: 'cat-torpedo',
          explanation: 'Hajóelhelyezés a torpedó négyzethálóján egy oszlopban.'
        },
        {
          id: 's1-9',
          text: 'A1 cella az Excel munkalap bal felső sarkában',
          categoryId: 'cat-excel',
          explanation: 'Minden elektronikus táblázat legelső, kezdő cellája.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: MOZGÁSIRÁNY A RÁCSHÁLÓN
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-horiz',
          name: 'Csak vízszintes elmozdulás (↔)',
          description: 'A sor száma változatlan marad, csak az oszlop azonosítója módosul balra vagy jobbra',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-vert',
          name: 'Csak függőleges elmozdulás (↕)',
          description: 'Az oszlop azonosítója változatlan marad, csak a sor száma módosul fel vagy le',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-diag',
          name: 'Átlós vagy vegyes elmozdulás (↗ ↘)',
          description: 'Egyszerre változik az oszlop és a sor száma is (mindkét koordináta módosul)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'b4 mezőről az e4 mezőre lépés',
          categoryId: 'cat-horiz',
          explanation: 'A 4. sorban maradunk, az oszlop b-ről e-re vált jobbra (vízszintes).'
        },
        {
          id: 's2-2',
          text: 'c2 mezőről a c7 mezőre lépés',
          categoryId: 'cat-vert',
          explanation: 'A c oszlopban maradunk, a sor 2-ről 7-re ugrik felfelé (függőleges).'
        },
        {
          id: 's2-3',
          text: 'b2 mezőről a d4 mezőre lépés a sakkfutóval',
          categoryId: 'cat-diag',
          explanation: 'Az oszlop b-ről d-re (2 lépés), a sor 2-ről 4-re (2 lépés) nőtt egyszerre (átlós).'
        },
        {
          id: 's2-4',
          text: 'Utasítás: 3 lépés jobbra (→ 3)',
          categoryId: 'cat-horiz',
          explanation: 'Tiszta vízszintes irányú kelet felé lépés.'
        },
        {
          id: 's2-5',
          text: 'Utasítás: 4 lépés lefelé (↓ 4)',
          categoryId: 'cat-vert',
          explanation: 'Tiszta függőleges irányú dél felé lépés.'
        },
        {
          id: 's2-6',
          text: 'Utasítás: 2 lépés jobbra és 1 lépés fel (a sakkhuszár ugrása)',
          categoryId: 'cat-diag',
          explanation: 'Vegyes összetett elmozdulás mindkét koordinátatengely mentén.'
        },
        {
          id: 's2-7',
          text: 'Bástya mozgása az a1 mezőről a h1 mezőre',
          categoryId: 'cat-horiz',
          explanation: 'Az 1. sor mentén végigsuhanó vízszintes mozgás.'
        },
        {
          id: 's2-8',
          text: 'Gyalog egyenes előrelépése az e2-ről az e4-re',
          categoryId: 'cat-vert',
          explanation: 'Egy oszlopon belüli függőleges előrehaladás.'
        },
        {
          id: 's2-9',
          text: 'Gyalog átlós ütése az e4-ről az f5 mezőre',
          categoryId: 'cat-diag',
          explanation: 'Átlósan egy mezőt lép jobbra-fel.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: RÁCSMEZŐK GEOMETRIAI VISZONYA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-same-col',
          name: 'Azonos oszlopban lévő mezők',
          description: 'A betű megegyezik, a szám különböző: egy függőleges vonalon fekszenek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-same-row',
          name: 'Azonos sorban lévő mezők',
          description: 'A szám megegyezik, a betű különböző: egy vízszintes vonalon fekszenek',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-same-diag',
          name: 'Átlósan egy vonalban lévő mezők',
          description: 'A sor- és oszloptávolságuk megegyezik, 45 fokos egyenesre illeszkednek',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'a2 és a7 mezők a sakktáblán',
          categoryId: 'cat-same-col',
          explanation: 'Mindkettő az „a” oszlopban található (függőleges oszlop).'
        },
        {
          id: 's3-2',
          text: 'b4 és f4 mezők a sakktáblán',
          categoryId: 'cat-same-row',
          explanation: 'Mindkettő a 4. sorban fekszik (vízszintes sor).'
        },
        {
          id: 's3-3',
          text: 'a1 és h8 sarokmezők',
          categoryId: 'cat-same-diag',
          explanation: 'A leghosszabb főátló két végpontja (7 lépés jobbra és 7 lépés fel).'
        },
        {
          id: 's3-4',
          text: 'C3 és C9 cellák a táblázatban',
          categoryId: 'cat-same-col',
          explanation: 'Mindkét cella a „C” oszlopban van.'
        },
        {
          id: 's3-5',
          text: 'A5 és H5 cellák a táblázatban',
          categoryId: 'cat-same-row',
          explanation: 'Mindkét cella az 5. sorban van.'
        },
        {
          id: 's3-6',
          text: 'c3 és e5 mezők a sakktáblán',
          categoryId: 'cat-same-diag',
          explanation: '2 oszlop jobbra és 2 sor fel: átlósan szomszédosak a fehér futó útvonalán.'
        },
        {
          id: 's3-7',
          text: 'e1 (világos király) és e8 (sötét király) kiinduló helye',
          categoryId: 'cat-same-col',
          explanation: 'Mindkét király az „e” oszlop két végén áll egymással szemben.'
        },
        {
          id: 's3-8',
          text: 'a1, b1, c1, d1, e1 mezők (a világos tisztjeinek sora)',
          categoryId: 'cat-same-row',
          explanation: 'Valamennyi az 1. sorban helyezkedik el.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-grid-quiz"
      title="Rácsháló és Koordináták Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a kifejezéseket a megfelelő kategóriába!"
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
