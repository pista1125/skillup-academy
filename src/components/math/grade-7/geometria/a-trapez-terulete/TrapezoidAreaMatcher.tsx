import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface TrapezoidAreaMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Területszámítás alapjai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'a = 12 cm, c = 8 cm, m = 5 cm',
    value: 'T = 50 cm² (((12 + 8) / 2) · 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="25" y1="14" x2="25" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">12</text>
        <text x="40" y="11" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">8</text>
        <text x="18" y="28" className="text-[7px] font-bold fill-rose-600">5</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Derékszögű: a = 10 cm, c = 6 cm, d = 4 cm',
    value: 'T = 32 cm² (((10 + 6) / 2) · 4)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 45,14 15,14" fill="none" className="stroke-teal-600 stroke-2" />
        {/* Hungarian right angles: arc + dot at (15, 40) and (15, 14) */}
        <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-teal-600 stroke-1" />
        <circle cx="17.5" cy="37.5" r="0.8" className="fill-teal-600" />
        <path d="M 22 14 A 7 7 0 0 1 15 21" fill="none" className="stroke-teal-600 stroke-1" />
        <circle cx="17.5" cy="16.5" r="0.8" className="fill-teal-600" />
        <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">10</text>
        <text x="30" y="11" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">6</text>
        <text x="8" y="28" className="text-[7px] font-bold fill-rose-600">4</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Középvonal k = 8 cm, m = 6 cm',
    value: 'T = 48 cm² (8 · 6)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 55,12 25,12" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="17.5" y1="26" x2="62.5" y2="26" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="40" y="24" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">k = 8</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'a = 14 cm, c = 6 cm, m = 7 cm',
    value: 'T = 70 cm² (((14 + 6) / 2) · 7)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 50,14 30,14" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">70 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Húrtrapéz: a = 10 cm, c = 6 cm, b = 5 cm',
    value: 'K = 26 cm (10 + 6 + 5 + 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 55,15 25,15" fill="none" className="stroke-indigo-600 stroke-2" />
        <text x="40" y="47" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">10</text>
        <text x="40" y="11" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">6</text>
        <text x="12" y="28" className="text-[6px] font-bold fill-indigo-600">b=5</text>
        <text x="64" y="28" className="text-[6px] font-bold fill-indigo-600">b=5</text>
      </svg>
    )
  }
];

// 2. SZINT: Középvonal és hiányzó adatok
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'T = 60 cm², a = 14 cm, c = 6 cm',
    value: 'm = 6 cm (60 / 10 = 6)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 50,14 30,14" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="30" y1="14" x2="30" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-teal-800">T = 60</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'T = 54 cm², m = 6 cm',
    value: 'k = 9 cm (54 / 6)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-emerald-800">k = T / m</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Derékszögű: T = 45 cm², d = 5 cm, a = 11 cm',
    value: 'Felső alap c = 7 cm (18 - 11)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 45,14 15,14" fill="none" className="stroke-sky-600 stroke-2" />
        {/* Hungarian right angle at (15, 40) */}
        <path d="M 22 40 A 7 7 0 0 0 15 33" fill="none" className="stroke-sky-600 stroke-1" />
        <circle cx="17.5" cy="37.5" r="0.8" className="fill-sky-600" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-sky-800">c = ?</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: '2 egybevágó trapézból paralelogramma',
    value: 'Paralelogramma területe 2T = (a + c) · m',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 50,40 40,15 20,15" fill="none" className="stroke-emerald-600 stroke-1.5" />
        <polygon points="50,40 70,40 60,15 40,15" fill="none" className="stroke-indigo-600 stroke-1 stroke-dashed" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">2 · T</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'k = 15 cm, m = 8 cm',
    value: 'T = 120 cm² (15 · 8)'
  }
];

// 3. SZINT: Összetett és szöveges feladatok
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Húrtrapéz: a = 16 cm, c = 8 cm',
    value: 'Szélső szakaszok x = 4 cm ((16 - 8) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="25" y1="14" x2="25" y2="40" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="55" y1="14" x2="55" y2="40" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 2" />
        <text x="17" y="47" className="text-[6px] font-bold fill-rose-600">x=4</text>
        <text x="63" y="47" className="text-[6px] font-bold fill-rose-600">x=4</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Alapok és magasság megduplázódnak',
    value: 'A terület 4-szeresére nő (2 · 2 = 4)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 70,40 55,14 25,14" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">4× T</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Földgát: a = 16 m, c = 8 m, m = 5 m',
    value: 'Keresztmetszet T = 60 m² (12 · 5)'
  },
  {
    id: 'l3-p4',
    prompt: 'Téglalap (8 × 6) + derékszögű háromszög ((4 × 6)/2)',
    value: 'Trapéz területe = 60 cm² (48 + 12)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="10,40 65,40 45,15 10,15" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="45" y1="15" x2="45" y2="40" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
        <text x="27" y="28" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">48</text>
        <text x="55" y="32" textAnchor="middle" className="text-[6px] font-bold fill-emerald-700">12</text>
      </svg>
    )
  },
  {
    id: 'l3-p5',
    prompt: 'a : c = 3 : 1, a + c = 20 cm, m = 6 cm',
    value: 'T = 60 cm² (k = 10 cm, 10 · 6)'
  }
];

export const TrapezoidAreaMatcher: React.FC<TrapezoidAreaMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory
}) => {
  const activeLvl = Number(currentLevel ?? level) || 1;
  return (
    <MatcherTemplate
      key={`trapezoid-matcher-lvl-${activeLvl}`}
      title="Trapéz Terület Párosító"
      subtitle="Keresd meg a trapéz adataihoz tartozó területeket, középvonalakat és összefüggéseket!"
      badge="7. OSZTÁLY • PÁROSÍTÓ"
      level={activeLvl as any}
      currentLevel={activeLvl as any}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
    />
  );
};
