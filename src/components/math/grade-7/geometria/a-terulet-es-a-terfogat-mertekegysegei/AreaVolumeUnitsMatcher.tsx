import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface AreaVolumeUnitsMatcherProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Területmértékegységek alapátváltásai
const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: '1 dm² területe cm²-ben',
    value: '100 cm² (10 cm · 10 cm)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="20" y="8" width="40" height="34" fill="none" className="stroke-cyan-600 stroke-2" />
        <line x1="20" y1="25" x2="60" y2="25" className="stroke-cyan-300 stroke-[0.5]" />
        <line x1="40" y1="8" x2="40" y2="42" className="stroke-cyan-300 stroke-[0.5]" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-cyan-800">100 cm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: '1 ár (a) területe négyzetméterben',
    value: '100 m² (10 m × 10 m)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="22" y="10" width="36" height="30" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-emerald-800">10m × 10m</text>
        <text x="40" y="46" textAnchor="middle" className="text-[6px] font-black fill-emerald-600">1 a = 100 m²</text>
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: '1 hektár (ha) területe négyzetméterben',
    value: '10 000 m² (100 a = 100 m × 100 m)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="18" y="8" width="44" height="34" fill="none" className="stroke-teal-600 stroke-2" />
        <text x="40" y="27" textAnchor="middle" className="text-[7px] font-black fill-teal-800">10 000 m²</text>
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: '1 m² területe dm²-ben',
    value: '100 dm²',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="22" y="8" width="36" height="34" fill="none" className="stroke-cyan-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[8px] font-black fill-cyan-700">100 dm²</text>
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: '1 cm² területe mm²-ben',
    value: '100 mm² (10 mm · 10 mm)'
  },
  {
    id: 'l1-p6',
    prompt: '1 km² hány hektár?',
    value: '100 ha (1 000 000 m²)'
  },
  {
    id: 'l1-p7',
    prompt: '5 m² átváltva dm²-be',
    value: '500 dm² (5 · 100)'
  },
  {
    id: 'l1-p8',
    prompt: '300 dm² átváltva m²-be',
    value: '3 m² (300 : 100)'
  }
];

// 2. SZINT: Térfogat és az Űrmérték aranykapcsa
const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: '1 dm³ folyadéktérfogata (űrtartalma)',
    value: 'Pontosan 1 liter (1 l)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        {/* Milk carton / cube */}
        <path d="M 28,15 L 42,10 L 56,15 L 42,20 Z" fill="none" className="stroke-blue-600 stroke-[1.5]" />
        <path d="M 28,15 L 28,38 L 42,43 L 42,20 Z" fill="none" className="stroke-blue-600 stroke-[1.5]" />
        <path d="M 42,20 L 42,43 L 56,38 L 56,15 Z" fill="none" className="stroke-blue-600 stroke-[1.5]" />
        <text x="42" y="32" textAnchor="middle" className="text-[7px] font-black fill-blue-700">1 dm³ = 1 l</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: '1 cm³ űrmértékben kifejezve',
    value: '1 milliliter (1 ml)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="25" y="16" width="30" height="20" rx="3" fill="none" className="stroke-sky-600 stroke-[1.5]" />
        <text x="40" y="29" textAnchor="middle" className="text-[7px] font-black fill-sky-700">1 cm³ = 1 ml</text>
      </svg>
    )
  },
  {
    id: 'l2-p3',
    prompt: '1 m³ hány liter vízzel tölthető meg?',
    value: '1000 liter (10 hektoliter)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <path d="M 25,12 L 45,6 L 65,12 L 45,18 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
        <path d="M 25,12 L 25,38 L 45,44 L 45,18 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
        <path d="M 45,18 L 45,44 L 65,38 L 65,12 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
        <text x="45" y="33" textAnchor="middle" className="text-[7px] font-black fill-indigo-700">1000 l = 10 hl</text>
      </svg>
    )
  },
  {
    id: 'l2-p4',
    prompt: '1 dm³ térfogata cm³-ben',
    value: '1000 cm³ (10 · 10 · 10)'
  },
  {
    id: 'l2-p5',
    prompt: '1 m³ térfogata dm³-ben',
    value: '1000 dm³'
  },
  {
    id: 'l2-p6',
    prompt: '1 hektoliter (hl) hány liter?',
    value: '100 liter'
  },
  {
    id: 'l2-p7',
    prompt: '1 liter hány deciliter (dl)?',
    value: '10 dl (= 100 cl = 1000 ml)'
  },
  {
    id: 'l2-p8',
    prompt: '5000 cm³ hány liter?',
    value: '5 liter (5000 cm³ = 5 dm³ = 5 l)'
  }
];

// 3. SZINT: Vegyes, összetett átváltások és gyakorlati feladatok
const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: '0,5 hektár szántóföld m²-ben',
    value: '5000 m² (0,5 · 10 000)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="18" y="10" width="44" height="30" fill="none" className="stroke-emerald-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-emerald-800">5000 m²</text>
      </svg>
    )
  },
  {
    id: 'l3-p2',
    prompt: '25 ár építési telek m²-ben',
    value: '2500 m² (25 · 100)'
  },
  {
    id: 'l3-p3',
    prompt: '3,5 m³ tartály űrtartalma literben',
    value: '3500 liter (3,5 · 1000)',
    figure: (
      <svg viewBox="0 0 80 50" className="w-16 h-9">
        <rect x="25" y="10" width="30" height="30" rx="4" fill="none" className="stroke-blue-600 stroke-2" />
        <text x="40" y="28" textAnchor="middle" className="text-[7px] font-black fill-blue-700">3500 l</text>
      </svg>
    )
  },
  {
    id: 'l3-p4',
    prompt: '250 ml üdítő cm³-ben',
    value: '250 cm³ (mert 1 ml = 1 cm³)'
  },
  {
    id: 'l3-p5',
    prompt: '2 hektoliter (hl) víz dm³-ben',
    value: '200 dm³ (200 liter = 200 dm³)'
  },
  {
    id: 'l3-p6',
    prompt: '400 dm² felület m²-ben',
    value: '4 m² (400 : 100)'
  },
  {
    id: 'l3-p7',
    prompt: '0,02 m² papírlap cm²-ben',
    value: '200 cm² (0,02 · 10 000 = 200)'
  },
  {
    id: 'l3-p8',
    prompt: '8000 dm³ térfogat köbméterben',
    value: '8 m³ (8000 : 1000)'
  }
];

export const AreaVolumeUnitsMatcher: React.FC<AreaVolumeUnitsMatcherProps> = ({
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
      title="4. Terület és Térfogat Mértékegységek Párosító"
      subtitle="Találd meg a terület-, térfogat- és űrmérték-egységek egyenértékű párjait!"
      badge="PÁROSÍTÓ JÁTÉK"
      topicTitle="Mértékegységek Átváltása"
      themeColor="cyan"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-units-matcher"
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

export default AreaVolumeUnitsMatcher;
