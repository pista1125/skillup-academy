import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface TriangleSidesAnglesSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// LEVEL 1: Háromszögek csoportosítása belső szögeik nagysága szerint
const level1Config: SorterLevelConfig = {
  categories: [
    {
      id: 'acute',
      name: 'Hegyesszögű háromszög',
      description: 'Mindhárom belső szög kisebb, mint 90° (< 90°)'
    },
    {
      id: 'right',
      name: 'Derékszögű háromszög',
      description: 'Pontosan egy belső szög derékszög (= 90°)'
    },
    {
      id: 'obtuse',
      name: 'Tompaszögű háromszög',
      description: 'Pontosan egy belső szög tompaszög (> 90°)'
    }
  ],
  items: [
    {
      id: 'i1-1',
      label: '50°, 60°, 70°',
      categoryId: 'acute',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="12,42 68,42 45,10" fill="none" className="stroke-teal-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-2',
      label: '30°, 60°, 90°',
      categoryId: 'right',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 15,10" fill="none" className="stroke-blue-600 stroke-2" />
          <path d="M 15,34 L 22,34 L 22,42" fill="none" className="stroke-slate-500 stroke-1" />
        </svg>
      )
    },
    {
      id: 'i1-3',
      label: '20°, 40°, 120°',
      categoryId: 'obtuse',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="8,42 72,42 32,24" fill="none" className="stroke-amber-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-4',
      label: '60°, 60°, 60°',
      categoryId: 'acute',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 40,10" fill="none" className="stroke-teal-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-5',
      label: '45°, 45°, 90°',
      categoryId: 'right',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 55,42 15,10" fill="none" className="stroke-blue-600 stroke-2" />
          <path d="M 15,34 L 22,34 L 22,42" fill="none" className="stroke-slate-500 stroke-1" />
        </svg>
      )
    },
    {
      id: 'i1-6',
      label: '15°, 25°, 140°',
      categoryId: 'obtuse',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="6,42 74,42 26,26" fill="none" className="stroke-amber-600 stroke-2" />
        </svg>
      )
    },
    { id: 'i1-7', label: '40°, 70°, 70°', categoryId: 'acute' },
    {
      id: 'i1-8',
      label: '10°, 80°, 90°',
      categoryId: 'right',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 15,10" fill="none" className="stroke-blue-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-9',
      label: '30°, 40°, 110°',
      categoryId: 'obtuse',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="8,42 72,42 30,22" fill="none" className="stroke-amber-600 stroke-2" />
        </svg>
      )
    },
    { id: 'i1-10', label: '55°, 55°, 70°', categoryId: 'acute' }
  ]
};

// LEVEL 2: Háromszög-egyenlőtlenség: Megszerkeszthető vagy Lehetetlen?
const level2Config: SorterLevelConfig = {
  categories: [
    {
      id: 'valid',
      name: 'Megszerkeszthető háromszög',
      description: 'Két rövidebb oldal összege szigorúan nagyobb a harmadiknál (a + b > c)'
    },
    {
      id: 'invalid',
      name: 'Nem szerkeszthető (lehetetlen)',
      description: 'A két rövidebb oldal összege kisebb vagy egyenlő (a + b ≤ c)'
    }
  ],
  items: [
    {
      id: 'i2-1',
      label: '5 cm, 6 cm, 7 cm',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 70,42 45,10" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i2-2',
      label: '2 cm, 3 cm, 6 cm (2+3 < 6)',
      categoryId: 'invalid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <line x1="8" y1="40" x2="72" y2="40" className="stroke-slate-700 stroke-2" />
          <line x1="8" y1="40" x2="28" y2="24" className="stroke-rose-600 stroke-2" />
          <line x1="72" y1="40" x2="48" y2="24" className="stroke-rose-600 stroke-2" />
          <line x1="28" y1="24" x2="48" y2="24" className="stroke-rose-400 stroke-dasharray-[2,2] stroke-1" />
        </svg>
      )
    },
    { id: 'i2-3', label: '7 cm, 24 cm, 25 cm', categoryId: 'valid' },
    {
      id: 'i2-4',
      label: '4 cm, 5 cm, 9 cm (4+5 = 9, egyenes)',
      categoryId: 'invalid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <line x1="8" y1="30" x2="72" y2="30" className="stroke-slate-700 stroke-2" />
          <circle cx="36" cy="30" r="2.5" className="fill-rose-600" />
        </svg>
      )
    },
    {
      id: 'i2-5',
      label: '8 cm, 8 cm, 8 cm (szabályos)',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 40,10" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    { id: 'i2-6', label: '1 cm, 2 cm, 5 cm (1+2 < 5)', categoryId: 'invalid' },
    {
      id: 'i2-7',
      label: '6 cm, 8 cm, 10 cm',
      categoryId: 'valid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 15,10" fill="none" className="stroke-emerald-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i2-8',
      label: '3 cm, 4 cm, 8 cm (3+4 < 8)',
      categoryId: 'invalid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <line x1="8" y1="40" x2="72" y2="40" className="stroke-slate-700 stroke-2" />
          <line x1="8" y1="40" x2="28" y2="24" className="stroke-rose-600 stroke-2" />
          <line x1="72" y1="40" x2="48" y2="24" className="stroke-rose-600 stroke-2" />
        </svg>
      )
    },
    { id: 'i2-9', label: '10 cm, 12 cm, 15 cm', categoryId: 'valid' },
    { id: 'i2-10', label: '10 cm, 20 cm, 35 cm (10+20 < 35)', categoryId: 'invalid' }
  ]
};

// LEVEL 3: Háromszögek csoportosítása oldalaik és szimmetriájuk szerint
const level3Config: SorterLevelConfig = {
  categories: [
    {
      id: 'scalene',
      name: 'Általános háromszög',
      description: 'Minden oldala és szöge különböző (a ≠ b ≠ c), 0 szimmetriatengely'
    },
    {
      id: 'isosceles',
      name: 'Egyenlő szárú háromszög',
      description: 'Két oldala és alapon fekvő szögei egyenlők (a = b), 1 szimmetriatengely'
    },
    {
      id: 'equilateral',
      name: 'Szabályos háromszög',
      description: 'Mindhárom oldala egyenlő (a = b = c), minden szög 60°, 3 szimmetriatengely'
    }
  ],
  items: [
    {
      id: 'i3-1',
      label: 'Oldalak: 5 cm, 7 cm, 9 cm',
      categoryId: 'scalene',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,42 70,42 50,12" fill="none" className="stroke-indigo-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i3-2',
      label: 'Belső szögek: 50°, 50°, 80°',
      categoryId: 'isosceles',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 40,10" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="40" y1="10" x2="40" y2="42" className="stroke-teal-400 stroke-dasharray-[2,2] stroke-1" />
        </svg>
      )
    },
    {
      id: 'i3-3',
      label: 'Mindhárom belső szöge pontosan 60°',
      categoryId: 'equilateral',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 40,10" fill="none" className="stroke-amber-600 stroke-2" />
        </svg>
      )
    },
    { id: 'i3-4', label: 'Belső szögek: 40°, 60°, 80°', categoryId: 'scalene' },
    {
      id: 'i3-5',
      label: 'Két szára 8 cm, alapja 5 cm',
      categoryId: 'isosceles',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="20,42 60,42 40,10" fill="none" className="stroke-teal-600 stroke-2" />
          <line x1="28" y1="24" x2="32" y2="28" className="stroke-teal-700 stroke-2" />
          <line x1="48" y1="28" x2="52" y2="24" className="stroke-teal-700 stroke-2" />
        </svg>
      )
    },
    { id: 'i3-6', label: 'Pontosan 3 szimmetriatengelye van', categoryId: 'equilateral' },
    {
      id: 'i3-7',
      label: 'Oldalak: 6 cm, 8 cm, 10 cm (derékszögű)',
      categoryId: 'scalene',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 15,10" fill="none" className="stroke-indigo-600 stroke-2" />
          <path d="M 15,34 L 22,34 L 22,42" fill="none" className="stroke-slate-500 stroke-1" />
        </svg>
      )
    },
    { id: 'i3-8', label: 'Pontosan 1 szimmetriatengellyel rendelkezik', categoryId: 'isosceles' },
    {
      id: 'i3-9',
      label: 'Mindhárom oldala 7 cm hosszú',
      categoryId: 'equilateral',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,42 65,42 40,10" fill="none" className="stroke-amber-600 stroke-2" />
          <line x1="38" y1="40" x2="42" y2="44" className="stroke-amber-700 stroke-2" />
          <line x1="26" y1="24" x2="30" y2="28" className="stroke-amber-700 stroke-2" />
          <line x1="50" y1="28" x2="54" y2="24" className="stroke-amber-700 stroke-2" />
        </svg>
      )
    },
    { id: 'i3-10', label: 'Alapon fekvő két belső szöge megegyezik', categoryId: 'isosceles' }
  ]
};

export const TriangleSidesAnglesSorter: React.FC<TriangleSidesAnglesSorterProps> = ({
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
      title="2. Háromszög Oldalai és Szögei Csoportosító"
      subtitle="Kategorizáld a háromszögeket szögeik, oldalaik és szerkeszthetőségük szerint!"
      badge="CSOPORTOSÍTÓ"
      topicTitle="Háromszög Oldalai és Szögei"
      themeColor="indigo"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-triangle-inequality-sorter"
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

export default TriangleSidesAnglesSorter;
