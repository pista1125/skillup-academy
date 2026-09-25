import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RegularPolygonsSorterProps {
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
    title: '1. Szint: Szabályosság és Szimmetriaközéppont',
    subtitle: 'Csoportosítsd az alakzatokat aszerint, hogy páros/páratlan csúcsú szabályos sokszögek, vagy egyáltalán nem szabályosak!',
    categories: [
      {
        id: 'cat-even-regular',
        name: 'Páros csúcsszámú szabályos (Van centrum)',
        description: 'Szabályos sokszög és páros számú csúcsa van (középpontosan szimmetrikus)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-odd-regular',
        name: 'Páratlan csúcsszámú szabályos (Nincs centrum)',
        description: 'Szabályos sokszög, de páratlan számú csúcsa van (180°-ra nem fedi önmagát)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-not-regular',
        name: 'NEM szabályos sokszög',
        description: 'Nem teljesül az egyenlő oldalak ÉS egyenlő szögek feltétele',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: 'Négyzet (szabályos 4-szög)',
        category: 'cat-even-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="22" y="6" width="16" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's1-2',
        label: 'Szabályos háromszög (n = 3)',
        category: 'cat-odd-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 18,23 42,23" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-3',
        label: 'Szabályos hatszög (n = 6)',
        category: 'cat-even-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="24,6 36,6 42,14 36,22 24,22 18,14" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's1-4',
        label: 'Szabályos ötszög (n = 5)',
        category: 'cat-odd-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 42,13 37,23 23,23 18,13" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-5',
        label: 'Rombusz (hegyesszögű)',
        category: 'cat-not-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 45,14 30,23 15,14" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-6',
        label: 'Szabályos nyolcszög (n = 8)',
        category: 'cat-even-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="25,6 35,6 41,11 41,17 35,22 25,22 19,17 19,11" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's1-7',
        label: 'Szabályos hétszög (n = 7)',
        category: 'cat-odd-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[9px] font-bold fill-red-700">7</text>
          </svg>
        )
      },
      {
        id: 's1-8',
        label: 'Téglalap (a ≠ b)',
        category: 'cat-not-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="15" y="8" width="30" height="12" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-9',
        label: 'Szabályos tízszög (n = 10)',
        category: 'cat-even-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
            <text x="30" y="17" textAnchor="middle" className="text-[9px] font-bold fill-green-800">10</text>
          </svg>
        )
      },
      {
        id: 's1-10',
        label: 'Egyenlő szárú trapéz',
        category: 'cat-not-regular',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="22,7 38,7 46,21 14,21" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Belső Szög Nagysága (α)',
    subtitle: 'Válogasd szét a szabályos sokszögeket egy belső szögük nagysága szerint!',
    categories: [
      {
        id: 'cat-angle-small',
        name: 'Belső szög < 100° (Hegyesszög / Derékszög)',
        description: 'α ≤ 90° (Szabályos 3-szög és négyzet)',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-angle-mid',
        name: 'Belső szög 100° – 130° között (Közepes tompaszög)',
        description: '100° < α < 130° (Ötszög, hatszög, hétszög)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-angle-large',
        name: 'Belső szög ≥ 135° (Nagy tompaszög)',
        description: 'α ≥ 135° (Nyolcszögtől felfelé)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'Szabályos 3-szög (α = 60°)',
        category: 'cat-angle-small',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 18,23 42,23" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <text x="30" y="21" textAnchor="middle" className="text-[8px] font-bold fill-sky-800">60°</text>
          </svg>
        )
      },
      {
        id: 's2-2',
        label: 'Négyzet (α = 90°)',
        category: 'cat-angle-small',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="22" y="6" width="16" height="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-sky-800">90°</text>
          </svg>
        )
      },
      {
        id: 's2-3',
        label: 'Szabályos 5-szög (α = 108°)',
        category: 'cat-angle-mid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 42,13 37,23 23,23 18,13" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="30" y="18" textAnchor="middle" className="text-[8px] font-bold fill-amber-800">108°</text>
          </svg>
        )
      },
      {
        id: 's2-4',
        label: 'Szabályos 6-szög (α = 120°)',
        category: 'cat-angle-mid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="24,6 36,6 42,14 36,22 24,22 18,14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-amber-800">120°</text>
          </svg>
        )
      },
      {
        id: 's2-5',
        label: 'Szabályos 7-szög (α ≈ 128,6°)',
        category: 'cat-angle-mid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[7px] font-bold fill-amber-800">128.6°</text>
          </svg>
        )
      },
      {
        id: 's2-6',
        label: 'Szabályos 8-szög (α = 135°)',
        category: 'cat-angle-large',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="25,6 35,6 41,11 41,17 35,22 25,22 19,17 19,11" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-purple-800">135°</text>
          </svg>
        )
      },
      {
        id: 's2-7',
        label: 'Szabályos 9-szög (α = 140°)',
        category: 'cat-angle-large',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-purple-800">140°</text>
          </svg>
        )
      },
      {
        id: 's2-8',
        label: 'Szabályos 10-szög (α = 144°)',
        category: 'cat-angle-large',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-purple-800">144°</text>
          </svg>
        )
      },
      {
        id: 's2-9',
        label: 'Szabályos 12-szög (α = 150°)',
        category: 'cat-angle-large',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-purple-800">150°</text>
          </svg>
        )
      },
      {
        id: 's2-10',
        label: 'Szabályos 18-szög (α = 160°)',
        category: 'cat-angle-large',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="9" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <text x="30" y="17" textAnchor="middle" className="text-[8px] font-bold fill-purple-800">160°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Átlók Száma Szerinti Besorolás',
    subtitle: 'Sorold be a sokszögeket az összes átlójuk száma szerint [An = n · (n - 3) / 2]!',
    categories: [
      {
        id: 'cat-diag-few',
        name: 'Kevés átló (0 – 5 db)',
        description: 'An ≤ 5 (Háromszög, négyszög, ötszög)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-diag-med',
        name: 'Közepes átlószám (9 – 20 db)',
        description: '9 ≤ An ≤ 20 (Hatszög, hétszög, nyolcszög)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-diag-many',
        name: 'Sok átló (27 db-tól felfelé)',
        description: 'An ≥ 27 (Kilencszög, tízszög, 11-szög, 12-szög)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: 'Szabályos 3-szög (0 átló)',
        category: 'cat-diag-few',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-700">0 átló</text>
          </svg>
        )
      },
      {
        id: 's3-2',
        label: 'Négyzet (2 átló)',
        category: 'cat-diag-few',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-700">2 átló</text>
          </svg>
        )
      },
      {
        id: 's3-3',
        label: 'Szabályos 5-szög (5 átló)',
        category: 'cat-diag-few',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-emerald-700">5 átló</text>
          </svg>
        )
      },
      {
        id: 's3-4',
        label: 'Szabályos 6-szög (9 átló)',
        category: 'cat-diag-med',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-amber-700">9 átló</text>
          </svg>
        )
      },
      {
        id: 's3-5',
        label: 'Szabályos 7-szög (14 átló)',
        category: 'cat-diag-med',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-amber-700">14 átló</text>
          </svg>
        )
      },
      {
        id: 's3-6',
        label: 'Szabályos 8-szög (20 átló)',
        category: 'cat-diag-med',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-amber-700">20 átló</text>
          </svg>
        )
      },
      {
        id: 's3-7',
        label: 'Szabályos 9-szög (27 átló)',
        category: 'cat-diag-many',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">27 átló</text>
          </svg>
        )
      },
      {
        id: 's3-8',
        label: 'Szabályos 10-szög (35 átló)',
        category: 'cat-diag-many',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">35 átló</text>
          </svg>
        )
      },
      {
        id: 's3-9',
        label: 'Szabályos 11-szög (44 átló)',
        category: 'cat-diag-many',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">44 átló</text>
          </svg>
        )
      },
      {
        id: 's3-10',
        label: 'Szabályos 12-szög (54 átló)',
        category: 'cat-diag-many',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="30" y="18" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">54 átló</text>
          </svg>
        )
      }
    ]
  }
};

export const RegularPolygonsSorter: React.FC<RegularPolygonsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-regular-polygons-sorter',
  topicTitle = '11. Szabályos sokszögek'
}) => {
  const effectiveLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={effectiveLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="orange"
    />
  );
};
