import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface TrapezoidAreaSorterProps {
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
  instruction: 'Csoportosítsd a trapézokat a kiszámított területük nagysága szerint!',
  categories: [
    { id: 'small', name: '30 cm² alatt (< 30)', color: 'emerald' },
    { id: 'medium', name: '30 – 60 cm² között', color: 'teal' },
    { id: 'large', name: '60 cm² felett (> 60)', color: 'blue' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'a = 8 cm, c = 4 cm, m = 4 cm (T = 24 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="12,40 68,40 52,14 28,14" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="28" y1="14" x2="28" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
          <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">8</text>
          <text x="40" y="11" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">4</text>
          <text x="22" y="27" className="text-[6px] font-bold fill-rose-600">4</text>
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'a = 10 cm, c = 6 cm, m = 5 cm (T = 40 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-teal-800">40 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'a = 16 cm, c = 8 cm, m = 6 cm (T = 72 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="8,40 72,40 56,12 24,12" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-700">72 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Derékszögű: a = 7 cm, c = 5 cm, d = 4 cm (T = 24 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 45,14 15,14" fill="none" className="stroke-emerald-600 stroke-2" />
          {/* Hungarian right angles: arc + dot */}
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-emerald-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-emerald-600" />
          <text x="35" y="28" textAnchor="middle" className="text-[7px] font-bold fill-emerald-800">24 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'k = 9 cm, m = 5 cm (T = 45 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="17.5" y1="27" x2="62.5" y2="27" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="40" y="25" textAnchor="middle" className="text-[7px] font-bold fill-teal-800">k = 9</text>
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'k = 14 cm, m = 7 cm (T = 98 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="8,40 72,40 56,12 24,12" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-800">98 cm²</text>
        </svg>
      )
    },
    { id: 's1-7', label: 'a = 6 cm, c = 4 cm, m = 3 cm (T = 15 cm²)', categoryId: 'small' },
    { id: 's1-8', label: 'a = 12 cm, c = 6 cm, m = 4 cm (T = 36 cm²)', categoryId: 'medium' },
    { id: 's1-9', label: 'a = 18 cm, c = 6 cm, m = 8 cm (T = 96 cm²)', categoryId: 'large' },
    { id: 's1-10', label: 'k = 10 cm, m = 5 cm (T = 50 cm²)', categoryId: 'medium' }
  ]
};

// 2. SZINT: Trapéz típusa tulajdonságok és ábrák alapján
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd az állításokat és ábrákat a trapéz típusa szerint!',
  categories: [
    { id: 'isosceles', name: 'Húrtrapéz (szimmetrikus)', color: 'emerald' },
    { id: 'right', name: 'Derékszögű trapéz', color: 'teal' },
    { id: 'general', name: 'Általános trapéz', color: 'indigo' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Szárai egyenlő hosszúak (b = d)',
      categoryId: 'isosceles',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="16" y1="28" x2="20" y2="26" stroke="#059669" strokeWidth="1.5" />
          <line x1="60" y1="26" x2="64" y2="28" stroke="#059669" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's2-2',
      label: 'Pontosan 2 derékszöge van, egyik szára merőleges az alapokra',
      categoryId: 'right',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 45,14 15,14" fill="none" className="stroke-teal-600 stroke-2" />
          {/* Hungarian right angles: arc + dot */}
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
          <path d="M 22 14 A 7 7 0 0 1 15 21" fill="none" className="stroke-teal-600 stroke-1" />
          <circle cx="17.5" cy="16.5" r="0.8" className="fill-teal-600" />
        </svg>
      )
    },
    {
      id: 's2-3',
      label: 'Oldalai és szögei mind különbözőek, nincs szimmetriatengelye',
      categoryId: 'general',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 45,14 20,14" fill="none" className="stroke-indigo-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 's2-4',
      label: 'Egy szimmetriatengelye van: az alapok közös felezőmerőlegese',
      categoryId: 'isosceles',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <line x1="40" y1="8" x2="40" y2="44" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
          <polygon points="12,40 68,40 54,14 26,14" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 's2-5',
      label: 'Merőleges szára megegyezik a magasságával (d = m)',
      categoryId: 'right'
    },
    {
      id: 's2-6',
      label: 'Alapon fekvő szögei egyenlők (α = β és γ = δ)',
      categoryId: 'isosceles'
    },
    {
      id: 's2-7',
      label: 'Átlói egyenlő hosszúak (e = f)',
      categoryId: 'isosceles'
    },
    {
      id: 's2-8',
      label: 'Területe kiszámítható a merőleges szárral: T = ((a + c) / 2) · d',
      categoryId: 'right'
    },
    {
      id: 's2-9',
      label: 'Köré kör írható (húrnégyszög)',
      categoryId: 'isosceles'
    },
    {
      id: 's2-10',
      label: 'Két ferde szára különböző hajlásszögű és hosszúságú',
      categoryId: 'general'
    }
  ]
};

// 3. SZINT: Képlet és összefüggés kiválasztása
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a feladatokat és állításokat a használandó képlet szerint!',
  categories: [
    { id: 'area_standard', name: 'T = ((a + c) / 2) · m (Alapok és magasság)', color: 'emerald' },
    { id: 'area_midline', name: 'T = k · m (Középvonal és magasság)', color: 'teal' },
    { id: 'midline_perim', name: 'k = (a + c) / 2 vagy K = a + b + c + d', color: 'blue' }
  ],
  items: [
    {
      id: 's3-1',
      label: 'a = 14 cm, c = 6 cm, m = 5 cm -> Terület számítása',
      categoryId: 'area_standard',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 50,14 30,14" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="30" y1="14" x2="30" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's3-2',
      label: 'k = 11 cm, m = 8 cm -> Terület számítása',
      categoryId: 'area_midline',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="17.5" y1="27" x2="62.5" y2="27" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      )
    },
    {
      id: 's3-3',
      label: 'A két szár felezőpontját összekötő szakasz hossza',
      categoryId: 'midline_perim'
    },
    {
      id: 's3-4',
      label: 'Négy oldal adott (a, b, c, d) -> Kerület számítása',
      categoryId: 'midline_perim'
    },
    {
      id: 's3-5',
      label: 'Derékszögű trapéz: a = 12 cm, c = 8 cm, d = 6 cm -> Terület',
      categoryId: 'area_standard',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 45,14 15,14" fill="none" className="stroke-emerald-600 stroke-2" />
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-emerald-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-emerald-600" />
        </svg>
      )
    },
    {
      id: 's3-6',
      label: 'T = 72 cm², k = 9 cm -> Magasság visszaszámolása (m = T / k)',
      categoryId: 'area_midline'
    },
    {
      id: 's3-7',
      label: 'T = 50 cm², a = 14 cm, c = 6 cm -> m = 2T / (a + c)',
      categoryId: 'area_standard'
    },
    {
      id: 's3-8',
      label: 'Két egybevágó trapézból paralelogramma: 2T = (a + c) · m',
      categoryId: 'area_standard'
    },
    {
      id: 's3-9',
      label: 'a = 15 cm, c = 9 cm -> Középvonal kiszámítása (átlag)',
      categoryId: 'midline_perim'
    },
    {
      id: 's3-10',
      label: 'Húrtrapéz: a = 12 cm, c = 6 cm, b = 5 cm -> K = a + 2b + c',
      categoryId: 'midline_perim'
    }
  ]
};

export const TrapezoidAreaSorter: React.FC<TrapezoidAreaSorterProps> = ({
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
      key={`trapezoid-sorter-lvl-${activeLvl}`}
      title="Trapéz Terület Csoportosító"
      subtitle="Rendszerezd a trapézokat területük, típusuk és a felhasznált képletek szerint!"
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
