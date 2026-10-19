import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CapacityMeasurementSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const CapacityMeasurementSorter: React.FC<CapacityMeasurementSorterProps> = ({
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
          name: 'Milliliter és Centiliter (ml, cl)',
          description: 'Kis adagok: orvosságok, szirupok, illatszerek és fűszerolajok',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-kitchen',
          name: 'Deciliter és Liter (dl, l)',
          description: 'Konyha, bolti italok, levesek, háztartási vödrök és kannák',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-large',
          name: 'Hektoliter és Köbméter (hl, m³)',
          description: 'Hordók, tartálykocsik, kerti medencék és víztározók',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy teáskanál köhögés elleni szirup (5 ml)',
          categoryId: 'cat-small',
          explanation: 'Néhány milliliter folyadék.'
        },
        {
          id: 's1-2',
          text: 'Egy doboz tej vagy gyümölcslé (1 liter)',
          categoryId: 'cat-kitchen',
          explanation: 'A mindennapi bolti italokat literben és deciliterben mérjük.'
        },
        {
          id: 's1-3',
          text: 'Egy kerti úszómedence feltöltése vízzel (150 hl = 15 m³)',
          categoryId: 'cat-large',
          explanation: 'Több ezer vagy tízezer literes mennyiség.'
        },
        {
          id: 's1-4',
          text: 'Egy üveg drága francia parfüm (50 ml)',
          categoryId: 'cat-small',
          explanation: 'Milliliterben adják meg a kozmetikumok és parfümök térfogatát.'
        },
        {
          id: 's1-5',
          text: 'Egy fazék gulyásleves a vasárnapi ebédhez (4 liter)',
          categoryId: 'cat-kitchen',
          explanation: 'Deciliterben és literben mérjük a konyhai ételeket.'
        },
        {
          id: 's1-6',
          text: 'Egy borospince nagy tölgyfahordója (5 hl = 500 l)',
          categoryId: 'cat-large',
          explanation: 'A borászatban hagyományosan hektoliterben (hl) számolnak.'
        },
        {
          id: 's1-7',
          text: 'Szemcseppentőből kijövő egyetlen csepp (0,05 ml)',
          categoryId: 'cat-small',
          explanation: 'Milliliter törtrésze.'
        },
        {
          id: 's1-8',
          text: 'Egy benzinkúti üzemanyagszállító tartálykocsi (300 hl)',
          categoryId: 'cat-large',
          explanation: 'Hatalmas ipari folyadékszállítmány.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: ŰRTARTALOM NAGYSÁGRENDI BESOROLÁSA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-under1l',
          name: '1 liternél kisebb edények',
          description: 'Kevesebb, mint 10 deciliter (vagy 1000 milliliter)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-1to20l',
          name: '1 liter és 20 liter közötti edények',
          description: 'Hordozható palackok, kannák, fazekak és vödrök',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-over20l',
          name: '20 liternél nagyobb tárolók',
          description: 'Fürdőkádak, hordók, tartályok és medencék',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Egy bögre forró kakaó (2,5 dl)',
          categoryId: 'cat-under1l',
          explanation: '2,5 dl negyed liter, jóval 1 liter alatt van.'
        },
        {
          id: 's2-2',
          text: 'Egy háztartási felmosóvödör (10 liter)',
          categoryId: 'cat-1to20l',
          explanation: '1 és 20 liter közé eső űrtartalom.'
        },
        {
          id: 's2-3',
          text: 'Egy tele engedett fürdőkád (kb. 180 liter)',
          categoryId: 'cat-over20l',
          explanation: 'Bőven 20 liter feletti, közel 2 hektoliter.'
        },
        {
          id: 's2-4',
          text: 'Egy dobozos narancsos üdítő (330 ml)',
          categoryId: 'cat-under1l',
          explanation: '3,3 dl = 330 ml, kevesebb mint fél liter.'
        },
        {
          id: 's2-5',
          text: 'Egy nagy műanyag ásványvizes ballon (5 liter)',
          categoryId: 'cat-1to20l',
          explanation: '1 és 20 liter közé eső méret.'
        },
        {
          id: 's2-6',
          text: 'Egy kerti esővízgyűjtő hordó (200 liter = 2 hl)',
          categoryId: 'cat-over20l',
          explanation: 'Több száz literes tároló.'
        },
        {
          id: 's2-7',
          text: 'Egy kávéscsésze espresso kávéval (60 ml)',
          categoryId: 'cat-under1l',
          explanation: 'Nagyon kicsi űrtartalom, kevesebb mint 1 dl.'
        },
        {
          id: 's2-8',
          text: 'Egy személyautó üzemanyagtartálya (kb. 50 liter)',
          categoryId: 'cat-over20l',
          explanation: '20 liternél jóval nagyobb kapacitású tartály.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MENNYISÉGEK ÖSSZEHASONLÍTÁSA AZ 1 LITERREL
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-exact-1l',
          name: 'Pontosan 1 literrel egyenlő',
          description: '1 l = 10 dl = 100 cl = 1000 ml = 1 dm³',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-less-1l',
          name: 'Kevesebb, mint 1 liter',
          description: 'Nem éri el az 1000 milliliter vagy 10 deciliter szintet',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-more-1l',
          name: 'Több, mint 1 liter',
          description: 'Nagyobb, mint 10 deciliter vagy 1 dm³',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '10 deciliter (10 dl) almalé',
          categoryId: 'cat-exact-1l',
          explanation: '10 dl pontosan 1 liter.'
        },
        {
          id: 's3-2',
          text: '75 centiliter (75 cl) ásványvíz',
          categoryId: 'cat-less-1l',
          explanation: '75 cl = 7,5 dl = 0,75 l, ami kevesebb mint 1 liter.'
        },
        {
          id: 's3-3',
          text: 'Egy 1,5 literes üdítőspalack tartalma',
          categoryId: 'cat-more-1l',
          explanation: '1,5 l több, mint 1 liter.'
        },
        {
          id: 's3-4',
          text: '1000 köbcentiméter (1000 cm³) tiszta víz',
          categoryId: 'cat-exact-1l',
          explanation: '1000 cm³ = 1 dm³ = pontosan 1 liter.'
        },
        {
          id: 's3-5',
          text: '4 darab 2 deciliteres pohárnyi tea együtt (8 dl)',
          categoryId: 'cat-less-1l',
          explanation: '4 · 2 dl = 8 dl = 0,8 l, kevesebb mint 1 liter.'
        },
        {
          id: 's3-6',
          text: '0,02 hektoliter (0,02 hl) bor',
          categoryId: 'cat-more-1l',
          explanation: '0,02 hl = 2 liter, ami több mint 1 liter.'
        },
        {
          id: 's3-7',
          text: '1 köbdeciméter (1 dm³) térfogatú edény tele vízzel',
          categoryId: 'cat-exact-1l',
          explanation: '1 dm³ belső térfogat pontosan 1 liternek felel meg.'
        },
        {
          id: 's3-8',
          text: '950 milliliter (950 ml) gyümölcsszörp',
          categoryId: 'cat-less-1l',
          explanation: '950 ml kevesebb, mint az 1000 ml (1 liter).'
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
