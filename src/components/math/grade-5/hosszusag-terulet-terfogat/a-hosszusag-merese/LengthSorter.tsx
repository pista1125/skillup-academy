import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LengthSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LengthSorter: React.FC<LengthSorterProps> = ({
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
    // 1. SZINT: MELYIK MÉRTÉKEGYSÉGBEN MÉRJÜK?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-small',
          name: 'Milliméter vagy Centiméter (mm / cm)',
          description: 'Kis méretű tárgyak, füzet, ceruza, vastagság mérése',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-medium',
          name: 'Méter vagy Deciméter (m / dm)',
          description: 'Emberi léptékű távolságok: szoba, ajtó, épület, sportpálya',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-large',
          name: 'Kilométer (km)',
          description: 'Földrajzi távolságok, települések, utak, folyók hossza',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy ceruza hegyének vastagsága',
          categoryId: 'cat-small',
          explanation: 'Pici méret, általában 0,5 mm vagy 1 mm.'
        },
        {
          id: 's1-2',
          text: 'Egy tantermi ajtó magassága',
          categoryId: 'cat-medium',
          explanation: 'Emberi méret, kb. 2 méter (200 cm).'
        },
        {
          id: 's1-3',
          text: 'Budapest és Bécs közötti autópálya távolsága',
          categoryId: 'cat-large',
          explanation: 'Nagy utazási távolság, kb. 240 km.'
        },
        {
          id: 's1-4',
          text: 'Egy kockás füzet szélessége',
          categoryId: 'cat-small',
          explanation: 'Iskolaszer mérete, kb. 15 cm.'
        },
        {
          id: 's1-5',
          text: 'A lakás nappalijának hossza',
          categoryId: 'cat-medium',
          explanation: 'Szobaméret, kb. 5-6 méter.'
        },
        {
          id: 's1-6',
          text: 'A Tisza folyó teljes hossza',
          categoryId: 'cat-large',
          explanation: 'Földrajzi adat, 962 km.'
        },
        {
          id: 's1-7',
          text: 'Egy szúnyog testhossza',
          categoryId: 'cat-small',
          explanation: 'Apró rovar, kb. 4-6 mm.'
        },
        {
          id: 's1-8',
          text: 'A tornaterem hosszúsága',
          categoryId: 'cat-medium',
          explanation: 'Nagyobb helyiség, kb. 24 méter.'
        },
        {
          id: 's1-9',
          text: 'Egy balatoni kerékpártúra távolsága',
          categoryId: 'cat-large',
          explanation: 'Hosszú túraútvonal, kb. 200 km.'
        },
        {
          id: 's1-10',
          text: 'Egy radír vastagsága',
          categoryId: 'cat-small',
          explanation: 'Vonalzóval mérhető apróság, kb. 12 mm.'
        },
        {
          id: 's1-11',
          text: 'A kerti kerítés magassága',
          categoryId: 'cat-medium',
          explanation: 'Építmény mérete, kb. 1,5 - 2 méter.'
        },
        {
          id: 's1-12',
          text: 'A Föld Egyenlítőjének kerülete',
          categoryId: 'cat-large',
          explanation: 'Bolygóméret, kb. 40 075 km.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HOSSZÚSÁGOK VISZONYA 1 MÉTERHEZ KÉPEST
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-less',
          name: 'Kisebb, mint 1 méter (< 1 m)',
          description: 'A szakasz hossza kevesebb, mint 100 cm (10 dm / 1000 mm)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-equal',
          name: 'Pontosan 1 méter (= 1 m)',
          description: 'Tökéletesen megegyezik 1 méterrel (10 dm, 100 cm, 1000 mm)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-greater',
          name: 'Nagyobb, mint 1 méter (> 1 m)',
          description: 'A szakasz hossza meghaladja az 1 métert',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '85 cm',
          categoryId: 'cat-less',
          explanation: '85 cm < 100 cm = 1 m.'
        },
        {
          id: 's2-2',
          text: '10 dm',
          categoryId: 'cat-equal',
          explanation: '10 dm = 1 m pontosan.'
        },
        {
          id: 's2-3',
          text: '1200 mm',
          categoryId: 'cat-greater',
          explanation: '1200 mm = 1,2 m > 1 m.'
        },
        {
          id: 's2-4',
          text: '100 cm',
          categoryId: 'cat-equal',
          explanation: '100 cm = 1 m pontosan.'
        },
        {
          id: 's2-5',
          text: '9 dm 5 cm',
          categoryId: 'cat-less',
          explanation: '9 dm 5 cm = 95 cm < 100 cm = 1 m.'
        },
        {
          id: 's2-6',
          text: '1000 mm',
          categoryId: 'cat-equal',
          explanation: '1000 mm = 1 m pontosan.'
        },
        {
          id: 's2-7',
          text: '1 m 5 cm',
          categoryId: 'cat-greater',
          explanation: '1 m 5 cm = 105 cm > 100 cm = 1 m.'
        },
        {
          id: 's2-8',
          text: '450 mm',
          categoryId: 'cat-less',
          explanation: '450 mm = 45 cm < 100 cm = 1 m.'
        },
        {
          id: 's2-9',
          text: '0,1 km',
          categoryId: 'cat-greater',
          explanation: '0,1 km = 100 m, ami jóval nagyobb, mint 1 m!'
        },
        {
          id: 's2-10',
          text: '99 cm',
          categoryId: 'cat-less',
          explanation: '99 cm < 100 cm = 1 m (még 1 cm hiányzik hozzá).'
        },
        {
          id: 's2-11',
          text: '0,001 km',
          categoryId: 'cat-equal',
          explanation: '0,001 km = 1/1000 km = 1 m pontosan.'
        },
        {
          id: 's2-12',
          text: '15 dm',
          categoryId: 'cat-greater',
          explanation: '15 dm = 1,5 m > 1 m.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÁTVÁLTÁSOK ÉS EGYENÉRTÉKŰSÉGEK
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-25m',
          name: '2,5 méterrel egyenlő (2,5 m)',
          description: 'Értéke pontosan 2,5 m (25 dm / 250 cm / 2500 mm)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-250m',
          name: '25 méterrel egyenlő (25 m)',
          description: 'Értéke pontosan 25 m (250 dm / 2500 cm / 25 000 mm)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-2500m',
          name: '250 méterrel egyenlő (250 m)',
          description: 'Értéke pontosan 250 m (2500 dm / 0,25 km / 250 000 mm)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '250 cm',
          categoryId: 'cat-25m',
          explanation: '250 cm : 100 = 2,5 m.'
        },
        {
          id: 's3-2',
          text: '2500 cm',
          categoryId: 'cat-250m',
          explanation: '2500 cm : 100 = 25 m.'
        },
        {
          id: 's3-3',
          text: '0,25 km',
          categoryId: 'cat-2500m',
          explanation: '0,25 km · 1000 = 250 m.'
        },
        {
          id: 's3-4',
          text: '25 dm',
          categoryId: 'cat-25m',
          explanation: '25 dm : 10 = 2,5 m.'
        },
        {
          id: 's3-5',
          text: '250 dm',
          categoryId: 'cat-250m',
          explanation: '250 dm : 10 = 25 m.'
        },
        {
          id: 's3-6',
          text: '250 000 mm',
          categoryId: 'cat-2500m',
          explanation: '250 000 mm : 1000 = 250 m.'
        },
        {
          id: 's3-7',
          text: '2500 mm',
          categoryId: 'cat-25m',
          explanation: '2500 mm : 1000 = 2,5 m.'
        },
        {
          id: 's3-8',
          text: '25 000 mm',
          categoryId: 'cat-250m',
          explanation: '25 000 mm : 1000 = 25 m.'
        },
        {
          id: 's3-9',
          text: '2500 dm',
          categoryId: 'cat-2500m',
          explanation: '2500 dm : 10 = 250 m.'
        },
        {
          id: 's3-10',
          text: '2 m 50 cm',
          categoryId: 'cat-25m',
          explanation: '2 m + 50 cm = 2,5 m.'
        },
        {
          id: 's3-11',
          text: '25 m 0 cm',
          categoryId: 'cat-250m',
          explanation: 'Pontosan 25 méter.'
        },
        {
          id: 's3-12',
          text: 'Negyed kilométer (1/4 km)',
          categoryId: 'cat-2500m',
          explanation: '1000 m : 4 = 250 m.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-meres-length-quiz"
      title="A hosszúság mérése csoportosító"
      subtitle="Húzd vagy kattintással rendszerezd a hosszúságokat a megfelelő kategóriába!"
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

export default LengthSorter;
