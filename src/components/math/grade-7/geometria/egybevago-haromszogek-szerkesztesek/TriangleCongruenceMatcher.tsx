import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { Shapes, Compass, Target, Ruler } from 'lucide-react';

interface TriangleCongruenceMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const level1Pairs = [
  {
    id: 'l1-p1',
    prompt: 'o-o-o (SSS)',
    value: 'Három oldal páronként egyenlő (a=a\', b=b\', c=c\')',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="10,50 90,50 50,12" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="50" y1="47" x2="50" y2="53" className="stroke-teal-700 stroke-2" />
        <line x1="28" y1="28" x2="33" y2="33" className="stroke-teal-700 stroke-2" />
        <line x1="67" y1="33" x2="72" y2="28" className="stroke-teal-700 stroke-2" />
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'o-sz-o (SAS)',
    value: 'Két oldal és a KÖZBEZÁRT szögük páronként egyenlő',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="10,50 90,50 40,15" fill="none" className="stroke-blue-600 stroke-2" />
        <line x1="10" y1="50" x2="40" y2="15" className="stroke-blue-600 stroke-[3]" />
        <line x1="40" y1="15" x2="90" y2="50" className="stroke-blue-600 stroke-[3]" />
        <path d="M 33,26 A 14,14 0 0,0 52,23" fill="none" className="stroke-amber-500 stroke-2" />
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'sz-o-sz (ASA)',
    value: 'Egy oldal és a rajta fekvő KÉT szög páronként egyenlő',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="15,50 85,50 50,15" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="15" y1="50" x2="85" y2="50" className="stroke-indigo-600 stroke-[3.5]" />
        <path d="M 28,50 A 13,13 0 0,0 22,39" fill="none" className="stroke-amber-500 stroke-2" />
        <path d="M 72,50 A 13,13 0 0,1 78,39" fill="none" className="stroke-rose-500 stroke-2" />
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'o-o-sz (SsA)',
    value: 'Két oldal és a NAGYOBBIK oldallal szemközti szög egyenlő',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="10,50 90,50 35,15" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="10" y1="50" x2="35" y2="15" className="stroke-emerald-600 stroke-[2]" />
        <line x1="35" y1="15" x2="90" y2="50" className="stroke-emerald-600 stroke-[3.5]" />
        <path d="M 25,50 A 15,15 0 0,0 19,37" fill="none" className="stroke-amber-500 stroke-2" />
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Egybevágóság jele: ≅',
    value: 'Alak és méret azonos: pontról pontra átfedik egymást'
  },
  {
    id: 'l1-p6',
    prompt: 'sz-sz-sz (AAA)',
    value: 'NEM egybevágósági alapeset! (Csak hasonlóság)'
  },
  {
    id: 'l1-p7',
    prompt: 'Megfelelő oldalak',
    value: 'a = a\',  b = b\',  c = c\''
  },
  {
    id: 'l1-p8',
    prompt: 'Megfelelő szögek',
    value: 'α = α\',  β = β\',  γ = γ\''
  }
];

const level2Pairs = [
  {
    id: 'l2-p1',
    prompt: 'a=5 cm, b=6 cm, c=7 cm',
    value: 'Egybevágó: o-o-o (SSS) alapján',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="15,48 85,48 45,15" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="50" y="58" textAnchor="middle" className="text-[7px] font-bold fill-teal-800">7 cm</text>
        <text x="20" y="30" className="text-[7px] font-bold fill-teal-800">6 cm</text>
        <text x="70" y="30" className="text-[7px] font-bold fill-teal-800">5 cm</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'a=8 cm, b=10 cm, γ=50°',
    value: 'Egybevágó: o-sz-o (SAS) (közbezárt szög!)',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="15,50 85,50 45,15" fill="none" className="stroke-blue-600 stroke-2" />
        <path d="M 38,23 A 12,12 0 0,0 53,24" fill="none" className="stroke-amber-500 stroke-2" />
        <text x="45" y="35" textAnchor="middle" className="text-[7px] font-bold fill-amber-600">50°</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: 'c=6 cm, α=40°, β=75°',
    value: 'Egybevágó: sz-o-sz (ASA) (egy oldal + 2 rajta fekvő szög)',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="15,50 85,50 60,15" fill="none" className="stroke-indigo-600 stroke-2" />
        <path d="M 28,50 A 13,13 0 0,0 22,39" fill="none" className="stroke-amber-500 stroke-2" />
        <path d="M 72,50 A 13,13 0 0,1 78,39" fill="none" className="stroke-rose-500 stroke-2" />
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: 'a=9 cm, b=6 cm, α=65°',
    value: 'Egybevágó: o-o-sz (SsA) (szög a nagyobbikkal szemben)',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <polygon points="10,50 90,50 35,15" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="65" y="30" className="text-[7px] font-bold fill-emerald-800">a=9 (nagy)</text>
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: 'α=50°, β=60°, γ=70°',
    value: 'NEM feltétlenül egybevágó! (Csak AAA hasonlóság)'
  },
  {
    id: 'l2-p6',
    prompt: 'a=3 cm, b=4 cm, c=8 cm',
    value: 'Nem szerkeszthető! (3+4 < 8 sérül az egyenlőtlenség)'
  },
  {
    id: 'l2-p7',
    prompt: 'Derékszögű Δ: átfogó és egy befogó egyenlő',
    value: 'Egybevágó: o-o-sz (átfogó a legnagyobb oldal)'
  },
  {
    id: 'l2-p8',
    prompt: 'Egyenlő szárú Δ: alap és szár egyenlő',
    value: 'Egybevágó: o-o-o (mindhárom oldal ismert)'
  }
];

const level3Pairs = [
  {
    id: 'l3-p1',
    prompt: '1. Vázlatkészítés',
    value: 'Szabadkézi rajz, adott adatok színessel való jelölése'
  },
  {
    id: 'l3-p2',
    prompt: '2. Szerkesztési terv',
    value: 'A lépések logikai, szöveges sorrendjének felállítása'
  },
  {
    id: 'l3-p3',
    prompt: '4. Diszkusszió (Elemzés)',
    value: 'Megoldások számának és feltételeinek vizsgálata'
  },
  {
    id: 'l3-p4',
    prompt: 'Szakaszfelező merőleges',
    value: 'Körívek a szakasz két végpontjából azonos sugárral',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <line x1="20" y1="30" x2="80" y2="30" className="stroke-teal-600 stroke-2" />
        <line x1="50" y1="8" x2="50" y2="52" className="stroke-indigo-600 stroke-[1.5] stroke-dasharray-[2,2]" />
        <circle cx="50" cy="30" r="2" className="fill-teal-700" />
      </svg>
    )
  },
  {
    id: 'l3-p5',
    prompt: 'Szögfelező szerkesztése',
    value: 'Körív a csúcsból, majd a szárak metszéspontjaiból azonos sugarú körívek',
    promptFigure: (
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        <line x1="15" y1="45" x2="85" y2="45" className="stroke-slate-500 stroke-2" />
        <line x1="15" y1="45" x2="65" y2="10" className="stroke-slate-500 stroke-2" />
        <line x1="15" y1="45" x2="80" y2="25" className="stroke-rose-600 stroke-2" />
      </svg>
    )
  },
  {
    id: 'l3-p6',
    prompt: 'o-o-sz szerkesztési csapda',
    value: 'Kisebb oldallal szemközti szög esetén 2 megoldás is lehet'
  },
  {
    id: 'l3-p7',
    prompt: 'Belső szögek összege',
    value: 'Mindig pontosan 180° (α + β + γ = 180°)'
  },
  {
    id: 'l3-p8',
    prompt: 'Háromszög-egyenlőtlenség',
    value: 'Bármely két oldal összege nagyobb a harmadiknál (a+b>c)'
  }
];

export const TriangleCongruenceMatcher: React.FC<TriangleCongruenceMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory
}) => {
  const activeLvl = (currentLevel ?? level) as any;
  return (
    <MatcherTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      title="1. Egybevágó Háromszögek Párosító"
      subtitle="Keresd meg a geometriai tételek, jelölések, ábrák és szerkesztési lépések összetartozó párjait!"
      badge="PÁROSÍTÓ JÁTÉK"
      topicTitle="Egybevágó Háromszögek"
      themeColor="teal"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-triangle-congruence-matcher"
      level1Pairs={level1Pairs}
      level2Pairs={level2Pairs}
      level3Pairs={level3Pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default TriangleCongruenceMatcher;
