import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometrySummarySorterProps {
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
    title: '1. Szint: Alakzatok Szimmetriatulajdonságai',
    subtitle: 'Csoportosítsd a síkidomokat aszerint, hogy milyen szimmetriával rendelkeznek!',
    categories: [
      {
        id: 'cat-tengelyes',
        name: 'Csak tengelyesen szimmetrikus',
        description: 'Van tükörtengelye, de nincs szimmetriaközéppontja',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-kozeppontos',
        name: 'Csak középpontosan szimmetrikus',
        description: 'Van szimmetriaközéppontja, de nincs tükörtengelye',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-mindketto',
        name: 'Tengelyes ÉS középpontos is',
        description: 'Egyszerre rendelkezik tükörtengellyel és szimmetriaközépponttal',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Egyenlő szárú háromszög (nem szabályos)',
        category: 'cat-tengelyes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="15,24 45,24 30,5" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="5" x2="30" y2="24" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Konvex deltoid (nem rombusz)',
        category: 'cat-tengelyes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,14 30,5 50,14 30,23" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="10" y1="14" x2="50" y2="14" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Húrtrapéz (egyenlő szárú trapéz)',
        category: 'cat-tengelyes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,23 50,23 40,7 20,7" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="25" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Szabályos ötszög',
        category: 'cat-tengelyes',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 47,10 41,24 19,24 13,10" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#dc2626" strokeWidth="0.8" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Általános paralelogramma',
        category: 'cat-kozeppontos',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 42,22 48,8 18,8" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="30" cy="15" r="2" fill="#ca8a04" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Z-betű alakzat (egyenlő szárakkal)',
        category: 'cat-kozeppontos',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polyline points="15,7 45,7 15,23 45,23" fill="none" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="30" cy="15" r="2" fill="#dc2626" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Négyzet',
        category: 'cat-mindketto',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="20" y="4" width="20" height="20" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Rombusz',
        category: 'cat-mindketto',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 48,14 30,24 12,14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Téglalap',
        category: 'cat-mindketto',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="14" y="6" width="32" height="16" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Szabályos hatszög',
        category: 'cat-mindketto',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="21,5 39,5 48,14 39,23 21,23 12,14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="1.5" fill="#16a34a" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Háromszög Nevezetes Pontjai és Vonalai',
    subtitle: 'Válogasd szét a háromszög nevezetes pontjait és egyeneseit tulajdonságaik szerint!',
    categories: [
      {
        id: 'cat-belso',
        name: 'Mindig belső pont',
        description: 'Bármilyen háromszög esetén a háromszög belsejében helyezkedik el',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-helyzetfuggo',
        name: 'Helyzete szögektől függ',
        description: 'Hegyesszögűben belül, derékszögűben a határon, tompaszögűben kívül van',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-vonal-tulajdonsag',
        name: 'Nevezetes egyenes / vonal',
        description: 'A háromszög oldalait vagy szögeit felező, összekötő geometriai vonal',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: 'Súlypont (S)',
        category: 'cat-belso',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,24 48,24 30,5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <circle cx="30" cy="17.6" r="2.5" fill="#059669" />
            <text x="34" y="19" className="text-[6px] font-bold fill-emerald-800">S</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Beírt kör középpontja (I)',
        category: 'cat-belso',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,24 48,24 30,5" fill="none" stroke="#10b981" strokeWidth="1" />
            <circle cx="30" cy="18" r="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
            <circle cx="30" cy="18" r="1.5" fill="#059669" />
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Magasságpont (M)',
        category: 'cat-helyzetfuggo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="18,22 48,22 25,12" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1" />
            <circle cx="12" cy="6" r="2" fill="#e11d48" />
            <text x="15" y="7" className="text-[6px] font-black fill-rose-600">M kívül</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Körülírt kör középpontja (O)',
        category: 'cat-helyzetfuggo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 1" />
            <polygon points="20,21 40,21 30,4" fill="none" stroke="#334155" strokeWidth="1" />
            <circle cx="30" cy="14" r="1.5" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Súlyvonal',
        category: 'cat-vonal-tulajdonsag',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,24 48,24 30,5" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="30" y1="5" x2="30" y2="24" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Magasságvonal',
        category: 'cat-vonal-tulajdonsag',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 24,5" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="24" y1="5" x2="24" y2="24" stroke="#7c3aed" strokeWidth="1.5" />
            {/* Hungarian right angle: arc + dot */}
            <path d="M 24 19 A 5 5 0 0 1 29 24" fill="none" stroke="#7c3aed" strokeWidth="0.8" />
            <circle cx="26.5" cy="21.5" r="0.6" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Oldalfelező merőleges',
        category: 'cat-vonal-tulajdonsag',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="18" x2="48" y2="18" stroke="#8b5cf6" strokeWidth="1.5" />
            <line x1="30" y1="3" x2="30" y2="25" stroke="#7c3aed" strokeWidth="1.5" />
            {/* Hungarian right angle: arc + dot */}
            <path d="M 30 13 A 5 5 0 0 1 35 18" fill="none" stroke="#7c3aed" strokeWidth="0.8" />
            <circle cx="32.5" cy="15.5" r="0.6" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Belső szögfelező',
        category: 'cat-vonal-tulajdonsag',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="23" x2="50" y2="23" stroke="#8b5cf6" strokeWidth="1.2" />
            <line x1="10" y1="23" x2="42" y2="5" stroke="#8b5cf6" strokeWidth="1.2" />
            <line x1="10" y1="23" x2="48" y2="14" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's19',
        label: 'Háromszög középvonala',
        category: 'cat-vonal-tulajdonsag',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,24 48,24 30,5" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="21" y1="14.5" x2="39" y2="14.5" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Euler-egyenes',
        category: 'cat-vonal-tulajdonsag',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="14" x2="52" y2="14" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="16" cy="14" r="1.5" fill="#dc2626" />
            <circle cx="34" cy="14" r="1.5" fill="#7c3aed" />
            <circle cx="43" cy="14" r="1.5" fill="#059669" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Síknégyszögek és Sokszögek Besorolása',
    subtitle: 'Rendszerezd a geometriai síkidomokat a definíciójuk és családfájuk szerint!',
    categories: [
      {
        id: 'cat-paralelogrammak',
        name: 'Paralelogrammák családja',
        description: 'Két párhuzamos oldalpárral rendelkező négyszögek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-trapezok-deltoidok',
        name: 'Trapézok és deltoidok',
        description: 'Egy párhuzamos oldalpár (trapéz) vagy két-két szomszédos egyenlő oldal (deltoid)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-szabalyos-sokszogek',
        name: 'Szabályos sokszögek',
        description: 'Minden oldaluk és minden belső szögük egyenlő',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'Négyzet',
        category: 'cat-paralelogrammak',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="21" y="5" width="18" height="18" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Rombusz',
        category: 'cat-paralelogrammak',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 47,14 30,24 13,14" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Téglalap',
        category: 'cat-paralelogrammak',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="15" y="6" width="30" height="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Általános paralelogramma',
        category: 'cat-paralelogrammak',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 40,22 48,6 20,6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Húrtrapéz (egyenlő szárú trapéz)',
        category: 'cat-trapezok-deltoidok',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,23 50,23 40,6 20,6" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Derékszögű trapéz',
        category: 'cat-trapezok-deltoidok',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="15,23 48,23 40,6 15,6" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
            {/* Hungarian right angle: arc + dot */}
            <path d="M 15 18 A 5 5 0 0 1 20 23" fill="none" stroke="#d97706" strokeWidth="0.8" />
            <circle cx="17.5" cy="20.5" r="0.6" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Konvex deltoid',
        category: 'cat-trapezok-deltoidok',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,14 32,5 50,14 32,23" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Konkáv deltoid (nyílhegy)',
        category: 'cat-trapezok-deltoidok',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,14 50,6 36,14 50,22" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Szabályos nyolcszög (135°-os szögek)',
        category: 'cat-szabalyos-sokszogek',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="24,5 36,5 44,11 44,17 36,23 24,23 16,17 16,11" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Szabályos tízszög (35 átló)',
        category: 'cat-szabalyos-sokszogek',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="10" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  }
};

export const GeometrySummarySorter: React.FC<GeometrySummarySorterProps> = ({
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
      key={`sorter-geom-summary-${level}`}
      topicId={topicId || 'g7-geom-summary-sorter'}
      topicTitle={topicTitle || '14. Összefoglalás'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🧩 CSOPORTOSÍTÓ"
      title="Geometria Összefoglaló Csoportosító Játék"
      subtitle="Válogasd szét a geometriai alakzatokat és tételeket kategóriájuk szerint mindhárom szinten!"
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      level={level}
      currentLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="teal"
    />
  );
};

export default GeometrySummarySorter;
