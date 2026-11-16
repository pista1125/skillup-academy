import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenMulTwoDigitSorterProps {
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

const WRITTEN_MUL_TWO_DIGIT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Becsüld meg!',
    description: 'Kerekítsd mindkét tényezőt tízesre, és szorozz fejben! Melyik becsült érték jön ki?',
    categories: [
      { id: 'wm2c11', name: 'B: 600', color: 'blue' },
      { id: 'wm2c12', name: 'B: 1200', color: 'emerald' },
      { id: 'wm2c13', name: 'B: 2400', color: 'amber' }
    ],
    items: [
      { id: 'wm2s1', text: '26 · 24', categoryId: 'wm2c11' },
      { id: 'wm2s2', text: '32 · 19', categoryId: 'wm2c11' },
      { id: 'wm2s3', text: '18 · 29', categoryId: 'wm2c11' },
      { id: 'wm2s4', text: '56 · 17', categoryId: 'wm2c12' },
      { id: 'wm2s5', text: '41 · 28', categoryId: 'wm2c12' },
      { id: 'wm2s6', text: '63 · 22', categoryId: 'wm2c12' },
      { id: 'wm2s7', text: '75 · 27', categoryId: 'wm2c13' },
      { id: 'wm2s8', text: '58 · 41', categoryId: 'wm2c13' },
      { id: 'wm2s9', text: '81 · 32', categoryId: 'wm2c13' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen szám a szorzat?',
    description: 'Számold ki a szorzatot! Páratlan, páros, vagy 0-ra végződik?',
    categories: [
      { id: 'wm2c21', name: 'Páratlan', color: 'teal' },
      { id: 'wm2c22', name: 'Páros, de nem 0-ra végződik', color: 'purple' },
      { id: 'wm2c23', name: '0-ra végződik', color: 'rose' }
    ],
    items: [
      { id: 'wm2s10', text: '75 · 27', categoryId: 'wm2c21' },
      { id: 'wm2s11', text: '37 · 47', categoryId: 'wm2c21' },
      { id: 'wm2s12', text: '83 · 65', categoryId: 'wm2c21' },
      { id: 'wm2s13', text: '29 · 48', categoryId: 'wm2c22' },
      { id: 'wm2s14', text: '96 · 24', categoryId: 'wm2c22' },
      { id: 'wm2s15', text: '57 · 34', categoryId: 'wm2c22' },
      { id: 'wm2s16', text: '55 · 34', categoryId: 'wm2c23' },
      { id: 'wm2s17', text: '85 · 16', categoryId: 'wm2c23' },
      { id: 'wm2s18', text: '48 · 65', categoryId: 'wm2c23' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mekkora a szorzat?',
    description: 'Számold ki írásban! Kisebb 2000-nél, 2000 és 5000 között van, vagy nagyobb 5000-nél?',
    categories: [
      { id: 'wm2c31', name: 'Kisebb, mint 2000', color: 'blue' },
      { id: 'wm2c32', name: '2000 és 5000 között', color: 'amber' },
      { id: 'wm2c33', name: 'Nagyobb, mint 5000', color: 'emerald' }
    ],
    items: [
      { id: 'wm2s19', text: '43 · 29', categoryId: 'wm2c31' },
      { id: 'wm2s20', text: '32 · 45', categoryId: 'wm2c31' },
      { id: 'wm2s21', text: '26 · 44', categoryId: 'wm2c31' },
      { id: 'wm2s22', text: '42 · 67', categoryId: 'wm2c32' },
      { id: 'wm2s23', text: '77 · 63', categoryId: 'wm2c32' },
      { id: 'wm2s24', text: '83 · 35', categoryId: 'wm2c32' },
      { id: 'wm2s25', text: '88 · 59', categoryId: 'wm2c33' },
      { id: 'wm2s26', text: '92 · 74', categoryId: 'wm2c33' },
      { id: 'wm2s27', text: '97 · 78', categoryId: 'wm2c33' }
    ]
  }
];

const WRITTEN_MUL_TWO_DIGIT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_MUL_TWO_DIGIT_SORTER_LEVELS_LIST[0],
  2: WRITTEN_MUL_TWO_DIGIT_SORTER_LEVELS_LIST[1],
  3: WRITTEN_MUL_TWO_DIGIT_SORTER_LEVELS_LIST[2]
};

export const WrittenMulTwoDigitSorter: React.FC<WrittenMulTwoDigitSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wmult-irasbeli-sorter',
  topicTitle = '2. Írásbeli szorzás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="irasbeli-szorzas"
      title={topicTitle}
      subtitle="Csoportosítsd a szorzásokat becslés, párosság és nagyság szerint!"
      levels={WRITTEN_MUL_TWO_DIGIT_SORTER_LEVELS}
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

export default WrittenMulTwoDigitSorter;
