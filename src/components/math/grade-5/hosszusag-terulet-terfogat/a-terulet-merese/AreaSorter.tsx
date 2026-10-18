import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AreaSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AreaSorter: React.FC<AreaSorterProps> = ({
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
    // 1. SZINT: MELYIK MÉRTÉKEGYSÉGBEN CÉLSZERŰ MÉRNI?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-small',
          name: 'Kis felületek (mm² vagy cm²)',
          description: 'Apró tárgyak, rajzok, bélyeg, telefon felülete',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-medium',
          name: 'Lakás és épület méretek (dm² vagy m²)',
          description: 'Szoba, padló, asztallap, szőnyeg kiterjedése',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-large',
          name: 'Mezőgazdaság és tájak (a, ha, km²)',
          description: 'Kert, szántóföld, erdő, tavak és települések területe',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy postabélyeg felülete',
          categoryId: 'cat-small',
          explanation: 'Néhány cm², tipikusan 4-5 cm².'
        },
        {
          id: 's1-2',
          text: 'Egy rovar szárnyának felülete',
          categoryId: 'cat-small',
          explanation: 'Pici felület, célszerűen négyzetmilliméterben (mm²) mérjük.'
        },
        {
          id: 's1-3',
          text: 'Egy bankkártya felülete',
          categoryId: 'cat-small',
          explanation: 'Körülbelül 46 cm² (8,5 cm × 5,4 cm).'
        },
        {
          id: 's1-4',
          text: 'Egy golyóstoll hegyének keresztmetszete',
          categoryId: 'cat-small',
          explanation: '1 milliméter alatti átmérő, kb. 1 mm² alatti felület.'
        },
        {
          id: 's1-5',
          text: 'A gyerekszoba laminált padlója',
          categoryId: 'cat-medium',
          explanation: 'Lakótereket négyzetméterben (m²) mérünk, pl. 14 m².'
        },
        {
          id: 's1-6',
          text: 'Egy étkezőasztal tányéralátétje',
          categoryId: 'cat-medium',
          explanation: 'Közepes tárgy, kb. 12 dm² felületű.'
        },
        {
          id: 's1-7',
          text: 'A nappali padlószőnyege',
          categoryId: 'cat-medium',
          explanation: 'Nagyobb belső felület, pl. 6-10 m².'
        },
        {
          id: 's1-8',
          text: 'Egy cipősdoboz tetejének területe',
          categoryId: 'cat-medium',
          explanation: 'Körülbelül 6-8 dm².'
        },
        {
          id: 's1-9',
          text: 'Egy szabványos focipálya játéktere',
          categoryId: 'cat-large',
          explanation: 'Több ezer m², legcélszerűbben hektárban (kb. 0,7 ha).'
        },
        {
          id: 's1-10',
          text: 'Egy családi ház konyhakertje',
          categoryId: 'cat-large',
          explanation: 'Kisebb mezőgazdasági terület, tipikusan árban (a) mérjük (pl. 3 ár).'
        },
        {
          id: 's1-11',
          text: 'A Balaton vízfelülete',
          categoryId: 'cat-large',
          explanation: 'Hatalmas természetes vízfelület: kb. 592 km².'
        },
        {
          id: 's1-12',
          text: 'Egy falu határában húzódó búzatábla',
          categoryId: 'cat-large',
          explanation: 'Mezőgazdasági nagybirtok, hektárban (ha) mérjük.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: 1 NÉGYZETMÉTERHEZ (1 m²) VISZONYÍTVA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-less',
          name: 'Kisebb, mint 1 m²',
          description: 'A felület nagysága nem éri el az 1 négyzetmétert',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-equal',
          name: 'Pontosan 1 m²',
          description: 'Az érték pontosan megegyezik 1 négyzetméterrel',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-greater',
          name: 'Nagyobb, mint 1 m²',
          description: 'A felület nagysága meghaladja az 1 négyzetmétert',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '50 dm²',
          categoryId: 'cat-less',
          explanation: 'Mivel 1 m² = 100 dm², az 50 dm² pontosan fél négyzetméter, tehát kisebb nála.'
        },
        {
          id: 's2-2',
          text: '8000 cm²',
          categoryId: 'cat-less',
          explanation: '1 m² = 10 000 cm², a 8000 cm² kevesebb ennél (0,8 m²).'
        },
        {
          id: 's2-3',
          text: 'Egy matematika tankönyv fedőlapja',
          categoryId: 'cat-less',
          explanation: 'Kb. 6 dm², ami jóval kisebb mint 1 m² (100 dm²).'
        },
        {
          id: 's2-4',
          text: 'Egy okostelefon kijelzője',
          categoryId: 'cat-less',
          explanation: 'Körülbelül 1 dm² (100 cm²), messze kisebb mint 1 m².'
        },
        {
          id: 's2-5',
          text: '100 dm²',
          categoryId: 'cat-equal',
          explanation: 'Pontosan 1 m² definíciója: 10 dm × 10 dm = 100 dm².'
        },
        {
          id: 's2-6',
          text: '10 000 cm²',
          categoryId: 'cat-equal',
          explanation: '100 cm × 100 cm = 10 000 cm² = 1 m².'
        },
        {
          id: 's2-7',
          text: '1 000 000 mm²',
          categoryId: 'cat-equal',
          explanation: '1000 mm × 1000 mm = 1 000 000 mm² = 1 m².'
        },
        {
          id: 's2-8',
          text: '0,01 a (egy ár századrésze)',
          categoryId: 'cat-equal',
          explanation: 'Mivel 1 a = 100 m², annak a századrésze (0,01 a) pontosan 1 m².'
        },
        {
          id: 's2-9',
          text: '200 dm²',
          categoryId: 'cat-greater',
          explanation: '200 dm² = 2 m², ami nagyobb mint 1 m².'
        },
        {
          id: 's2-10',
          text: '1 a (ár)',
          categoryId: 'cat-greater',
          explanation: '1 a = 100 m², ami százszorosa az 1 m²-nek.'
        },
        {
          id: 's2-11',
          text: 'Egy iskolai tanterem alapterülete',
          categoryId: 'cat-greater',
          explanation: 'Egy átlagos tanterem 45-60 m², jóval nagyobb 1 m²-nél.'
        },
        {
          id: 's2-12',
          text: 'Egy kosárlabdapálya területe',
          categoryId: 'cat-greater',
          explanation: '28 m × 15 m = 420 m², sokszorosan meghaladja az 1 m²-t.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: VÁLTÓSZÁMOK CSOPORTOSÍTÁSA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-100',
          name: 'Váltószám: 100 (1 lépcsőfok)',
          description: 'Közvetlenül szomszédos területi mértékegységek között',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-10k',
          name: 'Váltószám: 10 000 (2 lépcsőfok)',
          description: 'Két lépcsőfok távolságra lévő mértékegységek (100 · 100)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-1m',
          name: 'Váltószám: 1 000 000 (3 lépcsőfok)',
          description: 'Három lépcsőfok távolságra lévő mértékegységek (100 · 100 · 100)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'm² és dm² kapcsolata',
          categoryId: 'cat-100',
          explanation: 'Szomszédos egységek: 1 m² = 100 dm².'
        },
        {
          id: 's3-2',
          text: 'dm² és cm² kapcsolata',
          categoryId: 'cat-100',
          explanation: 'Szomszédos egységek: 1 dm² = 100 cm².'
        },
        {
          id: 's3-3',
          text: 'a (ár) és m² kapcsolata',
          categoryId: 'cat-100',
          explanation: 'Szomszédos mezőgazdasági egység: 1 a = 100 m².'
        },
        {
          id: 's3-4',
          text: 'ha (hektár) és a (ár) kapcsolata',
          categoryId: 'cat-100',
          explanation: 'Szomszédos egységek: 1 ha = 100 a.'
        },
        {
          id: 's3-5',
          text: 'm² és cm² kapcsolata',
          categoryId: 'cat-10k',
          explanation: '2 lépcsőfok (m² → dm² → cm²): 100 · 100 = 10 000. 1 m² = 10 000 cm².'
        },
        {
          id: 's3-6',
          text: 'ha és m² kapcsolata',
          categoryId: 'cat-10k',
          explanation: '2 lépcsőfok (ha → a → m²): 100 · 100 = 10 000. 1 ha = 10 000 m².'
        },
        {
          id: 's3-7',
          text: 'dm² és mm² kapcsolata',
          categoryId: 'cat-10k',
          explanation: '2 lépcsőfok (dm² → cm² → mm²): 100 · 100 = 10 000. 1 dm² = 10 000 mm².'
        },
        {
          id: 's3-8',
          text: 'km² és a (ár) kapcsolata',
          categoryId: 'cat-10k',
          explanation: '2 lépcsőfok (km² → ha → a): 100 · 100 = 10 000. 1 km² = 10 000 a.'
        },
        {
          id: 's3-9',
          text: 'km² és m² kapcsolata',
          categoryId: 'cat-1m',
          explanation: '3 lépcsőfok (km² → ha → a → m²): 100 · 100 · 100 = 1 000 000. 1 km² = 1 000 000 m².'
        },
        {
          id: 's3-10',
          text: 'm² és mm² kapcsolata',
          categoryId: 'cat-1m',
          explanation: '3 lépcsőfok (m² → dm² → cm² → mm²): 100 · 100 · 100 = 1 000 000. 1 m² = 1 000 000 mm².'
        },
        {
          id: 's3-11',
          text: 'ha és cm² kapcsolata',
          categoryId: 'cat-1m',
          explanation: '4 lépcsőfok lenne valójában, de a 3 lépéses skálán a km² és m² az igazi 1 000 000.'
        },
        {
          id: 's3-12',
          text: '1 km² kifejezése négyzetméterben (m²)',
          categoryId: 'cat-1m',
          explanation: '1 km² = 1000 m × 1000 m = 1 000 000 m².'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Terület Mértékegység Csoportosító"
      subtitle="Válogasd szét a területeket, mértékegységeket és váltószámokat a megfelelő kategóriákba!"
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
