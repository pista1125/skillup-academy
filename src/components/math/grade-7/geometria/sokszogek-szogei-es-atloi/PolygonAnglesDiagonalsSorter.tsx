import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface PolygonAnglesDiagonalsSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Sokszögek csoportosítása oldalszám és szögösszeg szerint
const level1Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a kijelentéseket és alakzatokat az oldalszámuk és szögösszegük szerint!',
  categories: [
    { id: 'tri-quad', name: 'Háromszög & Négyszög (n = 3, 4)', color: 'blue' },
    { id: 'penta', name: 'Ötszög (n = 5)', color: 'purple' },
    { id: 'hexa-plus', name: 'Hatszög és több oldalú (n ≥ 6)', color: 'indigo' }
  ],
  items: [
    {
      id: 'i1-1',
      label: 'Belső szögek összege: 180°',
      categoryId: 'tri-quad',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 40,12" fill="none" className="stroke-blue-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-2',
      label: 'Belső szögek összege: 360°',
      categoryId: 'tri-quad',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 55,14 25,14" fill="none" className="stroke-blue-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-3',
      label: 'Belső szögek összege: 540°',
      categoryId: 'penta',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 68,24 58,44 22,44 12,24" fill="none" className="stroke-purple-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-4',
      label: 'Belső szögek összege: 720°',
      categoryId: 'hexa-plus',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-indigo-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-5',
      label: 'Összesen 2 átlója van',
      categoryId: 'tri-quad',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 60,12 20,12" fill="none" className="stroke-blue-600 stroke-2" />
          <line x1="15" y1="40" x2="60" y2="12" className="stroke-blue-400 stroke-1 stroke-dashed" />
          <line x1="65" y1="40" x2="20" y2="12" className="stroke-blue-400 stroke-1 stroke-dashed" />
        </svg>
      )
    },
    {
      id: 'i1-6',
      label: 'Összesen 5 átlója van (pentagramma)',
      categoryId: 'penta',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 70,26 58,45 22,45 10,26" fill="none" className="stroke-purple-600 stroke-2" />
          <line x1="40" y1="6" x2="58" y2="45" className="stroke-rose-400 stroke-1" />
          <line x1="40" y1="6" x2="22" y2="45" className="stroke-rose-400 stroke-1" />
        </svg>
      )
    },
    {
      id: 'i1-7',
      label: 'Összesen 9 átlója van',
      categoryId: 'hexa-plus',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-indigo-600 stroke-2" />
          <line x1="25" y1="8" x2="55" y2="42" className="stroke-indigo-400 stroke-1" />
          <line x1="55" y1="8" x2="25" y2="42" className="stroke-indigo-400 stroke-1" />
        </svg>
      )
    },
    { id: 'i1-8', label: 'Egy csúcsból 0 átló húzható (d₁ = 0)', categoryId: 'tri-quad' },
    { id: 'i1-9', label: 'Egy csúcsból 2 átló húzható (d₁ = 2)', categoryId: 'penta' },
    { id: 'i1-10', label: 'Belső szögek összege: 1080° (nyolcszög)', categoryId: 'hexa-plus' }
  ]
};

// 2. SZINT: Összes átlók száma szerint
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a sokszögeket és képleteket az összes átlóik száma alapján!',
  categories: [
    { id: 'few', name: 'Kevés átló (0 – 5 átló)', color: 'teal' },
    { id: 'medium', name: 'Közepes átlószám (6 – 15 átló)', color: 'purple' },
    { id: 'many', name: 'Sok átló (16+ átló)', color: 'rose' }
  ],
  items: [
    {
      id: 'i2-1',
      label: 'Háromszög (dn = 0)',
      categoryId: 'few',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 40,12" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="32" textAnchor="middle" className="text-[9px] font-bold fill-teal-700">0</text>
        </svg>
      )
    },
    {
      id: 'i2-2',
      label: 'Konvex négyszög (dn = 2)',
      categoryId: 'few',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 60,12 20,12" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="32" textAnchor="middle" className="text-[9px] font-bold fill-teal-700">2</text>
        </svg>
      )
    },
    {
      id: 'i2-3',
      label: 'Konvex ötszög (dn = 5)',
      categoryId: 'few',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,6 70,26 58,45 22,45 10,26" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="32" textAnchor="middle" className="text-[9px] font-bold fill-teal-700">5</text>
        </svg>
      )
    },
    {
      id: 'i2-4',
      label: 'Konvex hatszög (dn = 9)',
      categoryId: 'medium',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-purple-600 stroke-2" />
          <text x="40" y="30" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">9</text>
        </svg>
      )
    },
    { id: 'i2-5', label: 'Konvex hétszög (dn = 7 · 4 / 2 = 14)', categoryId: 'medium' },
    { id: 'i2-6', label: 'Konvex nyolcszög (dn = 8 · 5 / 2 = 20)', categoryId: 'many' },
    { id: 'i2-7', label: 'Konvex kilencszög (dn = 9 · 6 / 2 = 27)', categoryId: 'many' },
    { id: 'i2-8', label: 'Konvex tízszög (dn = 10 · 7 / 2 = 35)', categoryId: 'many' },
    { id: 'i2-9', label: 'Egy csúcsból 1 átló indul (négyszög)', categoryId: 'few' }
  ]
};

// 3. SZINT: Szabályos sokszög egy belső szöge
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a szabályos sokszögeket egy belső szögük nagysága szerint!',
  categories: [
    { id: 'small-angle', name: 'Derékszög vagy kisebb (≤ 90°)', color: 'blue' },
    { id: 'mid-angle', name: 'Tompaszög 91° – 125°', color: 'purple' },
    { id: 'large-angle', name: 'Nagy tompaszög (> 125°)', color: 'rose' }
  ],
  items: [
    {
      id: 'i3-1',
      label: 'Szabályos háromszög (α = 60°)',
      categoryId: 'small-angle',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 40,12" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="32" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">60°</text>
        </svg>
      )
    },
    {
      id: 'i3-2',
      label: 'Négyzet (α = 90°)',
      categoryId: 'small-angle',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="25" y="10" width="30" height="30" fill="none" className="stroke-blue-600 stroke-2" />
          <path d="M 25,33 L 32,33 L 32,40" fill="none" className="stroke-slate-500 stroke-1" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">90°</text>
        </svg>
      )
    },
    {
      id: 'i3-3',
      label: 'Szabályos ötszög (α = 108°)',
      categoryId: 'mid-angle',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 68,24 58,44 22,44 12,24" fill="none" className="stroke-purple-600 stroke-2" />
          <text x="40" y="32" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">108°</text>
        </svg>
      )
    },
    {
      id: 'i3-4',
      label: 'Szabályos hatszög (α = 120°)',
      categoryId: 'mid-angle',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="25,8 55,8 70,25 55,42 25,42 10,25" fill="none" className="stroke-purple-600 stroke-2" />
          <text x="40" y="29" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">120°</text>
        </svg>
      )
    },
    {
      id: 'i3-5',
      label: 'Szabályos nyolcszög (α = 135°)',
      categoryId: 'large-angle',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="28,6 52,6 68,22 68,34 52,46 28,46 12,34 12,22" fill="none" className="stroke-rose-600 stroke-2" />
          <text x="40" y="30" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">135°</text>
        </svg>
      )
    },
    { id: 'i3-6', label: 'Szabályos kilencszög (α = 140°)', categoryId: 'large-angle' },
    { id: 'i3-7', label: 'Szabályos tízszög (α = 144°)', categoryId: 'large-angle' },
    { id: 'i3-8', label: 'Szabályos tizenkétszög (α = 150°)', categoryId: 'large-angle' },
    { id: 'i3-9', label: 'Külső szöge 72° (α = 108°)', categoryId: 'mid-angle' },
    { id: 'i3-10', label: 'Külső szöge 120° (α = 60°)', categoryId: 'small-angle' }
  ]
};

export const PolygonAnglesDiagonalsSorter: React.FC<PolygonAnglesDiagonalsSorterProps> = ({
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
      title="3. Sokszögek Szögei és Átlói Csoportosító"
      subtitle="Kategorizáld a sokszögeket oldalaik, átlóik és szögeik szerint!"
      badge="CSOPORTOSÍTÓ"
      topicTitle="Sokszögek Szögei és Átlói"
      themeColor="purple"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-polygons-sorter"
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

export default PolygonAnglesDiagonalsSorter;
