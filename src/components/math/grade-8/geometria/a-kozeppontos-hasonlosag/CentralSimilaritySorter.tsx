import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CentralSimilaritySorterProps {
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
    title: '1. Szint: A Leképezés Jellege a λ Arány Nagysága Szerint',
    subtitle: 'Sorold be a megadott transzformációkat és eseteket a geometriai jellegük szerint!',
    categories: [
      {
        id: 'cat-enlarge',
        name: 'Nagyítás (|λ| > 1)',
        description: 'Minden képszakasz hosszabb, a kerület és terület nagyobb az eredetinél',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-congruent',
        name: 'Egybevágóság (|λ| = 1)',
        description: 'Távolságtartó: identitás (λ = 1) vagy középpontos tükrözés (λ = -1)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-reduce',
        name: 'Kicsinyítés (0 < |λ| < 1)',
        description: 'Minden képszakasz rövidebb, a kerület és terület kisebb az eredetinél',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 'cs-s1',
        label: 'λ = +2,5 arányú középpontos hasonlóság',
        category: 'cat-enlarge',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 24,24 18,12" fill="#dbeafe" className="stroke-blue-600 stroke-[1]" />
            <polygon points="34,26 62,26 48,4" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'cs-s2',
        label: 'λ = -2 arányú középpontos hasonlóság (átforduló kétszeres kép)',
        category: 'cat-enlarge',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="45,22 55,22 50,14" fill="#dbeafe" className="stroke-blue-600 stroke-[1]" />
            <circle cx="38" cy="15" r="2" fill="#4f46e5" />
            <polygon points="25,8 5,8 15,24" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-s3',
        label: 'λ = 1 identitás (helybenhagyás)',
        category: 'cat-congruent',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="24,24 46,24 35,8" fill="#d1fae5" className="stroke-emerald-600 stroke-[1.5]" />
            <text x="35" y="20" textAnchor="middle" className="text-[6px] font-bold fill-emerald-800">F = F'</text>
          </svg>
        )
      },
      {
        id: 'cs-s4',
        label: 'λ = -1 középpontos tükrözés az O pontra',
        category: 'cat-congruent',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 26,24 19,10" fill="#d1fae5" className="stroke-emerald-600 stroke-[1]" />
            <circle cx="35" cy="15" r="2" fill="#4f46e5" />
            <polygon points="58,6 44,6 51,20" fill="#d1fae5" className="stroke-emerald-600 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 'cs-s5',
        label: 'λ = +0,5 arányú kicsinyítés a harmadára',
        category: 'cat-reduce',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="10,26 38,26 24,6" fill="none" className="stroke-indigo-400 stroke-[1]" />
            <polygon points="46,24 60,24 53,14" fill="#c7d2fe" className="stroke-indigo-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'cs-s6',
        label: 'λ = -1/3 arányú kicsinyítés (180°-os átfordulással)',
        category: 'cat-reduce',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="42,26 64,26 53,8" fill="none" stroke="#64748b" strokeWidth="1" />
            <circle cx="35" cy="15" r="2" fill="#4f46e5" />
            <polygon points="25,12 18,12 21.5,18" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 'cs-s7',
        label: 'OP = 5 cm távolságú pont képe OP\' = 15 cm távolságra kerül',
        category: 'cat-enlarge',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="10" cy="15" r="2" fill="#4f46e5" />
            <circle cx="25" cy="15" r="2" fill="#0284c7" />
            <circle cx="55" cy="15" r="2" fill="#2563eb" />
          </svg>
        )
      },
      {
        id: 'cs-s8',
        label: 'A háromszög súlypontjából az oldalfelező pontokba képzés (λ = -1/2)',
        category: 'cat-reduce',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,26 58,26 35,4" fill="none" stroke="#64748b" strokeWidth="1" />
            <polygon points="35,26 46.5,15 23.5,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cs-s9',
        label: '180°-os forgatás a sík egy O pontja körül',
        category: 'cat-congruent',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 25 15 A 10 10 0 0 1 45 15" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="35" cy="15" r="2.5" fill="#10b981" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Pontok Helyzete a Centrumhoz Képest (Előjel)',
    subtitle: 'Hová kerül a képpont az O centrumhoz és a kiinduló ponthoz viszonyítva?',
    categories: [
      {
        id: 'cat-same',
        name: 'Azonos félegyenes (λ > 0)',
        description: 'P és P\' a centrum azonos oldalán fekszik az OP egyenesen',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-opposite',
        name: 'Ellentétes félegyenes (λ < 0)',
        description: 'P\' átfordul az O ponton át, az O pont a P és P\' között helyezkedik el',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-fixed',
        name: 'Fixpont (helyben maradó)',
        description: 'A pont képe önmaga (nem mozdul el a leképezés során)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 'cs-s10',
        label: 'λ = +3 arányú leképezés egy tetszőleges P pontra',
        category: 'cat-same',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="15" cy="15" r="3" fill="#4f46e5" />
            <circle cx="30" cy="15" r="2" fill="#0284c7" />
            <circle cx="55" cy="15" r="2" fill="#10b981" />
          </svg>
        )
      },
      {
        id: 'cs-s11',
        label: 'λ = -1,5 arányú leképezés egy tetszőleges P pontra',
        category: 'cat-opposite',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="15" cy="15" r="2" fill="#f59e0b" />
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
            <circle cx="55" cy="15" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'cs-s12',
        label: 'A hasonlóság O centruma bármely λ esetén',
        category: 'cat-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="4" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O' = O</text>
          </svg>
        )
      },
      {
        id: 'cs-s13',
        label: 'Középpontos tükrözés egy síkbeli P pontra (λ = -1)',
        category: 'cat-opposite',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="15" cy="15" r="2" fill="#f59e0b" />
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
            <circle cx="55" cy="15" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'cs-s14',
        label: 'Árnyékkép vetítése pontszerű fényforrásból a falra',
        category: 'cat-same',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="12" cy="15" r="3" fill="#eab308" />
            <line x1="30" y1="10" x2="30" y2="20" stroke="#0284c7" strokeWidth="2" />
            <line x1="55" y1="5" x2="55" y2="25" stroke="#10b981" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 'cs-s15',
        label: 'Camera obscura (lyukkamerában a kép fejjel lefelé)',
        category: 'cat-opposite',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="8" x2="15" y2="22" stroke="#0284c7" strokeWidth="2" />
            <circle cx="35" cy="15" r="2" fill="#000000" />
            <line x1="55" y1="8" x2="55" y2="22" stroke="#ef4444" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 'cs-s16',
        label: 'λ = +0,8 arányú kicsinyítés a sík egy pontjára',
        category: 'cat-same',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="15" cy="15" r="3" fill="#4f46e5" />
            <circle cx="45" cy="15" r="2" fill="#10b981" />
            <circle cx="55" cy="15" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'cs-s17',
        label: 'Koordinátasíkon P(2, 3) pont képe P\'(-4, -6) az origóra nézve',
        category: 'cat-opposite',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2" fill="#4f46e5" />
            <circle cx="50" cy="8" r="2" fill="#0284c7" />
            <circle cx="20" cy="22" r="2" fill="#ef4444" />
          </svg>
        )
      },
      {
        id: 'cs-s18',
        label: 'λ = 1 identitás esetén a sík bármely pontja',
        category: 'cat-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2.5" fill="#10b981" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-emerald-800">P' = P</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Tulajdonságok Jellege',
    subtitle: 'Válogasd szét az invariáns, a méretfüggő és a feltételes tulajdonságokat!',
    categories: [
      {
        id: 'cat-invariant',
        name: 'Mindig invariáns',
        description: 'Bármely λ ≠ 0 arány esetén szigorúan változatlan marad',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-scale',
        name: 'Méretfüggő (|λ| vagy λ²)',
        description: 'A hasonlóság arányával vagy annak négyzetével változik meg',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-conditional',
        name: 'Feltételes tulajdonság',
        description: 'Csak speciális arány (pl. |λ| = 1) vagy elhelyezkedés (pl. O ∈ e) esetén teljesül',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 'cs-s19',
        label: 'A szögek nagysága (α\' = α)',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 L 30 22 L 25 10" fill="none" stroke="#059669" strokeWidth="1.5" />
            <path d="M 40 22 L 60 22 L 53 6" fill="none" stroke="#059669" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-s20',
        label: 'Párhuzamos egyenesek képei párhuzamosak (e ∥ f ⟹ e\' ∥ f\')',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" stroke="#059669" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="60" y2="20" stroke="#059669" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-s21',
        label: 'Szakaszok hossza (|A\'B\'| = |λ| · |AB|)',
        category: 'cat-scale',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="25" y2="15" stroke="#7c3aed" strokeWidth="2" />
            <line x1="35" y1="15" x2="65" y2="15" stroke="#7c3aed" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 'cs-s22',
        label: 'Sík idom területe (T\' = λ² · T)',
        category: 'cat-scale',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="12" y="12" width="12" height="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <rect x="36" y="4" width="24" height="24" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-s23',
        label: 'Pontok távolsága a centrumtól (OP\' = |λ| · OP)',
        category: 'cat-scale',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="55" y2="15" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="10" cy="15" r="2.5" fill="#4f46e5" />
            <circle cx="25" cy="15" r="2" fill="#0284c7" />
            <circle cx="55" cy="15" r="2" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 'cs-s24',
        label: 'Alakzatok körüljárási iránya (irányítástartás)',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 25 15 A 8 8 0 1 1 24 18" fill="none" stroke="#059669" strokeWidth="1.5" />
            <path d="M 50 15 A 8 8 0 1 1 49 18" fill="none" stroke="#059669" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-s25',
        label: 'Távolságtartás (|A\'B\'| = |AB|)',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-800">Csak ha |λ| = 1</text>
          </svg>
        )
      },
      {
        id: 'cs-s26',
        label: 'Egyenes egybeesik a képével (e\' = e invariáns egyenes)',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#d97706" strokeWidth="2" />
            <circle cx="35" cy="15" r="2.5" fill="#4f46e5" />
            <text x="35" y="25" textAnchor="middle" className="text-[5px] font-bold fill-amber-800">Csak ha O ∈ e</text>
          </svg>
        )
      },
      {
        id: 'cs-s27',
        label: 'A centrumon kívül van másik fixpont a síkban',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-800">Csak ha λ = 1 (identitás)</text>
          </svg>
        )
      }
    ]
  }
};

export const CentralSimilaritySorter: React.FC<CentralSimilaritySorterProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-geom-central-similarity',
  topicTitle = 'A középpontos hasonlóság'
}) => {
  return (
    <SorterTemplate
      level={level}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Középpontos Hasonlóság Csoportosító"
      subtitle="Kategorizáld a tulajdonságokat, arányokat és pontokat!"
      badge="8. Osztály • Geometria"
      gameId="g8-geom-central-similarity-sorter"
    />
  );
};

export default CentralSimilaritySorter;
