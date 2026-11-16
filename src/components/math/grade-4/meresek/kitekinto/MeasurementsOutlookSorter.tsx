import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MeasurementsOutlookSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const MEASUREMENTS_OUTLOOK_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit mérünk?',
    description: 'Hosszúság, űrtartalom vagy darabszám?',
    categories: [
      { id: 'len', name: 'hosszúság', color: 'amber' },
      { id: 'cap', name: 'űrtartalom', color: 'sky' },
      { id: 'db', name: 'darabszám', color: 'purple' }
    ],
    items: [
      { id: 'mos1', text: '185 cm-es ugrás', categoryId: 'len' },
      { id: 'mos2', text: '1 m-es ugrás', categoryId: 'len' },
      { id: 'mos3', text: '425 cm előny', categoryId: 'len' },
      { id: 'mos4', text: '800 l-es vegyszertartály', categoryId: 'cap' },
      { id: 'mos5', text: '3 literes üveg', categoryId: 'cap' },
      { id: 'mos6', text: '50 l-es üzemanyagtartály', categoryId: 'cap' },
      { id: 'mos7', text: '4 szamár', categoryId: 'db' },
      { id: 'mos8', text: '5 kecske', categoryId: 'db' },
      { id: 'mos9', text: '12 piros golyó', categoryId: 'db' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint 100 l, pont 100 l vagy több?',
    description: 'Váltsd át, ha kell, és csoportosíts!',
    categories: [
      { id: 'lt', name: '100 l-nél kevesebb', color: 'emerald' },
      { id: 'eq', name: 'pontosan 100 l', color: 'amber' },
      { id: 'gt', name: '100 l-nél több', color: 'rose' }
    ],
    items: [
      { id: 'mos10', text: 'a személyautó tartálya (50 l)', categoryId: 'lt' },
      { id: 'mos11', text: 'nagyapa szőlőleve (8 l)', categoryId: 'lt' },
      { id: 'mos12', text: '90 dl', categoryId: 'lt' },
      { id: 'mos13', text: 'a traktor tartálya', categoryId: 'eq' },
      { id: 'mos14', text: '1000 dl', categoryId: 'eq' },
      { id: 'mos15', text: '10 000 cl', categoryId: 'eq' },
      { id: 'mos16', text: 'az autóbusz tartálya (300 l)', categoryId: 'gt' },
      { id: 'mos17', text: 'a helikopter tartálya (800 l)', categoryId: 'gt' },
      { id: 'mos18', text: '1600 dl', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Biztos, lehetetlen vagy lehet?',
    description: 'Mona dobozában 12 piros és 6 kék golyó van. Becsukott szemmel húzunk.',
    categories: [
      { id: 'b', name: 'biztos', color: 'emerald' },
      { id: 'l', name: 'lehetetlen', color: 'rose' },
      { id: 'n', name: 'lehet, de nem biztos', color: 'sky' }
    ],
    items: [
      { id: 'mos19', text: '7 golyót húzunk: van köztük piros.', categoryId: 'b' },
      { id: 'mos20', text: '13 golyót húzunk: van köztük kétféle.', categoryId: 'b' },
      { id: 'mos21', text: '1 golyót húzunk: piros vagy kék.', categoryId: 'b' },
      { id: 'mos22', text: '7 kék golyót húzunk.', categoryId: 'l' },
      { id: 'mos23', text: 'Zöld golyót húzunk.', categoryId: 'l' },
      { id: 'mos24', text: '13 piros golyót húzunk.', categoryId: 'l' },
      { id: 'mos25', text: '1 golyót húzunk: piros.', categoryId: 'n' },
      { id: 'mos26', text: '2 golyót húzunk: mindkettő kék.', categoryId: 'n' },
      { id: 'mos27', text: '6 golyót húzunk: van köztük piros.', categoryId: 'n' }
    ]
  }
];

const MEASUREMENTS_OUTLOOK_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MEASUREMENTS_OUTLOOK_SORTER_LEVELS_LIST[0],
  2: MEASUREMENTS_OUTLOOK_SORTER_LEVELS_LIST[1],
  3: MEASUREMENTS_OUTLOOK_SORTER_LEVELS_LIST[2]
};

export const MeasurementsOutlookSorter: React.FC<MeasurementsOutlookSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-kitekinto-sorter',
  topicTitle = '8. Kitekintő – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="kitekinto"
      title={topicTitle}
      subtitle="Csoportosítsd a mennyiségeket, a tartályokat és a golyóhúzás eseményeit!"
      levels={MEASUREMENTS_OUTLOOK_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default MeasurementsOutlookSorter;
