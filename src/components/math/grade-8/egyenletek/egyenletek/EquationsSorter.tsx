import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A Mérlegelv és Átalakítások Típusa',
    subtitle: 'Sorold be a műveleteket ekvivalens, feltételhez kötött vagy tiltott kategóriába!',
    categories: [
      {
        id: 'cat-equiv',
        name: 'Ekvivalens művelet (Gyöktartó)',
        description: 'Mindkét oldalon végzett azonos művelet, a megoldáshalmaz nem változik',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-danger',
        name: 'Feltételhez kötött / Veszélyes',
        description: 'Kikötést vagy kötelező ellenőrzést igénylő lépés (gyökváltozást okozhat)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-forbidden',
        name: 'Matematikailag tilos / Hibás lépés',
        description: 'Érvénytelen matematikai lépés vagy a mérlegelv megsértése',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Mindkét oldalhoz hozzáadunk 9-et (+9)',
        category: 'cat-equiv',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="15" y1="22" x2="65" y2="22" stroke="#8b5cf6" strokeWidth="2" />
            <polygon points="40,22 36,34 44,34" fill="#6b21a8" />
            <text x="22" y="16" className="text-[7px] font-bold fill-emerald-700">+9</text>
            <text x="52" y="16" className="text-[7px] font-bold fill-emerald-700">+9</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Mindkét oldalból kivonunk 4x-et (-4x)',
        category: 'cat-equiv',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="15" y1="22" x2="65" y2="22" stroke="#8b5cf6" strokeWidth="2" />
            <polygon points="40,22 36,34 44,34" fill="#6b21a8" />
            <text x="20" y="16" className="text-[7px] font-bold fill-purple-700">-4x</text>
            <text x="50" y="16" className="text-[7px] font-bold fill-purple-700">-4x</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Mindkét oldal szorzása 5-tel (·5)',
        category: 'cat-equiv',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="18" y="10" width="44" height="24" rx="4" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.2" />
            <text x="40" y="24" className="text-[9px] font-black fill-purple-900" textAnchor="middle">· 5</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Mindkét oldal elosztása 3-mal (:3)',
        category: 'cat-equiv',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="18" y="10" width="44" height="24" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
            <text x="40" y="24" className="text-[9px] font-black fill-indigo-900" textAnchor="middle">: 3</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Mindkét oldal elosztása az ismeretlennel (: x)',
        category: 'cat-danger',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="18" y="10" width="44" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="40" y="24" className="text-[8px] font-black fill-amber-900" textAnchor="middle">: x (ha x = 0?)</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Mindkét oldal négyzetre emelése (()²)',
        category: 'cat-danger',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="18" y="10" width="44" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="40" y="24" className="text-[8px] font-black fill-amber-900" textAnchor="middle">(... )² hamis gyök</text>
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Beszorzás ismeretlent tartalmazó (x - 2) kifejezéssel',
        category: 'cat-danger',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-amber-800" textAnchor="middle">· (x - 2)  [x ≠ 2!]</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Csak a bal oldalhoz adunk hozzá 10-et',
        category: 'cat-forbidden',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="15" y1="28" x2="65" y2="16" stroke="#ef4444" strokeWidth="2" />
            <polygon points="40,22 36,34 44,34" fill="#6b21a8" />
            <text x="20" y="22" className="text-[7px] font-black fill-rose-600">+10</text>
            <text x="50" y="14" className="text-[7px] font-bold fill-slate-400">---</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Mindkét oldal elosztása 0-val (: 0)',
        category: 'cat-forbidden',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="40" cy="22" r="14" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="40" y="25" className="text-[10px] font-black fill-rose-700" textAnchor="middle">: 0 ✗</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Mindkét oldal megszorzása 0-val (· 0)',
        category: 'cat-forbidden',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="18" y="10" width="44" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="40" y="24" className="text-[8px] font-black fill-rose-700" textAnchor="middle">· 0 ⟹ 0 = 0 ✗</text>
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Tagok összevonása azonos oldalon: 7x - 3x = 4x',
        category: 'cat-equiv',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-emerald-800" textAnchor="middle">7x - 3x = 4x ✓</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Zárójelbontás: 4(x + 3) = 4x + 12',
        category: 'cat-equiv',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-indigo-800" textAnchor="middle">4(x + 3) = 4x + 12</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Egyenletek Megoldásszáma',
    subtitle: 'Kategorizáld az egyenleteket 1 megoldás, azonosság vagy ellentmondás szerint!',
    categories: [
      {
        id: 'cat-one',
        name: 'Pontosan 1 megoldás (x = c)',
        description: 'Egyetlen valós szám elégíti ki az egyenletet',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-identity',
        name: 'Azonosság (0x = 0)',
        description: 'Végtelen sok megoldás van, minden valós szám kielégíti',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-none',
        name: 'Ellentmondás (0x = b, b ≠ 0)',
        description: 'Nincs megoldás a valós számok körében (üres halmaz)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '4x + 7 = 19',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-blue-900" textAnchor="middle">4x = 12 ⟹ x = 3</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: '5x - 10 = 5(x - 2)',
        category: 'cat-identity',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-purple-900" textAnchor="middle">5x - 10 = 5x - 10 ⟹ 0 = 0</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: '3x + 4 = 3x + 9',
        category: 'cat-none',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-rose-700" textAnchor="middle">4 = 9 ✗</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: '2(x + 5) = 2x + 10',
        category: 'cat-identity',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-purple-900" textAnchor="middle">2x + 10 = 2x + 10</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: '8x - 3 = 5x + 9',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-blue-900" textAnchor="middle">3x = 12 ⟹ x = 4</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: '7x - 2 = 7x + 5',
        category: 'cat-none',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-rose-700" textAnchor="middle">-2 = 5 ✗</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: 'x / 3 + x / 6 = 9',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-blue-900" textAnchor="middle">3x / 6 = 9 ⟹ x = 18</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: '4(x - 1) + 4 = 4x',
        category: 'cat-identity',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-purple-900" textAnchor="middle">4x - 4 + 4 = 4x ⟹ 0 = 0</text>
          </svg>
        )
      },
      {
        id: 's21',
        label: '2x + 7 = 2x - 3',
        category: 'cat-none',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-rose-700" textAnchor="middle">7 = -3 ✗</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: '-5x + 15 = 0',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-blue-900" textAnchor="middle">-5x = -15 ⟹ x = 3</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: '(x + 3) + (x + 5) = 2x + 8',
        category: 'cat-identity',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-purple-900" textAnchor="middle">2x + 8 = 2x + 8</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: '6(2x - 1) = 12x + 4',
        category: 'cat-none',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">12x - 6 = 12x + 4 ⟹ -6 = 4</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Kikötések és Alaphalmazok',
    subtitle: 'Döntsd el, hogy a gyök érvényes, kikötésbe ütközik, vagy nem eleme az alaphalmaznak!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Érvényes megoldás van',
        description: 'A kapott szám kielégíti a feltételeket és eleme a megadott alaphalmaznak',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-excluded',
        name: 'Kikötésbe ütközik (Tiltott érték)',
        description: 'A nevező nulla lenne a kapott értékre, ezért az É.T. nem tartalmazza',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-outside',
        name: 'Nem eleme az Alaphalmaznak (A)',
        description: 'Bár valós szám, az adott alaphalmazból (N, Z) kiesik',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: '2x = 9, ahol az alaphalmaz A = N (természetes számok)',
        category: 'cat-outside',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-indigo-900" textAnchor="middle">x = 4.5 ∉ ℕ</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: '4x + 15 = 3, ahol az alaphalmaz A = N (természetes számok)',
        category: 'cat-outside',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-indigo-900" textAnchor="middle">x = -3 ∉ ℕ</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: '(x - 5) / (x - 5) = 0 a valós számok körében',
        category: 'cat-excluded',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-900" textAnchor="middle">Nevező = 0 ha x = 5</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: '(2x - 8) / (x - 4) = 0 a valós számok körében',
        category: 'cat-excluded',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-900" textAnchor="middle">x = 4 kizárva (nevező = 0)</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: '3x - 12 = 0, ahol A = N (természetes számok)',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-900" textAnchor="middle">x = 4 ∈ ℕ ✓</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: '5x = 8, ahol A = Z (egész számok)',
        category: 'cat-outside',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-indigo-900" textAnchor="middle">x = 8/5 ∉ ℤ</text>
          </svg>
        )
      },
      {
        id: 's31',
        label: '4 / (x - 1) = 2 a valós számok (R) halmazán',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-900" textAnchor="middle">x = 3 (kikötés x ≠ 1) ✓</text>
          </svg>
        )
      },
      {
        id: 's32',
        label: '6x = -18, ahol A = Z (egész számok)',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-900" textAnchor="middle">x = -3 ∈ ℤ ✓</text>
          </svg>
        )
      },
      {
        id: 's33',
        label: '5x + 2 = 6, ahol A = Q (racionális számok)',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-900" textAnchor="middle">x = 4/5 ∈ ℚ ✓</text>
          </svg>
        )
      },
      {
        id: 's34',
        label: '(x + 1)(x - 7) / (x - 7) = 0 a valós számok körében',
        category: 'cat-excluded',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7px] font-bold fill-amber-900" textAnchor="middle">x = 7 gyököt tiltja a nevező</text>
          </svg>
        )
      },
      {
        id: 's35',
        label: '(3x + 9) / (x + 3) = 0 a valós számok körében',
        category: 'cat-excluded',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7px] font-bold fill-amber-900" textAnchor="middle">x = -3 hamis gyök (0/0)</text>
          </svg>
        )
      },
      {
        id: 's36',
        label: 'x² = -9 a valós számok (R) körében',
        category: 'cat-outside',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-indigo-900" textAnchor="middle">Nincs valós gyök ∉ ℝ</text>
          </svg>
        )
      }
    ]
  }
};

export const EquationsSorter: React.FC<EquationsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-basic-sorter',
  topicTitle = '1. Egyenletek Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
      badge="8. Osztály • III. Egyenletek"
      levels={sorterLevels}
    />
  );
};

export default EquationsSorter;
