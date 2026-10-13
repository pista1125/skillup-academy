import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface TriangleAreaMatcherProps {
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
    prompt: 'a = 10 cm, ma = 6 cm',
    value: 'T = 30 cm² ((10 · 6) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 40,10" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="40" y1="10" x2="40" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">a = 10</text>
        <text x="32" y="26" className="text-[7px] font-bold fill-rose-600">6</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Derékszögű: a = 8 cm, b = 6 cm',
    value: 'T = 24 cm² ((8 · 6) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 15,10" fill="none" className="stroke-teal-600 stroke-2" />
        <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
        <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
        <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">8</text>
        <text x="8" y="26" className="text-[7px] font-bold fill-teal-700">6</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'a = 12 cm, ma = 5 cm',
    value: 'T = 30 cm² ((12 · 5) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 25,12" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="25" y1="12" x2="25" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">12</text>
        <text x="18" y="28" className="text-[7px] font-bold fill-rose-600">5</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Derékszögű: a = 5 cm, b = 12 cm',
    value: 'T = 30 cm² ((5 · 12) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,42 70,42 15,15" fill="none" className="stroke-emerald-600 stroke-2" />
        <path d="M 22 42 A 7 7 0 0 0 15 35" fill="none" className="stroke-emerald-600 stroke-1" />
        <circle cx="17.5" cy="39.5" r="0.8" className="fill-emerald-600" />
        <text x="42" y="30" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">30 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Háromszög oldalai: 5 cm, 7 cm, 8 cm',
    value: 'K = 20 cm (5 + 7 + 8)'
  },
  {
    id: 'l1-p6',
    prompt: 'a = 14 cm, ma = 4 cm',
    value: 'T = 28 cm² ((14 · 4) / 2)'
  },
  {
    id: 'l1-p7',
    prompt: 'Szabályos háromszög: a = 9 cm',
    value: 'K = 27 cm (3 · 9)'
  },
  {
    id: 'l1-p8',
    prompt: 'Miért kell osztani 2-vel?',
    value: 'Mert a háromszög területe a kiegészítő paralelogramma fele',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 50,40 30,12" fill="none" className="stroke-teal-600 stroke-2" />
        <polygon points="30,12 70,12 50,40" fill="none" className="stroke-teal-400 stroke-1 stroke-dashed" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-teal-700">Feleződés</text>
      </svg>
    )
  }
];

// 2. SZINT: Két magasság kapcsolata és hiányzó adatok
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'T = 40 cm², a = 10 cm',
    value: 'ma = 8 cm ((2 · 40) / 10)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 68,40 38,10" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="38" y1="10" x2="38" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="39" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-800">T = 40</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Derékszögű: a = 6 cm, c = 10 cm, T = 24 cm²',
    value: 'Másik befogó b = 8 cm ((2 · 24) / 6)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 15,10" fill="none" className="stroke-indigo-600 stroke-2" />
        <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-indigo-600 stroke-1" />
        <circle cx="17.5" cy="37.5" r="0.8" className="fill-indigo-600" />
        <text x="40" y="24" className="text-[7px] font-bold fill-slate-500">c = 10</text>
        <text x="40" y="47" className="text-[7px] font-bold fill-slate-700">a = 6</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'a = 12 cm, ma = 6 cm, b = 9 cm',
    value: 'mb = 8 cm (12 · 6 = 72 = 9 · 8)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 65,40 40,12" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="40" y1="12" x2="40" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="37" y="46" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">a=12</text>
        <text x="56" y="24" className="text-[7px] font-bold fill-indigo-700">b=9</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Derékszögű: a = 3 cm, b = 4 cm, c = 5 cm',
    value: 'mc = 2,4 cm ((3 · 4) / 5 = 12 / 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 15,12" fill="none" className="stroke-teal-600 stroke-2" />
        <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
        <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
        <line x1="15" y1="12" x2="40" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="25" y="32" className="text-[7px] font-bold fill-rose-600">mc = 2,4</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'T = 36 cm², ma = 6 cm',
    value: 'Alap a = 12 cm ((2 · 36) / 6)'
  },
  {
    id: 'l2-p6',
    prompt: 'Egybevágó háromszög párok területe',
    value: 'Pontosan egyenlő (alakjuk és területük megegyezik)'
  },
  {
    id: 'l2-p7',
    prompt: 'Tompaszögű háromszög magassága',
    value: 'A háromszögön kívülre esik az alap meghosszabbítására'
  },
  {
    id: 'l2-p8',
    prompt: 'Háromszög területe: a = 1,5 dm, ma = 8 cm',
    value: 'T = 60 cm² ((15 cm · 8 cm) / 2)'
  }
];

// 3. SZINT: Összetett és elméleti összefüggések
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Egyenlő szárú: alap a = 10 cm, szár b = 13 cm, ma = 12 cm',
    value: 'T = 60 cm² ((10 · 12) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,42 65,42 40,8" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="40" y1="8" x2="40" y2="42" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="40" y="48" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">10</text>
        <text x="56" y="24" className="text-[7px] font-bold fill-slate-600">b=13</text>
        <text x="32" y="26" className="text-[7px] font-bold fill-rose-600">12</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Derékszögű háromszög befogói 20%-kal nőnek',
    value: 'Területe 44%-kal nő (1,2 · 1,2 = 1,44)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 15,10" fill="none" className="stroke-teal-600 stroke-2" />
        <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
        <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
        <text x="40" y="30" textAnchor="middle" className="text-[7px] font-bold fill-teal-700">+44% T</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Alap kétszeresére nő, magasság feleződik',
    value: 'A terület nagysága változatlan marad'
  },
  {
    id: 'l3-p4',
    prompt: 'Két oldal és a köztük lévő szög: 30°, a = 12 cm, b = 8 cm',
    value: 'T = 24 cm² (ma = 8 / 2 = 4 -> (12 · 4) / 2)'
  },
  {
    id: 'l3-p5',
    prompt: 'Egyenlő oldalú háromszög: a = 8 cm, m ≈ 6,93 cm',
    value: 'T ≈ 27,7 cm² ((8 · 6,93) / 2)'
  },
  {
    id: 'l3-p6',
    prompt: 'Háromszög súlyvonala a területet...',
    value: 'Két pontosan egyenlő területű részre osztja'
  },
  {
    id: 'l3-p7',
    prompt: 'a · ma = b · mb = c · mc',
    value: 'Mindegyik szorzat a terület kétszeresével (2T) egyenlő'
  },
  {
    id: 'l3-p8',
    prompt: 'Derékszögű: a = 9 cm, b = 12 cm, c = 15 cm',
    value: 'mc = 7,2 cm ((9 · 12) / 15 = 108 / 15)'
  }
];

export const TriangleAreaMatcher: React.FC<TriangleAreaMatcherProps> = ({
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
      title="6. A Háromszög Területe Párosító"
      subtitle="Párosítsd össze a megadott adatokat, képleteket és területszámításokat!"
      badge="PÁROSÍTÓ"
      topicTitle="A háromszög területe"
      themeColor="teal"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-triangle-area-matcher"
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

export default TriangleAreaMatcher;
