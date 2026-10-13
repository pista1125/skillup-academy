import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface PrismSurfaceVolumeMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Kocka és téglatest alapjai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'Kocka: a = 4 cm (V és A)',
    value: 'V = 64 cm³ (4³), A = 96 cm² (6 · 16)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="15,45 50,45 65,33 30,33" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <polygon points="15,22 50,22 65,10 30,10" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        <polygon points="15,22 50,22 50,45 15,45" fill="#fef9c3" fillOpacity="0.4" stroke="#b45309" strokeWidth="1.5" />
        <polygon points="50,22 65,10 65,33 50,45" fill="#fed7aa" fillOpacity="0.5" stroke="#c2410c" strokeWidth="1.5" />
        <text x="32" y="52" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">a = 4</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Téglatest: a = 3 cm, b = 4 cm, c = 5 cm',
    value: 'V = 60 cm³ (3 · 4 · 5)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="10,48 55,48 70,36 25,36" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <polygon points="10,24 55,24 70,12 25,12" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
        <polygon points="10,24 55,24 55,48 10,48" fill="#fef9c3" fillOpacity="0.4" stroke="#b45309" strokeWidth="1.5" />
        <polygon points="55,24 70,12 70,36 55,48" fill="#fed7aa" fillOpacity="0.5" stroke="#c2410c" strokeWidth="1.5" />
        <text x="32" y="40" textAnchor="middle" className="text-[7px] font-black fill-amber-800">60 cm³</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Téglatest felszíne: a = 2 cm, b = 5 cm, c = 3 cm',
    value: 'A = 62 cm² (2 · (10 + 15 + 6))',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="15" y="15" width="50" height="25" fill="#fed7aa" fillOpacity="0.4" stroke="#ea580c" strokeWidth="1.5" />
        <text x="40" y="30" textAnchor="middle" className="text-[7px] font-black fill-orange-800">A = 62</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Kocka: a = 10 cm (literben kifejezve)',
    value: 'V = 1000 cm³ = 1 dm³ = 1 liter',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="20,44 50,44 62,32 32,32" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
        <polygon points="20,20 50,20 62,8 32,8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
        <polygon points="20,20 50,20 50,44 20,44" fill="#e0f2fe" fillOpacity="0.5" stroke="#0369a1" strokeWidth="1.5" />
        <text x="35" y="34" textAnchor="middle" className="text-[7px] font-black fill-sky-800">1 liter</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Hasáb: Ta = 20 cm², M = 6 cm',
    value: 'V = 120 cm³ (Ta · M = 20 · 6)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="15,48 65,48 55,20 25,20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="40" y="36" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">120 cm³</text>
      </svg>
    )
  }
];

// 2. SZINT: Háromoldalú hasáb és hiányzó méretek
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'Háromszög alap (a = 6 cm, b = 8 cm befogók), M = 10 cm',
    value: 'V = 240 cm³ (Ta = 24 cm², 24 · 10)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="15,48 65,48 25,38" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
        <polygon points="15,22 65,22 25,12" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
        <polygon points="15,22 65,22 65,48 15,48" fill="#ede9fe" fillOpacity="0.4" stroke="#4338ca" strokeWidth="1.5" />
        <text x="40" y="38" textAnchor="middle" className="text-[7px] font-black fill-indigo-800">240 cm³</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Téglatest: V = 180 cm³, a = 5 cm, b = 4 cm',
    value: 'c = 9 cm (180 / (5 · 4) = 180 / 20)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="20" y="15" width="40" height="25" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="40" y="30" textAnchor="middle" className="text-[7px] font-bold fill-amber-900">c = ?</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'Négyzetes oszlop: a = 3 cm, M = 10 cm',
    value: 'V = 90 cm³ (9 · 10), A = 138 cm² (18 + 120)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="25,48 55,48 65,38 35,38" fill="#fef9c3" stroke="#b45309" strokeWidth="1" />
        <polygon points="25,18 55,18 65,8 35,8" fill="#fef9c3" stroke="#b45309" strokeWidth="1.5" />
        <line x1="25" y1="18" x2="25" y2="48" stroke="#b45309" strokeWidth="1.5" />
        <line x1="55" y1="18" x2="55" y2="48" stroke="#b45309" strokeWidth="1.5" />
        <line x1="65" y1="8" x2="65" y2="38" stroke="#b45309" strokeWidth="1.5" />
        <text x="40" y="35" textAnchor="middle" className="text-[7px] font-black fill-amber-800">V = 90</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'Kiterített palást: Ka = 15 cm, M = 8 cm',
    value: 'Tp = 120 cm² (téglalap területe: 15 · 8)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="10" y="18" width="60" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
        <text x="40" y="30" textAnchor="middle" className="text-[6px] font-bold fill-orange-950">Tp = 120 cm²</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'Kocka éle térfogatból: V = 27 cm³',
    value: 'a = 3 cm, Felszíne: A = 54 cm² (6 · 3²)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="20,44 50,44 62,32 32,32" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        <polygon points="20,20 50,20 62,8 32,8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="20" y1="20" x2="20" y2="44" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="50" y1="20" x2="50" y2="44" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="62" y1="8" x2="62" y2="32" stroke="#16a34a" strokeWidth="1.5" />
        <text x="35" y="34" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">a = 3 cm</text>
      </svg>
    )
  }
];

// 3. SZINT: Gyakorlati és összetett feladatok
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Akvárium: 50 cm × 40 cm alap, 20 liter víz',
    value: 'Vízmagasság M = 10 cm (20 000 / 2000)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="12" y="15" width="56" height="26" fill="none" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="12" y="27" width="56" height="14" fill="#bae6fd" fillOpacity="0.7" />
        <text x="40" y="37" textAnchor="middle" className="text-[6px] font-bold fill-sky-900">M = 10 cm</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: 'Vas kocka (a = 10 cm, sűrűség ρ = 7,8 g/cm³)',
    value: 'Tömeg: m = 7,8 kg (1000 cm³ · 7,8 g/cm³)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <rect x="22" y="16" width="36" height="24" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
        <text x="40" y="30" textAnchor="middle" className="text-[6px] font-bold fill-slate-800">7,8 kg</text>
      </svg>
    )
  },
  {
    id: 'l3-p3',
    prompt: 'Medence csempézése: 10 m × 5 m, mélység 2 m',
    value: 'Felület: A = 110 m² (fenék 50 + falak 60)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="10,42 60,42 70,28 20,28" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
        <text x="40" y="37" textAnchor="middle" className="text-[6px] font-bold fill-teal-900">110 m²</text>
      </svg>
    )
  },
  {
    id: 'l3-p4',
    prompt: 'Háromoldalú hasáb: oldalai 5, 12, 13 cm, M = 10 cm',
    value: 'A = 360 cm² (2 · 30 + 30 · 10)',
    figure: (
      <svg viewBox="0 0 80 55" className="w-16 h-10">
        <polygon points="15,46 65,46 25,36" fill="#ede9fe" stroke="#6366f1" strokeWidth="1.5" />
        <text x="40" y="42" textAnchor="middle" className="text-[6px] font-bold fill-indigo-900">360 cm²</text>
      </svg>
    )
  },
  {
    id: 'l3-p5',
    prompt: 'Kocka élének duplázása (a ⟶ 2a)',
    value: 'Felszín: 4-szeresére (2²), Térfogat: 8-szorosára (2³)'
  }
];

export const PrismSurfaceVolumeMatcher: React.FC<PrismSurfaceVolumeMatcherProps> = ({
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
      key={`prism-matcher-lvl-${activeLvl}`}
      title="Hasáb Felszín és Térfogat Párosító"
      subtitle="Keresd meg a hasábok adataihoz tartozó felszíneket, térfogatokat és összefüggéseket!"
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
