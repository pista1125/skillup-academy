import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricConceptsSorterProps {
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
    title: '1. Szint: Alakzatok Dimenzió Szerinti Csoportosítása',
    subtitle: 'Sorold be a geometriai alakzatokat kiterjedésük szerint (0D, 1D, 2D, 3D)!',
    categories: [
      { id: 'cat-0d', name: '0 dimenziós (0D)', description: 'Nincs kiterjedése, helyzetet jelöl', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' },
      { id: 'cat-1d', name: '1 dimenziós (1D)', description: 'Hosszúsággal rendelkezik (vonal)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-2d', name: '2 dimenziós (2D)', description: 'Felülettel rendelkezik (sík)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-3d', name: '3 dimenziós (3D)', description: 'Térfogattal rendelkezik (test / tér)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      {
        id: 's1',
        label: 'Pont (P)',
        category: 'cat-0d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3.5" className="fill-teal-600" />
            <circle cx="30" cy="14" r="8" fill="none" className="stroke-teal-400 stroke-[1.2]" strokeDasharray="2 2" />
            <text x="37" y="17" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">P</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Egyenes (e)',
        category: 'cat-1d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="6" y1="18" x2="54" y2="10" className="stroke-blue-600 stroke-[2]" />
            <text x="48" y="24" className="text-[8px] font-mono font-bold fill-blue-600">e</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Szakasz (AB)',
        category: 'cat-1d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="14" x2="48" y2="14" className="stroke-blue-600 stroke-[2.2]" />
            <circle cx="12" cy="14" r="2.5" className="fill-blue-700" />
            <circle cx="48" cy="14" r="2.5" className="fill-blue-700" />
            <text x="9" y="24" className="text-[7px] font-bold fill-blue-700 dark:fill-blue-300">A</text>
            <text x="45" y="24" className="text-[7px] font-bold fill-blue-700 dark:fill-blue-300">B</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Félegyenes',
        category: 'cat-1d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="14" x2="44" y2="14" className="stroke-blue-600 stroke-[2]" />
            <circle cx="12" cy="14" r="2.5" className="fill-blue-700" />
            <polygon points="50,14 44,11 44,17" className="fill-blue-600" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Sík (α)',
        category: 'cat-2d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="12,22 46,22 52,7 18,7" className="fill-indigo-100/70 dark:fill-indigo-950/50 stroke-indigo-500 stroke-[1.2]" />
            <text x="28" y="17" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">α</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Szögtartomány',
        category: 'cat-2d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <path d="M 12 22 L 48 22 L 40 7 Z" className="fill-indigo-100/70 dark:fill-indigo-950/40 stroke-indigo-500 stroke-[1.2]" />
            <path d="M 24 22 A 12 12 0 0 0 20 16" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Háromszöglap',
        category: 'cat-2d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,5 12,23 48,23" className="fill-indigo-200/60 dark:fill-indigo-900/50 stroke-indigo-600 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Kocka (test)',
        category: 'cat-3d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,12 30,7 42,12 30,17" className="fill-purple-200/70 stroke-purple-600 stroke-[1]" />
            <polygon points="18,12 30,17 30,25 18,20" className="fill-purple-300/70 stroke-purple-600 stroke-[1]" />
            <polygon points="42,12 30,17 30,25 42,20" className="fill-purple-400/70 stroke-purple-600 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Tér (tengelyek)',
        category: 'cat-3d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="30" y1="15" x2="30" y2="4" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="30" y1="15" x2="48" y2="21" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="30" y1="15" x2="14" y2="22" className="stroke-purple-600 stroke-[1.5]" />
            <text x="32" y="8" className="text-[7px] font-bold fill-purple-700">z</text>
            <text x="47" y="18" className="text-[7px] font-bold fill-purple-700">y</text>
            <text x="14" y="19" className="text-[7px] font-bold fill-purple-700">x</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Felezőpont (F)',
        category: 'cat-0d',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="14" x2="50" y2="14" className="stroke-slate-400 stroke-[1.5]" />
            <circle cx="30" cy="14" r="3" className="fill-teal-600" />
            <text x="27" y="24" className="text-[7px] font-bold fill-teal-700 dark:fill-teal-300">F</text>
          </svg>
        )
      },
    ]
  },
  2: {
    title: '2. Szint: Szögtípusok Felismerése és Csoportosítása',
    subtitle: 'Válogasd szét a szögmértékeket és ábrákat a megfelelő szögtípus kategóriába!',
    categories: [
      { id: 'cat-acute', name: 'Hegyesszög', description: '0° < α < 90°', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' },
      { id: 'cat-right', name: 'Derékszög', description: 'α = 90°', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-obtuse', name: 'Tompaszög', description: '90° < α < 180°', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-reflex', name: 'Homorúszög', description: '180° < α < 360°', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
    ],
    items: [
      {
        id: 's11',
        label: '35°',
        category: 'cat-acute',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="22" x2="48" y2="22" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="12" y1="22" x2="42" y2="9" className="stroke-teal-600 stroke-[1.8]" />
            <path d="M 26 22 A 14 14 0 0 0 24 17" fill="none" className="stroke-teal-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's12',
        label: '90°',
        category: 'cat-right',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="18" y1="23" x2="46" y2="23" className="stroke-blue-600 stroke-[2]" />
            <line x1="18" y1="23" x2="18" y2="6" className="stroke-blue-600 stroke-[2]" />
            <rect x="18" y="16" width="7" height="7" fill="none" className="stroke-blue-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's13',
        label: '120°',
        category: 'cat-obtuse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="30" y1="22" x2="52" y2="22" className="stroke-amber-600 stroke-[1.8]" />
            <line x1="30" y1="22" x2="14" y2="10" className="stroke-amber-600 stroke-[1.8]" />
            <path d="M 40 22 A 10 10 0 0 0 24 16" fill="none" className="stroke-amber-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's14',
        label: '240°',
        category: 'cat-reflex',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="28" y1="14" x2="48" y2="14" className="stroke-rose-600 stroke-[1.8]" />
            <line x1="28" y1="14" x2="16" y2="6" className="stroke-rose-600 stroke-[1.8]" />
            <path d="M 38 14 A 10 10 0 1 1 20 9" fill="none" className="stroke-rose-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's15',
        label: '60°',
        category: 'cat-acute',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="15" y1="22" x2="48" y2="22" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="15" y1="22" x2="33" y2="6" className="stroke-teal-600 stroke-[1.8]" />
            <path d="M 28 22 A 13 13 0 0 0 24 14" fill="none" className="stroke-teal-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Merőleges (90°)',
        category: 'cat-right',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="22" x2="50" y2="22" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="30" y1="22" x2="30" y2="5" className="stroke-blue-600 stroke-[1.8]" />
            <rect x="30" y="15" width="7" height="7" fill="none" className="stroke-blue-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's17',
        label: '150°',
        category: 'cat-obtuse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="34" y1="21" x2="52" y2="21" className="stroke-amber-600 stroke-[1.8]" />
            <line x1="34" y1="21" x2="12" y2="12" className="stroke-amber-600 stroke-[1.8]" />
            <path d="M 44 21 A 10 10 0 0 0 24 17" fill="none" className="stroke-amber-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's18',
        label: '210°',
        category: 'cat-reflex',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="28" y1="13" x2="48" y2="13" className="stroke-rose-600 stroke-[1.8]" />
            <line x1="28" y1="13" x2="12" y2="20" className="stroke-rose-600 stroke-[1.8]" />
            <path d="M 38 13 A 10 10 0 1 1 18 17" fill="none" className="stroke-rose-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's19',
        label: '45°',
        category: 'cat-acute',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="14" y1="22" x2="46" y2="22" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="14" y1="22" x2="38" y2="7" className="stroke-teal-600 stroke-[1.8]" />
            <path d="M 26 22 A 12 12 0 0 0 25 15" fill="none" className="stroke-teal-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's20',
        label: '300°',
        category: 'cat-reflex',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="28" y1="14" x2="48" y2="14" className="stroke-rose-600 stroke-[1.8]" />
            <line x1="28" y1="14" x2="38" y2="6" className="stroke-rose-600 stroke-[1.8]" />
            <path d="M 38 14 A 10 10 0 1 1 34 8" fill="none" className="stroke-rose-500 stroke-[1.5]" />
          </svg>
        )
      },
    ]
  },
  3: {
    title: '3. Szint: Egyenespárok Kölcsönös Helyzete',
    subtitle: 'Sorold be az egyenespárokat helyzetük szerint (metsző, párhuzamos vagy kitérő)!',
    categories: [
      { id: 'cat-intersect', name: 'Egysíkú Metsző egyenesek', description: '1 közös pont a síkban', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' },
      { id: 'cat-parallel', name: 'Egysíkú Párhuzamos egyenesek', description: '0 közös pont, közös síkban', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-skew', name: 'Térbeli Kitérő egyenesek', description: '0 közös pont, nem egysíkúak', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      {
        id: 's21',
        label: 'Metsző egyenespár',
        category: 'cat-intersect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="22" x2="50" y2="6" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="10" y1="6" x2="50" y2="22" className="stroke-teal-600 stroke-[1.8]" />
            <circle cx="30" cy="14" r="2.5" className="fill-rose-600" />
            <text x="28" y="24" className="text-[7px] font-bold fill-rose-600">P</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Párhuzamos sínpár',
        category: 'cat-parallel',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="9" x2="52" y2="9" className="stroke-blue-600 stroke-[2]" />
            <line x1="8" y1="19" x2="52" y2="19" className="stroke-blue-600 stroke-[2]" />
            <line x1="18" y1="9" x2="18" y2="19" className="stroke-slate-400 stroke-[1]" />
            <line x1="30" y1="9" x2="30" y2="19" className="stroke-slate-400 stroke-[1]" />
            <line x1="42" y1="9" x2="42" y2="19" className="stroke-slate-400 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Kocka kitérő élei',
        category: 'cat-skew',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,9 36,9 36,23 18,23" fill="none" className="stroke-slate-300 stroke-[1]" />
            <polygon points="26,4 44,4 44,18 26,18" fill="none" className="stroke-slate-300 stroke-[1]" />
            <line x1="18" y1="9" x2="18" y2="23" className="stroke-blue-600 stroke-[2.2]" />
            <line x1="26" y1="4" x2="44" y2="4" className="stroke-rose-600 stroke-[2.2]" />
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Merőleges metszők (90°)',
        category: 'cat-intersect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="14" x2="50" y2="14" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="30" y1="5" x2="30" y2="23" className="stroke-teal-600 stroke-[1.8]" />
            <rect x="30" y="8" width="6" height="6" fill="none" className="stroke-teal-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Füzet szemközti szélei',
        category: 'cat-parallel',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <rect x="14" y="6" width="32" height="16" rx="2" className="fill-blue-50 dark:fill-blue-950/40 stroke-slate-300 stroke-[1]" />
            <line x1="14" y1="6" x2="14" y2="22" className="stroke-blue-600 stroke-[2.5]" />
            <line x1="46" y1="6" x2="46" y2="22" className="stroke-blue-600 stroke-[2.5]" />
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Felüljáró és alsó út',
        category: 'cat-skew',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="18" x2="52" y2="18" className="stroke-slate-400 stroke-[2]" />
            <line x1="22" y1="6" x2="38" y2="24" className="stroke-purple-600 stroke-[2.5]" />
            <circle cx="30" cy="15" r="3" fill="none" className="stroke-purple-400 stroke-[1.2]" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's27',
        label: '60°-os metsző egyenesek',
        category: 'cat-intersect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="20" x2="52" y2="20" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="14" y1="24" x2="46" y2="6" className="stroke-teal-600 stroke-[1.8]" />
            <path d="M 38 20 A 10 10 0 0 0 35 13" fill="none" className="stroke-teal-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Ablakkeret függőleges lécei',
        category: 'cat-parallel',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <rect x="15" y="5" width="30" height="18" fill="none" className="stroke-slate-400 stroke-[1]" />
            <line x1="15" y1="5" x2="15" y2="23" className="stroke-blue-600 stroke-[2.5]" />
            <line x1="45" y1="5" x2="45" y2="23" className="stroke-blue-600 stroke-[2.5]" />
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Padló és plafon ferde élei',
        category: 'cat-skew',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="12,18 42,18 48,24 18,24" fill="none" className="stroke-slate-300 stroke-[1]" />
            <polygon points="12,6 42,6 48,12 18,12" fill="none" className="stroke-slate-300 stroke-[1]" />
            <line x1="12" y1="18" x2="42" y2="18" className="stroke-blue-600 stroke-[2]" />
            <line x1="18" y1="12" x2="48" y2="12" className="stroke-rose-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Kocka szomszédos élei',
        category: 'cat-intersect',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="16" y1="20" x2="46" y2="20" className="stroke-teal-600 stroke-[2]" />
            <line x1="16" y1="20" x2="16" y2="6" className="stroke-teal-600 stroke-[2]" />
            <circle cx="16" cy="20" r="2.5" className="fill-rose-600" />
          </svg>
        )
      },
    ]
  }
};

export const GeometricConceptsSorter: React.FC<GeometricConceptsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-concepts',
  topicTitle = '1. Geometriai fogalmak'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Geometriai Fogalmak Csoportosító"
      subtitle="Válaszd ki a geometriai kártyát, majd kattints a megfelelő kategóriára a besoroláshoz!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default GeometricConceptsSorter;

