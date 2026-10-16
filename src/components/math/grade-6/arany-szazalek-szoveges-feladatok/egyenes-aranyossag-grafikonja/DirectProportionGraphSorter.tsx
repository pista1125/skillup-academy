import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DirectProportionGraphSorterProps {
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
    title: '1. Szint: A Grafikon Megjelenési Formája',
    subtitle: 'Döntsd el, hogy folytonos félegyenes, diszkrét pontsor vagy nem egyenes arányosság!',
    categories: [
      {
        id: 'cat-continuous',
        name: 'Folytonos félegyenes',
        description: 'Folytonosan mérhető mennyiségek (út, idő, tömeg, folyadék)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-discrete',
        name: 'Diszkrét pontsor',
        description: 'Csak egész darabokban létező mennyiségek (füzet, jegy, labda)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-none',
        name: 'Nem egyenes arányosság',
        description: 'Nem az origóból indul, vagy nem egyenes vonal',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 'dpg_s1_1', label: 'Vásárolt alma tömege (kg) és fizetendő ára (Ft)', category: 'cat-continuous' },
      { id: 'dpg_s1_2', label: 'Egyenletesen haladó autó megtett útja és ideje', category: 'cat-continuous' },
      { id: 'dpg_s1_3', label: 'Vásárolt benzin térfogata (liter) és ára', category: 'cat-continuous' },
      { id: 'dpg_s1_4', label: 'Gyalogos túrázó menetideje és megtett kilométerei', category: 'cat-continuous' },
      { id: 'dpg_s1_5', label: 'Megvásárolt füzetek darabszáma és ára', category: 'cat-discrete' },
      { id: 'dpg_s1_6', label: 'Mozijegyek darabszáma és a végösszeg', category: 'cat-discrete' },
      { id: 'dpg_s1_7', label: 'Golyóstollak száma a boltban és áruk', category: 'cat-discrete' },
      { id: 'dpg_s1_8', label: 'Vonaljegyek száma és a fizetendő összeg', category: 'cat-discrete' },
      { id: 'dpg_s1_9', label: 'Taxi díjszabása 1000 Ft alapdíjjal + 400 Ft/km', category: 'cat-none' },
      { id: 'dpg_s1_10', label: 'Négyzet oldala (a) és területe (T = a²)', category: 'cat-none' },
      { id: 'dpg_s1_11', label: 'Életkor és lábméret alakulása az évek során', category: 'cat-none' },
      { id: 'dpg_s1_12', label: 'Égő gyertya megmaradt hossza az eltelt időben', category: 'cat-none' }
    ]
  },
  2: {
    title: '2. Szint: Meredekség és Arányossági Tényező (k)',
    subtitle: 'Csoportosítsd az egyeneseket a meredekségük nagysága szerint!',
    categories: [
      {
        id: 'cat-shallow',
        name: 'Lapos egyenes (k < 2)',
        description: 'Lassú növekedés, kis meredekség',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes egyenes (2 ≤ k ≤ 5)',
        description: 'Mérsékelten meredek egyenes',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-steep',
        name: 'Meredek egyenes (k > 5)',
        description: 'Gyors növekedés, meredek grafikon',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 'dpg_s2_1', label: 'y = 0,5 · x egyenes', category: 'cat-shallow' },
      { id: 'dpg_s2_2', label: 'y = 1 · x egyenes', category: 'cat-shallow' },
      { id: 'dpg_s2_3', label: 'P(4; 4) ponton átmenő egyenes', category: 'cat-shallow' },
      { id: 'dpg_s2_4', label: 'P(6; 9) ponton átmenő egyenes', category: 'cat-shallow' },
      { id: 'dpg_s2_5', label: 'y = 3 · x egyenes', category: 'cat-medium' },
      { id: 'dpg_s2_6', label: 'y = 4 · x egyenes', category: 'cat-medium' },
      { id: 'dpg_s2_7', label: 'P(2; 6) ponton átmenő egyenes', category: 'cat-medium' },
      { id: 'dpg_s2_8', label: 'P(3; 15) ponton átmenő egyenes', category: 'cat-medium' },
      { id: 'dpg_s2_9', label: 'y = 8 · x egyenes', category: 'cat-steep' },
      { id: 'dpg_s2_10', label: 'y = 12 · x egyenes', category: 'cat-steep' },
      { id: 'dpg_s2_11', label: 'P(2; 20) ponton átmenő egyenes', category: 'cat-steep' },
      { id: 'dpg_s2_12', label: 'P(3; 24) ponton átmenő egyenes', category: 'cat-steep' }
    ]
  },
  3: {
    title: '3. Szint: Pontok Helyzete az y = 3x Egyeneshez Képest',
    subtitle: 'Döntsd el, hogy a pont rajta van, felette vagy alatta helyezkedik el!',
    categories: [
      {
        id: 'cat-on',
        name: 'Az egyenesen van (y = 3x)',
        description: 'A pont pontosan illeszkedik az egyenesre',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-above',
        name: 'Az egyenes FELETT van (y > 3x)',
        description: 'Az y koordináta nagyobb mint 3 · x',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-below',
        name: 'Az egyenes ALATT van (y < 3x)',
        description: 'Az y koordináta kisebb mint 3 · x',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      }
    ],
    items: [
      { id: 'dpg_s3_1', label: 'P(2; 6)', category: 'cat-on' },
      { id: 'dpg_s3_2', label: 'P(4; 12)', category: 'cat-on' },
      { id: 'dpg_s3_3', label: 'P(5; 15)', category: 'cat-on' },
      { id: 'dpg_s3_4', label: 'P(10; 30)', category: 'cat-on' },
      { id: 'dpg_s3_5', label: 'P(2; 8)', category: 'cat-above' },
      { id: 'dpg_s3_6', label: 'P(3; 12)', category: 'cat-above' },
      { id: 'dpg_s3_7', label: 'P(4; 15)', category: 'cat-above' },
      { id: 'dpg_s3_8', label: 'P(1; 5)', category: 'cat-above' },
      { id: 'dpg_s3_9', label: 'P(2; 4)', category: 'cat-below' },
      { id: 'dpg_s3_10', label: 'P(3; 6)', category: 'cat-below' },
      { id: 'dpg_s3_11', label: 'P(5; 10)', category: 'cat-below' },
      { id: 'dpg_s3_12', label: 'P(4; 8)', category: 'cat-below' }
    ]
  }
};

export const DirectProportionGraphSorter: React.FC<DirectProportionGraphSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-direct-prop-graph-sorter',
  topicTitle = 'Egyenes arányosság grafikonja (Csoportosító)'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      themeColor="lime"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default DirectProportionGraphSorter;
