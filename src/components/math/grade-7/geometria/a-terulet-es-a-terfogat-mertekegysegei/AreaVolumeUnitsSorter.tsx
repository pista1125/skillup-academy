import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface AreaVolumeUnitsSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Dimenziók szétválogatása
const level1Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a mértékegységeket és kifejezéseket a dimenziójuk szerint!',
  categories: [
    { id: 'length', name: 'Hosszúság (1D, m, cm)', color: 'blue' },
    { id: 'area', name: 'Terület (2D, m², ha, a)', color: 'cyan' },
    { id: 'volume', name: 'Térfogat & Űrmérték (3D, m³, l)', color: 'indigo' }
  ],
  items: [
    {
      id: 'i1-1',
      label: 'Négyzetméter (m²)',
      categoryId: 'area',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="25" y="10" width="30" height="30" fill="none" className="stroke-cyan-600 stroke-2" />
          <text x="40" y="29" textAnchor="middle" className="text-[8px] font-bold fill-cyan-700">m²</text>
        </svg>
      )
    },
    {
      id: 'i1-2',
      label: 'Köbméter (m³)',
      categoryId: 'volume',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <path d="M 25,12 L 40,8 L 55,12 L 40,16 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
          <path d="M 25,12 L 25,32 L 40,36 L 40,16 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
          <path d="M 40,16 L 40,36 L 55,32 L 55,12 Z" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
        </svg>
      )
    },
    {
      id: 'i1-3',
      label: 'Centiméter (cm)',
      categoryId: 'length',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <line x1="15" y1="25" x2="65" y2="25" className="stroke-blue-600 stroke-2" />
          <line x1="15" y1="20" x2="15" y2="30" className="stroke-blue-600 stroke-2" />
          <line x1="65" y1="20" x2="65" y2="30" className="stroke-blue-600 stroke-2" />
        </svg>
      )
    },
    {
      id: 'i1-4',
      label: 'Hektár (ha)',
      categoryId: 'area',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="18" y="10" width="44" height="30" fill="none" className="stroke-cyan-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-bold fill-cyan-700">ha</text>
        </svg>
      )
    },
    {
      id: 'i1-5',
      label: 'Liter (l = dm³)',
      categoryId: 'volume',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="28" y="10" width="24" height="30" rx="3" fill="none" className="stroke-indigo-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">1 l</text>
        </svg>
      )
    },
    { id: 'i1-6', label: 'Ár (a = 100 m²)', categoryId: 'area' },
    { id: 'i1-7', label: 'Hektoliter (hl = 100 l)', categoryId: 'volume' },
    { id: 'i1-8', label: 'Deciméter (dm)', categoryId: 'length' },
    { id: 'i1-9', label: 'Milliliter (ml = 1 cm³)', categoryId: 'volume' },
    { id: 'i1-10', label: 'Négyzetdeciméter (dm²)', categoryId: 'area' }
  ]
};

// 2. SZINT: Területnagyságok osztályozása
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a területeket a nagyságrendjük alapján!',
  categories: [
    { id: 'small', name: '1 m² alatti terület (dm², cm²)', color: 'teal' },
    { id: 'mid', name: '1 m² – 1000 m² (m², ár)', color: 'cyan' },
    { id: 'large', name: '1000 m² feletti (hektár, km²)', color: 'emerald' }
  ],
  items: [
    {
      id: 'i2-1',
      label: '500 cm² (0,05 m²)',
      categoryId: 'small',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="25" y="12" width="30" height="26" fill="none" className="stroke-teal-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-teal-700">500 cm²</text>
        </svg>
      )
    },
    {
      id: 'i2-2',
      label: '25 m² szoba padlója',
      categoryId: 'mid',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="20" y="10" width="40" height="30" fill="none" className="stroke-cyan-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-cyan-700">25 m²</text>
        </svg>
      )
    },
    {
      id: 'i2-3',
      label: '2 hektár erdő (20 000 m²)',
      categoryId: 'large',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="18" y="10" width="44" height="30" fill="none" className="stroke-emerald-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-emerald-800">2 ha</text>
        </svg>
      )
    },
    { id: 'i2-4', label: '80 dm² (0,8 m²)', categoryId: 'small' },
    { id: 'i2-5', label: '3 ár családi telek (300 m²)', categoryId: 'mid' },
    { id: 'i2-6', label: '1 km² falu területe (100 ha)', categoryId: 'large' },
    { id: 'i2-7', label: '15 ár szőlőültetvény (1500 m²)', categoryId: 'large' },
    { id: 'i2-8', label: '400 m² játszótér', categoryId: 'mid' },
    { id: 'i2-9', label: '2500 mm² (0,25 dm²)', categoryId: 'small' }
  ]
};

// 3. SZINT: Térfogatok és Űrmértékek nagyságrendje
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a térfogatokat és űrmértékeket az 1 literhez viszonyított méretük szerint!',
  categories: [
    { id: 'sub-liter', name: '1 liternél kisebb (< 1 dm³ / ml, dl)', color: 'sky' },
    { id: 'mid-volume', name: '1 liter – 100 liter (dm³)', color: 'blue' },
    { id: 'large-volume', name: '100 liternél nagyobb (≥ 1 hl, m³)', color: 'indigo' }
  ],
  items: [
    {
      id: 'i3-1',
      label: '250 ml pohár víz (0,25 l)',
      categoryId: 'sub-liter',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <path d="M 28,12 L 52,12 L 46,38 L 34,38 Z" fill="none" className="stroke-sky-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">250 ml</text>
        </svg>
      )
    },
    {
      id: 'i3-2',
      label: '10 literes vödör (10 dm³)',
      categoryId: 'mid-volume',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <path d="M 25,14 L 55,14 L 50,40 L 30,40 Z" fill="none" className="stroke-blue-600 stroke-2" />
          <text x="40" y="28" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">10 l</text>
        </svg>
      )
    },
    {
      id: 'i3-3',
      label: '2 m³ kerti medence (2000 l)',
      categoryId: 'large-volume',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <rect x="20" y="15" width="40" height="24" rx="4" fill="none" className="stroke-indigo-600 stroke-2" />
          <text x="40" y="30" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">2 m³</text>
        </svg>
      )
    },
    { id: 'i3-4', label: '50 cm³ gyógyszeres üveg (0,05 l)', categoryId: 'sub-liter' },
    { id: 'i3-5', label: '60 dm³ autó üzemanyagtartály', categoryId: 'mid-volume' },
    { id: 'i3-6', label: '5 hektoliter boroshordó (500 l)', categoryId: 'large-volume' },
    { id: 'i3-7', label: '5 dl tejeskávé', categoryId: 'sub-liter' },
    { id: 'i3-8', label: '25 l hátizsák űrtartalma', categoryId: 'mid-volume' },
    { id: 'i3-9', label: '10 m³ konténer (10 000 l)', categoryId: 'large-volume' },
    { id: 'i3-10', label: '500 cm³ ásványvíz (0,5 l)', categoryId: 'sub-liter' }
  ]
};

export const AreaVolumeUnitsSorter: React.FC<AreaVolumeUnitsSorterProps> = ({
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
      title="4. Terület és Térfogat Mértékegységek Csoportosító"
      subtitle="Kategorizáld a mennyiségeket dimenzióik és nagyságrendjük szerint!"
      badge="CSOPORTOSÍTÓ"
      topicTitle="Mértékegységek Átváltása"
      themeColor="cyan"
      grade={7}
      chapterId="geometria"
      topicId="g7-geom-units-sorter"
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

export default AreaVolumeUnitsSorter;
