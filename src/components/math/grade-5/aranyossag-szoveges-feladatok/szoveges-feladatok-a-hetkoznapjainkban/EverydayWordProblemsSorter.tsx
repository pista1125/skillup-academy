import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface EverydayWordProblemsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const EverydayWordProblemsSorter: React.FC<EverydayWordProblemsSorterProps> = ({
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
    // 1. SZINT: HÉTKÖZNAPI TÉMAKÖRÖK
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-shopping',
          name: 'Vásárlás és pénzkezelés (Ft, db, egységár)',
          description: 'Bolti blokkok, visszajáró pénz, akciók és kerekítés',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        },
        {
          id: 'cat-cooking',
          name: 'Főzés és receptarányosítás (g, dkg, dl, adag)',
          description: 'Sütemény receptek, adagok növelése, konyhai mértékek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-travel',
          name: 'Utazás és mozgás (km, km/h, perc, óra)',
          description: 'Menetidők, sebességek, indulási és érkezési időpontok',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '„2 kg alma 420 Ft/kg áron, fizetés 1000 Ft-tal”',
          categoryId: 'cat-shopping',
          explanation: 'Pénzügyi, vásárlási feladat.'
        },
        {
          id: 's1-2',
          text: '„A palacsintatésztához 4 főre 3 dl tej kell, mennyi kell 10 főre?”',
          categoryId: 'cat-cooking',
          explanation: 'Konyhai receptarányosítás.'
        },
        {
          id: 's1-3',
          text: '„A vonat 60 km/h sebességgel halad, mikor érkezik meg?”',
          categoryId: 'cat-travel',
          explanation: 'Utazás, sebesség és menetidő.'
        },
        {
          id: 's1-4',
          text: '„A kassza 1432 Ft-ot 1430 Ft-ra kerekített készpénznél”',
          categoryId: 'cat-shopping',
          explanation: 'Forint kerekítés vásárláskor.'
        },
        {
          id: 's1-5',
          text: '„A sütihez 25 dkg liszt és 10 dkg cukor szükséges”',
          categoryId: 'cat-cooking',
          explanation: 'Konyhai hozzávalók és tömegmérés.'
        },
        {
          id: 's1-6',
          text: '„A kerékpáros 15 km-t tett meg 1 óra alatt”',
          categoryId: 'cat-travel',
          explanation: 'Sebesség és megtett út.'
        },
        {
          id: 's1-7',
          text: '„Három füzet 750 Ft-ba került összesen”',
          categoryId: 'cat-shopping',
          explanation: 'Egységár és darabár számítása.'
        },
        {
          id: 's1-8',
          text: '„Indulás 08:35-kor, menetidő 45 perc”',
          categoryId: 'cat-travel',
          explanation: 'Menetrend és időpont számítása.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: KÉSZPÉNZES KEREKÍTÉS SZABÁLYA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-round-zero',
          name: '0 Ft-ra kerekedik lefelé (1 vagy 2 Ft végződés)',
          description: 'A legközelebbi alsó tízesre kerekítünk',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-round-five',
          name: '5 Ft-ra kerekedik (3, 4 Ft felfelé vagy 6, 7 Ft lefelé)',
          description: 'A köztes 5 forintos címletre kerekítünk',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-round-ten',
          name: '10 Ft-ra kerekedik felfelé (8 vagy 9 Ft végződés)',
          description: 'A legközelebbi felső tízesre kerekítünk',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '1241 Ft',
          categoryId: 'cat-round-zero',
          explanation: '1-re végződik → 1240 Ft.'
        },
        {
          id: 's2-2',
          text: '3562 Ft',
          categoryId: 'cat-round-zero',
          explanation: '2-re végződik → 3560 Ft.'
        },
        {
          id: 's2-3',
          text: '873 Ft',
          categoryId: 'cat-round-five',
          explanation: '3-ra végződik → 875 Ft.'
        },
        {
          id: 's2-4',
          text: '1944 Ft',
          categoryId: 'cat-round-five',
          explanation: '4-re végződik → 1945 Ft.'
        },
        {
          id: 's2-5',
          text: '2816 Ft',
          categoryId: 'cat-round-five',
          explanation: '6-ra végződik → 2815 Ft.'
        },
        {
          id: 's2-6',
          text: '4127 Ft',
          categoryId: 'cat-round-five',
          explanation: '7-re végződik → 4125 Ft.'
        },
        {
          id: 's2-7',
          text: '758 Ft',
          categoryId: 'cat-round-ten',
          explanation: '8-ra végződik → 760 Ft.'
        },
        {
          id: 's2-8',
          text: '999 Ft',
          categoryId: 'cat-round-ten',
          explanation: '9-re végződik → 1000 Ft.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MENETIDŐ NAGYSÁGA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-time-short',
          name: 'Rövid menetidő (legfeljebb 30 perc)',
          description: 'Legfeljebb fél óra szükséges a táv megtételéhez',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-time-medium',
          name: 'Közepes menetidő (31 perc – 90 perc között)',
          description: 'Fél óra és másfél óra közötti utazási idő',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-time-long',
          name: 'Hosszú menetidő (több mint 90 perc / 1,5 óra)',
          description: 'Másfél óránál tovább tartó utazás',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '2 km gyaloglás 4 km/h tempóval',
          categoryId: 'cat-time-short',
          explanation: '2 : 4 = 0,5 óra = 30 perc.'
        },
        {
          id: 's3-2',
          text: '15 km kerékpározás 15 km/h sebességgel',
          categoryId: 'cat-time-medium',
          explanation: '15 : 15 = 1 óra (60 perc).'
        },
        {
          id: 's3-3',
          text: '180 km utazás 60 km/h sebességű vonattal',
          categoryId: 'cat-time-long',
          explanation: '180 : 60 = 3 óra (180 perc > 90 perc).'
        },
        {
          id: 's3-4',
          text: '10 km autóút 60 km/h sebességgel',
          categoryId: 'cat-time-short',
          explanation: '10 : 60 = 1/6 óra = 10 perc (≤ 30 perc).'
        },
        {
          id: 's3-5',
          text: '70 km autóút 70 km/h sebességgel',
          categoryId: 'cat-time-medium',
          explanation: '70 : 70 = 1 óra (60 perc).'
        },
        {
          id: 's3-6',
          text: '15 km gyalogtúra 5 km/h tempóval',
          categoryId: 'cat-time-long',
          explanation: '15 : 5 = 3 óra (> 90 perc).'
        },
        {
          id: 's3-7',
          text: '30 km biciklizés 20 km/h sebességgel',
          categoryId: 'cat-time-long',
          explanation: '30 : 20 = 1,5 óra = 90 perc (határérték / 1,5 óra).'
        },
        {
          id: 's3-8',
          text: '6 km kocogás 12 km/h tempóval',
          categoryId: 'cat-time-short',
          explanation: '6 : 12 = 0,5 óra = 30 perc.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Hétköznapi szöveges feladatok Csoportosító"
      subtitle="Kategorizáld a feladatokat élethelyzet, kerekítési szabály és menetidő szerint!"
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
export default EverydayWordProblemsSorter;
