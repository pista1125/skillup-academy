import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

export interface CuboidCubeVolumeSorterProps {
  level: number;
  onNextLevel: () => void;
  onOpenRules: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Térfogat nagyságrendje (cm³-ben)
const CATEGORIES_LEVEL_1: SorterCategory[] = [
  { id: 'cat-small', name: 'Legfeljebb 30 cm³ (V ≤ 30 cm³)', color: 'blue' },
  { id: 'cat-medium', name: '31 és 100 cm³ között (31 - 100 cm³)', color: 'emerald' },
  { id: 'cat-large', name: '100 cm³-nél nagyobb (V > 100 cm³)', color: 'purple' }
];

const ITEMS_LEVEL_1: SorterItem[] = [
  { id: 'item-1-1', text: 'Kocka: a = 2 cm (8 cm³)', categoryId: 'cat-small' },
  { id: 'item-1-2', text: 'Kocka: a = 3 cm (27 cm³)', categoryId: 'cat-small' },
  { id: 'item-1-3', text: 'Téglatest: 2 × 2 × 5 cm (20 cm³)', categoryId: 'cat-small' },
  { id: 'item-1-4', text: 'Téglatest: 1 × 3 × 8 cm (24 cm³)', categoryId: 'cat-small' },

  { id: 'item-1-5', text: 'Kocka: a = 4 cm (64 cm³)', categoryId: 'cat-medium' },
  { id: 'item-1-6', text: 'Téglatest: 3 × 4 × 5 cm (60 cm³)', categoryId: 'cat-medium' },
  { id: 'item-1-7', text: 'Téglatest: 2 × 5 × 8 cm (80 cm³)', categoryId: 'cat-medium' },
  { id: 'item-1-8', text: 'Téglatest: 6 × 3 × 2 cm (36 cm³)', categoryId: 'cat-medium' },

  { id: 'item-1-9', text: 'Kocka: a = 5 cm (125 cm³)', categoryId: 'cat-large' },
  { id: 'item-1-10', text: 'Kocka: a = 6 cm (216 cm³)', categoryId: 'cat-large' },
  { id: 'item-1-11', text: 'Téglatest: 5 × 5 × 6 cm (150 cm³)', categoryId: 'cat-large' },
  { id: 'item-1-12', text: 'Téglatest: 10 × 4 × 5 cm (200 cm³)', categoryId: 'cat-large' }
];

// 2. SZINT: Képlet és számítás módja
const CATEGORIES_LEVEL_2: SorterCategory[] = [
  { id: 'cat-cube', name: 'Kocka térfogata (V = a³)', color: 'blue' },
  { id: 'cat-cuboid', name: 'Téglatest 3 éle (V = a · b · c)', color: 'amber' },
  { id: 'cat-base-height', name: 'Alapterület és magasság (V = T_alap · m)', color: 'purple' }
];

const ITEMS_LEVEL_2: SorterItem[] = [
  { id: 'item-2-1', text: 'Fa dobókocka (a = 2 cm → 8 cm³)', categoryId: 'cat-cube' },
  { id: 'item-2-2', text: 'Kockacukor (a = 1 cm → 1 cm³)', categoryId: 'cat-cube' },
  { id: 'item-2-3', text: 'Kocka díszdoboz (a = 5 dm → 125 dm³)', categoryId: 'cat-cube' },
  { id: 'item-2-4', text: 'Rubik-kocka (a = 6 cm → 216 cm³)', categoryId: 'cat-cube' },

  { id: 'item-2-5', text: 'Cipősdoboz (30 × 20 × 12 cm)', categoryId: 'cat-cuboid' },
  { id: 'item-2-6', text: 'Építési tégla (25 × 12 × 6,5 cm)', categoryId: 'cat-cuboid' },
  { id: 'item-2-7', text: 'Akvárium élei (50 × 30 × 40 cm)', categoryId: 'cat-cuboid' },
  { id: 'item-2-8', text: 'Vastag könyv (20 × 15 × 3 cm)', categoryId: 'cat-cuboid' },

  { id: 'item-2-9', text: 'T_alap = 24 cm², m = 5 cm (120 cm³)', categoryId: 'cat-base-height' },
  { id: 'item-2-10', text: 'T_alap = 50 dm², m = 4 dm (200 dm³)', categoryId: 'cat-base-height' },
  { id: 'item-2-11', text: 'Négyzetes oszlop: T_alap = 16 cm², m = 10 cm', categoryId: 'cat-base-height' },
  { id: 'item-2-12', text: 'Tanterem: T_alap = 60 m², m = 3 m (180 m³)', categoryId: 'cat-base-height' }
];

// 3. SZINT: Befogadóképesség / vízmennyiség literben
const CATEGORIES_LEVEL_3: SorterCategory[] = [
  { id: 'cat-under-10l', name: '10 liternél kevesebb (< 10 l)', color: 'blue' },
  { id: 'cat-10-to-100l', name: '10 és 100 liter között (10 - 100 l)', color: 'emerald' },
  { id: 'cat-over-100l', name: '100 liternél több (> 100 l)', color: 'purple' }
];

const ITEMS_LEVEL_3: SorterItem[] = [
  { id: 'item-3-1', text: 'Kocka: a = 2 dm (8 liter)', categoryId: 'cat-under-10l' },
  { id: 'item-3-2', text: 'Téglatest: 2 × 1 × 3 dm (6 liter)', categoryId: 'cat-under-10l' },
  { id: 'item-3-3', text: 'Kocka: a = 1 dm (1 liter)', categoryId: 'cat-under-10l' },
  { id: 'item-3-4', text: 'Téglatest: 5 × 2 × 0,5 dm (5 liter)', categoryId: 'cat-under-10l' },

  { id: 'item-3-5', text: 'Akvárium: 5 × 4 × 3 dm (60 liter)', categoryId: 'cat-10-to-100l' },
  { id: 'item-3-6', text: 'Kocka tartály: a = 4 dm (64 liter)', categoryId: 'cat-10-to-100l' },
  { id: 'item-3-7', text: 'Tartály: 5 × 5 × 2 dm (50 liter)', categoryId: 'cat-10-to-100l' },
  { id: 'item-3-8', text: 'Tartály: 10 × 4 × 2 dm (80 liter)', categoryId: 'cat-10-to-100l' },

  { id: 'item-3-9', text: 'Kocka: a = 5 dm (125 liter)', categoryId: 'cat-over-100l' },
  { id: 'item-3-10', text: 'Kerti medence: 2 × 3 × 1 m (6000 liter)', categoryId: 'cat-over-100l' },
  { id: 'item-3-11', text: 'Nagy tartály: 10 × 5 × 4 dm (200 liter)', categoryId: 'cat-over-100l' },
  { id: 'item-3-12', text: 'Esővízgyűjtő köbméteres tartály (1000 liter)', categoryId: 'cat-over-100l' }
];

export const CuboidCubeVolumeSorter: React.FC<CuboidCubeVolumeSorterProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory
}) => {
  const getCategories = (lvl: number): SorterCategory[] => {
    switch (lvl) {
      case 1:
        return CATEGORIES_LEVEL_1;
      case 2:
        return CATEGORIES_LEVEL_2;
      case 3:
        return CATEGORIES_LEVEL_3;
      default:
        return CATEGORIES_LEVEL_1;
    }
  };

  const getItems = (lvl: number): SorterItem[] => {
    switch (lvl) {
      case 1:
        return ITEMS_LEVEL_1;
      case 2:
        return ITEMS_LEVEL_2;
      case 3:
        return ITEMS_LEVEL_3;
      default:
        return ITEMS_LEVEL_1;
    }
  };

  const getSubtitle = (lvl: number): string => {
    switch (lvl) {
      case 1:
        return '1. Szint: Térfogat nagyságrendje cm³-ben (kis, közepes és nagy testek)';
      case 2:
        return '2. Szint: Képlet és számítás módja (kocka, téglatest, alapterület és magasság)';
      case 3:
        return '3. Szint: Befogadóképesség és vízmennyiség literben (< 10 l, 10 - 100 l, > 100 l)';
      default:
        return '';
    }
  };

  return (
    <SorterTemplate
      title="Téglatest és kocka térfogata csoportosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 8. JÁTÉK"
      level={level}
      categories={getCategories(level)}
      items={getItems(level)}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
