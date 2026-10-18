import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

export interface PracticalProblemsSorterProps {
  level?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Milyen geometriai mennyiséget számolunk?
const CATEGORIES_LEVEL_1: SorterCategory[] = [
  { id: 'cat-perimeter', name: 'Kerület feladat (hosszúság: m, cm)', color: 'blue' },
  { id: 'cat-area', name: 'Terület és felszín (lefedés, burkolat: m², cm²)', color: 'emerald' },
  { id: 'cat-volume', name: 'Térfogat és űrmérték (megtöltés: liter, m³)', color: 'purple' }
];

const ITEMS_LEVEL_1: SorterItem[] = [
  { id: 'item-1-1', text: 'Kert körbekerítése drótfonattal', categoryId: 'cat-perimeter' },
  { id: 'item-1-2', text: 'Asztalterítő körbeszegése szalaggal', categoryId: 'cat-perimeter' },
  { id: 'item-1-3', text: 'Szoba szegélylécezése a falak tövében', categoryId: 'cat-perimeter' },
  { id: 'item-1-4', text: 'Fényképkeret fa lécének levágása', categoryId: 'cat-perimeter' },

  { id: 'item-1-5', text: 'Nappali padló laminált parkettázása', categoryId: 'cat-area' },
  { id: 'item-1-6', text: 'Fürdőszoba fal csempézése', categoryId: 'cat-area' },
  { id: 'item-1-7', text: 'Ajándékdoboz csomagolópapírja', categoryId: 'cat-area' },
  { id: 'item-1-8', text: 'Kerti gyep füvesítése fűmaggal', categoryId: 'cat-area' },

  { id: 'item-1-9', text: 'Kerti medence vízzel feltöltése', categoryId: 'cat-volume' },
  { id: 'item-1-10', text: 'Akvárium vízmennyisége literben', categoryId: 'cat-volume' },
  { id: 'item-1-11', text: 'Teherautó által szállított sóder', categoryId: 'cat-volume' },
  { id: 'item-1-12', text: 'Esővízgyűjtő hordó űrtartalma', categoryId: 'cat-volume' }
];

// 2. SZINT: Építőanyagok típusa a boltban
const CATEGORIES_LEVEL_2: SorterCategory[] = [
  { id: 'cat-linear', name: 'Folyóméterben kapható (hosszúság)', color: 'blue' },
  { id: 'cat-surface', name: 'Négyzetméterre kapható (felület)', color: 'amber' },
  { id: 'cat-bulk', name: 'Literben vagy köbméterben kapható', color: 'purple' }
];

const ITEMS_LEVEL_2: SorterItem[] = [
  { id: 'item-2-1', text: 'Kerítésdrót a kert köré (65 m)', categoryId: 'cat-linear' },
  { id: 'item-2-2', text: 'Fa szegőléc a parketta szélére (18 m)', categoryId: 'cat-linear' },
  { id: 'item-2-3', text: 'Öntözőcső a virágágyáshoz (25 m)', categoryId: 'cat-linear' },
  { id: 'item-2-4', text: 'Díszszalag az ajándékcsomaghoz (2 m)', categoryId: 'cat-linear' },

  { id: 'item-2-5', text: 'Laminált padló a hálószobába (16 m²)', categoryId: 'cat-surface' },
  { id: 'item-2-6', text: 'Fali csempe a zuhanyzóba (8 m²)', categoryId: 'cat-surface' },
  { id: 'item-2-7', text: 'Térkő a gépkocsi beállóra (35 m²)', categoryId: 'cat-surface' },
  { id: 'item-2-8', text: 'Tetőzsindely a kerti faházra (24 m²)', categoryId: 'cat-surface' },

  { id: 'item-2-9', text: 'Falfesték a szobához (25 liter)', categoryId: 'cat-bulk' },
  { id: 'item-2-10', text: 'Víz a kerti kismedencébe (4 m³ = 4000 l)', categoryId: 'cat-bulk' },
  { id: 'item-2-11', text: 'Termőföld a magaságyásba (500 liter)', categoryId: 'cat-bulk' },
  { id: 'item-2-12', text: 'Sóder a betonozáshoz (2 m³)', categoryId: 'cat-bulk' }
];

// 3. SZINT: Milyen korrekció kell a számításban?
const CATEGORIES_LEVEL_3: SorterCategory[] = [
  { id: 'cat-subtraction', name: 'Nyílás vagy levonás szükséges (mínusz)', color: 'blue' },
  { id: 'cat-addition', name: 'Ráhagyás vagy plusz réteg (többlet)', color: 'emerald' },
  { id: 'cat-ceil', name: 'Felfelé kerekítés egész dobozra/darabra', color: 'purple' }
];

const ITEMS_LEVEL_3: SorterItem[] = [
  { id: 'item-3-1', text: 'Kerítésépítés a kapu kihagyásával', categoryId: 'cat-subtraction' },
  { id: 'item-3-2', text: 'Szegélylécezés az ajtónyílás levonásával', categoryId: 'cat-subtraction' },
  { id: 'item-3-3', text: 'Szobafestés az ablakok levonásával', categoryId: 'cat-subtraction' },
  { id: 'item-3-4', text: 'Kockából sarok kivágása utáni térfogat', categoryId: 'cat-subtraction' },

  { id: 'item-3-5', text: 'Csempe vásárlása 10% vágási hulladékkal', categoryId: 'cat-addition' },
  { id: 'item-3-6', text: 'Csomagolópapír átfedéssel és ráhajtással', categoryId: 'cat-addition' },
  { id: 'item-3-7', text: 'Kerítésdrót tartalék ráhagyással a rögzítéshez', categoryId: 'cat-addition' },
  { id: 'item-3-8', text: 'Falfesték két rétegben való felvitele', categoryId: 'cat-addition' },

  { id: 'item-3-9', text: 'Csempe vásárlása (csak egész doboz vehető)', categoryId: 'cat-ceil' },
  { id: 'item-3-10', text: 'Parketta rendelése (dobozonként 2 m²)', categoryId: 'cat-ceil' },
  { id: 'item-3-11', text: 'Festék vödörben (nem lehet fél vödröt venni)', categoryId: 'cat-ceil' },
  { id: 'item-3-12', text: 'Kerítésoszlopok darabszáma (egész darab)', categoryId: 'cat-ceil' }
];

export const PracticalProblemsSorter: React.FC<PracticalProblemsSorterProps> = ({
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
        return '1. Szint: Milyen geometriai mennyiség (K, T, vagy V) kell az adott feladathoz?';
      case 2:
        return '2. Szint: Anyagok vásárlása a boltban (folyóméter, négyzetméter, liter/m³)';
      case 3:
        return '3. Szint: Számítási korrekciók a valóságban (levonás, ráhagyás, felkerekítés)';
      default:
        return '';
    }
  };

  return (
    <SorterTemplate
      title="Gyakorlati feladatok csoportosító"
      subtitle={getSubtitle(level)}
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 9. JÁTÉK"
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
