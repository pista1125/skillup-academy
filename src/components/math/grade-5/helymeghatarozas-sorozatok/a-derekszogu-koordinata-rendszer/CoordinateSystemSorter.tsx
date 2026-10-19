import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CoordinateSystemSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const CoordinateSystemSorter: React.FC<CoordinateSystemSorterProps> = ({
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
    // 1. SZINT: SÍKNEGYEDEK ÉS TENGELYEK AZ ELŐJELEK ALAPJÁN
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-upper',
          name: 'Felső félsík (y > 0): I. vagy II. síknegyed',
          description: 'A vízszintes tengely felett elhelyezkedő pontok, a második koordinátájuk pozitív',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-lower',
          name: 'Alsó félsík (y < 0): III. vagy IV. síknegyed',
          description: 'A vízszintes tengely alatt elhelyezkedő pontok, a második koordinátájuk negatív',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-axes',
          name: 'Tengelyeken fekvő pontok vagy origó (x = 0 vagy y = 0)',
          description: 'Egyik síknegyedhez sem tartoznak, mert a tengelyek határvonalán fekszenek',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '(3; 5) pont',
          categoryId: 'cat-upper',
          explanation: 'Az y = 5 pozitív, a pont a felső félsíkban (I. síknegyed) van.'
        },
        {
          id: 's1-2',
          text: '(-4; 2) pont',
          categoryId: 'cat-upper',
          explanation: 'Az y = 2 pozitív, a pont a felső félsíkban (II. síknegyed) van.'
        },
        {
          id: 's1-3',
          text: '(6; 1) pont',
          categoryId: 'cat-upper',
          explanation: 'Az y = 1 pozitív, a pont az I. síknegyedben fekszik.'
        },
        {
          id: 's1-4',
          text: '(-1; 7) pont',
          categoryId: 'cat-upper',
          explanation: 'Az y = 7 pozitív, a pont a II. síknegyedben fekszik.'
        },
        {
          id: 's1-5',
          text: '(-3; -4) pont',
          categoryId: 'cat-lower',
          explanation: 'Az y = -4 negatív, a pont az alsó félsíkban (III. síknegyed) van.'
        },
        {
          id: 's1-6',
          text: '(5; -2) pont',
          categoryId: 'cat-lower',
          explanation: 'Az y = -2 negatív, a pont az alsó félsíkban (IV. síknegyed) van.'
        },
        {
          id: 's1-7',
          text: '(-6; -1) pont',
          categoryId: 'cat-lower',
          explanation: 'Az y = -1 negatív, a pont a III. síknegyedben fekszik.'
        },
        {
          id: 's1-8',
          text: '(2; -5) pont',
          categoryId: 'cat-lower',
          explanation: 'Az y = -5 negatív, a pont a IV. síknegyedben fekszik.'
        },
        {
          id: 's1-9',
          text: '(0; 4) pont',
          categoryId: 'cat-axes',
          explanation: 'Az első koordinátája 0, így az y-tengelyen fekszik, nem tartozik síknegyedbe.'
        },
        {
          id: 's1-10',
          text: '(-5; 0) pont',
          categoryId: 'cat-axes',
          explanation: 'A második koordinátája 0, így az x-tengelyen fekszik, nem tartozik síknegyedbe.'
        },
        {
          id: 's1-11',
          text: '(0; 0) origó',
          categoryId: 'cat-axes',
          explanation: 'A két tengely metszéspontja, egyik síknegyedhez sem tartozik.'
        },
        {
          id: 's1-12',
          text: '(7; 0) pont',
          categoryId: 'cat-axes',
          explanation: 'A második koordinátája 0, a pozitív x-tengelyen fekszik.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TENGELYEK ÉS BELSŐ SÍKNEGYEDEK MEGKÜLÖNBÖZTETÉSE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-x-axis',
          name: 'x-tengely pontjai (y = 0)',
          description: 'A vízszintes tengelyen elhelyezkedő pontok, a második koordinátájuk mindig 0',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-y-axis',
          name: 'y-tengely pontjai (x = 0)',
          description: 'A függőleges tengelyen elhelyezkedő pontok, az első koordinátájuk mindig 0',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-quadrant-inner',
          name: 'Belső síknegyedben fekvő pont (x ≠ 0 és y ≠ 0)',
          description: 'Valamelyik síknegyedben van, egyik tengelyen sem fekszik',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '(6; 0) pont',
          categoryId: 'cat-x-axis',
          explanation: 'Második koordinátája 0, ezért a pozitív x-tengely pontja.'
        },
        {
          id: 's2-2',
          text: '(-3; 0) pont',
          categoryId: 'cat-x-axis',
          explanation: 'Második koordinátája 0, ezért a negatív x-tengely pontja.'
        },
        {
          id: 's2-3',
          text: '(10; 0) pont',
          categoryId: 'cat-x-axis',
          explanation: 'Jobbra 10 egység a vízszintes tengelyen, y = 0.'
        },
        {
          id: 's2-4',
          text: '(-8; 0) pont',
          categoryId: 'cat-x-axis',
          explanation: 'Balra 8 egység a vízszintes tengelyen, y = 0.'
        },
        {
          id: 's2-5',
          text: '(0; 5) pont',
          categoryId: 'cat-y-axis',
          explanation: 'Első koordinátája 0, ezért a pozitív y-tengely pontja.'
        },
        {
          id: 's2-6',
          text: '(0; -4) pont',
          categoryId: 'cat-y-axis',
          explanation: 'Első koordinátája 0, ezért a negatív y-tengely pontja.'
        },
        {
          id: 's2-7',
          text: '(0; 8) pont',
          categoryId: 'cat-y-axis',
          explanation: 'Felfelé 8 egység a függőleges tengelyen, x = 0.'
        },
        {
          id: 's2-8',
          text: '(0; -1) pont',
          categoryId: 'cat-y-axis',
          explanation: 'Lefelé 1 egység a függőleges tengelyen, x = 0.'
        },
        {
          id: 's2-9',
          text: '(2; 4) pont',
          categoryId: 'cat-quadrant-inner',
          explanation: 'Sem x, sem y nem nulla, a pont az I. síknegyedben van.'
        },
        {
          id: 's2-10',
          text: '(-5; 3) pont',
          categoryId: 'cat-quadrant-inner',
          explanation: 'Sem x, sem y nem nulla, a pont a II. síknegyedben van.'
        },
        {
          id: 's2-11',
          text: '(-3; -6) pont',
          categoryId: 'cat-quadrant-inner',
          explanation: 'Sem x, sem y nem nulla, a pont a III. síknegyedben van.'
        },
        {
          id: 's2-12',
          text: '(4; -2) pont',
          categoryId: 'cat-quadrant-inner',
          explanation: 'Sem x, sem y nem nulla, a pont a IV. síknegyedben van.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TENGELYTÁVOLSÁGOK ÉS SZIMMETRIA TULAJDONSÁGOK
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-closer-x',
          name: 'Közelebb van az x-tengelyhez (|y| < |x|)',
          description: 'A függőleges távolsága kisebb, mint a vízszintes távolsága az origótól',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-equal-dist',
          name: 'Egyenlő távolságra van a tengelyektől (|x| = |y|)',
          description: 'A síknegyedek szögfelezőin fekszik, a koordináták abszolútértéke megegyezik',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-closer-y',
          name: 'Közelebb van az y-tengelyhez (|x| < |y|)',
          description: 'A vízszintes távolsága kisebb, mint a függőleges távolsága az origótól',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '(5; 2) pont',
          categoryId: 'cat-closer-x',
          explanation: '|y|=2 távolság az x-tengelytől < |x|=5 távolság az y-tengelytől.'
        },
        {
          id: 's3-2',
          text: '(-6; 1) pont',
          categoryId: 'cat-closer-x',
          explanation: '|y|=1 < |x|=6, csupán 1 egységre van az x-tengelytől.'
        },
        {
          id: 's3-3',
          text: '(4; -1) pont',
          categoryId: 'cat-closer-x',
          explanation: '|y|=1 < |x|=4, közelebb fekszik a vízszintes tengelyhez.'
        },
        {
          id: 's3-4',
          text: '(-7; -3) pont',
          categoryId: 'cat-closer-x',
          explanation: '|y|=3 < |x|=7, közelebb van az x-tengelyhez.'
        },
        {
          id: 's3-5',
          text: '(3; 3) pont',
          categoryId: 'cat-equal-dist',
          explanation: '|x| = |y| = 3, mindkét tengelytől pontosan 3 egységre van.'
        },
        {
          id: 's3-6',
          text: '(-4; 4) pont',
          categoryId: 'cat-equal-dist',
          explanation: '|-4| = |4| = 4, mindkét tengelytől 4 egység távolságra van.'
        },
        {
          id: 's3-7',
          text: '(-5; -5) pont',
          categoryId: 'cat-equal-dist',
          explanation: '|-5| = |-5| = 5, a III. negyed szögfelezőjén fekszik.'
        },
        {
          id: 's3-8',
          text: '(6; -6) pont',
          categoryId: 'cat-equal-dist',
          explanation: '|6| = |-6| = 6, a IV. negyed szögfelezőjén fekszik.'
        },
        {
          id: 's3-9',
          text: '(1; 4) pont',
          categoryId: 'cat-closer-y',
          explanation: '|x|=1 < |y|=4, csupán 1 egységre fekszik a függőleges y-tengelytől.'
        },
        {
          id: 's3-10',
          text: '(-2; 5) pont',
          categoryId: 'cat-closer-y',
          explanation: '|x|=2 < |y|=5, közelebb van az y-tengelyhez.'
        },
        {
          id: 's3-11',
          text: '(2; -6) pont',
          categoryId: 'cat-closer-y',
          explanation: '|x|=2 < |y|=6, közelebb van az y-tengelyhez.'
        },
        {
          id: 's3-12',
          text: '(-1; -5) pont',
          categoryId: 'cat-closer-y',
          explanation: '|x|=1 < |y|=5, alig 1 egységre van a függőleges tengelytől.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-coord-sys-quiz"
      title="A derékszögű koordináta-rendszer csoportosító"
      subtitle="Csoportosítsd a pontokat síknegyedek, tengelyek és tengelytávolságok szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-coordinate-system-sorter"
      storageKey="g5-loc-coord-sys-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
