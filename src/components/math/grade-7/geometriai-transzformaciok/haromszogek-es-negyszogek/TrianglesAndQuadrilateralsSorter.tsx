import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrianglesAndQuadrilateralsSorterProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Háromszögek Csoportosítása Szögeik Szerint',
    subtitle: 'Sorold be a háromszögeket a szögeik és geometriai tulajdonságaik alapján!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszögű háromszög',
        description: 'Mindhárom belső szöge hegyesszög (< 90°)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-right',
        name: 'Derékszögű háromszög',
        description: 'Pontosan egy derékszöge van (= 90°)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszögű háromszög',
        description: 'Pontosan egy tompaszöge van (> 90°)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: '50°, 60°, 70°',
        category: 'cat-acute',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="26,5 10,24 50,24" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <text x="23" y="12" className="text-[6px] font-bold fill-emerald-800">50°</text>
            <text x="13" y="22" className="text-[6px] font-bold fill-emerald-800">60°</text>
            <text x="38" y="22" className="text-[6px] font-bold fill-emerald-800">70°</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: '90°, 45°, 45°',
        category: 'cat-right',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="16,6 16,24 46,24" className="fill-blue-100/50 stroke-blue-600 stroke-[1.5]" />
            <rect x="16" y="18" width="6" height="6" fill="none" className="stroke-blue-500 stroke-[1]" />
            <text x="19" y="11" className="text-[6px] font-bold fill-blue-700">45°</text>
            <text x="36" y="22" className="text-[6px] font-bold fill-blue-700">45°</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: '120°, 30°, 30°',
        category: 'cat-obtuse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,14 10,24 50,24" className="fill-amber-100/50 stroke-amber-600 stroke-[1.5]" />
            <path d="M 26 16 A 6 6 0 0 0 34 16" fill="none" className="stroke-amber-600 stroke-[1]" />
            <text x="24" y="11" className="text-[6px] font-bold fill-amber-800">120°</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Szabályos (60°, 60°, 60°)',
        category: 'cat-acute',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,5 13,24 47,24" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <text x="25" y="18" className="text-[7px] font-bold fill-emerald-800">60°</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: '90°, 60°, 30°',
        category: 'cat-right',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="14,5 14,24 50,24" className="fill-blue-100/50 stroke-blue-600 stroke-[1.5]" />
            <rect x="14" y="18" width="6" height="6" fill="none" className="stroke-blue-500 stroke-[1]" />
            <text x="17" y="11" className="text-[6px] font-bold fill-blue-700">60°</text>
            <text x="40" y="22" className="text-[6px] font-bold fill-blue-700">30°</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: '105°, 40°, 35°',
        category: 'cat-obtuse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="22,12 8,24 52,24" className="fill-amber-100/50 stroke-amber-600 stroke-[1.5]" />
            <text x="18" y="10" className="text-[6px] font-bold fill-amber-800">105°</text>
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Befogók és átfogó (a, b, c)',
        category: 'cat-right',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="16,6 16,24 48,24" fill="none" className="stroke-blue-600 stroke-[1.5]" />
            <rect x="16" y="18" width="6" height="6" fill="none" className="stroke-blue-500 stroke-[1]" />
            <text x="8" y="16" className="text-[7px] font-bold fill-blue-700">b</text>
            <text x="30" y="23" className="text-[7px] font-bold fill-blue-700">a</text>
            <text x="33" y="13" className="text-[7px] font-bold fill-blue-700">c</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Köré írt kör kp. kívül',
        category: 'cat-obtuse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="28,15 12,24 48,24" className="fill-amber-100/50 stroke-amber-600 stroke-[1.5]" />
            <circle cx="30" cy="5" r="2.5" className="fill-amber-700" />
            <text x="34" y="8" className="text-[8px] font-bold fill-amber-700">O</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Magasságpont a belsőben (M)',
        category: 'cat-acute',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="28,4 12,24 48,24" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <line x1="28" y1="4" x2="28" y2="24" className="stroke-emerald-400 stroke-[1]" />
            <circle cx="28" cy="16" r="2" className="fill-emerald-800" />
            <text x="32" y="18" className="text-[7px] font-bold fill-emerald-800">M</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Thalész-tétel (átmérő = átfogó)',
        category: 'cat-right',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <path d="M 12 24 A 18 18 0 0 1 48 24 Z" fill="none" className="stroke-blue-400 stroke-[1] stroke-dasharray-[2,2]" />
            <polygon points="12,24 24,8 48,24" className="fill-blue-100/40 stroke-blue-600 stroke-[1.5]" />
            <rect x="23" y="11" width="4" height="4" fill="none" className="stroke-blue-600 stroke-[1]" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Négyszögek Fajtái és Családfája',
    subtitle: 'Válogasd szét a négyszögeket a megfelelő családba!',
    categories: [
      {
        id: 'cat-trapezoid',
        name: 'Trapézok családja',
        description: 'Legalább 1 pár párhuzamos oldal (alapok)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-parallelogram',
        name: 'Paralelogrammák családja',
        description: '2 pár párhuzamos oldal (téglalap, rombusz, négyzet)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-kite',
        name: 'Deltoid',
        description: '2-2 szomszédos oldal egyenlő, főátlója szimmetriatengely',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: 'Húrtrapéz (szimmetrikus)',
        category: 'cat-trapezoid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="20,7 40,7 48,23 12,23" className="fill-teal-100/60 stroke-teal-600 stroke-[1.5]" />
            <line x1="30" y1="5" x2="30" y2="25" className="stroke-teal-400 stroke-[1] stroke-dasharray-[2,2]" />
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Téglalap (4 derékszög)',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <rect x="12" y="7" width="36" height="15" rx="1" className="fill-indigo-100/60 stroke-indigo-600 stroke-[1.5]" />
            <rect x="12" y="7" width="5" height="5" fill="none" className="stroke-indigo-400 stroke-[1]" />
            <rect x="43" y="7" width="5" height="5" fill="none" className="stroke-indigo-400 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Rombusz (4 egyenlő oldal)',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 48,14 30,24 12,14" className="fill-indigo-100/60 stroke-indigo-600 stroke-[1.5]" />
            <line x1="20" y1="8" x2="22" y2="10" className="stroke-indigo-600 stroke-[1.2]" />
            <line x1="38" y1="8" x2="40" y2="10" className="stroke-indigo-600 stroke-[1.2]" />
            <line x1="20" y1="18" x2="22" y2="20" className="stroke-indigo-600 stroke-[1.2]" />
            <line x1="38" y1="18" x2="40" y2="20" className="stroke-indigo-600 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Négyzet (szabályos négyszög)',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <rect x="20" y="5" width="20" height="19" className="fill-indigo-100/60 stroke-indigo-600 stroke-[1.5]" />
            <rect x="20" y="5" width="5" height="5" fill="none" className="stroke-indigo-400 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Papírsárkány deltoid',
        category: 'cat-kite',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 46,12 30,24 14,12" className="fill-rose-100/60 stroke-rose-600 stroke-[1.5]" />
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-rose-400 stroke-[1.2] stroke-dasharray-[2,2]" />
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Derékszögű trapéz',
        category: 'cat-trapezoid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="16,7 38,7 48,23 16,23" className="fill-teal-100/60 stroke-teal-600 stroke-[1.5]" />
            <rect x="16" y="7" width="5" height="5" fill="none" className="stroke-teal-500 stroke-[1]" />
            <rect x="16" y="18" width="5" height="5" fill="none" className="stroke-teal-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Átlók felezik egymást',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,7 48,7 42,23 12,23" fill="none" className="stroke-indigo-500 stroke-[1.2]" />
            <line x1="18" y1="7" x2="42" y2="23" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="48" y1="7" x2="12" y2="23" className="stroke-indigo-600 stroke-[1.5]" />
            <circle cx="30" cy="15" r="2" className="fill-indigo-700" />
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Párhuzamos alapok (a ∥ c)',
        category: 'cat-trapezoid',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="22,7 42,7 50,23 10,23" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <path d="M 31 7 L 33 5 L 33 9 Z" className="fill-teal-600" />
            <path d="M 29 23 L 31 21 L 31 25 Z" className="fill-teal-600" />
          </svg>
        )
      },
      {
        id: 's19',
        label: 'Főátló merőleges felező',
        category: 'cat-kite',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 46,12 30,24 14,12" fill="none" className="stroke-rose-400 stroke-[1.2]" />
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-rose-600 stroke-[1.8]" />
            <line x1="14" y1="12" x2="46" y2="12" className="stroke-rose-600 stroke-[1.5]" />
            <rect x="30" y="12" width="4" height="4" fill="none" className="stroke-rose-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Középpontos szimmetria (O)',
        category: 'cat-parallelogram',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,7 48,7 42,23 12,23" className="fill-indigo-100/50 stroke-indigo-600 stroke-[1.5]" />
            <circle cx="30" cy="15" r="2.5" className="fill-indigo-700" />
            <text x="33" y="16" className="text-[7px] font-bold fill-indigo-700">O</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Átlók Tulajdonságai és Szimmetriák',
    subtitle: 'Csoportosítsd a síkidomokat és állításokat az átlóik tulajdonsága szerint!',
    categories: [
      {
        id: 'cat-diag-perp',
        name: 'Merőleges átlók (e ⊥ f)',
        description: 'Rombusz, deltoid, négyzet',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-diag-equal',
        name: 'Egyenlő átlók (e = f)',
        description: 'Téglalap, négyzet, húrtrapéz',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-diag-bisect',
        name: 'Egymást felező átlók',
        description: 'Minden paralelogramma alapvető tulajdonsága',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'Rombusz merőleges átlói',
        category: 'cat-diag-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 48,14 30,24 12,14" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-purple-600 stroke-[1.8]" />
            <line x1="12" y1="14" x2="48" y2="14" className="stroke-purple-600 stroke-[1.8]" />
            <rect x="30" y="14" width="4" height="4" fill="none" className="stroke-purple-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Téglalap egyenlő átlói',
        category: 'cat-diag-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <rect x="12" y="7" width="36" height="15" rx="1" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="12" y1="7" x2="48" y2="22" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="12" y1="22" x2="48" y2="7" className="stroke-blue-600 stroke-[1.8]" />
            <text x="26" y="12" className="text-[7px] font-bold fill-blue-700">e = f</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Húrtrapéz egyenlő átlói',
        category: 'cat-diag-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="20,7 40,7 48,23 12,23" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="20" y1="7" x2="48" y2="23" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="40" y1="7" x2="12" y2="23" className="stroke-blue-600 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Deltoid merőleges átlói',
        category: 'cat-diag-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 46,12 30,24 14,12" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-purple-600 stroke-[1.8]" />
            <line x1="14" y1="12" x2="46" y2="12" className="stroke-purple-600 stroke-[1.8]" />
            <rect x="30" y="12" width="4" height="4" fill="none" className="stroke-purple-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Paralelogramma felező átlói',
        category: 'cat-diag-bisect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,7 48,7 42,23 12,23" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="18" y1="7" x2="42" y2="23" className="stroke-emerald-600 stroke-[1.8]" />
            <line x1="48" y1="7" x2="12" y2="23" className="stroke-emerald-600 stroke-[1.8]" />
            <circle cx="30" cy="15" r="2" className="fill-emerald-700" />
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Rombusz: átlók szögfelezők',
        category: 'cat-diag-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 48,14 30,24 12,14" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-purple-600 stroke-[1.6]" />
            <path d="M 28 8 A 4 4 0 0 0 32 8" fill="none" className="stroke-purple-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Téglalap köré írt kör (d = 2R)',
        category: 'cat-diag-equal',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="13" fill="none" className="stroke-blue-400 stroke-[1] stroke-dasharray-[2,2]" />
            <rect x="18" y="8" width="24" height="13" fill="none" className="stroke-slate-600 stroke-[1.2]" />
            <line x1="18" y1="8" x2="42" y2="21" className="stroke-blue-600 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Középpontosan feleződő átlók',
        category: 'cat-diag-bisect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="14" y1="21" x2="46" y2="7" className="stroke-emerald-600 stroke-[1.8]" />
            <line x1="18" y1="7" x2="42" y2="21" className="stroke-emerald-600 stroke-[1.8]" />
            <circle cx="30" cy="14" r="2.5" className="fill-emerald-700" />
            <text x="33" y="16" className="text-[7px] font-bold fill-emerald-800">O</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Négyzet átlói (e ⊥ f)',
        category: 'cat-diag-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <rect x="21" y="5" width="18" height="18" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="21" y1="5" x2="39" y2="23" className="stroke-purple-600 stroke-[1.8]" />
            <line x1="21" y1="23" x2="39" y2="5" className="stroke-purple-600 stroke-[1.8]" />
            <rect x="29" y="13" width="3" height="3" fill="none" className="stroke-purple-600 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Szemközti csúcsok felezője azonos',
        category: 'cat-diag-bisect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="16,8 46,8 40,22 10,22" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <circle cx="28" cy="15" r="2.5" className="fill-emerald-600" />
            <line x1="16" y1="8" x2="28" y2="15" className="stroke-emerald-500 stroke-[1] stroke-dasharray-[2,2]" />
            <line x1="40" y1="22" x2="28" y2="15" className="stroke-emerald-500 stroke-[1] stroke-dasharray-[2,2]" />
          </svg>
        )
      }
    ]
  }
};

export const TrianglesAndQuadrilateralsSorter: React.FC<TrianglesAndQuadrilateralsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-triangles-quads',
  topicTitle = '3. Háromszögek és négyszögek'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Háromszögek és Négyszögek Csoportosító"
      subtitle="Válaszd ki a kártyát, majd kattints a megfelelő geometriai kategóriára a besoroláshoz!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default TrianglesAndQuadrilateralsSorter;
