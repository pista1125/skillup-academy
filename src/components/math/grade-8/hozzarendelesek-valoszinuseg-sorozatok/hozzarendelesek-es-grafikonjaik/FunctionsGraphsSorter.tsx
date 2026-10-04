import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FunctionsGraphsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Függvények Monotonitása és Menetiránya',
    subtitle: 'Csoportosítsd a függvényeket a meredekségük előjele szerint: növekvő, csökkenő vagy konstans!',
    categories: [
      {
        id: 'cat-inc',
        name: 'Szigorúan Növekvő (a > 0)',
        description: 'Balról jobbra emelkedő egyenesek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-dec',
        name: 'Szigorúan Csökkenő (a < 0)',
        description: 'Balról jobbra lejtő egyenesek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-const',
        name: 'Konstans Vízszintes (a = 0)',
        description: 'Párhuzamos az x-tengellyel',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'y = 3x - 5', category: 'cat-inc' },
      { id: 's1-2', label: 'y = x + 4', category: 'cat-inc' },
      { id: 's1-3', label: 'y = 0,2x + 1', category: 'cat-inc' },
      { id: 's1-4', label: 'y = 6x', category: 'cat-inc' },
      { id: 's1-5', label: 'y = -2x + 7', category: 'cat-dec' },
      { id: 's1-6', label: 'y = 5 - x', category: 'cat-dec' },
      { id: 's1-7', label: 'y = -0,5x - 3', category: 'cat-dec' },
      { id: 's1-8', label: 'y = -4x', category: 'cat-dec' },
      { id: 's1-9', label: 'y = 4', category: 'cat-const' },
      { id: 's1-10', label: 'y = -2', category: 'cat-const' },
      { id: 's1-11', label: 'y = 0', category: 'cat-const' },
      { id: 's1-12', label: 'f(x) = 15', category: 'cat-const' }
    ]
  },
  2: {
    title: '2. Szint: Zérushelyek és Metszéspontok',
    subtitle: 'Határozd meg, hogy az f(x) = 0 egyenlet megoldása pozitív, negatív vagy origó/nincs!',
    categories: [
      {
        id: 'cat-zpos',
        name: 'Pozitív Zérushely (x > 0)',
        description: 'Az x-tengely pozitív felén metsz',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-zneg',
        name: 'Negatív Zérushely (x < 0)',
        description: 'Az x-tengely negatív felén metsz',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-zorig',
        name: 'Origón Metsző (x = 0) / Nincs',
        description: 'x = 0 vagy nincs zérushely (konstans)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'y = 2x - 6 (x = 3)', category: 'cat-zpos' },
      { id: 's2-2', label: 'y = -x + 4 (x = 4)', category: 'cat-zpos' },
      { id: 's2-3', label: 'y = 3x - 12 (x = 4)', category: 'cat-zpos' },
      { id: 's2-4', label: 'y = -5x + 10 (x = 2)', category: 'cat-zpos' },
      { id: 's2-5', label: 'y = 2x + 8 (x = -4)', category: 'cat-zneg' },
      { id: 's2-6', label: 'y = 3x + 15 (x = -5)', category: 'cat-zneg' },
      { id: 's2-7', label: 'y = -x - 2 (x = -2)', category: 'cat-zneg' },
      { id: 's2-8', label: 'y = -4x - 12 (x = -3)', category: 'cat-zneg' },
      { id: 's2-9', label: 'y = 4x (x = 0)', category: 'cat-zorig' },
      { id: 's2-10', label: 'y = -7x (x = 0)', category: 'cat-zorig' },
      { id: 's2-11', label: 'y = 5 (nincs zérushely)', category: 'cat-zorig' },
      { id: 's2-12', label: 'y = -3 (nincs zérushely)', category: 'cat-zorig' }
    ]
  },
  3: {
    title: '3. Szint: Grafikon- és Görbetípusok Besorolása',
    subtitle: 'Sorold be a függvényeket egyenes, parabola vagy abszolútérték alakzat szerint!',
    categories: [
      {
        id: 'cat-linear',
        name: 'Lineáris Egyenes (ax + b)',
        description: 'Elsőfokú függvény, egyenes grafikon',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-parabola',
        name: 'Másodfokú Parabola (ax² + c)',
        description: 'U alakú sima görbe, tengelyes szimmetria',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-abs',
        name: 'Abszolútérték „V” Alak (|x| + c)',
        description: 'Töréspontos csúcs, két félegyenes',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'f(x) = 2x - 3', category: 'cat-linear' },
      { id: 's3-2', label: 'f(x) = -5x + 1', category: 'cat-linear' },
      { id: 's3-3', label: 'f(x) = 0,5x', category: 'cat-linear' },
      { id: 's3-4', label: 'f(x) = 7 - x', category: 'cat-linear' },
      { id: 's3-5', label: 'f(x) = x²', category: 'cat-parabola' },
      { id: 's3-6', label: 'f(x) = x² - 4', category: 'cat-parabola' },
      { id: 's3-7', label: 'f(x) = 2x²', category: 'cat-parabola' },
      { id: 's3-8', label: 'f(x) = -x² + 3', category: 'cat-parabola' },
      { id: 's3-9', label: 'f(x) = |x|', category: 'cat-abs' },
      { id: 's3-10', label: 'f(x) = |x| + 2', category: 'cat-abs' },
      { id: 's3-11', label: 'f(x) = |x| - 5', category: 'cat-abs' },
      { id: 's3-12', label: 'f(x) = 3|x|', category: 'cat-abs' }
    ]
  }
};

export const FunctionsGraphsSorter: React.FC<FunctionsGraphsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-graphs',
  topicTitle = 'Hozzárendelések és Grafikonjaik'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
    />
  );
};

export default FunctionsGraphsSorter;
