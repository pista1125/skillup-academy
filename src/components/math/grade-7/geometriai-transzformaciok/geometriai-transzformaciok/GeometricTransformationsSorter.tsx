import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricTransformationsSorterProps {
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
    title: '1. Szint: A 4 Alapvető Egybevágósági Transzformáció',
    subtitle: 'Sorold be a geometriai kártyákat a 4 alaptípus megfelelő csoportjába!',
    categories: [
      {
        id: 'cat-axis',
        name: 'Tengelyes tükrözés (t)',
        description: 'Tükörtengelyre merőleges, megfordítja a körüljárási irányt',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-center',
        name: 'Középpontos tükrözés (O)',
        description: 'Centrumon átmenő, 180°-os elforgatásként viselkedik',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-translation',
        name: 'Párhuzamos eltolás (v)',
        description: 'Minden pontot adott irányban és távolsággal mozgat el',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-rotation',
        name: 'Elforgatás (O, α)',
        description: 'Pont körül adott α szöggel történő elfordítás',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Tükörtengely (t)',
        category: 'cat-axis',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="30" y1="3" x2="30" y2="25" className="stroke-indigo-600 stroke-[2]" />
            <text x="34" y="17" className="text-[8px] font-bold fill-indigo-700">t</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Középpont (O, 180°)',
        category: 'cat-center',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3.5" className="fill-teal-700" />
            <path d="M 22 14 A 8 8 0 1 1 38 14" fill="none" className="stroke-teal-500 stroke-[1.2] stroke-dasharray-[2,2]" />
            <text x="27" y="25" className="text-[7px] font-bold fill-teal-800">O</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Eltolási vektor (v)',
        category: 'cat-translation',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="14" x2="44" y2="14" className="stroke-blue-600 stroke-[2]" />
            <polygon points="48,14 42,10 42,18" className="fill-blue-600" />
            <text x="26" y="10" className="text-[7px] font-bold fill-blue-700">v</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Forgatási szög (α)',
        category: 'cat-rotation',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="20" y1="21" x2="48" y2="21" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="20" y1="21" x2="42" y2="7" className="stroke-purple-600 stroke-[1.5]" />
            <path d="M 32 21 A 12 12 0 0 0 30 14" fill="none" className="stroke-purple-500 stroke-[1.2]" />
            <text x="33" y="17" className="text-[7px] font-bold fill-purple-700">α</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Tengelyes tükörkép',
        category: 'cat-axis',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-slate-400 stroke-[1.5]" />
            <polygon points="22,8 12,20 22,22" className="fill-teal-100 stroke-teal-600 stroke-[1.2]" />
            <polygon points="38,8 48,20 38,22" className="fill-indigo-100 stroke-indigo-600 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Középpontos tükörkép',
        category: 'cat-center',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="2.5" className="fill-teal-700" />
            <polygon points="20,6 10,14 18,18" className="fill-teal-100 stroke-teal-600 stroke-[1]" />
            <polygon points="40,22 50,14 42,10" className="fill-teal-200 stroke-teal-800 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Párhuzamosan eltolt kép',
        category: 'cat-translation',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,6 10,22 26,22" className="fill-blue-100 stroke-blue-600 stroke-[1.2]" />
            <polygon points="44,6 36,22 52,22" className="fill-blue-200 stroke-blue-700 stroke-[1.2]" />
            <line x1="26" y1="14" x2="36" y2="14" className="stroke-slate-400 stroke-[1] stroke-dasharray-[2,2]" />
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Elforgatott kép (60°)',
        category: 'cat-rotation',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="20" cy="18" r="2.5" className="fill-purple-700" />
            <line x1="20" y1="18" x2="45" y2="18" className="stroke-purple-500 stroke-[1.5]" />
            <line x1="20" y1="18" x2="35" y2="6" className="stroke-purple-600 stroke-[1.5]" />
            <path d="M 33 18 A 13 13 0 0 0 29 11" fill="none" className="stroke-purple-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Fordított körüljárás',
        category: 'cat-axis',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <path d="M 22 8 A 8 8 0 1 1 20 18" fill="none" className="stroke-rose-600 stroke-[1.5]" />
            <polygon points="20,18 20,12 26,16" className="fill-rose-600" />
            <text x="36" y="17" className="text-[7px] font-bold fill-rose-600">A-C-B</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Eltolás iránya és hossza',
        category: 'cat-translation',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="14" y1="10" x2="46" y2="10" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="14" y1="18" x2="46" y2="18" className="stroke-blue-600 stroke-[1.8]" />
            <polygon points="49,10 43,7 43,13" className="fill-blue-600" />
            <polygon points="49,18 43,15 43,21" className="fill-blue-600" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Hatás a Körüljárási Irányra és Alakra',
    subtitle: 'Válogasd szét a transzformációkat a körüljárásra és alakra gyakorolt hatásuk szerint!',
    categories: [
      {
        id: 'cat-preserve',
        name: 'Körüljárást MEGŐRZŐ',
        description: 'Direkt egybevágóság (eltolás, forgatás, pontra tükrözés)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-reverse',
        name: 'Körüljárást MEGFORDÍTÓ',
        description: 'Indirekt egybevágóság (tengelyes tükrözés)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-distortion',
        name: 'Alakváltoztató TORZÍTÁS',
        description: 'NEM egybevágósági transzformáció (méret- vagy arányváltozás)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: 'Tengelyes tükrözés (t)',
        category: 'cat-reverse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-rose-600 stroke-[2]" />
            <text x="14" y="16" className="text-[7px] font-bold fill-rose-700">↺</text>
            <text x="42" y="16" className="text-[7px] font-bold fill-rose-700">↻</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Párhuzamos eltolás (v)',
        category: 'cat-preserve',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="16" y1="14" x2="44" y2="14" className="stroke-emerald-600 stroke-[2]" />
            <polygon points="48,14 42,10 42,18" className="fill-emerald-600" />
            <text x="24" y="24" className="text-[7px] font-bold fill-emerald-700">↺ ⟹ ↺</text>
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Középpontos tükrözés (O)',
        category: 'cat-preserve',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3" className="fill-emerald-700" />
            <text x="22" y="24" className="text-[7px] font-bold fill-emerald-800">180° forgatás</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Elforgatás (O, α)',
        category: 'cat-preserve',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <path d="M 22 14 A 8 8 0 1 1 38 14" fill="none" className="stroke-emerald-600 stroke-[1.8]" />
            <polygon points="38,14 34,9 41,10" className="fill-emerald-600" />
          </svg>
        )
      },
      {
        id: 's15',
        label: '2 tengelyes tükrözés',
        category: 'cat-preserve',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="22" y1="5" x2="22" y2="23" className="stroke-slate-500 stroke-[1.5]" />
            <line x1="38" y1="5" x2="38" y2="23" className="stroke-slate-500 stroke-[1.5]" />
            <text x="25" y="16" className="text-[6px] font-bold fill-emerald-700 font-mono">(-)(-) = (+)</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: '1 tengelyes tükrözés',
        category: 'cat-reverse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="30" y1="5" x2="30" y2="23" className="stroke-rose-600 stroke-[1.8]" />
            <text x="18" y="16" className="text-[8px] font-bold fill-slate-700">P</text>
            <text x="38" y="16" className="text-[8px] font-bold fill-rose-700" style={{ transform: 'scaleX(-1)' }}>P</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Nagyítás (arány: λ = 2)',
        category: 'cat-distortion',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="16,10 10,22 22,22" fill="none" className="stroke-amber-600 stroke-[1.2]" />
            <polygon points="44,5 34,25 54,25" fill="none" className="stroke-amber-600 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Körből ellipszis (nyújtás)',
        category: 'cat-distortion',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="18" cy="14" r="8" fill="none" className="stroke-slate-500 stroke-[1.2]" />
            <ellipse cx="44" cy="14" rx="12" ry="6" fill="none" className="stroke-amber-600 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 's19',
        label: '3 tengelyes tükrözés',
        category: 'cat-reverse',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <text x="12" y="17" className="text-[7px] font-bold fill-rose-700 font-mono">3 db tükrözés</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Ferde vetítés / torzítás',
        category: 'cat-distortion',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,7 48,7 40,23 10,23" fill="none" className="stroke-amber-600 stroke-[1.8]" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Fixpontok és Fixegyenesek Rendszere',
    subtitle: 'Kategorizáld az állításokat és transzformációkat a fixpontjaik száma szerint!',
    categories: [
      {
        id: 'cat-infinite-fixed',
        name: 'Végtelen sok fixpont',
        description: 'Egy egész egyenes minden pontja fixpont (pontonként fix)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-single-fixed',
        name: 'Pontosan 1 fixpont',
        description: 'Egyetlen kitüntetett centrum marad helyben',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-no-fixed',
        name: 'Egyetlen fixpont sincs',
        description: 'A sík minden pontja elmozdul (0 fixpont)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'Tükörtengely (t) pontjai',
        category: 'cat-infinite-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="14" x2="50" y2="14" className="stroke-indigo-600 stroke-[2]" />
            <circle cx="20" cy="14" r="2.5" className="fill-rose-600" />
            <circle cx="30" cy="14" r="2.5" className="fill-rose-600" />
            <circle cx="40" cy="14" r="2.5" className="fill-rose-600" />
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Középpontos tükrözés O pontja',
        category: 'cat-single-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3.5" className="fill-teal-700" />
            <text x="35" y="12" className="text-[7px] font-bold fill-teal-800">O</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Párhuzamos eltolás (v ≠ 0)',
        category: 'cat-no-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="14" x2="48" y2="14" className="stroke-amber-600 stroke-[2]" />
            <polygon points="52,14 45,10 45,18" className="fill-amber-600" />
            <text x="24" y="24" className="text-[6px] font-bold fill-amber-700">minden P mozog</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Forgatás O centruma (45°)',
        category: 'cat-single-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3.5" className="fill-purple-700" />
            <path d="M 22 14 A 8 8 0 0 1 30 6" fill="none" className="stroke-purple-500 stroke-[1.2]" />
            <text x="35" y="18" className="text-[7px] font-bold fill-purple-700">O</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Pontonként fix egyenes',
        category: 'cat-infinite-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="14" x2="52" y2="14" className="stroke-indigo-600 stroke-[2.5]" />
            <text x="22" y="10" className="text-[6px] font-mono font-bold fill-indigo-700">P = P' (∀P)</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Eltolás egyenesének pontjai',
        category: 'cat-no-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="14" x2="52" y2="14" className="stroke-slate-400 stroke-[1.5]" />
            <circle cx="20" cy="14" r="2" className="fill-amber-600" />
            <circle cx="36" cy="14" r="2" className="fill-amber-700" />
            <path d="M 22 10 Q 28 6 34 10" fill="none" className="stroke-amber-600 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Forgatás 120°-kal (O centrum)',
        category: 'cat-single-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3.5" className="fill-teal-700" />
            <text x="14" y="24" className="text-[6px] font-bold fill-teal-800">csak O marad</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Vektor szerinti eltolás',
        category: 'cat-no-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="16" cy="14" r="2" className="fill-slate-500" />
            <circle cx="36" cy="14" r="2" className="fill-amber-600" />
            <line x1="18" y1="14" x2="34" y2="14" className="stroke-amber-600 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Tükörtengely (t) mint halmaz',
        category: 'cat-infinite-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="14" x2="50" y2="14" className="stroke-indigo-600 stroke-[2]" />
            <text x="21" y="23" className="text-[6px] font-bold fill-indigo-800">t = t' (fix)</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Tükrözési centrum pontja',
        category: 'cat-single-fixed',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="3.5" className="fill-rose-600" />
            <text x="35" y="16" className="text-[7px] font-bold fill-rose-700">O = O'</text>
          </svg>
        )
      }
    ]
  }
};

export const GeometricTransformationsSorter: React.FC<GeometricTransformationsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-transformations',
  topicTitle = '4. Geometriai transzformációk'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Geometriai Transzformációk Csoportosító"
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

export default GeometricTransformationsSorter;
