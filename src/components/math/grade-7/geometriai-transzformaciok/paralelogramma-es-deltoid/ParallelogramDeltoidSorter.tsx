import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ParallelogramDeltoidSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
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
    title: '1. Szint: Átlótulajdonságok szerinti csoportosítás',
    subtitle: 'Csoportosítsd a négyszögeket az átlóik metszése, merőlegessége és felezése szerint!',
    categories: [
      {
        id: 'cat-perp',
        name: 'Átlói merőlegesek (e ⊥ f)',
        description: 'Az átlók derékszöget (90°) zárnak be egymással',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-bisect-not-perp',
        name: 'Átlói felezik egymást, de NEM merőlegesek',
        description: 'Kölcsönösen felezik egymást hegyesszögben / tompaszögben',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-neither',
        name: 'Átlói nem felezik kölcsönösen egymást',
        description: 'Legalább az egyik átló nem feleződik a metszéspontban',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: 'Deltoid (konvex)',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,2 45,11 30,26 15,11" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
            <line x1="30" y1="2" x2="30" y2="26" stroke="#db2777" strokeWidth="1" strokeDasharray="1.5 1" />
            <line x1="15" y1="11" x2="45" y2="11" stroke="#db2777" strokeWidth="1" strokeDasharray="1.5 1" />
          </svg>
        )
      },
      {
        id: 's1-2',
        label: 'Rombusz',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 50,14 30,25 10,14" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="30" y1="3" x2="30" y2="25" stroke="#7c3aed" strokeWidth="1" />
            <line x1="10" y1="14" x2="50" y2="14" stroke="#7c3aed" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-3',
        label: 'Négyzet',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="19" y="3" width="22" height="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="19" y1="3" x2="41" y2="25" stroke="#16a34a" strokeWidth="1" />
            <line x1="19" y1="25" x2="41" y2="3" stroke="#16a34a" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-4',
        label: 'Konkáv deltoid (nyílhegy)',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,2 48,25 30,17 12,25" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <line x1="30" y1="2" x2="30" y2="25" stroke="#ef4444" strokeWidth="1" strokeDasharray="1.5 1" />
            <line x1="12" y1="25" x2="48" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="1.5 1" />
          </svg>
        )
      },
      {
        id: 's1-5',
        label: 'Általános paralelogramma',
        category: 'cat-bisect-not-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 48,6 18,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <line x1="12" y1="22" x2="48" y2="6" stroke="#b45309" strokeWidth="1" />
            <line x1="18" y1="6" x2="42" y2="22" stroke="#b45309" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-6',
        label: 'Téglalap (nem négyzet)',
        category: 'cat-bisect-not-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="12" y="6" width="36" height="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="12" y1="6" x2="48" y2="22" stroke="#0369a1" strokeWidth="1" />
            <line x1="12" y1="22" x2="48" y2="6" stroke="#0369a1" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-7',
        label: 'Hosszúkás paralelogramma',
        category: 'cat-bisect-not-perp',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,21 44,21 52,7 18,7" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.2" />
            <circle cx="31" cy="14" r="1.5" fill="#c026d3" />
          </svg>
        )
      },
      {
        id: 's1-8',
        label: 'Általános trapéz',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,23 50,23 42,6 20,6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
            <line x1="10" y1="23" x2="42" y2="6" stroke="#94a3b8" strokeWidth="1" />
            <line x1="20" y1="6" x2="50" y2="23" stroke="#94a3b8" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-9',
        label: 'Húrtrapéz (szimmetrikus trapéz)',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,23 48,23 38,7 22,7" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <line x1="12" y1="23" x2="38" y2="7" stroke="#059669" strokeWidth="1" />
            <line x1="22" y1="7" x2="48" y2="23" stroke="#059669" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's1-10',
        label: 'Általános négyszög',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,22 46,24 52,6 18,9" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" />
            <line x1="10" y1="22" x2="52" y2="6" stroke="#64748b" strokeWidth="1" />
            <line x1="18" y1="9" x2="46" y2="24" stroke="#64748b" strokeWidth="1" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szimmetriák szerinti osztályozás',
    subtitle: 'Válogasd szét a négyszögeket tengelyes és középpontos szimmetriájuk alapján!',
    categories: [
      {
        id: 'cat-central-only',
        name: 'Csak középpontosan szimmetrikus',
        description: 'Van szimmetriaközéppontja, de nincs tengelye (0 tengely, 1 centrum)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-axial-only',
        name: 'Csak tengelyesen szimmetrikus',
        description: 'Van szimmetriatengelye, de nincs centruma (legalább 1 tengely, 0 centrum)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkét szimmetriával rendelkezik',
        description: 'Tengelyesen és középpontosan is szimmetrikus',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-asymmetric',
        name: 'Egyikkel sem rendelkezik',
        description: 'Aszimmetrikus négyszög (sem tengelye, sem centruma)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'Általános paralelogramma',
        category: 'cat-central-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 50,6 20,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="31" cy="14" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 's2-2',
        label: 'Tompaszögű ferde paralelogramma',
        category: 'cat-central-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="8,23 38,23 52,6 22,6" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.2" />
            <circle cx="30" cy="14.5" r="2" fill="#0891b2" />
          </svg>
        )
      },
      {
        id: 's2-3',
        label: 'Konvex deltoid (nem rombusz)',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 45,12 30,26 15,12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="30" y1="2" x2="30" y2="27" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's2-4',
        label: 'Húrtrapéz (egyenlő szárú trapéz)',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,23 48,23 40,7 20,7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.2" />
            <line x1="30" y1="4" x2="30" y2="26" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's2-5',
        label: 'Konkáv deltoid',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 47,25 30,17 13,25" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <line x1="30" y1="1" x2="30" y2="26" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's2-6',
        label: 'Rombusz (nem négyzet)',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 52,14 30,24 8,14" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="30" y1="2" x2="30" y2="26" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="2 1" />
            <line x1="6" y1="14" x2="54" y2="14" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="2 1" />
            <circle cx="30" cy="14" r="1.5" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 's2-7',
        label: 'Téglalap (nem négyzet)',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="12" y="6" width="36" height="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="30" y1="3" x2="30" y2="25" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="2 1" />
            <line x1="9" y1="14" x2="51" y2="14" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="2 1" />
            <circle cx="30" cy="14" r="1.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 's2-8',
        label: 'Négyzet',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="20" y="4" width="20" height="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's2-9',
        label: 'Általános sokszögű négyszög',
        category: 'cat-asymmetric',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,21 44,24 50,6 20,10" fill="#f8fafc" stroke="#475569" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's2-10',
        label: 'Derékszögű trapéz',
        category: 'cat-asymmetric',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="15,22 45,22 35,6 15,6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
            <path d="M 15 10 L 19 10 L 19 6" fill="none" stroke="#64748b" strokeWidth="0.8" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai állítások igazságtartalma',
    subtitle: 'Válogasd szét a négyszögekre vonatkozó állításokat igazságtartalmuk szerint!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig igaz állítás',
        description: 'Minden feltétel és speciális megszorítás nélkül mindig teljesül',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-sometimes-true',
        name: 'Csak speciális esetben igaz',
        description: 'Nem minden alakra igaz, csak bizonyos feltételek mellett',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-never-true',
        name: 'Sohasem igaz (lehetetlen)',
        description: 'Matematikailag ellentmondásos, soha nem fordulhat elő',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: '„Minden rombusz egyben paralelogramma is”',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 50,14 30,24 10,14" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="24" y="27" className="text-[6px] font-bold fill-emerald-600">✓ IGAZ</text>
          </svg>
        )
      },
      {
        id: 's3-2',
        label: '„A deltoid főátlója merőlegesen felezi a mellékátlót”',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 46,12 30,26 14,12" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
            <line x1="30" y1="3" x2="30" y2="26" stroke="#db2777" strokeWidth="1" />
            <line x1="14" y1="12" x2="46" y2="12" stroke="#0284c7" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's3-3',
        label: '„Paralelogramma szomszédos belső szögeinek összege 180°”',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 48,6 18,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="20" y="16" className="text-[6px] font-bold fill-amber-700">α+β=180°</text>
          </svg>
        )
      },
      {
        id: 's3-4',
        label: '„Minden négyzet egyben téglalap, rombusz és deltoid is”',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="20" y="4" width="20" height="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <text x="24" y="16" className="text-[6px] font-bold fill-green-800">4 in 1</text>
          </svg>
        )
      },
      {
        id: 's3-5',
        label: '„Egy paralelogramma átlói merőlegesek egymásra”',
        category: 'cat-sometimes-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 48,6 18,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="14" y="27" className="text-[5.5px] font-medium fill-slate-600">Csak ha rombusz</text>
          </svg>
        )
      },
      {
        id: 's3-6',
        label: '„Egy deltoid szemközti oldalai párhuzamosak”',
        category: 'cat-sometimes-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 46,12 30,26 14,12" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
            <text x="14" y="27" className="text-[5.5px] font-medium fill-slate-600">Csak ha rombusz</text>
          </svg>
        )
      },
      {
        id: 's3-7',
        label: '„Egy paralelogramma átlói egyenlő hosszúak”',
        category: 'cat-sometimes-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="14" y="6" width="32" height="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <text x="14" y="27" className="text-[5.5px] font-medium fill-slate-600">Csak ha téglalap</text>
          </svg>
        )
      },
      {
        id: 's3-8',
        label: '„Egy deltoid belső szögeinek összege 180°”',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 46,12 30,26 14,12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="21" y="16" className="text-[6px] font-bold fill-red-700">≠ 180°</text>
          </svg>
        )
      },
      {
        id: 's3-9',
        label: '„Egy paralelogrammának lehet 3 hegyesszöge”',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 48,6 18,6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="16" y="16" className="text-[5.5px] font-bold fill-red-700">3 hegyesszög?</text>
          </svg>
        )
      },
      {
        id: 's3-10',
        label: '„Általános (ferde) paralelogramma tengelyesen szimmetrikus”',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 50,6 20,6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <line x1="30" y1="2" x2="30" y2="26" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <text x="33" y="10" className="text-[7px] font-bold fill-red-700">✗</text>
          </svg>
        )
      }
    ]
  }
};

export const ParallelogramDeltoidSorter: React.FC<ParallelogramDeltoidSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      key={`sorter-para-${activeLevel}`}
      topicId={topicId || 'g7-geom-parallelogram-sorter'}
      topicTitle={topicTitle || 'Paralelogramma és deltoid'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🧩 CSOPORTOSÍTÓ"
      title="Paralelogramma és Deltoid Csoportosító Játék"
      subtitle="Válogasd szét a négyszögeket és állításokat a megfelelő kategóriákba!"
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="purple"
    />
  );
};

export default ParallelogramDeltoidSorter;
