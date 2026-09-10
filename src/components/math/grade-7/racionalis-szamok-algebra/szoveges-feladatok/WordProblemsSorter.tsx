import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'cat-part', name: 'Törtrész kiszámítása (Szorzás)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-whole', name: 'Az egész kiszámítása (Osztás)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-ratio', name: 'Részarány megadása (Hányados)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    items: [
      { id: 's1', label: '500 Ft 2/5 része', category: 'cat-part' },
      { id: 's2', label: '120 km 3/4 része', category: 'cat-part' },
      { id: 's3', label: '60 perc 1/3 része', category: 'cat-part' },
      { id: 's4', label: 'Egy szám 2/3 része 40', category: 'cat-whole' },
      { id: 's5', label: 'Egy könyv 3/5 része 90 oldal', category: 'cat-whole' },
      { id: 's6', label: 'Egy összeg 1/4 része 500 Ft', category: 'cat-whole' },
      { id: 's7', label: '15 perc hányadrésze 1 órának?', category: 'cat-ratio' },
      { id: 's8', label: '200 m hányadrésze 1 km-nek?', category: 'cat-ratio' },
      { id: 's9', label: '250 g hányadrésze 1 kg-nak?', category: 'cat-ratio' },
      { id: 's10', label: '3 nap hányadrésze 1 hétnek?', category: 'cat-ratio' },
    ]
  },
  2: {
    categories: [
      { id: 'cat-low', name: 'Eredmény < 50', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-mid', name: 'Eredmény 50 és 100 között', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-high', name: 'Eredmény > 100', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    ],
    items: [
      { id: 's11', label: '120 Ft 1/4 része (30)', category: 'cat-low' },
      { id: 's12', label: '60 perc 2/3 része (40)', category: 'cat-low' },
      { id: 's13', label: 'Egy szám 1/2 része 20 (40)', category: 'cat-low' },
      { id: 's14', label: '200 km 1/4 része (50)', category: 'cat-mid' },
      { id: 's15', label: '100 oldal 3/4 része (75)', category: 'cat-mid' },
      { id: 's16', label: 'Egy szám 3/4 része 60 (80)', category: 'cat-mid' },
      { id: 's17', label: '500 Ft 2/5 része (200)', category: 'cat-high' },
      { id: 's18', label: 'Egy szám 1/3 része 40 (120)', category: 'cat-high' },
      { id: 's19', label: '300 liter 1/2 része (150)', category: 'cat-high' },
      { id: 's20', label: '400 m 3/4 része (300)', category: 'cat-high' },
    ]
  },
  3: {
    categories: [
      { id: 'cat-morehalf', name: 'Több mint a fele megmaradt (> 1/2)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-half', name: 'Pontosan a fele maradt meg (= 1/2)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-lesshalf', name: 'Kevesebb mint a fele maradt meg (< 1/2)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
    ],
    items: [
      { id: 's21', label: 'Elköltöttük az 1/4-ét', category: 'cat-morehalf' },
      { id: 's22', label: 'Elolvastuk az 1/3-át', category: 'cat-morehalf' },
      { id: 's23', label: 'Megtettük a 2/5-ét', category: 'cat-morehalf' },
      { id: 's24', label: 'Elhasználtuk az 1/2-ét', category: 'cat-half' },
      { id: 's25', label: 'Elköltöttük a 2/4-ét', category: 'cat-half' },
      { id: 's26', label: 'Megittuk a 3/6-át', category: 'cat-half' },
      { id: 's27', label: 'Elköltöttük a 3/4-ét', category: 'cat-lesshalf' },
      { id: 's28', label: 'Megtettük a 4/5-ét', category: 'cat-lesshalf' },
      { id: 's29', label: 'Elolvastuk az 5/6-át', category: 'cat-lesshalf' },
      { id: 's30', label: 'Elhasználtuk a 7/10-ét', category: 'cat-lesshalf' },
    ]
  }
};

export const WordProblemsSorter: React.FC<WordProblemsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Szöveges Feladatok Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a feladatokat és arányokat a megfelelő kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
