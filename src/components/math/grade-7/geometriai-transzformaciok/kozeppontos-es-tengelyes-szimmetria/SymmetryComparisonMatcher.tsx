import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SymmetryComparisonMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Szimmetriatulajdonságok',
    subtitle: 'Párosítsd a szimmetriafajták alaptulajdonságait és fogalmait!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Tengelyes tükrözés fixpontjai',
        value: 'A tükörtengely (t) összes pontja (végtelen sok fixpont)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="17.5" x2="60" y2="17.5" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="20" cy="17.5" r="2" fill="#ef4444" />
            <circle cx="35" cy="17.5" r="2" fill="#ef4444" />
            <circle cx="50" cy="17.5" r="2" fill="#ef4444" />
            <text x="58" y="14" className="text-[7px] font-bold fill-rose-600">t</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Középpontos tükrözés fixpontja',
        value: 'Egyetlen pont: maga a tükörközéppont (O centrum)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="3" fill="#0d9488" />
            <text x="40" y="19" className="text-[8px] font-black fill-teal-700">O</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Körüljárási irány tengelyes tükrözésnél',
        value: 'Megfordul (pl. óramutatóval ellentétesből megegyező lesz)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 20 25 A 10 10 0 1 1 30 15" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <polyline points="28,11 31,16 26,17" fill="#ef4444" />
            <text x="40" y="20" className="text-[8px] font-bold fill-rose-600">↺ ➔ ↻</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Körüljárási irány középpontos tükrözésnél',
        value: 'Megmarad (irányítástartó transzformáció)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 20 22 A 8 8 0 1 1 28 14" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <polyline points="26,11 29,15 25,16" fill="#0d9488" />
            <text x="36" y="20" className="text-[8px] font-bold fill-teal-700">↺ ➔ ↺</text>
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Egyenes és képe középpontos tükrözésnél',
        value: 'Mindig párhuzamosak egymással (e ∥ e\')',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="10" y1="25" x2="60" y2="25" stroke="#0284c7" strokeWidth="1.5" />
            <text x="24" y="20" className="text-[7px] font-bold fill-sky-700">e ∥ e'</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Középpontos tükrözés fizikai analógiája',
        value: 'Síkbeli 180°-os elforgatás az O centrum körül',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 20 18 A 12 12 0 0 1 50 18" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
            <polyline points="47,14 51,19 46,20" fill="#7c3aed" />
            <text x="26" y="30" className="text-[8px] font-bold fill-purple-700">180°</text>
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Tengelyes tükrözés fizikai analógiája',
        value: 'Síkból való 3D kifordítás (tükrözés/hajtás a tengely mentén)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,8 35,5 35,28 15,25" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="35,5 55,8 55,25 35,28" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.2" />
            <line x1="35" y1="3" x2="35" y2="30" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Egybevágósági transzformáció',
        value: 'Távolságtartó és szögtartó (az alakzat mérete és alakja nem változik)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,25 30,10 30,25" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <polygon points="40,25 55,10 55,25" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="28" y="32" className="text-[7px] font-bold fill-amber-700">≅ egybevágó</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Síkidomok és Négyszögek Szimmetriái',
    subtitle: 'Párosítsd a síkidomokat a rájuk jellemző szimmetriaviszonyokkal!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Általános paralelogramma',
        value: '0 szimmetriatengely, de KÖZÉPPONTOSAN SZIMMETRIKUS',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,26 45,26 55,9 25,9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Téglalap',
        value: '2 szimmetriatengely (oldalfelezők) és 1 szimmetriaközéppont',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="15" y="10" width="40" height="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="35" y1="6" x2="35" y2="31" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="10" y1="19" x2="60" y2="19" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="35" cy="19" r="1.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Rombusz',
        value: '2 szimmetriatengely (az átlók) és 1 szimmetriaközéppont',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 55,18 35,30 15,18" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1="35" y1="3" x2="35" y2="33" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="10" y1="18" x2="60" y2="18" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="35" cy="18" r="1.5" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Négyzet',
        value: '4 szimmetriatengely (2 oldalfelező + 2 átló) és 1 középpont',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="25" y="7" width="20" height="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="35" y1="3" x2="35" y2="31" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="20" y1="17" x2="50" y2="17" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="35" cy="17" r="1.5" fill="#16a34a" />
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Deltoid',
        value: '1 szimmetriatengely (a főátló), NEM középpontos',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 52,14 35,31 18,14" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="35" y1="2" x2="35" y2="33" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Szimmetrikus (húr)trapéz',
        value: '1 szimmetriatengely (alapok felezője), NEM középpontos',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="22,10 48,10 56,26 14,26" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.5" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Egyenlő szárú háromszög',
        value: '1 szimmetriatengely (alap felezőmerőlegese), NEM középpontos',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,7 53,27 17,27" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="35" y1="4" x2="35" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Szabályos háromszög',
        value: '3 szimmetriatengely, NEM középpontos (háromszög sosem az)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 55,27 15,27" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="35" y1="3" x2="35" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="12" y1="28" x2="48" y2="14" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="58" y1="28" x2="22" y2="14" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Kettős Szimmetria, Koordináták és Betűk',
    subtitle: 'Párosítsd az összetettebb szimmetriatételeket és szabályokat!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Két egymásra merőleges szimmetriatengely',
        value: 'A metszéspontjuk szükségszerűen az alakzat szimmetriaközéppontja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="17.5" x2="60" y2="17.5" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="35" cy="17.5" r="2.5" fill="#d97706" />
            <text x="39" y="15" className="text-[7px] font-bold fill-amber-700">O</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'P(x; y) pont tükörképe az origóra',
        value: "P'(-x; -y) — mindkét koordináta az ellentettjére változik",
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="17.5" x2="65" y2="17.5" stroke="#94a3b8" strokeWidth="1" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="50" cy="10" r="2" fill="#0284c7" />
            <circle cx="20" cy="25" r="2" fill="#ef4444" />
            <line x1="50" y1="10" x2="20" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'P(x; y) pont tükörképe az x-tengelyre',
        value: "P'(x; -y) — az x változatlan marad, az y előjelet vált",
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="5" y1="17.5" x2="65" y2="17.5" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="35" cy="9" r="2" fill="#0284c7" />
            <circle cx="35" cy="26" r="2" fill="#ef4444" />
            <text x="40" y="10" className="text-[6px] font-bold fill-sky-700">(x, y)</text>
            <text x="40" y="27" className="text-[6px] font-bold fill-rose-700">(x, -y)</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'P(x; y) pont tükörképe az y-tengelyre',
        value: "P'(-x; y) — az y változatlan marad, az x előjelet vált",
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="5" x2="35" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="50" cy="17.5" r="2" fill="#0284c7" />
            <circle cx="20" cy="17.5" r="2" fill="#ef4444" />
            <text x="46" y="14" className="text-[6px] font-bold fill-sky-700">(x, y)</text>
            <text x="10" y="14" className="text-[6px] font-bold fill-rose-700">(-x, y)</text>
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: "'N', 'S', 'Z' betűk szimmetriája",
        value: 'Csak KÖZÉPPONTOSAN szimmetrikusak (0 szimmetriatengelyük van)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="18" y="24" className="text-[14px] font-black fill-teal-700">S</text>
            <text x="42" y="24" className="text-[14px] font-black fill-teal-700">Z</text>
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: "'H', 'I', 'O', 'X' betűk szimmetriája",
        value: '2 szimmetriatengelyük és 1 szimmetriaközéppontjuk is van',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="16" y="24" className="text-[14px] font-black fill-purple-700">H</text>
            <text x="42" y="24" className="text-[14px] font-black fill-purple-700">X</text>
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Szabályos sokszögek középpontos szimmetriája',
        value: 'Csak a PÁROS oldalszámú szabályos sokszögek rendelkeznek centrummal',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,7 48,13 48,25 35,31 22,25 22,13" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="35" cy="19" r="1.5" fill="#16a34a" />
            <text x="52" y="22" className="text-[7px] font-bold fill-emerald-700">2n oldal</text>
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Kör szimmetriája',
        value: 'Végtelen sok szimmetriatengely (átmérők) és 1 szimmetriaközéppont',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="12" fill="none" stroke="#a21caf" strokeWidth="1.5" />
            <line x1="20" y1="17.5" x2="50" y2="17.5" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="35" cy="17.5" r="1.5" fill="#a21caf" />
          </svg>
        )
      }
    ]
  }
};

export const SymmetryComparisonMatcher: React.FC<SymmetryComparisonMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId,
  topicTitle
}) => {
  return (
    <MatcherTemplate
      key={`matcher-symm-${level}`}
      topicId={topicId || 'g7-geom-symmetry-matcher'}
      topicTitle={topicTitle || 'Középpontos és tengelyes szimmetria'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🔗 PÁROSÍTÓ"
      title="Szimmetria Párosító Játék"
      subtitle="Keresd meg az összetartozó definíciókat, tulajdonságokat és síkidomokat!"
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      level={level}
      currentLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      themeColor="violet"
    />
  );
};

export default SymmetryComparisonMatcher;
