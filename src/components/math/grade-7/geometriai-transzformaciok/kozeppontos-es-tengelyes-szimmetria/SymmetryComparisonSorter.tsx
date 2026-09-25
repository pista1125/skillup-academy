import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SymmetryComparisonSorterProps {
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
    title: '1. Szint: Síkidomok szimmetriái szerinti csoportosítás',
    subtitle: 'Válogasd szét a síkidomokat és alakzatokat a meglévő szimmetriatípusaik szerint!',
    categories: [
      {
        id: 'cat-axial-only',
        name: 'Csak tengelyesen szimmetrikus',
        description: 'Van szimmetriatengelye, de nincs centruma',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-central-only',
        name: 'Csak középpontosan szimmetrikus',
        description: 'Nincs szimmetriatengelye, de van centruma',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkét szimmetriája van',
        description: 'Tengelyesen és középpontosan is szimmetrikus',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-neither',
        name: 'Egyikkel sem rendelkezik',
        description: 'Aszimmetrikus (sem tengelye, sem centruma)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Deltoid (konvex)',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 46,12 30,26 14,12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="30" y1="2" x2="30" y2="27" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Általános paralelogramma',
        category: 'cat-central-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 50,6 20,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="31" cy="14" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Téglalap',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="12" y="7" width="36" height="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#ef4444" strokeWidth="0.9" strokeDasharray="2 1" />
            <line x1="8" y1="14" x2="52" y2="14" stroke="#ef4444" strokeWidth="0.9" strokeDasharray="2 1" />
            <circle cx="30" cy="14" r="1.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Rombusz',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 48,14 30,24 12,14" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Egyenlő szárú háromszög',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 46,23 14,23" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="30" y1="3" x2="30" y2="25" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Szimmetrikus (húr)trapéz',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="18,8 42,8 48,22 12,22" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="26" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Általános háromszög',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="14,22 50,18 24,6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Négyzet',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="22" y="6" width="16" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's9',
        label: "'S' és 'Z' nyomtatott betűk",
        category: 'cat-central-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="18" y="20" className="text-[12px] font-black fill-teal-700">S</text>
            <text x="36" y="20" className="text-[12px] font-black fill-teal-700">Z</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Általános derékszögű trapéz',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="15,6 35,6 48,22 15,22" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: A két transzformáció tulajdonságai',
    subtitle: 'Válogasd szét az állításokat aszerint, hogy melyik szimmetriára érvényesek!',
    categories: [
      {
        id: 'cat-axial-prop',
        name: 'Csak a Tengelyes tükrözésre igaz',
        description: 'Kifejezetten tengelyhez kötődő tulajdonság',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-central-prop',
        name: 'Csak a Középpontos tükrözésre igaz',
        description: 'Kifejezetten centrumhoz kötődő tulajdonság',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-both-prop',
        name: 'Mindkét transzformációra igaz',
        description: 'Közös egybevágósági tulajdonság',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: 'Végtelen sok fixpontja van (a tükörtengely pontjai)',
        category: 'cat-axial-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="14" x2="52" y2="14" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="20" cy="14" r="1.5" fill="#ef4444" />
            <circle cx="30" cy="14" r="1.5" fill="#ef4444" />
            <circle cx="40" cy="14" r="1.5" fill="#ef4444" />
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Egyetlenegy fixpontja van (maga az O centrum)',
        category: 'cat-central-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="3" fill="#0d9488" />
            <text x="35" y="15" className="text-[7px] font-bold fill-teal-700">O</text>
          </svg>
        )
      },
      {
        id: 's13',
        label: 'A körüljárási irány (orientáció) megfordul',
        category: 'cat-axial-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 15 20 A 7 7 0 1 1 25 10" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            <polyline points="23,8 26,12 21,13" fill="#ef4444" />
            <text x="32" y="16" className="text-[7px] font-bold fill-rose-600">↺ ➔ ↻</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'A körüljárási irány (orientáció) megmarad',
        category: 'cat-central-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 16 18 A 6 6 0 1 1 24 10" fill="none" stroke="#0d9488" strokeWidth="1.2" />
            <polyline points="22,8 25,11 21,12" fill="#0d9488" />
            <text x="32" y="16" className="text-[7px] font-bold fill-teal-700">↺ ➔ ↺</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: "Bármely egyenes képe párhuzamos az eredetivel (e ∥ e')",
        category: 'cat-central-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="8" x2="52" y2="8" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="8" y1="20" x2="52" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <text x="20" y="16" className="text-[6px] font-bold fill-sky-700">e ∥ e'</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Távolságtartó transzformáció (|AB| = |A\'B\'|)',
        category: 'cat-both-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="10" x2="30" y2="10" stroke="#16a34a" strokeWidth="2" />
            <line x1="35" y1="18" x2="55" y2="18" stroke="#16a34a" strokeWidth="2" />
            <text x="22" y="24" className="text-[6px] font-bold fill-emerald-700">d = d'</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Szögtartó transzformáció (α = α\')',
        category: 'cat-both-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polyline points="12,18 24,18 20,8" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            <polyline points="40,18 52,18 48,8" fill="none" stroke="#16a34a" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Síkbeli 180°-os elforgatással egyenértékű',
        category: 'cat-central-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 18 16 A 12 12 0 0 1 42 16" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <polyline points="40,13 44,17 39,18" fill="#0d9488" />
            <circle cx="30" cy="16" r="2" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 's19',
        label: 'Síkból való 3D kifordítással (áthajtással) szemléltethető',
        category: 'cat-axial-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="30" y1="4" x2="30" y2="24" stroke="#ef4444" strokeWidth="1.5" />
            <polygon points="16,8 30,5 30,22 16,19" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
            <polygon points="30,5 44,8 44,19 30,22" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Fixegyenesek: A meghatározó vonal és a rá merőlegesek',
        category: 'cat-axial-prop',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="14" x2="52" y2="14" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#6366f1" strokeWidth="1.5" />
            <rect x="30" y="14" width="4" height="4" fill="none" stroke="#6366f1" strokeWidth="0.8" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Szimmetriatengelyek száma és jellege',
    subtitle: 'Válogasd szét a geometriai alakzatokat a szimmetriatengelyeik száma és jellege szerint!',
    categories: [
      {
        id: 'cat-one-axis',
        name: 'Pontosan 1 szimmetriatengelye van',
        description: 'Csak egyetlen tengely mentén tükrözhető önmagába',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-multiple-axes',
        name: '2 vagy több szimmetriatengelye van',
        description: 'Többirányú tükörszimmetriával rendelkezik',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-zero-axis-central',
        name: '0 tengelye van, de középpontos',
        description: 'Nincs tükörtengelye, viszont van szimmetriaközéppontja',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'Egyenlő szárú háromszög',
        category: 'cat-one-axis',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 46,24 14,24" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="30" y1="2" x2="30" y2="26" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Deltoid (főátló menti szimmetria)',
        category: 'cat-one-axis',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,3 46,12 30,26 14,12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="30" y1="2" x2="30" y2="27" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Szimmetrikus húrtrapéz',
        category: 'cat-one-axis',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="18,8 42,8 48,22 12,22" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="26" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Téglalap (2 oldalfelező tengely)',
        category: 'cat-multiple-axes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="12" y="7" width="36" height="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
            <line x1="8" y1="14" x2="52" y2="14" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Rombusz (2 átló mint szimmetriatengely)',
        category: 'cat-multiple-axes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 48,14 30,24 12,14" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="30" y1="2" x2="30" y2="26" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
            <line x1="8" y1="14" x2="52" y2="14" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Négyzet (4 tengely)',
        category: 'cat-multiple-axes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="22" y="6" width="16" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="30" y1="3" x2="30" y2="25" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
            <line x1="18" y1="14" x2="42" y2="14" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Szabályos háromszög (3 tengely)',
        category: 'cat-multiple-axes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 47,23 13,23" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="30" y1="2" x2="30" y2="26" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Általános paralelogramma',
        category: 'cat-zero-axis-central',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 50,6 20,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="31" cy="14" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 's29',
        label: "'N' betű (középpontos forgásszimmetria)",
        category: 'cat-zero-axis-central',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="24" y="20" className="text-[13px] font-black fill-teal-700">N</text>
            <circle cx="30" cy="14" r="1.5" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Szabályos hatszög (6 tengely)',
        category: 'cat-multiple-axes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 42,10 42,18 30,23 18,18 18,10" fill="#f0fdf4" stroke="#15803d" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.2" fill="#15803d" />
          </svg>
        )
      }
    ]
  }
};

export const SymmetryComparisonSorter: React.FC<SymmetryComparisonSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  return (
    <SorterTemplate
      key={`sorter-symm-${level}`}
      topicId={topicId || 'g7-geom-symmetry-sorter'}
      topicTitle={topicTitle || 'Középpontos és tengelyes szimmetria'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🧩 CSOPORTOSÍTÓ"
      title="Szimmetria Csoportosító Játék"
      subtitle="Válogasd szét a síkidomokat és szimmetriatulajdonságokat a megadott kategóriákba!"
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      level={level}
      currentLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="violet"
    />
  );
};

export default SymmetryComparisonSorter;
