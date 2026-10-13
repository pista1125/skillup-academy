import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface DeltoidAreaSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Kiszámított terület nagysága
const level1Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a deltoidokat és rombuszokat a területük nagysága szerint!',
  categories: [
    { id: 'small', name: '30 cm² alatt (< 30)', color: 'emerald' },
    { id: 'medium', name: '30 – 60 cm² között', color: 'teal' },
    { id: 'large', name: '60 cm² felett (> 60)', color: 'blue' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'e = 8 cm, f = 6 cm (T = 24 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,5 62,20 40,45 18,20" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="40" y1="5" x2="40" y2="45" className="stroke-emerald-400 stroke-1 stroke-dashed" />
          <line x1="18" y1="20" x2="62" y2="20" className="stroke-emerald-400 stroke-1 stroke-dashed" />
          {/* Hungarian right angle: arc + dot */}
          <path d="M 40 16 A 4 4 0 0 1 44 20" fill="none" className="stroke-emerald-600 stroke-1" />
          <circle cx="42" cy="18" r="0.7" className="fill-emerald-600" />
          <text x="40" y="48" textAnchor="middle" className="text-[6px] font-bold fill-slate-700">24 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'e = 12 cm, f = 8 cm (T = 48 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,5 65,22 40,45 15,22" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="27" textAnchor="middle" className="text-[7px] font-black fill-teal-800">48 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'e = 16 cm, f = 10 cm (T = 80 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,4 68,24 40,46 12,24" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-blue-700">80 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Rombusz: e = 7 cm, f = 6 cm (T = 21 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 64,25 40,42 16,25" fill="none" className="stroke-emerald-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-emerald-800">21 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'Rombusz: a = 7 cm, ma = 5 cm (T = 35 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="18,40 58,40 66,16 26,16" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="26" y1="16" x2="26" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
          {/* Hungarian right angle */}
          <path d="M 32 40 A 6 6 0 0 0 26 34" fill="none" className="stroke-rose-600 stroke-1" />
          <circle cx="28" cy="38" r="0.8" className="fill-rose-600" />
          <text x="40" y="29" textAnchor="middle" className="text-[7px] font-bold fill-teal-800">35 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'Négyzet: d = 12 cm (T = 72 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 62,25 40,44 18,25" fill="none" className="stroke-blue-600 stroke-2" />
          <line x1="40" y1="6" x2="40" y2="44" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="18" y1="25" x2="62" y2="25" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" />
          <text x="40" y="49" textAnchor="middle" className="text-[6px] font-bold fill-blue-700">72 cm²</text>
        </svg>
      )
    },
    { id: 's1-7', label: 'e = 10 cm, f = 5 cm (T = 25 cm²)', categoryId: 'small' },
    { id: 's1-8', label: 'e = 14 cm, f = 8 cm (T = 56 cm²)', categoryId: 'medium' },
    { id: 's1-9', label: 'e = 20 cm, f = 9 cm (T = 90 cm²)', categoryId: 'large' },
    { id: 's1-10', label: 'Rombusz: e = 10 cm, f = 8 cm (T = 40 cm²)', categoryId: 'medium' }
  ]
};

// 2. SZINT: Síkidom besorolása tulajdonságok alapján
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a négyszögeket tulajdonságaik alapján!',
  categories: [
    { id: 'deltoid', name: 'Általános deltoid', color: 'indigo' },
    { id: 'rhombus', name: 'Rombusz', color: 'purple' },
    { id: 'square', name: 'Négyzet', color: 'amber' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'a = 5 cm, b = 8 cm, átlói merőlegesek',
      categoryId: 'deltoid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,5 64,18 40,45 16,18" fill="none" className="stroke-indigo-600 stroke-2" />
          <line x1="40" y1="5" x2="40" y2="45" className="stroke-indigo-400 stroke-1 stroke-dashed" />
          <line x1="16" y1="18" x2="64" y2="18" className="stroke-indigo-400 stroke-1 stroke-dashed" />
          <text x="24" y="11" className="text-[5px] font-bold fill-indigo-700">a=5</text>
          <text x="23" y="34" className="text-[5px] font-bold fill-indigo-700">b=8</text>
        </svg>
      )
    },
    {
      id: 's2-2',
      label: 'Minden oldala egyenlő, átlói merőlegesen felezik egymást, de nem egyenlők',
      categoryId: 'rhombus',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 65,25 40,42 15,25" fill="none" className="stroke-purple-600 stroke-2" />
          <text x="40" y="27" textAnchor="middle" className="text-[6px] font-bold fill-purple-800">4 egyenlő oldal</text>
        </svg>
      )
    },
    {
      id: 's2-3',
      label: 'Minden oldala és minden szöge egyenlő, átlói egyenlők és merőlegesek',
      categoryId: 'square',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 61,25 40,44 19,25" fill="none" className="stroke-amber-600 stroke-2" />
          {/* Hungarian right angle */}
          <path d="M 40 19 A 6 6 0 0 1 46 25" fill="none" className="stroke-amber-600 stroke-1" />
          <circle cx="43" cy="22" r="0.8" className="fill-amber-600" />
          <text x="40" y="48" textAnchor="middle" className="text-[6px] font-bold fill-amber-700">4 derékszög</text>
        </svg>
      )
    },
    {
      id: 's2-4',
      label: 'Csak 1 szimmetriatengelye van (az egyik átló felezi a másikat)',
      categoryId: 'deltoid'
    },
    {
      id: 's2-5',
      label: '2 szimmetriatengelye van (mindkét átló felezi a másikat)',
      categoryId: 'rhombus'
    },
    {
      id: 's2-6',
      label: '4 szimmetriatengelye van (2 átló és 2 oldalfelező merőleges)',
      categoryId: 'square'
    },
    {
      id: 's2-7',
      label: 'Területe T = a · ma képlettel is számolható, de nem feltétlenül derékszögű',
      categoryId: 'rhombus'
    },
    {
      id: 's2-8',
      label: 'Területe T = a² és T = d² / 2 képlettel is kiszámítható',
      categoryId: 'square'
    },
    {
      id: 's2-9',
      label: 'Papírsárkány alakzat: szomszédos oldalpárjai egyenlő hosszúak (2-2)',
      categoryId: 'deltoid'
    },
    {
      id: 's2-10',
      label: 'Paralelogramma és deltoid közös metszete: minden oldala a hosszúságú',
      categoryId: 'rhombus'
    }
  ]
};

// 3. SZINT: Képletválasztó és megoldási stratégia
const level3Config: SorterLevelConfig = {
  instruction: 'Melyik képlettel vagy stratégiával oldható meg a feladat?',
  categories: [
    { id: 'diag_area', name: 'Átlók képlete: T = (e · f) / 2', color: 'emerald' },
    { id: 'base_height', name: 'Alap × magasság: T = a · ma', color: 'teal' },
    { id: 'perimeter', name: 'Kerület: K = 2(a + b) vagy 4a', color: 'rose' }
  ],
  items: [
    {
      id: 's3-1',
      label: 'Deltoid átlói ismertek: e = 12 cm, f = 9 cm -> Terület számítás',
      categoryId: 'diag_area',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,5 64,20 40,45 16,20" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="40" y1="5" x2="40" y2="45" className="stroke-emerald-400 stroke-1 stroke-dashed" />
          <line x1="16" y1="20" x2="64" y2="20" className="stroke-emerald-400 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's3-2',
      label: 'Rombusz oldala és magassága adott: a = 8 cm, ma = 6 cm -> Terület',
      categoryId: 'base_height',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="18,40 58,40 66,16 26,16" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="26" y1="16" x2="26" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: 's3-3',
      label: 'Deltoid alakú kert körbekerítése lécből: a = 5 m, b = 7 m',
      categoryId: 'perimeter'
    },
    {
      id: 's3-4',
      label: 'Négyzet átlója adott (d = 10 cm), számítsd ki a területét!',
      categoryId: 'diag_area'
    },
    {
      id: 's3-5',
      label: 'Rombusz oldalainak összhossza, ha egy oldala a = 7 cm',
      categoryId: 'perimeter'
    },
    {
      id: 's3-6',
      label: 'T = 45 cm², e = 10 cm -> Másik átló visszaszámolása (f = 2T / e)',
      categoryId: 'diag_area'
    },
    {
      id: 's3-7',
      label: 'Rombusz magasságának számítása területből: T = 48 cm², a = 6 cm (ma = T / a)',
      categoryId: 'base_height'
    },
    {
      id: 's3-8',
      label: 'Konkáv deltoid (nyílhegy) területének kiszámítása az átlók szorzatából',
      categoryId: 'diag_area'
    },
    {
      id: 's3-9',
      label: 'Papírsárkány kerületére ragasztott díszszalag hosszának kiszámítása',
      categoryId: 'perimeter'
    },
    {
      id: 's3-10',
      label: 'Rombusz területe, ha mindkét átló hossza ismert: e = 14 cm, f = 8 cm',
      categoryId: 'diag_area'
    }
  ]
};

export const DeltoidAreaSorter: React.FC<DeltoidAreaSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const activeLvl = Number(currentLevel ?? level) || 1;
  return (
    <SorterTemplate
      key={`deltoid-sorter-lvl-${activeLvl}`}
      title="Deltoid Terület Csoportosító"
      subtitle="Rendszerezd a deltoidokat területük, tulajdonságaik és a felhasznált képletek szerint!"
      badge="7. OSZTÁLY • CSOPORTOSÍTÓ"
      level={activeLvl as any}
      currentLevel={activeLvl as any}
      levels={{
        1: level1Config,
        2: level2Config,
        3: level3Config
      }}
      level1Config={level1Config}
      level2Config={level2Config}
      level3Config={level3Config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
