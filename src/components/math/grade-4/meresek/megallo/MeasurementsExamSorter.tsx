import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MeasurementsExamSorterProps {
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

const MEASUREMENTS_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit mér ez a mértékegység?',
    description: 'Csoportosítsd a mértékegységeket! (Megálló 1. feladat)',
    categories: [
      { id: 'cap', name: 'űrtartalom', color: 'orange' },
      { id: 'mass', name: 'tömeg', color: 'emerald' },
      { id: 'len', name: 'hosszúság', color: 'amber' }
    ],
    items: [
      { id: 'mxs1', text: 'ml', categoryId: 'cap' },
      { id: 'mxs2', text: 'cl', categoryId: 'cap' },
      { id: 'mxs3', text: 'dl', categoryId: 'cap' },
      { id: 'mxs4', text: 'kg', categoryId: 'mass' },
      { id: 'mxs5', text: 'g', categoryId: 'mass' },
      { id: 'mxs6', text: 'dkg', categoryId: 'mass' },
      { id: 'mxs7', text: 'mm', categoryId: 'len' },
      { id: 'mxs8', text: 'cm', categoryId: 'len' },
      { id: 'mxs9', text: 'km', categoryId: 'len' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gyűjts példákat!',
    description: 'Melyik csoportba illik? (Megálló 1. b) feladat)',
    categories: [
      { id: 'km', name: '1 km-nél rövidebb', color: 'emerald' },
      { id: 'kg', name: '500 kg és 1000 kg közötti tömeg', color: 'purple' },
      { id: 'l', name: '100 l-nél több fér bele', color: 'rose' }
    ],
    items: [
      { id: 'mxs10', text: 'a tornaterem hossza', categoryId: 'km' },
      { id: 'mxs11', text: 'egy kör a 400 m-es futópályán', categoryId: 'km' },
      { id: 'mxs12', text: 'az osztályterem szélessége', categoryId: 'km' },
      { id: 'mxs13', text: 'egy ló (kb. 600 kg)', categoryId: 'kg' },
      { id: 'mxs14', text: 'egy tehén (kb. 700 kg)', categoryId: 'kg' },
      { id: 'mxs15', text: 'egy bivaly (kb. 800 kg)', categoryId: 'kg' },
      { id: 'mxs16', text: 'egy fürdőkád', categoryId: 'l' },
      { id: 'mxs17', text: 'a 160 literes akvárium', categoryId: 'l' },
      { id: 'mxs18', text: 'a tűzoltóautó víztartálya', categoryId: 'l' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit számolunk ki?',
    description: 'Kerületet, területet vagy időtartamot kell kiszámolni?',
    categories: [
      { id: 'k', name: 'kerületet', color: 'amber' },
      { id: 't', name: 'területet', color: 'sky' },
      { id: 'ido', name: 'időtartamot', color: 'indigo' }
    ],
    items: [
      { id: 'mxs19', text: 'Mennyi drótkerítés kell a telek köré?', categoryId: 'k' },
      { id: 'mxs20', text: 'Mennyi szalag kell a terítő szélére?', categoryId: 'k' },
      { id: 'mxs21', text: 'Mennyi szegélyléc kell a szoba fala mentén?', categoryId: 'k' },
      { id: 'mxs22', text: 'Hány csempe kell a fal lefedéséhez?', categoryId: 't' },
      { id: 'mxs23', text: 'Hány járólap fedi le a padlót?', categoryId: 't' },
      { id: 'mxs24', text: 'Hány 1 m-es négyzet fedi le a röplabdapályát?', categoryId: 't' },
      { id: 'mxs25', text: 'Mennyi ideig utazik Kitti a busszal?', categoryId: 'ido' },
      { id: 'mxs26', text: 'Mennyi ideig főtt a vacsora?', categoryId: 'ido' },
      { id: 'mxs27', text: 'Mennyi ideig voltak a majmoknál?', categoryId: 'ido' }
    ]
  }
];

const MEASUREMENTS_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MEASUREMENTS_EXAM_SORTER_LEVELS_LIST[0],
  2: MEASUREMENTS_EXAM_SORTER_LEVELS_LIST[1],
  3: MEASUREMENTS_EXAM_SORTER_LEVELS_LIST[2]
};

export const MeasurementsExamSorter: React.FC<MeasurementsExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-tudasproba-sorter',
  topicTitle = '7. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Csoportosítsd a mértékegységeket, a példákat és a feladatokat!"
      levels={MEASUREMENTS_EXAM_SORTER_LEVELS}
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

export default MeasurementsExamSorter;
