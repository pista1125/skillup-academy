import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

export interface MeasurementSummarySorterProps {
  level?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Dimenziók és alapvető mennyiségek (1D, 2D, 3D)
const CATEGORIES_LEVEL_1: SorterCategory[] = [
  { id: 'cat-1d', name: '1D – Hosszúság és Kerület (m, cm, km)', color: 'blue' },
  { id: 'cat-2d', name: '2D – Terület és Felszín (m², cm², ha)', color: 'emerald' },
  { id: 'cat-3d', name: '3D – Térfogat és Űrmérték (m³, dm³, liter)', color: 'purple' }
];

const ITEMS_LEVEL_1: SorterItem[] = [
  { id: 'item-1-1', text: 'Szoba körbeszegőlécezése a padló mentén', categoryId: 'cat-1d' },
  { id: 'item-1-2', text: 'Kert körbekerítése drótfonattal', categoryId: 'cat-1d' },
  { id: 'item-1-3', text: 'Futópálya teljes hossza méterben', categoryId: 'cat-1d' },
  { id: 'item-1-4', text: 'Kocka 12 élének összhossza', categoryId: 'cat-1d' },

  { id: 'item-1-5', text: 'Nappali padló burkolása laminált parkettával', categoryId: 'cat-2d' },
  { id: 'item-1-6', text: 'Kocka ajándékdoboz díszcsomagolása', categoryId: 'cat-2d' },
  { id: 'item-1-7', text: 'Búzamező területe hektárban', categoryId: 'cat-2d' },
  { id: 'item-1-8', text: 'Téglatest 6 lapjának külső befestése', categoryId: 'cat-2d' },

  { id: 'item-1-9', text: 'Kerti úszómedence feltöltése vízzel', categoryId: 'cat-3d' },
  { id: 'item-1-10', text: 'Akvárium vízkapacitása literben', categoryId: 'cat-3d' },
  { id: 'item-1-11', text: 'Teherautó platóján szállított sóder', categoryId: 'cat-3d' },
  { id: 'item-1-12', text: 'Kockacukor által elfoglalt tér', categoryId: 'cat-3d' }
];

// 2. SZINT: Váltószámok a mértékegységek között (10, 100, 1000)
const CATEGORIES_LEVEL_2: SorterCategory[] = [
  { id: 'cat-ten', name: '10-es váltószám (hosszúság, kis űrmérték)', color: 'blue' },
  { id: 'cat-hundred', name: '100-as váltószám (területmértékek, hl)', color: 'amber' },
  { id: 'cat-thousand', name: '1000-es váltószám (köbmértékek, m-km, l-ml)', color: 'purple' }
];

const ITEMS_LEVEL_2: SorterItem[] = [
  { id: 'item-2-1', text: '1 cm ➔ mm (10-zel szorzunk)', categoryId: 'cat-ten' },
  { id: 'item-2-2', text: '1 dm ➔ cm (10-zel szorzunk)', categoryId: 'cat-ten' },
  { id: 'item-2-3', text: '1 liter ➔ dl (10-zel szorzunk)', categoryId: 'cat-ten' },
  { id: 'item-2-4', text: '1 dl ➔ cl (10-zel szorzunk)', categoryId: 'cat-ten' },

  { id: 'item-2-5', text: '1 dm² ➔ cm² (100-zal szorzunk)', categoryId: 'cat-hundred' },
  { id: 'item-2-6', text: '1 m² ➔ dm² (100-zal szorzunk)', categoryId: 'cat-hundred' },
  { id: 'item-2-7', text: '1 ha ➔ a (100-zal szorzunk)', categoryId: 'cat-hundred' },
  { id: 'item-2-8', text: '1 hl ➔ liter (100-zal szorzunk)', categoryId: 'cat-hundred' },

  { id: 'item-2-9', text: '1 dm³ ➔ cm³ (1000-rel szorzunk)', categoryId: 'cat-thousand' },
  { id: 'item-2-10', text: '1 m³ ➔ dm³ (1000-rel szorzunk)', categoryId: 'cat-thousand' },
  { id: 'item-2-11', text: '1 km ➔ m (1000-rel szorzunk)', categoryId: 'cat-thousand' },
  { id: 'item-2-12', text: '1 liter ➔ ml (1000-rel szorzunk)', categoryId: 'cat-thousand' }
];

// 3. SZINT: Képletek és számítási eljárások
const CATEGORIES_LEVEL_3: SorterCategory[] = [
  { id: 'cat-form-k', name: 'Kerület és élösszeg képletek (1D)', color: 'blue' },
  { id: 'cat-form-ta', name: 'Terület és felszín képletek (2D)', color: 'emerald' },
  { id: 'cat-form-v', name: 'Térfogat és kapacitás képletek (3D)', color: 'purple' }
];

const ITEMS_LEVEL_3: SorterItem[] = [
  { id: 'item-3-1', text: 'Téglalap kerülete: K = 2 · (a + b)', categoryId: 'cat-form-k' },
  { id: 'item-3-2', text: 'Négyzet kerülete: K = 4 · a', categoryId: 'cat-form-k' },
  { id: 'item-3-3', text: 'Kocka 12 élének összege: 12 · a', categoryId: 'cat-form-k' },
  { id: 'item-3-4', text: 'Téglatest éleinek összege: 4 · (a + b + c)', categoryId: 'cat-form-k' },

  { id: 'item-3-5', text: 'Téglalap területe: T = a · b', categoryId: 'cat-form-ta' },
  { id: 'item-3-6', text: 'Négyzet területe: T = a · a = a²', categoryId: 'cat-form-ta' },
  { id: 'item-3-7', text: 'Kocka felszíne: A = 6 · a²', categoryId: 'cat-form-ta' },
  { id: 'item-3-8', text: 'Téglatest felszíne: A = 2 · (ab + ac + bc)', categoryId: 'cat-form-ta' },

  { id: 'item-3-9', text: 'Kocka térfogata: V = a³ = a · a · a', categoryId: 'cat-form-v' },
  { id: 'item-3-10', text: 'Téglatest térfogata: V = a · b · c', categoryId: 'cat-form-v' },
  { id: 'item-3-11', text: 'Egyenes hasáb térfogata: V = T_alap · m', categoryId: 'cat-form-v' },
  { id: 'item-3-12', text: 'Köbméter vízkapacitása: 1 m³ = 1000 liter', categoryId: 'cat-form-v' }
];

export const MeasurementSummarySorter: React.FC<MeasurementSummarySorterProps> = ({
  level = 1,
  onNextLevel = () => {},
  onOpenRules = () => {},
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
        return '1. Szint: Dimenziók csoportosítása (1D vonalas, 2D felületi vagy 3D térbeli)';
      case 2:
        return '2. Szint: Váltószámok csoportosítása (10-es, 100-as vagy 1000-es szorzó)';
      case 3:
        return '3. Szint: Képletek rendszerezése (Kerület/élek, Terület/felszín vagy Térfogat)';
      default:
        return '';
    }
  };

  return (
    <SorterTemplate
      title="Összefoglaló mértékegység csoportosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 10. JÁTÉK"
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
