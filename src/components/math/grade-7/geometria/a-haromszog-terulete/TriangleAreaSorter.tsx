import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface TriangleAreaSorterProps {
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
  instruction: 'Csoportosítsd a háromszögeket a kiszámított területük nagysága szerint!',
  categories: [
    { id: 'small', name: '20 cm² alatt (< 20)', color: 'teal' },
    { id: 'medium', name: '20 – 50 cm² között', color: 'emerald' },
    { id: 'large', name: '50 cm² felett (> 50)', color: 'blue' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'a = 6 cm, ma = 5 cm (T = 15 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="12,38 68,38 40,12" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="40" y1="12" x2="40" y2="38" className="stroke-rose-500 stroke-1 stroke-dashed" />
          <text x="40" y="45" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">a = 6</text>
          <text x="32" y="26" className="text-[7px] font-bold fill-rose-600">5</text>
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'Derékszögű: a = 6 cm, b = 8 cm (T = 24 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 15,10" fill="none" className="stroke-emerald-600 stroke-2" />
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-emerald-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-emerald-600" />
          <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">8</text>
          <text x="9" y="26" className="text-[7px] font-bold fill-emerald-700">6</text>
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'a = 14 cm, ma = 8 cm (T = 56 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 45,10" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-700">56 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Derékszögű: a = 4 cm, b = 5 cm (T = 10 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 60,40 15,15" fill="none" className="stroke-teal-600 stroke-2" />
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
          <text x="38" y="30" textAnchor="middle" className="text-[7px] font-bold fill-teal-800">10 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'a = 10 cm, ma = 7 cm (T = 35 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 30,12" fill="none" className="stroke-emerald-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-emerald-800">35 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'a = 16 cm, ma = 10 cm (T = 80 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 35,10" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-800">80 cm²</text>
        </svg>
      )
    },
    { id: 's1-7', label: 'a = 7 cm, ma = 4 cm (T = 14 cm²)', categoryId: 'small' },
    { id: 's1-8', label: 'Derékszögű: a = 7 cm, b = 10 cm (T = 35 cm²)', categoryId: 'medium' },
    { id: 's1-9', label: 'a = 15 cm, ma = 8 cm (T = 60 cm²)', categoryId: 'large' },
    { id: 's1-10', label: 'a = 18 cm, ma = 7 cm (T = 63 cm²)', categoryId: 'large' }
  ]
};

// 2. SZINT: Háromszög típusa magasságok és szögek alapján
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a tulajdonságokat és ábrákat a háromszög típusa szerint!',
  categories: [
    { id: 'right', name: 'Derékszögű háromszög', color: 'teal' },
    { id: 'obtuse', name: 'Tompaszögű háromszög', color: 'rose' },
    { id: 'acute_regular', name: 'Hegyesszögű vagy Szabályos', color: 'indigo' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Két magassága egybeesik az oldalaival (b = ma, a = mb)',
      categoryId: 'right',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 15,10" fill="none" className="stroke-teal-600 stroke-2" />
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
        </svg>
      )
    },
    {
      id: 's2-2',
      label: 'Két magassága a háromszögön kívülre esik az alap meghosszabbítására',
      categoryId: 'obtuse',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="25,40 70,40 10,15" fill="none" className="stroke-rose-600 stroke-2" />
          <line x1="10" y1="40" x2="25" y2="40" className="stroke-slate-400 stroke-1 stroke-dashed" />
          <line x1="10" y1="15" x2="10" y2="40" className="stroke-rose-400 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's2-3',
      label: 'Mindhárom magassága a háromszög belsejében fut',
      categoryId: 'acute_regular',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="12,40 68,40 40,12" fill="none" className="stroke-indigo-600 stroke-2" />
          <line x1="40" y1="12" x2="40" y2="40" className="stroke-indigo-400 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's2-4',
      label: 'Átfogóhoz tartozó magasság visszaszámolható: mc = (a · b) / c',
      categoryId: 'right',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 15,12" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="38" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-800">mc = ab/c</text>
        </svg>
      )
    },
    {
      id: 's2-5',
      label: 'Mindhárom oldala és magassága egyenlő: T = (√3 / 4) · a²',
      categoryId: 'acute_regular',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 40,10" fill="none" className="stroke-indigo-600 stroke-2" />
          <text x="40" y="32" textAnchor="middle" className="text-[7px] font-black fill-indigo-700">60°-os szögek</text>
        </svg>
      )
    },
    { id: 's2-6', label: 'Egyik belső szöge nagyobb mint 90°, tompaszög', categoryId: 'obtuse' },
    { id: 's2-7', label: 'Magasságpontja a derékszögű csúcsban van', categoryId: 'right' },
    { id: 's2-8', label: 'Magasságpontja a háromszögön kívül található', categoryId: 'obtuse' },
    { id: 's2-9', label: 'Magasságpontja a háromszög belsejében található', categoryId: 'acute_regular' },
    { id: 's2-10', label: 'Területe számítható a két befogó szorzatának felével: T = (a · b) / 2', categoryId: 'right' }
  ]
};

// 3. SZINT: Képlet és feladattípus kiválasztása
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a feladatokat és állításokat a használandó képlet vagy összefüggés szerint!',
  categories: [
    { id: 'general_formula', name: 'T = (a · ma) / 2 (Általános képlet)', color: 'teal' },
    { id: 'right_formula', name: 'T = (a · b) / 2 (Derékszögű képlet)', color: 'emerald' },
    { id: 'height_rel_perim', name: 'a · ma = b · mb = 2T vagy K = a+b+c', color: 'blue' }
  ],
  items: [
    {
      id: 's3-1',
      label: 'a = 15 cm, ma = 6 cm -> Terület számítása',
      categoryId: 'general_formula',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 35,12" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="35" y1="12" x2="35" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's3-2',
      label: 'Két befogó a = 6 cm és b = 9 cm területe',
      categoryId: 'right_formula',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 15,10" fill="none" className="stroke-emerald-600 stroke-2" />
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-emerald-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-emerald-600" />
        </svg>
      )
    },
    {
      id: 's3-3',
      label: 'a = 12 cm, ma = 4 cm, b = 8 cm -> keresett mb',
      categoryId: 'height_rel_perim',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 68,40 45,12" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">a · ma = b · mb</text>
        </svg>
      )
    },
    { id: 's3-4', label: 'Három oldal adott: 5 cm, 8 cm, 11 cm -> kerület számítása', categoryId: 'height_rel_perim' },
    {
      id: 's3-5',
      label: 'Derékszögű: a = 8 cm, b = 15 cm, c = 17 cm -> átfogóhoz tartozó mc',
      categoryId: 'right_formula',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 15,10" fill="none" className="stroke-emerald-600 stroke-2" />
          <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-emerald-600 stroke-1" />
          <circle cx="17.5" cy="37.5" r="0.8" className="fill-emerald-600" />
          <line x1="15" y1="10" x2="45" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    { id: 's3-6', label: 'T = 45 cm², a = 10 cm -> ma magasság kiszámítása (2T / a)', categoryId: 'general_formula' },
    { id: 's3-7', label: 'Két egybevágó háromszögből paralelogramma: T_háromszög = T_paralelogramma / 2', categoryId: 'general_formula' },
    { id: 's3-8', label: 'Hosszabb oldalhoz rövidebb magasság tartozik: a · ma = b · mb = 2T', categoryId: 'height_rel_perim' },
    { id: 's3-9', label: 'Téglalap átló menti kettévágásakor keletkező háromszög területe', categoryId: 'right_formula' },
    { id: 's3-10', label: 'Kerület és terület összevetése: K = a+b+c és T = (a · ma) / 2', categoryId: 'height_rel_perim' }
  ]
};

export const TriangleAreaSorter: React.FC<TriangleAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const activeLvl = (currentLevel ?? level) as any;

  return (
    <SorterTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      title="6. A Háromszög Területe Csoportosító"
      subtitle="Kategorizáld a feladatokat és háromszögeket területük, típusuk és képleteik szerint!"
      badge="CSOPORTOSÍTÓ"
      topicTitle="A háromszög területe"
      themeColor="teal"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-triangle-area-sorter"
      levels={{
        1: level1Config,
        2: level2Config,
        3: level3Config
      }}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default TriangleAreaSorter;
