import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SphereSorterProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Felszín (A) vs. Térfogat (V) vs. Mindkettő',
    subtitle: 'Csoportosítsd a fogalmakat, kitevőket és képleteket aszerint, melyik számításhoz tartoznak!',
    categories: [
      {
        id: 'cat-surface',
        name: 'Csak a Felszínhez (A) Tartozik Közvetlenül',
        description: 'Négyzetes kitevő, borítófelület, főkör négyszerese',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-volume',
        name: 'Csak a Térfogathoz (V) Tartozik Közvetlenül',
        description: 'Köbös kitevő, űrtartalom, Arkhimédész-tényező (4/3)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkét Számításhoz Közvetlenül Szükséges',
        description: 'Sugár, átmérő, a gömb alapméretei',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'ss1-1', label: 'r² (négyzetes kitevő)', category: 'cat-surface' },
      { id: 'ss1-2', label: 'A = 4πr² képlet', category: 'cat-surface' },
      { id: 'ss1-3', label: 'Bőrbevonat területe (cm²)', category: 'cat-surface' },
      { id: 'ss1-4', label: 'Pontosan 4 főkörlap területe', category: 'cat-surface' },
      { id: 'ss1-5', label: 'r³ (köbös kitevő)', category: 'cat-volume' },
      { id: 'ss1-6', label: 'V = (4/3)πr³ képlet', category: 'cat-volume' },
      { id: 'ss1-7', label: 'Folyadékkapacitás literben', category: 'cat-volume' },
      { id: 'ss1-8', label: 'Tömeg számítása sűrűséggel (m = ρ·V)', category: 'cat-volume' },
      { id: 'ss1-9', label: 'Henger térfogatának 2/3 része', category: 'cat-volume' },
      { id: 'ss1-10', label: 'Sugár (r) hossza', category: 'cat-both' },
      { id: 'ss1-11', label: 'Átmérő (d = 2r)', category: 'cat-both' },
      { id: 'ss1-12', label: 'Gömb középpontja (O)', category: 'cat-both' }
    ]
  },
  2: {
    title: '2. Szint: Teljes Gömb vs. Tömör Félgömb vs. Köré Írt Henger',
    subtitle: 'Rendszerezd az összefüggéseket és tulajdonságokat a megfelelő térbeli alakzathoz!',
    categories: [
      {
        id: 'cat-sphere',
        name: 'Teljes Gömb',
        description: 'Tökéletesen zárt, egyenletesen görbült test',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-hemi',
        name: 'Tömör Félgömb',
        description: 'Gömbsüveg + sík körlap alapterület',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-cyl',
        name: 'Köré Írt Henger (R = r, M = 2r)',
        description: 'A gömböt pontosan magába foglaló forgáshenger',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ss2-1', label: 'Felszín: A = 4πr²', category: 'cat-sphere' },
      { id: 'ss2-2', label: 'Térfogat: V = (4/3)πr³', category: 'cat-sphere' },
      { id: 'ss2-3', label: 'Nincs sík határoló lapja', category: 'cat-sphere' },
      { id: 'ss2-4', label: 'Bármely síkmetszete kör', category: 'cat-sphere' },
      { id: 'ss2-5', label: 'Teljes felszín: A = 3πr²', category: 'cat-hemi' },
      { id: 'ss2-6', label: 'Térfogat: V = (2/3)πr³', category: 'cat-hemi' },
      { id: 'ss2-7', label: '1 sík körlap alaplapja és 1 görbült süvege van', category: 'cat-hemi' },
      { id: 'ss2-8', label: 'Kettévágás a főkör síkjában', category: 'cat-hemi' },
      { id: 'ss2-9', label: 'Térfogat: V = 2πr³ = (6/3)πr³', category: 'cat-cyl' },
      { id: 'ss2-10', label: 'Palástterület: Tp = 4πr²', category: 'cat-cyl' },
      { id: 'ss2-11', label: 'Testmagassága a gömb átmérője (m = 2r)', category: 'cat-cyl' },
      { id: 'ss2-12', label: 'Két párhuzamos körlap alapja van', category: 'cat-cyl' }
    ]
  },
  3: {
    title: '3. Szint: Dimenziók és Mértékegységek',
    subtitle: 'Válogasd szét a jellemzőket dimenziójuk és mértékegységük szerint!',
    categories: [
      {
        id: 'cat-1d',
        name: '1D (Hosszúság - cm, dm, m)',
        description: 'Vonalas méretek, sugarak, kerületek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-2d',
        name: '2D (Terület és Felszín - cm², m²)',
        description: 'Síkmetszetek és felületek nagysága',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-3d',
        name: '3D (Térfogat - cm³, liter, m³)',
        description: 'Térbeli űrtartalom és testkapacitás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'ss3-1', label: 'Gömb sugara (r)', category: 'cat-1d' },
      { id: 'ss3-2', label: 'Gömb átmérője (d = 2r)', category: 'cat-1d' },
      { id: 'ss3-3', label: 'Főkör kerülete (K = 2πr)', category: 'cat-1d' },
      { id: 'ss3-4', label: 'Metszősík távolsága a középponttól (x)', category: 'cat-1d' },
      { id: 'ss3-5', label: 'Gömb felszíne (A = 4πr²)', category: 'cat-2d' },
      { id: 'ss3-6', label: 'Főkör területe (Tf = r²π)', category: 'cat-2d' },
      { id: 'ss3-7', label: 'Félgömb teljes felszíne (3πr²)', category: 'cat-2d' },
      { id: 'ss3-8', label: 'Kiskör területe (ρ²π)', category: 'cat-2d' },
      { id: 'ss3-9', label: 'Gömb térfogata (V = (4/3)πr³)', category: 'cat-3d' },
      { id: 'ss3-10', label: 'Félgömb térfogata (V = (2/3)πr³)', category: 'cat-3d' },
      { id: 'ss3-11', label: 'Hordó vagy tartály űrtartalma literben', category: 'cat-3d' },
      { id: 'ss3-12', label: 'Kiszorított folyadék térfogata', category: 'cat-3d' }
    ]
  }
};

export const SphereSorter: React.FC<SphereSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-solids',
  topicTitle = 'A Gömb (8. osztály)'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      levelConfigs={sorterLevels}
      levelConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
    />
  );
};

export default SphereSorter;
