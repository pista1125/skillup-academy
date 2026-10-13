import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface SolidsInSpaceAndPlaneMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Testek és síkbeli testhálók
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'Kocka testhálója',
    value: '6 egybevágó négyzetlap (pl. kereszt alakzatban)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="34" y="5" width="12" height="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <rect x="22" y="17" width="12" height="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <rect x="34" y="17" width="12" height="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <rect x="46" y="17" width="12" height="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <rect x="34" y="29" width="12" height="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <rect x="34" y="41" width="12" height="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Négyzetes gúla (piramis) hálója',
    value: '1 négyzet alaplap + 4 egybevágó háromszög oldallap',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="30" y="18" width="20" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <polygon points="30,18 50,18 40,4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        <polygon points="30,38 50,38 40,52" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        <polygon points="30,18 30,38 16,28" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        <polygon points="50,18 50,38 64,28" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Háromoldalú hasáb hálója',
    value: '2 háromszög alakú alaplap + 3 téglalap palástlap',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="15" y="18" width="16" height="20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
        <rect x="31" y="18" width="20" height="20" fill="#ede9fe" stroke="#4f46e5" strokeWidth="1" />
        <rect x="51" y="18" width="16" height="20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
        <polygon points="31,18 51,18 41,5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <polygon points="31,38 51,38 41,51" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Téglatest hálója',
    value: '6 téglalap, páronként 3-féle egybevágó méretben',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="30" y="6" width="20" height="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <rect x="12" y="18" width="18" height="18" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <rect x="30" y="18" width="20" height="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <rect x="50" y="18" width="18" height="18" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <rect x="30" y="36" width="20" height="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Tetraéder (szabályos 4-lapú) hálója',
    value: '4 egybevágó szabályos háromszögből álló háromszög-háló',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="40,6 64,48 16,48" fill="none" stroke="#059669" strokeWidth="1.5" />
        <polygon points="40,48 52,27 28,27" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
      </svg>
    )
  }
];

// 2. SZINT: Vetületi ábrázolás (Háromkép-rendszer)
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'Kocka mindhárom merőleges vetülete',
    value: 'Elölnézet: négyzet, Felülnézet: négyzet, Oldalnézet: négyzet',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="12" y="15" width="16" height="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <rect x="34" y="15" width="16" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <rect x="56" y="15" width="16" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <text x="40" y="44" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">3 négyzet</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Henger vetületi ábrázolása',
    value: 'Elöl- és oldalnézet: téglalap, Felülnézet: kör',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="14" y="12" width="18" height="24" fill="#ede9fe" stroke="#6366f1" strokeWidth="1" />
        <circle cx="52" cy="24" r="12" fill="#ede9fe" stroke="#6366f1" strokeWidth="1" />
        <text x="40" y="48" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">Téglalap + Kör</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Négyzetes gúla vetületei',
    value: 'Elöl- és oldalnézet: háromszög, Felülnézet: négyzet átlókkal',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="12,36 34,36 23,12" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        <rect x="46" y="14" width="22" height="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <line x1="46" y1="14" x2="68" y2="36" stroke="#16a34a" strokeWidth="1" />
        <line x1="68" y1="14" x2="46" y2="36" stroke="#16a34a" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Háromoldalú egyenes hasáb vetületei',
    value: 'Oldalnézet: háromszög, Elöl- és felülnézet: téglalap',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="12,36 32,36 22,14" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
        <rect x="42" y="14" width="26" height="22" fill="#ede9fe" stroke="#4f46e5" strokeWidth="1" />
        <text x="40" y="48" textAnchor="middle" className="text-[6px] font-bold fill-slate-700">Háromszög + Téglalapok</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'Kúp vetületi képei',
    value: 'Elöl- és oldalnézet: egyenlő szárú háromszög, Felülnézet: kör ponttal a közepén',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="14,36 36,36 25,12" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <circle cx="56" cy="24" r="12" fill="#ffedd5" stroke="#ea580c" strokeWidth="1" />
        <circle cx="56" cy="24" r="1.5" fill="#ea580c" />
      </svg>
    )
  }
];

// 3. SZINT: Csúcsok, Lapok, Élek és az Euler-tétel (C + L = E + 2)
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Kocka / Téglatest (Euler-összefüggés)',
    value: 'C = 8, L = 6, E = 12 (8 + 6 = 12 + 2 = 14)'
  },
  {
    id: 'l3-p2',
    prompt: 'Négyzet alapú gúla (C, L, E)',
    value: 'C = 5, L = 5, E = 8 (5 + 5 = 8 + 2 = 10)'
  },
  {
    id: 'l3-p3',
    prompt: 'Háromoldalú hasáb (C, L, E)',
    value: 'C = 6, L = 5, E = 9 (6 + 5 = 9 + 2 = 11)'
  },
  {
    id: 'l3-p4',
    prompt: 'Tetraéder (Háromoldalú gúla)',
    value: 'C = 4, L = 4, E = 6 (4 + 4 = 6 + 2 = 8)'
  },
  {
    id: 'l3-p5',
    prompt: 'Ötoldalú hasáb éleinek, csúcsainak száma',
    value: 'C = 10, L = 7, E = 15 (10 + 7 = 15 + 2 = 17)'
  }
];

export const SolidsInSpaceAndPlaneMatcher: React.FC<SolidsInSpaceAndPlaneMatcherProps> = ({
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
      key={`solids-matcher-lvl-${activeLvl}`}
      title="Testek Térben és Síkban Párosító"
      subtitle="Párosítsd a testeket kiterített hálóikkal, vetületeikkel és Euler-képletükkel!"
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
