import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

export interface VolumeMeasureMatcherProps {
  level: number;
  onNextLevel: () => void;
  onOpenRules: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const VOLUME_MEASURE_PAIRS_LEVEL_1: MatcherPair[] = [
  { id: 'vm-l1-1', left: '1 dm³', right: '1 liter (fő aranyszabály)' },
  { id: 'vm-l1-2', left: '1 cm³', right: '1 ml (kis aranyszabály)' },
  { id: 'vm-l1-3', left: '1 m³', right: '1000 dm³' },
  { id: 'vm-l1-4', left: '1 liter', right: '10 dl' },
  { id: 'vm-l1-5', left: '1 dl', right: '10 cl' },
  { id: 'vm-l1-6', left: '1 cl', right: '10 ml' },
  { id: 'vm-l1-7', left: '1 hl (hektoliter)', right: '100 liter' },
  { id: 'vm-l1-8', left: '1 dm³', right: '1000 cm³' }
];

const VOLUME_MEASURE_PAIRS_LEVEL_2: MatcherPair[] = [
  { id: 'vm-l2-1', left: '2,5 liter', right: '25 dl' },
  { id: 'vm-l2-2', left: '500 ml', right: '5 dl (= 0,5 liter)' },
  { id: 'vm-l2-3', left: '2000 cm³', right: '2 dm³ (= 2 liter)' },
  { id: 'vm-l2-4', left: '3 m³', right: '3000 liter' },
  { id: 'vm-l2-5', left: '4 hl', right: '400 liter' },
  { id: 'vm-l2-6', left: '0,5 liter', right: '500 cm³' },
  { id: 'vm-l2-7', left: '75 cl', right: '750 ml' },
  { id: 'vm-l2-8', left: '1500 dm³', right: '1,5 m³' }
];

const VOLUME_MEASURE_PAIRS_LEVEL_3: MatcherPair[] = [
  { id: 'vm-l3-1', left: '2 m³ víz', right: '20 hl (= 2000 l)' },
  { id: 'vm-l3-2', left: '12 liter', right: '12 000 cm³' },
  { id: 'vm-l3-3', left: '0,05 m³', right: '50 dm³ (= 50 l)' },
  { id: 'vm-l3-4', left: '250 ml üdítő', right: '25 cl (= 2,5 dl)' },
  { id: 'vm-l3-5', left: '4 × 3 × 2 egységkocka', right: '24 térfogategység' },
  { id: 'vm-l3-6', left: '5 dl víz', right: '0,5 dm³' },
  { id: 'vm-l3-7', left: '350 cl', right: '3,5 liter' },
  { id: 'vm-l3-8', left: '8000 liter tartály', right: '8 m³' }
];

export const VolumeMeasureMatcher: React.FC<VolumeMeasureMatcherProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory
}) => {
  const getPairs = (lvl: number): MatcherPair[] => {
    switch (lvl) {
      case 1:
        return VOLUME_MEASURE_PAIRS_LEVEL_1;
      case 2:
        return VOLUME_MEASURE_PAIRS_LEVEL_2;
      case 3:
        return VOLUME_MEASURE_PAIRS_LEVEL_3;
      default:
        return VOLUME_MEASURE_PAIRS_LEVEL_1;
    }
  };

  const getSubtitle = (lvl: number): string => {
    switch (lvl) {
      case 1:
        return '1. Szint: Alapvető köbmérték és űrmérték váltószámok és aranyszabályok';
      case 2:
        return '2. Szint: Összetettebb átváltások és mindennapi folyadékmennyiségek';
      case 3:
        return '3. Szint: Vegyes köbmértékek, nagyobb mennyiségek és egységkockák';
      default:
        return '';
    }
  };

  return (
    <MatcherTemplate
      title="Térfogat és űrmérték párosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 7. JÁTÉK"
      level={level}
      pairs={getPairs(level)}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
