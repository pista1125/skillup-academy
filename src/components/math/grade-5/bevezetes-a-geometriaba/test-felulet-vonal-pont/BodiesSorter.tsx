import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface BodiesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const BodiesSorter: React.FC<BodiesSorterProps> = ({
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
    // 1. SZINT: DIMENZIÓK SZERINTI CSOPORTOSÍTÁS (0D/1D vs. 2D vs. 3D)
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-0d-1d',
          name: 'Pont és Vonal (0D és 1D)',
          description: 'Nincs területük: pont (hely), vagy csak hossza van (szakasz, él, egyenes)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-2d',
          name: 'Felület és Síkidom (2D)',
          description: 'Lapos alakzatok: hosszuk és szélességük van (terület)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-3d',
          name: 'Térbeli Test (3D)',
          description: 'Teret töltenek be: hosszuk, szélességük és magasságuk van (térfogat)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 'i1-1',
          label: 'Csúcspont (P)',
          category: 'cat-0d-1d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="4" className="fill-blue-600" />
            </svg>
          )
        },
        {
          id: 'i1-2',
          label: 'Kocka éle (szakasz)',
          category: 'cat-0d-1d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="16" x2="28" y2="16" className="stroke-blue-600" strokeWidth="3" />
            </svg>
          )
        },
        {
          id: 'i1-3',
          label: 'Egyenes vonal (e)',
          category: 'cat-0d-1d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="2" y1="24" x2="30" y2="8" className="stroke-blue-500" strokeWidth="2.5" />
            </svg>
          )
        },
        {
          id: 'i1-4',
          label: 'Négyzetlap (kocka lapja)',
          category: 'cat-2d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" rx="1.5" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-5',
          label: 'Háromszög alakú síkidom',
          category: 'cat-2d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,26 4,26" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-6',
          label: 'Körlap',
          category: 'cat-2d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-7',
          label: 'Kocka',
          category: 'cat-3d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M6 11 L16 5 L26 11 L16 17 Z" className="fill-purple-200 stroke-purple-600" strokeWidth="1.5" />
              <path d="M6 11 L16 17 L16 27 L6 21 Z" className="fill-purple-400 stroke-purple-700" strokeWidth="1.5" />
              <path d="M16 17 L26 11 L26 21 L16 27 Z" className="fill-purple-300 stroke-purple-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-8',
          label: 'Gömb',
          category: 'cat-3d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" className="fill-purple-100 stroke-purple-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="16" rx="11" ry="4" className="stroke-purple-400" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          )
        },
        {
          id: 'i1-9',
          label: 'Henger',
          category: 'cat-3d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M8 10 L8 22 C8 26 24 26 24 22 L24 10 Z" className="fill-purple-100 stroke-purple-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="10" rx="8" ry="3.5" className="fill-purple-200 stroke-purple-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-10',
          label: 'Téglatest',
          category: 'cat-3d',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M4 12 L16 6 L28 12 L16 18 Z" className="fill-purple-200 stroke-purple-600" strokeWidth="1.5" />
              <path d="M4 12 L16 18 L16 26 L4 20 Z" className="fill-purple-400 stroke-purple-700" strokeWidth="1.5" />
              <path d="M16 18 L28 12 L28 20 L16 26 Z" className="fill-purple-300 stroke-purple-600" strokeWidth="1.5" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SÍKLAPÚ TESTEK (POLIÉDEREK) VS. FORGÁSTESTEK
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-polyhedra',
          name: 'Síklapú testek (Poliéderek)',
          description: 'Minden határoló lapjuk sík sokszög (négyszög, háromszög stb.)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-curved',
          name: 'Görbe felületű testek (Forgástestek)',
          description: 'Legalább egy gömbölyű, görbe felület (palást vagy gömbfelület) határolja',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 'i2-1',
          label: 'Kocka (6 négyzetlap)',
          category: 'cat-polyhedra',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M6 11 L16 5 L26 11 L16 17 Z" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
              <path d="M6 11 L16 17 L16 27 L6 21 Z" className="fill-teal-400 stroke-teal-700" strokeWidth="1.5" />
              <path d="M16 17 L26 11 L26 21 L16 27 Z" className="fill-teal-300 stroke-teal-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-2',
          label: 'Henger (görbe palást)',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M8 10 L8 22 C8 26 24 26 24 22 L24 10 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="10" rx="8" ry="3.5" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-3',
          label: 'Téglatest (6 téglalaplap)',
          category: 'cat-polyhedra',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M4 12 L16 6 L28 12 L16 18 Z" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
              <path d="M4 12 L16 18 L16 26 L4 20 Z" className="fill-teal-400 stroke-teal-700" strokeWidth="1.5" />
              <path d="M16 18 L28 12 L28 20 L16 26 Z" className="fill-teal-300 stroke-teal-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-4',
          label: 'Gömb (görbe gömbfelület)',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="16" rx="11" ry="4" className="stroke-amber-400" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          )
        },
        {
          id: 'i2-5',
          label: 'Négyoldalú gúla (1 négyzet + 4 háromszög)',
          category: 'cat-polyhedra',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 4,24 16,28" className="fill-teal-300 stroke-teal-700" strokeWidth="1.5" />
              <polygon points="16,4 16,28 28,24" className="fill-teal-400 stroke-teal-800" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-6',
          label: 'Kúp (görbe palást)',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 6,24 26,24" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="24" rx="10" ry="3.5" className="fill-amber-300 stroke-amber-700" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-7',
          label: 'Háromoldalú prizma (hasáb)',
          category: 'cat-polyhedra',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="8,8 24,4 28,12" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
              <path d="M8 8 L8 24 L28 28 L28 12 Z" className="fill-teal-300 stroke-teal-700" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-8',
          label: 'Tetraéder (4 háromszöglap)',
          category: 'cat-polyhedra',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 5,24 18,28" className="fill-teal-300 stroke-teal-700" strokeWidth="1.5" />
              <polygon points="16,4 18,28 27,21" className="fill-teal-400 stroke-teal-800" strokeWidth="1.5" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TESTEK CSÚCSAINAK SZÁMA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-0-vertex',
          name: '0 csúcsú testek',
          description: 'Nincs egyetlen csúcspontjuk sem (gömb, henger)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-1-5-vertex',
          name: '1 – 5 csúcsú testek',
          description: 'Kúp (1 csúcs), tetraéder (4 csúcs), négyoldalú gúla (5 csúcs)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-6-more-vertex',
          name: '6 vagy több csúcsú testek',
          description: 'Háromoldalú prizma (6 csúcs), kocka (8 csúcs), téglatest (8 csúcs)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 'i3-1',
          label: 'Gömb (0 csúcs)',
          category: 'cat-0-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-2',
          label: 'Henger (0 csúcs)',
          category: 'cat-0-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M8 10 L8 22 C8 26 24 26 24 22 L24 10 Z" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="10" rx="8" ry="3.5" className="fill-rose-200 stroke-rose-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-3',
          label: 'Kúp (1 csúcs)',
          category: 'cat-1-5-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 6,24 26,24" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
              <circle cx="16" cy="4" r="2.5" className="fill-amber-700" />
            </svg>
          )
        },
        {
          id: 'i3-4',
          label: 'Tetraéder (4 csúcs)',
          category: 'cat-1-5-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 5,24 18,28" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-5',
          label: 'Négyoldalú gúla (5 csúcs)',
          category: 'cat-1-5-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 4,24 16,28" className="fill-amber-300 stroke-amber-700" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-6',
          label: 'Háromoldalú prizma (6 csúcs)',
          category: 'cat-6-more-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="8,8 24,4 28,12" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
              <path d="M8 8 L8 24 L28 28 L28 12 Z" className="fill-emerald-300 stroke-emerald-700" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-7',
          label: 'Kocka (8 csúcs)',
          category: 'cat-6-more-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M6 11 L16 5 L26 11 L16 17 Z" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
              <path d="M6 11 L16 17 L16 27 L6 21 Z" className="fill-emerald-400 stroke-emerald-700" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-8',
          label: 'Téglatest (8 csúcs)',
          category: 'cat-6-more-vertex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M4 12 L16 6 L28 12 L16 18 Z" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
              <path d="M4 12 L16 18 L16 26 L4 20 Z" className="fill-emerald-400 stroke-emerald-700" strokeWidth="1.5" />
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
      title="Test, Felület, Vonal, Pont Csoportosító"
      subtitle="5. osztály • III. Bevezetés a geometriába • 3. Test, felület, vonal, pont"
      badge="5. OSZTÁLY • TESTEK CSOPORTOSÍTÓ"
      levels={levels}
      levelConfigs={levels}
      themeColor="emerald"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default BodiesSorter;
