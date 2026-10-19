import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PointPlottingSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PointPlottingSorter: React.FC<PointPlottingSorterProps> = ({
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
    // 1. SZINT: ELMOZDULÁSOK IRÁNYAI AZ ORIGÓBÓL
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-right-up',
          name: 'Jobbra és felfelé (I. síknegyed: x > 0, y > 0)',
          description: 'Mindkét koordináta pozitív szám, az origótól jobbra és fel lépünk',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-left-up',
          name: 'Balra és felfelé (II. síknegyed: x < 0, y > 0)',
          description: 'Az x negatív (balra), az y pozitív (fel)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-downwards',
          name: 'Lefelé induló pontok (Alsó félsík: y < 0)',
          description: 'A második koordinátájuk negatív, az x-tengely alatt találhatók',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '(4; 3) pont',
          categoryId: 'cat-right-up',
          explanation: '4 egység jobbra, 3 egység fel &rarr; I. síknegyed.'
        },
        {
          id: 's1-2',
          text: '(2; 6) pont',
          categoryId: 'cat-right-up',
          explanation: '2 egység jobbra, 6 egység fel &rarr; I. síknegyed.'
        },
        {
          id: 's1-3',
          text: '(5; 1) pont',
          categoryId: 'cat-right-up',
          explanation: '5 egység jobbra, 1 egység fel &rarr; I. síknegyed.'
        },
        {
          id: 's1-4',
          text: '(1; 4) pont',
          categoryId: 'cat-right-up',
          explanation: '1 egység jobbra, 4 egység fel &rarr; I. síknegyed.'
        },
        {
          id: 's1-5',
          text: '(-3; 2) pont',
          categoryId: 'cat-left-up',
          explanation: '3 egység balra, 2 egység fel &rarr; II. síknegyed.'
        },
        {
          id: 's1-6',
          text: '(-5; 4) pont',
          categoryId: 'cat-left-up',
          explanation: '5 egység balra, 4 egység fel &rarr; II. síknegyed.'
        },
        {
          id: 's1-7',
          text: '(-1; 6) pont',
          categoryId: 'cat-left-up',
          explanation: '1 egység balra, 6 egység fel &rarr; II. síknegyed.'
        },
        {
          id: 's1-8',
          text: '(-4; 1) pont',
          categoryId: 'cat-left-up',
          explanation: '4 egység balra, 1 egység fel &rarr; II. síknegyed.'
        },
        {
          id: 's1-9',
          text: '(-2; -3) pont',
          categoryId: 'cat-downwards',
          explanation: 'y = -3 negatív, lefelé helyezkedik el a III. negyedben.'
        },
        {
          id: 's1-10',
          text: '(4; -2) pont',
          categoryId: 'cat-downwards',
          explanation: 'y = -2 negatív, lefelé helyezkedik el a IV. negyedben.'
        },
        {
          id: 's1-11',
          text: '(-5; -1) pont',
          categoryId: 'cat-downwards',
          explanation: 'y = -1 negatív, az alsó félsík pontja.'
        },
        {
          id: 's1-12',
          text: '(3; -5) pont',
          categoryId: 'cat-downwards',
          explanation: 'y = -5 negatív, az x-tengely alatt található.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYENESEKRE ILLESZKEDŐ PONTHALMAZOK
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-horiz',
          name: 'Vízszintes egyenes: y = 2 állandó',
          description: 'Minden pont magassága azonos, a második koordinátájuk pontosan 2',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-vert',
          name: 'Függőleges egyenes: x = -3 állandó',
          description: 'Minden pont első koordinátája pontosan -3, egy álló egyenesre illeszkednek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-diag',
          name: 'y = x átlós szögfelező pontjai',
          description: 'A két koordináta értéke pontosan megegyezik: x = y',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '(1; 2) pont',
          categoryId: 'cat-horiz',
          explanation: 'Második koordinátája y = 2, illeszkedik a vízszintes egyenesre.'
        },
        {
          id: 's2-2',
          text: '(-4; 2) pont',
          categoryId: 'cat-horiz',
          explanation: 'Második koordinátája y = 2, az egyenes pontja.'
        },
        {
          id: 's2-3',
          text: '(6; 2) pont',
          categoryId: 'cat-horiz',
          explanation: 'Második koordinátája y = 2, a vízszintes vonalon fekszik.'
        },
        {
          id: 's2-4',
          text: '(0; 2) pont',
          categoryId: 'cat-horiz',
          explanation: 'Az y-tengely és az y = 2 egyenes metszéspontja.'
        },
        {
          id: 's2-5',
          text: '(-3; 1) pont',
          categoryId: 'cat-vert',
          explanation: 'Első koordinátája x = -3, a függőleges vonalon fekszik.'
        },
        {
          id: 's2-6',
          text: '(-3; -4) pont',
          categoryId: 'cat-vert',
          explanation: 'Első koordinátája x = -3, az x = -3 egyenes pontja.'
        },
        {
          id: 's2-7',
          text: '(-3; 5) pont',
          categoryId: 'cat-vert',
          explanation: 'Első koordinátája x = -3, a függőleges egyenesen van.'
        },
        {
          id: 's2-8',
          text: '(-3; 0) pont',
          categoryId: 'cat-vert',
          explanation: 'Az x-tengely és az x = -3 egyenes metszéspontja.'
        },
        {
          id: 's2-9',
          text: '(2; 2) pont',
          categoryId: 'cat-diag',
          explanation: 'x = y = 2, az I. síknegyed szögfelezőjén fekszik.'
        },
        {
          id: 's2-10',
          text: '(-4; -4) pont',
          categoryId: 'cat-diag',
          explanation: 'x = y = -4, a III. síknegyed szögfelezőjén fekszik.'
        },
        {
          id: 's2-11',
          text: '(5; 5) pont',
          categoryId: 'cat-diag',
          explanation: 'x = y = 5, az átlós egyenes pontja.'
        },
        {
          id: 's2-12',
          text: '(-1; -1) pont',
          categoryId: 'cat-diag',
          explanation: 'x = y = -1, az átlós szögfelező pontja.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TÉGLALAP CSÚCSAI ÉS BELSŐ/KÜLSŐ PONTJAI
    // Adott egy [0; 4] x [0; 3] téglalap az I. síknegyedben
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-rect-corners',
          name: 'A 4x3-as téglalap csúcspontjai',
          description: 'A téglalap sarkai: A(0;0), B(4;0), C(4;3), D(0;3)',
          badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800'
        },
        {
          id: 'cat-rect-inside',
          name: 'A téglalap belsejében fekvő pontok',
          description: 'A csúcsok által határolt területen belül: 0 < x < 4 és 0 < y < 3',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-rect-outside',
          name: 'A téglalapon kívül eső pontok',
          description: 'A téglalap határain és területén kívül elhelyezkedő pontok',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '(0; 0) pont',
          categoryId: 'cat-rect-corners',
          explanation: 'A téglalap bal alsó csúcspontja (origó).'
        },
        {
          id: 's3-2',
          text: '(4; 0) pont',
          categoryId: 'cat-rect-corners',
          explanation: 'A téglalap jobb alsó csúcspontja.'
        },
        {
          id: 's3-3',
          text: '(4; 3) pont',
          categoryId: 'cat-rect-corners',
          explanation: 'A téglalap jobb felső csúcspontja.'
        },
        {
          id: 's3-4',
          text: '(0; 3) pont',
          categoryId: 'cat-rect-corners',
          explanation: 'A téglalap bal felső csúcspontja.'
        },
        {
          id: 's3-5',
          text: '(2; 1) pont',
          categoryId: 'cat-rect-inside',
          explanation: '0 < 2 < 4 és 0 < 1 < 3 &rarr; a téglalap belső pontja.'
        },
        {
          id: 's3-6',
          text: '(1; 2) pont',
          categoryId: 'cat-rect-inside',
          explanation: 'A téglalap határain belül helyezkedik el.'
        },
        {
          id: 's3-7',
          text: '(3; 2) pont',
          categoryId: 'cat-rect-inside',
          explanation: 'A téglalap belsejében található.'
        },
        {
          id: 's3-8',
          text: '(2; 2) pont',
          categoryId: 'cat-rect-inside',
          explanation: 'A téglalap középpontjához közeli belső pont.'
        },
        {
          id: 's3-9',
          text: '(5; 1) pont',
          categoryId: 'cat-rect-outside',
          explanation: 'x = 5 > 4, jobbra kilóg a téglalapból.'
        },
        {
          id: 's3-10',
          text: '(-1; 2) pont',
          categoryId: 'cat-rect-outside',
          explanation: 'x = -1 < 0, a II. síknegyedben van, kívül a téglalapon.'
        },
        {
          id: 's3-11',
          text: '(2; 5) pont',
          categoryId: 'cat-rect-outside',
          explanation: 'y = 5 > 3, felfelé kilóg a téglalapból.'
        },
        {
          id: 's3-12',
          text: '(2; -1) pont',
          categoryId: 'cat-rect-outside',
          explanation: 'y = -1 < 0, a téglalap alatt helyezkedik el.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-points-quiz"
      title="Pontok ábrázolása csoportosító"
      subtitle="Csoportosítsd a pontokat irányuk, egyenesük és síkidomokban elfoglalt helyük szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-point-plotting-sorter"
      storageKey="g5-loc-points-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
