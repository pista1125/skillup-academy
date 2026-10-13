import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface ParallelogramAreaMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Terület- és kerületszámítás alapjai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'a = 8 cm, ma = 5 cm',
    value: 'T = 40 cm² (8 · 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="20,10 65,10 50,40 5,40" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="20" y1="10" x2="20" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="28" y="46" className="text-[7px] font-bold fill-slate-700">a = 8</text>
        <text x="14" y="26" className="text-[7px] font-bold fill-rose-600">5</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Rombusz átlói: e = 6 cm, f = 8 cm',
    value: 'T = 24 cm² (6 · 8 / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 68,25 40,44 12,25" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="40" y1="6" x2="40" y2="44" className="stroke-indigo-500 stroke-1 stroke-dashed" />
        <line x1="12" y1="25" x2="68" y2="25" className="stroke-indigo-500 stroke-1 stroke-dashed" />
        <text x="40" y="32" textAnchor="middle" className="text-[7px] font-black fill-teal-800">24 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Négyzet oldala: a = 7 cm',
    value: 'T = 49 cm² (7 · 7 = 49)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="25" y="10" width="30" height="30" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-emerald-800">49 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Téglalap: a = 9 cm, b = 4 cm',
    value: 'T = 36 cm² (9 · 4)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="18" y="12" width="44" height="26" fill="none" className="stroke-blue-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-blue-800">36 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Paralelogramma: a = 10 cm, b = 6 cm',
    value: 'K = 32 cm (2 · (10 + 6))'
  },
  {
    id: 'l1-p6',
    prompt: 'a = 12 cm, ma = 3 cm',
    value: 'T = 36 cm² (12 · 3)'
  },
  {
    id: 'l1-p7',
    prompt: 'Rombusz oldala: a = 8 cm',
    value: 'K = 32 cm (4 · 8)'
  },
  {
    id: 'l1-p8',
    prompt: 'Átdarabolás téglalappá eredménye',
    value: 'A terület nagysága változatlan marad (T = a · ma)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="22" y="10" width="36" height="30" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="22" y1="10" x2="10" y2="40" className="stroke-slate-400 stroke-1 stroke-dashed" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-emerald-700">Téglalap</text>
      </svg>
    )
  }
];

// 2. SZINT: Két magasság kapcsolata és hiányzó oldalak
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'T = 60 cm², a = 12 cm',
    value: 'ma = 5 cm (60 : 12)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="18,10 65,10 50,40 3,40" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="18" y1="10" x2="18" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="30" y="28" textAnchor="middle" className="text-[7px] font-black fill-emerald-700">T = 60</text>
        <text x="12" y="26" className="text-[7px] font-bold fill-rose-600">?</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'a = 10 cm, ma = 4 cm, b = 8 cm',
    value: 'mb = 5 cm (mert T = 40 cm², 40 : 8 = 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="20,10 65,10 50,40 5,40" fill="none" className="stroke-indigo-600 stroke-2" />
        <text x="35" y="28" textAnchor="middle" className="text-[7px] font-black fill-indigo-700">mb = 5</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Rombusz: a = 6 cm, ma = 4,5 cm',
    value: 'T = 27 cm² (6 · 4,5)'
  },
  {
    id: 'l2-p4',
    prompt: 'T = 48 cm², b = 6 cm',
    value: 'mb = 8 cm (48 : 6)'
  },
  {
    id: 'l2-p5',
    prompt: 'a = 15 cm, ma = 6 cm, mb = 10 cm',
    value: 'b = 9 cm (T = 90 cm², 90 : 10 = 9)'
  },
  {
    id: 'l2-p6',
    prompt: 'Rombusz átlói: e = 10 cm, f = 12 cm',
    value: 'T = 60 cm² (10 · 12 / 2 = 60)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 70,25 40,44 10,25" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-800">60 cm²</text>
      </svg>
    )
  },
  {
    id: 'l2-p7',
    prompt: 'K = 40 cm, a = 14 cm',
    value: 'b = 6 cm (40/2 - 14 = 6)'
  },
  {
    id: 'l2-p8',
    prompt: 'Ha a oldal kétszerese a b oldalnak (a = 2b)',
    value: 'mb kétszerese ma-nak (mb = 2ma)'
  }
];

// 3. SZINT: Rombusz átlói, mértékegységek és haladó feladatok
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'a = 14 cm, ma = 0,5 dm',
    value: 'T = 70 cm² (0,5 dm = 5 cm, 14 · 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="18,10 65,10 50,40 3,40" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="35" y="28" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">70 cm²</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Rombusz átlója e = 8 cm, T = 40 cm²',
    value: 'Másik átló f = 10 cm (2 · 40 / 8)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 68,25 40,44 12,25" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-800">f = 10</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Négyzet átlója: e = 10 cm',
    value: 'T = 50 cm² (e² / 2 = 100 / 2)'
  },
  {
    id: 'l3-p4',
    prompt: 'Rombusz: K = 40 cm, ma = 7 cm',
    value: 'T = 70 cm² (a = 10 cm, 10 · 7 = 70)'
  },
  {
    id: 'l3-p5',
    prompt: 'b = 20 cm, mb = 6 cm, a = 24 cm',
    value: 'ma = 5 cm (T = 120 cm², 120 : 24 = 5)'
  },
  {
    id: 'l3-p6',
    prompt: 'T = 1,2 dm², a = 15 cm',
    value: 'ma = 8 cm (1,2 dm² = 120 cm², 120 : 15 = 8)'
  },
  {
    id: 'l3-p7',
    prompt: 'Rombusz: e = 14 cm, f = 20 cm',
    value: 'T = 140 cm² (14 · 20 / 2 = 140)'
  },
  {
    id: 'l3-p8',
    prompt: 'Négyzet területe 72 cm²',
    value: 'Átlója e = 12 cm (mert e² / 2 = 72 => e² = 144)'
  }
];

export const ParallelogramAreaMatcher: React.FC<ParallelogramAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory
}) => {
  const activeLvl = (currentLevel ?? level) as any;

  return (
    <MatcherTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      title="5. A Paralelogramma Területe Párosító"
      subtitle="Találd meg a területek, magasságok és oldalak összetartozó párjait!"
      badge="PÁROSÍTÓ JÁTÉK"
      topicTitle="A Paralelogramma Területe"
      themeColor="emerald"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-parallelogram-area-matcher"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default ParallelogramAreaMatcher;
