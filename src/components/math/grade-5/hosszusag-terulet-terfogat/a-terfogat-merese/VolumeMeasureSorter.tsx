import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

export interface VolumeMeasureSorterProps {
  level: number;
  onNextLevel: () => void;
  onOpenRules: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Folyadékok nagyságrendje a mindennapi életben
const CATEGORIES_LEVEL_1: SorterCategory[] = [
  { id: 'cat-small', name: 'Kisebb mint 1 liter (< 1 l)', color: 'blue' },
  { id: 'cat-medium', name: '1 és 5 liter között (1 - 5 l)', color: 'emerald' },
  { id: 'cat-large', name: '50 liternél jóval nagyobb (> 50 l)', color: 'purple' }
];

const ITEMS_LEVEL_1: SorterItem[] = [
  { id: 'item-1-1', text: 'Kávéskanál szirup (5 ml)', categoryId: 'cat-small' },
  { id: 'item-1-2', text: 'Egy vizespohár (2 dl)', categoryId: 'cat-small' },
  { id: 'item-1-3', text: 'Eszpresszó csésze (4 cl)', categoryId: 'cat-small' },
  { id: 'item-1-4', text: 'Fél doboz üdítő (1,5 dl)', categoryId: 'cat-small' },

  { id: 'item-1-5', text: 'Tejesdoboz (1 liter)', categoryId: 'cat-medium' },
  { id: 'item-1-6', text: 'Nagy ásványvizes palack (1,5 l)', categoryId: 'cat-medium' },
  { id: 'item-1-7', text: 'Autó szélvédőmosó kanna (4 l)', categoryId: 'cat-medium' },
  { id: 'item-1-8', text: 'Családi fazék leves (3 l)', categoryId: 'cat-medium' },

  { id: 'item-1-9', text: 'Teli fürdőkád (kb. 180 l)', categoryId: 'cat-large' },
  { id: 'item-1-10', text: 'Boroshordó (1,5 hl = 150 l)', categoryId: 'cat-large' },
  { id: 'item-1-11', text: 'Családi kerti medence (15 m³ = 15 000 l)', categoryId: 'cat-large' },
  { id: 'item-1-12', text: 'Benzinkút földalatti tartálya (20 000 l)', categoryId: 'cat-large' }
];

// 2. SZINT: Mértékegység típusok
const CATEGORIES_LEVEL_2: SorterCategory[] = [
  { id: 'cat-cubic', name: 'Köbmértékek (testek térfogata)', color: 'blue' },
  { id: 'cat-liquid-small', name: 'Liternél kisebb űrmérték (ml, cl, dl)', color: 'amber' },
  { id: 'cat-liquid-large', name: 'Liter és hektoliter (l, hl)', color: 'purple' }
];

const ITEMS_LEVEL_2: SorterItem[] = [
  { id: 'item-2-1', text: '15 cm³ fadobókocka', categoryId: 'cat-cubic' },
  { id: 'item-2-2', text: '2,5 dm³ építőtégla', categoryId: 'cat-cubic' },
  { id: 'item-2-3', text: '12 m³ sóderkupac', categoryId: 'cat-cubic' },
  { id: 'item-2-4', text: '800 mm³ műanyag gyöngyszem', categoryId: 'cat-cubic' },

  { id: 'item-2-5', text: '250 ml kakaó', categoryId: 'cat-liquid-small' },
  { id: 'item-2-6', text: '5 dl tejföl', categoryId: 'cat-liquid-small' },
  { id: 'item-2-7', text: '33 cl dobozos üdítő', categoryId: 'cat-liquid-small' },
  { id: 'item-2-8', text: '20 ml köhögéscsillapító szirup', categoryId: 'cat-liquid-small' },

  { id: 'item-2-9', text: '2 hl hegyközi bor', categoryId: 'cat-liquid-large' },
  { id: 'item-2-10', text: '5 liter narancslé', categoryId: 'cat-liquid-large' },
  { id: 'item-2-11', text: '10 hl esővízgyűjtő tartály', categoryId: 'cat-liquid-large' },
  { id: 'item-2-12', text: '1,5 liter ásványvíz', categoryId: 'cat-liquid-large' }
];

// 3. SZINT: Átváltási azonosságok / literre átszámított érték
const CATEGORIES_LEVEL_3: SorterCategory[] = [
  { id: 'cat-1l', name: 'Pontosan 1 liter (= 1 dm³ = 10 dl)', color: 'blue' },
  { id: 'cat-10l', name: 'Pontosan 10 liter (= 10 dm³ = 100 dl)', color: 'emerald' },
  { id: 'cat-1000l', name: 'Pontosan 1000 liter (= 1 m³ = 10 hl)', color: 'purple' }
];

const ITEMS_LEVEL_3: SorterItem[] = [
  { id: 'item-3-1', text: '1000 cm³ víz', categoryId: 'cat-1l' },
  { id: 'item-3-2', text: '10 dl tej', categoryId: 'cat-1l' },
  { id: 'item-3-3', text: '1 dm³ kocka belső ürege', categoryId: 'cat-1l' },
  { id: 'item-3-4', text: '1000 ml gyümölcslé', categoryId: 'cat-1l' },

  { id: 'item-3-5', text: '10 000 cm³ víz', categoryId: 'cat-10l' },
  { id: 'item-3-6', text: '100 dl tea', categoryId: 'cat-10l' },
  { id: 'item-3-7', text: '0,1 hl étolaj', categoryId: 'cat-10l' },
  { id: 'item-3-8', text: '10 dm³ térfogat', categoryId: 'cat-10l' },

  { id: 'item-3-9', text: '1 m³ esővíz', categoryId: 'cat-1000l' },
  { id: 'item-3-10', text: '10 hl must', categoryId: 'cat-1000l' },
  { id: 'item-3-11', text: '1 000 000 cm³ térfogat', categoryId: 'cat-1000l' },
  { id: 'item-3-12', text: '1000 dm³ tartály', categoryId: 'cat-1000l' }
];

export const VolumeMeasureSorter: React.FC<VolumeMeasureSorterProps> = ({
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
        return '1. Szint: Folyadékok nagyságrendje a mindennapi életben';
      case 2:
        return '2. Szint: Mértékegység típusok (köbmértékek, kis és nagy űrmértékek)';
      case 3:
        return '3. Szint: Átváltási azonosságok (1 liter, 10 liter, 1000 liter)';
      default:
        return '';
    }
  };

  return (
    <SorterTemplate
      title="Térfogat és űrmérték csoportosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 7. JÁTÉK"
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
