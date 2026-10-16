import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AreaVolumeMeasurementSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Terület, Térfogat vagy Űrtartalom?',
    subtitle: 'Válogasd szét a mértékegységeket és kifejezéseket jellegük szerint!',
    categories: [
      {
        id: 'cat-area',
        name: 'Területmérték',
        description: '100-as váltószám (mm², cm², dm², m², a, ha, km²)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-volume',
        name: 'Térfogatmérték',
        description: '1000-es váltószám (mm³, cm³, dm³, m³)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-capacity',
        name: 'Űrmérték',
        description: 'Folyadékok, tartályok (ml, cl, dl, liter, hl)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '25 cm²', category: 'cat-area' },
      { id: 's1-2', label: '400 dm³', category: 'cat-volume' },
      { id: 's1-3', label: '15 liter', category: 'cat-capacity' },
      { id: 's1-4', label: '3,5 ha', category: 'cat-area' },
      { id: 's1-5', label: '1,2 m³', category: 'cat-volume' },
      { id: 's1-6', label: '50 dl', category: 'cat-capacity' },
      { id: 's1-7', label: '120 m²', category: 'cat-area' },
      { id: 's1-8', label: '850 cm³', category: 'cat-volume' },
      { id: 's1-9', label: '2,5 hl', category: 'cat-capacity' },
      { id: 's1-10', label: '6 ár (a)', category: 'cat-area' },
      { id: 's1-11', label: '5000 mm³', category: 'cat-volume' },
      { id: 's1-12', label: '750 ml', category: 'cat-capacity' }
    ]
  },
  2: {
    title: '2. Szint: Hasonlítás 1 Négyzetméterhez (1 m²)',
    subtitle: 'Válogasd szét a területeket aszerint, hogy kisebbek, pontosan egyenlők vagy nagyobbak 1 m²-nél!',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb, mint 1 m²',
        description: '1 m²-nél (100 dm²-nél) kisebb felület',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 1 m²',
        description: '1 m²-rel egyenértékű kifejezések',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-more',
        name: 'Nagyobb, mint 1 m²',
        description: '1 m²-nél (100 dm²-nél) nagyobb terület',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '45 dm²', category: 'cat-less' },
      { id: 's2-2', label: '100 dm²', category: 'cat-equal' },
      { id: 's2-3', label: '2,5 m²', category: 'cat-more' },
      { id: 's2-4', label: '8500 cm²', category: 'cat-less' },
      { id: 's2-5', label: '10 000 cm²', category: 'cat-equal' },
      { id: 's2-6', label: '1 ár (a)', category: 'cat-more' },
      { id: 's2-7', label: '75 cm²', category: 'cat-less' },
      { id: 's2-8', label: '1 000 000 mm²', category: 'cat-equal' },
      { id: 's2-9', label: '0,5 hektár', category: 'cat-more' },
      { id: 's2-10', label: '0,9 m²', category: 'cat-less' },
      { id: 's2-11', label: '100 dm · 1 dm felület', category: 'cat-equal' },
      { id: 's2-12', label: '150 dm²', category: 'cat-more' }
    ]
  },
  3: {
    title: '3. Szint: Egyenértékű Csoportok',
    subtitle: 'Válogasd az értékeket a 3 reprezentatív mennyiséghez!',
    categories: [
      {
        id: 'cat-100l',
        name: '100 liter (1 hl)',
        description: '100 literrel pontosan megegyező értékek',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-1000l',
        name: '1000 liter (1 m³)',
        description: '1000 literrel / 1 köbméterrel megegyező értékek',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-1ha',
        name: '1 hektár (10 000 m²)',
        description: '1 hektárral pontosan egyenlő területek',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: '1 hl', category: 'cat-100l' },
      { id: 's3-2', label: '1 m³', category: 'cat-1000l' },
      { id: 's3-3', label: '100 ár (a)', category: 'cat-1ha' },
      { id: 's3-4', label: '100 dm³', category: 'cat-100l' },
      { id: 's3-5', label: '1000 dm³', category: 'cat-1000l' },
      { id: 's3-6', label: '10 000 m²', category: 'cat-1ha' },
      { id: 's3-7', label: '0,1 m³', category: 'cat-100l' },
      { id: 's3-8', label: '10 hl', category: 'cat-1000l' },
      { id: 's3-9', label: '0,01 km²', category: 'cat-1ha' },
      { id: 's3-10', label: '1000 dl', category: 'cat-100l' },
      { id: 's3-11', label: '1 000 000 cm³', category: 'cat-1000l' },
      { id: 's3-12', label: '1 000 000 dm²', category: 'cat-1ha' }
    ]
  }
};

export const AreaVolumeMeasurementSorter: React.FC<AreaVolumeMeasurementSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-area-volume-measurement',
  topicTitle = 'A terület és a térfogat mérése'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      config={sorterLevels[activeLevel]}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
      themeColor="indigo"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      title="Terület és térfogat csoportosító"
      subtitle="Csoportosítsd a mértékegységeket és mennyiségeket 3 szinten!"
    />
  );
};

(AreaVolumeMeasurementSorter as any).sorterLevels = sorterLevels;
(AreaVolumeMeasurementSorter as any).levels = sorterLevels;

export default AreaVolumeMeasurementSorter;
