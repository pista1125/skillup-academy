import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface PrismSurfaceVolumeSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Kiszámított térfogat nagysága szerint
const level1Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a hasábokat a térfogatuk (V) nagysága szerint!',
  categories: [
    { id: 'small', name: '150 cm³ alatt (< 150)', color: 'emerald' },
    { id: 'medium', name: '150 – 500 cm³ között', color: 'teal' },
    { id: 'large', name: '500 cm³ felett (> 500)', color: 'blue' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'Kocka: a = 5 cm (V = 125 cm³)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 55" className="w-14 h-9">
          <path d="M 20 22 L 40 10 L 60 22 L 40 34 Z" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <path d="M 20 22 L 40 34 L 40 50 L 20 38 Z" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
          <path d="M 40 34 L 60 22 L 60 38 L 40 50 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
          <text x="40" y="32" textAnchor="middle" className="text-[6.5px] font-black fill-emerald-950">125 cm³</text>
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'Kocka: a = 6 cm (V = 216 cm³)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 55" className="w-14 h-9">
          <path d="M 20 22 L 40 10 L 60 22 L 40 34 Z" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.5" />
          <path d="M 20 22 L 40 34 L 40 50 L 20 38 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
          <path d="M 40 34 L 60 22 L 60 38 L 40 50 Z" fill="#99f6e4" stroke="#0d9488" strokeWidth="1.5" />
          <text x="40" y="32" textAnchor="middle" className="text-[6.5px] font-black fill-teal-950">216 cm³</text>
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'Kocka: a = 10 cm (V = 1000 cm³)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 55" className="w-14 h-9">
          <path d="M 20 22 L 40 10 L 60 22 L 40 34 Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M 20 22 L 40 34 L 40 50 L 20 38 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M 40 34 L 60 22 L 60 38 L 40 50 Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="40" y="32" textAnchor="middle" className="text-[6px] font-black fill-blue-950">1000 cm³</text>
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Téglatest: 4 × 5 × 6 cm (V = 120 cm³)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 55" className="w-14 h-9">
          <path d="M 18 20 L 44 8 L 64 18 L 38 30 Z" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <path d="M 18 20 L 38 30 L 38 48 L 18 38 Z" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
          <path d="M 38 30 L 64 18 L 64 36 L 38 48 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
          <text x="40" y="28" textAnchor="middle" className="text-[6.5px] font-bold fill-emerald-900">120 cm³</text>
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'Téglatest: 5 × 8 × 10 cm (V = 400 cm³)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 55" className="w-14 h-9">
          <path d="M 18 18 L 44 8 L 64 18 L 38 28 Z" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.5" />
          <path d="M 18 18 L 38 28 L 38 48 L 18 38 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
          <path d="M 38 28 L 64 18 L 64 38 L 38 48 Z" fill="#99f6e4" stroke="#0d9488" strokeWidth="1.5" />
          <text x="40" y="27" textAnchor="middle" className="text-[6.5px] font-bold fill-teal-900">400 cm³</text>
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'Téglatest: 8 × 10 × 12 cm (V = 960 cm³)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 55" className="w-14 h-9">
          <path d="M 18 18 L 44 8 L 64 18 L 38 28 Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M 18 18 L 38 28 L 38 48 L 18 38 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M 38 28 L 64 18 L 64 38 L 38 48 Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="40" y="27" textAnchor="middle" className="text-[6.5px] font-bold fill-blue-900">960 cm³</text>
        </svg>
      )
    },
    {
      id: 's1-7',
      label: 'Háromoldalú hasáb: Ta = 20 cm², M = 6 cm (V = 120 cm³)',
      categoryId: 'small'
    },
    {
      id: 's1-8',
      label: 'Háromoldalú hasáb: Ta = 35 cm², M = 10 cm (V = 350 cm³)',
      categoryId: 'medium'
    },
    {
      id: 's1-9',
      label: 'Négyzetes oszlop: a = 4 cm, M = 8 cm (V = 128 cm³)',
      categoryId: 'small'
    },
    {
      id: 's1-10',
      label: 'Kocka: a = 8 cm (V = 512 cm³)',
      categoryId: 'large'
    }
  ]
};

// 2. SZINT: Hasáb fajtája / alakja szerint
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a leírásokat és tulajdonságokat a hasáb alakja szerint!',
  categories: [
    { id: 'cube', name: 'Kocka', color: 'indigo' },
    { id: 'cuboid', name: 'Téglatest', color: 'purple' },
    { id: 'triangular', name: 'Háromoldalú hasáb', color: 'amber' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Minden határoló lapja négyzet, 12 egyenlő éllel rendelkezik',
      categoryId: 'cube',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <path d="M 25 18 L 40 8 L 55 18 L 40 28 Z" fill="#ede9fe" stroke="#6366f1" strokeWidth="1.5" />
          <path d="M 25 18 L 40 28 L 40 44 L 25 34 Z" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.5" />
          <path d="M 40 28 L 55 18 L 55 34 L 40 44 Z" fill="#c4b5fd" stroke="#6366f1" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's2-2',
      label: 'Alaplapja derékszögű háromszög, palástja 3 darab téglalap',
      categoryId: 'triangular',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="25,18 55,10 40,24" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <polygon points="25,38 55,30 40,44" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
          <line x1="25" y1="18" x2="25" y2="38" stroke="#d97706" strokeWidth="1.5" />
          <line x1="55" y1="10" x2="55" y2="30" stroke="#d97706" strokeWidth="1.5" />
          <line x1="40" y1="24" x2="40" y2="44" stroke="#d97706" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's2-3',
      label: 'Minden határoló lapja téglalap, élei: a = 4, b = 6, c = 9 cm',
      categoryId: 'cuboid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <path d="M 20 18 L 44 8 L 62 18 L 38 28 Z" fill="#fae8ff" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M 20 18 L 38 28 L 38 44 L 20 34 Z" fill="#f5d0fe" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M 38 28 L 62 18 L 62 34 L 38 44 Z" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's2-4',
      label: 'Felszíne: A = 6a², térfogata: V = a³',
      categoryId: 'cube'
    },
    {
      id: 's2-5',
      label: 'Felszíne: A = 2·(ab + bc + ac), térfogata: V = a · b · c',
      categoryId: 'cuboid'
    },
    {
      id: 's2-6',
      label: 'Összesen 5 lapja van: 2 háromszög alaplap és 3 téglalap oldallap',
      categoryId: 'triangular'
    },
    {
      id: 's2-7',
      label: 'Alaplapjai egyenlő oldalú (szabályos) háromszögek',
      categoryId: 'triangular'
    },
    {
      id: 's2-8',
      label: '12 éle van, melyek 3 csoportba sorolhatók: 4-4-4 egyenlő él',
      categoryId: 'cuboid'
    },
    {
      id: 's2-9',
      label: 'Éleinek összege: 12 · a',
      categoryId: 'cube'
    },
    {
      id: 's2-10',
      label: '6 téglalap lapja közül a szemközti lapok egybevágóak és párhuzamosak',
      categoryId: 'cuboid'
    }
  ]
};

// 3. SZINT: Számítási cél és képlet szerint
const level3Config: SorterLevelConfig = {
  instruction: 'Milyen mennyiséget kell kiszámítani a megadott feladatokban?',
  categories: [
    { id: 'volume', name: 'Térfogatszámítás (V)', color: 'blue' },
    { id: 'surface', name: 'Felszínszámítás (A)', color: 'emerald' },
    { id: 'lateral_edge', name: 'Palást / Élhossz', color: 'amber' }
  ],
  items: [
    {
      id: 's3-1',
      label: 'Hány liter víz fér egy 50 cm × 40 cm × 30 cm méretű akváriumba?',
      categoryId: 'volume'
    },
    {
      id: 's3-2',
      label: 'Hány m² csomagolópapír szükséges egy ajándékdoboz teljes bevonásához?',
      categoryId: 'surface'
    },
    {
      id: 's3-3',
      label: 'Mennyi díszléc vagy drót kell egy kocka éleinek megerősítéséhez (12 él)?',
      categoryId: 'lateral_edge'
    },
    {
      id: 's3-4',
      label: 'Egy háromoldalú hasáb alakú sátor belső levegőjének köbméterben kifejezett mennyisége',
      categoryId: 'volume'
    },
    {
      id: 's3-5',
      label: 'Egy hasáb alakú betonoszlop oldallapjainak (palástjának) lefestése (Tp = Ka · M)',
      categoryId: 'lateral_edge'
    },
    {
      id: 's3-6',
      label: 'Egy kocka kiterített hálójának teljes kartonfelülete (A = 6a²)',
      categoryId: 'surface'
    },
    {
      id: 's3-7',
      label: 'Mekkora a tömege a hasábnak, ha sűrűsége ismert? (Előbb térfogat kell: m = ρ · V)',
      categoryId: 'volume'
    },
    {
      id: 's3-8',
      label: 'A téglatest mind a hat lapjának felülete együttesen: A = 2(ab + bc + ac)',
      categoryId: 'surface'
    },
    {
      id: 's3-9',
      label: 'Testmagasság visszaszámolása ismert térfogatból és alapterületből (M = V / Ta)',
      categoryId: 'volume'
    },
    {
      id: 's3-10',
      label: 'Csak a függőleges oldalfalak tapétázása, mennyezet és padló nélkül',
      categoryId: 'lateral_edge'
    }
  ]
};

export const PrismSurfaceVolumeSorter: React.FC<PrismSurfaceVolumeSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const activeLvl = Number(currentLevel ?? level) || 1;
  return (
    <SorterTemplate
      key={`prism-sorter-lvl-${activeLvl}`}
      title="Hasáb Csoportosító"
      subtitle="Rendszerezd a hasábokat térfogatuk, alakjuk és a számítási módszerek szerint!"
      badge="7. OSZTÁLY • CSOPORTOSÍTÓ"
      level={activeLvl as any}
      currentLevel={activeLvl as any}
      levels={{
        1: level1Config,
        2: level2Config,
        3: level3Config
      }}
      level1Config={level1Config}
      level2Config={level2Config}
      level3Config={level3Config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
