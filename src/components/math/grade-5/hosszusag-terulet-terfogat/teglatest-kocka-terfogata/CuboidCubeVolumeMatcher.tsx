import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

export interface CuboidCubeVolumeMatcherProps {
  level: number;
  onNextLevel: () => void;
  onOpenRules: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const VOLUME_PAIRS_LEVEL_1: MatcherPair[] = [
  { id: 'ccv-l1-1', left: 'Kocka (a = 2 cm)', right: 'V = 8 cm³ (2 · 2 · 2)' },
  { id: 'ccv-l1-2', left: 'Kocka (a = 3 cm)', right: 'V = 27 cm³ (3 · 3 · 3)' },
  { id: 'ccv-l1-3', left: 'Kocka (a = 4 cm)', right: 'V = 64 cm³ (4 · 4 · 4)' },
  { id: 'ccv-l1-4', left: 'Kocka (a = 5 cm)', right: 'V = 125 cm³ (5 · 5 · 5)' },
  { id: 'ccv-l1-5', left: 'Téglatest (2 × 3 × 4 cm)', right: 'V = 24 cm³' },
  { id: 'ccv-l1-6', left: 'Téglatest (5 × 2 × 3 cm)', right: 'V = 30 cm³' },
  { id: 'ccv-l1-7', left: 'Téglatest (10 × 4 × 2 cm)', right: 'V = 80 cm³' },
  { id: 'ccv-l1-8', left: 'Kocka (a = 1 dm = 10 cm)', right: 'V = 1 dm³ = 1 liter' }
];

const VOLUME_PAIRS_LEVEL_2: MatcherPair[] = [
  { id: 'ccv-l2-1', left: 'V = 60 cm³, a = 3, b = 4', right: 'Magasság c = 5 cm (60 : 12)' },
  { id: 'ccv-l2-2', left: 'V = 100 cm³, T_alap = 20 cm²', right: 'Magasság m = 5 cm (100 : 20)' },
  { id: 'ccv-l2-3', left: 'Kocka térfogata V = 216 cm³', right: 'Éle a = 6 cm (6 · 6 · 6)' },
  { id: 'ccv-l2-4', left: 'Kocka térfogata V = 343 dm³', right: 'Éle a = 7 dm (7 · 7 · 7)' },
  { id: 'ccv-l2-5', left: 'a = 4 dm, b = 5 dm, c = 20 cm', right: 'V = 40 dm³ = 40 liter' },
  { id: 'ccv-l2-6', left: 'Négyzetes oszlop: a = 3, m = 10', right: 'V = 90 cm³ (3 · 3 · 10)' },
  { id: 'ccv-l2-7', left: 'V = 120 dm³, T_alap = 30 dm²', right: 'Magasság m = 4 dm' },
  { id: 'ccv-l2-8', left: 'Kocka éleit megduplázzuk', right: 'Térfogata 8-szorosára nő (2³)' }
];

const VOLUME_PAIRS_LEVEL_3: MatcherPair[] = [
  { id: 'ccv-l3-1', left: 'Akvárium (60 × 40 × 50 cm)', right: '120 liter (6 × 4 × 5 dm)' },
  { id: 'ccv-l3-2', left: 'Medence (5 × 4 × 1,5 m)', right: '30 m³ = 300 hl = 30 000 l' },
  { id: 'ccv-l3-3', left: '2 db 3 cm-es kocka összeillesztve', right: 'V = 54 cm³ (2 · 27)' },
  { id: 'ccv-l3-4', left: '3 db 2 cm-es kocka összeillesztve', right: 'V = 24 cm³ (3 · 8)' },
  { id: 'ccv-l3-5', left: 'Félig teli 200 literes hordó', right: '100 dm³ víz van benne' },
  { id: 'ccv-l3-6', left: 'Kocka éleit megháromszorozzuk', right: 'Térfogata 27-szeresére nő (3³)' },
  { id: 'ccv-l3-7', left: '4 cm-es kockából 1 cm-es sarok kivágva', right: 'V = 63 cm³ (64 - 1)' },
  { id: 'ccv-l3-8', left: 'Homokozó (2 m × 2 m × 0,25 m)', right: '1 m³ = 1000 dm³ homok' }
];

export const CuboidCubeVolumeMatcher: React.FC<CuboidCubeVolumeMatcherProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory
}) => {
  const getPairs = (lvl: number): MatcherPair[] => {
    switch (lvl) {
      case 1:
        return VOLUME_PAIRS_LEVEL_1;
      case 2:
        return VOLUME_PAIRS_LEVEL_2;
      case 3:
        return VOLUME_PAIRS_LEVEL_3;
      default:
        return VOLUME_PAIRS_LEVEL_1;
    }
  };

  const getSubtitle = (lvl: number): string => {
    switch (lvl) {
      case 1:
        return '1. Szint: Kockák és téglatestek közvetlen térfogatszámítása (V = a · b · c, V = a³)';
      case 2:
        return '2. Szint: Hiányzó élek visszaszámolása, alapterület és magasság szorzata';
      case 3:
        return '3. Szint: Akváriumok, medencék, összetett testek és élek többszörözése';
      default:
        return '';
    }
  };

  return (
    <MatcherTemplate
      title="Téglatest és kocka térfogata párosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 8. JÁTÉK"
      level={level}
      pairs={getPairs(level)}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
