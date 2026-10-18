import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SetsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SetsSorter: React.FC<SetsSorterProps> = ({
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
    // 1. SZINT: ELEME VAGY NEM ELEME A SOKSZÖGEK HALMAZÁNAK?
    // ========================================================
    1: {
      categories: [
        {
          id: 'in-polygons',
          name: 'Eleme: a ∈ Sokszögek',
          description: 'Kizárólag egyenes szakaszok határolják (pl. 3, 4, 5, 6 oldalú síkidomok)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'not-polygons',
          name: 'Nem eleme: b ∉ Sokszögek',
          description: 'Görbe vonal határolja, vagy 3D térbeli test',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          label: 'Egyenlő oldalú háromszög',
          category: 'in-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,26 4,26" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's1-2',
          label: 'Kör',
          category: 'not-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's1-3',
          label: 'Négyzet',
          category: 'in-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" rx="1.5" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's1-4',
          label: 'Kocka (3D test)',
          category: 'not-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M6 11 L16 5 L26 11 L16 17 Z" className="fill-rose-200 stroke-rose-600" strokeWidth="1.5" />
              <path d="M6 11 L16 17 L16 27 L6 21 Z" className="fill-rose-400 stroke-rose-700" strokeWidth="1.5" />
              <path d="M16 17 L26 11 L26 21 L16 27 Z" className="fill-rose-300 stroke-rose-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 's1-5',
          label: 'Téglalap',
          category: 'in-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="8" width="26" height="16" rx="1.5" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's1-6',
          label: 'Szabályos ötszög',
          category: 'in-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 27,12 23,26 9,26 5,12" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's1-7',
          label: 'Gömb (3D test)',
          category: 'not-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="16" rx="11" ry="4" className="stroke-rose-400" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          )
        },
        {
          id: 's1-8',
          label: 'Hatszög',
          category: 'in-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="10,5 22,5 28,16 22,27 10,27 4,16" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's1-9',
          label: 'Henger (3D forgástest)',
          category: 'not-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M8 10 L8 22 C8 26 24 26 24 22 L24 10 Z" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="10" rx="8" ry="3.5" className="fill-rose-200 stroke-rose-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 's1-10',
          label: 'Trapéz',
          category: 'in-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="8,8 24,8 28,24 4,24" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: VENN-DIAGRAM 2 HALMAZÁNAK TARTOMÁNYAI
    // A: Négyszögek | B: Minden oldala egyenlő
    // ========================================================
    2: {
      categories: [
        {
          id: 'only-quads',
          name: 'Csak A: Négyszög (nem minden oldala egyenlő)',
          description: '4 oldala van, de az oldalai nem mind egyforma hosszúak',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'intersection-quads-equal',
          name: 'Metszet A ∩ B: Négyszög ÉS minden oldala egyenlő',
          description: '4 egyenlő oldallal rendelkező négyszögek',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'only-equal',
          name: 'Csak B: Nem négyszög, de minden oldala egyenlő',
          description: 'Szabályos 3, 5 vagy 6 oldalú sokszögek',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'outside-both',
          name: 'Egyik sem (Kívül eső elemek)',
          description: 'Nem 4 oldalú ÉS nem minden oldala egyenlő (vagy görbe)',
          badgeColor: 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 's2-1',
          label: 'Négyzet',
          category: 'intersection-quads-equal',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-2',
          label: 'Rombusz',
          category: 'intersection-quads-equal',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,16 16,28 4,16" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-3',
          label: 'Téglalap (nem négyzet)',
          category: 'only-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="9" width="26" height="14" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-4',
          label: 'Trapéz',
          category: 'only-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="8,8 24,8 28,24 4,24" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-5',
          label: 'Paralelogramma (nem rombusz)',
          category: 'only-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,8 27,8 23,24 5,24" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-6',
          label: 'Szabályos háromszög (3 egyenlő oldal)',
          category: 'only-equal',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,26 4,26" className="fill-teal-100 stroke-teal-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-7',
          label: 'Szabályos ötszög (5 egyenlő oldal)',
          category: 'only-equal',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 27,12 23,26 9,26 5,12" className="fill-teal-100 stroke-teal-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-8',
          label: 'Szabályos hatszög (6 egyenlő oldal)',
          category: 'only-equal',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="10,5 22,5 28,16 22,27 10,27 4,16" className="fill-teal-100 stroke-teal-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-9',
          label: 'Kör',
          category: 'outside-both',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" className="fill-slate-100 stroke-slate-500" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's2-10',
          label: 'Derékszögű háromszög (különböző oldalakkal)',
          category: 'outside-both',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="6,6 6,26 26,26" className="fill-slate-100 stroke-slate-500" strokeWidth="2" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: NÉGYSZÖGEK RÉSZHALMAZ-HIERARCHIÁJA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-squares',
          name: 'Négyzetek halmaza',
          description: 'Mind a 4 szög derékszög (90°) ÉS mind a 4 oldal egyenlő',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-rect-non-sq',
          name: 'Téglalapok (nem négyzetek)',
          description: 'Mind a 4 szög derékszög (90°), de a szomszédos oldalak különböznek',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-non-rect-quads',
          name: 'Egyéb négyszögek (nem téglalapok)',
          description: 'Nem minden szögük derékszög (pl. rombusz, trapéz, deltoid, általános négyszög)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          label: 'Kis négyzet (4 cm × 4 cm)',
          category: 'cat-squares',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="7" y="7" width="18" height="18" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-2',
          label: 'Csúcsára fordított négyzet',
          category: 'cat-squares',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,16 16,28 4,16" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
              <path d="M 16 7 L 18 9 L 16 11" className="stroke-emerald-700" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 's3-3',
          label: 'Nagy négyzet (10 cm × 10 cm)',
          category: 'cat-squares',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-4',
          label: 'Fekvő téglalap (8 cm × 4 cm)',
          category: 'cat-rect-non-sq',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="10" width="26" height="12" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-5',
          label: 'Álló téglalap (3 cm × 9 cm)',
          category: 'cat-rect-non-sq',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="3" width="12" height="26" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-6',
          label: 'Hosszúkás téglalap (12 cm × 2 cm)',
          category: 'cat-rect-non-sq',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="12" width="28" height="8" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-7',
          label: 'Rombusz (hegyesszögekkel)',
          category: 'cat-non-rect-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 27,16 16,29 5,16" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-8',
          label: 'Egyenlő szárú trapéz',
          category: 'cat-non-rect-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,8 23,8 28,24 4,24" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-9',
          label: 'Paralelogramma (ferde oldalak)',
          category: 'cat-non-rect-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,8 27,8 23,24 5,24" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 's3-10',
          label: 'Deltoid',
          category: 'cat-non-rect-quads',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 26,12 16,29 6,12" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        }
      ]
    }
  };

  return (
    <SorterTemplate
      level={currentLevel}
      currentLevel={currentLevel}
      title="Halmazok Csoportosító"
      subtitle="5. osztály • III. Bevezetés a geometriába • 2. Halmazok"
      badge="5. OSZTÁLY • HALMAZOK CSOPORTOSÍTÓ"
      levels={levels}
      levelConfigs={levels}
      themeColor="violet"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default SetsSorter;
