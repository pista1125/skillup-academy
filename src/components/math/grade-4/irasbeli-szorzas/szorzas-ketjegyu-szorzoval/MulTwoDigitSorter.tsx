import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulTwoDigitSorterProps {
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

const MUL_TWO_DIGIT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyit ér?',
    description: 'Melyik számmal egyenlő? Tedd a megfelelő csoportba!',
    categories: [
      { id: 'm2dc11', name: '250', color: 'blue' },
      { id: 'm2dc12', name: '520', color: 'emerald' },
      { id: 'm2dc13', name: '205', color: 'amber' }
    ],
    items: [
      { id: 'm2ds1', text: '25 tízes', categoryId: 'm2dc11' },
      { id: 'm2ds2', text: '5 · 50', categoryId: 'm2dc11' },
      { id: 'm2ds3', text: '10 · 25', categoryId: 'm2dc11' },
      { id: 'm2ds4', text: '52 tízes', categoryId: 'm2dc12' },
      { id: 'm2ds5', text: '13 · 40', categoryId: 'm2dc12' },
      { id: 'm2ds6', text: '26 · 20', categoryId: 'm2dc12' },
      { id: 'm2ds7', text: '205 egyes', categoryId: 'm2dc13' },
      { id: 'm2ds8', text: '41 · 5', categoryId: 'm2dc13' },
      { id: 'm2ds9', text: '200 + 5', categoryId: 'm2dc13' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Ugyanannyi',
    description: 'Több szorzásnak is ugyanannyi lehet a szorzata. Melyik csoportba tartozik?',
    categories: [
      { id: 'm2dc21', name: '1200', color: 'teal' },
      { id: 'm2dc22', name: '2400', color: 'purple' },
      { id: 'm2dc23', name: '3600', color: 'rose' }
    ],
    items: [
      { id: 'm2ds10', text: '40 · 30', categoryId: 'm2dc21' },
      { id: 'm2ds11', text: '60 · 20', categoryId: 'm2dc21' },
      { id: 'm2ds12', text: '12 · 100', categoryId: 'm2dc21' },
      { id: 'm2ds13', text: '80 · 30', categoryId: 'm2dc22' },
      { id: 'm2ds14', text: '120 · 20', categoryId: 'm2dc22' },
      { id: 'm2ds15', text: '60 · 40', categoryId: 'm2dc22' },
      { id: 'm2ds16', text: '90 · 40', categoryId: 'm2dc23' },
      { id: 'm2ds17', text: '120 · 30', categoryId: 'm2dc23' },
      { id: 'm2ds18', text: '60 · 60', categoryId: 'm2dc23' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mekkora a szorzat?',
    description: 'Számold ki a szorzatot! Kisebb 3000-nél, 3000 és 6000 között van, vagy nagyobb 6000-nél?',
    categories: [
      { id: 'm2dc31', name: 'Kisebb, mint 3000', color: 'blue' },
      { id: 'm2dc32', name: '3000 és 6000 között', color: 'amber' },
      { id: 'm2dc33', name: 'Nagyobb, mint 6000', color: 'emerald' }
    ],
    items: [
      { id: 'm2ds19', text: '140 · 20', categoryId: 'm2dc31' },
      { id: 'm2ds20', text: '43 · 40', categoryId: 'm2dc31' },
      { id: 'm2ds21', text: '27 · 90', categoryId: 'm2dc31' },
      { id: 'm2ds22', text: '130 · 40', categoryId: 'm2dc32' },
      { id: 'm2ds23', text: '56 · 70', categoryId: 'm2dc32' },
      { id: 'm2ds24', text: '28 · 200', categoryId: 'm2dc32' },
      { id: 'm2ds25', text: '330 · 20', categoryId: 'm2dc33' },
      { id: 'm2ds26', text: '210 · 40', categoryId: 'm2dc33' },
      { id: 'm2ds27', text: '87 · 90', categoryId: 'm2dc33' }
    ]
  }
];

const MUL_TWO_DIGIT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MUL_TWO_DIGIT_SORTER_LEVELS_LIST[0],
  2: MUL_TWO_DIGIT_SORTER_LEVELS_LIST[1],
  3: MUL_TWO_DIGIT_SORTER_LEVELS_LIST[2]
};

export const MulTwoDigitSorter: React.FC<MulTwoDigitSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wmult-ketjegyu-sorter',
  topicTitle = '1. Szorzás kétjegyű szorzóval – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="szorzas-ketjegyu-szorzoval"
      title={topicTitle}
      subtitle="Csoportosítsd a szorzásokat az értékük szerint!"
      levels={MUL_TWO_DIGIT_SORTER_LEVELS}
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

export default MulTwoDigitSorter;
