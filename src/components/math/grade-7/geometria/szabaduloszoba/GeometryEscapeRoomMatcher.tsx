import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface GeometryEscapeRoomMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: 1. Zár - Szögek és átlók rejtvénykódjai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: '1. Lakat: Háromszög belső szögösszege',
    value: 'Kód: 180° ((3 - 2) · 180°)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="10,38 60,38 35,10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
        <circle cx="35" cy="28" r="4" fill="#6d28d9" />
        <text x="35" y="30.5" textAnchor="middle" className="text-[6px] font-bold fill-white">180</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: '2. Lakat: Négyszög belső szögösszege',
    value: 'Kód: 360° ((4 - 2) · 180°)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="12,38 58,38 52,10 18,10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
        <circle cx="35" cy="24" r="4" fill="#6d28d9" />
        <text x="35" y="26.5" textAnchor="middle" className="text-[5.5px] font-bold fill-white">360</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: '3. Lakat: Ötszög átlóinak száma',
    value: 'Kód: 5 átló (5 · 2 / 2 = 5)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="35,6 60,22 50,40 20,40 10,22" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.2" />
        <text x="35" y="26" textAnchor="middle" className="text-[7px] font-bold fill-purple-900">d = 5</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: '4. Lakat: Hatszög belső szögösszege',
    value: 'Kód: 720° ((6 - 2) · 180°)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="20,8 50,8 62,24 50,40 20,40 8,24" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
        <text x="35" y="27" textAnchor="middle" className="text-[6.5px] font-bold fill-purple-900">720°</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: '5. Lakat: Konvex sokszögek külső szögösszege',
    value: 'Kód: Mindig 360° (állandó)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <circle cx="35" cy="22.5" r="14" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.2" />
        <text x="35" y="25" textAnchor="middle" className="text-[6.5px] font-bold fill-purple-900">∑ = 360°</text>
      </svg>
    )
  }
];

// 2. SZINT: 2. Zár - Síkidomok Területkódjai
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'Lakat: Derékszögű 3-szög (a=6, b=8)',
    value: 'Kód: T = 24 cm² ((6 · 8) / 2)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="12,38 58,38 12,10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
        <path d="M 12 30 A 8 8 0 0 1 20 38" fill="none" stroke="#d97706" strokeWidth="1" />
        <circle cx="16" cy="34" r="1" fill="#d97706" />
        <text x="35" y="26" className="text-[6.5px] font-bold fill-amber-900">T=24</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Lakat: Paralelogramma (a=8, m=5)',
    value: 'Kód: T = 40 cm² (8 · 5 = 40)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="10,36 46,36 60,12 24,12" fill="#d1fae5" stroke="#059669" strokeWidth="1.2" />
        <line x1="24" y1="12" x2="24" y2="36" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
        <text x="36" y="26" className="text-[6.5px] font-bold fill-emerald-900">T=40</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Lakat: Trapéz (a=10, c=4, m=6)',
    value: 'Kód: T = 42 cm² (k = 7, 7 · 6 = 42)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="10,36 60,36 48,12 22,12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
        <text x="35" y="27" textAnchor="middle" className="text-[6.5px] font-bold fill-blue-900">T=42</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Lakat: Deltoid (e=10, f=6)',
    value: 'Kód: T = 30 cm² ((10 · 6) / 2)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="35,6 55,22 35,38 15,22" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
        <line x1="35" y1="6" x2="35" y2="38" stroke="#9d174d" strokeWidth="0.8" />
        <line x1="15" y1="22" x2="55" y2="22" stroke="#9d174d" strokeWidth="0.8" />
        <text x="35" y="25" textAnchor="middle" className="text-[6.5px] font-bold fill-pink-900">T=30</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'Lakat: Rombusz (e=8, f=8)',
    value: 'Kód: T = 32 cm² ((8 · 8) / 2 = 32)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="35,6 55,22 35,38 15,22" fill="#d1fae5" stroke="#059669" strokeWidth="1.2" />
        <text x="35" y="25" textAnchor="middle" className="text-[6.5px] font-bold fill-emerald-900">T=32</text>
      </svg>
    )
  }
];

// 3. SZINT: 3. Zár - Testek Mesterkódjai
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Mesterzár: Kocka éle a=3 cm',
    value: 'Kód: V = 27 cm³ (3 · 3 · 3)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="15,30 40,30 50,18 25,18" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <polygon points="15,15 40,15 50,3 25,3" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
        <polygon points="15,15 40,15 40,30 15,30" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
        <text x="27" y="25" textAnchor="middle" className="text-[6px] font-bold fill-blue-900">V=27</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Mesterzár: Téglatest (2 × 3 × 4 cm)',
    value: 'Kód: V = 24 cm³ (2 · 3 · 4)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <rect x="12" y="14" width="30" height="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
        <polygon points="12,14 42,14 55,6 25,6" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1" />
        <polygon points="42,14 55,6 55,26 42,34" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1" />
        <text x="27" y="26" textAnchor="middle" className="text-[6px] font-bold fill-purple-900">V=24</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Mesterzár: Hasáb (T_a=6, M=10)',
    value: 'Kód: V = 60 cm³ (6 · 10 = 60)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="15,35 45,35 30,22" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <polygon points="15,15 45,15 30,2" fill="#fdba74" stroke="#ea580c" strokeWidth="1" />
        <line x1="15" y1="15" x2="15" y2="35" stroke="#ea580c" strokeWidth="1" />
        <line x1="45" y1="15" x2="45" y2="35" stroke="#ea580c" strokeWidth="1" />
        <text x="30" y="27" textAnchor="middle" className="text-[6px] font-bold fill-orange-950">V=60</text>
      </svg>
    )
  },
  {
    id: 'l3-p4',
    prompt: 'Mesterzár: Oktaéder éleinek száma',
    value: 'Kód: E = 12 (C=6, L=8 ⟹ 6 + 8 - 2)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="35,4 18,22 35,32" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
        <polygon points="35,4 52,22 35,32" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1" />
        <polygon points="35,40 18,22 35,32" fill="#818cf8" stroke="#4f46e5" strokeWidth="1" />
        <polygon points="35,40 52,22 35,32" fill="#6366f1" stroke="#4f46e5" strokeWidth="1" />
        <text x="35" y="24" textAnchor="middle" className="text-[6px] font-bold fill-white">E=12</text>
      </svg>
    )
  },
  {
    id: 'l3-p5',
    prompt: 'Mesterzár: Tetraéder éleinek száma',
    value: 'Kód: E = 6 (C=4, L=4 ⟹ 4 + 4 - 2)',
    figure: (
      <svg viewBox="0 0 70 45" className="w-14 h-9">
        <polygon points="35,6 15,36 40,40" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <polygon points="35,6 40,40 55,30" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
        <text x="35" y="28" textAnchor="middle" className="text-[6px] font-bold fill-orange-950">E=6</text>
      </svg>
    )
  }
];

export const GeometryEscapeRoomMatcher: React.FC<GeometryEscapeRoomMatcherProps> = ({
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
      key={`escape-room-matcher-lvl-${activeLvl}`}
      title="Szabadulószoba Kódfejtő Párosító"
      subtitle="Párosítsd a titkos lakatokat és rejtvényeket a helyes kódértékekkel!"
      badge="7. OSZTÁLY • 🔐 11. SZABADULÓSZOBA"
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
