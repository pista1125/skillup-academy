import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface ParallelogramAreaSorterProps {
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
  instruction: 'Csoportosítsd az alakzatokat a kiszámított területük nagysága szerint!',
  categories: [
    { id: 'small', name: '30 cm² alatt (< 30)', color: 'emerald' },
    { id: 'medium', name: '30 – 60 cm² között', color: 'teal' },
    { id: 'large', name: '60 cm² felett (> 60)', color: 'blue' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'a = 6 cm, ma = 4 cm (T = 24 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="20,12 65,12 50,38 5,38" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="20" y1="12" x2="20" y2="38" className="stroke-rose-500 stroke-1 stroke-dashed" />
          <text x="35" y="45" className="text-[7px] font-bold fill-slate-700">a = 6</text>
          <text x="14" y="26" className="text-[7px] font-bold fill-rose-600">4</text>
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'a = 8 cm, ma = 5 cm (T = 40 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="18,10 65,10 52,40 5,40" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="18" y1="10" x2="18" y2="40" className="stroke-teal-500 stroke-1 stroke-dashed" />
          <text x="35" y="46" className="text-[7px] font-bold fill-teal-800">T = 40</text>
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'a = 12 cm, ma = 7 cm (T = 84 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,8 70,8 58,42 3,42" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="36" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-700">84 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Rombusz: e = 6 cm, f = 8 cm (T = 24 cm²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 68,25 40,44 12,25" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="40" y1="6" x2="40" y2="44" className="stroke-slate-400 stroke-1 stroke-dashed" />
          <line x1="12" y1="25" x2="68" y2="25" className="stroke-slate-400 stroke-1 stroke-dashed" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-emerald-700">24 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'Négyzet: a = 7 cm (T = 49 cm²)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="25" y="10" width="30" height="30" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-teal-800">49 cm²</text>
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'Téglalap: a = 10 cm, b = 8 cm (T = 80 cm²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="15" y="12" width="50" height="26" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-800">80 cm²</text>
        </svg>
      )
    },
    { id: 's1-7', label: 'a = 5 cm, ma = 5 cm (T = 25 cm²)', categoryId: 'small' },
    { id: 's1-8', label: 'a = 9 cm, ma = 4 cm (T = 36 cm²)', categoryId: 'medium' },
    { id: 's1-9', label: 'Rombusz: e = 10 cm, f = 14 cm (T = 70 cm²)', categoryId: 'large' },
    { id: 's1-10', label: 'a = 15 cm, ma = 5 cm (T = 75 cm²)', categoryId: 'large' }
  ]
};

// 2. SZINT: Geometriai alakzat típusa
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd az alakzatokat és tulajdonságokat a négyszög típusa szerint!',
  categories: [
    { id: 'general', name: 'Általános paralelogramma', color: 'emerald' },
    { id: 'rhombus', name: 'Rombusz (egyenlő oldalak)', color: 'teal' },
    { id: 'rect_square', name: 'Téglalap vagy Négyzet', color: 'indigo' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Szemközti oldalai párhuzamosak, a ≠ b, szögei ferdék',
      categoryId: 'general',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="20,12 65,12 50,38 5,38" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 's2-2',
      label: 'Minden oldala egyenlő, átlói merőlegesek',
      categoryId: 'rhombus',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 65,25 40,42 15,25" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="40" y1="8" x2="40" y2="42" className="stroke-teal-400 stroke-1 stroke-dashed" />
          <line x1="15" y1="25" x2="65" y2="25" className="stroke-teal-400 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's2-3',
      label: 'Minden szöge 90°, területe T = a · b',
      categoryId: 'rect_square',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="18" y="12" width="44" height="26" fill="none" className="stroke-indigo-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 's2-4',
      label: 'Területe kiszámítható: T = (e · f) / 2',
      categoryId: 'rhombus',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 68,25 40,44 12,25" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-700">(e · f)/2</text>
        </svg>
      )
    },
    {
      id: 's2-5',
      label: '4 egyenlő oldal és 4 derékszög, T = a²',
      categoryId: 'rect_square',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="25" y="10" width="30" height="30" fill="none" className="stroke-indigo-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-indigo-700">a²</text>
        </svg>
      )
    },
    { id: 's2-6', label: 'Két különböző magassága van (ma ≠ mb), mert a ≠ b', categoryId: 'general' },
    { id: 's2-7', label: 'Mindkét magassága egyenlő (ma = mb), mert 4 egyenlő oldala van', categoryId: 'rhombus' },
    { id: 's2-8', label: 'Átlói egyenlő hosszúak, magassága megegyezik a szomszédos oldalával', categoryId: 'rect_square' },
    { id: 's2-9', label: 'K = 4a, területe T = a · ma vagy (e · f) / 2', categoryId: 'rhombus' },
    { id: 's2-10', label: 'Középpontosan szimmetrikus, de általában nem tengelyes', categoryId: 'general' }
  ]
};

// 3. SZINT: Képlet és feladattípus kiválasztása
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd az állításokat és feladatokat a szükséges képlet vagy összefüggés szerint!',
  categories: [
    { id: 'formula_base_height', name: 'T = a · m (Alap × Magasság)', color: 'emerald' },
    { id: 'formula_diagonals', name: 'T = (e · f) / 2 (Átlóképlet)', color: 'teal' },
    { id: 'formula_rel_perim', name: 'K = 2(a+b) vagy a · ma = b · mb', color: 'blue' }
  ],
  items: [
    {
      id: 's3-1',
      label: 'a = 14 cm, ma = 6 cm -> Terület számítása',
      categoryId: 'formula_base_height',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="18,12 65,12 50,38 3,38" fill="none" className="stroke-emerald-600 stroke-2" />
          <line x1="18" y1="12" x2="18" y2="38" className="stroke-rose-500 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's3-2',
      label: 'Rombusz átlói e = 8 cm és f = 12 cm',
      categoryId: 'formula_diagonals',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 66,25 40,44 14,25" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="40" y1="6" x2="40" y2="44" className="stroke-teal-500 stroke-1 stroke-dashed" />
          <line x1="14" y1="25" x2="66" y2="25" className="stroke-teal-500 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 's3-3',
      label: 'a = 12 cm, ma = 4 cm, b = 6 cm -> keresett mb',
      categoryId: 'formula_rel_perim',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="20,10 65,10 48,40 3,40" fill="none" className="stroke-blue-600 stroke-2" />
          <line x1="20" y1="10" x2="20" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
          <line x1="20" y1="10" x2="40" y2="23" className="stroke-indigo-500 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    { id: 's3-4', label: 'Téglalap két oldala a = 5 cm, b = 7 cm kerületének kiszámítása', categoryId: 'formula_rel_perim' },
    {
      id: 's3-5',
      label: 'Rombusz e = 10 cm, f = 16 cm -> T = 80 cm²',
      categoryId: 'formula_diagonals',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 68,25 40,42 12,25" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-700">T = 80</text>
        </svg>
      )
    },
    { id: 's3-6', label: 'T = 72 cm², a = 9 cm -> ma magasság kiszámítása (T / a)', categoryId: 'formula_base_height' },
    { id: 's3-7', label: 'Kerület kiszámítása paralelogrammánál: K = 2 · (a + b)', categoryId: 'formula_rel_perim' },
    { id: 's3-8', label: 'Minden merőleges átlójú négyszög területe: T = (e · f) / 2', categoryId: 'formula_diagonals' },
    { id: 's3-9', label: 'Téglalappá átdarabolt paralelogramma területe', categoryId: 'formula_base_height' },
    { id: 's3-10', label: 'Hosszabb oldalhoz rövidebb magasság tartozik: a · ma = b · mb', categoryId: 'formula_rel_perim' }
  ]
};

export const ParallelogramAreaSorter: React.FC<ParallelogramAreaSorterProps> = ({
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
      title="5. A Paralelogramma Területe Csoportosító"
      subtitle="Kategorizáld a feladatokat és alakzatokat területük, típusuk és képleteik szerint!"
      badge="CSOPORTOSÍTÓ"
      topicTitle="A paralelogramma területe"
      themeColor="emerald"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-parallelogram-area-sorter"
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

export default ParallelogramAreaSorter;
