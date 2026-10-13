import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface DeltoidAreaMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: A deltoid területének és kerületének alapjai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'e = 10 cm, f = 6 cm',
    value: 'T = 30 cm² ((10 · 6) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,5 65,22 40,45 15,22" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="40" y1="5" x2="40" y2="45" className="stroke-indigo-400 stroke-1 stroke-dashed" />
        <line x1="15" y1="22" x2="65" y2="22" className="stroke-indigo-400 stroke-1 stroke-dashed" />
        {/* Hungarian right angle: arc + dot at (40, 22) */}
        <path d="M 40 17 A 5 5 0 0 1 45 22" fill="none" className="stroke-indigo-600 stroke-1" />
        <circle cx="43" cy="19" r="0.8" className="fill-indigo-600" />
        <text x="44" y="38" className="text-[6px] font-bold fill-indigo-700">e = 10</text>
        <text x="50" y="19" className="text-[6px] font-bold fill-indigo-700">f = 6</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'e = 14 cm, f = 8 cm',
    value: 'T = 56 cm² ((14 · 8) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 68,24 40,46 12,24" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="27" textAnchor="middle" className="text-[8px] font-black fill-emerald-800">56 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Rombusz: e = 12 cm, f = 10 cm',
    value: 'T = 60 cm² ((12 · 10) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,8 65,25 40,42 15,25" fill="none" className="stroke-purple-600 stroke-2" />
        <line x1="40" y1="8" x2="40" y2="42" className="stroke-purple-400 stroke-1 stroke-dashed" />
        <line x1="15" y1="25" x2="65" y2="25" className="stroke-purple-400 stroke-1 stroke-dashed" />
        {/* Hungarian right angle at (40, 25) */}
        <path d="M 40 20 A 5 5 0 0 1 45 25" fill="none" className="stroke-purple-600 stroke-1" />
        <circle cx="43" cy="22" r="0.8" className="fill-purple-600" />
        <text x="40" y="47" textAnchor="middle" className="text-[6px] font-bold fill-purple-700">Rombusz</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Deltoid oldalai: a = 6 cm, b = 9 cm',
    value: 'K = 30 cm (2 · (6 + 9))',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,5 65,20 40,45 15,20" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="24" y="11" className="text-[6px] font-bold fill-teal-700">a = 6</text>
        <text x="23" y="36" className="text-[6px] font-bold fill-teal-700">b = 9</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Négyzet átlója: d = 8 cm (speciális deltoid)',
    value: 'T = 32 cm² (8² / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,8 60,25 40,42 20,25" fill="none" className="stroke-amber-600 stroke-2" />
        <line x1="40" y1="8" x2="40" y2="42" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="20" y1="25" x2="60" y2="25" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" />
        {/* Hungarian right angle */}
        <path d="M 40 20 A 5 5 0 0 1 45 25" fill="none" className="stroke-amber-600 stroke-1" />
        <circle cx="43" cy="22" r="0.8" className="fill-amber-600" />
        <text x="40" y="48" textAnchor="middle" className="text-[6px] font-bold fill-amber-700">d = 8 cm</text>
      </svg>
    )
  }
];

// 2. SZINT: Hiányzó adatok és rombusz összefüggések
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'T = 40 cm², e = 10 cm',
    value: 'f = 8 cm (2 · 40 / 10)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 64,22 40,44 16,22" fill="none" className="stroke-indigo-600 stroke-2" />
        <text x="40" y="27" textAnchor="middle" className="text-[7px] font-black fill-indigo-800">T = 40</text>
        <text x="40" y="48" textAnchor="middle" className="text-[6px] font-bold fill-slate-700">e = 10, f = ?</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Rombusz: a = 6 cm, ma = 5 cm',
    value: 'T = 30 cm² (a · ma = 6 · 5)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="20,40 60,40 68,15 28,15" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="28" y1="15" x2="28" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
        {/* Hungarian right angle at (28, 40) */}
        <path d="M 34 40 A 6 6 0 0 0 28 34" fill="none" className="stroke-rose-600 stroke-1" />
        <circle cx="30" cy="38" r="0.8" className="fill-rose-600" />
        <text x="40" y="47" textAnchor="middle" className="text-[6px] font-bold fill-slate-700">a = 6</text>
        <text x="21" y="28" className="text-[6px] font-bold fill-rose-600">ma = 5</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'T = 63 cm², f = 14 cm',
    value: 'e = 9 cm (2 · 63 / 14)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,5 68,20 40,45 12,20" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="27" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">T = 63</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Mindkét átlót megduplázzuk (2e és 2f)',
    value: 'A terület 4-szeresére nő ((2e · 2f)/2 = 4T)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,8 64,25 40,42 16,25" fill="none" className="stroke-blue-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-blue-800">T' = 4 · T</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'Rombusz átlói: e = 16 cm, f = 12 cm',
    value: 'T = 96 cm² ((16 · 12) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 66,25 40,44 14,25" fill="none" className="stroke-purple-600 stroke-2" />
        <line x1="40" y1="6" x2="40" y2="44" className="stroke-purple-400 stroke-1 stroke-dashed" />
        <line x1="14" y1="25" x2="66" y2="25" className="stroke-purple-400 stroke-1 stroke-dashed" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-purple-800">96 cm²</text>
      </svg>
    )
  }
];

// 3. SZINT: Alkalmazások, becslések és összetett feladatok
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Papírsárkány lécek: 60 cm és 40 cm',
    value: 'Papírigény = 1200 cm² (0,12 m²)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,4 66,18 40,46 14,18" fill="#e0e7ff" className="stroke-indigo-600 stroke-2" />
        <line x1="40" y1="4" x2="40" y2="46" className="stroke-rose-500 stroke-1" />
        <line x1="14" y1="18" x2="66" y2="18" className="stroke-rose-500 stroke-1" />
        <text x="40" y="32" textAnchor="middle" className="text-[6px] font-bold fill-indigo-900">1200 cm²</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Konkáv deltoid (nyílhegy): e = 12 cm, f = 5 cm',
    value: 'T = 30 cm² (képlet változatlan: (e · f) / 2)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,5 65,45 40,30 15,45" fill="none" className="stroke-rose-600 stroke-2" />
        <line x1="40" y1="5" x2="40" y2="30" className="stroke-rose-400 stroke-1 stroke-dashed" />
        <line x1="15" y1="45" x2="65" y2="45" className="stroke-rose-400 stroke-1 stroke-dashed" />
        <text x="40" y="24" textAnchor="middle" className="text-[6px] font-black fill-rose-700">30 cm²</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Köréírt téglalap: oldalai e = 15 cm, f = 8 cm',
    value: 'Téglalap = 120 cm², Deltoid = 60 cm² (fele)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="15" y="8" width="50" height="34" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="40,8 65,22 40,42 15,22" fill="#dcfce7" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="26" textAnchor="middle" className="text-[6px] font-bold fill-emerald-800">T = Ttégla / 2</text>
      </svg>
    )
  },
  {
    id: 'l3-p4',
    prompt: 'Rombusz: K = 40 cm (a = 10 cm), ma = 8 cm',
    value: 'T = 80 cm² (10 · 8)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="20,40 60,40 68,16 28,16" fill="none" className="stroke-purple-600 stroke-2" />
        <text x="44" y="30" textAnchor="middle" className="text-[7px] font-black fill-purple-800">80 cm²</text>
        <text x="40" y="47" textAnchor="middle" className="text-[6px] font-bold fill-slate-700">K = 40</text>
      </svg>
    )
  },
  {
    id: 'l3-p5',
    prompt: 'Deltoid felbontása 4 derékszögű háromszögre',
    value: 'T = 2 · (T₁ + T₂) = (e · f) / 2',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <polygon points="40,6 64,22 40,44 16,22" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="40" y1="6" x2="40" y2="44" className="stroke-teal-400 stroke-1" />
        <line x1="16" y1="22" x2="64" y2="22" className="stroke-teal-400 stroke-1" />
        {/* Hungarian right angle at (40, 22) */}
        <path d="M 40 17 A 5 5 0 0 1 45 22" fill="none" className="stroke-teal-600 stroke-1" />
        <circle cx="43" cy="19" r="0.8" className="fill-teal-600" />
        <text x="32" y="16" className="text-[5px] font-bold fill-teal-700">1</text>
        <text x="48" y="16" className="text-[5px] font-bold fill-teal-700">1</text>
        <text x="32" y="32" className="text-[5px] font-bold fill-teal-700">2</text>
        <text x="48" y="32" className="text-[5px] font-bold fill-teal-700">2</text>
      </svg>
    )
  }
];

export const DeltoidAreaMatcher: React.FC<DeltoidAreaMatcherProps> = ({
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
      key={`deltoid-matcher-lvl-${activeLvl}`}
      title="Deltoid Terület Párosító"
      subtitle="Keresd meg a deltoid átlóihoz és oldalaihoz tartozó területeket, kerületeket és összefüggéseket!"
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
