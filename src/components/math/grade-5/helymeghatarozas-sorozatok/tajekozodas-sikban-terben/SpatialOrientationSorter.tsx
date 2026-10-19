import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SpatialOrientationSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SpatialOrientationSorter: React.FC<SpatialOrientationSorterProps> = ({
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
    // 1. SZINT: DIMENZIÓK SZERINTI CSOPORTOSÍTÁS
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-1d',
          name: '1 Dimenzió (1 adat: vonal / skála)',
          description: 'Egyetlen számegyenes vagy szakasz mentén történő tájékozódás',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-2d',
          name: '2 Dimenzió (2 adat: sík felület)',
          description: 'Két egymásra merőleges irány (szélesség és magasság a síkban)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-3d',
          name: '3 Dimenzió (3 adat: valós tér)',
          description: 'Három független irány: szélesség, hosszúság és függőleges magasság',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Hőmérő skálája (-5 °C)',
          categoryId: 'cat-1d',
          explanation: 'Egyetlen skálán mozgó higanyszál &rarr; 1 dimenzió.'
        },
        {
          id: 's1-2',
          text: 'Kilométerkő az autópályán',
          categoryId: 'cat-1d',
          explanation: 'Az út mentén megtett távolságot 1 szám jelzi &rarr; 1D.'
        },
        {
          id: 's1-3',
          text: 'Vonalzó számozott beosztása',
          categoryId: 'cat-1d',
          explanation: 'Egyenes menti távolságmérés 1 koordinátával.'
        },
        {
          id: 's1-4',
          text: 'Házszám egy egyenes utcában',
          categoryId: 'cat-1d',
          explanation: 'Az utca vonalán való sorszám 1 adat.'
        },
        {
          id: 's1-5',
          text: 'Sakktábla mezője (e4)',
          categoryId: 'cat-2d',
          explanation: 'Oszlop (betű) és sor (szám) metszete síkban &rarr; 2D.'
        },
        {
          id: 's1-6',
          text: 'Papírlapra rajzolt koordináták (x; y)',
          categoryId: 'cat-2d',
          explanation: 'A papír felülete kétdimenziós sík.'
        },
        {
          id: 's1-7',
          text: 'Okostelefon érintőképernyője',
          categoryId: 'cat-2d',
          explanation: 'Képernyő pixelei: vízszintes és függőleges pozíció.'
        },
        {
          id: 's1-8',
          text: 'Várostérkép utcahálózata',
          categoryId: 'cat-2d',
          explanation: 'Sík térképen való keresés két tengely szerint.'
        },
        {
          id: 's1-9',
          text: 'Repülőgép helyzete a légtérben',
          categoryId: 'cat-3d',
          explanation: 'Földrajzi szélesség, hosszúság és repülési magasság (3D).'
        },
        {
          id: 's1-10',
          text: 'Többszintes épületben szoba helye',
          categoryId: 'cat-3d',
          explanation: 'Folyosó, szobaszám és az emelet száma &rarr; 3 adat.'
        },
        {
          id: 's1-11',
          text: 'Tengerben úszó tengeralattjáró',
          categoryId: 'cat-3d',
          explanation: 'Földrajzi pozíció és a merülési mélység.'
        },
        {
          id: 's1-12',
          text: 'Minecraft blokk pozíciója (x; y; z)',
          categoryId: 'cat-3d',
          explanation: '3D koordináták a virtuális térben.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: FÖLDRAJZI FOKHÁLÓZAT KATEGÓRIÁI
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-latitude',
          name: 'Szélességi körök (Észak / Dél)',
          description: 'Az Egyenlítővel párhuzamos körök, 0°-tól 90°-ig északra vagy délre',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-longitude',
          name: 'Hosszúsági körök / délkörök (Kelet / Nyugat)',
          description: 'A sarkokat összekötő félkörök, a Greenwich-i kezdő délkörhöz viszonyítva',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-altitude',
          name: 'Függőleges magassági adatok',
          description: 'A tengerszinthez viszonyított függőleges méterek (tengerszint felett/alatt)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Egyenlítő (0° szélesség)',
          categoryId: 'cat-latitude',
          explanation: 'A leghosszabb szélességi kör a Föld közepén.'
        },
        {
          id: 's2-2',
          text: 'Ráktérítő (É. sz. 23,5°)',
          categoryId: 'cat-latitude',
          explanation: 'Nevezetes északi szélességi kör.'
        },
        {
          id: 's2-3',
          text: 'Baktérítő (D. sz. 23,5°)',
          categoryId: 'cat-latitude',
          explanation: 'Nevezetes déli szélességi kör.'
        },
        {
          id: 's2-4',
          text: 'Északi-sark (É. sz. 90°)',
          categoryId: 'cat-latitude',
          explanation: 'A legészakibb szélességi pont.'
        },
        {
          id: 's2-5',
          text: 'Kezdő délkör Greenwichnél (0°)',
          categoryId: 'cat-longitude',
          explanation: 'A hosszúsági körök viszonyítási alapja London mellett.'
        },
        {
          id: 's2-6',
          text: 'Dátumválasztó vonal (180°)',
          categoryId: 'cat-longitude',
          explanation: 'A kezdő délkörrel pontosan szemközti hosszúsági kör.'
        },
        {
          id: 's2-7',
          text: 'Keleti hosszúság 19° (Budapest)',
          categoryId: 'cat-longitude',
          explanation: 'A kezdő délkörtől keletre mért hosszúsági fok.'
        },
        {
          id: 's2-8',
          text: 'Nyugati hosszúság 74° (New York)',
          categoryId: 'cat-longitude',
          explanation: 'A kezdő délkörtől nyugatra mért hosszúsági fok.'
        },
        {
          id: 's2-9',
          text: 'Kékes-tető csúcsa (1014 m)',
          categoryId: 'cat-altitude',
          explanation: 'Magyarország legmagasabb pontja tengerszint felett.'
        },
        {
          id: 's2-10',
          text: 'Mariana-árok mélysége (-11000 m)',
          categoryId: 'cat-altitude',
          explanation: 'A Föld legmélyebb óceáni árka a tengerszint alatt.'
        },
        {
          id: 's2-11',
          text: 'Repülőgép utazómagassága (10000 m)',
          categoryId: 'cat-altitude',
          explanation: 'A tengerszint feletti repülési magasság.'
        },
        {
          id: 's2-12',
          text: 'Tengerszint (0 m magasság)',
          categoryId: 'cat-altitude',
          explanation: 'A függőleges magasságmérés nulla szintje.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KOCKAÉPÍTMÉNYEK HÁROM NÉZETE
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-top',
          name: 'Felülnézetből látható (Alaprajz: x és y)',
          description: 'A test fentről nézve mutatja a rácsnégyzetek elhelyezkedését és az oszlopok alapját',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-front',
          name: 'Elölnézetből látható (Szemből: x és z)',
          description: 'Közvetlenül szemből nézve látjuk az oszlopok szélességét és maximális magasságát',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-side',
          name: 'Oldalnézetből látható (Oldalról: y és z)',
          description: 'Balról vagy jobbról nézve látjuk a sorok mélységét és a szintek magasságát',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Melyik rácsnégyzeten áll kocka a padlón',
          categoryId: 'cat-top',
          explanation: 'A felülnézet mutatja a padlón elfoglalt mezőket.'
        },
        {
          id: 's3-2',
          text: 'Oszlopok alaprajzi elrendezése fentről',
          categoryId: 'cat-top',
          explanation: 'Fentről látjuk a teljes alaprajzot.'
        },
        {
          id: 's3-3',
          text: 'A test teljes szélessége és mélysége fentről',
          categoryId: 'cat-top',
          explanation: 'Az x és y síkbeli kiterjedése.'
        },
        {
          id: 's3-4',
          text: 'Hány mezőből áll a talapzat területe',
          categoryId: 'cat-top',
          explanation: 'A felülnézetből látható kockák száma.'
        },
        {
          id: 's3-5',
          text: 'Oszlopok maximális magassága szemből',
          categoryId: 'cat-front',
          explanation: 'Elölnézetből a legmagasabb kockák szintje látszik.'
        },
        {
          id: 's3-6',
          text: 'A test szemből látható körvonala',
          categoryId: 'cat-front',
          explanation: 'Az elölnézet a szemből vetített képet adja.'
        },
        {
          id: 's3-7',
          text: 'Szélesség (x) és magasság (z) összefüggése',
          categoryId: 'cat-front',
          explanation: 'Az elölnézethez az x és z koordináták tartoznak.'
        },
        {
          id: 's3-8',
          text: 'Melyik függőleges oszlop a legmagasabb elölről',
          categoryId: 'cat-front',
          explanation: 'Szemből nézve látjuk a magasságokat.'
        },
        {
          id: 's3-9',
          text: 'A test mélysége elölről hátrafelé',
          categoryId: 'cat-side',
          explanation: 'Oldalról nézve látjuk az egymás mögötti sorokat.'
        },
        {
          id: 's3-10',
          text: 'Mélység (y) és magasság (z) összefüggése',
          categoryId: 'cat-side',
          explanation: 'Az oldalnézethez az y és z koordináták tartoznak.'
        },
        {
          id: 's3-11',
          text: 'Melyik sor takarja a mögötte lévőt oldalról',
          categoryId: 'cat-side',
          explanation: 'Oldalnézetnél az egymás mögötti szintek magassága dönt.'
        },
        {
          id: 's3-12',
          text: 'Balról vagy jobbról látható kockafal',
          categoryId: 'cat-side',
          explanation: 'Az oldalirányú vetület.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-spatial-quiz"
      title="Tájékozódás síkban és térben csoportosító"
      subtitle="Csoportosítsd a dimenziókat, a fokhálózat elemeit és a térbeli nézeteket!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-spatial-orientation-sorter"
      storageKey="g5-loc-spatial-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
