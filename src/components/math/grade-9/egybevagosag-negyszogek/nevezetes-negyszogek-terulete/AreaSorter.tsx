import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AreaSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Területképletek Típusa Szerint',
    subtitle: 'Sorold be az állításokat és alakzatokat a kiszámításuk alapvető képlete szerint!',
    categories: [
      {
        id: 'cat-height',
        name: 'Alap és Magasság (a · m)',
        description: 'Alap és a hozzá tartozó merőleges magasság szorzatán alapuló képletek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-diagonal',
        name: 'Átlók Szorzatának Fele ((e · f)/2)',
        description: 'Egymásra merőleges átlók szorzatának felével számított területek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-sides',
        name: 'Oldalak Közvetlen Szorzata (a · b)',
        description: 'Derékszögű szomszédos oldalak szorzatán alapuló képletek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Alap és Magasság
      { id: 'as1-1', label: 'T = a · m_a képlettel számított paralelogramma', category: 'cat-height' },
      { id: 'as1-2', label: 'T = ((a + c) / 2) · m képlettel számított trapéz', category: 'cat-height' },
      { id: 'as1-3', label: 'Középvonal (k) és magasság (m) szorzata: k · m', category: 'cat-height' },
      { id: 'as1-4', label: 'Rombusz területe az oldala és magassága alapján: a · m', category: 'cat-height' },
      // Átlók Szorzata
      { id: 'as1-5', label: 'Rombusz területe a két átlóval: (e · f) / 2', category: 'cat-diagonal' },
      { id: 'as1-6', label: 'Deltoid területe a merőleges átlókból: (e · f) / 2', category: 'cat-diagonal' },
      { id: 'as1-7', label: 'Négyzet területe az átlójából: d² / 2', category: 'cat-diagonal' },
      { id: 'as1-8', label: 'Bármely merőleges átlójú konvex négyszög területe', category: 'cat-diagonal' },
      // Oldalak szorzata
      { id: 'as1-9', label: 'Téglalap területe a két különböző oldalával: a · b', category: 'cat-sides' },
      { id: 'as1-10', label: 'Négyzet területe az oldalának négyzeteként: a²', category: 'cat-sides' },
      { id: 'as1-11', label: 'Szoba padlójának területe: hosszúság szorozva szélességgel', category: 'cat-sides' },
      { id: 'as1-12', label: 'Kocka egyetlen határoló négyzetlapjának területe', category: 'cat-sides' }
    ]
  },
  2: {
    title: '2. Szint: Kiszámított Terület Nagysága Szerint',
    subtitle: 'Válogasd szét a feladatokat a kapott terület nagysága alapján!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kisebb, mint 30 cm²',
        description: 'T < 30 cm² területű alakzatok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-mid',
        name: '30 és 60 cm² Között',
        description: '30 cm² ≤ T ≤ 60 cm² területű alakzatok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-large',
        name: 'Nagyobb, mint 60 cm²',
        description: 'T > 60 cm² területű alakzatok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Kisebb mint 30
      { id: 'as2-1', label: 'Négyzet a = 5 cm oldallal (T = 25 cm²)', category: 'cat-small' },
      { id: 'as2-2', label: 'Deltoid e = 8 cm, f = 6 cm átlókkal (T = 24 cm²)', category: 'cat-small' },
      { id: 'as2-3', label: 'Paralelogramma a = 7 cm, m = 4 cm (T = 28 cm²)', category: 'cat-small' },
      { id: 'as2-4', label: 'Trapéz a = 6 cm, c = 4 cm, m = 5 cm (T = 25 cm²)', category: 'cat-small' },
      // 30 és 60 között
      { id: 'as2-5', label: 'Téglalap a = 8 cm, b = 6 cm (T = 48 cm²)', category: 'cat-mid' },
      { id: 'as2-6', label: 'Rombusz e = 10 cm, f = 8 cm (T = 40 cm²)', category: 'cat-mid' },
      { id: 'as2-7', label: 'Trapéz a = 12 cm, c = 8 cm, m = 5 cm (T = 50 cm²)', category: 'cat-mid' },
      { id: 'as2-8', label: 'Négyzet d = 10 cm átlóval (T = 50 cm²)', category: 'cat-mid' },
      // Nagyobb mint 60
      { id: 'as2-9', label: 'Paralelogramma a = 15 cm, m = 6 cm (T = 90 cm²)', category: 'cat-large' },
      { id: 'as2-10', label: 'Trapéz a = 16 cm, c = 6 cm, m = 8 cm (T = 88 cm²)', category: 'cat-large' },
      { id: 'as2-11', label: 'Rombusz e = 16 cm, f = 12 cm (T = 96 cm²)', category: 'cat-large' },
      { id: 'as2-12', label: 'Téglalap a = 12 cm, b = 8 cm (T = 96 cm²)', category: 'cat-large' }
    ]
  },
  3: {
    title: '3. Szint: Számítási Megközelítés a Gyakorlatban',
    subtitle: 'Csoportosítsd a feladatokat az alkalmazott megoldási stratégia szerint!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Közvetlen Képlet',
        description: 'Minden szükséges alap és magasság vagy átló azonnal rendelkezésre áll',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-pyth',
        name: 'Pitagorasz-tételes Előkészítés',
        description: 'Előbb a magasságot, átlót vagy oldalt kell kiszámolni derékszögű háromszögből',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-composite',
        name: 'Átdarabolás / Részekre Bontás',
        description: 'Összetett alakzat felosztása vagy egybevágó alakzattá egyesítése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Közvetlen
      { id: 'as3-1', label: 'Paralelogramma területe adott a = 10 cm és m = 7 cm értékekből', category: 'cat-direct' },
      { id: 'as3-2', label: 'Téglalap területe adott 6 cm és 9 cm oldalhosszakkal', category: 'cat-direct' },
      { id: 'as3-3', label: 'Trapéz területe adott alapokkal és magassággal: a = 12, c = 8, m = 5', category: 'cat-direct' },
      { id: 'as3-4', label: 'Deltoid területe a megadott e = 14 cm és f = 6 cm átlókkal', category: 'cat-direct' },
      // Pitagorasz
      { id: 'as3-5', label: 'Húrtrapéz területe, ha az alapok és a szár hossza adott (magasság meghatározása)', category: 'cat-pyth' },
      { id: 'as3-6', label: 'Rombusz területe, ha csak az oldala és az egyik átlója ismert', category: 'cat-pyth' },
      { id: 'as3-7', label: 'Négyzet területe az átló hosszából a befogók felírásával', category: 'cat-pyth' },
      { id: 'as3-8', label: 'Derékszögű trapéz területe az alapok és a ferde szár ismeretében', category: 'cat-pyth' },
      // Átdarabolás / bontás
      { id: 'as3-9', label: 'L-alakú szobabelső területe két téglalap összegére bontva', category: 'cat-composite' },
      { id: 'as3-10', label: 'Varignon-paralelogramma területe az eredeti négyszög felezéseként', category: 'cat-composite' },
      { id: 'as3-11', label: 'Trapéz felbontása egy paralelogrammára és egy derékszögű háromszögre', category: 'cat-composite' },
      { id: 'as3-12', label: 'Két egybevágó trapéz összeillesztése egy nagy paralelogrammává', category: 'cat-composite' }
    ]
  }
};

export const AreaSorter: React.FC<AreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-terulet-sorter',
  topicTitle = '7. Nevezetes négyszögek területe'
}) => {
  return (
    <SorterTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
    />
  );
};

(AreaSorter as any).sorterLevels = sorterLevels;

