import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenMultExamSorterProps {
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

const WRITTEN_MULT_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Becsüld meg!',
    description: 'Kerekítsd mindkét tényezőt tízesre! Melyik becsült érték jön ki?',
    categories: [
      { id: 'wmec11', name: 'B: 800', color: 'blue' },
      { id: 'wmec12', name: 'B: 1800', color: 'emerald' },
      { id: 'wmec13', name: 'B: 5400', color: 'amber' }
    ],
    items: [
      { id: 'wmes1', text: '21 · 42', categoryId: 'wmec11' },
      { id: 'wmes2', text: '38 · 19', categoryId: 'wmec11' },
      { id: 'wmes3', text: '22 · 41', categoryId: 'wmec11' },
      { id: 'wmes4', text: '86 · 23', categoryId: 'wmec12' },
      { id: 'wmes5', text: '58 · 31', categoryId: 'wmec12' },
      { id: 'wmes6', text: '29 · 62', categoryId: 'wmec12' },
      { id: 'wmes7', text: '85 · 64', categoryId: 'wmec13' },
      { id: 'wmes8', text: '91 · 58', categoryId: 'wmec13' },
      { id: 'wmes9', text: '63 · 88', categoryId: 'wmec13' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hibavadász',
    description: 'Jó az eredmény? Ha hibás, mi volt a hiba?',
    categories: [
      { id: 'wmec21', name: 'Helyes', color: 'teal' },
      { id: 'wmec22', name: 'Hibás: elmaradt az eltolás', color: 'purple' },
      { id: 'wmec23', name: 'Hibás: rossz műveleti sorrend', color: 'rose' }
    ],
    items: [
      { id: 'wmes10', text: '93 · 75 = 6975', categoryId: 'wmec21' },
      { id: 'wmes11', text: '16 · 18 · 14 = 4032', categoryId: 'wmec21' },
      { id: 'wmes12', text: '17 · 19 · 15 = 4845', categoryId: 'wmec21' },
      { id: 'wmes13', text: '24 · 26 = 192', categoryId: 'wmec22' },
      { id: 'wmes14', text: '21 · 42 = 126', categoryId: 'wmec22' },
      { id: 'wmes15', text: '85 · 16 = 595', categoryId: 'wmec22' },
      { id: 'wmes16', text: '448 − 28 · 16 = 6720', categoryId: 'wmec23' },
      { id: 'wmes17', text: '100 + 20 · 30 = 3600', categoryId: 'wmec23' },
      { id: 'wmes18', text: '600 − 50 · 10 = 5500', categoryId: 'wmec23' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mekkora a szorzat?',
    description: 'Számold ki írásban! Kisebb 3000-nél, 3000 és 6000 között van, vagy nagyobb 6000-nél?',
    categories: [
      { id: 'wmec31', name: 'Kisebb, mint 3000', color: 'blue' },
      { id: 'wmec32', name: '3000 és 6000 között', color: 'amber' },
      { id: 'wmec33', name: 'Nagyobb, mint 6000', color: 'emerald' }
    ],
    items: [
      { id: 'wmes19', text: '82 · 28', categoryId: 'wmec31' },
      { id: 'wmes20', text: '78 · 36', categoryId: 'wmec31' },
      { id: 'wmes21', text: '27 · 21', categoryId: 'wmec31' },
      { id: 'wmes22', text: '85 · 64', categoryId: 'wmec32' },
      { id: 'wmes23', text: '29 · 132', categoryId: 'wmec32' },
      { id: 'wmes24', text: '47 · 108', categoryId: 'wmec32' },
      { id: 'wmes25', text: '36 · 261', categoryId: 'wmec33' },
      { id: 'wmes26', text: '375 · 26', categoryId: 'wmec33' },
      { id: 'wmes27', text: '679 · 14', categoryId: 'wmec33' }
    ]
  }
];

const WRITTEN_MULT_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_MULT_EXAM_SORTER_LEVELS_LIST[0],
  2: WRITTEN_MULT_EXAM_SORTER_LEVELS_LIST[1],
  3: WRITTEN_MULT_EXAM_SORTER_LEVELS_LIST[2]
};

export const WrittenMultExamSorter: React.FC<WrittenMultExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wmult-tudasproba-sorter',
  topicTitle = '4. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Csoportosítsd a feladatokat becslés, hibák és nagyság szerint!"
      levels={WRITTEN_MULT_EXAM_SORTER_LEVELS}
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

export default WrittenMultExamSorter;
