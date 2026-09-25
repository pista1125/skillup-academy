import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PointSymmetricShapesSorterProps {
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
    title: '1. Szint: Szimmetriatípus szerinti csoportosítás',
    subtitle: 'Válogasd szét az alakzatokat aszerint, hogy milyen szimmetriával rendelkeznek!',
    categories: [
      {
        id: 'cat-only-point',
        name: 'Csak középpontosan szimmetrikus',
        description: 'Van szimmetriaközéppontja, de 0 szimmetriatengelye van',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-both',
        name: 'Középpontosan ÉS tengelyesen is',
        description: 'Van centruma ÉS legalább 1 (vagy több) szimmetriatengelye is',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-neither-point',
        name: 'NEM középpontosan szimmetrikus',
        description: 'Egyáltalán nincs szimmetriaközéppontja (180°-ra nem fedi önmagát)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: 'Általános paralelogramma',
        category: 'cat-only-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 44,22 52,6 20,6" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <circle cx="32" cy="14" r="2" fill="#7e22ce" />
          </svg>
        )
      },
      {
        id: 's1-2',
        label: 'Téglalap',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="12" y="6" width="36" height="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 's1-3',
        label: 'Szabályos háromszög',
        category: 'cat-neither-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 14,24 46,24" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-4',
        label: '„Z” betű',
        category: 'cat-only-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polyline points="20,6 40,6 20,22 40,22" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="30" cy="14" r="1.5" fill="#db2777" />
          </svg>
        )
      },
      {
        id: 's1-5',
        label: 'Négyzet',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="21" y="5" width="18" height="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="2" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's1-6',
        label: 'Húrtrapéz (egyenlő szárú)',
        category: 'cat-neither-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="22,7 38,7 46,22 14,22" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-7',
        label: '„S” betű',
        category: 'cat-only-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 38,8 C 32,5 22,6 22,12 C 22,18 38,16 38,22 C 38,27 27,26 22,23" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 's1-8',
        label: 'Kör és körlap',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="2" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 's1-9',
        label: 'Konvex deltoid (általános)',
        category: 'cat-neither-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 42,12 30,24 18,12" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's1-10',
        label: 'Rombusz',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 47,14 30,24 13,14" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <circle cx="30" cy="14" r="2" fill="#7c3aed" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Alakzatok és Sokszögek Rendszere',
    subtitle: 'Csoportosítsd a geometriai formákat szimmetriaközéppontjuk létezése szerint!',
    categories: [
      {
        id: 'cat-always',
        name: 'Mindig van szimmetriaközéppontja',
        description: 'Az alakzattípus minden egyes példánya középpontosan szimmetrikus',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-never',
        name: 'SOHA nincs szimmetriaközéppontja',
        description: 'Ennek az alakzatfajtának egyetlen példánya sem szimmetrikus pontra',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-conditional',
        name: 'Csak speciális esetben van centruma',
        description: 'Általában nincs, de ha szabályos vagy speciális, akkor van',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'Szakasz',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="21" x2="48" y2="7" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="30" cy="14" r="2.5" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 's2-2',
        label: 'Bármilyen háromszög',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="25,5 10,23 48,23" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's2-3',
        label: 'Szabályos sokszög',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 45,14 39,24 21,24 15,14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's2-4',
        label: 'Körgyűrű',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="none" stroke="#0d9488" strokeWidth="2" />
            <circle cx="30" cy="14" r="6" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 's2-5',
        label: 'Trapéz',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="20,7 42,7 50,22 10,22" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's2-6',
        label: 'Deltoid',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 44,12 30,25 16,12" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 's2-7',
        label: 'Szabályos hatszög',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 43,10 43,19 30,25 17,19 17,10" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <circle cx="30" cy="14.5" r="2" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's2-8',
        label: 'Félegyenes',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="14" x2="52" y2="14" stroke="#64748b" strokeWidth="2" />
            <circle cx="15" cy="14" r="3" fill="#64748b" />
          </svg>
        )
      },
      {
        id: 's2-9',
        label: 'Egyenes',
        category: 'cat-always',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="20" x2="52" y2="8" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" />
          </svg>
        )
      },
      {
        id: 's2-10',
        label: 'Szabályos ötszög',
        category: 'cat-never',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 44,12 40,24 20,24 16,12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Betűk, Jelek és Valós Alakzatok Szimmetriája',
    subtitle: 'Csoportosítsd a szimbólumokat és betűket szimmetriájuk típusa szerint!',
    categories: [
      {
        id: 'cat-sym-point',
        name: 'Van szimmetriaközéppontja (180°-os szimmetria)',
        description: 'Fejjel lefelé (180°-kal elforgatva) pontosan ugyanúgy néz ki',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-sym-axis-only',
        name: 'Csak szimmetriatengelye van',
        description: 'Tengelyre tükrözhető (vízszintes v. függőleges), de fejjel lefelé nem azonos',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-asymmetric',
        name: 'Egyáltalán nem szimmetrikus',
        description: 'Sem szimmetriatengelye, sem szimmetriaközéppontja nincs',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: '„N” betű',
        category: 'cat-sym-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polyline points="20,22 20,6 40,22 40,6" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        id: 's3-2',
        label: '„A” betű',
        category: 'cat-sym-axis-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polyline points="18,22 30,6 42,22" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="22" y1="17" x2="38" y2="17" stroke="#0284c7" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's3-3',
        label: '„F” betű',
        category: 'cat-asymmetric',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="22" y1="6" x2="22" y2="22" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="6" x2="38" y2="6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="13" x2="34" y2="13" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 's3-4',
        label: '„O” betű',
        category: 'cat-sym-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <ellipse cx="30" cy="14" rx="12" ry="9" fill="none" stroke="#4f46e5" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's3-5',
        label: '„M” betű',
        category: 'cat-sym-axis-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polyline points="18,22 18,6 30,16 42,6 42,22" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        id: 's3-6',
        label: '„P” betű',
        category: 'cat-asymmetric',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="22" y1="6" x2="22" y2="22" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <path d="M 22,6 H 33 C 38,6 38,14 33,14 H 22" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 's3-7',
        label: '„X” betű',
        category: 'cat-sym-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="18" y1="6" x2="42" y2="22" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="18" y1="22" x2="42" y2="6" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 's3-8',
        label: '„E” betű',
        category: 'cat-sym-axis-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="22" y1="6" x2="22" y2="22" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="6" x2="38" y2="6" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="14" x2="34" y2="14" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="22" x2="38" y2="22" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 's3-9',
        label: 'Francia kártya Dámája (Q)',
        category: 'cat-sym-point',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="20" y="5" width="20" height="18" rx="2" fill="#fff" stroke="#dc2626" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[9px] font-bold fill-red-600">Q♦</text>
          </svg>
        )
      },
      {
        id: 's3-10',
        label: '„L” betű',
        category: 'cat-asymmetric',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="22" y1="6" x2="22" y2="22" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="22" x2="38" y2="22" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      }
    ]
  }
};

export const PointSymmetricShapesSorter: React.FC<PointSymmetricShapesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-point-symmetric-shapes-sorter',
  topicTitle = '10. Középpontosan szimmetrikus alakzatok'
}) => {
  const effectiveLevel = currentLevel || level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      badgeText="7. OSZTÁLY • CSOPORTOSÍTÓ JÁTÉK"
      levels={sorterLevels}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default PointSymmetricShapesSorter;
