import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SimpleWordProblemsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SimpleWordProblemsSorter: React.FC<SimpleWordProblemsSorterProps> = ({
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
    // 1. SZINT: KULCSSZAVAK MŰVELET SZERINT
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-add',
          name: 'Összeadás (+) kulcsszavak',
          description: 'Növelést, hozzáadást vagy együttes mennyiséget jelent',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-sub',
          name: 'Kivonás (−) kulcsszavak',
          description: 'Csökkenést, különbséget vagy maradékot fejez ki',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-mul-div',
          name: 'Szorzás (·) vagy Osztás (:) kulcsszavak',
          description: 'Többszöröst, arányos elosztást vagy tört részt jelent',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '„8-cal több alma van a kosárban”',
          categoryId: 'cat-add',
          explanation: '8-cal több → x + 8 (összeadás).'
        },
        {
          id: 's1-2',
          text: '„15-tel kevesebb pontot szerzett”',
          categoryId: 'cat-sub',
          explanation: '15-tel kevesebb → x − 15 (kivonás).'
        },
        {
          id: 's1-3',
          text: '„háromszor annyi matricát gyűjtött”',
          categoryId: 'cat-mul-div',
          explanation: 'Háromszor annyi → 3 · x (szorzás).'
        },
        {
          id: 's1-4',
          text: '„egyenlően szétosztották 4 gyerek között”',
          categoryId: 'cat-mul-div',
          explanation: 'Szétosztás → x : 4 (osztás).'
        },
        {
          id: 's1-5',
          text: '„ketten együtt összesen 500 Ft-ot fizettek”',
          categoryId: 'cat-add',
          explanation: 'Együtt, összesen → összeadás (a + b = 500).'
        },
        {
          id: 's1-6',
          text: '„elvettünk belőle 20 darabot, mennyi a maradék?”',
          categoryId: 'cat-sub',
          explanation: 'Elvétel, maradék → kivonás.'
        },
        {
          id: 's1-7',
          text: '„a pénzének a negyedrésze”',
          categoryId: 'cat-mul-div',
          explanation: 'Negyedrész → x : 4 (osztás).'
        },
        {
          id: 's1-8',
          text: '„hánnyal több van az egyikben, mint a másikban?”',
          categoryId: 'cat-sub',
          explanation: 'Különbség keresése → nagyobb − kisebb (kivonás).'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: A FELADAT MEGOLDÁSI MODELLJE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-parts',
          name: 'Részek módszere (Többszörös és összeg)',
          description: 'Az egyik mennyiség k-szorosa a másiknak, 1 r. + k r. = Összesen',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-diff',
          name: 'Különbség és összeg (Többlet levonása)',
          description: 'Az egyik d-vel több/kevesebb, 2 · x + d = Összesen',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-backward',
          name: 'Visszafelé gondolkodás (Költés / Láncolat)',
          description: 'A végállapotból indulunk vissza az ellentétes műveletekkel',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '„Anna és Peti együtt 48 gesztenyét gyűjtött, Petinek 3-szor annyi van.”',
          categoryId: 'cat-parts',
          explanation: '1 rész (Anna) + 3 rész (Peti) = 4 rész = 48.'
        },
        {
          id: 's2-2',
          text: '„Dóri és Máté összesen 50 matricát ragasztott, Dórinak 12-vel több van.”',
          categoryId: 'cat-diff',
          explanation: 'Levonjuk a 12 többletet: 50 − 12 = 38, majd 38 : 2 = 19.'
        },
        {
          id: 's2-3',
          text: '„Pénzem felét elköltöttem fagyira, majd 300 Ft-ért vettem rágót, és maradt 500 Ft-om.”',
          categoryId: 'cat-backward',
          explanation: '500 + 300 = 800 Ft, majd 800 · 2 = 1600 Ft.'
        },
        {
          id: 's2-4',
          text: '„Egy téglalap kerülete 40 cm, hossza háromszorosa a szélességének.”',
          categoryId: 'cat-parts',
          explanation: 'Félkerület = 20 cm, szélesség = 1 r., hossz = 3 r. → 4 r. = 20.'
        },
        {
          id: 's2-5',
          text: '„Két szám összege 65, a különbségük 15.”',
          categoryId: 'cat-diff',
          explanation: 'Különbség és összeg modell: 65 − 15 = 50 → 50 : 2 = 25.'
        },
        {
          id: 's2-6',
          text: '„Gondoltam egy számot, elosztottam 3-mal, hozzáadtam 8-at, és 14 lett.”',
          categoryId: 'cat-backward',
          explanation: '14 − 8 = 6, majd 6 · 3 = 18.'
        },
        {
          id: 's2-7',
          text: '„A gazdának négyszer annyi tyúkja van, mint kacsája, összesen 60 szárnyas.”',
          categoryId: 'cat-parts',
          explanation: '1 r. + 4 r. = 5 r. = 60 → 1 r. = 12 kacsa.'
        },
        {
          id: 's2-8',
          text: '„Lilla 4 évvel idősebb testvérénél, ketten együtt 22 évesek.”',
          categoryId: 'cat-diff',
          explanation: '22 − 4 = 18 → 18 : 2 = 9 éves a testvér.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ELLENŐRZÉS ÉS ÉLETSZERŰSÉG
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-realistic',
          name: 'Helyes és életszerű megoldás',
          description: 'A válasz kielégíti a szöveg minden feltételét és a valóságban is reális',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-unrealistic',
          name: 'Életszerűtlen vagy lehetetlen számítás',
          description: 'Tört személy, negatív darabszám vagy ellentmondásos adat a feladatban',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '„A buszon 34 utas utazott, 18 felnőtt és 16 gyerek.”',
          categoryId: 'cat-realistic',
          explanation: '18 + 16 = 34, pozitív egész számok, reális.'
        },
        {
          id: 's3-2',
          text: '„Az osztályban 14,5 lány és 12,5 fiú tanul.”',
          categoryId: 'cat-unrealistic',
          explanation: 'Emberek száma csak természetes szám (egész) lehet, nem lehet 14,5 diák!'
        },
        {
          id: 's3-3',
          text: '„Péter zsebpénze −500 Ft lett a vásárlás után.”',
          categoryId: 'cat-unrealistic',
          explanation: 'A tárcájában lévő készpénz nem lehet negatív darabszámú.'
        },
        {
          id: 's3-4',
          text: '„Anna 12 éves, anyukája 38 éves (26 év a korkülönbségük).”',
          categoryId: 'cat-realistic',
          explanation: 'Teljesen életszerű és lehetséges életkorok.'
        },
        {
          id: 's3-5',
          text: '„Egy háromszög oldalai: 5 cm, 8 cm és 20 cm.”',
          categoryId: 'cat-unrealistic',
          explanation: 'Háromszög-egyenlőtlenség sérül: 5 + 8 = 13 < 20, ilyen háromszög nem létezhet!'
        },
        {
          id: 's3-6',
          text: '„A boltban 3 kg alma 1200 Ft-ba került (400 Ft/kg).”',
          categoryId: 'cat-realistic',
          explanation: '3 · 400 = 1200 Ft, reális piaci ár.'
        },
        {
          id: 's3-7',
          text: '„A kerékpáros 2 óra alatt 450 km-t tett meg biciklivel.”',
          categoryId: 'cat-unrealistic',
          explanation: 'Ez 225 km/h sebesség lenne, ami kerékpárral lehetetlen!'
        },
        {
          id: 's3-8',
          text: '„A téglalap kerülete 48 cm, oldalai 10 cm és 14 cm.”',
          categoryId: 'cat-realistic',
          explanation: 'K = 2 · (10 + 14) = 2 · 24 = 48 cm. Helyes.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Egyszerű szöveges feladatok Csoportosító"
      subtitle="Kategorizáld a kifejezéseket, megoldási modelleket és vizsgálj életszerűséget!"
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
export default SimpleWordProblemsSorter;
