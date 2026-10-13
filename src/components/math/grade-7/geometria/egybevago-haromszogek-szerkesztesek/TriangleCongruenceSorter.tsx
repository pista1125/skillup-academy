import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface TriangleCongruenceSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// LEVEL 1: Valódi Egybevágósági Alapeset vs. NEM Egybevágósági Eset (Csapda)
const level1Config: SorterLevelConfig = {
  categories: [
    {
      id: 'valid',
      name: 'Valódi Egybevágósági Eset (4 Alapeset)',
      description: 'Garantálja, hogy a két háromszög egybevágó és egyértelműen megszerkeszthető'
    },
    {
      id: 'invalid',
      name: 'NEM Egybevágósági Eset (Csapda)',
      description: 'Kevés az adat, vagy nem garantálja az azonos méretet és alakot'
    }
  ],
  items: [
    {
      id: 'i1-1',
      label: 'o-o-o (SSS): 3 oldal páronként egyenlő',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 70,42 40,10" fill="none" className="stroke-teal-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-2',
      label: 'o-sz-o (SAS): 2 oldal és a közbezárt szög',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 70,42 35,12" fill="none" className="stroke-blue-600 stroke-2" />
          <path d="M 30,21 A 12,12 0 0,0 45,19" fill="none" className="stroke-amber-500 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-3',
      label: 'sz-o-sz (ASA): 1 oldal és a rajta fekvő 2 szög',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 70,42 45,12" fill="none" className="stroke-indigo-600 stroke-2" />
          <line x1="10" y1="42" x2="70" y2="42" className="stroke-indigo-600 stroke-[3]" />
        </svg>
      )
    },
    {
      id: 'i1-4',
      label: 'o-o-sz (SsA): 2 oldal és a nagyobbikkal szemközti szög',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 70,42 30,12" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-5',
      label: 'sz-sz-sz (AAA): Három szög egyenlő (Hasonlóság!)',
      categoryId: 'invalid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 35,42 22,20" fill="none" className="stroke-rose-600 stroke-[1.5]" />
          <polygon points="45,42 75,42 60,10" fill="none" className="stroke-rose-600 stroke-[1.5]" />
        </svg>
      )
    },
    {
      id: 'i1-6',
      label: 'o-o-sz a KISEBBIK oldallal szemközti szöggel',
      categoryId: 'invalid'
    },
    {
      id: 'i1-7',
      label: 'o-o: Csak két oldal hossza ismert',
      categoryId: 'invalid'
    },
    {
      id: 'i1-8',
      label: 'sz-sz: Csak két szög ismert',
      categoryId: 'invalid'
    },
    {
      id: 'i1-9',
      label: 'K = K\': Csak a kerületük egyenlő',
      categoryId: 'invalid'
    },
    {
      id: 'i1-10',
      label: 'T = T\': Csak a területük egyenlő',
      categoryId: 'invalid'
    }
  ]
};

// LEVEL 2: Melyik eset alapján egybevágóak?
const level2Config: SorterLevelConfig = {
  categories: [
    { id: 'sss', name: 'o-o-o (SSS)', description: 'Három oldal egyenlősége' },
    { id: 'sas', name: 'o-sz-o (SAS)', description: 'Két oldal és közbezárt szög' },
    { id: 'asa', name: 'sz-o-sz (ASA)', description: 'Egy oldal és 2 rajta fekvő szög' },
    { id: 'ssa', name: 'o-o-sz (SsA)', description: 'Két oldal és a nagyobbikkal szemközti szög' }
  ],
  items: [
    {
      id: 'i2-1',
      label: 'a = 5 cm, b = 6 cm, c = 7 cm',
      categoryId: 'sss',
      figure: (
        <svg viewBox="0 0 80 45" className="w-14 h-8">
          <polygon points="10,38 70,38 40,8" fill="none" className="stroke-teal-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i2-2',
      label: 'Szabályos háromszögek: a = 8 cm',
      categoryId: 'sss'
    },
    {
      id: 'i2-3',
      label: 'Egyenlő szárú Δ: alap=6, szár=9 cm',
      categoryId: 'sss'
    },
    {
      id: 'i2-4',
      label: 'a = 6, b = 8 és a közbezárt γ = 45°',
      categoryId: 'sas',
      figure: (
        <svg viewBox="0 0 80 45" className="w-14 h-8">
          <polygon points="10,38 70,38 35,10" fill="none" className="stroke-blue-600 stroke-2" />
          <circle cx="35" cy="10" r="3" className="fill-amber-500" />
        </svg>
      )
    },
    {
      id: 'i2-5',
      label: 'Derékszögű Δ két befogója: 3 cm és 4 cm',
      categoryId: 'sas'
    },
    {
      id: 'i2-6',
      label: 'c = 10 cm, alapon fekvő szögek: 30° és 60°',
      categoryId: 'asa',
      figure: (
        <svg viewBox="0 0 80 45" className="w-14 h-8">
          <polygon points="10,38 70,38 50,12" fill="none" className="stroke-indigo-600 stroke-2" />
          <path d="M 22,38 A 12,12 0 0,0 18,28" fill="none" className="stroke-amber-500 stroke-2" />
          <path d="M 58,38 A 12,12 0 0,1 62,28" fill="none" className="stroke-rose-500 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i2-7',
      label: 'a = 8 cm, rajta fekvő szögek: 50° és 70°',
      categoryId: 'asa'
    },
    {
      id: 'i2-8',
      label: 'a = 10 cm, b = 7 cm, α = 65° (szemközt 10 cm)',
      categoryId: 'ssa',
      figure: (
        <svg viewBox="0 0 80 45" className="w-14 h-8">
          <polygon points="10,38 70,38 30,10" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i2-9',
      label: 'Derékszögű Δ: átfogó=10 és befogó=6 cm',
      categoryId: 'ssa'
    },
    {
      id: 'i2-10',
      label: 'b = 12 cm, c = 9 cm, β = 75° (szemközt 12 cm)',
      categoryId: 'ssa'
    }
  ]
};

// LEVEL 3: Szerkesztés fázisai
const level3Config: SorterLevelConfig = {
  categories: [
    { id: 'prep', name: '1. Vázlat & 2. Terv', description: 'Szabadkézi rajz, színezés és a logikai lépések leírása' },
    { id: 'draw', name: '3. Pontos Kivitelezés', description: 'Pontos szerkesztés körzővel és vonalzóval' },
    { id: 'eval', name: '4. Diszkusszió & Elemzés', description: 'Feltételek és a megoldások számának vizsgálata' }
  ],
  items: [
    { id: 'i3-1', label: 'Szabadkézi rajz készítése', categoryId: 'prep' },
    { id: 'i3-2', label: 'Adott adatok színessel való jelölése', categoryId: 'prep' },
    { id: 'i3-3', label: 'Lépések szöveges sorrendjének felírása', categoryId: 'prep' },
    { id: 'i3-4', label: 'Alapszakasz felmérése vonalzóval', categoryId: 'draw' },
    { id: 'i3-5', label: 'Körívezés körzővel a megadott sugárral', categoryId: 'draw' },
    { id: 'i3-6', label: 'Szög másolása körzővel', categoryId: 'draw' },
    { id: 'i3-7', label: 'Szerkesztési segédvonalak megtartása', categoryId: 'draw' },
    { id: 'i3-8', label: 'Háromszög-egyenlőtlenség ellenőrzése (a+b>c)', categoryId: 'eval' },
    { id: 'i3-9', label: 'Szögösszeg ellenőrzése (α+β < 180°)', categoryId: 'eval' },
    { id: 'i3-10', label: 'Megoldások számának megállapítása a síkban', categoryId: 'eval' }
  ]
};

export const TriangleCongruenceSorter: React.FC<TriangleCongruenceSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const activeLvl = (currentLevel ?? level) as any;
  return (
    <SorterTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      title="1. Egybevágó Háromszögek Csoportosító"
      subtitle="Válogasd szét a geometriai tételeket, adatokat és szerkesztési fázisokat a helyes kategóriákba!"
      badge="CSOPORTOSÍTÓ"
      topicTitle="Egybevágó Háromszögek"
      themeColor="teal"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-triangle-congruence-sorter"
      levels={{
        1: level1Config,
        2: level2Config,
        3: level3Config
      }}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default TriangleCongruenceSorter;
