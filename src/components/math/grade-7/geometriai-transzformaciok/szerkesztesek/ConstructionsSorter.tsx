import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConstructionsSorterProps {
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
    title: '1. Szint: Szerkesztési eszközök és műveletek',
    subtitle: 'Válogasd szét a szerkesztési műveleteket az elvégzésükhöz szükséges eszközök szerint!',
    categories: [
      {
        id: 'cat-korzo',
        name: 'Körzővel végzett művelet',
        description: 'Távolságok másolása, körívek és forgatás',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-vonalzo',
        name: 'Vonalzóval végzett művelet',
        description: 'Pontok összekötése, egyenesek és félegyenesek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-kombinalt',
        name: 'Összetett szerkesztési eljárás',
        description: 'Körző és vonalzó összehangolt lépéssorozata',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Szakaszhossz lemérése és átvitele',
        category: 'cat-korzo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="20" x2="50" y2="20" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 20 8 L 30 22 L 40 8" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="30" cy="8" r="1.5" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Két adott pont összekötése egyenessel',
        category: 'cat-vonalzo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="22" x2="52" y2="6" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="2" fill="#0284c7" />
            <circle cx="42" cy="10" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Adott sugarú körív megrajzolása',
        category: 'cat-korzo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="2" fill="#0d9488" />
            <path d="M 18 20 A 14 14 0 0 1 44 8" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 1" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Adott félegyenes meghosszabbítása',
        category: 'cat-vonalzo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="14" x2="35" y2="14" stroke="#0284c7" strokeWidth="2" />
            <line x1="35" y1="14" x2="52" y2="14" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="10" cy="14" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Szakaszfelező merőleges szerkesztése',
        category: 'cat-kombinalt',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="14" x2="50" y2="14" stroke="#475569" strokeWidth="1.5" />
            <line x1="30" y1="3" x2="30" y2="25" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="30" cy="6" r="1.2" fill="#7c3aed" />
            <circle cx="30" cy="22" r="1.2" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Szögfelező félegyenes szerkesztése',
        category: 'cat-kombinalt',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="22" x2="48" y2="22" stroke="#475569" strokeWidth="1.2" />
            <line x1="12" y1="22" x2="42" y2="6" stroke="#475569" strokeWidth="1.2" />
            <line x1="12" y1="22" x2="50" y2="13" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Két metszésponton átmenő egyenes húzása',
        category: 'cat-vonalzo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="6" x2="52" y2="22" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="22" cy="11" r="2" fill="#e11d48" />
            <circle cx="38" cy="17" r="2" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Középpont körüli körív kimetszése',
        category: 'cat-korzo',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="20" cy="14" r="2" fill="#0d9488" />
            <path d="M 40 4 A 20 20 0 0 1 40 24" fill="none" stroke="#0d9488" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Párhuzamos szerkesztése adott ponton át',
        category: 'cat-kombinalt',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="8" x2="52" y2="8" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="8" y1="20" x2="52" y2="20" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="28" y1="4" x2="28" y2="24" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Szög átmásolása másik félegyenesre',
        category: 'cat-kombinalt',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 12 20 L 26 8" stroke="#7c3aed" strokeWidth="1.2" />
            <path d="M 12 20 L 28 20" stroke="#7c3aed" strokeWidth="1.2" />
            <path d="M 34 20 L 48 8" stroke="#7c3aed" strokeWidth="1.2" />
            <path d="M 34 20 L 50 20" stroke="#7c3aed" strokeWidth="1.2" />
            <path d="M 20 20 A 8 8 0 0 0 18 14" fill="none" stroke="#e11d48" strokeWidth="1" />
            <path d="M 42 20 A 8 8 0 0 0 40 14" fill="none" stroke="#e11d48" strokeWidth="1" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szögek szerkeszthetősége',
    subtitle: 'Válogasd szét a szögeket aszerint, hogy euklideszi módszerrel miként állíthatók elő!',
    categories: [
      {
        id: 'cat-direct-alap',
        name: 'Közvetlen alapszög és felezése',
        description: '60°, 90°, és ezek felezései (30°, 45°, 15°)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-osszetett',
        name: 'Összetett szerkeszthető szög',
        description: 'Alapszögek összege vagy különbsége (pl. 75°, 105°, 120°, 135°)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-nem-szerkesztheto',
        name: 'Nem szerkeszthető szög',
        description: 'Csak körzővel és vonalzóval pontosan nem állítható elő',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: '60°-os szög (Szabályos háromszög)',
        category: 'cat-direct-alap',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="22" x2="48" y2="22" stroke="#059669" strokeWidth="1.5" />
            <line x1="12" y1="22" x2="30" y2="7" stroke="#059669" strokeWidth="1.5" />
            <text x="24" y="19" className="text-[7px] font-bold fill-emerald-700">60°</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: '90°-os szög (Derékszög merőlegesből)',
        category: 'cat-direct-alap',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="22" x2="48" y2="22" stroke="#059669" strokeWidth="1.5" />
            <line x1="26" y1="22" x2="26" y2="6" stroke="#059669" strokeWidth="1.5" />
            <path d="M 26 15 A 7 7 0 0 1 33 22" fill="none" stroke="#059669" strokeWidth="1" />
            <circle cx="29.5" cy="18.5" r="0.8" fill="#059669" />
          </svg>
        )
      },
      {
        id: 's13',
        label: '45°-os szög (90° felezése)',
        category: 'cat-direct-alap',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="22" x2="48" y2="22" stroke="#059669" strokeWidth="1.5" />
            <line x1="22" y1="22" x2="40" y2="6" stroke="#059669" strokeWidth="1.5" />
            <text x="29" y="18" className="text-[7px] font-bold fill-emerald-700">45°</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: '30°-os szög (60° felezése)',
        category: 'cat-direct-alap',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="22" x2="50" y2="22" stroke="#059669" strokeWidth="1.5" />
            <line x1="10" y1="22" x2="45" y2="8" stroke="#059669" strokeWidth="1.5" />
            <text x="26" y="19" className="text-[7px] font-bold fill-emerald-700">30°</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: '75°-os szög (45° + 30° összege)',
        category: 'cat-osszetett',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="14" y1="22" x2="50" y2="22" stroke="#d97706" strokeWidth="1.5" />
            <line x1="14" y1="22" x2="27" y2="6" stroke="#d97706" strokeWidth="1.5" />
            <text x="26" y="18" className="text-[7px] font-bold fill-amber-700">75°</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: '120°-os szög (2 × 60° összemérése)',
        category: 'cat-osszetett',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="30" y1="22" x2="54" y2="22" stroke="#d97706" strokeWidth="1.5" />
            <line x1="30" y1="22" x2="16" y2="10" stroke="#d97706" strokeWidth="1.5" />
            <text x="26" y="13" className="text-[7px] font-bold fill-amber-700">120°</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: '20°-os szög (A 60° harmadolása)',
        category: 'cat-nem-szerkesztheto',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="22" x2="52" y2="22" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="10" y1="22" x2="50" y2="11" stroke="#e11d48" strokeWidth="1.5" />
            <text x="25" y="19" className="text-[7px] font-black fill-rose-600">20° ✖</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: '135°-os szög (90° + 45° összege)',
        category: 'cat-osszetett',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="32" y1="22" x2="54" y2="22" stroke="#d97706" strokeWidth="1.5" />
            <line x1="32" y1="22" x2="14" y2="8" stroke="#d97706" strokeWidth="1.5" />
            <text x="28" y="13" className="text-[7px] font-bold fill-amber-700">135°</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: '50°-os szög (Nem 3° többszöröse)',
        category: 'cat-nem-szerkesztheto',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="22" x2="48" y2="22" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="12" y1="22" x2="35" y2="8" stroke="#e11d48" strokeWidth="1.5" />
            <text x="22" y="18" className="text-[7px] font-black fill-rose-600">50° ✖</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: '105°-os szög (60° + 45° összege)',
        category: 'cat-osszetett',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="28" y1="22" x2="52" y2="22" stroke="#d97706" strokeWidth="1.5" />
            <line x1="28" y1="22" x2="18" y2="8" stroke="#d97706" strokeWidth="1.5" />
            <text x="28" y="14" className="text-[7px] font-bold fill-amber-700">105°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Háromszögszerkesztési adatok és megoldhatóság',
    subtitle: 'Válogasd szét a megadott adathalmazokat a szerkeszthető háromszögek száma szerint!',
    categories: [
      {
        id: 'cat-egyertelmu',
        name: 'Egyértelmű (pontosan 1 db)',
        description: 'Egyértelműen meghatározott háromszög',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-tobb-vagy-vegtelen',
        name: '2 db vagy végtelen sok',
        description: 'Nem egyértelmű az alak vagy a méret',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-lehetetlen',
        name: 'Nem szerkeszthető (0 db)',
        description: 'Ellentmondás vagy sérülő geometriai feltétel',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'Három oldal: 5 cm, 6 cm, 7 cm (o-o-o)',
        category: 'cat-egyertelmu',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 48,22 34,7" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="30" y="17" textAnchor="middle" className="text-[6.5px] font-bold fill-teal-900">1 db</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Három oldal: 3 cm, 4 cm, 8 cm (3+4 < 8)',
        category: 'cat-lehetetlen',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="20" x2="52" y2="20" stroke="#475569" strokeWidth="1.5" />
            <path d="M 8 20 A 14 14 0 0 1 20 10" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <path d="M 52 20 A 18 18 0 0 0 38 8" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <text x="30" y="14" textAnchor="middle" className="text-[6.5px] font-black fill-rose-600">0 db</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Két oldal és közbezárt szög: 6 cm, 8 cm, 50°',
        category: 'cat-egyertelmu',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 48,22 30,8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="18" y="20" className="text-[6px] font-bold fill-teal-800">50°</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Három szög megadva: 50°, 60°, 70°',
        category: 'cat-tobb-vagy-vegtelen',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="14,22 38,22 28,10" fill="none" stroke="#6366f1" strokeWidth="1" />
            <polygon points="8,24 52,24 34,5" fill="none" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="2 1" />
            <text x="42" y="15" className="text-[6px] font-bold fill-indigo-700">∞</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Egy oldal és rajta fekvő két szög (sz-o-sz)',
        category: 'cat-egyertelmu',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 48,22 36,7" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="36" cy="7" r="1.5" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Két oldal és a kisebbikkel szemközti hegyesszög',
        category: 'cat-tobb-vagy-vegtelen',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="22" x2="52" y2="22" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="12" y1="22" x2="28" y2="8" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="28" y1="8" x2="35" y2="22" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="28" y1="8" x2="46" y2="22" stroke="#e11d48" strokeWidth="1.2" />
            <text x="38" y="13" className="text-[6px] font-bold fill-rose-600">2 db</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Két tompaszög: α = 95°, β = 100° (összeg > 180°)',
        category: 'cat-lehetetlen',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="20" y1="22" x2="40" y2="22" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="22" x2="10" y2="8" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="40" y1="22" x2="50" y2="8" stroke="#e11d48" strokeWidth="1.2" />
            <text x="30" y="14" textAnchor="middle" className="text-[6.5px] font-black fill-rose-600">0 db</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: 'Két oldal és a nagyobbikkal szemközti szög',
        category: 'cat-egyertelmu',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="12,22 48,22 28,7" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="30" y="17" textAnchor="middle" className="text-[6.5px] font-bold fill-teal-900">1 db</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Három oldal: 2 cm, 3 cm, 5 cm (2 + 3 = 5)',
        category: 'cat-lehetetlen',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="14" x2="50" y2="14" stroke="#475569" strokeWidth="2" />
            <circle cx="10" cy="14" r="1.5" fill="#e11d48" />
            <circle cx="26" cy="14" r="1.5" fill="#e11d48" />
            <circle cx="50" cy="14" r="1.5" fill="#e11d48" />
            <text x="30" y="24" textAnchor="middle" className="text-[6px] font-bold fill-rose-600">elfajuló (0 db)</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Szabályos háromszög magassága m = 6 cm',
        category: 'cat-egyertelmu',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="14,23 46,23 30,7" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="30" y1="7" x2="30" y2="23" stroke="#e11d48" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <text x="34" y="16" className="text-[6px] font-bold fill-rose-600">m</text>
          </svg>
        )
      }
    ]
  }
};

export const ConstructionsSorter: React.FC<ConstructionsSorterProps> = ({
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
      key={`sorter-constructions-${level}`}
      topicId={topicId || 'g7-geom-constructions-sorter'}
      topicTitle={topicTitle || 'Szerkesztések'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🧩 CSOPORTOSÍTÓ"
      title="Szerkesztések Csoportosító Játék"
      subtitle="Válogasd szét a szerkesztési lépéseket, szögeket és háromszögalapeseteket a megadott kategóriákba!"
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

export default ConstructionsSorter;
