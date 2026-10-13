import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface PolygonAnglesDiagonalsMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Átlók száma és alaptulajdonságok
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'Négyszög összes átlójának száma',
    value: '2 átló (4 · 1 / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 60,10 20,12" fill="none" className="stroke-purple-600 stroke-2" />
        <line x1="15" y1="40" x2="60" y2="10" className="stroke-indigo-500 stroke-1 stroke-dashed" />
        <line x1="65" y1="40" x2="20" y2="12" className="stroke-indigo-500 stroke-1 stroke-dashed" />
        <text x="40" y="47" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">2 átló</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Ötszög összes átlójának száma',
    value: '5 átló (5 · 2 / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 70,26 58,45 22,45 10,26" fill="none" className="stroke-purple-600 stroke-2" />
        {/* Pentagram diagonals */}
        <line x1="40" y1="6" x2="58" y2="45" className="stroke-rose-400 stroke-1" />
        <line x1="40" y1="6" x2="22" y2="45" className="stroke-rose-400 stroke-1" />
        <line x1="70" y1="26" x2="22" y2="45" className="stroke-rose-400 stroke-1" />
        <line x1="70" y1="26" x2="10" y2="26" className="stroke-rose-400 stroke-1" />
        <line x1="58" y1="45" x2="10" y2="26" className="stroke-rose-400 stroke-1" />
        <text x="40" y="49" textAnchor="middle" className="text-[8px] font-black fill-rose-600">5 átló</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Hatszög összes átlójának száma',
    value: '9 átló (6 · 3 / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-purple-600 stroke-2" />
        <line x1="25" y1="8" x2="55" y2="42" className="stroke-indigo-400 stroke-1" />
        <line x1="55" y1="8" x2="25" y2="42" className="stroke-indigo-400 stroke-1" />
        <line x1="10" y1="25" x2="70" y2="25" className="stroke-indigo-400 stroke-1" />
        <text x="40" y="48" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">9 átló</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Egy csúcsból húzható átlók 7-szögben',
    value: '4 átló (n - 3 = 7 - 3)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <circle cx="20" cy="25" r="4" className="fill-rose-500" />
        <path d="M 20,25 L 60,10 M 20,25 L 65,18 M 20,25 L 65,32 M 20,25 L 60,40" className="stroke-rose-400 stroke-[1.5]" />
        <text x="20" y="42" textAnchor="middle" className="text-[8px] font-black fill-rose-600">d₁ = 4</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Egy csúcsból húzott átlók által kapott háromszögek száma n-szögben',
    value: 'h = n - 2 darab háromszög',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 55,10 25,10" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="15" y1="40" x2="55" y2="10" className="stroke-teal-500 stroke-1" />
        <text x="30" y="32" className="text-[8px] font-bold fill-teal-700">T₁</text>
        <text x="48" y="24" className="text-[8px] font-bold fill-teal-700">T₂</text>
      </svg>
    )
  },
  {
    id: 'l1-p6',
    prompt: 'Háromszög átlóinak száma',
    value: '0 átló (3 - 3 = 0, nincsenek nem szomszédos csúcsok)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 40,10" fill="none" className="stroke-amber-600 stroke-2" />
        <text x="40" y="32" textAnchor="middle" className="text-[9px] font-black fill-amber-700">0 átló</text>
      </svg>
    )
  },
  {
    id: 'l1-p7',
    prompt: 'Nyolcszög összes átlójának száma',
    value: '20 átló (8 · 5 / 2 = 20)'
  },
  {
    id: 'l1-p8',
    prompt: 'Bármely konvex sokszög külső szögeinek összege',
    value: 'Mindig pontosan 360°',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <circle cx="40" cy="25" r="16" fill="none" className="stroke-purple-600 stroke-2" />
        <path d="M 40,9 L 45,13 L 40,17" className="fill-purple-600 stroke-none" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-purple-700">360°</text>
      </svg>
    )
  }
];

// 2. SZINT: Belső szögek összege és hiányzó szögek
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'Négyszög belső szögeinek összege',
    value: '360° ((4 - 2) · 180° = 2 · 180°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="15,40 65,40 55,12 25,15" fill="none" className="stroke-indigo-600 stroke-2" />
        <text x="40" y="30" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">Σ = 360°</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Ötszög belső szögeinek összege',
    value: '540° ((5 - 2) · 180° = 3 · 180°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,8 68,24 58,44 22,44 12,24" fill="none" className="stroke-purple-600 stroke-2" />
        <text x="40" y="30" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">Σ = 540°</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Hatszög belső szögeinek összege',
    value: '720° ((6 - 2) · 180° = 4 · 180°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-bold fill-teal-700">Σ = 720°</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Nyolcszög belső szögeinek összege',
    value: '1080° ((8 - 2) · 180° = 6 · 180°)'
  },
  {
    id: 'l2-p5',
    prompt: 'Négyszög szögei: 80°, 110°, 70°',
    value: 'Negyedik szög = 100° (360° - 260°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="12,42 68,42 58,12 20,15" fill="none" className="stroke-rose-600 stroke-2" />
        <text x="22" y="38" className="text-[7px] font-bold fill-slate-700">80°</text>
        <text x="52" y="38" className="text-[7px] font-bold fill-slate-700">110°</text>
        <text x="46" y="20" className="text-[7px] font-bold fill-slate-700">70°</text>
        <text x="25" y="22" className="text-[8px] font-black fill-rose-600">?</text>
      </svg>
    )
  },
  {
    id: 'l2-p6',
    prompt: 'Ötszög szögei: 100°, 110°, 120°, 90°',
    value: 'Ötödik szög = 120° (540° - 420°)'
  },
  {
    id: 'l2-p7',
    prompt: 'Tízszög (n = 10) belső szögeinek összege',
    value: '1440° ((10 - 2) · 180° = 8 · 180°)'
  },
  {
    id: 'l2-p8',
    prompt: '14 átlója van a sokszögnek',
    value: 'Hétszög (n = 7, mert 7 · 4 / 2 = 14)'
  }
];

// 3. SZINT: Szabályos sokszögek szögei és szimmetriái
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Szabályos ötszög egy belső szöge',
    value: '108° (540° : 5 = 108°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,8 68,24 58,44 22,44 12,24" fill="none" className="stroke-purple-600 stroke-2" />
        <path d="M 28,44 A 6,6 0 0,1 22,38" fill="none" className="stroke-rose-500 stroke-[1.5]" />
        <text x="40" y="38" textAnchor="middle" className="text-[8px] font-black fill-purple-700">108°</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Szabályos ötszög egy külső szöge',
    value: '72° (360° : 5 = 72°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="35,10 60,24 50,42 20,42 10,24" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="20" y1="42" x2="72" y2="42" className="stroke-slate-400 stroke-1 stroke-dashed" />
        <text x="60" y="38" className="text-[8px] font-black fill-rose-600">72°</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Szabályos hatszög egy belső szöge',
    value: '120° (720° : 6 = 120°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-teal-700">120°</text>
      </svg>
    )
  },
  {
    id: 'l3-p4',
    prompt: 'Szabályos hatszög egy külső szöge',
    value: '60° (360° : 6 = 60°)'
  },
  {
    id: 'l3-p5',
    prompt: 'Szabályos nyolcszög egy belső szöge',
    value: '135° (1080° : 8 vagy 180° - 45°)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="28,6 52,6 68,22 68,34 52,46 28,46 12,34 12,22" fill="none" className="stroke-purple-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-purple-700">135°</text>
      </svg>
    )
  },
  {
    id: 'l3-p6',
    prompt: 'Szabályos tízszög egy külső szöge',
    value: '36° (360° : 10 = 36°)'
  },
  {
    id: 'l3-p7',
    prompt: 'Szabályos tizenkétszög egy belső szöge',
    value: '150° (180° - (360° : 12) = 150°)'
  },
  {
    id: 'l3-p8',
    prompt: 'Szabályos hatszög szimmetriatengelyeinek száma',
    value: '6 tengely (3 csúcs-csúcs és 3 oldalfelező-oldalfelező)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="40" y1="4" x2="40" y2="46" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <line x1="10" y1="25" x2="70" y2="25" className="stroke-rose-500 stroke-1 stroke-dashed" />
        <text x="40" y="49" textAnchor="middle" className="text-[8px] font-bold fill-rose-600">6 tengely</text>
      </svg>
    )
  }
];

export const PolygonAnglesDiagonalsMatcher: React.FC<PolygonAnglesDiagonalsMatcherProps> = ({
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
      title="3. Sokszögek Szögei és Átlói Párosító"
      subtitle="Találd meg az átlók, belső szögösszegek és szabályos sokszögek összetartozó párjait!"
      badge="PÁROSÍTÓ JÁTÉK"
      topicTitle="Sokszögek Szögei és Átlói"
      themeColor="purple"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-polygons-matcher"
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

export default PolygonAnglesDiagonalsMatcher;
