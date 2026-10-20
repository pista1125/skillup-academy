import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface ProbabilitySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const ProbabilitySorter: React.FC<ProbabilitySorterProps> = ({
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
    // 1. SZINT: HÉTKÖZNAPI ÉS MATEMATIKAI ESEMÉNYEK
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-certain',
          name: 'Biztos esemény (100%)',
          description: 'Minden körülmények között garantáltan bekövetkezik',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-possible',
          name: 'Lehetséges (Véletlen) esemény',
          description: 'Megtörténhet, de nem biztos, a véletlentől függ',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-impossible',
          name: 'Lehetetlen esemény (0%)',
          description: 'Semmilyen esetben nem fordulhat elő',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egy héten pontosan 7 nap van',
          categoryId: 'cat-certain',
          explanation: 'A naptári hét definíció szerint 7 napból áll.'
        },
        {
          id: 's1-2',
          text: 'Holnap délután esni fog az eső a városunkban',
          categoryId: 'cat-possible',
          explanation: 'Az időjárás változékony, az eső lehetséges, de nem biztos.'
        },
        {
          id: 's1-3',
          text: 'Egy szabályos kockával 9-est dobunk',
          categoryId: 'cat-impossible',
          explanation: 'A kockán csak 1-től 6-ig vannak számok.'
        },
        {
          id: 's1-4',
          text: 'Két páratlan szám összege páros szám lesz',
          categoryId: 'cat-certain',
          explanation: 'Bármely két páratlan szám összege mindig páros (pl. 3 + 5 = 8).'
        },
        {
          id: 's1-5',
          text: 'A villamoson az első utasnak barna szeme lesz',
          categoryId: 'cat-possible',
          explanation: 'Lehetséges, de lehet kék vagy zöld szemű is.'
        },
        {
          id: 's1-6',
          text: 'Egy élő hal a szárazföldön tüdejével levegőt vesz',
          categoryId: 'cat-impossible',
          explanation: 'A halak kopoltyúval lélegeznek a vízben.'
        },
        {
          id: 's1-7',
          text: 'A ma 11 éves ötödikes diák 1 év múlva 12 éves lesz',
          categoryId: 'cat-certain',
          explanation: 'Az életkor szabályosan, évente eggyel nő.'
        },
        {
          id: 's1-8',
          text: 'Pénzfeldobásnál fejet dobunk',
          categoryId: 'cat-possible',
          explanation: '50% eséllyel fej, 50% eséllyel írás.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: KOCKADOBÁSI ESEMÉNYEK
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-dice-certain',
          name: 'Biztos kockadobás (Minden számra igaz)',
          description: 'A kocka mind a 6 oldala megfelel a feltételnek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-dice-possible',
          name: 'Lehetséges kockadobás (Van rá esély)',
          description: '1, 2, 3, 4 vagy 5 oldal felel meg a feltételnek',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-dice-impossible',
          name: 'Lehetetlen kockadobás (Nincs rá esély)',
          description: 'A kocka egyetlen oldala sem felel meg a feltételnek',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'A dobott szám pozitív egész szám',
          categoryId: 'cat-dice-certain',
          explanation: 'Az 1, 2, 3, 4, 5, 6 mindegyike pozitív egész szám.'
        },
        {
          id: 's2-2',
          text: 'A dobott szám prímszám (2, 3 vagy 5)',
          categoryId: 'cat-dice-possible',
          explanation: '3 eset a 6-ból, lehetséges kimenetel.'
        },
        {
          id: 's2-3',
          text: 'A dobott szám 0 (nulla)',
          categoryId: 'cat-dice-impossible',
          explanation: 'A normál dobókockán nincs 0.'
        },
        {
          id: 's2-4',
          text: 'A dobott szám kisebb mint 10',
          categoryId: 'cat-dice-certain',
          explanation: 'Minden lehetséges dobás (1..6) kisebb 10-nél.'
        },
        {
          id: 's2-5',
          text: 'A dobott szám pontosan 6-os',
          categoryId: 'cat-dice-possible',
          explanation: '1 eset a 6-ból, klasszikus véletlen esemény.'
        },
        {
          id: 's2-6',
          text: 'A dobott szám páros és páratlan is egyszerre',
          categoryId: 'cat-dice-impossible',
          explanation: 'Egy egész szám nem lehet egyszerre páros és páratlan.'
        },
        {
          id: 's2-7',
          text: 'A dobott szám legalább 1',
          categoryId: 'cat-dice-certain',
          explanation: 'A legkisebb dobható szám az 1, így mindig legalább 1.'
        },
        {
          id: 's2-8',
          text: 'A dobott szám 5-tel osztható',
          categoryId: 'cat-dice-possible',
          explanation: 'Az 5-ös szám osztható 5-tel (1 eset a 6-ból).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ESÉLYEK ÖSSZEHASONLÍTÁSA (PÁROK)
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-equal',
          name: 'Egyenlő esélyű (50% - 50%)',
          description: 'A két kimenetelnek pontosan ugyanannyi a valószínűsége',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-more',
          name: 'Nagyobb esélyű (Valószínűbb)',
          description: 'A megadott feltételnek több kedvező esete van a felénél',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-less',
          name: 'Kisebb esélyű (Valószínűtlenebb)',
          description: 'A megadott feltételnek kevesebb kedvező esete van a felénél',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Érmedobásnál Fejet dobni',
          categoryId: 'cat-equal',
          explanation: '1 eset a 2-ből (50%).'
        },
        {
          id: 's3-2',
          text: 'Kockadobásnál NEM 6-ost dobni (1, 2, 3, 4, 5)',
          categoryId: 'cat-more',
          explanation: '5 eset a 6-ból (kb. 83,3%, jóval több a felénél).'
        },
        {
          id: 's3-3',
          text: 'Kockadobásnál pontosan 6-ost dobni',
          categoryId: 'cat-less',
          explanation: '1 eset a 6-ból (kb. 16,7%, jóval kevesebb a felénél).'
        },
        {
          id: 's3-4',
          text: 'Kockadobásnál páros számot dobni {2, 4, 6}',
          categoryId: 'cat-equal',
          explanation: '3 eset a 6-ból (pontosan 50%).'
        },
        {
          id: 's3-5',
          text: '8 piros és 2 zöld golyóból pirosat húzni',
          categoryId: 'cat-more',
          explanation: '8 eset a 10-ből (80% esély).'
        },
        {
          id: 's3-6',
          text: '8 piros és 2 zöld golyóból zöldet húzni',
          categoryId: 'cat-less',
          explanation: '2 eset a 10-ből (20% esély).'
        },
        {
          id: 's3-7',
          text: 'Kockadobásnál 2-nél nagyobb számot dobni {3, 4, 5, 6}',
          categoryId: 'cat-more',
          explanation: '4 eset a 6-ból (kb. 66,7%).'
        },
        {
          id: 's3-8',
          text: 'Kockadobásnál 2-nél kisebb számot dobni {1}',
          categoryId: 'cat-less',
          explanation: '1 eset a 6-ból (kb. 16,7%).'
        }
      ]
    }
  };

  const handleLevelChange = (newLevel: DifficultyLevel) => {
    setCurrentLevel(newLevel);
    if (onNextLevel) onNextLevel();
  };

  return (
    <SorterTemplate
      title="Valószínűségi Csoportosító Játék"
      subtitle="Válogasd szét az eseményeket a biztos, lehetséges és lehetetlen kategóriákba!"
      color="rose"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};
