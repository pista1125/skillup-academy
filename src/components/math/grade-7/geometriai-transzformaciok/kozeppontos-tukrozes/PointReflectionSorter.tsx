import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PointReflectionSorterProps {
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
    title: '1. Szint: Alakzatok és Egyenesek Viszonya a Centrumhoz',
    subtitle: 'Csoportosítsd az elemeket aszerint, hogy milyen viszonyban állnak az O centrummal!',
    categories: [
      {
        id: 'cat-fixpoint',
        name: 'Fixpont (O = O\')',
        description: 'A leképezés során a helyén marad, képe önmaga',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-fixline',
        name: 'Fixegyenes (O ∈ e)',
        description: 'Átmegy a centrumon, a vonal képe önmaga (de a pontjai helyet cserélnek)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      },
      {
        id: 'cat-parallel',
        name: 'Párhuzamos képegyenes (O ∉ e)',
        description: 'Nem megy át a centrumon, képe szigorúan párhuzamos az eredetivel (e\' ∥ e)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'A tükrözés centruma (O)',
        category: 'cat-fixpoint',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <circle cx="25" cy="12.5" r="4" className="fill-amber-500 stroke-2 stroke-amber-600" />
            <text x="21" y="24" className="text-[8px] font-bold fill-amber-700">O</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Centrumon átmenő egyenes (O ∈ e)',
        category: 'cat-fixline',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="5" y1="20" x2="45" y2="5" stroke="#0891b2" strokeWidth="2" />
            <circle cx="25" cy="12.5" r="3" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Centrumot elkerülő vízszintes egyenes',
        category: 'cat-parallel',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="5" y1="6" x2="45" y2="6" stroke="#0d9488" strokeWidth="1.8" />
            <line x1="5" y1="19" x2="45" y2="19" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3,2" />
            <circle cx="25" cy="12.5" r="2.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'PP\' szakasz felezőpontja',
        category: 'cat-fixpoint',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="8" y1="12.5" x2="42" y2="12.5" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="8" cy="12.5" r="2" fill="#0891b2" />
            <circle cx="25" cy="12.5" r="3" fill="#f59e0b" />
            <circle cx="42" cy="12.5" r="2" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'O ponton átmenő átló',
        category: 'cat-fixline',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="10" y1="5" x2="40" y2="20" stroke="#0891b2" strokeWidth="2" />
            <circle cx="25" cy="12.5" r="2.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Háromszög O-t nem tartalmazó oldala',
        category: 'cat-parallel',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="8" y1="8" x2="35" y2="8" stroke="#0d9488" strokeWidth="2" />
            <circle cx="25" cy="18" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'A sík egyetlen pontja, amelynek képe önmaga',
        category: 'cat-fixpoint',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <circle cx="25" cy="12.5" r="7" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="25" cy="12.5" r="3.5" fill="#f59e0b" />
            <text x="35" y="16" className="text-[8px] font-bold fill-amber-600">1 db</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Centrumon átmenő koordinátatengely',
        category: 'cat-fixline',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="5" y1="12.5" x2="45" y2="12.5" stroke="#0891b2" strokeWidth="2" />
            <line x1="25" y1="2" x2="25" y2="23" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="25" cy="12.5" r="2.5" fill="#f59e0b" />
            <text x="38" y="9" className="text-[7px] font-bold fill-cyan-700">x</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Origót elkerülő koordináta-egyenes (pl. y = 3)',
        category: 'cat-parallel',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <line x1="5" y1="6" x2="45" y2="6" stroke="#0d9488" strokeWidth="1.8" />
            <line x1="5" y1="19" x2="45" y2="19" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="25" cy="12.5" r="2.5" fill="#f59e0b" />
            <text x="29" y="14" className="text-[6px] fill-amber-700 font-bold">O</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'O ponton áthaladó tetszőleges szelő',
        category: 'cat-fixline',
        figure: (
          <svg viewBox="0 0 50 25" className="w-12 h-6 mx-auto">
            <circle cx="25" cy="12.5" r="10" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="7" y1="22" x2="43" y2="3" stroke="#0891b2" strokeWidth="1.8" />
            <circle cx="25" cy="12.5" r="2.5" fill="#f59e0b" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Középpontos vs. Tengelyes Tükrözés Tulajdonságai',
    subtitle: 'Döntsd el, hogy az adott geometriai állítás melyik tükrözésfajtára érvényes!',
    categories: [
      {
        id: 'cat-point-only',
        name: 'Középpontos tükrözés (O)',
        description: 'Pontra vonatkozó, orientációtartó, 1 fixponttal rendelkező transzformáció',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      },
      {
        id: 'cat-axial-only',
        name: 'Tengelyes tükrözés (t)',
        description: 'Egyenesre vonatkozó, körüljárást megfordító transzformáció',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkettőre igaz',
        description: 'Közös egybevágósági alaptulajdonságok',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: 'Körüljárási irányt MEGŐRZI (direkt)',
        category: 'cat-point-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 12 18 A 6 6 0 1 1 20 18" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <polygon points="20,18 20,14 16,16" fill="#0891b2" />
            <path d="M 40 18 A 6 6 0 1 1 48 18" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <polygon points="48,18 48,14 44,16" fill="#0891b2" />
            <text x="27" y="17" className="text-[8px] font-bold fill-cyan-700">=</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Körüljárási irányt MEGFORDÍTJA (indirekt)',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="30" y1="3" x2="30" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 14 10 A 5 5 0 1 1 14 20" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <polygon points="14,10 11,13 17,13" fill="#6366f1" />
            <path d="M 46 20 A 5 5 0 1 1 46 10" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <polygon points="46,20 49,17 43,17" fill="#6366f1" />
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Távolságtartó: |A\'B\'| = |AB|',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="6" y1="14" x2="24" y2="14" stroke="#10b981" strokeWidth="2" />
            <line x1="15" y1="11" x2="15" y2="17" stroke="#10b981" strokeWidth="1.5" />
            <text x="27" y="16" className="text-[7px] font-bold fill-emerald-600">=</text>
            <line x1="36" y1="14" x2="54" y2="14" stroke="#10b981" strokeWidth="2" />
            <line x1="45" y1="11" x2="45" y2="17" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Pontosan 1 darab fixpontja van (a centrum)',
        category: 'cat-point-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="4" fill="#0891b2" stroke="#0e7490" strokeWidth="1.5" />
            <text x="27" y="25" className="text-[7px] font-bold fill-cyan-800">O</text>
            <text x="42" y="16" className="text-[8px] font-bold fill-cyan-600">#1</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Végtelen sok fixpontja van (egy teljes egyenes pontjai)',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="6" y1="14" x2="54" y2="14" stroke="#6366f1" strokeWidth="2" />
            <circle cx="15" cy="14" r="2" fill="#6366f1" />
            <circle cx="25" cy="14" r="2" fill="#6366f1" />
            <circle cx="35" cy="14" r="2" fill="#6366f1" />
            <circle cx="45" cy="14" r="2" fill="#6366f1" />
            <text x="47" y="10" className="text-[8px] font-bold fill-indigo-600">∞</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Szögtartó és területtartó (egybevágósági transzformáció)',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="8,22 18,6 26,22" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <text x="28" y="17" className="text-[8px] font-bold fill-emerald-600">≅</text>
            <polygon points="34,22 44,6 52,22" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Egyenértékű a síkban egy 180 fokos forgatással',
        category: 'cat-point-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 16 14 A 14 14 0 0 1 44 14" fill="none" stroke="#0891b2" strokeWidth="1.8" />
            <polygon points="44,14 40,10 42,17" fill="#0891b2" />
            <circle cx="30" cy="14" r="2.5" fill="#f59e0b" />
            <text x="21" y="25" className="text-[7px] font-bold fill-cyan-700">180°</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Egyenes és képe mindig párhuzamos (ha nem megy át az alapelemen)',
        category: 'cat-point-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="8" x2="52" y2="8" stroke="#0891b2" strokeWidth="1.8" />
            <line x1="8" y1="20" x2="52" y2="20" stroke="#0891b2" strokeWidth="1.8" />
            <circle cx="30" cy="14" r="2" fill="#f59e0b" />
            <text x="44" y="15" className="text-[7px] font-bold fill-cyan-600">∥</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: 'Kétszer egymás után alkalmazva önmagát adja (identitás)',
        category: 'cat-both',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 18 10 C 26 5, 34 5, 42 10" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="42,10 38,7 39,12" fill="#10b981" />
            <path d="M 42 18 C 34 23, 26 23, 18 18" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="18,18 22,21 21,16" fill="#10b981" />
            <text x="25" y="16" className="text-[6.5px] font-bold fill-emerald-700">T² = I</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'A pontot és képét összekötő szakasz merőleges az alapelemre',
        category: 'cat-axial-only',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="30" y1="3" x2="30" y2="25" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="12" y1="14" x2="48" y2="14" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="15" cy="14" r="2" fill="#6366f1" />
            <circle cx="45" cy="14" r="2" fill="#6366f1" />
            <rect x="30" y="10" width="4" height="4" fill="none" stroke="#6366f1" strokeWidth="0.8" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Állítások Értékelése Középpontos Tükrözésre',
    subtitle: 'Sorold be az állításokat igazságtartalmuk szerint a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig igaz',
        description: 'Tétel, általános szabály, minden esetben érvényes',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-conditional',
        name: 'Csak akkor igaz, ha átmegy O-n',
        description: 'Kizárólag akkor teljesül, ha a centrum rajta van az alakzaton / egyenesen',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-never-true',
        name: 'Sohasem igaz',
        description: 'Matematikailag hibás állítás, tévedés',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'A kép alakja és mérete egybevágó az eredetivel',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="8" y="8" width="16" height="12" rx="2" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <text x="27" y="17" className="text-[8px] font-bold fill-emerald-600">≅</text>
            <rect x="36" y="8" width="16" height="12" rx="2" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Egy egyenes képe önmaga (fixegyenes)',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="21" x2="52" y2="7" stroke="#f59e0b" strokeWidth="1.8" />
            <circle cx="30" cy="14" r="2.5" fill="#f59e0b" />
            <text x="34" y="21" className="text-[6.5px] font-bold fill-amber-700">O ∈ e</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'A háromszög körüljárási iránya megfordul',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <path d="M 22 8 A 8 8 0 1 1 16 16" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="18" y1="6" x2="42" y2="22" stroke="#e11d48" strokeWidth="2" />
            <line x1="18" y1="22" x2="42" y2="6" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Egy pont képe önmaga (P = P\')',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="3.5" fill="#f59e0b" />
            <text x="10" y="17" className="text-[7px] font-bold fill-amber-700">P = O</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'A szakasz és képe egyenlő hosszúságú (|A\'B\'| = |AB|)',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="10" x2="26" y2="10" stroke="#10b981" strokeWidth="2" />
            <line x1="34" y1="18" x2="52" y2="18" stroke="#10b981" strokeWidth="2" />
            <text x="28" y="16" className="text-[7px] font-bold fill-emerald-600">=</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'Két metsző egyenes képe párhuzamos egymással',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="8" x2="24" y2="20" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="10" y1="20" x2="24" y2="8" stroke="#94a3b8" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] fill-slate-500">→</text>
            <line x1="36" y1="10" x2="50" y2="10" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="36" y1="18" x2="50" y2="18" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="18" y1="5" x2="42" y2="23" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's27',
        label: 'A tükrözés után a pont távolsága a centrumtól megkétszereződik',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="14" x2="50" y2="14" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="10" cy="14" r="2" fill="#0891b2" />
            <circle cx="25" cy="14" r="2.5" fill="#f59e0b" />
            <circle cx="50" cy="14" r="2" fill="#0d9488" />
            <line x1="20" y1="5" x2="40" y2="23" stroke="#e11d48" strokeWidth="2" />
            <line x1="20" y1="23" x2="40" y2="5" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's28',
        label: 'A sugarat megtartva kör képe kör',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="16" cy="14" r="9" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="44" cy="14" r="9" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="30" cy="14" r="2" fill="#f59e0b" />
            <text x="28" y="9" className="text-[6px] font-bold fill-amber-700">O</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Egy félegyenes és képe egyetlen egyenest alkot',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="30" y1="14" x2="52" y2="14" stroke="#f59e0b" strokeWidth="1.8" />
            <polygon points="54,14 49,11 49,17" fill="#f59e0b" />
            <line x1="30" y1="14" x2="8" y2="14" stroke="#0891b2" strokeWidth="1.8" strokeDasharray="3 2" />
            <polygon points="6,14 11,11 11,17" fill="#0891b2" />
            <circle cx="30" cy="14" r="2.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's30',
        label: 'A transzformáció során a szakasz iránya ellenkezőjére vált',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="8" y1="8" x2="32" y2="8" stroke="#10b981" strokeWidth="1.8" />
            <polygon points="34,8 29,5 29,11" fill="#10b981" />
            <line x1="52" y1="20" x2="28" y2="20" stroke="#10b981" strokeWidth="1.8" />
            <polygon points="26,20 31,17 31,23" fill="#10b981" />
          </svg>
        )
      }
    ]
  }
};

export const PointReflectionSorter: React.FC<PointReflectionSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-point-reflection',
  topicTitle = '5. Középpontos tükrözés'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Középpontos Tükrözés Csoportosító"
      subtitle="Válaszd ki a kártyát, és sorold be a megfelelő geometriai kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default PointReflectionSorter;
