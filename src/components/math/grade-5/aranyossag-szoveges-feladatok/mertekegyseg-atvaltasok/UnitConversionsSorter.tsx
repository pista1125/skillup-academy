import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface UnitConversionsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const UnitConversionsSorter: React.FC<UnitConversionsSorterProps> = ({
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
    // 1. SZINT: MELYIK MENNYISÉGCSALÁDHOZ TARTOZIK?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-length',
          name: 'Hosszúság mértékegységei',
          description: 'Távolságok, magasság, szélesség mérése (mm, cm, dm, m, km)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-mass',
          name: 'Tömeg mértékegységei',
          description: 'Anyagmennyiség, testtömeg, bolti áruk mérése (mg, g, dkg, kg, q, t)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-capacity-time',
          name: 'Űrtartalom és Idő egységei',
          description: 'Folyadékok térfogata (ml, dl, l, hl) és időtartamok (s, min, h, nap)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Milliméter (mm) és Kilométer (km)',
          categoryId: 'cat-length',
          explanation: 'Mindkettő a hosszúság és távolság mértékegysége.'
        },
        {
          id: 's1-2',
          text: 'Dekagramm (dkg) és Mázsa (q)',
          categoryId: 'cat-mass',
          explanation: 'A tömeg kifejezésére szolgálnak (100 dkg = 1 kg, 100 kg = 1 q).'
        },
        {
          id: 's1-3',
          text: 'Hektoliter (hl) és Deciliter (dl)',
          categoryId: 'cat-capacity-time',
          explanation: 'Folyadékok űrtartalmának egységei.'
        },
        {
          id: 's1-4',
          text: 'Másodperc (s) és Negyed óra',
          categoryId: 'cat-capacity-time',
          explanation: 'Időtartamok mérésére használjuk.'
        },
        {
          id: 's1-5',
          text: 'Tonna (t) és Milligramm (mg)',
          categoryId: 'cat-mass',
          explanation: 'A legnehezebb járművektől a porszemnyi tömegekig.'
        },
        {
          id: 's1-6',
          text: 'Deciméter (dm) és Centiméter (cm)',
          categoryId: 'cat-length',
          explanation: 'A vonalzón található hosszegységek.'
        },
        {
          id: 's1-7',
          text: 'Köbdeciméterben kifejezett Liter (l)',
          categoryId: 'cat-capacity-time',
          explanation: '1 liter pontosan 1 dm³ folyadék űrtartalma.'
        },
        {
          id: 's1-8',
          text: 'Gramm (g) és Kilogramm (kg)',
          categoryId: 'cat-mass',
          explanation: 'A tömeg SI alapegysége és ezredrésze.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZORZÁS VAGY OSZTÁS A VÁLTÁSKOR?
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-multiply',
          name: 'Nagyobból kisebbe: SZORZÁS',
          description: 'A mértékegység kisebb lesz, így a mérőszám megnő (pl. m → cm, kg → g)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-divide',
          name: 'Kisebből nagyobba: OSZTÁS',
          description: 'A mértékegység nagyobb lesz, így a mérőszám lecsökken (pl. mm → m, ml → l)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-sixty',
          name: '60-as alapú időváltás',
          description: 'Óra, perc és másodperc közötti 60-as szorzás vagy osztás',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Méterből centiméterbe (m → cm)',
          categoryId: 'cat-multiply',
          explanation: 'Nagyobból kisebbe váltunk: szorzás 100-zal.'
        },
        {
          id: 's2-2',
          text: 'Grammból kilogrammba (g → kg)',
          categoryId: 'cat-divide',
          explanation: 'Kisebből nagyobba váltunk: osztás 1000-rel.'
        },
        {
          id: 's2-3',
          text: 'Órából percre váltás (h → min)',
          categoryId: 'cat-sixty',
          explanation: 'Időmérték: szorzás 60-nal.'
        },
        {
          id: 's2-4',
          text: 'Milliliterből literbe (ml → l)',
          categoryId: 'cat-divide',
          explanation: 'Kisebből nagyobba váltunk: osztás 1000-rel.'
        },
        {
          id: 's2-5',
          text: 'Kilogrammból dekagrammba (kg → dkg)',
          categoryId: 'cat-multiply',
          explanation: 'Nagyobból kisebbe: szorzás 100-zal.'
        },
        {
          id: 's2-6',
          text: 'Másodpercből percre váltás (s → min)',
          categoryId: 'cat-sixty',
          explanation: 'Időmérték: osztás 60-nal.'
        },
        {
          id: 's2-7',
          text: 'Kilométerből méterbe (km → m)',
          categoryId: 'cat-multiply',
          explanation: 'Nagyobból kisebbe: szorzás 1000-rel.'
        },
        {
          id: 's2-8',
          text: 'Centiméterből méterbe (cm → m)',
          categoryId: 'cat-divide',
          explanation: 'Kisebből nagyobba: osztás 100-zal.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MENNYISÉGEK NAGYSÁGA AZ EGYSÉGHEZ (1 kg, 1 m, 1 l, 1 h) KÉPEST
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-less',
          name: 'Kisebb mint 1 alapegység (< 1)',
          description: 'Kevesebb mint 1 kg, 1 méter, 1 liter vagy 1 óra',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-equal',
          name: 'Pontosan 1 alapegység (= 1)',
          description: 'Hajszálpontosan megegyezik 1 kg-mal, 1 méterrel, 1 literrel vagy 1 órával',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-more',
          name: 'Nagyobb mint 1 alapegység (> 1)',
          description: 'Több mint 1 kg, 1 méter, 1 liter vagy 1 óra',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '750 gramm (tömeg)',
          categoryId: 'cat-less',
          explanation: '750 g = 0,75 kg, ami kevesebb mint 1 kg.'
        },
        {
          id: 's3-2',
          text: '100 centiméter (hossz)',
          categoryId: 'cat-equal',
          explanation: '100 cm = pontosan 1 méter.'
        },
        {
          id: 's3-3',
          text: '150 dekagramm (tömeg)',
          categoryId: 'cat-more',
          explanation: '150 dkg = 1,5 kg, ami több mint 1 kg.'
        },
        {
          id: 's3-4',
          text: '45 perc (idő)',
          categoryId: 'cat-less',
          explanation: '45 perc = 3/4 óra, kevesebb mint 1 egész óra (60 perc).'
        },
        {
          id: 's3-5',
          text: '10 deciliter (űrtartalom)',
          categoryId: 'cat-equal',
          explanation: '10 dl = pontosan 1 liter.'
        },
        {
          id: 's3-6',
          text: '1200 milliméter (hossz)',
          categoryId: 'cat-more',
          explanation: '1200 mm = 1,2 méter, ami több mint 1 méter.'
        },
        {
          id: 's3-7',
          text: '3600 másodperc (idő)',
          categoryId: 'cat-equal',
          explanation: '3600 másodperc = pontosan 1 óra (60 · 60 s).'
        },
        {
          id: 's3-8',
          text: '12 deciliter gyümölcslé (űrtartalom)',
          categoryId: 'cat-more',
          explanation: '12 dl = 1,2 liter, ami több mint 1 liter.'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <SorterTemplate
      title="Mértékegység Csoportosító"
      subtitle="Húzd vagy kattintással helyezd az elemeket a megfelelő kategóriába!"
      categories={currentConfig.categories}
      items={currentConfig.items}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onComplete={onNextLevel}
      level={currentLevel}
      onLevelChange={(lvl) => setCurrentLevel(lvl)}
      onOpenRules={onOpenRules}
    />
  );
};
