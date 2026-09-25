import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CircleSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A Kör Elemeinek Típusa',
    subtitle: 'Csoportosítsd a fogalmakat aszerint, hogy vonalas elemek (1D), síkrészek (2D), vagy pontok (0D)!',
    categories: [
      {
        id: 'cat-line',
        name: 'Vonalas elem (1D szakasz / ív)',
        description: 'Vonaljellegű geometriai alakzat (sugár, átmérő, húr, ív)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-area',
        name: 'Síkrész / Terület (2D)',
        description: 'Kétdimenziós terület, körlap vagy annak részei',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-point',
        name: 'Pont (0D)',
        description: 'Kiterjedés nélküli geometriai pont a körön vagy a síkban',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: 'Sugár (r)',
        category: 'cat-line',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="30" y1="14" x2="40" y2="14" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's1-2',
        label: 'Körcikk (szektor)',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 30 14 L 40 14 A 10 10 0 0 0 37 7 Z" fill="#10b981" stroke="#059669" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-3',
        label: 'Átmérő (d = 2r)',
        category: 'cat-line',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="20" y1="14" x2="40" y2="14" stroke="#4f46e5" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's1-4',
        label: 'Körszelet (szegmens)',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 23 8 A 10 10 0 0 1 37 20 Z" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-5',
        label: 'Középpont (O)',
        category: 'cat-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="3.5" fill="#4f46e5" />
            <text x="36" y="17" className="text-[9px] font-bold fill-indigo-700">O</text>
          </svg>
        )
      },
      {
        id: 's1-6',
        label: 'Húr',
        category: 'cat-line',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="23" y1="8" x2="37" y2="20" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's1-7',
        label: 'Körgyűrű',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1" />
            <circle cx="30" cy="14" r="6" fill="#ffffff" stroke="#a855f7" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-8',
        label: 'Körív (⌢AB)',
        category: 'cat-line',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            <path d="M 37 7 A 10 10 0 0 1 40 14" fill="none" stroke="#10b981" strokeWidth="2.5" />
          </svg>
        )
      },
      {
        id: 's1-9',
        label: 'Érintési pont (E)',
        category: 'cat-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="11" r="9" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="20" x2="45" y2="20" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="30" cy="20" r="2.5" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 's1-10',
        label: 'Körlap (körlemez)',
        category: 'cat-area',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
          </svg>
        )
      }
    ]
  },

  2: {
    title: '2. Szint: Egyenes és Kör Kölcsönös Helyzete',
    subtitle: 'Sorold be az egyeneseket a távolságuk és a kör sugara alapján!',
    categories: [
      {
        id: 'cat-secant',
        name: 'Szelő egyenes (2 pont, d < r)',
        description: 'Metszi a kört két különböző pontban',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-tangent',
        name: 'Érintő egyenes (1 pont, d = r)',
        description: 'Pontosan 1 közös pontja van a körrel (e ⊥ r)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-passer',
        name: 'Elkerülő egyenes (0 pont, d > r)',
        description: 'Nincs közös pontja a körvonallal',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'r = 5 cm, d = 3 cm',
        category: 'cat-secant',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="9" x2="45" y2="9" stroke="#0284c7" strokeWidth="1.8" />
          </svg>
        )
      },
      {
        id: 's2-2',
        label: 'r = 8 cm, d = 8 cm',
        category: 'cat-tangent',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="12" r="9" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="21" x2="45" y2="21" stroke="#d97706" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's2-3',
        label: 'r = 10 cm, d = 12 cm',
        category: 'cat-passer',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="11" r="8" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="23" x2="45" y2="23" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's2-4',
        label: 'Átmegy a középponton (d = 0)',
        category: 'cat-secant',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="12" y1="14" x2="48" y2="14" stroke="#0284c7" strokeWidth="1.8" />
          </svg>
        )
      },
      {
        id: 's2-5',
        label: 'd = 7 cm, átmérő = 14 cm',
        category: 'cat-tangent',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="12" r="9" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="21" x2="45" y2="21" stroke="#d97706" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's2-6',
        label: 'd = 15 cm, átmérő = 20 cm (r = 10 cm)',
        category: 'cat-passer',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="11" r="8" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="23" x2="45" y2="23" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's2-7',
        label: 'd = 4 cm, átmérő = 10 cm (r = 5 cm)',
        category: 'cat-secant',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="10" x2="45" y2="10" stroke="#0284c7" strokeWidth="1.8" />
          </svg>
        )
      },
      {
        id: 's2-8',
        label: 'Sugárra merőleges a körvonalon (e ⊥ r)',
        category: 'cat-tangent',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="12" r="9" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="21" x2="45" y2="21" stroke="#d97706" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's2-9',
        label: 'd = 25 mm, sugár = 2 cm (20 mm)',
        category: 'cat-passer',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="11" r="8" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="23" x2="45" y2="23" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's2-10',
        label: 'd = 0.5 dm (5 cm), r = 50 mm (5 cm)',
        category: 'cat-tangent',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="12" r="9" fill="none" stroke="#e11d48" strokeWidth="1" />
            <line x1="15" y1="21" x2="45" y2="21" stroke="#d97706" strokeWidth="2" />
          </svg>
        )
      }
    ]
  },

  3: {
    title: '3. Szint: Két Kör Közös Pontjainak Száma',
    subtitle: 'Határozd meg a két kör közös pontjainak számát a sugarak és a távolság alapján!',
    categories: [
      {
        id: 'cat-zero',
        name: '0 közös pont (külön vagy egymásban)',
        description: 'd > r₁ + r₂ vagy d < |r₁ - r₂| (nincs metszés)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      },
      {
        id: 'cat-one',
        name: '1 közös pont (kívül vagy belül érintő)',
        description: 'd = r₁ + r₂ vagy d = |r₁ - r₂|',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-two',
        name: '2 közös pont (metsző körök)',
        description: '|r₁ - r₂| < d < r₁ + r₂',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: 'r₁ = 7 cm, r₂ = 3 cm, d = 10 cm',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="23" cy="14" r="8" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="37" cy="14" r="6" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-2',
        label: 'r₁ = 7 cm, r₂ = 3 cm, d = 4 cm',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="34" cy="14" r="6" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-3',
        label: 'r₁ = 7 cm, r₂ = 3 cm, d = 6 cm',
        category: 'cat-two',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="26" cy="14" r="9" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="34" cy="14" r="7" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-4',
        label: 'r₁ = 7 cm, r₂ = 3 cm, d = 12 cm',
        category: 'cat-zero',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="18" cy="14" r="7" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="42" cy="14" r="5" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-5',
        label: 'r₁ = 7 cm, r₂ = 3 cm, d = 2 cm',
        category: 'cat-zero',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="32" cy="14" r="5" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-6',
        label: 'r₁ = 5 cm, r₂ = 2 cm, d = 0 cm (koncentrikus)',
        category: 'cat-zero',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="5" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-7',
        label: 'r₁ = 6 cm, r₂ = 6 cm, d = 8 cm',
        category: 'cat-two',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="26" cy="14" r="8" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="34" cy="14" r="8" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-8',
        label: 'r₁ = 9 cm, r₂ = 4 cm, d = 13 cm',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="23" cy="14" r="9" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="37" cy="14" r="5" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-9',
        label: 'r₁ = 10 cm, r₂ = 6 cm, d = 4 cm',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="34" cy="14" r="7" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's3-10',
        label: 'r₁ = 8 cm, r₂ = 5 cm, d = 7 cm',
        category: 'cat-two',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="26" cy="14" r="9" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="34" cy="14" r="7" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      }
    ]
  }
};

export const CircleSorter: React.FC<CircleSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-circle',
  topicTitle = '12. A Kör'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={currentLevel || level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default CircleSorter;
