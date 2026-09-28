import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface TransformationsSorterProps {
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
    title: '1. Szint: Fixpontok Száma Szerinti Besorolás',
    subtitle: 'Sorold be a megadott geometriai leképezéseket a fixpontjaik száma szerint!',
    categories: [
      {
        id: 'cat-zero',
        name: '0 fixpont (Nincs fixpontja)',
        description: 'Egyetlen síkbeli pont sem marad a helyén',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-one',
        name: 'Pontosan 1 fixpont',
        description: 'Kizárólag egyetlen pont marad önmaga képe',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-inf',
        name: 'Végtelen sok fixpont',
        description: 'Egy teljes egyenes vagy a sík minden pontja fixpont',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Párhuzamos eltolás (v⃗ ≠ 0)',
        category: 'cat-zero',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="50" y2="15" stroke="#e11d48" strokeWidth="2" />
            <polygon points="55,15 48,11 48,19" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Középpontos tükrözés (az O centrum)',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="4" fill="#d97706" />
            <text x="32" y="27" className="text-[7px] font-bold fill-amber-800">O</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Tengelyes tükrözés a t tengelyre',
        category: 'cat-inf',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="5" x2="35" y2="25" stroke="#0d9488" strokeWidth="2.5" />
            <text x="40" y="18" className="text-[7px] font-bold fill-teal-800">t</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Csúsztatva tükrözés',
        category: 'cat-zero',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 20 8 L 35 22" stroke="#e11d48" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's5',
        label: '90°-os elforgatás az O pont körül',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3.5" fill="#d97706" />
            <path d="M 45 15 A 10 10 0 0 1 35 5" fill="none" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Identikus transzformáció (helybenhagyás)',
        category: 'cat-inf',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="8" width="40" height="14" rx="3" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
            <text x="22" y="18" className="text-[7px] font-bold fill-teal-900">P' = P</text>
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Eltolás egy v⃗(3; 4) vektorral',
        category: 'cat-zero',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="18" y="18" className="text-[8px] font-mono font-bold fill-rose-700">v⃗(3; 4)</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Középpontos hasonlóság (λ = 2, O centrum)',
        category: 'cat-one',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="20" cy="15" r="3" fill="#d97706" />
            <text x="32" y="18" className="text-[8px] font-bold fill-amber-700">λ = 2</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Tükrözés az y tengelyre',
        category: 'cat-inf',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="5" x2="35" y2="25" stroke="#0d9488" strokeWidth="2" />
            <text x="40" y="18" className="text-[7px] font-bold fill-teal-800">x=0</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Invariáns Egyenesek Típusa',
    subtitle: 'Sorold be a tulajdonságokat a hozzájuk tartozó invariáns egyenestípushoz!',
    categories: [
      {
        id: 'cat-perp',
        name: 'Tengelyre merőleges egyenesek',
        description: 'Tengelyes tükrözés invariáns egyenesei a tengelyen kívül',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-thru',
        name: 'Centrumon áthaladó egyenesek',
        description: 'Középpontos tükrözésnél vagy hasonlóságnál',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-para',
        name: 'Irányvektorral párhuzamos egyenesek',
        description: 'Párhuzamos eltolás során önmagukra képződnek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      }
    ],
    items: [
      {
        id: 's10',
        label: 'Tengelyes tükrözésnél a tükörtengelyre merőlegesek (e ⊥ t)',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="4" x2="35" y2="26" stroke="#0d9488" strokeWidth="2" />
            <line x1="10" y1="15" x2="60" y2="15" stroke="#14b8a6" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Középpontos tükrözésnél az O ponton átmenő egyenesek (e ∋ O)',
        category: 'cat-thru',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#9333ea" />
            <line x1="12" y1="6" x2="58" y2="24" stroke="#a855f7" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Párhuzamos eltolásnál az eltolásvektorral párhuzamosak (e ∥ v⃗)',
        category: 'cat-para',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" stroke="#2563eb" strokeWidth="1.8" />
            <line x1="10" y1="20" x2="60" y2="20" stroke="#3b82f6" strokeWidth="1.8" />
          </svg>
        )
      },
      {
        id: 's13',
        label: 'x = 3 függőleges tengely esetén az y = konstans vízszintesek',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="14" y="19" className="text-[7px] font-mono font-bold fill-teal-800">x=3 ⊥ y=c</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Középpontos hasonlóságnál a centrumon átmenő egyenesek',
        category: 'cat-thru',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#9333ea" />
            <line x1="10" y1="15" x2="60" y2="15" stroke="#a855f7" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Vízszintes v⃗(4; 0) eltolásnál a vízszintes egyenesek',
        category: 'cat-para',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="14" y="19" className="text-[7px] font-mono font-bold fill-blue-800">v=(4;0) ∥ y=c</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Tengelyes szimmetriánál a pontpárokat összekötő szakaszok egyenesei',
        category: 'cat-perp',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="20" cy="15" r="2" fill="#0d9488" />
            <circle cx="50" cy="15" r="2" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 's17',
        label: '180°-os forgatásnál a forgáscentrumon áthaladó egyenesek',
        category: 'cat-thru',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#9333ea" />
            <text x="22" y="19" className="text-[7px] font-bold fill-purple-800">180° e ∋ O</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Ferde eltolásnál az elmozdulás egyenesének párhuzamosai',
        category: 'cat-para',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="12" y1="22" x2="58" y2="8" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Transzformációk Invariáns Tulajdonságai',
    subtitle: 'Sorold be a leképezéseket orientáció és távolságtartás szerint!',
    categories: [
      {
        id: 'cat-indirect',
        name: 'Megfordítja a körüljárást (Indirekt)',
        description: 'Tengelyes tükrözés és kompozíciói',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-direct-iso',
        name: 'Megőrzi a körüljárást és távolságtartó (Direkt izometria)',
        description: 'Eltolás, középpontos tükrözés, forgatás',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-sim',
        name: 'Szögtartó, de NEM távolságtartó (Hasonlóság)',
        description: 'Minden arányos skálázás (λ ≠ 1)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's19',
        label: 'Tengelyes tükrözés a t egyenesre',
        category: 'cat-indirect',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="18" y="19" className="text-[8px] font-bold fill-rose-700">↺  |  ↻</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Párhuzamos eltolás tetszőleges v⃗ vektorral',
        category: 'cat-direct-iso',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="50" y2="15" stroke="#059669" strokeWidth="2" />
            <polygon points="55,15 48,11 48,19" fill="#059669" />
          </svg>
        )
      },
      {
        id: 's21',
        label: 'Középpontos hasonlóság kétszeresére (λ = 2)',
        category: 'cat-sim',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="18" y="19" className="text-[8px] font-bold fill-indigo-700">λ = 2 (Nagyítás)</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'Csúsztatva tükrözés (tengelyes tükrözés + eltolás)',
        category: 'cat-indirect',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="12" y="19" className="text-[7px] font-bold fill-rose-700">t + v⃗ (Indirekt)</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'Középpontos tükrözés (180°-os elforgatás)',
        category: 'cat-direct-iso',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#059669" />
            <text x="25" y="27" className="text-[7px] font-bold fill-emerald-800">180°</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Középpontos kicsinyítés felére (λ = 0,5)',
        category: 'cat-sim',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="14" y="19" className="text-[8px] font-bold fill-indigo-700">λ = 0,5</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Koordináta-tükrözés az x tengelyre: (x; y) ↦ (x; -y)',
        category: 'cat-indirect',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="10" y="19" className="text-[7px] font-mono font-bold fill-rose-700">(x; y)↦(x; -y)</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: '60°-os elforgatás egy O pont körül',
        category: 'cat-direct-iso',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#059669" />
            <text x="26" y="27" className="text-[7px] font-bold fill-emerald-800">+60°</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Általános hasonlósági transzformáció (λ ≠ 1)',
        category: 'cat-sim',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="12" y="19" className="text-[8px] font-bold fill-indigo-700">|A\'B\'| = λ·|AB|</text>
          </svg>
        )
      }
    ]
  }
};

export const TransformationsSorter: React.FC<TransformationsSorterProps> = ({
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
      level={level}
      title="Transzformációk csoportosító játék"
      subtitle="Kategorizáld a transzformációkat fixpontjaik és invariánsaik szerint!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g8-geom-transforms'}
      topicTitle={topicTitle || 'Transzformációk'}
      grade={8}
      chapterId="geometria"
    />
  );
};

export default TransformationsSorter;
