import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GroupingSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const GroupingSorter: React.FC<GroupingSorterProps> = ({
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
    // 1. SZINT: SÍKIDOMOK (2D) VS. TÉRBELI TESTEK (3D)
    // ========================================================
    1: {
      categories: [
        {
          id: '2D',
          name: 'Síkidomok (2D alakzatok)',
          description: 'Lapos alakzatok, csak hosszúságuk és szélességük van',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: '3D',
          name: 'Térbeli testek (3D alakzatok)',
          description: 'Teret töltenek be, lapok/felületek határolják őket',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 'i1-1',
          label: 'Négyzet',
          category: '2D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="2" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-2',
          label: 'Kocka',
          category: '3D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M6 11 L16 5 L26 11 L16 17 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
              <path d="M6 11 L16 17 L16 27 L6 21 Z" className="fill-blue-400 stroke-blue-700" strokeWidth="1.5" />
              <path d="M16 17 L26 11 L26 21 L16 27 Z" className="fill-blue-300 stroke-blue-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-3',
          label: 'Kör',
          category: '2D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-4',
          label: 'Gömb',
          category: '3D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" className="fill-blue-100 stroke-blue-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="16" rx="11" ry="4" className="stroke-blue-400" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M5 16 C5 20 27 20 27 16" className="stroke-blue-500" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-5',
          label: 'Háromszög',
          category: '2D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,26 4,26" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-6',
          label: 'Téglatest',
          category: '3D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M4 11 L20 6 L28 11 L12 16 Z" className="fill-blue-100 stroke-blue-600" strokeWidth="1.5" />
              <path d="M4 11 L12 16 L12 26 L4 21 Z" className="fill-blue-300 stroke-blue-700" strokeWidth="1.5" />
              <path d="M12 16 L28 11 L28 21 L12 26 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-7',
          label: 'Téglalap',
          category: '2D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="8" width="26" height="16" rx="2" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-8',
          label: 'Henger',
          category: '3D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M8 10 L8 22 C8 26 24 26 24 22 L24 10 Z" className="fill-blue-100 stroke-blue-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="22" rx="8" ry="3" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="10" rx="8" ry="3" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-9',
          label: 'Szabályos ötszög',
          category: '2D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,13 23,27 9,27 4,13" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-10',
          label: 'Kúp',
          category: '3D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M16 5 L5 24 C5 28 27 28 27 24 Z" className="fill-blue-100 stroke-blue-600" strokeWidth="1.5" />
              <ellipse cx="16" cy="24" rx="11" ry="3" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-11',
          label: 'Rombusz',
          category: '2D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 27,16 16,28 5,16" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-12',
          label: 'Gúla (Piramis)',
          category: '3D',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,5 5,26 27,26" className="fill-blue-100 stroke-blue-600" strokeWidth="1.5" />
              <line x1="16" y1="5" x2="18" y2="26" className="stroke-blue-700" strokeWidth="1.5" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HATÁROLÓ VONALAK (EGYENES VS. GÖRBE)
    // ========================================================
    2: {
      categories: [
        {
          id: 'straight',
          name: 'Csak egyenesek határolják (Sokszögek)',
          description: 'Minden oldala egyenes szakasz, csúcsokkal kapcsolódnak',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'curved',
          name: 'Görbe vonal(ak) is határolják',
          description: 'Van olyan határvonala, amelyik görbe vagy ívelt',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 'i2-1',
          label: 'Háromszög',
          category: 'straight',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,26 4,26" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-2',
          label: 'Kör',
          category: 'curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-3',
          label: 'Négyzet',
          category: 'straight',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" rx="1" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-4',
          label: 'Ellipszis',
          category: 'curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <ellipse cx="16" cy="16" rx="13" ry="8" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-5',
          label: 'Trapéz',
          category: 'straight',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,9 23,9 29,24 3,24" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-6',
          label: 'Félkör',
          category: 'curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M4 22 A12 12 0 0 1 28 22 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-7',
          label: 'Szabályos hatszög',
          category: 'straight',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,5 26,10 26,22 16,27 6,22 6,10" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-8',
          label: 'Körgyűrű',
          category: 'curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
              <circle cx="16" cy="16" r="6" className="fill-white stroke-amber-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-9',
          label: 'Paralelogramma',
          category: 'straight',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,8 27,8 23,24 5,24" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-10',
          label: 'Cseppalak',
          category: 'curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M16 4 C10 14 6 18 6 22 A10 10 0 0 0 26 22 C26 18 22 14 16 4 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i2-11',
          label: 'Deltoid',
          category: 'straight',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 26,14 16,28 6,14" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-12',
          label: 'Szív alakzat',
          category: 'curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M16 27 C16 27 5 19 5 12 A6 6 0 0 1 16 9 A6 6 0 0 1 27 12 C27 19 16 27 16 27 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: OLDALAK SZÁMA SZERINTI SOKSZÖG-VÁLOGATÁS
    // ========================================================
    3: {
      categories: [
        {
          id: '3-sides',
          name: 'Háromszögek (3 oldal)',
          description: 'Pontosan 3 oldala és 3 csúcsa van',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: '4-sides',
          name: 'Négyszögek (4 oldal)',
          description: 'Pontosan 4 oldala és 4 csúcsa van',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'multi-sides',
          name: 'Egyéb sokszögek (5 vagy több oldal)',
          description: 'Ötszögek, hatszögek, nyolcszögek...',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 'i3-1',
          label: 'Egyenlő oldalú háromszög',
          category: '3-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,5 28,26 4,26" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-2',
          label: 'Négyzet',
          category: '4-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" rx="1" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-3',
          label: 'Szabályos ötszög',
          category: 'multi-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,13 23,27 9,27 4,13" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-4',
          label: 'Derékszögű háromszög',
          category: '3-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="6,6 6,26 26,26" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-5',
          label: 'Téglalap',
          category: '4-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="8" width="26" height="16" rx="1" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-6',
          label: 'Szabályos hatszög',
          category: 'multi-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,5 26,10 26,22 16,27 6,22 6,10" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-7',
          label: 'Egyenlő szárú háromszög',
          category: '3-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 25,27 7,27" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-8',
          label: 'Rombusz',
          category: '4-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 27,16 16,28 5,16" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-9',
          label: 'Szabályos nyolcszög',
          category: 'multi-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="11,5 21,5 27,11 27,21 21,27 11,27 5,21 5,11" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-10',
          label: 'Tompaszögű háromszög',
          category: '3-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="6,12 28,26 12,26" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-11',
          label: 'Trapéz',
          category: '4-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,9 23,9 29,24 3,24" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-12',
          label: 'Tízszög',
          category: 'multi-sides',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 23,6 27,12 27,20 23,26 16,28 9,26 5,20 5,12 9,6" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
            </svg>
          )
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-geom-grouping-sorter"
      title="Csoportosító Játék: Alakzatok Válogatása"
      subtitle="Húzd vagy kattintsd az alakzatokat a megfelelő kategóriákba!"
      badge="📦 5. Osztály • III. Geometria"
      themeColor="blue"
      level={currentLevel}
      levels={levels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default GroupingSorter;
