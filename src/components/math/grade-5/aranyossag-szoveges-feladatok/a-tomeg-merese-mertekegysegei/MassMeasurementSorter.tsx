import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface MassMeasurementSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const MassMeasurementSorter: React.FC<MassMeasurementSorterProps> = ({
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
    // 1. SZINT: MILYEN EGYSÉGBEN ÉRDEMES MEGADNI?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-small',
          name: 'Milligramm és Gramm (mg, g)',
          description: 'Nagyon apró, pehelykönnyű tárgyak, apró ékszerek és fűszerek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-kitchen',
          name: 'Dekagramm és Kilogramm (dkg, kg)',
          description: 'Élelmiszerek, bevásárlás, konyha és emberi testtömeg',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-heavy',
          name: 'Mázsa és Tonna (q, t)',
          description: 'Nagy terhek, járművek, termények és ipari szállítmányok',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy gombostű vagy egy bélyeg tömege',
          categoryId: 'cat-small',
          explanation: 'Néhány milligramm vagy gramm törtrésze.'
        },
        {
          id: 's1-2',
          text: 'Fél kiló fehér kenyér és 20 dkg trappista sajt',
          categoryId: 'cat-kitchen',
          explanation: 'A mindennapi élelmiszerboltban dkg-ban és kg-ban mérünk.'
        },
        {
          id: 's1-3',
          text: 'Egy családi személygépkocsi öntömege',
          categoryId: 'cat-heavy',
          explanation: 'Körülbelül 1,3–1,5 tonna (13–15 mázsa).'
        },
        {
          id: 's1-4',
          text: 'Egy 100 Ft-os érme vagy egy szem szőlő',
          categoryId: 'cat-small',
          explanation: 'Körülbelül 5–8 gramm.'
        },
        {
          id: 's1-5',
          text: 'Egy 5. osztályos tanuló testtömege',
          categoryId: 'cat-kitchen',
          explanation: 'Átlagosan 35–45 kg.'
        },
        {
          id: 's1-6',
          text: 'Vasúti tehervagon rakománya kaviccsal',
          categoryId: 'cat-heavy',
          explanation: 'Több tíz tonna (t) tömegű rakomány.'
        },
        {
          id: 's1-7',
          text: 'Egy fejfájáscsillapító tabletta hatóanyaga (pl. 500 mg)',
          categoryId: 'cat-small',
          explanation: 'A gyógyszerek hatóanyagát mindig milligrammban (mg) adják meg.'
        },
        {
          id: 's1-8',
          text: 'Téli tüzelő fa kiszállítása teherautóval (30 q)',
          categoryId: 'cat-heavy',
          explanation: 'Mázsában (q) vagy tonnában (t) számoljuk a fa- és szénszállítmányokat.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TÖMEG NAGYSÁGRENDI BESOROLÁS
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-under1kg',
          name: '1 kg-nál kisebb tömeg',
          description: 'Kevesebb, mint 100 dkg (vagy 1000 gramm)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-1to50kg',
          name: '1 kg és 50 kg közötti tömeg',
          description: 'Hordozható gépek, iskolatáska, háziállatok és bútorok',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-over50kg',
          name: '50 kg-nál nehezebb tömeg',
          description: 'Felnőtt emberek, nagyvadak, autók és nehézgépek',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Egy tábla mogyorós csokoládé (100 g)',
          categoryId: 'cat-under1kg',
          explanation: '100 g = 10 dkg, ami jóval 1 kg alatt van.'
        },
        {
          id: 's2-2',
          text: 'Egy jól megrakott iskolatáska (kb. 5 kg)',
          categoryId: 'cat-1to50kg',
          explanation: '1 és 50 kg közé esik.'
        },
        {
          id: 's2-3',
          text: 'Egy felnőtt hím afrikai oroszlán (kb. 190 kg)',
          categoryId: 'cat-over50kg',
          explanation: 'Bőven 50 kg feletti ragadozó.'
        },
        {
          id: 's2-4',
          text: 'Egy szem mogyoró vagy mandula (kb. 2 g)',
          categoryId: 'cat-under1kg',
          explanation: 'Nagyon kicsi tömeg, messze 1 kg alatt.'
        },
        {
          id: 's2-5',
          text: 'Egy mikrohullámú sütő (kb. 12 kg)',
          categoryId: 'cat-1to50kg',
          explanation: 'Közepes méretű háztartási gép, 12 kg.'
        },
        {
          id: 's2-6',
          text: 'Egy pianínó / hangversenyzongora (kb. 250 kg)',
          categoryId: 'cat-over50kg',
          explanation: 'Nagyon nehéz hangszer, több mázsa.'
        },
        {
          id: 's2-7',
          text: 'Egy okostelefon tokkal együtt (kb. 220 g)',
          categoryId: 'cat-under1kg',
          explanation: '22 dkg, kevesebb mint negyed kilogramm.'
        },
        {
          id: 's2-8',
          text: 'Egy felnőtt kerékpár (kb. 14 kg)',
          categoryId: 'cat-1to50kg',
          explanation: '1 és 50 kg közé eső tárgy.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: NETTÓ, TÁRA VAGY BRUTTÓ?
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-net',
          name: 'Nettó áru (tiszta termék)',
          description: 'A termék önmagában, csomagolás nélkül (ezért fizetünk)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-tare',
          name: 'Tára (üres csomagolóeszköz)',
          description: 'Üres rekesz, kartondoboz, üres üveg vagy raklap',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-gross',
          name: 'Bruttó tömeg (össztömeg)',
          description: 'Az áru és a csomagolás együttes tömege mérve',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'A befőttesüvegben lévő házi eperlekvár',
          categoryId: 'cat-net',
          explanation: 'A lekvár maga a tiszta áru (nettó).'
        },
        {
          id: 's3-2',
          text: 'Az üres zöldséges fa rekesz (2 kg)',
          categoryId: 'cat-tare',
          explanation: 'A csomagolóeszköz üres tömege a tára.'
        },
        {
          id: 's3-3',
          text: 'A teherautó a hídmérlegre hajtva a rakománnyal együtt',
          categoryId: 'cat-gross',
          explanation: 'Az autó és a rakomány együttes tömege a bruttó.'
        },
        {
          id: 's3-4',
          text: 'A bonbonos doboz kartonja és műanyag tálcája',
          categoryId: 'cat-tare',
          explanation: 'A csomagolás tartozik a tára kategóriába.'
        },
        {
          id: 's3-5',
          text: 'A dobozban lévő 24 darab mogyorós bonbon',
          categoryId: 'cat-net',
          explanation: 'A finom édesség a nettó tömeg.'
        },
        {
          id: 's3-6',
          text: 'A lezárt, teli joghurtos pohár a mérlegre téve',
          categoryId: 'cat-gross',
          explanation: 'Pohár + joghurt együtt a bruttó tömeg.'
        },
        {
          id: 's3-7',
          text: 'Az üres raklap, amelyre a téglákat pakolják (25 kg)',
          categoryId: 'cat-tare',
          explanation: 'A raklap csomagoló-/szállítóeszköz, tehát tára.'
        },
        {
          id: 's3-8',
          text: 'A 25 kg-os zsák cement a zsákkal együtt lemérve',
          categoryId: 'cat-gross',
          explanation: 'Zsák + cement együtt a bruttó.'
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
